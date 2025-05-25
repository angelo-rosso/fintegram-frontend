document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('#fintegramCarousel');
    const bsCarousel = new bootstrap.Carousel(carousel, {
        interval: 5000,
        ride: 'carousel',
        touch: true,
        pause: false
    });
});