<script setup>
import { onMounted } from 'vue';

const props = defineProps({
  goToBio: Function,
  goToPhotos: Function,
  btnNav1: Object,
  btnNav2: Object
});

onMounted(() => {
  props.btnNav1.value = document.querySelector('.btn-about');
  props.btnNav2.value = document.querySelector('.btn-photos');
});
</script>

<template>
  
<div class="wrapnav">
<div class="nav theme">
<button @click="goToBio" ref="btnNav1" class="particles-button">About</button> 
</div>
<div class="nav theme">
<button @click="goToPhotos" ref="btnNav2" class="particles-button">Photo</button> 
</div>
</div> 

</template>

