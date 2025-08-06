import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');

const router = createRouter({
  history: createWebHashHistory(),
  routes
});


const app = createApp({
  setup() {
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

    return {
      bg,
      goToBio,
      goToPhotos,
      beforeEnter,
      afterEnter,
      afterLeave,
      btnNav1,
      btnNav2
    };
  },
});

app.use(router);
app.mount("#app");
