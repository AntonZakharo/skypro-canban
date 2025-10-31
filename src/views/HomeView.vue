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
import { provide, ref, watch } from 'vue'
import { getTasks } from '@/services/api'

const router = useRouter()
const tasks = ref([])
const loading = ref(true)
const error = ref()

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

provide('tasksData', { tasks, error })
getTasks(tasks, error).then(() => {
  loading.value = false
})
watch(error, () => {
  router.push('/error')
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
  background-color: #eaeef6;
}
.container {
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;
}
</style>
