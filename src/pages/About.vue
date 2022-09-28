<template>
  <h1>我是About页面</h1>
  <Rate :value="score"></Rate>
</template>
<script setup>
  import { ref } from 'vue'
  import Rate from '../components/Rate.vue'
  let score = ref(3)
</script>