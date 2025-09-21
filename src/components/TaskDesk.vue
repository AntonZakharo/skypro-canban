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
  <div class="loading-container" v-else><p class="loading">Данные загружаются</p></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import BaseColumn from './BaseColumn.vue'

const loading = ref(false)

onMounted(() => {
  setTimeout(() => {
    loading.value = true
  }, 1000)
})
</script>
