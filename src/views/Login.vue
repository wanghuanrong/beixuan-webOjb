<template>
  <div class="login">
    <!-- 左侧 -->
    <div
      class="leftImg"
      v-lazy:background-image="require('../assets/login.png')"
    >
      <div class="leftTitle">
        <div>政策分级管理</div>
        <div>精准定位查询</div>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="rightContent">
      <div class="loginBox" v-if="loginIs">
        <div class="logo"></div>

        <!-- 登录表单 -->
        <div class="form" v-if="formShow">
          <div class="hang1">
            <div>账号登录</div>
            <div>
              没有账号?
              <a href="javascript:;" @click="loginRegister">申请试用</a>
            </div>
          </div>
          <el-form ref="form" :rules="formRules" :model="form">
            <!-- 输入手机号 -->
            <el-form-item prop="username">
              <el-input
                placeholder="请输入手机号"
                v-model="form.username"
                class="input-with-select"
              >
                <el-select
                :popper-append-to-body="false"
                  v-model="form.prefix"
                  slot="prepend"
                  placeholder="请选择"
                  style="width: 100px"
                >
                  <el-option label="+81" value="1"></el-option>
                  <el-option label="+82" value="2"></el-option>
                  <el-option label="+86" value="3"></el-option>
                </el-select>
                <i
                  slot="prefix"
                  class="el-input__icon el-icon-mobile-phone"
                ></i>
              </el-input>
            </el-form-item>

            <el-form-item>
              <!-- 输入密码 -->
              <el-input
                type="password"
                v-model="form.password"
                style="margin-top: 20px"
                placeholder="请输入密码"
                @keyup.enter.native="loginClick"
              >
                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
              </el-input>
            </el-form-item>
          </el-form>

          <div class="hang2">
            <div>
              <!-- <el-checkbox v-model="nextLogin">下次自动登录</el-checkbox> -->
            </div>
            <div><a href="javascript:;" @click="FGpassword">忘记密码</a></div>
          </div>
          <div class="loginBtn" @click="loginClick">登录</div>
          <div class="hang3">
            <el-checkbox v-model="accept">我已阅读并接受</el-checkbox>
            <a href="javascript:;">《用户协议》</a>
          </div>
        </div>

        <!-- 找回密码 -->
        <div class="form2" v-if="form2Show">
          <div>找回密码</div>

          <el-form
            ref="form2"
            :rules="formRules"
            :model="form2"
            style="margin-top: 10px"
          >
            <!-- 输入手机号 -->
            <el-form-item prop="username">
              <el-input
                placeholder="请输入手机号"
                v-model="form2.username"
                class="input-with-select"
              >
                <el-select
                :popper-append-to-body="false"
                  v-model="form2.prefix"
                  slot="prepend"
                  placeholder="请选择"
                  style="width: 100px"
                >
                  <el-option label="+81" value="1"></el-option>
                  <el-option label="+82" value="2"></el-option>
                  <el-option label="+86" value="3"></el-option>
                </el-select>
                <i
                  slot="prefix"
                  class="el-input__icon el-icon-mobile-phone"
                ></i>
              </el-input>
            </el-form-item>

            <el-form-item prop="code" style="margin-top: 20px">
              <el-input
                v-model="form2.code"
                placeholder="请输入短信验证码"
                style="width: 160px"
              ></el-input>

              <!-- class="codeBtn" -->
              <div
                :class="{ codeBtnTime: !yzmIs, codeBtn: yzmIs }"
                @click="yzmIs && yzmClick()"
              >
                <span v-if="yzmIs">获取验证码</span>
                <span v-else>{{ yzmCountdown }}后重新获取</span>
              </div>
            </el-form-item>
          </el-form>

          <div class="loginBtn" @click="FgPassBtn">下一步</div>

          <hr />
          <div class="FgLogin">
            <a href="javascript:;" @click="FGpassword">返回登录</a>
          </div>
        </div>

        <!-- 重置密码 -->
        <div class="form3" v-if="form3Show">
          <div>重置密码</div>

          <!-- :rules="form3Rules" -->
          <el-form
            ref="form3"
            :model="form3"
            :rules="formRules"
            style="margin-top: 10px"
          >
            <el-form-item prop="checkPassword">
              <el-input
                type="password"
                placeholder="请输入6-8位，开头为字母的新密码"
                v-model="form3.checkPassword"
                class="input-with-select"
              >
              </el-input>
            </el-form-item>

            <el-form-item prop="newPassword" style="margin-top: 20px">
              <el-input
                type="password"
                v-model="form3.newPassword"
                placeholder="再次输入新密码"
              ></el-input>
            </el-form-item>
          </el-form>

          <div
            class="loginBtn"
            @click="trueXgPassword"
            style="margin-bottom: 5px"
          >
            确定
          </div>

          <div style="margin-bottom: 20px">
            <a href="javascript:;" @click="returnUp">&lt;返回上一步</a>
          </div>

          <hr />
          <div class="FgLogin">
            <a href="javascript:;" @click="CZpassword">返回登录</a>
          </div>
        </div>
      </div>

      <!-- 注册 -->
      <div class="registerBox" v-if="registerIs">
        <div style="overflow: hidden; width: 589px; height: 600px">
          <register></register>
        </div>

        <div class="registerLogin">
          <a href="javascript:;" @click="registerReturnLogin">返回登录</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import register from "@/components/register/register.vue";

import {
  getDetail,
  loginRequest,
  getPwdOne,
  getPwdTwo,
  getUserInfo,
} from "@/utils/register";
import { Base64 } from 'js-base64';

export default {
  data() {
    //   定义手机的正则验证对象
    var checkphone = (rule, value, cb) => {
      // 验证码手机的验证正则表达式
      const regphone = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;

      if (regphone.test(value)) {
        // 合法的邮箱
        return cb();
      }

      cb(new Error("请输入合法的邮箱"));
    };

    // 定义密码的正则验证对象
    var passwordyz = (rule, value, cb) => {
      // 密码的验证正则表达式
      const regpassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\\\\W]{6,18}$/;

      if (regpassword.test(value)) {
        // 合法的密码
        return cb();
      }

      cb(new Error("密码必须6~18位，并且开头为字母"));
    };

    return {
      //   表单1：登录
      form: {
        username: "",
        prefix: "1",
        password: "",
      },
      // 表单验证：手机格式、密码验证
      formRules: {
        username: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            validator: checkphone,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
        // 验证密码是否合法
        checkPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            validator: passwordyz,
            message: "密码必须6~18位，并且开头为字母",
            trigger: "blur",
          },
        ],
        newPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            validator: passwordyz,
            message: "密码必须6~18位，并且开头为字母",
            trigger: "blur",
          },
        ],
      },
      // 多选框(下一次自动登录、已阅读协议)
      nextLogin: true,
      accept: false,
      // 登录模块和注册模块
      loginIs: true,
      registerIs: false,
      // 登录表单显示（不包含logo）
      formShow: true,
      form2Show: false,
      // 表单2：忘记密码
      form2: {
        username: "",
        prefix: "1",
        code: "",
      },
      yzmIs: true,
      yzmCountdown: 60,
      // 表单3：重置密码
      form3: {
        checkPassword: "",
        newPassword: "",
      },
      // 显示隐藏重置
      form3Show: false,
    };
  },
  components: {
    register,
  },
  created() {
    // 判断是否有登录信息，有则登录
    const loginInfo = localStorage.getItem("userPassword");
    if (loginInfo) {
      // console.log(JSON.parse(loginInfo));
      loginRequest(JSON.parse(loginInfo), true).then((res) => {
        // console.log(res);
        if (res.code != "200") {
          this.$message.error(res.msg ? res.msg : "登录失败，请检查账号密码！");
          return;
        }
        sessionStorage.setItem("token", res.token);
        this.$message.success("登录成功！");

        this.getUserInfoFun();
      });
    }
  },
  methods: {
    //   点击注册，切换
    loginRegister() {
      this.loginIs = !this.loginIs;
      this.registerIs = !this.registerIs;
    },
    // 点击'忘记密码'切换
    FGpassword() {
      this.formShow = !this.formShow;
      this.form2Show = !this.form2Show;
      // this.form3Show = !this.form3Show;
    },
    // '忘记密码'获取验证码
    yzmClick() {
      this.$refs.form2.validate((vaild) => {
        if (!vaild) {
          return;
        }
        console.log(this.form2.username);
        // 通过接口发送验证码，参数2： 手机号
        getDetail("4", this.form2.username).then((res) => {
          // console.log(res);
          if (res.code != 200) {
            this.$message.error(res.msg);
            return;
          }
          // 发送验证码成功之后，显示倒计时
          this.yzmIs = false;
          let yzm = setInterval(() => {
            this.yzmCountdown--;
            if (this.yzmCountdown <= 0) {
              this.yzmCountdown = 60;
              this.yzmIs = true;
              clearInterval(yzm);
            }
          }, 1000);
        });
      });
    },
    // 下一步，显示‘重置密码’，隐藏‘忘记密码’
    FgPassBtn() {
      this.$refs.form2.validate((vaild) => {
        if (!vaild) {
          return;
        }
        getPwdOne(this.form2).then((res) => {
          // console.log(res);
          if (res.code == "500") {
            this.$message.error(res.msg);
            return;
          }
          this.form2Show = !this.form2Show;
          this.form3Show = !this.form3Show;
        });
      });
    },
    // 重置密码并返回登录，显示‘登录’，隐藏‘重置’
    trueXgPassword() {
      // ^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\\\\W]{6,18}$

      this.$refs.form3.validate((vaild) => {
        if (!vaild) {
          return;
        }

        if (this.form3.newPassword != this.form3.checkPassword) {
          this.$message.error("密码不一致，请重新确认！");
          return;
        }

        let Base64 = require("js-base64").Base64;
        let base64from = {
          checkPassword: Base64.encode(this.form3.checkPassword),
          newPassword: Base64.encode(this.form3.newPassword)
        };

        getPwdTwo(base64from, this.form2).then((res) => {
          // console.log(res);
          if (res.code != "200") {
            this.$message.error(res.msg);
            return;
          }
          this.$message.success(res.msg);
          this.formShow = !this.formShow;
          this.form3Show = !this.form3Show;
        });
      });
    },
    // 重置密码的‘返回登录’
    CZpassword() {
      this.formShow = !this.formShow;
      this.form3Show = !this.form3Show;
    },
    // 返回上一步，显示‘忘记密码’，隐藏‘重置密码’
    returnUp() {
      this.form2Show = !this.form2Show;
      this.form3Show = !this.form3Show;
    },
    // 注册‘返回登录’
    registerReturnLogin() {
      this.loginIs = !this.loginIs;
      this.registerIs = !this.registerIs;
    },

    // 登录事件
    loginClick() {
      // 判断是否勾选了协议
      if (!this.accept) {
        this.$message.error("请先阅读《用户协议》");
        return;
      }

      // 验证手机格式
      this.$refs.form.validate((vaild) => {
        if (!vaild) {
          return;
        }

        // 18670595033 admin123
        let Base64 = require("js-base64").Base64;
        let Base64form = {
          username: this.form.username,
          password: Base64.encode(this.form.password),
        };
        loginRequest(Base64form, this.nextLogin).then((res) => {
          // console.log(res);
          if (res.code != "200") {
            console.log(res);
            this.$message.error(
              res.msg ? res.msg : "登录失败，请检查账号密码！"
            );
            return;
          }

          sessionStorage.setItem("token", res.token);
          this.$message.success("登录成功！");

          // 是否自动登录
          if (this.nextLogin) {
            localStorage.setItem("userPassword", JSON.stringify(Base64form));
          } else {
            localStorage.removeItem("userPassword");
          }

          this.getUserInfoFun();
        });
      });
    },
    getUserInfoFun() {
      // 获取用户个人信息
      getUserInfo().then((res) => {
        console.log(res);
        if (res.code != 200) {
          this.$message.error("获取用户信息失败！");
          return;
        }
        localStorage.setItem("userInfo", JSON.stringify(res.user));
        this.$router.push("/backhome");
      });
    },
  },
  watch: {},
};
</script>

<style lang="less" scoped>
// html,
// body,
// #app {
//   height: 100%;
// }
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: #0436fa;
}

.login {
  width: 100%;
  max-width: 1920px;
  min-width: 1600px;
  height: 100%;
  max-height: 1100px;
  min-height: 800px;
  overflow: hidden;
  font-size: 16px;
  font-family: Microsoft YaHei;
  display: flex;
  .leftImg {
    flex: 1;
    height: 100%;

    background-size: 100% 100%;
    position: relative;
    .leftTitle {
      width: 400px;
      //   margin: 50% auto;
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -35px -200px;

      div {
        width: 372px;
        height: 71px;
        font-size: 40px;
        font-family: STZhongsong;
        font-weight: 400;
        color: #ffffff;
      }
      div:nth-child(1) {
        text-align: left;
      }
      div:nth-child(2) {
        text-align: right;
      }
    }
  }

  .rightContent {
    width: 720px;
    height: 100%;
    background: #ffffff;
    box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.11);
    position: relative;
    .loginBox {
      width: 350px;
      height: 600px;
      margin: 100px auto;
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -300px -175px;
      .logo {
        width: 200px;
        height: 90px;
        background-image: url("../assets/index/b_logo.png");
        background-size: 100% 100%;
        margin: 0 auto 100px;
      }

      .hang1 {
        margin: 30px 0 10px;
        overflow: hidden;
        div:nth-child(1) {
          float: left;
        }
        div:nth-child(2) {
          float: right;
        }
      }

      .hang2 {
        margin: 10px 0;
        overflow: hidden;
        div:nth-child(1) {
          float: left;
        }
        div:nth-child(2) {
          float: right;
        }
      }

      .loginBtn {
        width: 350px;
        height: 40px;
        background: linear-gradient(360deg, #0a38ed 0%, #6180f8 100%);
        box-shadow: 0px 3px 6px rgba(7, 75, 235, 0.31);
        border-radius: 2px;
        color: white;
        text-align: center;
        line-height: 40px;
        margin: 30px auto;
        cursor: pointer;
      }

      .form2 {
        .codeBtn {
          width: 171px;
          height: 40px;
          background: linear-gradient(0deg, #0a38ed 0%, #6180f8 100%);
          opacity: 1;
          border-radius: 2px;
          // flex: 1;
          float: right;
          color: white;
          line-height: 40px;
          text-align: center;
          cursor: pointer;
        }

        .codeBtnTime {
          width: 171px;
          height: 40px;
          background: #ffffff;
          border: 1px solid #dcdcdc;
          border-radius: 2px;
          float: right;
          line-height: 40px;
          text-align: center;
        }
      }
    }

    .FgLogin {
      text-align: center;
      line-height: 35px;
      color: #0a38ed;
      cursor: pointer;
    }
  }

  .registerBox {
    // position: absolute;
    // top: 50%;
    margin: 10% auto;
    .registerModel[data-v-466c092f] {
      position: initial;
    }
    .registerLogin {
      text-align: center;
      line-height: 35px;
      color: #0a38ed;
      cursor: pointer;
    }
  }
}

.el-select-dropdown__item {
  text-align: center;
}
</style>