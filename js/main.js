// slides 

const slides = document.querySelectorAll('.slide')
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
const totalSlides = slides.length;

function showSlide(index){
  slides.forEach((slide,i)=>slide.classList.toggle('active',i===index));
  dots.forEach((dot,i)=>dot.classList.toggle('active-dot',i===index));
}

nextBtn.addEventListener('click', ()=>{
  currentIndex = (currentIndex+1)%totalSlides;
  showSlide(currentIndex);
});

prevBtn.addEventListener('click', ()=>{
  currentIndex = (currentIndex-1+totalSlides)%totalSlides;
  showSlide(currentIndex);
});

dots.forEach(dot=>{
  dot.addEventListener('click', ()=>{
    currentIndex = parseInt(dot.dataset.slide);
    showSlide(currentIndex);
  });
});

// Optional: auto-slide
setInterval(()=>{
  currentIndex = (currentIndex+1)%totalSlides;
  showSlide(currentIndex);
},5000);

// YEAR
document.getElementById('year').textContent = new Date().getFullYear();

// NAV TOGGLE
document.addEventListener("DOMContentLoaded", function () => {

  const navToggle = document.queryselector("nav-toggle");
  const nav = document.queryselector("nav");

  if (!navToggle || !nav) return;

  navToggle.addEventListener("click", function () => {
    nav.classList.toggle("open");
  });

});


// CONTACT FORM SUCCESS MESSAGE
const form = document.getElementById("contactForm");
if (form) {
    const status = document.querySelector(".form-status");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        status.textContent = "Message sent successfully!";
        status.style.color = "green";

        form.reset();

        setTimeout(() => {
            status.textContent = "";
        }, 3000);
    });
}
