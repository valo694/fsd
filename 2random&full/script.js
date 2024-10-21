// script.js

document.addEventListener("DOMContentLoaded", function () {
    const carouselItems = document.querySelectorAll("#randomCarousel .carousel-item");
    
    // Generate a random index
    const randomIndex = Math.floor(Math.random() * carouselItems.length);
    
    // Add the 'active' class to the random item
    carouselItems[randomIndex].classList.add("active");
});
