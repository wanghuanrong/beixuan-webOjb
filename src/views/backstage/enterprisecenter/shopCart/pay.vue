<template>
  <div class="payPage">
    <div class="tishi">
      <el-alert type="error" style="color: black"
        >订单提交成功，请尽快完成支付！请在
        <span style="color: #fb6d6d"
          >{{ SYhour }}小时{{ SYminute }}分钟{{ SYsecond }}秒</span
        >
        内完成支付，超时后将取消订单</el-alert
      >
    </div>
    <div class="main">
      <el-card>
        <div class="title">
          <div>请选择支付方式</div>
          <div @click="returnUp">&lt; 返回</div>
        </div>
        <div class="hr"></div>
        <div class="content">
          <div class="payAdiao">
            <el-radio v-model="radio" label="1">
              <div class="img">
                <img :src="require('@/assets/shop/zfb.png')" alt="" />
              </div>
              支付宝支付
            </el-radio>
            <el-radio v-model="radio" label="2">
              <div class="img">
                <img :src="require('@/assets/shop/wx.png')" alt="" />
              </div>
              微信支付
            </el-radio>
            <el-radio v-model="radio" label="3">
              <div class="img">
                <img :src="require('@/assets/shop/yl.png')" alt="" />
              </div>
              银行转账
            </el-radio>
          </div>

          <!-- 支付宝、微信 二维码 -->
          <div class="codeContent" v-show="!YHshow">
            <div v-show="base">
              <div class="codeBox">
                <div class="qrCodeDiv" ref="ZFBqrCodeDiv"></div>
              </div>
              <div class="zfb">
                <div class="ewmImg"></div>
                <div class="title">请使用支付宝扫一扫 扫描二维码支付</div>
              </div>
            </div>

            <div v-show="!base">
              <div class="codeBox">
                <div class="qrCodeDiv" ref="WXqrCodeDiv"></div>
              </div>
              <div class="wx">
                <div class="wxImg"></div>
                <div class="title">请使用微信扫一扫 扫描二维码支付</div>
              </div>
            </div>
          </div>

          <!-- 银行支付 -->
          <div class="YHContent" v-show="YHshow">
            <div class="YHInfo">
              <div>
                <div>收款方账户名称：</div>
                <div>深圳市特兹信息技术有限公司</div>
              </div>
              <div>
                <div>收款方开户银行：</div>
                <div>中国银行股份有限公司深圳蛇口网谷支行</div>
              </div>
              <div>
                <div>收款方账户：</div>
                <div>751071132227</div>
              </div>
            </div>
            <div class="addZFPJ">
              <div class="title">添加支付凭证</div>
              <div class="hr"></div>
              <div class="addBtn">
                <div class="center">
                  <el-upload
                    class="upload-demo"
                    :headers="{ Authorization: 'Bearer ' + token }"
                    :auto-upload="true"
                    :action="$http + '/common/upload'"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="1"
                    :on-exceed="handleExceed"
                    :on-success="uploadSuccess"
                    :file-list="fileList"
                  >
                    <div class="addFH"></div>
                  </el-upload>

                  <div class="title">(已支付请添加支付凭证)</div>
                </div>
              </div>
            </div>

            <div class="submitBtn" @click="YHZFClick">提交</div>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 成功提示弹窗 -->
    <el-dialog title="提示" :close-on-click-modal="false" :visible.sync="dialogVisible" width="35%" center>
      <div class="" style="text-align: center">
        <div class="">
          <img :src="require('@/assets/shop/dui.png')" alt="" />
        </div>
        <div>提交完成</div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="firstSuccess">完 成</el-button>
        <el-button type="primary" @click="dialogClick(2)">开 发 票</el-button>
      </span>
    </el-dialog>

    <!-- 开发票提示弹窗 -->
    <el-dialog title="发票信息" :close-on-click-modal="false" :before-close="handleClose1" :visible.sync="dialogFormVisible" width="45%">
      <el-form :model="form" :rules="rules" ref="KFPform">
        <el-form-item label="发票类型" label-width="180px">
          <el-radio v-model="form.invoiceType" label="1">专票</el-radio>
          <el-radio v-model="form.invoiceType" label="2">普票</el-radio>
        </el-form-item>

        <el-form-item
          label="发票抬头："
          prop="invoiceTitle"
          label-width="180px"
        >
          <el-input v-model="form.invoiceTitle"></el-input>
        </el-form-item>

        <el-form-item
          label="纳税人识别号："
          prop="taxpayerNumber"
          label-width="180px"
        >
          <el-input v-model="form.taxpayerNumber"></el-input>
        </el-form-item>

        <el-form-item
          label="公司地址："
          prop="companyAddress"
          label-width="180px"
          v-if="kfpDom"
        >
          <el-input v-model="form.companyAddress"></el-input>
        </el-form-item>

        <el-form-item
          label="公司电话："
          prop="companyPhone"
          label-width="180px"
          v-if="kfpDom"
        >
          <el-input v-model="form.companyPhone"></el-input>
        </el-form-item>

        <el-form-item
          label="开户行名称："
          prop="bankName"
          label-width="180px"
          v-if="kfpDom"
        >
          <el-input v-model="form.bankName"></el-input>
        </el-form-item>

        <el-form-item
          label="开户行账号："
          prop="bankAccount"
          label-width="180px"
          v-if="kfpDom"
        >
          <el-input v-model="form.bankAccount"></el-input>
        </el-form-item>

        <el-form-item
          label="发票邮寄地址："
          prop="emailAddress"
          label-width="180px"
        >
          <el-input v-model="form.emailAddress"></el-input>
        </el-form-item>

        <el-form-item
          label="收件人姓名："
          prop="addresseeName"
          label-width="180px"
        >
          <el-input v-model="form.addresseeName"></el-input>
        </el-form-item>

        <el-form-item
          label="联系电话："
          prop="contactPhone"
          label-width="180px"
        >
          <el-input v-model="form.contactPhone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="FPsubmitBtn"
          style="background-color: #256bff; color: white"
          >提交</el-button
        >
      </div>
    </el-dialog>

    <!-- 开发票成功提示弹窗 -->
    <el-dialog title="提示" :close-on-click-modal="false" :visible.sync="FPdialogVisible"  :before-close="handleClose1" width="35%" center>
      <div class="" style="text-align: center">
        <div><img :src="require('@/assets/shop/dui.png')" alt="" /></div>
        <div>您的发票信息已提交</div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="FPSuccess">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";

import {
  ZFBpay,
  WXpay,
  unionPay,
  backPay,
  invoice,
} from "@/utils/backstageShop";

export default {
  created() {
    // this.QRcode = this.$route.query.code;
    this.token = sessionStorage.getItem("token");
    console.log(this.token);
  },
  mounted() {
    this.Countdown();

    // 延迟到下一次界面渲染执行
    this.$nextTick(() => {
      // 生成支付宝支付链接，再转成二维码
      console.log(this.$route.query.code);
      ZFBpay(this.$route.query.code).then((res) => {
        console.log(res);
        if (res.code != 200) {
          this.$message.error("生成支付宝二维码失败！");
          return;
        }
        console.log(res);
        this.QRcode = res.msg;

        this.ZFBbindQRCode();
      });

      // 生成微信支付链接，再转成二维码
      WXpay(this.$route.query.code).then((res) => {
        console.log(res);
        if (res.code != 200) {
          this.$message.error("生成微信二维码失败！");
          return;
        }
        console.log(res);
        this.QRcode = res.msg;

        this.WXbindQRCode();

        // 每隔一秒钟，请求一次数据，查看用户是否支付完成
        this.backTime = setInterval(() => {
          const payIs = sessionStorage.getItem("payIs");
          console.log(payIs);
          if(payIs == 'yes'){
            clearInterval(this.backTime);
            this.dialogVisible = true;
          }
        }, 3000);
      });
    });
  },
  beforeDestroy() {
    if (this.backTime) {
      clearInterval(this.backTime); //关闭
      sessionStorage.removeItem("payIs");
    }
  }, //利用vue的生命周期函数
  data() {
    return {
      radio: "1",
      QRcode: "",
      base: true,
      YHshow: false,
      dialogVisible: false,
      form: {
        invoiceType: "1",
        invoiceTitle: "",
        taxpayerNumber: "",
        companyAddress: "",
        companyPhone: "",
        bankName: "",
        bankAccount: "",
        emailAddress: "",
        addresseeName: "",
        contactPhone: "",
      },
      dialogFormVisible: false,
      kfpDom: true,
      FPdialogVisible: false,
      SYhour: null,
      SYminute: null,
      SYsecond: null,
      backTime: "",
      //   银行支付
      token: null,
      fileList: [],
      imgFile: "",

      rules: {
        invoiceType: [{ required: true, message: "不能为空", trigger: "blur" }],
        invoiceTitle: [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        taxpayerNumber: [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        companyAddress: [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        companyPhone: [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        bankName: [{ required: true, message: "不能为空", trigger: "blur" }],
        bankAccount: [{ required: true, message: "不能为空", trigger: "blur" }],
        emailAddress: [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        addresseeName: [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        contactPhone: [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //   生成二维码
    ZFBbindQRCode() {
      new QRCode(this.$refs.ZFBqrCodeDiv, {
        text: this.QRcode,
        width: 200,
        height: 200,
        colorDark: "#333333", //二维码颜色
        colorLight: "#ffffff", //二维码背景色
        correctLevel: QRCode.CorrectLevel.L, //容错率，L/M/H
      });
    },
    WXbindQRCode() {
      new QRCode(this.$refs.WXqrCodeDiv, {
        text: this.QRcode,
        width: 200,
        height: 200,
        colorDark: "#333333", //二维码颜色
        colorLight: "#ffffff", //二维码背景色
        correctLevel: QRCode.CorrectLevel.L, //容错率，L/M/H
      });
    },
    // ------银行支付按钮
    YHZFClick() {
      console.log("xxx");
      if (this.imgFile == "") {
        this.$message.error("请先上传凭证！");
        return;
      }
      unionPay(this.$route.query.code, this.imgFile).then((res) => {
        console.log(res);
        if (res.code != 200) {
          this.$message.error("提交银行支付信息失败！");
          return;
        }

        this.$message.success("提交成功！");
        this.$router.push("/backhome/companycenter/myOrder");
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`只能选择一个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    uploadSuccess(response, file, fileList) {
      console.log(response);
      if (response.code != 200) {
        this.$message.error("上传图片失败！");
        return;
      }

      this.imgFile = response.fileName;
    },
    // ------银行支付按钮
    handleClose() {
      this.dialogVisible = true;
    },
    handleClose1(){
      console.log("xxx");
      this.$router.push("/backhome/companycenter/myOrder");
    },
    dialogClick(index) {
      this.dialogVisible = false;
      if ((index = 2)) {
        this.dialogFormVisible = true;
      }
    },
    FPsubmitBtn() {
      this.$refs.KFPform.validate((vaild) => {
        if (!vaild) {
          return;
        }

        invoice(this.form, this.$route.query.code).then((res) => {
          console.log(res);

          if (res.code != 200) {
            this.$message.error("提交信息失败！");
            return;
          }

          this.dialogFormVisible = false;
          this.FPdialogVisible = true;
        });
      });
    },
    // 完成之后，点击完成，直接跳转
    firstSuccess() {
      this.dialogVisible = false;
      this.$router.push("/backhome/companycenter/myOrder");
    },
    // 开完票，点击完成，跳转
    FPSuccess() {
      this.FPdialogVisible = false;
      this.$router.push("/backhome/companycenter/myOrder");
    },
    // 倒计时
    Countdown() {
      var TimeCountdown = setInterval(() => {
        const nowDate = Date.now();
        const mtDate = new Date(
          new Date(this.$route.query.createDate).getTime() + 24 * 60 * 60 * 1000
        );
        var timediff = Math.round((mtDate - nowDate) / 1000);

        // 剩余小时
        this.SYhour = parseInt((timediff / 3600) % 24);
        this.SYminute = parseInt((timediff / 60) % 60);
        this.SYsecond = parseInt(timediff % 60);
        if (this.SYhour == 0 && this.SYminute == 0 && this.SYsecond == 0) {
          clearInterval(TimeCountdown);
        }
      }, 1000);
    },
    // 返回上一级
    returnUp() {
      this.$router.go(-1);
    },
  },
  watch: {
    radio(value) {
      console.log(value);
      if (value == 1) {
        this.base = true;
        this.YHshow = false;
        // this.bindQRCode();
      } else if (value == 2) {
        this.base = false;
        this.YHshow = false;
        // this.bindQRCode();
      } else if (value == 3) {
        this.YHshow = true;
      }
    },
    "form.invoiceType"(value) {
      console.log(value);
      if (value == 1) {
        this.kfpDom = true;
      } else {
        this.kfpDom = false;
      }
    },
    dialogFormVisible(val){
      if(!val){
        this.$router.push("/backhome/companycenter/myOrder");
      }
    }
  },
};
</script>

<style lang="less" scoped>
@import url("../../../../assets/css/Belement.css");

.payPage {
  .main {
    margin-top: 10px;
    width: 100%;
    overflow: hidden;
    .content {
      width: 100%;
      //   height: 600px;
      margin: auto;
      .payAdiao {
        width: 800px;
        height: 150px;
        padding-top: 50px;
        margin: auto;
        display: flex;
        .el-radio {
          flex: 1;
        }
        .img {
          //   width: 35px;
          //   height: 35px;
          display: inline-block;
          position: relative;
          top: 15px;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }

      .codeContent {
        width: 300px;
        height: 400px;
        margin: auto;
        .codeBox {
          width: 300px;
          height: 300px;
          margin: auto;
          // border: 1px dashed black;
          overflow: hidden;
          background-image: url("../../../../assets/shop/fk.png");
          background-size: 100% 100%;
          .qrCodeDiv {
            width: 200px;
            height: 200px;
            margin: 50px 50px;
          }
        }
        .zfb {
          width: 300px;
          height: 80px;
          background-color: #4c86ff;
          margin: 20px auto;
          overflow: hidden;
          > div {
            float: left;
          }
          .ewmImg {
            width: 60px;
            height: 60px;
            background-image: url("../../../../assets/shop/sm.png");
            background-size: 100% 100%;
            margin: 10px 0 10px 45px;
          }
          .title {
            width: 140px;
            height: 70px;
            line-height: 30px;
            margin-top: 10px;
            font-size: 14px;
            margin-left: 20px;
            color: white;
          }
        }
        .wx {
          width: 300px;
          height: 80px;
          background-color: #00be01;
          margin: 20px auto;
          overflow: hidden;
          > div {
            float: left;
          }
          .wxImg {
            width: 60px;
            height: 60px;
            background-image: url("../../../../assets/shop/sm.png");
            background-size: 100% 100%;
            margin: 10px 0 10px 45px;
          }
          .title {
            width: 140px;
            height: 70px;
            line-height: 30px;
            margin-top: 10px;
            font-size: 14px;
            margin-left: 20px;
            color: white;
          }
        }
      }

      //   银行支付
      .YHContent {
        width: 100%;
        overflow: hidden;
        .YHInfo {
          width: 800px;
          height: 240px;
          background-image: url("../../../../assets/shop/dfk.png");
          background-size: 100% 100%;
          margin: auto;
          > div {
            height: 80px;
            overflow: hidden;
            div:nth-child(1) {
              width: 150px;
              height: 80px;
              line-height: 80px;
              float: left;
              text-align: left;
              margin-left: 200px;

              font-size: 16px;
              font-weight: 400;
              color: #999999;
            }
            div:nth-child(2) {
              // width: 200px;
              height: 80px;
              line-height: 80px;
              float: left;
              font-weight: 600;
            }
          }
        }

        .addZFPJ {
          margin-top: 50px;

          .addBtn {
            width: 100%;
            height: 300px;
            background: #fcfdff;
            border: 1px solid #e3e3e3;
            box-shadow: 0px 3px 6px rgba(216, 236, 254, 0.16);
            opacity: 1;
            border-radius: 10px;

            .center {
              width: 200px;
              height: 110px;
              margin: 100px auto;
              .addFH {
                // border: 1px solid red;
                width: 80px;
                height: 80px;
                margin: auto;
                cursor: pointer;
                background-image: url("../../../../assets/shop/addPz.png");
                background-size: 100% 100%;
              }
              .title {
                width: 200px;
                text-align: center;
                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #333333;
                margin: 10px 0 0 0;
              }
            }
          }
        }
        .submitBtn {
          width: 130px;
          height: 44px;
          background: #256bff;
          border-radius: 4px;
          text-align: center;
          line-height: 44px;
          color: white;
          margin: 20px auto;
          cursor: pointer;
        }
      }
    }
  }
}

.title {
  height: 21px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 21px;
  color: #333333;
  text-align: left;
  margin: 0 0 20px 0;
  overflow: hidden;
  div:first-child {
    float: left;
  }
  div:last-child {
    float: right;
    text-align: right;
    cursor: pointer;
  }
}
.hr {
  width: 100%;
  height: 0;
  border: 1px solid #e3e3e3;
  margin: 20px 0;
}
.upload-demo {
  text-align: center;
}
</style>