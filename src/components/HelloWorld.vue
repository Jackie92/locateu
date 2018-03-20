<template>
  <div class="content">
    <h1>资料收集页</h1>
    <div class="form">
      <div class="list">
        <p>请填写本科院校<span class="red_star">*</span></p>
        <div :class="[!isEmpty(collageName) || !hasClickSub ? 'enter' : 'enter disabled']">
          <span class="fa fa-bank"></span>
          <input type="text" v-model="collageName">
        </div>
        <p v-if="isEmpty(collageName) && hasClickSub" class="hint"><i class="fa fa-exclamation-circle"></i> 请填写本科院校</p>
      </div>
      <div class="list">
        <p>选择专业<span class="red_star">*</span></p>
        <div :class="[!isEmpty(major) || !hasClickSub ? 'enter' : 'enter disabled']">
          <span class="fa fa-graduation-cap"></span>
          <select name="" id="" v-model="major" @change="onProvinceChange">
            <option value="cityplanning">城市规划</option>
            <option value="architecture">建筑学</option>
            <option value="landscape">风景园林</option>
          </select>
        </div>
        <p v-if="isEmpty(major) && hasClickSub" class="hint"><i class="fa fa-exclamation-circle"></i> 请选择专业</p>
      </div>
      <div class="list">
        <p>选择省份<span class="red_star">*</span></p>
        <div :class="[!isEmpty(province) || !hasClickSub ? 'enter' : 'enter disabled']">
          <span class="fa fa-map-signs"></span>
          <select name="" id="" v-model="province" @change="onProvinceChange">
            <option value="北京">北京市</option>
            <option value="浙江省">浙江省</option>
            <option value="天津市">天津市</option>
            <option value="安徽省">安徽省</option>
            <option value="上海市">上海市</option>
            <option value="福建省">福建省</option>
            <option value="重庆市">重庆市</option>
            <option value="江西省">江西省</option>
            <option value="山东省">山东省</option>
            <option value="河南省">河南省</option>
            <option value="湖北省">湖北省</option>
            <option value="湖南省">湖南省</option>
            <option value="广东省">广东省</option>
            <option value="海南省">海南省</option>
            <option value="山西省">山西省</option>
            <option value="青海省">青海省</option>
            <option value="江苏省">江苏省</option>
            <option value="辽宁省">辽宁省</option>
            <option value="吉林省">吉林省</option>
            <option value="台湾省">台湾省</option>
            <option value="河北省">河北省</option>
            <option value="贵州省">贵州省</option>
            <option value="四川省">四川省</option>
            <option value="云南省">云南省</option>
            <option value="陕西省">陕西省</option>
            <option value="甘肃省">甘肃省</option>
            <option value="黑龙江省">黑龙江省</option>
            <option value="香港特别行政区">香港特别行政区</option>
            <option value="澳门特别行政区">澳门特别行政区</option>
            <option value="广西壮族自治区">广西壮族自治区</option>
            <option value="宁夏回族自治区">宁夏回族自治区</option>
            <option value="新疆维吾尔自治区">新疆维吾尔自治区</option>
            <option value="内蒙古自治区">内蒙古自治区</option>
            <option value="西藏自治区">西藏自治区</option>
          </select>
        </div>
        <p v-if="isEmpty(province) && hasClickSub" class="hint"><i class="fa fa-exclamation-circle"></i> 请选择省份</p>
      </div>
      <div class="list">
        <p>选择报考学校<span class="red_star">*</span></p>
        <div :class="[!isEmpty(chosedSchool) || !hasClickSub ? 'enter' : 'enter disabled']">
          <span class="fa fa-bank"></span>
          <select name="" id="" v-model="chosedSchool">
            <option v-for="sc in school" :value="sc" v-bind:key="sc.id">
              {{sc.schoolname}}
            </option>
          </select>
        </div>
        <p v-if="isEmpty(chosedSchool) && hasClickSub" class="hint"><i class="fa fa-exclamation-circle"></i> 请选择报考学校</p>
      </div>
      <div class="list">
        <p>选择报考专业<span class="red_star">*</span></p>
        <div :class="[!isEmpty(chosedMajor) || !hasClickSub ? 'enter' : 'enter disabled']">
          <span class="fa fa-bank"></span>
          <select name="" id="" v-model="chosedMajor">
            <option v-if="chosedSchool.majorcode1" :value="chosedSchool.majorcode1">{{chosedSchool.majorcode1}}</option>
            <option v-if="chosedSchool.majorcode2" :value="chosedSchool.majorcode2">{{chosedSchool.majorcode2}}</option>
            <option v-if="chosedSchool.majorcode3" :value="chosedSchool.majorcode3">{{chosedSchool.majorcode3}}</option>
          </select>
        </div>
        <p v-if="isEmpty(chosedSchool) && hasClickSub" class="hint"><i class="fa fa-exclamation-circle"></i> 请选择报考学校</p>
      </div>
      <div class="list">
        <p>请填写姓名<span class="red_star">*</span></p>
        <div :class="[!isEmpty(name) || !hasClickSub ? 'enter' : 'enter disabled']">
          <span class="fa fa-child"></span>
          <input name="" id="" v-model="name"/>
        </div>
        <p v-if="isEmpty(name) && hasClickSub" class="hint"><i class="fa fa-exclamation-circle"></i> 请填写姓名</p>
      </div>
      <div class="list">
        <p>请填写邮箱<span class="red_star">*</span></p>
        <div :class="[!isEmpty(email) || !hasClickSub ? 'enter' : 'enter disabled']">
          <span class="fa fa-envelope-o fa-fw"></span>
          <input type="email" name="" id="" v-model="email">
        </div>
        <p v-if="isEmpty(email) && hasClickSub" class="hint"><i class="fa fa-exclamation-circle"></i> 请填写邮箱</p>
      </div>
      <div class="list">
        <p>请填写住址<span class="red_star">*</span></p>
        <v-distpicker @selected="onSelected"></v-distpicker>
        <div :class="[!isEmpty(address) || !hasClickSub ? 'enter address' : 'enter address disabled']">
          <span class="fa fa-address-book-o"></span>
          <input type="text" v-model="address">
        </div>
        <p v-if="isEmpty(address) && hasClickSub" class="hint"><i class="fa fa-exclamation-circle"></i> 请填写邮箱</p>
      </div>
      <div class="list">
        <p>请填写手机号<span class="red_star">*</span></p>
        <div :class="[!isEmpty(tel) || !hasClickSub ? 'enter' : 'enter disabled']">
          <span class="fa fa-mobile"></span>
          <input type="number" name="" id="" class="phone" v-model="tel">
          <span class="sendMsg" @click="onMsgSend">{{phoneSendMsg}}</span>
        </div>
        <p v-if="isEmpty(tel) && hasClickSub" class="hint"><i class="fa fa-exclamation-circle"></i> 请填写手机号</p>
      </div>
      <div class="list">
        <p>请填写验证码<span class="red_star">*</span></p>
        <div :class="[!isEmpty(valid) || !hasClickSub ? 'enter' : 'enter disabled']">
          <span class="fa fa-mobile"></span>
          <input type="number" name="" id="" v-model="valid">
        </div>
        <p v-if="isEmpty(valid) && hasClickSub" class="hint"><i class="fa fa-exclamation-circle"></i> 请填写验证码</p>
      </div>
      <div class="list">
        <div :class="[
          !isEmpty(collageName) && !isEmpty(major) && !isEmpty(province) && !isEmpty(chosedSchool) && !isEmpty(chosedMajor) && !isEmpty(name) && !isEmpty(email) && !isEmpty(address) && !isEmpty(tel) && !isEmpty(valid)
          ?
          'submit'
          :
          'submit submit-disable']"
          @click="submit">
          提交
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VDistpicker from 'v-distpicker'
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
  components: { VDistpicker },
  data () {
    return {
      msg: 'd',
      collageName: '',
      major: '',
      province: '',
      school: [],
      chosedSchool: {},
      name: '',
      email: '',
      address: '',
      tel: '',
      valid: '',
      hasCollage: false,
      hasClickSub: false,
      codeValid: false,
      chosedMajor: '',
      phoneSendMsg: '发送验证码'
    }
  },
  methods: {
    onProvinceChange: function () {
      let _this = this
      // let url = 'http://locateu.cn/tool/sql.class.php?mod=sql_province'
      let url = 'http://suntingyao.com/tool/sql.class.php?mod=sql_province'
      let data = {
        major: this.major,
        province: this.province.indexOf('市') > -1 ? this.province.replace('市', '') : this.province.indexOf('省') > -1 ? this.province.replace('省', '') : this.province
      }
      ajax({
        type: 'post',
        url: url,
        dataType: 'json',
        data: data,
        success: function (data) {
          console.log(data)
          _this.school = data
        },
        error: function () {
          console.log('error')
        }
      })
    },
    isEmpty: function (data) {
      return isEmpty(data)
    },
    onSelected: function (data) {
      console.log(data)
      this.addProvince = data.province.value + data.city.value + data.area.value
    },
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
              console.log('error')
            }
          })
        }
      } else {
        alert('请填写手机号')
      }
    },
    submit: function () {
      this.hasClickSub = true
      if (document.querySelector('.submit').className.indexOf('submit-disable') < 0) {
        // if (this.validBackCode === this.valid && this.tel === this.validBackPhone) {
        let rowAry = ['userweixinname', 'userweixincode', 'colleges', 'applyschoolname', 'applyschoolcode', 'mailname', 'email', 'mailaddress', 'mailphone', 'majorcode']
        let infoAry = [window.WEIXINNAME, window.WEIXINID, this.collageName, this.chosedSchool.schoolname, this.chosedSchool.schoolcode, this.name, this.email, this.addProvince + this.address, this.tel, this.chosedMajor]
        // let url = 'http://locateu.cn/tool/sql.class.php?mod=save_user'
        let url = 'http://suntingyao.com/tool/sql.class.php?mod=save_user'
        let data = {
          rowAry: rowAry,
          infoAry: infoAry
        }
        console.log(data)
        ajax({
          type: 'post',
          url: url,
          dataType: 'json',
          data: data,
          success: function (data) {
            console.log(data)
            alert('提交成功！分享到朋友圈试试')
          },
          error: function () {
            console.log('error')
          }
        })
        // } else {
        //   alert('验证码错误或手机号码不匹配！')
        // }
      }
    }
  },
  mounted () {
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
p, span, input, select {
  margin: 0;
  background: transparent;
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
  display: inline-block;
  margin-top: 3px;
  height: 40px;
  width: 90%;
  margin: 5px 0 0 0;
  padding: 0;
  /* border-radius: 3px;
  border: #AAB2BD solid 1px; */
  border: none;
}
.enter {
  border-radius: 3px;
  border: #AAB2BD solid 1px;
  padding: 0 5px;
  max-width: 330px;
}
.disabled {
  border: red solid 1px;
}
.list {
  margin: 20px 0;
}
.list p {
  margin-bottom: 10px;
}
.address {
  margin-top: 10px;
}
.submit {
  background-color: rgb(255, 133, 0);
  color: rgb(255, 255, 255);
  border-color: rgb(255, 255, 255);
  text-align: center;
  padding: 10px 15px;
  border-radius: 5px;
}
.submit-disable {
  background-color: rgb(250, 174, 92);
}
.sendMsg {
  display: block;
  padding: 5px 7px;
  background-color: rgb(255, 133, 0);
  color: rgb(255, 255, 255);
  border-color: rgb(255, 255, 255);
  border-radius: 3px;
  float: right;
  margin-top: 7px;
}
.sendMsg:hover {
  background-color: rgba(255, 132, 0, 0.726)
}
.phone {
  width: 63%!important;
}
.hint {
  color: red;
}
</style>
