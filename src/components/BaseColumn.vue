<template>
  <div class="main__column">
    <div class="column__title">
      <p ref="parag">{{ status }}</p>
    </div>
    <div class="cards"></div>
  </div>
</template>

<script setup>
import TaskItem from './TaskItem.vue'
import { testTasks, columns } from '@/mocks/tasks'
defineProps({
  status: String,
})

import { onMounted, ref, render, h } from 'vue'
const parag = ref(null)

onMounted(() => {
  for (let i = 0; i < testTasks.length; i++) {
    const status = parag.value.innerHTML

    if (testTasks[i].status === status) {
      const cards = document.querySelectorAll('.cards')[columns.indexOf(status)]

      const vnode = h(TaskItem, {
        topic: testTasks[i].topic,
        title: testTasks[i].title,
        date: testTasks[i].date,
      })

      const container = document.createElement('div')
      cards.appendChild(container)

      render(vnode, container)
    }
  }
})
</script>

<style scoped>
.main__column {
  width: 20%;
  margin: 0 auto;
  display: block;
}

.column__title {
  padding: 0 10px;
  margin: 15px 0;
}
.column__title p {
  color: #94a6be;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
}

.cards {
  width: 100%;
  display: block;
  position: relative;
}
</style>
