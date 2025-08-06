<script setup>
import { ref } from 'vue'
const { goToBio, goToPhotos, btnNav1, btnNav2 } = defineProps()
</script>

<template>
<div>
  
<div class="wrapnav">
<div class="nav theme">
<button @click="goToBio" ref="btnNav1" class="particles-button">About</button> 
</div>
<div class="nav theme">
<button @click="goToPhotos" ref="btnNav2" class="particles-button">Photo</button> 
</div>
</div> 

</div>
</template>

