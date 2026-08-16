// ===============================
// MedAiUz - Main JavaScript
// ===============================


// SEARCH
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function () {

    const query = searchInput.value.trim();

    if (query === "") {
        alert("Iltimos, tibbiy mavzu kiriting.");
        return;
    }

    alert("🔍 Qidirilmoqda: " + query);
});


// ENTER BILAN QIDIRISH
searchInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        searchBtn.click();
    }

});


// FEATURE OCHISH
function openFeature(feature) {

    alert(
        "🚀 " +
        feature +
        " bo‘limi tez orada ishga tushadi!"
    );

}


// BOTTOM NAVIGATION
function navigate(page) {

    // Barcha tugmalardan active ni olib tashlash
    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach(function (item) {
        item.classList.remove("active");
    });


    // Bosilgan tugmani active qilish
    event.currentTarget.classList.add("active");


    // Hozircha demo
    if (page === "home") {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    else if (page === "books") {
        alert("📚 Darsliklar bo‘limi");
    }

    else if (page === "ai") {
        alert("🤖 MedAi AI Assistant");
    }

    else if (page === "profile") {
        alert("👤 Profil bo‘limi");
    }

}


// NOTIFICATION
const notificationBtn =
    document.querySelector(".notification-btn");

notificationBtn.addEventListener("click", function () {

    alert("🔔 Hozircha yangi bildirishnomalar yo‘q.");

});