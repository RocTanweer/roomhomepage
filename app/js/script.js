'usestrict';
/*
################################################
########### Top Slider Functionality ###########
################################################
*/
const slider = document.querySelector(".top-section__hero-wrapper-slider");
const sliderElements = document.querySelectorAll(".top-section__hero-wrapper-slider-element");
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const pictures = document.querySelectorAll('.pictures');
const sliderSize = sliderElements[0].clientWidth;
let counter = 1;  // 'let' for change slide purpose
let currSlideEl = sliderElements[counter];   // 'let' for change focus on shopnow links


// for DRY
const slidefunc = function() {
    return window.outerWidth > 1024 ? slider.style.transform = `translateX(${-(29.3 * counter)}vw)` : slider.style.transform = `translateX(${-(82.4 * counter)}vw)`;
}

slidefunc()

const focusRestriction = function() {
    currSlideEl = sliderElements[counter];
    sliderElements.forEach((slide) => {
        +slide.dataset.focus === +currSlideEl.dataset.focus ? slide.lastElementChild.setAttribute('tabindex', 0) : slide.lastElementChild.setAttribute('tabindex', -1);
    })
}

focusRestriction();

nextBtn.addEventListener('click', function(e) {
    if(counter >= sliderElements.length - 1) return;
    counter++;
    slider.style.transition = "transform 600ms ease-in-out";
    slidefunc();
    focusRestriction();
});

prevBtn.addEventListener('click', function (e) {
    if(counter <= 0) return;
    counter--;
    slider.style.transition = "transform 600ms ease-in-out";
    slidefunc();
    focusRestriction();
});


slider.addEventListener('transitionend', function(e) {
    const currSlideEl = sliderElements[counter];

    pictures.forEach((pic) => {
        +pic.id === +currSlideEl.dataset.tab ? pic.classList.add('imgContainer') : pic.classList.remove('imgContainer');
    })

    if(sliderElements[counter].id === "firstClone") {
        counter = 1;
        slider.style.transition = "none";
        slidefunc();
        focusRestriction();
    }

    if (sliderElements[counter].id === "lastClone") {
        counter = 3;
        slider.style.transition = "none";
        slidefunc();
        focusRestriction();
    }
})

/*
################################################
########### Mob menu Functionality #############
################################################
*/
const hamBtn = document.getElementById('hamBtn');
const overlay = document.getElementById('overlay');
const mobMenu = document.getElementById('mobMenu');
hamBtn.addEventListener('click', (e) => {
    // ham animation 
    hamBtn.classList.toggle('hamAnimation');
    // adding overlay
    overlay.classList.toggle('activeOverlay');
    // showing or hiding mob menu
    mobMenu.classList.toggle('active');
    // no scroll on body
    document.body.classList.toggle('noOverFlow');
})

/*
################################################
########### Intro Functionality ################
################################################
*/

const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

tl.to(".pageName", {y : '0%', duration : 0.7});
tl.to('.smallText', {x : '0%',opacity : '1' ,duration : 0.7, stagger : 0.3});
tl.to('.slide', {x : '100%', duration : 1.5, delay : 0.7});
tl.to('.intro', {x : '100%', duration : 1}, '-=1')
