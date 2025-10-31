<template>
  <RouterView></RouterView>
</template>
<script setup>
import { provide, ref } from 'vue'
import { RouterView } from 'vue-router'

const userInfo = ref(null)

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
</script>

