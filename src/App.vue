<script setup>
import './style.css';
import './assets/normalize.css';
import './assets/particles.css';
	
import { ref, watch, onMounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import ScrollTrigger from 'gsap/ScrollTrigger';
import animateLoader from './utils/animateLoader';
import animePath from './utils/animePath';
import preloadImages from './utils/preloadImages';
import setupReveal from './utils/setupReveal';
import NavBar from './components/NavBar.vue';
import anime from 'animejs';
import Particles from './utils/particles.js';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

const route = useRoute();
const router = useRouter();
const bg = ref('bio');
const firstLoad = ref(true);
const navBarRef = ref(null)
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
	  
 beforeEnter: async (el, done) => {
  await preloadImages(el);
  await nextTick();
  done(); 
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

    const afterEnter = async (el, done) => {                              
      await nextTick();
      setupReveal(el);
      ScrollTrigger.refresh();
      done();                       
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

    const triggerAnimation = () => {
    animePath(bg.value);      
    };

    onMounted(async () => {
  if (route.path !== '/bio') {
    await router.replace('/bio');
    bg.value = 'bio';
  }

  await nextTick();

  animateLoader(() => {
    updateButtonColors(route.path);
    triggerAnimation();
    firstLoad.value = false;
  });

  document.getElementById('btnload')?.addEventListener('click', () => {
    document.querySelector('.preloader-wrap')?.classList.add('hide');
  });
});

    watch(
      () => route.path,
      (newPath) => {
        if (firstLoad.value) return;

        if (newPath === '/bio') {
          bg.value = 'bio';
        } else if (newPath === '/photos') {
          bg.value = 'photos';
        }

	nextTick(() => {
	updateButtonColors(newPath);
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        triggerAnimation();
        });
       }
    );
</script>

<template>
<div :class="['bg', bg]">
<svg id="bio" class="transition transition-bio" viewBox="0 0 100 100" preserveAspectRatio="none">
  <path id="bioPath" fill="var(--light)" d="M 0 100 V 100 Q 50 100 100 100 V 100 z" />
</svg>
<svg id="photos" class="transition transition-photos" viewBox="0 0 100 100" preserveAspectRatio="none">
  <path id="photosPath" fill="var(--dark)" d="M 0 100 V 100 Q 50 100 100 100 V 100 z" />
</svg>
  <NavBar ref="navBarRef" />
	
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
