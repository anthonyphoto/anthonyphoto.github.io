'use strict';

const getWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

const getHeight = () => window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

// desktop screen or landscape mode of mobile devices
const isLandscape = () => getWidth() >= 1200 || getWidth() > getHeight();

// applied to resize event
const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(args), delay);
  };
}

// applied to scroll event
const throttle = (fn, ms) => {
  let run = true;

  return (...args) => {
    if (!run) {
      // console.log("--throttled", TICK++)
      return;
    }
    fn(...args);
    run = false;
    setTimeout(() => {
      run = true;
    }, ms)
  }
}

// Function to check if an element is in the viewport
const isElementInViewport = element => {
  const rect = element.getBoundingClientRect();
  const screenHeight = getHeight();

  // make sure to check height to ensure images are fully loaded
  return (rect.height > 100 && rect.top >= -50 && rect.top <= screenHeight * 0.80);
}

// Function to reveal hidden content when it's in the viewport
const revealContentOnScroll = () => {
  const hiddenContents = document.querySelectorAll('.hidden-content');
  hiddenContents.forEach((content) => {
    if (isElementInViewport(content)) {
      content.style.opacity = '1';
      content.style.transform = 'translateY(0)';
    }
  });
}

/*
 * el: htmlElment
 * delay: ms each recursion
 * opacity: initial opacity (= 1)
 * delta: opacity decrease rate (= 0.1)
 * issue??: what if element already has opacity set?
 */
const fadeOut = (el, delay=100, opacity = 1, delta = 0.1) => {
  if (opacity <= 0) {
    el.style.display = 'none';
    return;
  }

  setTimeout(() => {
    el.style.opacity = opacity;
    fadeOut(el, delay, opacity - delta, delta);
  }, delay)
}
