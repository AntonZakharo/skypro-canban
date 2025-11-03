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
            <div class="status__themes" v-if="isEditing">
              <div
                :class="{
                  _gray: tempStatus === statusName,
                  status__theme_edit: tempStatus !== statusName,
                }"
                class="status__theme"
                @click="handleStatus(statusName)"
                v-for="(statusName, index) in statuses"
                :key="index"
              >
                {{ statusName }}
              </div>
            </div>
            <div v-else class="status__theme _gray">{{ task.status }}</div>
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
                  v-model="task.description"
                  :class="{
                    _error: isError,
                    _correct: !isError,
                  }"
                ></textarea>
              </div>
            </form>
            <BaseCalendar v-model:date="date" :isEditing="isEditing" :taskDate="task.date" />
          </div>
          <div v-if="isEditing" class="pop-browse__btn-edit">
            <div class="btn-group">
              <a @click="saveChanges" class="btn-edit__edit _btn-bg _hover01">Сохранить</a>
              <a
                @click="
                  () => {
                    isEditing = false
                    isDisabled = true
                  }
                "
                class="btn-edit__edit _btn-bor _hover03"
              >
                Отменить
              </a>
              <RouterLink to="/" @click="removeTask" class="btn-edit__delete _btn-bor _hover03">
                Удалить задачу
              </RouterLink>
            </div>
            <RouterLink to="/" class="btn-edit__close _btn-bg _hover01">Закрыть</RouterLink>
          </div>
          <div v-else class="pop-browse__btn-browse">
            <div class="btn-group">
              <a
                @click="
                  () => {
                    isEditing = true
                    isDisabled = false
                  }
                "
                class="btn-browse__edit _btn-bor _hover03"
              >
                Редактировать задачу
              </a>
              <RouterLink to="/" @click="removeTask" class="btn-browse__delete _btn-bor _hover03">
                Удалить задачу
              </RouterLink>
            </div>
            <RouterLink to="/" class="btn-browse__close _btn-bg _hover01">Закрыть</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, inject, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseCalendar from './BaseCalendar.vue'
import { deleteTask, editTask, getTasks } from '@/services/api'

function handleStatus(statusName) {
  tempStatus.value = statusName
}

async function saveChanges() {
  const t = {
    title: task.value.title,
    topic: task.value.topic,
    status: tempStatus.value,
    description: task.value.description,
    date: task.value.date,
  }
  console.log(t)
  if (t.description) {
    await editTask(route.params.id, JSON.stringify(t), error)
    getTasks(tasks, error)
    router.push('/')
  } else {
    isError.value = true
  }
}
async function removeTask() {
  await deleteTask(route.params.id, error)
  getTasks(tasks, error)
}

const { tasks, error } = inject('tasksData')
const route = useRoute()
const isDisabled = ref(true)
const isEditing = ref(false)
const router = useRouter()
const isError = ref(false)
const date = ref()

const task = computed(() => {
  return (
    tasks.value.find((t) => t._id == route.params.id) || {
      status: 'undefined',
      title: 'undefined',
      topic: 'undefined',
      description: 'undefined',
      date: Date(),
    }
  )
})
const tempStatus = ref(task.value.status)
const color = computed(() => ({
  Research: 'green',
  'Web Design': 'orange',
  Copywriting: 'purple',
}))
const statuses = ref({
  1: 'Без статуса',
  2: 'Нужно сделать',
  3: 'В работе',
  4: 'Тестирование',
  5: 'Готово',
})
watch(tasks, () => {
  const task = computed(() => {
    return (
      tasks.value.find((t) => t._id == route.params.id) || {
        status: 'undefined',
        title: 'undefined',
        topic: 'undefined',
        description: 'undefined',
        date: Date(),
      }
    )
  })
  tempStatus.value = task.value.status
})
</script>
<style scoped>
._correct {
  border: 0.7px solid rgba(148, 166, 190, 0.4);
}
._error {
  border: 0.7px solid #cc2626;
}
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
  color: var(--text-color);
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
}
._gray {
  background: #94a6be;
  color: var(--status-text);
}
._active-category {
  opacity: 1 !important;
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
  background-color: var(--card-bg);
  color: var(--text-color);
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 38px;
  border-radius: 10px;
  border: 0.7px solid var(--border-color);
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
.btn-group {
  display: flex;
}
.pop-browse__btn-browse a,
.pop-browse__btn-edit a {
  display: block;
  height: 30px;
  margin-bottom: 10px;
  padding: 10px 14px;
}
.pop-browse__btn-browse .btn-group a,
.pop-browse__btn-edit .btn-group a {
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
  background: var(--textarea-bg);
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
  gap: 7px;
}
.status__theme {
  border-radius: 24px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  color: var(--status-text);
  padding: 10px 16.5px;
  cursor: pointer;

  display: inline-block;
  font-weight: 400;
  font-size: 14px;
  line-height: 10px;
  letter-spacing: -1%;
}
.status__theme_edit {
  color: #94a6be;
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
  font-family: Roboto;
  font-weight: 500;
  font-size: 14px;
  line-height: 10px;
  letter-spacing: -1%;
  text-align: center;
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
  font-size: 14px;
  line-height: 10px;
  font-weight: 500;
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
