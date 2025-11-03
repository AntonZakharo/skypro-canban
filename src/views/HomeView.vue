<template>
  <div class="wrapper">
    <BaseHeader></BaseHeader>
    <main class="main">
      <div class="container">
        <TaskDesk :loading="loading" :error="error"></TaskDesk>
      </div>
    </main>
    <RouterView />
  </div>
</template>
<script setup>
import BaseHeader from '@/components/BaseHeader.vue'
import TaskDesk from '@/components/TaskDesk.vue'
import { useRouter } from 'vue-router'
import { inject, provide } from 'vue'
import { getTasks } from '@/services/api'

const router = useRouter()
const { tasks, error, loading } = inject('tasksData')

const token = JSON.parse(localStorage.getItem('userInfo'))

if (token == null || !token.token) {
  router.push('/sign-in')
}
router.beforeEach((to, from, next) => {
  // Проверяем, действительно ли на маршруте нужна авторизация и есть ли токен
  if (to.meta.requiresAuth && !token.token) {
    next('/sign-in') // Если нет, уводим на страницу входа
  } else {
    next() // Иначе пропускаем пользователя
  }
})

getTasks(tasks, error).then(() => {
  loading.value = false
})

function formatDate(date) {
  date = new Date(date)
  let day = date.getDate()
  if (day < 10) {
    day = '0' + day
  }

  let month = date.getMonth() + 1
  if (month < 10) {
    month = '0' + month
  }

  const year = date.getFullYear() % 100
  const formattedYear = year < 10 ? '0' + year : year

  return `${day}.${month}.${formattedYear}`
}
provide('formatDate', formatDate)
</script>

<style scoped>
.main {
  width: 100%;
}
.wrapper {
  max-width: 100%;
  width: 100vw;
  min-height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-color);
}
.container {
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;
}
</style>
