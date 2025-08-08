import gsap from 'gsap';
import contentShow from './contentShow.js';
import setupReveal from './setupReveal.js';

export default function afterPreload() {
  contentShow();
  setupReveal();
  ScrollTrigger.refresh();
}
