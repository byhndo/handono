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
//import setupReveal from './utils/setupReveal';
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
      if (route.path === '/photos') {        window.scrollTo({ top: 0, behavior: 'smooth' });
     
      } else {
        bg.value = 'photos';
        router.push('/photos');
      }
};

let ctx;
onMounted(async() => {
await router.isReady();

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
requestAnimationFrame(() => {
  animateLoader();
});





const easing = "expoScale(0.5,7,none)";
const dur = 1;
const once = "play none none reset";
const delaytl = .5;
	
container.ctx = gsap.context(() => {	
	
const RevealBoxsme = container.querySelectorAll(".boxme");
   RevealBoxsme.forEach((boxme, a) => { 	   	   
    const aboutme = boxme.querySelectorAll(".aboutme");
    let tl = gsap.timeline({
    scrollTrigger: {
     trigger: boxme,
     toggleActions: once
     }, delay:delaytl
     }); 

tl.set(aboutme, {
 y:50	
});
	   
tl.to(aboutme, {
 autoAlpha: 1,
 opacity: 1,
 y:0,
 duration:dur,
 stagger:.07,
 ease: easing
}, a * .2);

});	  
	 
const RevealBoxs = container.querySelectorAll(".box");
   RevealBoxs.forEach((box, g) => { 	   	   
    const gr = box.querySelectorAll(".gr");
    let tl = gsap.timeline({
    scrollTrigger: {
     trigger: box,
     toggleActions: once
     }, delay:delaytl
     }); 

tl.set(gr, {
 autoAlpha:1
});
	   
tl.to(gr, {
 duration:dur,	
 width:"100%",
 stagger:.07,
 ease:easing
}, g * .2);	

});	  
	 
const RevealBoxsline = container.querySelectorAll(".boxline");
   RevealBoxsline.forEach((boxline, l) => { 	   	   
    const line = boxline.querySelectorAll(".line");
    let tl = gsap.timeline({
    scrollTrigger: {
     trigger: boxline,
     toggleActions: once
     }, delay:delaytl
     }); 

tl.set(line, {
 autoAlpha:1
});
	   
tl.to(line, {
 duration: dur,	
 width: "100%",
 stagger: .07,
 ease: easing
}, l * .2);	

});	  
	 
const RevealBoxs1 = container.querySelectorAll(".box1");
RevealBoxs1.forEach((box1) => { 	
const one = box1.querySelectorAll(".one"); 
const feBlur = box1.querySelector(`#noiseone feGaussianBlur`);
const feDisplacementMap = box1.querySelector(`#noiseone feDisplacementMap`);
          
let primitiveValues = { stdDeviation: 0, scale: 0 };
 
const tl = gsap.timeline({
    defaults: {
      duration: 2,
      ease: 'expo.out'
},
  
  onUpdate: () => {
      feBlur.setAttribute('stdDeviation', primitiveValues.stdDeviation);
      feDisplacementMap.setAttribute('scale', primitiveValues.scale);
    },  
    
  scrollTrigger: {
     trigger: box1, 
     toggleActions: once
    }, delay:delaytl
  });

tl.to(primitiveValues, { 
    startAt: { stdDeviation: 35, scale: 250 },  
    stdDeviation: 0,  
    scale: 0 
  }, 0)

.to(one, { 
    duration: 1.3,
    startAt: {
      opacity: 0, 
      autoAlpha:0,
      scale: 0.8,
      yPercent: 20
    },
    opacity: 1, 
    autoAlpha:1,
    scale: 1,
    yPercent: 0  
  }, 0);

});

const revealvline = container.querySelectorAll(".vline");
revealvline.forEach((vline) => {
  const vl = vline.querySelectorAll(".vl");             
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: vline,
      toggleActions: once,
      scrub: 2,
      start: "top bottom",
      end : "bottom 50%"
    }, delay:delaytl
  });

tl.set(vl, {
 autoAlpha:1
});
	
tl.to(vl, {
 height:"200px"
})
  
});

const rboxs = container.querySelectorAll(".rbox");
rboxs.forEach((rbox) => { 	
const one2 = rbox.querySelectorAll(".one2"); 
const feBlur = rbox.querySelector(`#noisetwo feGaussianBlur`);
const feDisplacementMap = rbox.querySelector(`#noisetwo feDisplacementMap`);
          
let primitiveValues = { stdDeviation: 0, scale: 0 };
 
const tl = gsap.timeline({
    defaults: {
      duration: 2,
      ease: 'expo.out'
},
  
  onUpdate: () => {
      feBlur.setAttribute('stdDeviation', primitiveValues.stdDeviation);
      feDisplacementMap.setAttribute('scale', primitiveValues.scale);
    },  
    
  scrollTrigger: {
     trigger: rbox, 
     toggleActions: once
    }, delay:delaytl
  });

tl.to(primitiveValues, { 
    startAt: { stdDeviation: 35, scale: 250 },  
    stdDeviation: 0,  
    scale: 0 
  }, 0)

.to(one2, { 
    duration: 1.3,
    startAt: {
      opacity: 0, 
      autoAlpha:0,
      scale: 0.8,
      yPercent: 20
    },
    opacity: 1, 
    autoAlpha:1,
    scale: 1,
    yPercent: 0  
  }, 0);

});
		 
const RevealBoxs2 = container.querySelectorAll(".box2");
 RevealBoxs2.forEach((box2, i) => { 	   	   
 const two = box2.querySelectorAll(".two");
 let tl = gsap.timeline({
  scrollTrigger: {
   trigger: box2,
   toggleActions: once
   }, delay:delaytl
   });
	 
tl.set(two, {
 y:50	
});
	 
tl.to(two, {
 autoAlpha: 1,
 opacity: 1,
 y:0,
 duration: dur,
 stagger:.07,
 ease: easing
}, i * .2);
	   
});      
      	 
document.fonts.ready.then(() => {
const RevealBoxs3 = container.querySelectorAll(".box3");
 RevealBoxs3.forEach((box3) => {
 const quote = box3.querySelector(".quote");
      
 if (quote.splitText) {
    quote.splitText.revert();
 }
   
 const split = SplitText.create(quote, { type: "chars, words" });    
 quote.splitText = split; 
   
 let tl = gsap.timeline({
 scrollTrigger: {
  trigger: box3,
  toggleActions: once,
  scrub:2,
  start: "top bottom",
  end : "bottom 50%"
 }, delay:delaytl
 })
 
.set(split.chars, { autoAlpha: 0 })
.set(quote, { autoAlpha: 1 })
   
.to(split.chars, {
 ease: "expo.in",
 autoAlpha:1,
 opacity: 1,
  stagger: { from: "random", each: 0.01 }
}) 
});  
});
	 
const revealContainers = container.querySelectorAll(".item"); 
 revealContainers.forEach((el, i) => {
 let tl = gsap.timeline({ 
 scrollTrigger: {
  trigger: el,
  toggleActions: once
  }, delay:delaytl
 });
	 
tl.to(el, {
 autoAlpha: 1,
 "--x": "-98.75%",
 ease: "steps(39)",
 duration: 2
}, i * .02);

});

const items = container.querySelectorAll(".sc");
  items.forEach((soc) => {
    const item = soc.querySelectorAll(".item-soc");                              
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: soc,
        toggleActions: once
      }, delay:delaytl
    });
	  	  
tl.to(item, {
 autoAlpha:1,
 duration: dur,
 ease: easing
});	  
          
})
        	 
const RevealBoxs4 = container.querySelectorAll(".box4");
 RevealBoxs4.forEach((box4) => {
 const footer = box4.querySelectorAll(".footer");                              
 let tl = gsap.timeline({
 scrollTrigger: {
  trigger: box4,
  toggleActions: once
 }, delay:delaytl
 });  
	 
tl.to(footer, {
 autoAlpha:1,
 duration:dur,
 ease: easing
}); 
		 	                                                                                                                  
});	
	
}, container); /* ctx */
		
} /* setupReveal */




						
});

onUnmounted(() => {
  ctx.revert();
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
