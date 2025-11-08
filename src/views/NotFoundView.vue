<template>
  <div class="main">
    <div class="container"><p>Error 404. Page not found</p></div>
    <div class="container2"><RouterLink class="back" to="/">Вернуться на главную</RouterLink></div>
  </div>
</template>
<style scoped>
.main {
  background: #fff;
  height: 100vh;
  width: 100vw;
  position: relative;
}
.container {
  font-size: 35px;
  position: absolute;
  top: 0px;
  left: 0;
  background-color: #fff;
  display: block;
  width: 100%;
  text-align: center;
  padding: 50px 0px;
}
.container2 {
  position: absolute;
  top: 150px;
  left: 50%;
  transform: translate(-50%, -50%);
}
.back {
  padding: 10px 17.5px;
  font-size: 20px;
  border-radius: 4px;
  background: #565eef;
  border: none;
  outline: none;
  color: #ffffff;
}
.back:hover {
  background-color: #33399b;
}
</style>
