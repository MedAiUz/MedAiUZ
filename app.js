// =====================================
// MedAiUz Mini App
// =====================================


// TELEGRAM MINI APP

const tg = window.Telegram?.WebApp;

if (tg) {

    tg.ready();

    tg.expand();


    // Telegram foydalanuvchisini olish

    const user = tg.initDataUnsafe?.user;


    if (user) {

        const nameElement =
            document.getElementById("userName");


        if (nameElement) {

            const firstName =
                user.first_name || "Do‘stim";

            nameElement.textContent =
                firstName + "!";

        }

    }

}


// =====================================
// SEARCH
// =====================================

const searchInput =
    document.getElementById("searchInput");

const searchBtn =
    document.getElementById("searchBtn");


searchBtn.addEventListener(
    "click",
    function () {

        const query =
            searchInput.value.trim();


        if (query === "") {

            alert(
                "Iltimos, tibbiy mavzu kiriting."
            );

            return;
        }


        alert(
            "🔍 Qidirilmoqda: " + query
        );

    }
);


// ENTER BOSILGANDA QIDIRISH

searchInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            searchBtn.click();

        }

    }
);


// =====================================
// FEATURE
// =====================================

function openFeature(feature) {

    alert(
        "🚀 " +
        feature +
        " bo‘limi tez orada ishga tushadi!"
    );

}


// =====================================
// NAVIGATION
// =====================================

function navigate(page) {

    const navItems =
        document.querySelectorAll(".nav-item");


    navItems.forEach(
        function (item) {

            item.classList.remove("active");

        }
    );


    if (event?.currentTarget) {

        event.currentTarget
            .classList.add("active");

    }


    if (page === "home") {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }


    else if (page === "books") {

        alert(
            "📚 Darsliklar bo‘limi"
        );

    }


    else if (page === "ai") {

        alert(
            "🤖 MedAi AI Assistant"
        );

    }


    else if (page === "profile") {

        alert(
            "👤 Profil bo‘limi"
        );

    }

}


// =====================================
// NOTIFICATIONS
// =====================================

const notificationBtn =
    document.querySelector(
        ".notification-btn"
    );


notificationBtn.addEventListener(
    "click",
    function () {

        alert(
            "🔔 Hozircha yangi bildirishnomalar yo‘q."
        );

    }
);