import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import contentShow from './contentShow.js'; 
import Particles from './particles.js'; 

gsap.registerPlugin(ScrollTrigger, SplitText);

function animateValue(element, start, end, duration) {
  const range = end - start;
  let current = start;
  const increment = end > start ? 1 : -1;
  const stepTime = Math.abs(Math.floor(duration / range));

  const timer = setInterval(() => {
    current += increment;
    element.textContent = current;
    if (current === end) {
      clearInterval(timer);
    }
  }, stepTime);
}

export default async function animateLoader() {
  const perfData = window.performance.timing;
  const estimatedTime = Math.abs(perfData.loadEventEnd - perfData.navigationStart);
  const time = Math.max(Math.floor((estimatedTime / 1000) % 60) * 100, 1200); 
  const loadbar = document.querySelector(".loadbar");
  const percentEl = document.getElementById("precent");

  if (loadbar) {
    gsap.to(loadbar, { width: "100%", duration: time / 1000 });
  }

  if (percentEl) {
    animateValue(percentEl, 0, 100, time);
  }

  await new Promise((resolve) => setTimeout(resolve, time));

  let percentBar = document.getElementById("precent");
  let loadingBar = document.getElementById("loader");
  
  const DOM = {};
  DOM.intro = document.querySelector(".preloader-wrap")  
  DOM.shape = DOM.intro.querySelector("svg.shape");
  DOM.path = DOM.intro.querySelector("path.goey");

  let tl = gsap.timeline({
    paused: true,
    onComplete: () => {     
      contentShow(); 
      ScrollTrigger.refresh();
    }
  });

  tl.to(".percentage", {
    autoAlpha: 0,
    duration: 1,
    delay: 1,
    ease: "none",
    onComplete: () => {
      percentBar.style.display = "none";
      tl.to("#loader", {
        autoAlpha: 0,
        duration: 1,
        ease: "quart.out",
        onComplete: () => {
          loadingBar.style.display = "none";
          tl.to(DOM.intro, {
            y: "-200vh",
            delay: 0.1,
            duration: 2,
            ease: "quad.inOut"
          });          
            gsap.to(DOM.path, {
              duration: 1.2,
              ease: "linear",
              attr: { d: DOM.path.getAttribute("pathdata:id") }
            });      
        }
      });
    }
  });

      (function show() {
    const arrOpts = [{      
      direction: 'bottom',
      duration: 1000,
      easing: 'easeInExpo'
    }];


  const btns = document.querySelectorAll(".wrapbtnloader");
  btns.forEach((container, pos) => {
    const bttn = il.querySelector("button.particles-button");
      if (!bttn) return;
      let particlesOpts = arrOpts[pos];
      const particles = new Particles(bttn, particlesOpts);

    gsap.to(bttn, {
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
    });

    gsap.to(bttn, {
        onComplete: () => {
          bttn.addEventListener("click", function () {
            particles.disintegrate();
            tl.play();
          });
        }
      });
    });
  })();
