<template>
  <div>
      <div class="homepage">
        <p class="black-title"> <span>欢迎使用LOCA全国高校研究生入学考试</span> </p>
        <p class="des">官方信息 查询系统</p>
        <div class="phone-block">
            <p class="black-title"> <span>请输入手机号</span> </p>
            <div class="input-body">
                <input type="number" name="" id="" class="phone" v-model="tel">
                <span class="sendMsg" @click="onMsgSend">{{phoneSendMsg}}</span>
            </div>
            <div class="input-body">
                <input type="number" name="" id="" v-model="valid">
            </div>
        </div>
        <img id="phone-logo" src="../assets/logo.png" alt="">
        <p style="font-size: 14px;">风景园林/建筑学/城乡规划</p>
        <p class="login">
            <span @click="onLogin">登陆</span>
        </p>
      </div>
      <div class="chose-school">

      </div>
  </div>
</template>
<style scoped>
p {
  margin: 5px 0;
}
.homepage {
    width: 100%;
    height: 100%;
    text-align: center;
    padding-top: 140px;
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
.login {
  margin: 40px;
}
.login span {
    background: black;
    color: white;
    padding: 10px 60px;
    border-radius: 10px;
}
.phone-block {
  width: 60%;
  margin: 40px auto;
  font-size: 14px;
}
.phone-block .black-title {
  text-align: left;
}
.input-body {
  border: black solid 1px;
  border-radius: 15px;
  margin: 10px 0;
  height: 30px;
  line-height: 30px;
}
.input-body .phone {
  width: 50%;
}
.input-body input {
  border: none;
}
.input-body .sendMsg {
  background: black;
  color: white;
  border-radius: 15px;
  padding: 3px 8px;
  height: 25px;
  line-height: 25px;
}
</style>

<script>
import 'vue-loaders/dist/vue-loaders.css'
import { isEmpty } from 'lodash'
function ajax () {
  var ajaxData = {
    type: arguments[0].type || 'GET',
    url: arguments[0].url || '',
    async: arguments[0].async || 'true',
    data: arguments[0].data || null,
    dataType: arguments[0].dataType || 'text',
    contentType: arguments[0].contentType || 'application/x-www-form-urlencoded',
    beforeSend: arguments[0].beforeSend || function () {},
    success: arguments[0].success || function () {},
    error: arguments[0].error || function () {}
  }
  ajaxData.beforeSend()
  var xhr = createxmlHttpRequest()
  xhr.responseType = ajaxData.dataType
  xhr.open(ajaxData.type, ajaxData.url, ajaxData.async)
  xhr.setRequestHeader('Content-Type', ajaxData.contentType)
  xhr.send(convertData(ajaxData.data))
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        ajaxData.success(xhr.response)
      } else {
        ajaxData.error()
      }
    }
  }
}

function createxmlHttpRequest () {
  if (window.ActiveXObject) {
    // eslint-disable-next-line
    return new ActiveXObject('Microsoft.XMLHTTP')
  } else if (window.XMLHttpRequest) {
    return new XMLHttpRequest()
  }
}

function convertData (data) {
  if (typeof data === 'object') {
    var convertResult = ''
    for (var c in data) {
      convertResult += c + '=' + data[c] + '&'
    }
    convertResult = convertResult.substring(0, convertResult.length - 1)
    return convertResult
  } else {
    return data
  }
}
export default {
  name: 'index',
  components: {
  },
  data () {
    return {
      phoneSendMsg: '发送验证码',
      tel: '',
      valid: '',
      validBackCode: '',
      validBackPhone: ''
    }
  },
  methods: {
    onMsgSend: function () {
      let countdown = 60
      function settime (_this) {
        if (countdown === 0) {
          _this.phoneSendMsg = '发送验证码'
        } else {
          countdown--
          _this.phoneSendMsg = `等待${countdown}秒`
          setTimeout(function () {
            settime(_this)
          }, 1000)
        }
      }
      if (this.tel !== '') {
        if (this.phoneSendMsg === '发送验证码') {
          let _this = this
          settime(_this)
          let url = `http://locateu.cn/tool/checkNumber.php?phone=${this.tel}`
          // let url = `http://suntingyao.com/tool/checkNumber.php?phone=${this.tel}`
          let data = {
            phone: this.tel
          }
          this.showLoading = true
          ajax({
            type: 'get',
            url: url,
            dataType: 'json',
            data: data,
            success: function (data) {
              if (data.state === 'success') {
                _this.validBackCode = data.num
                _this.validBackPhone = data.phone
              }
            },
            error: function () {
            }
          })
        }
      } else {
        alert('请填写手机号')
      }
    },
    onLogin: function () {
      let tel = this.tel
      let valid = this.valid
      if (tel === this.validBackPhone && valid === this.validBackCode && tel !== '') {
        this.submit()
      } else {
        alert('手机号和验证码不正确')
      }
    },
    submit: function () {
      let rowAry = ['userweixinname', 'userweixincode', 'mailphone']
      let infoAry = [this.WEIXINNAME, this.WEIXINCODE, this.tel]
      let url = ''
      let data = {}
      let that = this
      // let url = 'http://suntingyao.com/tool/sql.class.php?mod=save_user'
      if (this.isBack) {
        url = 'http://locateu.cn/tool/sql.class.php?mod=update_user'
        data = {
          rowAry: rowAry,
          infoAry: infoAry,
          openid: this.WEIXINCODE
        }
      } else {
        url = 'http://locateu.cn/tool/sql.class.php?mod=save_user'
        data = {
          rowAry: rowAry,
          infoAry: infoAry
        }
      }
      this.disabled = true
      ajax({
        type: 'post',
        url: url,
        dataType: 'json',
        data: data,
        success: function (data) {
          if (data.msg === 'error') {
            alert('提交失败！稍后来试试把')
          } else {
            that.$router.push(`/school`)
          }
        },
        error: function () {
        }
      })
    }
  },
  mounted () {
    this.WEIXINHEAD = window.WEIXINHEAD ? window.WEIXINHEAD : ''
    this.WEIXINNAME = window.WEIXINNAME ? window.WEIXINNAME : ''
    this.WEIXINCODE = window.WEIXINID ? window.WEIXINID : ''
    if (!isEmpty(this.WEIXINCODE)) {
      let url = 'http://locateu.cn/tool/sql.class.php?mod=getUserInfo'
      let param = {
        openid: this.WEIXINCODE
      }
      let that = this
      ajax({
        type: 'post',
        url: url,
        dataType: 'json',
        data: param,
        success: function (data) {
          if (isEmpty(data)) {
            return
          }
          let info = data[0]
          that.isBack = true
          that.collageName = info.colleges
          that.chosedSchool.schoolname = info.applyschoolname
          that.chosedSchool.schoolcode = info.applyschoolcode
          that.name = info.mailname
          that.mailProvince = info.mailprovince
          that.mailCity = info.mailcity
          that.mailArea = info.mailarea
          that.address = info.mailaddress
          that.tel = info.mailphone
          that.chosedMajor = info.majorcode
          that.major = info.majortype
          that.province = info.applyprovince
          that.chosedSchool = {
            id: info.applyschoolid,
            schoolname: info.applyschoolname,
            schoolcode: info.applyschoolcode,
            majorcode1: info.applyschoolmajorcode1,
            majorcode2: info.applyschoolmajorcode2,
            majorcode3: info.applyschoolmajorcode3,
            province: info.applyschoolprovince
          }
          setTimeout(() => {
            that.isSelect = true
          }, 0)
        },
        error: function () {
        }
      })
    }
  }
}
</script>
