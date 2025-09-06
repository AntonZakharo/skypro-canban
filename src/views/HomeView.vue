<script setup>
import BaseHeader from '@/components/BaseHeader.vue'
import LogoutPopUp from '@/components/LogoutPopUp.vue'
import NewTaskPopUp from '@/components/NewTaskPopUp.vue'
import TaskDesk from '@/components/TaskDesk.vue'
import TaskMenu from '@/components/TaskMenu.vue'
</script>

<template>
  <div class="wrapper">
    <!-- pop-up start-->

    <LogoutPopUp />

    <NewTaskPopUp />

    <TaskMenu />

    <!-- pop-up end-->

    <BaseHeader></BaseHeader>
    <main class="main">
      <div class="container">
        <TaskDesk></TaskDesk>
      </div>
    </main>
  </div>
</template>
