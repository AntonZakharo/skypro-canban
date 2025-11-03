<template>
  <RouterView></RouterView>
</template>
<script setup>
import { provide, ref, watch } from 'vue'
import { RouterView, useRouter } from 'vue-router'

const userInfo = ref(null)
const router = useRouter()
const tasks = ref([])
const loading = ref(true)
const error = ref()

function setUserInfo(value) {
  userInfo.value = value
  try {
    localStorage.setItem('userInfo', JSON.stringify(value))
  } catch (e) {
    console.error('ошибка:', e)
    return null
  }
}
function removeUserInfo() {
  userInfo.value = null
  try {
    localStorage.removeItem('userInfo')
  } catch (e) {
    console.error('ошибка:', e)
  }
}
provide('auth', { userInfo, setUserInfo, removeUserInfo })
provide('tasksData', { tasks, error, loading })
watch(error, () => {
  router.push('/error')
})
</script>
