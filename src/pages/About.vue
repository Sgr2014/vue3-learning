<template>
  <h1>我是About页面</h1>
  <Rate v-model="score">
    <h2>评分</h2>
  </Rate>
</template>
<script setup>
  import { ref, watch } from 'vue'
  import Rate from '../components/Rate.vue'
  let score = ref(3.5)
  watch(score, (val) => {
    console.log(val, 'score.value...')
  })
</script>