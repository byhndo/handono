import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import contentShow from './contentShow.js';
import setupReveal from './setupReveal.js';

gsap.registerPlugin(ScrollTrigger); 

export default function afterPreload() {
  contentShow();
  setupReveal();
  ScrollTrigger.refresh();
}
