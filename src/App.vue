<script setup>
import './assets/normalize.css';
import './style.css';
import './assets/particles.css';
	
import { ref, watch, onMounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import ScrollTrigger from 'gsap/ScrollTrigger';
import animateLoader from './utils/animateLoader';
import animePath from './utils/animePath';
import preloadImages from './utils/preloadImages';
import NavBar from './components/NavBar.vue';
import anime from 'animejs/lib/anime.es.js';
import Particles from './utils/particles';
import Lenis from '@studio-freight/lenis';
import contentShow from './utils/contentShow'; 
import setupReveal from './utils/setupReveal';

gsap.registerPlugin(ScrollTrigger, SplitText);

const route = useRoute();
const router = useRouter();
const bg = ref('bio');
const firstLoad = ref(true);
const navBarRef = ref(null)
const btnNav1 = ref(null);
const btnNav2 = ref(null);
const mainRef = ref(null);

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

const beforeEnter = async (el, done) => {
  await nextTick();
  await preloadImages(el);
  ScrollTrigger.refresh();
  done(); 
}

/*const afterEnter = async (el, done) => {                              
  await router.isReady();
  await nextTick();
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    setupReveal(el);
    done();
  });    
}; */


	const afterEnter = async (el, done) => {
  await nextTick();
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    if (!firstLoad.value) {
      setupReveal(el);
    }
    done();
  });
};


const afterLeave = (el) => {
  if (el.ctx) {
    el.ctx.revert();
    delete el.ctx;	      
  }
};

const goToBio = async () => {
  if (route.path !== '/bio') {
    bg.value = 'bio';
    await router.push('/bio');
  } else {
   bg.value = 'bio';
  }

  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  triggerAnimation();
};

const goToPhotos = async () => {
  if (route.path !== '/photos') {
    bg.value = 'photos';
    await router.push('/photos');
  } else {
    bg.value = 'photos';
  }

  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  triggerAnimation();
};

const triggerAnimation = () => {
  animePath(bg.value);      
};

onMounted(async() => {	
await router.isReady();
  if (firstLoad.value && route.path !== '/bio') {
    await router.push('/bio');
    bg.value = 'bio';
}
	
  const lenis = new Lenis({
    duration: 2,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothWheel: true,
    touchMultiplier: 2,
    wheelMultiplier: 2,
    touchInertiaMultiplier: 35,
    syncTouch: true,
    autoResize: true
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

animateLoader(() => {  	  
    updateButtonColors(route.path);
    triggerAnimation();
    firstLoad.value = false;

if (mainRef.value) {
      console.log('🟢 setupReveal after preloader');
      setupReveal(mainRef.value);
    } else {
      console.warn('❌ mainRef.value is null');
	  }
	
  });	  
});

watch(
  () => route.path,
  async (newPath) => {
    bg.value = newPath === '/bio' ? 'bio' : 'photos';

    if (firstLoad.value) return;

    await nextTick();

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    triggerAnimation();
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
	
<NavBar
  :goToBio="goToBio"
  :goToPhotos="goToPhotos"
  :btnNav1="btnNav1"
  :btnNav2="btnNav2"
  ref="navBarRef"
/>

<main ref="mainRef">
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
