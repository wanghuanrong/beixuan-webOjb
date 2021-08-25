<template>
  <!-- 注册模块 -->
  <!-- v-if="registerModelIf" -->
  <div class="registerModel" @click.stop>
    <div class="clearZC" v-if="clearIs" @click="clearClick">✖</div>
    <div class="prompt">
      填写信息，我们会为您开通<span style="color: #256bff">全部功能</span
      >的产品使用
    </div>

    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="160px"
      style="width: 570px"
    >
      <el-form-item label="公司全称" prop="companyName">
        <el-input
          v-model="form.companyName"
          placeholder="公司全称（请填写全称确保开通）"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="您的邮箱"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="nickName">
        <el-input v-model="form.nickName" placeholder="您的姓名"></el-input>
      </el-form-item>
      <el-form-item label="职位" prop="post">
        <el-input v-model="form.post" placeholder="您的职位"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="userName">
        <el-input v-model="form.userName" placeholder="联系方式"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input
          v-model="form.code"
          placeholder="请输入短信验证码"
          style="width: 218px"
        ></el-input>

        <div
          :class="{ codeBtnTime: !yzmIs, codeBtn: yzmIs }"
          @click="yzmIs && yzmClick()"
        >
          <span v-if="yzmIs">获取验证码</span>
          <span v-else>{{ yzmCountdown }}后重新获取</span>
        </div>
      </el-form-item>

      <div class="TrialAccount" @click="register">立即开通试用账号</div>
    </el-form>
  </div>
</template>

<script>
import { getDetail, requestData } from "@/utils/register";
export default {
  props:{
    clearIs:{
      type: Boolean
    }
  },
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

    //   定义邮箱的正则验证对象
    var checkEmail = (rule, value, cb) => {
      // 验证码邮箱的验证正则表达式
      const regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb();
      }

      cb(new Error("请输入合法的邮箱"));
    };
    return {
      form: {
        code: "",
        companyName: "",
        email: "",
        nickName: "",
        post: "",
        userName: "",
      },
      registerModelIf: false,
      yzmCountdown: 60,
      yzmIs: true,

      // 注册模块，输入框格式验证规则
      rules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            validator: checkEmail,
            message: "请输入正确的邮箱",
            trigger: "blur",
          },
        ],
        userName: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            validator: checkphone,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
        // code:[
        //     { required: true, message: '请输入验证码', trigger: 'blur' },
        //     // { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        // ],
        companyName: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
          // { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          // { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        post: [
          { required: true, message: "请输入职位", trigger: "blur" },
          // { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
      },
    };
  },
  mounted() {},
  methods: {
    // 验证码按钮的单机事件，先校验格式是否正确
    //  this.$message.error/success("")
    yzmClick() {
      this.$refs.form.validate((vaild) => {
        if (!vaild) {
          return;
        }

        // console.log(this.form.userName);
        // 通过接口发送验证码，参数2： 手机号
        getDetail("1", this.form.userName).then((res) => {
          // console.log(res);
          if (res.code != 200) {
            this.$message.error("获取验证码失败！");
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
    // 注册按钮单机事件
    register() {
      this.$refs.form.validate((vaild) => {
        if (!vaild) {
          return;
        }

        // 将用户填写好的信息作为参数
        requestData(this.form).then((res) => {
          // console.log(res);
          if (res.code == 200) {
            this.$message.success(res.msg);
            // 清空表单数据
            Object.keys(this.form).forEach(key => (this.form[key] = ''));
            
          } else {
            this.$message.error(res.msg);
          }
        });
      });
    },

    // 关闭按钮
    clearClick(){
      this.$emit("clearReg");
    }
  },
};
</script>

<style lang="less" scoped>
// 注册模块
.registerModel {
  width: 700px;
  height: 550px;
  background-color: white;
  // position: absolute;
  // right: 0;
  // top: 90px;
  z-index: 9999;
  overflow: hidden;

  // 关闭
  .clearZC{
    width: 10px;
    height: 10px;
    text-align: center;
    line-height: 10px;
    position: absolute;
    right: 15px;
    top: 15px;
    cursor: pointer;
  }

  .clearZC:hover{
    color: red;
  }

  // 提示
  .prompt {
    margin: 30px 0 30px 80px;
    width: 434px;
    height: 26px;
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 26px;
    color: #333333;
    opacity: 1;
  }

  // 所有输入框
  .el-form-item__content {
    width: 414px;
    height: 40px;
    margin-left: 40px;
  }
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

  .TrialAccount {
    width: 414px;
    height: 51px;
    background: linear-gradient(360deg, #0a38ed 0%, #6180f8 100%);
    box-shadow: 0px 3px 6px rgba(16, 56, 255, 0.25);
    opacity: 1;
    border-radius: 4px;
    line-height: 51px;
    text-align: center;
    color: white;
    margin-left: 160px;
    cursor: pointer;
  }
}
</style>