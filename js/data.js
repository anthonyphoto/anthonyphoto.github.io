'use strict';

/*
 * lanscape 2x1: 2000 * 1000px
 * portrait 4x5: 960 * 1200px
 * weight -100 ~ +100
 */
const SLIDE_LANDING = './img/t_mj';

const SLIDE_LIST = [
  {
    src: './img/m1',
    weight: 0,    
  },
  {
    src: './img/m2',
    weight: 0,    
  },
  {
    src: './img/m3',
    weight: 0,    
  },
  {
    src: './img/m4',
    weight: 0,    
  },
  {
    src: './img/m5',
    weight: 0,    
  },
  {
    src: './img/m6',
    weight: 0,    
  },
  // {
  //   src: './img/m7',
  //   weight: 0,    
  // },
  {
    src: './img/m8',
    weight: 0,    
  },
  {
    src: './img/m9',
    weight: 0,    
  },
  // {
  //   src: './img/m14',
  //   weight: 0,    
  // }, 
  // {
  //   src: './img/m13',
  //   weight: 0,    
  // }, 
];

/*
 * stored in object in case additional attributes needed
 * mode:  0 two images with suffix -w for landscape
 *        1 One image file for both views
 *        2 One image file with portrait mode
 * title: text will display under the picture
 * 
 */
const PORTRAITS_LIB = [
  {
    src: './img/p_michael',
    mode: 0,
    title: '',
  },
  {
    src: './img/p_brenda',
    mode: 2,
    title: '',
  },
  {
    src: './img/p_nicole',
    mode: 2,
    title: '',
  },
  {
    src: './img/p_melody1',
    mode: 2,
    title: '',
  },
  {
    src: './img/p_mj',
    mode: 2,
    title: '',
  },
  {
    src: './img/p_chun',
    mode: 0,
    title: '',
  },
  {
    src: './img/p_summer',
    mode: 0,
    title: '',
  },
  {
    src: './img/p_kid1',
    mode: 2,
    title: '',
  },
  {
    src: './img/p_baby',
    mode: 0,
    title: '',
  },
  {
    src: './img/p_soyeon',
    mode: 0,
    title: '',
  },
  {
    src: './img/p_jiyu',
    mode: 2,
    title: '',
  },
  {
    src: './img/p_class',
    mode: 0,
    title: '',
  },

];

const EVENTS_LIB = [
  {
    src: './img/e_dagny',
    mode: 0,
    title: '',
  },
  {
    src: './img/e_nicole',
    mode: 0,
    title: '',
  },
  {
    src: './img/e_dance2',
    mode: 0,
    title: '',
  },
  {
    src: './img/e_grad',
    mode: 0,
    title: '',
  },
  {
    src: './img/e_hyuk',
    mode: 0,
    title: '',
  },
  {
    src: './img/e_grandpa1',
    mode: 0,
    title: '',
  },
  {
    src: './img/e_sarang',
    mode: 0,
    title: '',
  },
  {
    src: './img/e_dance',
    mode: 2,
    title: '',
  },
  {
    src: './img/e_melody1',
    mode: 0,
    title: '',
  },
  {
    src: './img/e_heebum',
    mode: 0,
    title: '',
  },
  // {
  //   src: './img/e_grandpa2',
  //   mode: 0,
  //   title: '',
  // },
  // {
  //   src: './img/e_bday',
  //   mode: 0,
  //   title: '',
  // },
];

const OTHERS_LIB = [
  {
    src: './img/o_wine',
    mode: 0,
    title: '',
  },
  {
    src: './img/o_seattle',
    mode: 0,
    // title: '',
  },
  {
    src: './img/o_venice',
    mode: 0,
    // title: '',
  },

  {
    src: './img/o_positano',
    mode: 0,
    // title: 'Positano, Italy',
  },
  {
    src: './img/o_comcast',
    mode: 2,
    // title: '',
  },
  {
    src: './img/o_starbucks',
    mode: 0,
    // title: 'The 1st Starbucks',
  },
  // {
  //   src: './img/o_versi',
  //   mode: 0,
  //   // title: 'Versailles Garden',
  // },
  // {
  //   src: './img/o_pitts',
  //   mode: 0,
  //   // title: '',
  // },
  // {
  //   src: './img/o_golden',
  //   mode: 0,
  //   // title: 'Golden Gate Bridge',
  // },
];
