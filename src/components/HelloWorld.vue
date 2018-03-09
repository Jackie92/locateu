<template>
  <div class="content">
    <h1>资料收集页</h1>
    <div class="form">
      请填写本科院校<span class="red_star">*</span>
      <input type="text" v-model="collageName">
      选择专业<span class="red_star">*</span>
      <select name="" id=""></select>
      选择省份<span class="red_star">*</span>
      <select name="" id=""></select>
      选择报考学校<span class="red_star">*</span>
      <select name="" id=""></select>
      请填写姓名<span class="red_star">*</span>
      <select name="" id=""></select>
      请填写邮箱<span class="red_star">*</span>
      <select name="" id=""></select>
      请填写手机号<span class="red_star">*</span>
      <select name="" id=""></select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      msg: 'd',
      collageName: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.content {
  width: 98%;
  margin: 0 auto;
  background-color: #FFF;
  max-width: 700px;
  border-width: 0;
  border-color: #AAB2BD;
  box-shadow: 0 3px 5px rgba(0,0,0,0.15);
  padding-bottom: 10px;
}
.content h1 {
  border-bottom: 1px solid #C3C9D0;
  padding: 15px;
}
.form {
  padding: 0 15px;
}
.red_star {
  color: red;
  margin-top: 1px;
  display: inline-block;
  line-height: 14px;
  vertical-align: middle;
  height: 10px;
  padding: 0 2px;
  font-size: 20px;
}
.content input, .content select {
  display: block;
  margin-top: 3px;
  height: 40px;
  width: 90%;
  margin: 5px 0 0 0;
  padding: 0;
  border-radius: 3px;
  border: #AAB2BD solid 1px;
}
</style>
