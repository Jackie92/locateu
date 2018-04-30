<template>
  <div>
      <div class="homepage">
        <p class="black-title"> <span>欢迎使用LOCA全国高校研究生入学考试</span> </p>
        <p>官方信息 查询系统</p>
        <div class="phone-block">
            <p class="black-title"> <span>请输入手机号</span> </p>
            <p>
                <input type="tel" name="" id="">
                <span>获取验证码</span>
            </p>
            <p>
                <input type="tel">
            </p>
        </div>
        <img id="phone-logo" src="../assets/logo.png" alt="">
        <p>风景园林/建筑学/城乡规划</p>
        <p class="login">
            <span>登陆</span>
        </p>
      </div>
      <div class="chose-school">

      </div>
  </div>
</template>
<style>
.homepage {
    width: 100%;
    height: 100%;
    text-align: center;
}
.black-title span{
    background: black;
    color: white;
    border-radius: 10px;
    padding: 2px 4px;
}
#phone-logo {
    width: 200px;
    height: 100px;
}
.login span {
    background: black;
    color: white;
    padding: 10px 60px;
    border-radius: 10px;
}
</style>

<script>
import 'vue-loaders/dist/vue-loaders.css'
export default {
  name: 'index',
  components: {
  },
  data () {
    return {
    }
  }
}
</script>
