<template>
  <div class="main__column">
    <div class="column__title">
      <p>{{ status }}</p>
    </div>
    <div class="cards">
      <TaskItem
        v-for="task in tasks.filter((t) => t.status === status)"
        :key="task._id"
        :topic="task.topic"
        :title="task.title"
        :date="task.date"
        :id="task._id"
      />
    </div>
  </div>
</template>

<script setup>
import TaskItem from './TaskItem.vue'
defineProps({
  status: String,
  tasks: Array,
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
