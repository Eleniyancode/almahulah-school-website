// placing the hero image below the header
const header = document.querySelector('header');
headerCord = header.getBoundingClientRect()
console.log(headerCord);
console.log(headerCord.height);

const hero = document.querySelector('.hero');
console.log(hero);
hero.style.marginTop = `${headerCord.height}px`;
console.log(hero.style.marginTop);

//handling the hover function of the nav list
const navEl = document.querySelector('.nav-ul');

function displayList(elementClassName, childElementClassName, event, visibility, opacity, display) {
  event.stopPropagation()
  const element = event.target.closest(elementClassName);
  if (!element) return;
  const childElement = element.querySelector(childElementClassName)
  console.log(element, childElement);

  childElement.style.visibility = `${visibility}`
  childElement.style.opacity = `${opacity}`
  childElement.style.display = `${display}`
}

navEl.addEventListener('mouseover', function(e) {
  e.stopPropagation()
  displayList('.nav-item', '.nav-list', e, 'visible', '1', 'flex');
})

navEl.addEventListener('mouseout', function(e) {
  e.stopPropagation()
  displayList('.nav-item', '.nav-list', e, 'hidden', '0', 'none');
})

const navprogramListEl = document.querySelector('.nav-program-item');
console.log(navprogramListEl);
const programAcademicListEl = document.querySelector('.program-academics')
console.log(programAcademicListEl);

const programNonAcademicListEl = document.querySelector('.program-nonacademics')
console.log(programNonAcademicListEl);

navprogramListEl.addEventListener('mouseenter', function(e) {
  displayList('.nav-program-item', '.nav-programs-list', e, 'visible', '1', 'flex')
  e.stopImmediatePropagation()
})

navprogramListEl.addEventListener('mouseleave', function(e) {
  displayList('.nav-program-item', '.nav-programs-list', e, 'hidden', '0', 'none')
})

programAcademicListEl.addEventListener('mouseenter', function(e) {
  displayList('.program-academics', '.nav-academics-list', e, 'visible', '1', 'block')
})

programAcademicListEl.addEventListener('mouseleave', function(e) {
  displayList('.program-academics', '.nav-academics-list', e, 'hidden', '0', 'none')
})

programNonAcademicListEl.addEventListener('mouseenter', function(e) {
  displayList('.program-nonacademics', '.nav-nonacademics-list', e, 'visible', '1', 'block')
})

programNonAcademicListEl.addEventListener('mouseleave', function(e) {
  displayList('.program-nonacademics', '.nav-nonacademics-list', e, 'hidden', '0', 'none')
})


//slider functionality
const slider = function () {
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const slider = document.querySelector('.slider');
let currslid = 0;
let maxslid = slides.length
const interval = 3000;
let slidesShowTimeout;

//Functions
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
    });

    slides[index].style.display = 'flex';
    setTimeout(() => {
        slides[index].classList.add('active');
    }, 10)
}

function hideSlide(index) {
    slides[index].classList.remove('active');
    setTimeout(() => {
        slides[index].style.display = 'none';
    }, 1000)
}

function startSlideShow() {
    showSlide(currslid);

    slidesShowTimeout = setTimeout(() => {
        hideSlide(currslid); 
        currslid = (currslid + 1) % slides.length
        startSlideShow();
    }, interval);
}

//stop slide show after 15 seconds
setTimeout(() => {
    clearTimeout(slidesShowTimeout);
    console.log('slide show stopped');
}, 15000)

startSlideShow();

const nextSlide = function() {
  console.log('clicked');
hideSlide(currslid);
  if (currslid === maxslid - 1) {
  currslid = 0
}else{
  currslid++
}
showSlide(currslid)
}

const prevSlide = function() {
   hideSlide(currslid) 
  if (currslid === 0) {
  currslid = maxslid - 1
}else{
  currslid--
}
showSlide(currslid)
}


//Event handlers
btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click', prevSlide)

//functionality for the arrow right and left key slide
document.addEventListener('keydown', function(e) {
  // console.log(e);
  if (e.key === 'ArrowRight') nextSlide()
   e.key === 'ArrowLeft' && prevSlide()
})

}

slider();