import contentShow from './contentShow.js';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function afterPreload() {
  contentShow();
  ScrollTrigger.refresh();
}
