<template>
  <div class="wrapper">
    <div class="container-signup">
      <div class="modal">
        <div class="modal__block">
          <div class="modal__ttl">
            <h2>Регистрация</h2>
          </div>
          <form class="modal__form-login" id="formLogUp" action="#">
            <input
              :class="{
                _error: !isValidName,
                _correct: isValidName,
              }"
              class="modal__input"
              type="text"
              name="first-name"
              id="first-name"
              placeholder="Имя"
              v-model="login"
            />
            <input
              :class="{
                _error: !isValidEmail,
                _correct: isValidEmail,
              }"
              class="modal__input"
              type="text"
              name="login"
              id="loginReg"
              placeholder="Эл. почта"
              v-model="email"
            />
            <input
              :class="{
                _error: !isValidPassword,
                _correct: isValidPassword,
              }"
              class="modal__input"
              type="password"
              name="password"
              id="passwordFirst"
              placeholder="Пароль"
              v-model="password"
            />
            <div v-if="isError" class="error">{{ errorMessage }}</div>
            <button @click="handleSignUp" class="modal__btn-signup-ent _hover01" id="SignUpEnter">
              Зарегистрироваться
            </button>
            <div class="modal__form-group">
              <p>Уже есть аккаунт? <RouterLink to="/sign-in">Войдите здесь</RouterLink></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { signUp } from '@/services/auth'
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'

const login = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()
const errorMessage = ref()
const isError = ref(false)
const isValidEmail = ref(true)
const isValidName = ref(true)
const isValidPassword = ref(true)
const { setUserInfo } = inject('auth')

async function handleSignUp(e) {
  e.preventDefault()

  if (login.value == '' || email.value == '' || password.value == '') {
    errorMessage.value = 'Заполнены не все поля'
    isError.value = true
    isValidEmail.value = false
    isValidName.value = false
    isValidPassword.value = false
  } else if (!email.value.includes('@') || email.value.length < 4 || !email.value.includes(' ')) {
    errorMessage.value = 'Не правильно введена почта'
    isError.value = true
    isValidEmail.value = false
    isValidName.value = true
    isValidPassword.value = true
  } else {
    const data = await signUp({ name: login.value, login: email.value, password: password.value })
    setUserInfo(data)
    router.push('/') //
  }
}
</script>
<style scoped>
.error {
  color: #cc2626;
  margin-top: 10px;
}
._error {
  border: 0.7px solid #cc2626;
}
._correct {
  border: 0.7px solid rgba(148, 166, 190, 0.4);
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*:before,
*:after {
  box-sizing: border-box;
}

a,
a:visited {
  text-decoration: none;
  cursor: pointer;
}

button,
._btn {
  cursor: pointer;
}

ul li {
  list-style: none;
}

html,
body {
  width: 100%;
  height: 100%;
  font-family: 'Roboto', sans-serif;
}

div,
button,
a {
  font-family: 'Roboto', sans-serif;
}
.wrapper {
  width: 100%;
  height: 100%;
  background-color: var(--bg-color);
}
.container-signup {
  display: block;
  width: 100vw;
  min-height: 100vh;
  margin: 0 auto;
}

._hover01:hover {
  background-color: #33399b;
}

.modal {
  width: 100%;
  height: 100%;
  min-width: 320px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.modal__block {
  display: block;
  margin: 0 auto;
  background-color: var(--card-bg);
  max-width: 368px;
  width: 100%;
  padding: 50px 60px;
  border-radius: 10px;
  border: 0.7px solid var(--border-color);
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
}
.modal__ttl h2 {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.6px;
  margin-bottom: 20px;
  color: var(--text-color);
}
.modal__form-login {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.modal__form-login input:not(:last-child) {
  margin-bottom: 7px;
}
.modal__input {
  width: 100%;
  min-width: 100%;
  border-radius: 8px;
  outline: none;
  padding: 10px 8px;
  background: transparent;
  color: var(--input-text);
}
.modal__input::-moz-placeholder {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.28px;
  color: #94a6be;
}
.modal__input::placeholder {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.28px;
  color: #94a6be;
}
.modal__btn-signup-ent {
  width: 100%;
  height: 30px;
  background-color: #565eef;
  border-radius: 4px;
  margin-top: 20px;
  margin-bottom: 20px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  letter-spacing: -0.14px;
  color: #ffffff;
}
.modal__btn-signup-ent a {
  width: 100%;
  height: 100%;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal__form-group {
  text-align: center;
}
.modal__form-group p,
.modal__form-group a {
  color: rgba(148, 166, 190, 0.4);
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.14px;
}
.modal__form-group a {
  text-decoration: underline;
}

@media screen and (max-width: 375px) {
  .modal {
    background-color: #ffffff;
  }
  .modal__block {
    max-width: 368px;
    width: 100%;
    padding: 0 16px;
    border-radius: none;
    border: none;
    box-shadow: none;
  }
  .modal__btn-signup-ent {
    height: 40px;
  }
}
</style>
