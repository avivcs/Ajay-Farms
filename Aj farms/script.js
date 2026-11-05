const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
   const question = item.querySelector(".faq-question");
   question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      faqItems.forEach((faq) => {
         faq.classList.remove("open");

         faq.querySelector(".faq-question").setAttribute("aria-expanded", 'false');

         faq.querySelector(".faq-toggle").textContent = "+";
      });

      if(!isOpen) {
        item.classList.add("open");
        question.setAttribute("aria-expanded", "true");
        item.querySelector(".faq-toggle").textContent = "-"
      }
   });
});


const testimonialWindow = document.querySelector(".testimonial-window");
const testimonialTrack = document.getElementById("TestimonialTrack");
const testimonialSlides = document.querySelectorAll(".testimonial-slide");
const testimonialDots = document.querySelectorAll(".testimonial-dot");
let activeTestimonial = 0;
let testimonialTimer;

function showTestimonial(index) {
   activeTestimonial = index;
   testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
   testimonialDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
      dot.setAttribute("aria-pressed", i === index ? "true" : "false");
   });
}

testimonialDots.forEach((dot, index) => {
   dot.addEventListener("click", () => {
     showTestimonial(index);
     restartTestimonialTimer();
   });
});

function startTestimonialTimer() {
   if (testimonialSlides.length <= 1) return;
   testimonialTimer = setInterval(() => {
      let nextIndex = (activeTestimonial + 1) % testimonialSlides.length;
      showTestimonial(nextIndex);
   }, 6000); 
}

function restartTestimonialTimer() {
   clearInterval(testimonialTimer);
   startTestimonialTimer();
}

// Added safety check in case testimonialWindow is missing
if (testimonialWindow) {
   testimonialWindow.addEventListener("mouseenter", () => {
      clearInterval(testimonialTimer);
   });

   testimonialWindow.addEventListener("mouseleave", () => {
      startTestimonialTimer();
   });
}

showTestimonial(0);
startTestimonialTimer();
