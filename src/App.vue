<script setup>
import './style.css';
import './assets/normalize.css';
import './assets/particles.css';
	
import { ref, watch, onMounted, nextTick } from 'vue';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useRoute, useRouter } from 'vue-router';
import animateLoader from './utils/animateLoader';
import animePath from './utils/animePath';
import preloadImages from './utils/preloadImages';
import setupReveal from './utils/setupReveal';
import NavBar from './components/NavBar.vue';
import anime from '@/utils/anime.js';
import Particles from '@/utils/particles.js';
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
	  
    const beforeEnter = async (el, done) => {
      await preloadImages(el);       
      await nextTick();                    
      ScrollTrigger.refresh();
      done();
    };

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

    onMounted(() => {	    
      if (route.path !== '/bio') {
        router.replace('/bio');
        bg.value = 'bio';
      }
      nextTick(() => {
	updateButtonColors(route.path); 
        triggerAnimation();
        firstLoad.value = false;
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
  <NavBar ref="navBarRef" />
<div class="preloader-wrap">
 <div class="intro-screen__title">
    <div class="wrapbtnloader theme-loader">
      <button id="btnload" class="particles-button">Enter</button>
    </div>
  </div> 
<div id="start">
  <div class="percentage" id="precent"></div>
    <div class="loader" id="loader">
     <div class="trackbar">
	<div class="loadbar"></div>
      </div>	    
    </div>
</div>
<div class="intro-screen__shape">
<svg class="shape" width="100%" height="100vh" preserveAspectRatio="none" viewBox="0 0 1440 800" xmlns:pathdata="http://www.codrops.com/">
<path class="goey" d="M -30.45,-43.86 -30.45,0 53.8,0 53.8,0 179.5,0 179.5,0 193.3,0 193.3,0 253.1,0 253.1,0 276.1,0 276.1,0 320.6,0 320.6,0 406.5,0 406.5,0 435.6,0 435.6,0 477,0 477,0 527.6,0 527.6,0 553.7,0 553.7,0 592,0 592,0 742.3,0 742.3,0 762.2,0 762.2,0 776,0 776,0 791.3,0 791.3,0 852.7,0 852.7,0 871.1,0 871.1,0 878.7,0 878.7,0 891,0 891,0 923.2,0 923.2,0 940.1,0 940.1,0 976.9,0 976.9,0 1031,0 1031,0 1041,0 1041,0 1176,0 1176,0 1192,0 1192,0 1210,0 1210,0 1225,0 1225,0 1236,0 1236,0 1248,0 1248,0 1273,0 1273,0 1291,0 1291,0 1316,0 1316,0 1337,0 1337,0 1356,0 1356,0 1414,0 1414,0 1432,0 1432,0 1486,0 1486,-43.86 Z" pathdata:id="M -30.45,-57.86 -30.45,442.6 53.8,443.8 53.8,396.3 179.5,396.3 179.5,654.7 193.3,654.7 193.3,589.1 253.1,589.1 253.1,561.6 276.1,561.6 276.1,531.2 320.6,531.2 320.6,238.6 406.5,238.6 406.5,213.9 435.6,213.9 435.6,246.2 477,246.2 477,289.9 527.6,289.9 527.6,263.3 553.7,263.3 553.7,280.4 592,280.4 592,189.2 742.3,189.2 742.3,259.5 762.2,259.5 762.2,103.7 776,103.7 776,77.11 791.3,77.11 791.3,18.21 852.7,18.21 852.7,86.61 871.1,86.61 871.1,231 878.7,240.5 878.7,320.3 891,320.3 891,434.3 923.2,434.3 923.2,145.5 940.1,145.5 940.1,117 976.9,117 976.9,139.8 1031,139.8 1031,284.2 1041,284.2 1041,242.4 1176,242.4 1176,282.3 1192,282.3 1192,641.4 1210,641.4 1210,692.7 1225,692.7 1225,599.6 1236,599.6 1236,527.4 1248,527.4 1248,500.8 1273,500.8 1273,523.6 1291,523.6 1291,652.8 1316,652.8 1316,533.1 1337,533.1 1337,502.7 1356,502.7 1356,523.6 1414,523.6 1414,491.3 1432,491.3 1432,523.6 1486,523.6 1486,-57.86 Z"></path>
</svg>
</div>	
</div>	
<router-view v-slot="{ Component }">
  <transition appear name="slide-fade" mode="out-in" @before-enter="beforeEnter" @after-enter="afterEnter" @after-leave="afterLeave">
    <component :is="Component" :key="$route.fullPath" />
  </transition>
</router-view>
</div>
</template>
