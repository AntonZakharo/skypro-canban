<template>
  <div v-if="loading" class="main__block">
    <div class="main__content">
      <BaseColumn status="Без статуса" />
      <BaseColumn status="Нужно сделать" />
      <BaseColumn status="В работе" />
      <BaseColumn status="Тестирование" />
      <BaseColumn status="Готово" />
    </div>
  </div>
  <div class="loading-container" v-else>
    <p class="loading__text">Данные загружаются</p>
    <Loader></Loader>
  </div>
  <div v-if="isEmpty" class="empty-cards">
    <div class="empty-cards__text">Карточек нет</div>
  </div>
</template>

<script setup>
import Loader from './BaseLoader.vue'
import { onMounted, ref } from 'vue'
import BaseColumn from './BaseColumn.vue'
import { testTasks } from '@/mocks/tasks'

const loading = ref(false)
const isEmpty = ref(false)

onMounted(() => {
  setTimeout(() => {
    loading.value = true
  }, 3000)

  if (testTasks.length == 0) {
    setTimeout(() => {
      isEmpty.value = true
    }, 3000)
  }
  console.log(isEmpty)
  console.log(testTasks)
})
</script>

<style scoped>
.loading-container {
  height: 90vh;
}
.empty-cards {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.empty-cards__text {
  font-size: 35px;
  text-align: center;
  background: white;
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
