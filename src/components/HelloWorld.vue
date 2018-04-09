<template>
  <div class="content">
    <div class="loading" v-if="showLoading">
      <pacman-loader color="lightblue"></pacman-loader>
    </div>
    <div class="pic_des"><img src="../assets/j_01.png" alt=""></div>
    <div class="form">
      <div class="list">
        <p>请填写本科就读高校<span class="red_star">*</span></p>
        <div :class="[!isEmpty(collageName) || !hasClickSub ? 'enter' : 'enter disabled']">
          <span class="fa fa-bank"></span>
          <input type="text" v-model="collageName">
        </div>
        <div class="origin-body" v-if="originColleges.length > 0" v-show="!isSelect">
            <p v-for="col in originColleges" v-bind:key="col.no" @click="originClick(col)">
              {{col.schoolname}}
            </p>
          </div>
        <p style="color: darkgray">帮你看看有多少小伙伴和你一起拼搏</p>
        <p v-if="isEmpty(collageName) && hasClickSub" class="hint"><i class="fa fa-exclamation-circle"></i> 请填写本科院校</p>
      </div>
      <div class="list">
        <p>请选择报考专业类别<span class="red_star">*</span></p>
        <div :class="[!isEmpty(major) || !hasClickSub ? 'enter' : 'enter disabled']">
          <span class="fa fa-edit"></span>
          <select name="" id="" v-model="major" @change="onProvinceChange">
            <option value="">请选择</option>
            <option value="cityplanning">城市规划</option>
            <option value="architecture">建筑学</option>
            <option value="landscape">风景园林</option>
          </select>
        </div>
        <p v-if="isEmpty(major) && hasClickSub" class="hint"><i class="fa fa-exclamation-circle"></i> 请选择专业</p>
      </div>
      <div class="list">
        <p>请选择招生单位所处省份<span class="red_star">*</span></p>
        <div :class="[!isEmpty(province) || !hasClickSub ? 'enter' : 'enter disabled']">
          <select name="" id="" v-model="province" @change="onProvinceChange">
            <option value="">请选择</option>
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
        <p>请选择招生单位名称<span class="red_star">*</span></p>
        <div :class="[!isEmpty(chosedSchool) || !hasClickSub ? 'enter' : 'enter disabled']">
          <span class="fa fa-bank"></span>
          <select name="" id="" v-model="chosedSchool">
            <option value="">请选择</option>
            <option v-for="sc in school" :value="sc" v-bind:key="sc.id">
              {{sc.schoolname}}
            </option>
          </select>
        </div>
        <p v-if="isEmpty(chosedSchool) && hasClickSub" class="hint"><i class="fa fa-exclamation-circle"></i> 请选择报考学校</p>
      </div>
      <div class="list">
        <p>请选择具体报考专业名称<span class="red_star">*</span></p>
        <div :class="[!isEmpty(chosedMajor) || !hasClickSub ? 'enter' : 'enter disabled']">
          <select name="" id="" v-model="chosedMajor">
            <option value="">请选择</option>
            <option v-if="chosedSchool.majorcode1" :value="chosedSchool.majorcode1">{{chosedSchool.majorcode1}}</option>
            <option v-if="chosedSchool.majorcode2" :value="chosedSchool.majorcode2">{{chosedSchool.majorcode2}}</option>
            <option v-if="chosedSchool.majorcode3" :value="chosedSchool.majorcode3">{{chosedSchool.majorcode3}}</option>
          </select>
        </div>
        <p style="color: darkgray">你可以知道有多少竞争对手，并且<br>他们是否来自985/211/双一流</p>
        <p v-if="isEmpty(chosedSchool) && hasClickSub" class="hint"><i class="fa fa-exclamation-circle"></i> 请选择报考学校</p>
      </div>
    </div>
    <div class="pic_des"><img src="../assets/j_03.png" alt=""></div>
    <div class="form_person">
      <div class="list" style="margin-bottom: 10px;">
        <p>请输入你的收件地址<span class="red_star">*</span></p>
        <p style="color: darkgray">（请确保在5-6月能顺利收到邮件）</p>
        <v-distpicker @selected="onSelected"></v-distpicker>
        <div class="enter address">
          <input type="text" v-model="address">
        </div>
      </div>
      <div class="list" style="overflow:hidden;margin-bottom: 10px;">
        <p style="float:left;padding-top:10px;">收件人<span class="red_star">*</span></p>
        <div style="float:left;width:50%;margin-left:10px;" :class="[!isEmpty(name) || !hasClickSub ? 'enter' : 'enter disabled']">
          <input name="" id="" v-model="name"/>
        </div>
        <p v-if="isEmpty(name) && hasClickSub" class="hint"><i class="fa fa-exclamation-circle"></i> 请填写姓名</p>
      </div>
      <!-- <div class="list" style="display:none;">
        <p>请填写邮箱<span class="red_star">*</span></p>
        <div :class="[!isEmpty(email) || !hasClickSub ? 'enter' : 'enter disabled']">
          <span class="fa fa-envelope-o fa-fw"></span>
          <input type="email" name="" id="" v-model="email">
        </div>
        <p v-if="isEmpty(email) && hasClickSub" class="hint"><i class="fa fa-exclamation-circle"></i> 请填写邮箱</p>
      </div> -->
      <div class="list">
        <p>请填写手机号码<span class="red_star">*</span></p>
        <div :class="[!isEmpty(tel) || !hasClickSub ? 'enter' : 'enter disabled']">
          <input type="number" name="" id="" class="phone" v-model="tel">
          <span class="sendMsg" @click="onMsgSend">{{phoneSendMsg}}</span>
        </div>
        <p v-if="isEmpty(tel) && hasClickSub" class="hint"><i class="fa fa-exclamation-circle"></i> 请填写手机号</p>
      </div>
      <div class="list">
        <!-- <p>请填写验证码<span class="red_star">*</span></p> -->
        <div :class="[!isEmpty(valid) || !hasClickSub ? 'enter' : 'enter disabled']">
          <input type="number" name="" id="" v-model="valid" style="width:63%;">
          <span class="sendMsg">填写验证码</span>
        </div>
        <p v-if="isEmpty(valid) && hasClickSub" class="hint"><i class="fa fa-exclamation-circle"></i> 请填写验证码</p>
      </div>
      <div class="list">
        <div :class="[
          !isEmpty(collageName) && !isEmpty(major) && !isEmpty(province) && !isEmpty(chosedSchool) && !isEmpty(chosedMajor) && !isEmpty(name) && !isEmpty(tel) && !isEmpty(valid)
          ?
          'submit'
          :
          'submit submit-disable']"
          @click="submit">
          寻找隐藏的对手
        </div>
        <div class="submit">
          再去看看学校信息
        </div>
      </div>
    </div>
    <div v-if="showArch" class="success">
      <div><img :src="WEIXINHEAD" alt=""></div>
      <div class="userName">{{WEIXINNAME}}</div>
      <div class="people">{{ people }}</div>
      <div class="sameMajor">{{ sameMajor }}</div>
      <div class="sameSchool">{{ sameSchool }}</div>
      <img src="../assets/arch.jpeg" alt="建筑学">
    </div>
    <div v-if="showCity" class="success">
      <div><img :src="WEIXINHEAD" alt=""></div>
      <div class="userName">{{WEIXINNAME}}</div>
      <div class="people">{{ people }}</div>
      <div class="sameMajor">{{ sameMajor }}</div>
      <div class="sameSchool">{{ sameSchool }}</div>
      <img src="../assets/city.jpeg" alt="城市规划">
    </div>
    <div v-if="showLand" class="success">
      <div><img :src="WEIXINHEAD" alt=""></div>
      <div class="userName">{{WEIXINNAME}}</div>
      <div class="people">{{ people }}</div>
      <div class="sameMajor">{{ sameMajor }}</div>
      <div class="sameSchool">{{ sameSchool }}</div>
      <img src="../assets/land.jpeg" alt="风景园林">
    </div>
  </div>
</template>

<script>
import VDistpicker from 'v-distpicker'
import { isEmpty } from 'lodash'
import 'vue-loaders/dist/vue-loaders.css'
import { PacmanLoader } from 'vue-loaders'
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
    VDistpicker,
    'pacman-loader': PacmanLoader
  },
  data () {
    return {
      msg: 'd',
      collageName: '',
      major: '',
      province: '',
      school: [],
      chosedSchool: {},
      name: '',
      // email: '',
      address: '',
      tel: '',
      valid: '',
      hasCollage: false,
      hasClickSub: false,
      codeValid: false,
      chosedMajor: '',
      phoneSendMsg: '发送验证码',
      sendColleges: false,
      originColleges: [],
      isSelect: false,
      collegesTemp: '',
      showLoading: false,
      showArch: false,
      showCity: false,
      showLand: false,
      people: '1',
      sameMajor: '1',
      sameSchool: '1',
      WEIXINHEAD: '',
      WEIXINNAME: ''
    }
  },
  watch: {
    collageName (val) {
      if (val !== this.collegesTemp) {
        this.isSelect = false
      }
      if (val.length > 3 && !this.sendColleges) {
        let url = 'http://locateu.cn/tool/sql.class.php?mod=getColleges'
        let param = {
          colleges: val
        }
        let that = this
        this.sendColleges = true
        this.showLoading = true
        ajax({
          type: 'post',
          url: url,
          dataType: 'json',
          data: param,
          success: function (data) {
            that.sendColleges = false
            that.originColleges = data
            that.showLoading = false
          },
          error: function () {
          }
        })
      }
    }
  },
  methods: {
    originClick: function (col) {
      this.collageName = col.schoolname
      this.collegesTemp = col.schoolname
      this.isSelect = true
    },
    onProvinceChange: function () {
      let _this = this
      let url = 'http://locateu.cn/tool/sql.class.php?mod=sql_province'
      // let url = 'http://suntingyao.com/tool/sql.class.php?mod=sql_province'
      let data = {
        major: this.major,
        province: this.province.indexOf('市') > -1 ? this.province.replace('市', '') : this.province.indexOf('省') > -1 ? this.province.replace('省', '') : this.province
      }
      this.showLoading = true
      ajax({
        type: 'post',
        url: url,
        dataType: 'json',
        data: data,
        success: function (data) {
          _this.school = data
          _this.showLoading = false
        },
        error: function () {
        }
      })
    },
    isEmpty: function (data) {
      return isEmpty(data)
    },
    onSelected: function (data) {
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
                _this.showLoading = false
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
    submit: function () {
      this.hasClickSub = true
      if (this.disabled) {
        return
      }
      let that = this
      if (document.querySelector('.submit').className.indexOf('submit-disable') < 0) {
        if (/*his.validBackCode === this.valid && this.tel === this.validBackPhone*/true) {
          let rowAry = ['userweixinname', 'userweixincode', 'colleges', 'applyschoolname', 'applyschoolcode', 'mailname', 'email', 'mailaddress', 'mailphone', 'majorcode']
          let infoAry = [window.WEIXINNAME, window.WEIXINID, this.collageName, this.chosedSchool.schoolname, this.chosedSchool.schoolcode, this.name, '', this.addProvince + this.address, this.tel, this.chosedMajor]
          let url = 'http://locateu.cn/tool/sql.class.php?mod=save_user'
          // let url = 'http://suntingyao.com/tool/sql.class.php?mod=save_user'
          let data = {
            rowAry: rowAry,
            infoAry: infoAry
          }
          this.disabled = true
          this.showLoading = true
          ajax({
            type: 'post',
            url: url,
            dataType: 'json',
            data: data,
            success: function (data) {
              let url = 'http://locateu.cn/tool/sql.class.php?mod=getSum'
              let param = {
                colleges: that.collageName,
                applyschoolname: that.chosedSchool.schoolname,
                majorcode: that.chosedMajor
              }
              that.showLoading = true
              ajax({
                type: 'post',
                url: url,
                dataType: 'json',
                data: param,
                success: function (data) {
                  window.NUMBER = data.people
                  that.people = data.people
                  that.sameMajor = data.samemajor
                  that.sameSchool = data.sameschool
                  that.showLoading = false
                  wx.ready(function () {

                    //自动执行的
                    wx.checkJsApi({
                      jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage'
                      ],
                      trigger:function() {
                        
                      },
                      success:function() {
                      
                      }
                      
                    });

                    wx.onMenuShareTimeline({
                      title: 'LOCA已经帮我找到了'+window.NUMBER+'名考研竞争者，快来看看你有多少隐藏对手吧',
                      link: 'http://locateu.cn/',
                      imgUrl: 'http://locateu.cn/logo.jpeg',
                      trigger: function (res) {
                      },
                      success: function (res) {
                      },
                      cancel: function (res) {
                      },
                      fail: function (res) {

                      }
                    });
                  });
                },
                error: function () {
                }
              })
              switch (that.major) {
                case 'cityplanning':
                  that.showCity = true
                  break
                case 'architecture':
                  that.showArch = true
                  break
                case 'landscape':
                  that.showLand = true
                  break
                default:
                  break
              }
              alert('提交成功！分享到朋友圈试试')
            },
            error: function () {
            }
          })
        } else {
          alert('验证码错误或手机号码不匹配！')
        }
      }
    }
  },
  mounted () {
    this.WEIXINHEAD = window.WEIXINHEAD ? window.WEIXINHEAD : ''
    this.WEIXINNAME = window.WEIXINNAME ? window.WEIXINNAME : ''
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
input, select {
  font-size: 16px;
}
.content {
  width: 100%;
  margin: 0 auto;
  max-width: 700px;
}
.content h1 {
  border-bottom: 1px solid #C3C9D0;
  padding: 15px;
}
.form {
  padding: 0 15px;
  background: url('../assets/j_02.png') center center no-repeat;
  background-size: cover;
}
.red_star {
  color: red;
  margin-top: 1px;
  display: none;
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
  margin: 0 0 20px 0;
}
.list p {
  font-size: 12px;
}
.list p:first-child {
  font-size: 20px;
}
.list:last-child {
  margin: 0;
}
.list:last-child p {
  margin-bottom: 0;
}
.address {
  margin-top: 10px;
}
.submit {
  background-color: black;
  color: rgb(255, 255, 255);
  border-color: rgb(255, 255, 255);
  text-align: center;
  padding: 10px 15px;
  border-radius: 5px;
  width: 38%;
  display: inline-block;
}
.submit-disable {
  background-color: rgb(0,0,0,.6);
}
.sendMsg {
  display: block;
  padding: 5px 7px;
  background-color: black;
  color: rgb(255, 255, 255);
  border-color: rgb(255, 255, 255);
  border-radius: 3px;
  float: right;
  margin-top: 7px;
}
.phone {
  width: 63%!important;
}
.hint {
  color: red;
}
.origin-body {
  border: #AAB2BD solid 1px;
  border-top: none;
  position: absolute;
  background: white;
  width: 85%;
}
.origin-body p {
  padding: 10px 10px 0 10px;
  font-size: 16px!important;
}
.loading {
  position: fixed;
  z-index: 1;
  background: transparent;
  text-align: center;
  height: 100%;
  width: 100%;
  padding-top: 70%;
}
.success {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.success>img {
  width: 100%;
  height: 100%;
}
.success>div>img {
  position: absolute;
  width: 45px;
  height: 45px;
  top: 49%;
  left: 11.5%;
}
.userName {
  position: absolute;
  top: 49%;
  left: 25%;
}
.people {
  position: absolute;
  top: 62%;
  left: 65%;
  font-size: 30px;
  color: darkslategrey;
}
.sameMajor {
  position: absolute;
  top: 62%;
  left: 22%;
  font-size: 30px;
  color: darkslategrey;
}
.sameSchool {
  position: absolute;
  top: 62%;
  left: 43%;
  font-size: 30px;
  color: darkslategrey;
}
.pic_des img{
  width: 100%;
  display: block;
}
.form_person {
  background: url('../assets/j_04.png') center center no-repeat;
  background-size: cover;
  padding: 0 15px;
}
.distpicker-address-wrapper select {
  background: transparent;
}
</style>
