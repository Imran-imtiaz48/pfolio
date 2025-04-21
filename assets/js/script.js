'use strict';

/**
 * Utility to add event listener to multiple elements
 */
const addEventOnElements = (elements, eventType, callback) => {
  elements.forEach(element => element.addEventListener(eventType, callback));
};

/**
 * Preloader
 */
const preloader = document.querySelector("[data-preloader]");

window.addEventListener("DOMContentLoaded", () => {
  preloader?.classList.add("loaded");
  document.body.classList.add("loaded");
});

/**
 * Navbar toggle functionality for mobile
 */
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = () => {
  navbar?.classList.toggle("active");
  navToggleBtn?.classList.toggle("active");
  overlay?.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

addEventOnElements(navTogglers, "click", toggleNavbar);

/**
 * Header behavior on scroll
 */
const header = document.querySelector("[data-header]");

window.addEventListener("scroll", () => {
  if (window.scrollY >= 100) {
    header?.classList.add("active");
  } else {
    header?.classList.remove("active");
  }
});

/**
 * Initialize all sliders on the page
 */
const sliders = document.querySelectorAll("[data-slider]");

const initSlider = (slider) => {
  const sliderContainer = slider.querySelector("[data-slider-container]");
  const sliderPrevBtn = slider.querySelector("[data-slider-prev]");
  const sliderNextBtn = slider.querySelector("[data-slider-next]");

  let visibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
  let totalItems = sliderContainer?.childElementCount ?? 0;
  let maxPosition = totalItems - visibleItems;

  let currentPosition = 0;

  const moveSlider = () => {
    const offset = sliderContainer.children[currentPosition]?.offsetLeft || 0;
    sliderContainer.style.transform = `translateX(-${offset}px)`;
  };

  const slideNext = () => {
    currentPosition = (currentPosition >= maxPosition) ? 0 : currentPosition + 1;
    moveSlider();
  };

  const slidePrev = () => {
    currentPosition = (currentPosition <= 0) ? maxPosition : currentPosition - 1;
    moveSlider();
  };

  sliderNextBtn?.addEventListener("click", slideNext);
  sliderPrevBtn?.addEventListener("click", slidePrev);

  if (maxPosition <= 0) {
    sliderNextBtn.style.display = "none";
    sliderPrevBtn.style.display = "none";
  }

  // Support horizontal scroll with Shift + mouse wheel
  slider.addEventListener("wheel", (e) => {
    if (!e.shiftKey) return;
    e.preventDefault();
    e.deltaY > 0 ? slideNext() : slidePrev();
  });

  window.addEventListener("resize", () => {
    visibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
    maxPosition = sliderContainer.childElementCount - visibleItems;
    moveSlider();
  });
};

// Initialize each slider
sliders.forEach(initSlider);
