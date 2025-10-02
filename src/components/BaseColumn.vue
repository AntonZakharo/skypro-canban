<template>
  <div class="main__column">
    <div class="column__title">
      <p>{{ status }}</p>
    </div>
    <div class="cards">
      <TaskItem
        v-for="task in testTasks.filter((t) => t.status === status)"
        :key="task.id"
        :topic="task.topic"
        :title="task.title"
        :date="task.date"
        :color="task.color"
        :id="task.id"
      />
    </div>
  </div>
</template>

<script setup>
import TaskItem from './TaskItem.vue'
import { testTasks } from '@/mocks/tasks'
defineProps({
  status: String,
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
