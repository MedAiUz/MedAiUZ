const fs = require("fs");
const path = require("path");

// ==================================================
// MEDAIUZ NEWS PERSISTENT STORAGE PATCH
// ==================================================

const DATA_DIR =
    process.env.NEWS_DATA_DIR ||
    path.join(process.cwd(), "data");

const DATA_FILE =
    path.join(DATA_DIR, "news.json");

const MAX_NEWS_ITEMS = 50;

function ensureStorage() {
    try {
        fs.mkdirSync(DATA_DIR, {
            recursive: true
        });
    } catch (error) {
        console.error(
            "❌ Yangiliklar papkasini yaratib bo'lmadi:",
            error.message
        );
    }
}

function loadNews() {
    ensureStorage();

    try {
        if (!fs.existsSync(DATA_FILE)) {
            return [];
        }

        const raw =
            fs.readFileSync(
                DATA_FILE,
                "utf8"
            );

        const data =
            JSON.parse(raw);

        if (!Array.isArray(data)) {
            return [];
        }

        return data.slice(
            0,
            MAX_NEWS_ITEMS
        );
    } catch (error) {
        console.error(
            "❌ Yangiliklar faylini o'qishda xato:",
            error.message
        );

        return [];
    }
}

function saveNews(items) {
    ensureStorage();

    try {
        const clean =
            Array.isArray(items)
                ? items.slice(
                    0,
                    MAX_NEWS_ITEMS
                )
                : [];

        const tempFile =
            DATA_FILE + ".tmp";

        fs.writeFileSync(
            tempFile,
            JSON.stringify(
                clean,
                null,
                2
            ),
            "utf8"
        );

        fs.renameSync(
            tempFile,
            DATA_FILE
        );

    } catch (error) {
        console.error(
            "❌ Yangiliklarni saqlashda xato:",
            error.message
        );
    }
}

function normalizeNews(msg) {
    if (!msg) {
        return null;
    }

    const channelUsername =
        msg.chat?.username || "";

    if (
        channelUsername.toLowerCase() !==
        "medaiuz_news"
    ) {
        return null;
    }

    const text =
        (msg.text || msg.caption || "").trim();

    const photo =
        Array.isArray(msg.photo) &&
        msg.photo.length
            ? msg.photo[msg.photo.length - 1]
            : null;

    return {
        id:
            msg.message_id,

        title:
            text
                ? text
                    .split("\n")[0]
                    .slice(0, 120)
                : "MedAiUz yangiliklari",

        text:
            text,

        date:
            msg.date
                ? new Date(
                    msg.date * 1000
                ).toISOString()
                : new Date().toISOString(),

        imageFileId:
            photo?.file_id || null,

        telegramUrl:
            `https://t.me/MedAiUz_NEWS/${msg.message_id}`
    };
}

function mergeNews(current, incoming) {
    const map = new Map();

    for (const item of current || []) {
        if (item && item.id !== undefined) {
            map.set(String(item.id), item);
        }
    }

    for (const item of incoming || []) {
        if (item && item.id !== undefined) {
            map.set(String(item.id), item);
        }
    }

    return Array.from(map.values())
        .sort((a, b) => {
            const da =
                new Date(a.date || 0).getTime();
            const db =
                new Date(b.date || 0).getTime();

            return db - da;
        })
        .slice(0, MAX_NEWS_ITEMS);
}

ensureStorage();

let persistentNews =
    loadNews();

console.log(
    "💾 Saqlangan yangiliklar:",
    persistentNews.length
);

// ==================================================
// TELEGRAM CHANNEL POST INTERCEPTOR
// ==================================================

try {
    const TelegramBot =
        require("node-telegram-bot-api");

    const originalOn =
        TelegramBot.prototype.on;

    TelegramBot.prototype.on = function(
        event,
        listener
    ) {
        const result =
            originalOn.call(
                this,
                event,
                listener
            );

        if (
            event === "channel_post"
        ) {
            originalOn.call(
                this,
                event,
                (msg) => {
                    try {
                        const news =
                            normalizeNews(msg);

                        if (!news) {
                            return;
                        }

                        persistentNews =
                            mergeNews(
                                persistentNews,
                                [news]
                            );

                        saveNews(
                            persistentNews
                        );

                        console.log(
                            "💾 Yangilik doimiy saqlandi:",
                            news.title
                        );

                    } catch (error) {
                        console.error(
                            "❌ Persistent news xatosi:",
                            error.message
                        );
                    }
                }
            );
        }

        return result;
    };

} catch (error) {
    console.error(
        "❌ Telegram news patch xatosi:",
        error.message
    );
}

// ==================================================
// EXPRESS /api/news INTERCEPTOR
// ==================================================

try {
    const express =
        require("express");

    const originalGet =
        express.application.get;

    express.application.get = function(
        route,
        ...handlers
    ) {
        if (
            route === "/api/news" &&
            handlers.length
        ) {
            const lastIndex =
                handlers.length - 1;

            const originalHandler =
                handlers[lastIndex];

            handlers[lastIndex] =
                function(
                    req,
                    res,
                    next
                ) {
                    const originalJson =
                        res.json.bind(res);

                    res.json = function(body) {
                        try {
                            const current =
                                Array.isArray(
                                    body?.news
                                )
                                    ? body.news
                                    : [];

                            persistentNews =
                                mergeNews(
                                    persistentNews,
                                    current
                                );

                            if (
                                current.length
                            ) {
                                saveNews(
                                    persistentNews
                                );
                            }

                            const result =
                                {
                                    ...(body || {}),

                                    success:
                                        true,

                                    channel:
                                        "MedAiUz_NEWS",

                                    count:
                                        persistentNews.length,

                                    news:
                                        persistentNews
                                };

                            return originalJson(
                                result
                            );

                        } catch (error) {
                            console.error(
                                "❌ /api/news patch xatosi:",
                                error.message
                            );

                            return originalJson(
                                body
                            );
                        }
                    };

                    return originalHandler(
                        req,
                        res,
                        next
                    );
                };
        }

        return originalGet.apply(
            this,
            [route, ...handlers]
        );
    };

    console.log(
        "📰 News persistent API patch yoqildi"
    );

} catch (error) {
    console.error(
        "❌ Express news patch xatosi:",
        error.message
    );
}
