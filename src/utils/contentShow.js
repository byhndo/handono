import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Particles from './particles.js'; 
gsap.registerPlugin(SplitText, ScrollTrigger);


export default function contentShow() {

document.documentElement.style.overflow = 'auto';
document.body.style.overflow = 'auto';
document.documentElement.style.height = 'auto';
document.body.style.height = 'auto';

				
const title = document.querySelector("h1");
const feBlur = document.querySelector(`#noisetitle feGaussianBlur`);
const feDisplacementMap = document.querySelector(`#noisetitle feDisplacementMap`);

let primitiveValues = { stdDeviation: 0, scale: 0 };

const titletl = gsap.timeline({
    defaults: {
      duration: 2.3,
      ease: "quart.out"
    },

    onUpdate: () => {
      feBlur.setAttribute("stdDeviation", primitiveValues.stdDeviation);
      feDisplacementMap.setAttribute("scale", primitiveValues.scale);
    }
  })
	
.to(primitiveValues, { 
    startAt: { stdDeviation: 50, scale: 250 },  
    stdDeviation: 0,  
    scale: 0  
  }, 0)

.to(title, { 
    startAt: {
      autoAlpha:0,
      opacity: 0  
    },
      autoAlpha:1,
      opacity: 1
}, 0);    
	  
let subtitle = new SplitText(".sub-title", { type: "chars, words" });

gsap.set(subtitle.chars, {
  autoAlpha:0,
  opacity:0
});
gsap.to(subtitle.chars, {
    duration: 2,
    autoAlpha:1,
    opacity: 1,
    ease: "quart.out",
    stagger: { from: "random", each: 0.03}
  }, "<");
gsap.set(".sub-title", {
  autoAlpha:1,
  opacity:1
});
	    
(function () {
  const arrOpts = [
    {
      color: "#068FFF",
      direction: "right",
      duration: 1000,
      easing: "easeInOutCubic"
    },

    {
      color: "#068FFF",
      direction: "left",
      duration: 1000,
      easing: "easeInOutCubic"
    }
  ];

  const items = document.querySelectorAll(".nav");

  items.forEach((el, pos) => {
    let bttn = el.querySelector(".particles-button");    
    bttn.style.pointerEvents = "none";    
    let particlesOpts = arrOpts[pos];
    const particles = new Particles(bttn, particlesOpts);
    let tl = gsap.timeline();
tl.to(items, {autoAlpha: 1});     
  bttn.addEventListener("click", () => {    
    tl.to(bttn,{
        autoAlpha: 0,
        onComplete: () => {
          particles.integrate({
            duration: 900,
            easing: "easeOutSine"
          });
           gsap.to(bttn, {
            duration: 1,
            onComplete: () => {
              bttn.style.opacity = "1";
              bttn.style.visibility = "visible";
              bttn.style.pointerEvents = "none"; 
              gsap.to(bttn, {
                onComplete: () => {
                  bttn.style.pointerEvents = "none";
                  gsap.to(bttn, {
                  onComplete: () => {
                  bttn.style.pointerEvents = "auto"; 
                }
              });
                }
              });
            }
          });
        }
      },">1");
     }); 

bttn.addEventListener("click", () => {      
      tl.to(items, {autoAlpha: 1});
      tl.to(bttn,{
          autoAlpha: 0,
          onUpdate: () => {
            particles.integrate({
              duration: 900,
              easing: "easeOutSine"
            });
            gsap.to(bttn, {
              duration: 1,
              onComplete: () => {
              bttn.style.opacity = "1";
              bttn.style.visibility = "visible";
                bttn.style.pointerEvents = "none"; 
                gsap.to(bttn, {
                onComplete: () => {
                  bttn.style.pointerEvents = "none"; 
                  gsap.to(bttn, {
                  onComplete: () => {
                  bttn.style.pointerEvents = "auto"; 
                }
              });
                }
              }); 
            }
            });
          }
        },"+=1.5");
      }); 

      tl.to(bttn,{
        autoAlpha: 0,
        onComplete: () => {
          particles.integrate({
            duration: 900,
            easing: "easeOutSine"
          });
          gsap.to(bttn, {
            duration: 1,
            onComplete: () => {
              bttn.style.opacity = "1";
              bttn.style.visibility = "visible";
              bttn.style.pointerEvents = "none"; 
              gsap.to(bttn, {
                onComplete: () => {
                  bttn.style.pointerEvents = "none"; 
		  gsap.to(bttn, {
                  onComplete: () => {
                  bttn.style.pointerEvents = "auto"; 
                 }
                });
                }
              });
            }
          });
        }
      },pos + 1.3);
    
    bttn.addEventListener("click", () => {      
      particles.disintegrate();               
    });
  });
})();

gsap.set('.indicator', {
 y:-100	
});
	
gsap.to('.indicator', {
 y:0,
 duration:dur,
 autoAlpha: 1,
 ease: easing,
 onComplete: () => {
 gsap.fromTo('.indicator', {
  autoAlpha: 1,
  y:0,
  ease: easing
 }, {
  autoAlpha: 0,
  y:-100,
  duration: dur,
  ease: easing,
  scrollTrigger: {
  scrub: 3,
  trigger: '.indicator',
  start: 'center 40%',
  end: 'center 70%'					
  }
 });
}
}, "+=2");
                    
gsap.to('.header', {  
 onComplete: () => {
  gsap.to(".header", {  
   y: "5dvh",
   ease: "cubic.out",
   scrollTrigger: {
    scrub: 3.5,
    trigger: '.header',
    start: 'top top'
  }
  })
    }
});
	
const lenis = new Lenis({
 duration: 2,
 easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
 orientation: "vertical",
 direction: "vertical",
 gestureDirection: "vertical",
 smooth: 2,
 smoothWheel: 2,
 touchMultiplier: 2,
 wheelMultiplier: 2, 
 touchInertiaMultiplier: 35,
 syncTouch: true,
 autoResize: true
});

lenis.on('scroll', (e) => {
  console.log(e);
})

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0);

	 
  }
