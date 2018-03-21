<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
html, body, #app {
  min-height: 100%;
}
body {
  background: url("./assets/bg.png") top center no-repeat;
  background-size: cover;
  font-family: "Microsoft YaHei", "微软雅黑";
}

</style>
