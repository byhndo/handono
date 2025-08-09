<script setup>
import './assets/normalize.css';
import './assets/particles.css';
import './style.css';
	
import { ref, watch, onMounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/all';
import anime from 'animejs/lib/anime.es.js';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

import preloadImages from './utils/preloadImages';
import animateLoader from './utils/animateLoader';
import afterPreload from './utils/afterPreload';
import setupReveal from './utils/setupReveal';
import animePath from './utils/animePath';
import Particles from './utils/particles';

const route = useRoute();
const router = useRouter();
const bg = ref('bio');
const firstLoad = ref(true);
const btnNav1 = ref(null);
const btnNav2 = ref(null);

const updateButtonColors = (path) => {
  if (!btnNav1.value || !btnNav2.value) return;

  let bgColor, textColor;

  if (path === '/bio') {
    bgColor = '#3C4048';   
    textColor = '#e6e7eb'; 
  } else if (path === '/photos') {
    bgColor = '#e6e7eb';   
    textColor = '#3C4048'; 
} 

  gsap.to([btnNav1.value, btnNav2.value], {
    backgroundColor: bgColor,
    color: textColor,
    duration: .8,
    delay: 1.03
  });
};

const triggerAnimation = () => {
  animePath(bg.value);      
};

const beforeEnter = async (el) => {
if (firstLoad.value) return  

  await nextTick();
  await preloadImages(el); 
  ScrollTrigger.refresh();
}

const afterEnter = async (el) => {  
  await router.isReady();
  await nextTick();

  requestAnimationFrame(() => {
	ScrollTrigger.refresh();
    setupReveal(el);                                  
  });
};

const afterLeave = (el) => {
  if (el.ctx) {
    el.ctx.revert();
    delete el.ctx;	      
  }
};

const goToBio = () => {
      if (route.path === '/bio') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      
      } else {
        bg.value = 'bio';
        router.push('/bio');
      }
};

const goToPhotos = () => {
      if (route.path === '/photos') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
     
      } else {
        bg.value = 'photos';
        router.push('/photos');
      }
};

onMounted(async() => {
 await router.isReady();

  if (firstLoad.value && route.path !== '/bio') {
   await router.replace('/bio');
    bg.value = 'bio';
  }

const lenis = new Lenis({
  duration: 2,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smooth: true,
  smoothTouch: 1, 
  smoothWheel: true,
  touchMultiplier: 2.3,
  syncTouch: true,   
  autoResize: true
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add(time => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
  
await nextTick(); 

animateLoader();
	
});

watch(() => route.path, (newPath) => {
  bg.value = newPath === '/bio' ? 'bio' : 'photos';
	
	updateButtonColors(route.path);    
    triggerAnimation();               
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
});
</script>

<template>
<div :class="['bg', bg]">
<svg id="bio" class="transition transition-bio" viewBox="0 0 100 100" preserveAspectRatio="none">
  <path id="bioPath" fill="var(--light)" d="M 0 100 V 100 Q 50 100 100 100 V 100 z" />
</svg>
<svg id="photos" class="transition transition-photos" viewBox="0 0 100 100" preserveAspectRatio="none">
  <path id="photosPath" fill="var(--dark)" d="M 0 100 V 100 Q 50 100 100 100 V 100 z" />
</svg>
	
<div class="wrapnav">
<div class="nav theme">
<button @click="goToBio" ref="btnNav1" class="particles-button">About</button> 
</div>
<div class="nav theme">
<button @click="goToPhotos" ref="btnNav2" class="particles-button">Photo</button> 
</div>
</div> 

<main>
<div class="header">
<div class="indicator">
<div class="indicator-dot"></div>
</div>	
<svg class="hidden">
  <defs>
    <filter id="noisetitle">
      <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur"></feGaussianBlur>
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -8" result="goo"></feColorMatrix>
      <feTurbulence type="fractalNoise" baseFrequency="0.01 1" numOctaves="1" seed="1" result="noise"></feTurbulence>
      <feDisplacementMap in="goo" in2="noise" scale="0" result="displacement"></feDisplacementMap>
      <feComposite in="SourceGraphic" in2="displacement" operator="atop"></feComposite>
      </filter>
  </defs>
</svg> 
<h1>Bayu<br>Handono</h1> 
<div class="sub-title">Life Sucks and Then You Die!</div>
</div>		
<router-view v-slot="{ Component }">
  <transition appear name="slide-fade" mode="out-in" @before-enter="beforeEnter" @after-enter="afterEnter" @after-leave="afterLeave">
    <component :is="Component" :key="$route.fullPath" />
  </transition>
</router-view>
</main>
</div>
</template>
