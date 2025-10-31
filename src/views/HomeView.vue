<template>
  <div class="wrapper">
    <BaseHeader></BaseHeader>
    <main class="main">
      <div class="container">
        <TaskDesk :tasks="tasks" :loading="loading" :error="error"></TaskDesk>
      </div>
    </main>
    <RouterView />
  </div>
</template>
<script setup>
import BaseHeader from '@/components/BaseHeader.vue'
import TaskDesk from '@/components/TaskDesk.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { getTasks } from '@/services/api'
const router = useRouter()
const token = localStorage.getItem('userInfo')
const tasks = ref([])
const loading = ref()
const error = ref()

if (!token) {
  router.push('/sign-in')
}
getTasks(tasks, loading, error).then(() => {
  loading.value = false
})

router.beforeEach((to, from, next) => {
  // Берем токен
  const token = localStorage.getItem('userInfo')

  // Проверяем, действительно ли на маршруте нужна авторизация и есть ли токен
  if (to.meta.requiresAuth && !token) {
    next('/sign-in') // Если нет, уводим на страницу входа
  } else {
    next() // Иначе пропускаем пользователя
  }
})
</script>

<style scoped>
.main {
  width: 100%;
}
.wrapper {
  max-width: 100%;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background-color: #eaeef6;
}
.container {
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;
}
</style>
