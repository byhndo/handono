import gsap from 'gsap';

export default function animePath(bg){
const bioPath = document.getElementById("bioPath");
const photosPath = document.getElementById("photosPath");

const paths = {
    step1: {
      unfilled: "M 0 0 h 0 c 0 50 0 50 0 100 H 0 V 0 Z",
      inBetween: "M 0 0 h 33 c -30 54 113 65 0 100 H 0 V 0 Z",             
      filled: "M 0 0 h 100 c 0 50 0 50 0 100 H 0 V 0 Z"
    },

    step2: {
      unfilled: "M 100 0 h 0 c 0 50 0 50 0 100 H 100 V 0 Z",  
      inBetween: "M 100 0 h -33 c 30 54 -113 65 0 100 H 100 V 0 Z",
      filled: "M 100 0 h -100 c 0 50 0 50 0 100 H 100 V 0 Z"
    }
};
	
if (bg === 'bio' && bioPath) {

 const tl1 = gsap.timeline();
 tl1
    .set(bioPath, {attr: { d: paths.step1.unfilled }})
    .to(bioPath,{duration: 1.1, ease: "power3.in", attr: { d: paths.step1.inBetween }}, 0)
    .to(bioPath, {duration: .5, ease: "power1", attr: { d: paths.step1.filled } });

}
else if (bg === 'photos' && photosPath) {

 const tl2 = gsap.timeline(); 
  tl2
    .set(photosPath, {attr: { d: paths.step2.unfilled }})
    .to(photosPath, {duration: 1.1, ease: "power3.in", attr: { d: paths.step2.inBetween }}, 0)
    .to(photosPath, {duration: .5, ease: "power1", attr: { d: paths.step2.filled } });  

}
}
