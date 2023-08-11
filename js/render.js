'use strict';

// animation constants
const START_FRAME = 1; // should be always 1
const END_FRAME = 259;
// const END_FRAME = 113;

let TICK = 0; // performance test purpose

let PAGE = 'home';
const MENU_NAMES = ['portraits', 'events', 'others'];
let IS_LANDSCAPE = false;
let SHOULD_STOP_SHOW = false;
let SHOW_RUNNING = false;
let SCROLL_EVENT_RUNNING = false;
let FRAMES_LOADED = false;

const resumeSlideShow = () => {
  document.getElementById('js-slide-show').style.opacity = 1;
  document.title = 'Anthony Photography';
  history.replaceState({ page: 'home' }, '', './index.html');
  renderLanding(SHOULD_STOP_SHOW);
}

const updateCatchMobile = () => {
  const catchWr = document.getElementById('js-catch-wr');
  if (IS_LANDSCAPE) {
    catchWr.classList.remove('text-title-mobile');
  } else {
    catchWr.classList.add('text-title-mobile');
  }
}

const renderCatchPhrase = page => {
  MENU_NAMES.forEach(name => {
    document.getElementById(`js-catch-${name}`).style.display = page === name ? 'block' : 'none';
  });
}

const getPicHtml = (pic, suppressHidden = false) => {
  const className = IS_LANDSCAPE && pic?.mode === 2? 'pic-portrait' : 'pic'; 
  const imgSrc = `${pic.src}${IS_LANDSCAPE && pic?.mode === 0 ? 'w' : ''}.jpg`;

  const wrEl = document.createElement('div');
  wrEl.classList.add('pic-wr');
  if (!suppressHidden) {
    wrEl.classList.add('hidden-content');
  }
  // wrEl.setAttribute('class', 'pic-wr hidden-content');
  let picHtml = `<img class=${className} src='${imgSrc}' />`;

  if (pic?.title?.length > 0) {
    picHtml += `<span class='pic-text'>${pic.title}</span>`
  }
  wrEl.innerHTML = picHtml;
  return wrEl;
}

const renderPics = page => {
  let picLib = PORTRAITS_LIB;

  switch (page) {
    case 'events' : 
      picLib = EVENTS_LIB;
      break;
    case 'others' :
      picLib = OTHERS_LIB;
      break;
  }

  const picsEl = document.getElementById('js-pics');
  picsEl.innerHTML = '';  
  picLib.forEach(pic => picsEl.appendChild(getPicHtml(pic)));

}

// display only the target index frame
const updateAnimeFrames = (ind) => {
  document.getElementById(`js-f-${ind}`).style.opacity = 1;

  for (let i = ind + 1; i <= END_FRAME; i++) {
    document.getElementById(`js-f-${i}`).style.opacity = 0;
  }
}

const loadAnimeFrames = addImageLoadEvent => { 
  const frameEl = document.getElementById('js-frame-wr');
  let imgHtml = '';
  for (let i = START_FRAME; i <= END_FRAME; i++) {
    const imgEl = document.createElement('img');
    imgEl.setAttribute('class', IS_LANDSCAPE ? 'frame-wide' : 'frame');
    imgEl.setAttribute('id', `js-f-${i}`)
    imgEl.style.zIndex = i;
    imgEl.style.opacity = i === START_FRAME ? 1 : 0;
    imgEl.src = `./img/frame/f-${i}.jpg`;

    frameEl.appendChild(imgEl);
  }
  const status = addImageLoadEvent(IS_LANDSCAPE ? 'frame-wide' : 'frame');

}

const displayLoader = () => {
  if (FRAMES_LOADED) {
    // document.getElementById('js-section-loader').style.display = 'none';
    fadeOut(document.getElementById('js-section-loader'), 20);
    return;
  }

  document.getElementById('js-section-loader').style.display = 'flex';

  setTimeout(() => {
    displayLoader();
  }, 1000);
}

const renderMain = (page = 'portraits') => {
  PAGE = page;
  document.title = `Anthony Photography - ${page}`;

  // disable pushstate
  // history.pushState({ page: page }, '', `?p=${page}`);
  
  if (page === 'portraits' && !FRAMES_LOADED) displayLoader();

  const mainEl = document.getElementById('js-main');
  mainEl.style.display = 'block';
  mainEl.style.top = 0;

  document.getElementById('js-slide-show').style.opacity = 0;

  updateCatchMobile();
  renderCatchPhrase(page);
  
  //updateMenu
  document.querySelectorAll('.menu').forEach(el => {
    el.style.color = el.id === `js-${page}` ? '#c00000' : '#2a2c2d';
  });

  // main frame setting
  const frame1 = document.getElementById('js-frame-wr');
  const frame2 = document.getElementById('js-frame-e-wr');
  const frameTitle = document.getElementById('js-top-pic-title');
  if (page === 'portraits') {
    frame2.style.display = 'none';
    frame1.style.display = 'block';
    const suffix = IS_LANDSCAPE ? '-wide' : '';

    frame1.classList.remove(IS_LANDSCAPE ? 'frame-wr' : 'frame-wr-wide');
    frame1.classList.add(`frame-wr${suffix}`);
    
    if (!IS_LANDSCAPE) {
      const maxHeight = getWidth() * 675 / 1200;
      const height = maxHeight > 300 ? maxHeight : 300;
      frame1.style.height = `${height}px`;
      document.querySelectorAll('.frame, .frame-wide').forEach(el => {
        el.classList.remove('frame-wide');
        el.classList.add('frame');
        el.style.height = `${height}px`;
      });

    } else {
      frame1.style.height = '';      
      document.querySelectorAll('.frame, .frame-wide').forEach(el => { 
        el.style.height = '';
        el.classList.remove('frame');
        el.classList.add('frame-wide');
      });
    }
    // frameTitle.innerHTML = 'Pose & Play';

  } else {
    frame1.style.display = 'none';
    frame2.style.display = 'block';
    const suffix = IS_LANDSCAPE ? '-wide' : '';

    const imgSrc = page === 'events' ? './img/e_title2.jpg' : './img/o_title3.jpg';
    const imgTitle = page === 'events' ? '' : '';

    frame2.classList.remove(IS_LANDSCAPE ? 'frame-e-wr' : 'frame-e-wr-wide')
    frame2.classList.add(`frame-e-wr${suffix}`);
    frame2.innerHTML = `<img id='js-frame-e' class='frame-e${suffix}' src='${imgSrc}'' />`;
    
    
    const img2 = document.getElementById('js-frame-e');
    if (!IS_LANDSCAPE) {
      const maxHeight = getWidth() * 840 / 1400;
      const height = maxHeight > 400 ? maxHeight : 400;
      frame2.style.height = `${height}px`
      img2.style.height = `${height}px`
    } else {
      frame2.style.height = '';
      img2.style.height = '';
    }

    frameTitle.innerHTML = imgTitle;
  }

  renderPics(page);

  // second try to ensure additional images are loaded
  // setTimeout(revealContentOnScroll, 1000)

  if (!SCROLL_EVENT_RUNNING) {
    addScrollEvent();
    SCROLL_EVENT_RUNNING = true;
  }

}

const scrollMain = (el, top=100, bounce=9, delta = -1) => {
  if (top < 0 && bounce < 0) {
    renderMain();

    window.scrollTo({ top: 0, behavior: 'smooth' });
    revealContentOnScroll();
    return;
  }

  if (delta > 0) delta = (bounce - top)/5 + 0.01;

  if (top < 0 && delta < 0) {
    delta = (bounce - top)/5 + 0.01;
  } else if (top >= bounce && delta > 0) {
    delta = -0.9;
    bounce -= bounce >= 5 ? 3: 2;
  }

  el.style.top = `${top}%`;
  setTimeout(() => scrollMain(el, top + delta, bounce, delta), 8);
}

const fadeIn = (el, i = 0) => {
  if (SHOULD_STOP_SHOW || i > 100) return;

  setTimeout(() => {
    el.style.opacity = i * 0.01;
    fadeIn(el, i + 1);
  }, 18);
}

const playSlideShow = (slideInd, isFirst, toggleId = 0) => {
  if (SHOULD_STOP_SHOW) {
    SHOW_RUNNING = false;
    return;
  }
  SHOW_RUNNING = true;

  const duration = isFirst ? 8000 : 5000;
  const imgElement = document.getElementById(`js-img-${toggleId}`);
  imgElement.style.opacity = 0;

  const imgSrc = isFirst ? SLIDE_LANDING : SLIDE_LIST[slideInd].src;
  imgElement.src = `${imgSrc}${IS_LANDSCAPE ? 'w' : ''}.jpg`;
  imgElement.style.zIndex = -1;
  if (isFirst){
    imgElement.style.opacity = 1;
  } else {
    fadeIn(imgElement);
  }

  // setTimeout(() => {
  //   imgElement.style.zIndex = -2;
       
  //   playSlideShow((slideInd + 1) % SLIDE_LIST.length, false, (toggleId+1)%2 );
  // }, duration);
}

const fadeOutIntro = (el, opacity) => {
  if (opacity <= 0) {
    document.getElementById('js-logo-top').style.display = 'block';
    el.style.display = 'none';

 // document.getElementById('js-btn-gallery-wr').style.display = 'block';
    return;
  }
  setTimeout(() => {
    el.style.opacity = opacity;
    fadeOutIntro(el, opacity - 0.1);
  }, 40)
}

const shrink = (el, width, logoWidth, logoHeight, screenWidth, screenHeight, finalWidth) => {
  if (width < finalWidth) {
    return setTimeout(() => {
      fadeOutIntro(el, 1);      
      return;
    }, 3000)
  }

  el.style.width = `${width}px`;

  const height = logoHeight * width / logoWidth;
  el.style.width = `${width}px`;
  el.style.left = `${screenWidth/2 - width/2 - 12}px`;
  el.style.top = `${screenHeight/2 - height/2 - 128}px`;
  
  const delta = width > screenWidth * 1.5 ? width / screenWidth * 4 : 2;

  setTimeout(() => {
    shrink(el, width - delta, logoWidth, logoHeight, screenWidth, screenHeight, finalWidth);
  }, 1);
}

const scrollLogo = (el, left, finalLeft) => {
  const scrollSpeed = IS_LANDSCAPE ? 1.5 : 5;
  return new Promise(resolve => {
    if (left <= finalLeft) {
      document.getElementById('js-btn-gallery-wr').style.display = 'block';
      return resolve();
    }
    setTimeout(() => {
      el.style.left = `${left}px`;
      scrollLogo(el, left - scrollSpeed, finalLeft)
        .then(resolve);
    }, 1);
  });
}

const displayIntro = async () => {
  const logoElem = document.getElementById('js-logo');
  logoElem.style.display = 'block';
  const logoWidth = logoElem.naturalWidth;
  const logoHeight = logoElem.naturalHeight;
  const screenWidth = getWidth();
  const screenHeight = getHeight();

  const finalWidth = IS_LANDSCAPE ? screenWidth * 0.8 : screenWidth * 0.96;
  // width & height have value to resize

  let width = IS_LANDSCAPE ? screenHeight * 20 : screenWidth * 300;
  let height = logoHeight * width / logoWidth;
  const finalLeft = screenWidth/2 - width/2;
  logoElem.style.width = `${width}px`;
  logoElem.style.left = `0px`;
  logoElem.style.top = `${screenHeight/2 - height*0.5}px`;
  
  await scrollLogo(logoElem, finalLeft * (IS_LANDSCAPE ? 0.93 : 0.98), finalLeft);

  setTimeout(() => shrink(logoElem, width, logoWidth, logoHeight, screenWidth, screenHeight, finalWidth), 100
  );
}

const renderLanding = (skipIntro = false) => {
  SHOULD_STOP_SHOW = false;
  PAGE = 'home';
  document.getElementById('js-main').style.display = 'none';
  
  // SLIDE_LIST.sort((a, b) => {
  //   const aRand = Math.random() + a.weight/100;
  //   const bRand = Math.random() + b.weight/100;
  //   return bRand - aRand;
  // });

  document.getElementById('js-img-0').style.height = `${getHeight()}px`;
  document.getElementById('js-img-1').style.height = `${getHeight()}px`;

  // document.getElementById('js-img-1').src = './img/m2.jpg'; // test purpose
  if (skipIntro) {
    document.getElementById('js-btn-gallery-wr').style.display = 'block';
  } else {
    displayIntro();
  }

  // set the first image during intro
  const startImage = './img/m1';
  // const startImage = Math.random() > 0.5 ? './img/m3' : './img/m1';
  // const slideInd = skipIntro ? 0 : SLIDE_LIST.findIndex(slide => slide.src === startImage);

  if (!SHOW_RUNNING) {
    playSlideShow(0, !skipIntro);
  } 
}

const main = () => {
  IS_LANDSCAPE = isLandscape();
  document.documentElement.style.fontSize = IS_LANDSCAPE ? '20px' : '16px'; 

  const screenWidth = getWidth();
  if (screenWidth > 2000) {
    document.documentElement.style.setProperty('--max-width', '1400px');
    document.documentElement.style.setProperty('--portrait-width', '900px');
  }

  const param = window.location.search.split(/=/);
  const id = param.length === 2 ? param[1] : '';
  // handleEvent();
  renderLanding(true);  
  // if (MENU_NAMES.every(name => id !== name)) {
  //   document.title = 'Anthony Photography';
  //   history.pushState({ page: 'home' }, '', '');
  //   renderLanding();
  // } else {
  // }
  
  // const addImageLoadEvent = addClassLoadEvent();
  // loadAnimeFrames(addImageLoadEvent); // initially load the frame images
}

main();


