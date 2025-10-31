<template>
  <div class="loading-container" v-if="loading">
    <p class="loading__text">Данные загружаются</p>
    <BaseLoader></BaseLoader>
  </div>
  <div v-else>
    <div class="main__block">
      <div class="main__content">
        <BaseColumn status="Без статуса" />
        <BaseColumn status="Нужно сделать" />
        <BaseColumn status="В работе" />
        <BaseColumn status="Тестирование" />
        <BaseColumn status="Готово" />
      </div>
    </div>
    <div v-if="isEmpty" class="empty-cards">
      <div class="empty-cards__text">Карточек нет</div>
    </div>
  </div>
</template>

<script setup>
import BaseLoader from './BaseLoader.vue'
import { computed, inject } from 'vue'
import BaseColumn from './BaseColumn.vue'
defineProps({
  loading: Boolean,
  error: Error,
})

const { tasks } = inject('tasksData')

const isEmpty = computed(() => {
  return tasks.value.length == 0 ? true : false
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
  border: 0.7px solid black;
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
