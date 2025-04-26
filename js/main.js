"use strict";

//  =============== Global Variables ===============
// Header
const catDropDown = document.querySelector(".cat-drop-down");
const catList = document.querySelector(".cat-list");
const sideNav = document.querySelector(".side-nav");
const navBar = document.querySelector(".nav-drop-down");

// Home
const imgs = Array.from(document.querySelectorAll(".slider .item"));
const pag = Array.from(document.querySelectorAll(".pagination span"));
const slider = document.querySelector(".slider");

// Cart
const cart = document.getElementById('cart');
const cart_icon = document.getElementById('cart_icon');
const close_cart = document.querySelector('#cart .close');
const shopMoreBtn = document.querySelector('.shop-more-btn');

// Footer
const lower_footer = document.querySelector(".lower-footer .container");


// Products Array
let cartProducts = [];




// Swiper Slider
function swiperSlider() {
    // Initialize Swiper
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        autoplay: {
            delay: 2000
        },
        loop: true,
        breakpoints: {
        390: {
            slidesPerView: 2,
            spaceBetween: 20,
            },
            768: {
            slidesPerView: 3,
            spaceBetween: 20,
            },
            992: {
            slidesPerView: 4,
            spaceBetween: 20,
            },
            1100: {
            slidesPerView: 5,
            spaceBetween: 20,
            },
        },
    });
}
swiperSlider();




// add close icon to side nav
let closeIcon = document.createElement("i");
closeIcon.classList.add("fa-solid", "fa-xmark", "close");
sideNav.appendChild(closeIcon);




// Add Show Calss To Drop Down Menu
function showDropDownList(el) {
    el.classList.toggle("show");
}
catDropDown.onclick = function() {
    showDropDownList(catList);
};
navBar.onclick = function(e) {
    showDropDownList(sideNav);
    e.stopPropagation();
};
closeIcon.onclick = function(e) {
    showDropDownList(sideNav);
};
cart_icon.onclick = function(e) {
    e.stopPropagation();
    showDropDownList(cart);
};
close_cart.onclick = function() {
    showDropDownList(cart);
};
shopMoreBtn.onclick = function() {
    showDropDownList(cart);
};

document.addEventListener('click', (e) => {
    cart.classList.remove('show');
    sideNav.classList.remove('show');
});
cart.addEventListener('click', (e) => {
    e.stopPropagation();
});
sideNav.addEventListener('click', (e) => {
    e.stopPropagation();
});





// for slider working
let counter = 0;
function slideNext() {
    imgs[counter].style.animation = "next1 0.3s linear forwards";
    pag[counter].classList.remove("active");
    if(counter >= imgs.length -1) {
        counter = 0;
    } else {
        counter++;
    }
    imgs[counter].style.animation = "next2 0.3s linear forwards";
    pag[counter].classList.add("active");
}
let stopInterval = setInterval(slideNext,2000);

pag.forEach(span => {
    span.addEventListener('click', slideNext);
});
slider.style.height = `${imgs[0].clientHeight}px`;
window.onresize = () => {
    slider.style.height = `${imgs[0].clientHeight}px`;
    
    if(lower_footer.clientWidth >= 700) {
        lower_footer.style.justifyContent = "space-between";
    } else {
        lower_footer.style.justifyContent = "center";
    }
}




// // Retrieve Data From Local Storage If Exist
// export function onloadDisplayProd() {
//     if(localStorage.getItem("cart") !== null) {
//         cartProducts = JSON.parse(localStorage.getItem("cart"));
//     }
//     getApiProduct();
// }
// onloadDisplayProd();



// Get Products From Api
// function getApiProduct() {
//     fetch('../products.json')
//         .then(response => response.json())
//         .then(data => {
//             displayData(data);
//         });
// }


