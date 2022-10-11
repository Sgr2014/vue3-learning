<template>
  <slot></slot>
  <div :style="fontStyle">
    <div class="rate" @mouseout="mouseOut">
      <span @mouseover="mouseOver(num)" v-for="num in 5" :key="num">☆</span>
      <span class="hollow" :style="fontWidth">
        <span @mouseover="mouseOver(num)" v-for="num in 5" :key="num" @click="onRate(num)">★</span>
      </span>
    </div>
  </div>
</template>
<script setup>
  /**
   * 问题：
   * 1、空心rate和实心rate宽度不一致，导致评分出现偏差
   * 2、父组件通过v-model传入的是ref对象，为什么props的modelValue不需要通过.value来获取值呢
   */
  import { defineProps, defineEmits, computed, ref } from 'vue'
  let props = defineProps({
    modelValue: Number,
    theme: {
      type: String,
      default: 'orange'
    }
  })
  let emits = defineEmits(['update:modelValue'])
  function onRate (num) {
    emits('update:modelValue', num)
  }
  // 很巧妙
  let rate = computed(() => {
    return "★★★★★☆☆☆☆☆".slice(5 - props.modelValue, 10 - props.modelValue)
  })
  const themes = {
    'black': '#000',
    'white': '#fff',
    'red': '#f5222d',
    'orange': '#fa541c',
    'yellow': '#fadb14',
    'green': '#73d13d',
    'blue': '#40a9ff'
  }
  const fontStyle = computed(() => {
    return `color:${themes[props.theme]}`
  })
  const fontWidth = computed(() => {
    return `width: ${width.value}em`
  })

  // 评分宽度
  let width = ref(props.modelValue)
  function mouseOver (i) {
    width.value = i
  }
  function mouseOut () {
    width.value = props.modelValue
  }
</script>
<style scoped>
  .rate{
    position:relative;
    display: inline-block;
  }
  .rate .empty {
    display: inline-block;
    width: 1em;
  }
  .rate > span.hollow {
    position: absolute;
    display: inline-block;
    top:0;
    left:0;
    width: 0;
    overflow:hidden;
  }
</style>