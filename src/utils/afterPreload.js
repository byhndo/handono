import contentShow from './contentShow.js';
import setupReveal from './setupReveal.js';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function afterPreload(container) {
  contentShow();
  setupReveal(container); 
  ScrollTrigger.refresh();
}
