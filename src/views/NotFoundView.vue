<template>
  <div class="container"><p>Error 404. Page not found</p></div>
  <div class="container2"><RouterLink class="back" to="/">Вернуться на главную</RouterLink></div>
</template>
<style scoped>
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
  top: 200px;
  left: 50%;
  transform: translate(-50%, -50%);
}
.back {
  color: black;
  background-color: #fff;
  border: 2px solid black;
  border-radius: 25px;
  padding: 10px 17.5px;
  font-size: 20px;
}
</style>
