<script setup>
import BaseHeader from '@/components/BaseHeader.vue'
import TaskDesk from '@/components/TaskDesk.vue'
</script>

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
