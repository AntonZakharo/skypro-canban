<template>
  <div class="pop-new-card__calendar calendar">
    <p class="calendar__ttl subttl">Даты</p>

    <div class="calendar__block">
      <!-- Навигация -->
      <div class="calendar__nav">
        <div class="calendar__month">{{ monthNames[currentMonth] }} {{ currentYear }}</div>
        <div class="nav__actions">
          <div class="nav__action" @click="prevMonth">
            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11">
              <path
                d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z"
              />
            </svg>
          </div>
          <div class="nav__action" @click="nextMonth">
            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11">
              <path
                d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Сетка календаря -->
      <div class="calendar__content">
        <div class="calendar__days-names">
          <div class="calendar__day-name">пн</div>
          <div class="calendar__day-name">вт</div>
          <div class="calendar__day-name">ср</div>
          <div class="calendar__day-name">чт</div>
          <div class="calendar__day-name">пт</div>
          <div class="calendar__day-name">сб</div>
          <div class="calendar__day-name">вс</div>
        </div>

        <div class="calendar__cells">
          <div
            v-for="(day, index) in calendarDays"
            :key="index"
            class="calendar__cell _cell-day"
            :class="{
              '_other-month': day.otherMonth,
              _current:
                day.day === today.getDate() &&
                currentMonth === today.getMonth() &&
                currentYear === today.getFullYear(),
              _selected:
                selectedDate &&
                day.day === selectedDate.getDate() &&
                currentMonth === selectedDate.getMonth() &&
                currentYear === selectedDate.getFullYear() &&
                day.otherMonth === false,
            }"
            @click="selectDate(day)"
          >
            {{ day.day }}
          </div>
        </div>
      </div>

      <div class="calendar__period">
        <p v-if="isEditing" class="calendar__p date-end">
          Выберите срок исполнения
          <span class="date-control">
            {{ selectedDate ? selectedDate.toLocaleDateString() : '' }} </span
          >.
        </p>
        <p v-else class="calendar__p date-end">
          Cрок исполнения
          <span class="date-control"> {{ formatDate(taskDate) }} </span>.
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, inject } from 'vue'

defineProps({
  isEditing: Boolean,
  taskDate: String,
})

const formatDate = inject('formatDate')

const today = new Date()

const currentMonth = ref(today.getMonth())
const currentYear = ref(today.getFullYear())

const selectedDate = defineModel('date')

const monthNames = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

// Создаём массив ячеек календаря
const calendarDays = computed(() => {
  const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1)

  const startDayIndex = (firstDayOfMonth.getDay() + 6) % 7 // начинаем с понедельника
  const totalDays = getDaysInMonth(currentYear.value, currentMonth.value)

  const days = []

  // Дни предыдущего месяца
  const prevMonthDays = getDaysInMonth(currentYear.value, currentMonth.value - 1)
  for (let i = startDayIndex - 1; i >= 0; i--) {
    days.push({
      day: prevMonthDays - i,
      otherMonth: true,
    })
  }

  // Дни текущего месяца
  for (let d = 1; d <= totalDays; d++) {
    days.push({
      day: d,
      otherMonth: false,
    })
  }

  // Дни следующего месяца, чтобы завершить неделю\
  let remaining = 0
  if (days.length > 35) {
    remaining = 42 - days.length
  } else {
    remaining = 35 - days.length
  }

  for (let i = 1; i <= remaining; i++) {
    days.push({
      day: i,
      otherMonth: true,
    })
  }

  return days
})

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

function prevMonth() {
  const isCurrentMonth =
    currentMonth.value === today.getMonth() && currentYear.value === today.getFullYear()

  if (isCurrentMonth) return
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

function selectDate(dayObj) {
  if (dayObj.otherMonth) return

  const date = new Date(currentYear.value, currentMonth.value, dayObj.day)
  const now = new Date(today.getFullYear(), today.getMonth(), today.getDate())

  if (date < now) return // нельзя выбрать прошлое
  selectedDate.value = date
}
</script>
<style scoped>
.pop-new-card__calendar {
  width: 100%;
}

.nav__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav__action {
  width: 18px;
  height: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav__action svg {
  fill: #94a6be;
}
.subttl {
  color: var(--text-color);
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
}
._other-month {
  opacity: 0.5;
}

._cell-day:hover {
  color: #94a6be;
  background-color: #eaeef6;
}

._active-day {
  background-color: #94a6be;
  color: #ffffff;
}

.calendar__cell._current {
  font-weight: bold;
  color: rgb(124, 118, 118);
}
.calendar {
  width: 182px;
  margin-bottom: 20px;
}
.calendar__ttl {
  margin-bottom: 14px;
  padding: 0 7px;
}
.calendar__p {
  color: #94a6be;
  font-size: 10px;
  line-height: 1;
}
.calendar__p span {
  color: var(--calendar-text);
}
.calendar__block {
  display: block;
}
.calendar__month {
  color: #94a6be;
  font-size: 14px;
  line-height: 25px;
  font-weight: 600;
}
.calendar__content {
  margin-bottom: 12px;
}
.calendar__days-names {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  margin: 7px 0;
  padding: 0 7px;
}
.calendar__day-name {
  color: #94a6be;
  font-size: 10px;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.2px;
}
.calendar__cells {
  width: 182px;
  display: flex;
  flex-wrap: wrap;
}
.calendar__cell {
  width: 22px;
  height: 22px;
  margin: 2px;
  border-radius: 50%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  color: #94a6be;
  font-size: 10px;
  line-height: 1;
  letter-spacing: -0.2px;
  cursor: pointer;
}
.calendar__nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  padding: 0 7px;
}
.calendar__period {
  padding: 0 7px;
}
._selected {
  background: #94a6be;
  color: #ffffff;
}
</style>
