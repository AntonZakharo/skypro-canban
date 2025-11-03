<template>
  <div class="overlay">
    <div class="overlay__container">
      <div class="error">
        <h2 class="error__heading">Ошибка</h2>
        <h3 class="error__text">{{ error }}</h3>
        <RouterLink class="error__link" to="/">x</RouterLink>
      </div>
    </div>
  </div>
</template>
<script setup>
import { inject } from 'vue'

let { error } = inject('tasksData')
error = String(error.value).slice(7)
</script>
<style lang="scss" scoped>
.overlay {
  display: block;
  width: 100%;
  height: 100%;
  min-width: 375px;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 7;
}
.overlay__container {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
}
.error {
  display: block;
  margin: 0 auto;
  background-color: #ffffff;
  max-width: 400px;
  width: 100%;
  padding: 25px 30px 38px;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  position: relative;
  &__heading {
    text-align: center;
    font-size: 30px;
    margin-bottom: 20px;
    color: black;
  }
  &__text {
    color: #cc2626;
    text-align: center;
  }
  &__link {
    position: absolute;
    top: 15px;
    right: 15px;
    color: black;
    padding: 0;
    width: 30.8px;
    text-align: center;
    border-radius: 5px;
    border: 0.7px solid #d4dbe5;
    font-size: 18px;
    &:hover {
      background: #f0f0f0;
    }
  }
}
</style>
