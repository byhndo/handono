<script setup>
import { onMounted, ref } from 'vue';

const btnNav1 = ref(null);
const btnNav2 = ref(null);

defineExpose({
  btnNav1,
  btnNav2
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

