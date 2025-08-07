import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Particles from './particles.js'; 
gsap.registerPlugin(SplitText, ScrollTrigger);


export default function contentShow() {
document.documentElement.style.overflow = 'auto';
document.documentElement.style.height = 'auto';
document.body.style.overflow = 'auto';
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


export default function setupReveal(container) {
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
	
		 
} /*contentshow*/
