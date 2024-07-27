document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("[data-carousel-button]");
  const dots = document.querySelectorAll(".carouselIndicator");
  let autoSwitch = setInterval(() => switchSlide(1), 6000);

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const offset = button.dataset.carouselButton === "next" ? 1 : -1;
      switchSlide(offset);
      clearInterval(autoSwitch);
      autoSwitch = setInterval(() => switchSlide(1), 6000);
    });
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      switchToSlide(index);
      clearInterval(autoSwitch);
      autoSwitch = setInterval(() => switchSlide(1), 6000);
    });
  });

  function switchSlide(offset) {
    const slides = document.querySelector("[data-slides]");
    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    switchToSlide(newIndex);
  }

  function switchToSlide(index) {
    const slides = document.querySelector("[data-slides]");
    const activeSlide = slides.querySelector("[data-active]");
    slides.children[index].dataset.active = true;
    delete activeSlide.dataset.active;

    updateIndicators(index);
  }

  function updateIndicators(index) {
    dots.forEach((dot, dotIndex) => {
      if (dotIndex === index) {
        dot.classList.add("currentSlide");
      } else {
        dot.classList.remove("currentSlide");
      }
    });
  }
});
