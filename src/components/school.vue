<template>
  <div>
      <div class="logo-block">
        <img id="phone-logo" src="../assets/logo.png" alt="">
        <div class="logo-des">
          <p class="black-title"> <span>欢迎使用LOCA全国高校研究生入学考试</span> </p>
          <p>官方信息 查询系统</p>
        </div>
      </div>
      <div class="school-body">
        <div>
          <img :src="WEIXINHEAD" alt="" class="head">
        </div>
        <div style="margin-top: 30px;">
          <p>选择你的本科在读高校</p>
          <div>
            <input type="text" v-model="collageName">
          </div>
          <div class="origin-body" v-if="originColleges.length != 0" v-show="!isSelect">
              <p v-for="col in originColleges" v-bind:key="col.no" @click="originClick(col)">
                {{col.schoolname}}
              </p>
            </div>
        </div>
        <div>
          <p>请选择报考专业类别</p>
          <div>
            <select name="" id="" v-model="major">
              <option value="">请选择</option>
              <option value="cityplanning">城市规划</option>
              <option value="architecture">建筑学</option>
              <option value="landscape">风景园林</option>
            </select>
          </div>
        </div>
        <div>
          <p>请选择你的预计考研日期</p>
          <div>
            <select name="" id="" v-model="date">
              <option value="">请选择</option>
              <option value="2018-12">2018-12</option>
              <option value="2019-12">2019-12</option>
              <option value="2020-12">2020-12</option>
              <option value="2021-12">2021-12</option>
              <option value="2022-12">2022-12</option>
            </select>
          </div>
        </div>
        <div style="margin-top: 60px;font-size: 14px;">
          <p>是否愿意接收我们最新收集的考试信息</p>
          <p>
            <span @click="agree = true"> <span :class="agree ? 'radio click' : 'radio'"> </span> 愿意</span>
            <span @click="agree = false"> <span :class="!agree ? 'radio click' : 'radio'"> </span>不愿意</span>
          </p>
        </div>
        <div style="font-size: 14px;margin-top: 50px;">
          <span class="button" @click="school">还没选好报考院系</span>
          <span class="button" @click="submit">已经有自己想报考的院系</span>
        </div>
      </div>
  </div>
</template>
<style>
input, select {
  text-align: center;
}
.logo-block {
  font-size: 12px;
  padding: 10px 0;
  overflow: hidden;
}
.logo-block img {
  width: 81px;
  height: 38px;
  display: block;
  float: left;
}
.logo-des {
  float: left;
}
.logo-block p {
  margin: 5px 0;
}
.origin-body {
    position: absolute;
    width: 200px;
    left: 50%;
    margin-left: -100px;
    background: white;
    border: black solid 1px;
    border-radius: 9px;
    margin-top: 1px;
    font-size: 14px;
}
.school-body {
  text-align: center;
  padding: 20px;
}
.school-body p {
  margin: 5px 0;
}
.school-body input, .school-body select {
  border: black solid 1px;
  border-radius: 10px;
  width: 200px;
  height: 30px;
  line-height: 30px;
}
.black-title span{
    background: black;
    color: white;
    border-radius: 10px;
    padding: 2px 4px;
}
.login span {
    background: black;
    color: white;
    padding: 10px 60px;
    border-radius: 10px;
}
.head {
  width: 80px;
  height: 80px;
  border: black solid 1px;
  border-radius: 50%;
}
.button {
  background: black;
  color: white;
  padding: 15px 5px;
  border-radius: 10px;
}
.radio {
  display: inline-block;
  width: 25px;
  height: 15px;
  border-radius: 10px;
  border: black solid 1px;
  position: relative;
  top: 3px;
}
.radio.click {
  background: black
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
      WEIXINHEAD: '',
      collageName: '',
      isSelect: false,
      originColleges: [],
      major: '',
      sendColleges: false,
      date: '',
      isBack: false,
      agree: true
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
        ajax({
          type: 'post',
          url: url,
          dataType: 'json',
          data: param,
          success: function (data) {
            that.sendColleges = false
            that.originColleges = data
          },
          error: function () {
          }
        })
      }
    }
  },
  methods: {
    school: function () {
      window.location.href = 'https://jinshuju.net/f/ULUKYB'
    },
    originClick: function (col) {
      this.collageName = col.schoolname
      this.collegesTemp = col.schoolname
      this.isSelect = true
    },
    submit: function () {
      let rowAry = ['userweixinname', 'userweixincode', 'colleges', 'majortype', 'date', 'agreesendmsg']
      let infoAry = [window.WEIXINNAME, window.WEIXINID, this.collageName, this.major, this.date, this.agree]
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
            that.$router.push(`/step`)
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
