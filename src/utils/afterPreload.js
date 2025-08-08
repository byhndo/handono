import contentShow from './contentShow.js';
import setupReveal from './setupReveal.js';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default async function afterPreload() {
  contentShow();
  await setupReveal(); 
  ScrollTrigger.refresh();
}
