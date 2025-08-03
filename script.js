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


//Handling school leader slider function
const leaderSlide = document.getElementById('slideshowTrack');
const totalSlides = 6;
const visibleSlides = 3;
const slideWidth = 320
let index = 0;

function moveSlide() {
  index++;
  leaderSlide.style.transition = `transform 1s ease-in-out`
  leaderSlide.style.transform = `translateX(-${slideWidth * index}px)`;

  // If at the last real image group (6, plus 3 clones), reset soon after animation
  if (index === totalSlides) {
    setTimeout(() => {
      // Reset instantly without transition
      leaderSlide.style.transition = 'none';
      leaderSlide.style.transform = 'translateX(0)';
      index = 0
    }, 1000)
  }

}
setInterval(moveSlide, 3000)


//handling the news section pagination functionality
const newsPostArray = Array.from(document.querySelectorAll('.news-card'));
const numsPerPage = 2;
let currentPage = 1
console.log(newsPostArray);

function showPostPage(page) {
  const start = (page - 1) * numsPerPage;
  const end = page * numsPerPage;

  // show item with animation after a short delay
    setTimeout(() => {
        newsPostArray.forEach((item, i) => {
            if (i >= start && i < end) {
                item.style.display = 'block';
                setTimeout(() => item.classList.add('show'), 60)
            }else {
                item.style.display = 'none'
                setTimeout(() => item.classList.remove('show'), 60)
            }
            
        })
    })

    document.getElementById('page-number').innerText = page;
}

//handle change of post page on click
function changePage(direction) {
    const totalPages = Math.ceil (newsPostArray.length / numsPerPage);
    currentPage += direction;

    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;

    showPostPage(currentPage)
}

//Initialize first page
showPostPage(currentPage);


//handle count capacity function Section
const numOfStudents = document.getElementById('studentsNum');
const numOfClassrooms = document.getElementById('classroom');
const numOfLab = document.getElementById('lab');
const numOfHostel = document.getElementById('hostel');
function increaseCount(element, limit, s) {
  element.textContent = 0;
  setInterval(() => {
    if (+element.textContent === limit) return

    const result = (Number(element.textContent)) + 1;
    element.textContent = result

  }, s)
}

increaseCount(numOfStudents, 350, 10);
increaseCount(numOfClassrooms, 18, 100);
increaseCount(numOfLab, 4, 100);
increaseCount(numOfHostel, 8, 100);