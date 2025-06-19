$(function () {

    var swiper = new Swiper(".tab_slide", {
        slidesPerView: 6.5,
        spaceBetween: 0,
        freeMode: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
    });
})