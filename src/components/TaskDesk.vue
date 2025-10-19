<template>
  <div class="loading-container" v-if="loading">
    <p class="loading__text">Данные загружаются</p>
    <BaseLoader></BaseLoader>
  </div>
  <div v-else class="main__block">
    <div class="main__content">
      <BaseColumn :tasks="tasks" status="Без статуса" />
      <BaseColumn :tasks="tasks" status="Нужно сделать" />
      <BaseColumn :tasks="tasks" status="В работе" />
      <BaseColumn :tasks="tasks" status="Тестирование" />
      <BaseColumn :tasks="tasks" status="Готово" />
    </div>
  </div>

  <div v-if="isEmpty" class="empty-cards">
    <div class="empty-cards__text">Карточек нет</div>
  </div>
</template>

<script setup>
import BaseLoader from './BaseLoader.vue'
import { onMounted, ref } from 'vue'
import BaseColumn from './BaseColumn.vue'

const props = defineProps({
  tasks: Array,
  loading: Boolean,
  error: Error,
})
const isEmpty = ref(true)

onMounted(() => {
  if (props.tasks.length == 0) {
    isEmpty.value = false
  }
})
</script>

<style scoped>
.empty-cards {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.empty-cards__text {
  font-size: 35px;
  text-align: center;
  background-color: #ffffff;
  border-radius: 40px;
  border: black solid 2px;
  display: inline;
  padding: 5px 80px;
  margin-top: 60px;
}
.loading__text {
  font-size: 30px;
  color: rgb(148, 166, 190);
  padding-top: 120px;
  text-align: center;
}
.main__block {
  width: 100%;
  margin: 0 auto;
  padding: 25px 0 49px;
}
.main__content {
  width: 100%;
  display: flex;
}
</style>
