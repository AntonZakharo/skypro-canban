<template>
  <div class="wrapper">
    <BaseHeader></BaseHeader>
    <main class="main">
      <div class="container">
        <TaskDesk></TaskDesk>
      </div>
    </main>
    <RouterView />
  </div>
</template>
<script setup>
import BaseHeader from '@/components/BaseHeader.vue'
import TaskDesk from '@/components/TaskDesk.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const token = localStorage.getItem('userInfo')
console.log(token)
if (!token) {
  router.push('/sign-in')
}
router.beforeEach((to, from, next) => {
  // Берем токен
  const token = localStorage.getItem('userInfo')

  // Проверяем, действительно ли на маршруте нужна авторизация и есть ли токен
  if (to.meta.requiresAuth && !token) {
    next('/sign-in') // Если нет, уводим на страницу входа
    console.log('dssdds')
  } else {
    next() // Иначе пропускаем пользователя
  }
})
</script>

<style scoped>
.main {
  width: 100%;
  background-color: #eaeef6;
}
.wrapper {
  max-width: 100%;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background-color: #f1f1f1;
}
.container {
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;
}
</style>
