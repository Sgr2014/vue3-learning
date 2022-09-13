<template>
  <div class="todo-list">
    <input type="text" v-model="title" @keydown.enter="addTodo"/>
    <button @click="clear">清理</button>
    <ul v-if="todos.length">
      <li v-for="todo in todos" :key="todo.title">
        <input type="checkbox" v-model="todo.done"/>
        <span :class="{ done: todo.done }">{{ todo.title }}</span>
      </li>
    </ul>
    <div v-else>暂无数据</div>
    <div class="list-count">
      <div>{{ active }} / {{ all }}</div>
      全选<input type="checkbox" v-model="allDone"/>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { useMouse } from '../utils/mouse'

  let {x, y} = useMouse()
  console.log(x.value, y.value)

  let {title, todos, addTodo, clear, active, all, allDone} = useTodos()
  // 列表方法
  function useTodos () {
    // 初始化字符串
    let title = ref('')
    let todos = ref([{title: '学习Vue', done: false}])

    function addTodo () {
      // 由ref初始化的变量，都需要value赋值
      todos.value.push({
        title: title.value,
        done: false
      })
      title.value = ''
    }
    // 选中的删除
    function clear () {
      todos.value = todos.value.filter(v => !v.done)
    }
    // 选中的数量
    let active = computed(() => {
      return todos.value.filter(v => v.done).length
    })
    let all = computed(() => {
      return todos.value.length
    })
    let allDone = computed({
      get: function () {
        return active === all
      },
      set: function (value) {
        todos.value.forEach(item => {
          item.done = value
        })
      }
    })
    return { title, todos, addTodo, clear, active, all, allDone }
  }
</script>
<style>
  .todo-list h1 {
    color: red;
  }
  .todo-list ul {
    list-style: none;
  }
  .todo-list ul li {
    text-align: left;
    margin-left: 10px;
  }
  .todo-list .list-count {
    text-align: left;
    margin-left: 55px;
  }
</style>