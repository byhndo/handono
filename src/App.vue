<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { gsap } from 'gsap'
import $ from 'jquery'
import NavBar from './components/NavBar.vue'
</script>

<template>
<div :class="['bg', bg]">
  <NavBar />
</div>


  <router-view />
</template>


