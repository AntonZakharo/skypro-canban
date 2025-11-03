<template>
  <div class="pop-new-card" id="popNewCard">
    <div class="pop-new-card__container">
      <div class="pop-new-card__block">
        <div class="pop-new-card__content">
          <h3 class="pop-new-card__ttl">Создание задачи</h3>
          <RouterLink to="/" class="pop-new-card__close">&#10006;</RouterLink>
          <div class="pop-new-card__wrap">
            <form class="pop-new-card__form form-new" id="formNewCard" action="#">
              <div class="form-new__block">
                <label for="formTitle" class="subttl">Название задачи</label>
                <input
                  class="form-new__input"
                  type="text"
                  name="name"
                  id="formTitle"
                  placeholder="Введите название задачи..."
                  v-model="name"
                  autofocus
                  :class="{
                    _correct: name || !isError,
                    error__input: !name && isError,
                  }"
                />
              </div>
              <div class="form-new__block">
                <label for="textArea" class="subttl">Описание задачи</label>
                <textarea
                  class="form-new__area"
                  name="text"
                  id="textArea"
                  placeholder="Введите описание задачи..."
                  v-model="desc"
                  :class="{
                    _correct: desc || !isError,
                    error__input: !desc && isError,
                  }"
                ></textarea>
              </div>
            </form>
            <BaseCalendar
              v-model:date="selectedDate"
              :isEditing="true"
              :class="{
                error__input: !selectedDate && isError,
              }"
            />
          </div>
          <div class="pop-new-card__categories categories">
            <p class="categories__p subttl">Категория</p>
            <div
              class="categories__themes"
              :class="{
                error__input: !category && isError,
              }"
            >
              <div
                v-for="cat in categories"
                :key="cat.id"
                :class="[
                  'categories__theme',
                  cat.color,
                  { '_active-category': category === cat.name },
                ]"
                @click="handleCategory(cat.name)"
              >
                <p :class="cat.color">{{ cat.name }}</p>
              </div>
            </div>
          </div>
          <div v-if="isError" class="error">Заполнены не все поля</div>
          <div
            :class="{
              _blocked: isBlocked,
            }"
            class="form-new__create _hover01"
            id="btnCreate"
            @click="createTask"
          >
            Создать задачу
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { inject, ref } from 'vue'
import BaseCalendar from './BaseCalendar.vue'
import { getTasks, postTask } from '@/services/api'
import { useRouter } from 'vue-router'

const name = ref()
const desc = ref()
const category = ref()
const selectedDate = ref()
const isError = ref(false)
const isBlocked = ref(false)
const router = useRouter()
const categories = [
  { id: 1, name: 'Web Design', color: '_orange' },
  { id: 2, name: 'Research', color: '_green' },
  { id: 3, name: 'Copywriting', color: '_purple' },
]
const { tasks, error } = inject('tasksData')

function handleCategory(selectedCategory) {
  category.value = selectedCategory
}

async function createTask() {
  const task = {
    title: name.value,
    description: desc.value,
    topic: category.value,
    date: selectedDate.value,
  }
  if (task.title && task.description && task.topic && task.date) {
    isBlocked.value = true
    await postTask(JSON.stringify(task), error)
    getTasks(tasks, error)
    router.push('/')
  } else {
    isError.value = true
  }
}
</script>
<style scoped lang="scss">
._blocked {
  pointer-events: none;
}
.error {
  color: #cc2626;
  text-align: center;
  &__input {
    border: 0.7px solid #cc2626;
    border-radius: 5px;
  }
}
._active-category {
  opacity: 1 !important;
}
.subttl {
  color: var(--text-ttl);
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
}
._hover01:hover {
  background-color: #33399b;
}
._orange {
  background-color: var(--card-theme-bg-orange);
  color: var(--card-theme-text-orange);
}

._green {
  background-color: var(--card-theme-bg-green);
  color: var(--card-theme-text-green);
}

._purple {
  background-color: var(--card-theme-bg-purple);
  color: var(--card-theme-text-purple);
}

.categories {
  margin-bottom: 20px;
}
.categories__themes {
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  width: fit-content;
  cursor: pointer;
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

.form-new__block {
  display: flex;
  flex-direction: column;
}
.form-new__input,
.form-new__area {
  width: 100%;
  outline: none;
  color: var(--text-color);
  padding: 14px;
  background: transparent;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
}
._correct {
  border: 0.7px solid rgba(148, 166, 190, 0.4);
}
.form-new__input::-moz-placeholder,
.form-new__area::-moz-placeholder {
  font-weight: 400;
  font-size: 14px;
  line-height: 1px;
  color: #94a6be;
  letter-spacing: -0.14px;
}
.form-new__input::placeholder,
.form-new__area::placeholder {
  font-weight: 400;
  font-size: 14px;
  line-height: 1px;
  color: #94a6be;
  letter-spacing: -0.14px;
}
.form-new__input {
  margin: 20px 0;
}
.form-new__area {
  max-width: 370px;
  margin-top: 14px;
  height: 200px;
}
.form-new__create {
  width: 132px;
  height: 30px;
  background-color: #565eef;
  border-radius: 4px;
  border: 0;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  line-height: 30px;
  color: #ffffff;
  float: right;
  text-align: center;
  padding: 0;
}
.pop-new-card {
  display: block;
  width: 100%;
  min-width: 375px;
  height: 100%;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 6;
}
.pop-new-card__container {
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
.pop-new-card__block {
  display: block;
  margin: 0 auto;
  background-color: var(--card-bg);
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 48px;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  position: relative;
}
.pop-new-card__content {
  display: block;
  text-align: left;
}
.pop-new-card__ttl {
  color: var(--text-color);
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 20px;
}
.pop-new-card__close {
  position: absolute;
  top: 20px;
  right: 30px;
  color: #94a6be;
  cursor: pointer;
}
.pop-new-card__close:hover {
  color: #000000;
}
.pop-new-card__wrap {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.pop-new-card__form {
  max-width: 370px;
  width: 100%;
  display: block;
  margin-bottom: 20px;
}
</style>
