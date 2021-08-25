<template>
  <div class="account">
    <el-card>
      <div class="main">
        <div class="head">
          <div class="title">账户管理</div>
          <div class="name">{{ companyName }}</div>
          <div class="twoBtn">
            <div class="box">
              <el-button
                @click="addYh"
                type="primary"
                size="small"
                style="
                  background-color: #7a96ed;
                  border-color: #7a96ed;
                  margin-right: 30px;
                "
                >添加用户<img :src="require('@/assets/knowled/tj.png')" alt=""
              /></el-button>
              <!-- <el-button
                type="primary"
                size="small"
                style="background-color: #f47e7e; border-color: #f47e7e"
                >删除<img :src="require('@/assets/knowled/sc.png')" alt=""
              /></el-button> -->
            </div>
          </div>
        </div>

        <div class="table">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            stripe
            @selection-change="handleSelectionChange"
            :header-cell-style="{
              'background-color': '#E4EEFF',
              color: '#0453FA',
              textAlign: 'center',
            }"
            :cell-style="{ textAlign: 'center' }"
          >
            <el-table-column prop="date" label="序号">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="username" label="账户"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div class="delete" @click="deleteListClick(scope.row)"></div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>

    <!-- 添加弹窗 -->
    <el-dialog title="添加账户" :close-on-click-modal="false" :visible.sync="dialogFormVisible" width="510px">
      <el-form :model="form" :rules="rules" ref="KFPform">
        <el-form-item label="手机号" prop="username" label-width="120px">
          <el-input v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="code" label-width="120px">
          <el-input v-model="form.code" style="width: 160px"></el-input>
          <div
            :class="{ codeBtnTime: !yzmIs, codeBtn: yzmIs }"
            @click="yzmIs && yzmClick()"
          >
            <span v-if="yzmIs">获取验证码</span>
            <span v-else>{{ yzmCountdown }}后重新获取</span>
          </div>
        </el-form-item>

        <el-form-item label="设置密码" prop="password" label-width="120px">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="6~18位，并且开头为字母，后面为数字"
          ></el-input>
        </el-form-item>

        <el-form-item label="再次确认密码" prop="password1" label-width="120px">
          <el-input v-model="form.password1" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button
          @click="FPsubmitBtn"
          style="background-color: #256bff; color: white; width: 200px"
          >确定</el-button
        >
      </div>
    </el-dialog>

    <!-- 添加成功提示弹窗 -->
    <el-dialog title="提示" :close-on-click-modal="false" :visible.sync="dialogVisible" width="35%" center>
      <div class="" style="text-align: center">
        <div class="">
          <img :src="require('@/assets/shop/dui.png')" alt="" />
        </div>
        <div>添加用户成功</div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除用户提示弹窗 -->
    <el-dialog title="提示" :close-on-click-modal="false" :visible.sync="deleteDialog" width="35%" center>
      <div class="" style="text-align: center">
        <div class="">
          <!-- <img :src="require('@/assets/shop/dui.png')" alt="" /> -->
        </div>
        <div>确定删除该用户？</div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteDialogClick()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除用户成功弹窗 -->
    <el-dialog title="提示" :close-on-click-modal="false" :visible.sync="deleteCgIs" width="35%" center>
      <div class="" style="text-align: center">
        <div class="">
          <img :src="require('@/assets/shop/dui.png')" alt="" />
        </div>
        <div>删除用户成功</div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteCgIs = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { ZZHList, ZZHAdd, ZZHDelete } from "@/utils/QYcenter";
import { getDetail } from "@/utils/register";
import { Base64 } from "js-base64";

export default {
  created() {
    // 获取用户信息、渲染公司名称
    const local = JSON.parse(localStorage.getItem("userInfo"));
    this.companyName = local.companyName;

    // 获取用户信息列表
    this.getInfoList();
  },
  data() {
    //   定义手机的正则验证对象
    var checkphone = (rule, value, cb) => {
      // 验证码手机的验证正则表达式
      const regphone = /^1[3|4|5|7|8|9][0-9]{9}$/;

      if (regphone.test(value)) {
        // 合法的手机
        return cb();
      }

      cb(new Error("请输入合法的手机"));
    };

    // 定义密码的正则验证对象
    var passwordyz = (rule, value, cb) => {
      // 密码的验证正则表达式
      const regpassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\\\\W]{6,18}$/;

      if (regpassword.test(value)) {
        // 合法的密码
        return cb();
      }

      cb(new Error("密码必须6~18位，并且开头为字母，后面为数字"));
    };
    return {
      companyName: "",
      tablePage: { pageNum: 1, pageSize: 10 },
      tableData: [],
      multipleSelection: [],
      dialogVisible: false,
      dialogFormVisible: false,
      form: {
        username: "",
        code: "",
        password: "",
        password1: "",
      },
      yzmIs: true,
      yzmCountdown: 60,

      deleteDialog: false,
      deleteUserId: "",

      deleteCgIs: false,
      rules: {
        username: [
          { required: true, message: "不能为空", trigger: "blur" },
          {
            validator: checkphone,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
        code: [{ required: true, message: "不能为空", trigger: "blur" }],
        password: [
          { required: true, message: "不能为空", trigger: "blur" },
          {
            validator: passwordyz,
            message: "密码必须6~18位，并且开头为字母，后面为数字",
            trigger: "blur",
          },
        ],
        password1: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getInfoList() {
      ZZHList(this.tablePage).then((res) => {
        console.log(res);
        if (res.code != 200) {
          this.$message.error("请求用户列表失败！");
          return;
        }

        this.tableData = [];
        for (let item of res.rows) {
          let obj = { username: item.username, userId: item.userId };
          this.tableData.push(obj);
        }
      });
    },

    // 添加用户按钮
    addYh() {
      this.dialogFormVisible = true;
    },
    // 添加用户
    FPsubmitBtn() {
      this.$refs.KFPform.validate((vaild) => {
        if (!vaild) {
          return;
        }
        if (this.form.password != this.form.password1) {
          this.$message.error("密码不一致，请检查！");
          return;
        }

        let Base64 = require("js-base64").Base64;
        let base64from = {
          username: this.form.username,
          code: this.form.code,
          password: Base64.encode(this.form.password),
          password1: Base64.encode(this.form.password1),
        };

        ZZHAdd(base64from).then((res) => {
          console.log(res);
          if (res.code != 200) {
            this.$message.error(res.msg);
            return;
          }

          // this.$message.success("添加成功！");
          this.dialogFormVisible = false;
          this.getInfoList();
          this.dialogVisible = true;
        });
      });
    },
    // 获取验证码
    yzmClick() {
      // if (!vaild) {
      //   return;
      // }
      const regphone = /^1[3|4|5|7|8|9][0-9]{9}$/;
      if (!regphone.test(this.form.username)) {
        this.$message.error("请输入合法的手机号");
        return;
      }
      console.log(this.form.username);
      // 通过接口发送验证码，参数2： 手机号
      getDetail("1", this.form.username).then((res) => {
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
    deleteListClick(val) {
      console.log(val);
      this.deleteUserId = val.userId;
      this.deleteDialog = true;
    },
    // 删除弹窗事件
    deleteDialogClick() {
      ZZHDelete(this.deleteUserId).then((res) => {
        console.log(res);
        if (res.code != 200) {
          this.$message.error("删除用户失败！");
          return;
        }

        this.deleteDialog = false;
        this.getInfoList();
        this.deleteCgIs = true;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  padding: 0 50px;
  .head {
    width: 100%;
    display: flex;
    height: 70px;
    .title {
      flex: 2;
      height: 70px;
      font-size: 16px;
      font-weight: bold;
      line-height: 70px;
      color: #0453fa;
    }

    .name {
      flex: 5;
      text-align: center;
      height: 70px;
      font-size: 16px;
      font-weight: bold;
      line-height: 70px;
      color: #0453fa;
    }

    .twoBtn {
      flex: 2;
      .box {
        overflow: hidden;
        float: right;
        margin-top: 20px;
      }
      img {
        position: relative;
        top: 3px;
        left: 3px;
      }
    }
  }

  .table {
    .delete {
      width: 20px;
      height: 20px;
      background: url("../../../../assets/enter/redSc.png") no-repeat center
        center;
      margin: auto;
      cursor: pointer;
    }
  }
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
/deep/.el-table__header,/deep/.el-table__body,/deep/.el-table__footer{
   width: 100%;
   table-layout: fixed !important;
}
</style>