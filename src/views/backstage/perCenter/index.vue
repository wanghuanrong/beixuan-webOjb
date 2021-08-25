<template>
  <div class="personal">
    <div class="persontop">
      <div class="persontitl">
        <div class="leftp">策千里个人中心</div>
        <div class="rightp" @click="leaveHome">
          退出账户
          <img src="@/assets/personal/1254.png" alt="" />
        </div>
        <div class="clear"></div>
      </div>

      <!-- 公司和个人信息主体 -->
      <div class="infoMainBox">
        <!-- 头像 -->
        <div class="avatar">
          <div class="avatarMain" @click="acatarClick">
            <img
              :src="require('@/assets/backlogo/header.png')"
              alt=""
              v-if="userInfo.avatar == ''"
            />
            <img :src="$http + userInfo.avatar" alt="" v-else />
          </div>
        </div>

        <!-- 内容 -->
        <div class="content">
          <!-- 公司名 -->
          <div class="hang1">
            <div class="name">
              {{ userInfo.companyName }}
              <img
                src="@/assets/personal/4571.png"
                alt=""
                v-if="vipIs != 'common'"
              />
            </div>
          </div>
          <div class="hang2">
            <div class="left">
              <span class="ts">手机：</span
              ><span class="data">{{ userInfo.username }}</span>
            </div>
            <div class="right">
              <span class="ts">姓名：</span
              ><span class="data">{{ userInfo.nickName }}</span>
              <span class="ts" style="margin-left: 20px">等级：</span
              ><span class="data">{{
                vipIs == "common" ? "普通用户" : "VIP用户"
              }}</span>
            </div>
          </div>
          <div class="hang3">
            <div class="left">
              <span class="ts">注册时间：</span
              ><span class="data">{{ userInfo.createTime | getDate }}</span>
            </div>
            <div class="right">
              <span class="ts">VIP有效时间：</span
              ><span class="data">{{ userInfo.finishTime | getDate }}</span>
            </div>
          </div>
          <div class="hang4">
            <div class="xgmm">
              <span class="wz" @click="modifyPassword">修改密码</span>
            </div>
            <div class="ckVIP">
              <span class="wz" @click="viewVip">查看VIP权限</span>
            </div>
          </div>
        </div>

        <!-- 右边背景图片 -->
        <div class="img">
          <img src="@/assets/personal/1.png" alt="" />
        </div>
      </div>

      <h3 class="personalh"></h3>
      <div class="persontitl mainbx">
        <div class="bxlogo">
          <!-- <img src="@/assets/personal/bx.png" alt="" /> -->
          <!-- {{fontLogo}} -->
        </div>
        <div class="navbx">
          <div class="navclk">
            <div class="navcard">
              <div
                class="cardlist"
                @click="$router.push('/backhome/policymanage/government')"
              >
                <img src="@/assets/personal/4560.png" alt="" />
                <span>政策管理系统</span>
                <img class="navlogo" src="@/assets/personal/1304.png" alt="" />
              </div>
              <div
                class="cardlist"
                @click="$router.push('/backhome/knowledgemanage/knowled')"
              >
                <img src="@/assets/personal/4558.png" alt="" />
                <span>知识产权管理系统</span>
                <img class="navlogo" src="@/assets/personal/1304.png" alt="" />
              </div>
              <div
                class="cardlist"
                @click="$router.push('/backhome/knowlibrary/library')"
              >
                <img src="@/assets/personal/4559.png" alt="" />
                <span>技术文库</span>
                <img class="navlogo" src="@/assets/personal/1304.png" alt="" />
              </div>
            </div>
            <div class="twocard"></div>
            <div class="navcard">
              <div
                class="cardlist"
                @click="$router.push('/backhome/serviceshop/serviceshop')"
              >
                <img src="@/assets/personal/4557.png" alt="" />
                <span>企业服务商城</span>
                <img
                  class="navlogo logor"
                  src="@/assets/personal/1304.png"
                  alt=""
                />
              </div>
              <div
                class="cardlist"
                @click="$router.push('/backhome/companycenter/unitInfo')"
              >
                <img src="@/assets/personal/4561.png" alt="" />
                <span>企业中心</span>
                <img class="navlogo" src="@/assets/personal/1304.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer" v-if="vipAuthority">
        <div class="footmain">
          <h3>VIP权限</h3>
          <div class="foottxt">
            <p>
              北轩（深圳）知识产权代理有限公司(北轩知识产权)专注于深圳市政府资助政策研究与咨询！专业辅导企业申报深圳市政府资助项目、国高认定、知识产权等！致力为企业提供“资助、资质、专利、融资”咨询服务！自成立以来为超过600家企业提供资助政策咨询服务！累计帮助企业申请政府资助资金超过五亿元！
              北轩（深圳）知识产权代理有限公司(北轩知识产权)专注于深圳市政府资助政策研究与咨询！专业辅导企业申报深圳市政府资助项目、国高认定、知识产权等！致力为企业提供“资助、资质、专利、融资”咨询服务！自成立以来为超过600家企业提供资助政策咨询服务！累计帮助企业申请政府资助资金超过五亿元！北轩（深圳）知识产权代理有限公司(北轩知识产权)专注于深圳市政府资助政策研究与咨询！专业辅导企业申报深圳市政府资助项目、国高认定、知识产权等！致力为企业提供“资助、资质、专利、融资”咨询服务！自成立以来为超过600家企业提供资助政策咨询服务！累计帮助企业申请政府资助资金超过五亿元！
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 修改头像 -->
    <el-dialog
      title="修改头像"
      :close-on-click-modal="false"
      :visible.sync="avatarDialog"
      width="45%"
    >
      <cropper-image @uploadImgSuccess="uploadImgSuccess"></cropper-image>
    </el-dialog>

    <!-- 修改密码 -->
    <el-dialog
      :visible.sync="modifyPasswordDialog"
      :close-on-click-modal="false"
      width="800px"
    >
      <div class="modifyPassword">
        <el-steps :active="active" finish-status="success">
          <el-step title="验证身份"></el-step>
          <el-step title="填写新密码"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>

        <!-- 第一步 -->
        <div class="active1" v-if="active == 0">
          <div class="title">
            身份验证，请点击
            <span class="ts">“获取短信验证码”</span> 以确认身份：
          </div>
          <div class="form1">
            <div class="phone">手机号码：{{ userInfo.username }}</div>
            <div class="yzmBox">
              验证码：
              <el-input
                v-model="passwordyzm"
                placeholder="请输入短信验证码"
                style="width: 150px"
              ></el-input>

              <div
                :class="{ codeBtnTime: !yzmIs, codeBtn: yzmIs }"
                @click="yzmIs && yzmClick()"
              >
                <span v-if="yzmIs">获取验证码</span>
                <span v-else>{{ yzmCountdown }}后重新获取</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 第二步 -->
        <div class="active2" v-if="active == 1">
          <el-form
            ref="form3"
            :model="form3"
            :rules="formRules"
            style="margin-top: 10px"
            label-width="140px"
          >
            <el-form-item prop="checkPassword" label="输入新密码：">
              <el-input
                type="password"
                placeholder="请输入6-8位，开头为字母的新密码"
                v-model="form3.checkPassword"
                class="input-with-select"
              >
              </el-input>
            </el-form-item>

            <el-form-item style="margin-top: 20px" label="再次输入新密码：">
              <el-input
                type="password"
                v-model="form3.newPassword"
                placeholder="再次输入新密码"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>

        <!-- 第三步 -->
        <div class="active3" v-if="active == 2">
          <div class="img"></div>
          <div class="title">密码已经修改成功！</div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modifyPasswordDialog = false">取消</el-button>
        <el-button
          @click="modifyBtnClick"
          style="background-color: #256bff; color: white"
          >确定</el-button
        >
      </div>
    </el-dialog>

    <!-- 确定退出 -->
    <el-dialog title="提示" :visible.sync="TCdialog" width="500px">
      <span>您确定要退出吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="TCdialog = false">取 消</el-button>
        <el-button type="primary" @click="isTcClick()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CropperImage from "@/components/CropperImage/CropperImage.vue";
import {
  getDetail,
  getPwdOne,
  getPwdTwo,
  getUserInfo,
  uploadAvatar,
} from "@/utils/register";
import { Base64 } from "js-base64";

export default {
  created() {
    // 获取个人信息
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.userInfo = userInfo;

    this.vipIs = userInfo.roles[0].roleKey;
    this.fontLogo = userInfo.companyName.substr(0, 1);

    // token
    this.token = sessionStorage.getItem("token");

    // 判断是否有头像
    // if (userInfo.avatar != "") {
    //   this.defaltImg = false;
    // }
  },
  data() {
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
      // 暂时在这里查询重复热搜榜
      horform: {
        pageNum: 1,
        pageSize: 6,
        sortNum: 5,
      },
      // 默认头像
      defaltImg: true,

      // 退出弹窗
      TCdialog: false,

      userInfo: {
        nickName: "xx",
        avatar: "xx",
        username: "xx",
        companyName: "xxx",
        createTime: "xx",
        finishTime: "xx",
      },
      token: "",

      vipIs: "common",
      vipAuthority: false,

      fontLogo: "",

      //   头像
      avatarDialog: false,
      fileList: [],
      imgFile: "",

      //   密码
      modifyPasswordDialog: false,
      active: 0,
      passwordyzm: "",
      yzmIs: true,
      yzmCountdown: 60,

      // 重置密码
      form3: {
        checkPassword: "",
        newPassword: "",
      },

      // 表单验证：手机格式、密码验证
      formRules: {
        // 验证密码是否合法
        checkPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            validator: passwordyz,
            message: "密码必须6~18位，并且开头为字母",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    //   修改密码

    modifyPassword() {
      this.modifyPasswordDialog = true;
    },
    modifyBtnClick() {
      //   第一步，验证验证码
      if (this.active == 0) {
        let form = { username: this.userInfo.username, code: this.passwordyzm };
        getPwdOne(form).then((res) => {
          // console.log(res);
          if (res.code == "500") {
            this.$message.error(res.msg);
            return;
          }
          this.active = this.active + 1;
        });

        //   第二步，设置密码
      } else if (this.active == 1) {
        this.$refs.form3.validate((vaild) => {
          if (!vaild) {
            return;
          }

          if (this.form3.newPassword != this.form3.checkPassword) {
            this.$message.error("密码不一致，请重新确认！");
            return;
          }

          let form = {
            username: this.userInfo.username,
            code: this.passwordyzm,
          };

          let Base64 = require("js-base64").Base64;
          let base64from3 = {
            checkPassword: Base64.encode(this.form3.checkPassword),
            newPassword: Base64.encode(this.form3.newPassword),
          };

          getPwdTwo(base64from3, form).then((res) => {
            // console.log(res);
            if (res.code != "200") {
              this.$message.error(res.msg);
              return;
            }

            this.active = this.active + 1;
            localStorage.removeItem("userPassword");
            sessionStorage.removeItem("token");
          });
        });
      } else if (this.active == 2) {
        this.active = this.active + 1;
        this.active = 0;
        this.modifyPasswordDialog = false;
        this.$router.push("/login");
      }
    },
    yzmClick() {
      // 通过接口发送验证码，参数2： 手机号
      getDetail("4", this.userInfo.username).then((res) => {
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
    },
    viewVip() {
      this.vipAuthority = !this.vipAuthority;
    },
    // 退出
    leaveHome() {
      this.TCdialog = true;
    },
    isTcClick() {
      localStorage.removeItem("userPassword");
      localStorage.removeItem("userInfo");
      sessionStorage.removeItem("token");
      this.$router.push("login");
    },

    // 头像
    acatarClick() {
      this.avatarDialog = true;
      // this.$message.error("暂不支持设置头像！");
    },
    avatarSubmitBtn() {
      this.$refs.upload2.submit();
    },

    // 头像上传成功之后
    uploadImgSuccess(data) {
      console.log(data);

      this.imgFile = data;
      console.log(this.imgFile);
      this.userInfo.avatar = this.imgFile;
      this.avatarDialog = false;

      // 改完头像需要重新请求用户信息
      this.getUserInfoFun();
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

        this.$emit("uploadImage");
      });
    },
  },
  components: {
    CropperImage,
  },
  filters: {
    getDate(val) {
      if (val) {
        return val.split(" ")[0];
      }
    },
  },
};
</script>

<style lang="less" scoped>
.personal {
  max-width: 1920px;
  min-width: 1500px;
  // min-height: 1300px;
}
.persontop {
  overflow: hidden;
  box-shadow: 0 0px 15px 0 #d7dade;
  .persontitl {
    width: 80%;
    height: 90px;
    margin: 0 auto;
    .leftp {
      float: left;
      font-size: 24px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      line-height: 90px;
      color: #333333;
    }
    .rightp {
      float: right;
      line-height: 90px;
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #999999;
      cursor: pointer;
    }
  }
}
.mainperson {
  height: 172px !important;
  .leftlogo {
    float: left;
    width: 150px;
    display: flex;
    padding-top: 37px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    img {
      width: 70px;
      height: 70px;
    }
    span {
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 26px;
      color: #333333;
    }
  }
  .userinfo {
    text-align: left;
    float: left;
    display: flex;
    flex-direction: column;
    padding-left: 50px;
    border-left: 1px solid #f6f6f6;
    margin-top: 35px;
    //  justify-content: center;
    //  align-items: center;
    p {
      //  text-align: left;
      float: left;
      font-size: 16px;
      color: #9b9b9b;
      i {
        font-style: normal;
        color: #0453fa;
      }
      &:nth-child(2) {
        padding: 20px 0;
      }
      span {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
      }
    }
  }
  .rightimg {
    float: right;
    margin-right: 10px;
    img {
      width: 189px;
      height: 158px;
    }
  }
}
.personalh {
  width: 100%;
  height: 20px;
  background-color: #f9f9f9;
}

// 公司和个人信息主体
.infoMainBox {
  width: 80%;
  height: 200px;
  margin: 50px auto;
  display: flex;
  .avatar {
    width: 200px;
    border-right: 2px solid #eeeeee;
    .avatarMain {
      width: 70px;
      height: 70px;
      margin: 25px auto;
      border-radius: 50%;
      overflow: hidden;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .content {
    flex: 1;
    text-align: left;
    padding-left: 50px;

    .hang1 {
      line-height: 70px;
      .name {
        height: 70px;
        font-size: 25px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #333333;
      }
    }

    .hang2 {
      display: flex;
      line-height: 40px;
      .left {
        width: 200px;
      }
      .right {
        flex: 1;
      }
    }

    .hang3 {
      display: flex;
      line-height: 40px;
      .left {
        width: 200px;
      }
      .right {
        flex: 1;
      }
    }

    .hang4 {
      display: flex;
      line-height: 40px;
      font-size: 15px;
      color: #256bff;
      .xgmm {
        width: 100px;
        span {
          cursor: pointer;
        }
      }
      .ckVIP {
        flex: 1;
        span {
          cursor: pointer;
        }
      }
    }

    .ts {
      color: #999999;
    }
    .data {
      font-weight: 600;
    }
  }

  .img {
    width: 200px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.mainbx {
  height: 280px !important;
  .bxlogo {
    height: 100%;
    width: 200px;
    float: left;
    font-size: 120px;
    color: red;
    text-align: center;
    line-height: 320px;
    img {
      margin-top: 65px;
      width: 132px;
      height: 115px;
    }
  }
}
.navbx {
  text-align: left;
  padding-top: 30px;
  width: 650px;
  .navtitle {
    font-size: 22px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #333333;
    img {
      width: 45px;
      height: 20px;
      padding-top: -2px;
      vertical-align: middle;
      margin-left: 9px;
    }
  }
  p {
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #666666;
    &:nth-child(2) {
      padding: 20px 0;
    }
    span {
      color: #727272;
    }
    .seeVIP {
      color: #3475ff;
      cursor: pointer;
    }
    .leftm {
      margin-left: 30px;
    }
  }
  .navcard {
    margin-top: 50px;
    width: 1300px;
    .cardlist {
      // display: flex;
      position: relative;
      float: left;
      box-shadow: 0 0px 4px 0 #d7dade;
      line-height: 52px;
      width: 316px;
      height: 52px;
      padding-left: 20px;
      margin-right: 30px;
      border-radius: 5px;
      cursor: pointer;
      img {
        position: absolute;
        top: 18px;
        left: 20px;
        margin-right: 20px;
        // width: 22px;
        // height: 17px;
      }
      .navlogo {
        position: absolute;
        left: 201px;
        top: 20px;
        width: 8px;
        height: 14px;
        margin-left: 59px;
      }
      span {
        position: absolute;
        left: 62px;
        line-height: 52px;
        font-size: 20px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #444444;
      }
    }
  }
  .twocard {
    height: 30px;
  }
}
.footer {
  height: 500px;
  width: 100%;
  background-color: #f9f9f9;
}
.footmain {
  position: relative;
  width: 1200px;
  margin: 0 auto;
  h3 {
    // position: absolute;
    padding-top: 50px;
    margin-left: 50%;
    width: 100px;
    margin: 0 auto;
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #333333;
  }
  .foottxt {
    width: 1200px;
    p {
      margin-top: 19px;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 30px;
      color: #666666;
    }
  }
}

// 上传
.addFH {
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  font-size: 50px;
  text-align: center;
  line-height: 100px;
  color: #ccc;
}

// 修改密码
.active1 {
  width: 400px;
  margin: 10px auto;
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

  .title {
    height: 26px;
    font-size: 15px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 26px;
    color: #666666;
    text-align: center;
    .ts {
      color: #256bff;
    }
  }

  .phone {
    margin: 15px 0;
  }
}

.active2 {
  width: 400px;
  margin: 20px auto;
}

.active3 {
  .img {
    width: 60px;
    height: 60px;
    background-image: url("../../../assets/enter/success.png");
    background-size: 100% 100%;
    margin: 20px auto;
  }
  .title {
    text-align: center;
  }
}

.el-main {
  line-height: 25px;
  // text-align: left !important;
}

.modifyPassword {
  text-align: left;
}
</style>