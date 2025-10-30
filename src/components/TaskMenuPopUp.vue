<template>
  <div class="pop-browse" id="popBrowse">
    <div class="pop-browse__container">
      <div class="pop-browse__block">
        <div class="pop-browse__content">
          <div class="pop-browse__top-block">
            <h3 class="pop-browse__ttl">{{ task.title }}</h3>
            <div :class="`categories__theme theme-top _${color[task.topic]} _active-category`">
              <p :class="`_${color[task.topic]}`">{{ task.topic }}</p>
            </div>
          </div>
          <div class="pop-browse__status status">
            <p class="status__p subttl">Статус</p>
            <div class="status__theme _gray">{{ task.status }}</div>
          </div>
          <div class="pop-browse__wrap">
            <form class="pop-browse__form form-browse" id="formBrowseCard" action="#">
              <div class="form-browse__block">
                <label for="textArea01" class="subttl">Описание задачи</label>
                <textarea
                  class="form-browse__area"
                  name="text"
                  id="textArea01"
                  :disabled="isDisabled"
                  placeholder="Введите описание задачи..."
                  :value="task.description"
                ></textarea>
              </div>
            </form>
            <BaseCalendar />
          </div>
          <div class="theme-down__categories theme-down">
            <p class="categories__p subttl">Категория</p>
            <div class="categories__theme _orange _active-category">
              <p class="_orange">Web Design</p>
            </div>
          </div>
          <div class="pop-browse__btn-browse">
            <div class="btn-group">
              <button class="btn-browse__edit _btn-bor _hover03">
                <a @onclick="editTask(route.params.id)">Редактировать задачу</a>
              </button>
              <button class="btn-browse__delete _btn-bor _hover03">
                <RouterLink to="/" @click="deleteTask(route.params.id)">Удалить задачу</RouterLink>
              </button>
            </div>
            <button class="btn-browse__close _btn-bg _hover01">
              <RouterLink to="/">Закрыть</RouterLink>
            </button>
          </div>
          <div class="pop-browse__btn-edit _hide">
            <div class="btn-group">
              <button class="btn-edit__edit _btn-bg _hover01"><a href="#">Сохранить</a></button>
              <button class="btn-edit__edit _btn-bor _hover03"><a href="#">Отменить</a></button>
              <button class="btn-edit__delete _btn-bor _hover03" id="btnDelete">
                <a href="#">Удалить задачу</a>
              </button>
            </div>
            <RouterLink to="/" class="btn-edit__close _btn-bg _hover01">
              <p>Закрыть</p>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, inject, ref } from 'vue'
import { useRoute } from 'vue-router'
import BaseCalendar from './BaseCalendar.vue'
import { deleteTask, editTask } from '@/services/api'

const { tasks } = inject('tasksData')
const route = useRoute()
const isDisabled = ref(true)

const task = computed(() => {
  return (
    tasks.value.find((t) => t._id == route.params.id) || {
      status: 'undefined',
      title: 'undefined',
      topic: 'undefined',
      description: 'undefined',
    }
  )
})
const color = computed(() => ({
  Research: 'green',
  'Web Design': 'orange',
  Copywriting: 'purple',
}))
</script>
<style scoped>
.loading-container {
  height: 10vh;
}
.categories {
  margin-bottom: 20px;
}
.categories__themes {
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-start;
}
.categories__p {
  margin-bottom: 14px;
}
.categories__theme {
  display: inline-block;
  width: auto;
  height: 30px;
  padding: 8px 20px;
  border-radius: 24px;
  margin-right: 7px;
  opacity: 0.4;
}
.categories__theme p {
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
  white-space: nowrap;
}
._hover01:hover {
  background-color: #33399b;
}
._hover03:hover {
  background-color: #33399b;
  color: #ffffff;
}
._hover03:hover a {
  color: #ffffff;
}
.categories__p {
  margin-bottom: 14px;
}

.subttl {
  color: #000;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
}
._gray {
  background: #94a6be;
  color: #ffffff;
}
._active-category {
  opacity: 1 !important;
}
._orange {
  background-color: #ffe4c2;
  color: #ff6d00;
}

._green {
  background-color: #b4fdd1;
  color: #06b16e;
}

._purple {
  background-color: #e9d4ff;
  color: #9a48f1;
}
.pop-browse {
  display: block;
  width: 100%;
  height: 100%;
  min-width: 375px;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 7;
}
.pop-browse__container {
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
.pop-browse__block {
  display: block;
  margin: 0 auto;
  background-color: #ffffff;
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 38px;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  position: relative;
}
.pop-browse__content {
  display: block;
  text-align: left;
}
.pop-browse__content .categories__theme {
  opacity: 1;
}
.pop-browse__content .theme-down {
  display: none;
  margin-bottom: 20px;
}
.pop-browse__content .theme-top {
  display: block;
}
.pop-browse__top-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}
.pop-browse__ttl {
  color: #000;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
}
.pop-browse__wrap {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.pop-browse__form {
  max-width: 370px;
  width: 100%;
  display: block;
  margin-bottom: 20px;
}
.pop-browse__btn-browse,
.pop-browse__btn-edit {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
}
.pop-browse__btn-browse button,
.pop-browse__btn-edit button {
  height: 30px;
  margin-bottom: 10px;
  padding: 0 14px;
}
.pop-browse__btn-browse .btn-group button,
.pop-browse__btn-edit .btn-group button {
  margin-right: 8px;
}

.form-browse__block {
  display: flex;
  flex-direction: column;
}
.form-browse__area {
  max-width: 370px;
  width: 100%;
  outline: none;
  padding: 14px;
  background: #eaeef6;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  margin-top: 14px;
  height: 200px;
}
.form-browse__area::-moz-placeholder {
  font-weight: 400;
  font-size: 14px;
  line-height: 1px;
  color: #94a6be;
  letter-spacing: -0.14px;
}
.form-browse__area::placeholder {
  font-weight: 400;
  font-size: 14px;
  line-height: 1px;
  color: #94a6be;
  letter-spacing: -0.14px;
}

.status {
  margin-bottom: 11px;
}
.status__p {
  margin-bottom: 14px;
}
.status__themes {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
}
.status__theme {
  border-radius: 24px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  font-size: 14px;
  line-height: 10px;
  color: white;
  padding: 10px 17.5px;
  margin-right: 7px;
  margin-bottom: 7px;
  display: inline-block;
}
.status__theme p {
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
}

._btn-bor {
  border-radius: 4px;
  border: 0.7px solid var(--palette-navy-60, #565eef);
  outline: none;
  background: transparent;
  color: #565eef;
}
._btn-bor a {
  color: #565eef;
}

._btn-bg {
  border-radius: 4px;
  background: #565eef;
  border: none;
  outline: none;
  color: #ffffff;
}
._btn-bg a {
  color: #ffffff;
}

._hide {
  display: none;
}

._dark {
  display: none;
}
</style>
