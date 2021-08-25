<template>
  <div class="myOrder">
    <el-card>
      <!-- 头部 -->
      <div class="head">
        <div
          class="headItem"
          v-for="(item, index) in headList"
          :key="index"
          :class="{ clickHeadItem: item.id === headCheckIs }"
          @click="headCheckClick(item.id)"
        >
          {{ item.status }}
          <span class="num">{{ statusNum[statusNumFun(item.id)] }}</span>
        </div>
      </div>

      <!-- 表头部 -->
      <div class="tableHead">
        <div class="">
          <span>购买服务项目信息</span>
        </div>
        <div class="">单价</div>
        <div class="">数量</div>
        <div class="">实付款</div>
        <div class="">交易状态</div>
        <div class="">交易操作</div>
      </div>

      <!-- 全选 -->
      <div class="allCheck">
        <div class="allChecked">
          <el-checkbox :value="allchecked" @change="allcheckedChnage"
            >选中当页</el-checkbox
          >
        </div>
        <div class="deleteCheck" @click="deleteCheck">删除选中</div>
      </div>

      <div class="mainNo" v-if="itemList.length == 0"></div>

      <!-- 表主体 -->
      <div class="tablebox" v-else>
        <el-checkbox-group v-model="checkShopIndex">
          <!-- 订单:第一层遍历 -->
          <div class="tableItem" v-for="(item, index) in itemList" :key="index">
            <!-- 小头部 -->
            <div class="itemHead">
              <div class="itemCheck">
                <el-checkbox :label="item.parentOrderId"></el-checkbox>
              </div>
              <div class="itemTime">下单时间：{{ item.createDate }}</div>
              <div class="itemCode">订单号：{{ item.parentOrderId }}</div>

              <div
                class="delete"
                @click="deleteOrder(item.parentOrderId)"
                :style="{
                  'background-image':
                    'url(' + require('@/assets/enter/redSc.png') + ')',
                }"
              ></div>
            </div>
            <!-- 小主体：第二层遍历 -->
            <div
              class="itemMain"
              :class="{ borderDG: item.mallChildrenOrder.length > 1 }"
            >
              <!-- 前三 -->
              <div
                class="QthreeBox"
                :class="{ borderDG: item.mallChildrenOrder.length > 1 }"
              >
                <div
                  class="threeItem"
                  v-for="(item2, index2) in item.mallChildrenOrder"
                  :key="index2 + '2'"
                >
                  <div class="itemImgTitle">
                    <div class="img">
                      <img v-lazy="$http + item2.goodsImage" alt="" />
                    </div>
                    <div class="title">{{ item2.goodsName }}</div>
                  </div>
                  <div class="price">￥{{ item2.goodsPrice }}</div>
                  <div class="num">{{ item2.number }}</div>
                </div>
              </div>
              <!-- 后三 -->
              <div class="totalPrice">￥{{ item.totalPrice }}</div>
              <div class="status" v-html="statusIf(item.status)"></div>
              <div class="operating">
                <div class="operBox">
                  <div @click="operatingCKXQ(item.parentOrderId)">查看详情</div>
                  <div
                    @click="operatingSQKP(item.parentOrderId)"
                    v-if="
                      (item.status == 2 || item.status == 1) &&
                      item.mallInvoice.invoiceId == null
                    "
                  >
                    申请开票
                  </div>
                  <div
                    @click="
                      operatingZCGM(
                        item.mallChildrenOrder[0].classifyId,
                        item.mallChildrenOrder[0].goodsId
                      )
                    "
                    v-if="
                      item.status == 2 || item.status == 3 || item.status == 1
                    "
                  >
                    再次购买
                  </div>
                  <div
                    @click="operatingQXDD(item.parentOrderId)"
                    v-if="item.status == 0"
                  >
                    取消订单
                  </div>
                  <div
                    @click="operatingLJFK(item.parentOrderId, item.createDate)"
                    v-if="item.status == 0"
                    class="ljfkBtn"
                  >
                    立即付款
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-checkbox-group>
      </div>

      <!-- 分页 -->
      <div class="pageBox" style="text-align: center; margin-top: 50px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageObj.pageNum"
          :page-size="pageObj.pageSize"
          layout="prev, pager, next, jumper"
          :total="pageObj.total"
        >
        </el-pagination>
      </div>
    </el-card>

    <!-- 成功提示弹窗 -->
    <el-dialog :close-on-click-modal="false"
      title="取消订单"
      :visible.sync="dialogVisible"
      width="35%"
      center
    >
      <div class="" style="text-align: center">
        <div class="">
          <img v-lazy="require('@/assets/shop/dui.png')" alt="" />
        </div>
        <div>确定要取消此订单吗？</div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogClick">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 开发票提示弹窗 -->
    <el-dialog title="发票信息" :close-on-click-modal="false" :visible.sync="dialogFormVisible" width="800px">
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
    <el-dialog title="提示" :close-on-click-modal="false" :visible.sync="FPdialogVisible" width="35%" center>
      <div class="" style="text-align: center">
        <div><img v-lazy="require('@/assets/shop/dui.png')" alt="" /></div>
        <div>您的发票信息已提交</div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="FPdialogVisible = false">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { orderList, listTotal, removeOne, OrdelCancel } from "@/utils/QYcenter";
import { invoice } from "@/utils/backstageShop";
export default {
  created() {
    this.getItemListFun();
    this.getlistTotal();
  },
  data() {
    return {
      headList: [
        { id: -1, status: "所有订单" },
        { id: 0, status: "待付款" },
        { id: 2, status: "已完成" },
        { id: 3, status: "已取消" },
      ],
      // 状态选择
      headCheckIs: -1,
      // 状态对应的数量
      statusNum: {},
      // 全选
      allchecked: false,
      // 总列表
      itemList: [],
      // 选中的index
      checkShopIndex: [],
      // 分页
      pageObj: {
        pageNum: 1,
        pageSize: 8,
        total: 32,
      },

      // 弹窗
      dialogVisible: false,
      // 取消订单id
      QXparentId: "",

      // 开票
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
    // 获取订单状态数量
    getlistTotal() {
      listTotal().then((res) => {
        console.log(res);
        if (res.code != 200) {
          this.$message.error("请求数量失败！");
          return;
        }

        // 代付款
        this.statusNum.willPay = res.data.willPay;
        // 已完成
        this.statusNum.isPay = res.data.isPay;
        // 已取消
        this.statusNum.calPay = res.data.calPay;
      });
    },
    // 状态点击
    headCheckClick(index) {
      this.headCheckIs = index;
      this.getItemListFun();
    },
    // 获取列表
    getItemListFun() {
      this.getlistTotal();
      orderList(
        this.pageObj.pageNum,
        this.pageObj.pageSize,
        this.headCheckIs
      ).then((res) => {
        console.log(res);
        if (res.code != 200) {
          this.$message.error("获取列表数据失败！");
          return;
        }

        for (let item of res.rows) {
          item.check = false;
        }

        this.itemList = res.rows;
        this.pageObj.total = res.total;
      });
    },
    // 全选
    allcheckedChnage() {
      this.allchecked = !this.allchecked;
      for (let item of this.itemList) {
        item.check = this.allchecked;
      }

      this.checkShopIndex = [];

      for (let i = 0; i < this.itemList.length; i++) {
        if (this.itemList[i].check == true) {
          this.checkShopIndex.push(this.itemList[i].parentOrderId);
        }
      }
    },
    // 删除选中
    deleteCheck() {
      if (this.checkShopIndex.length < 1) {
        this.$message.error("请选择订单!");
        return;
      }
      this.deleteOrder(this.checkShopIndex.join());
      this.allchecked = false;
    },
    // 分页
    handleSizeChange(val) {
      this.pageObj.pageNum = val;
      this.getItemListFun();
      // 取消全选
      this.allchecked = false;
      this.checkShopIndex = [];
    },
    handleCurrentChange(val) {
      this.pageObj.pageNum = val;
      this.getItemListFun();
      // 取消全选
      this.allchecked = false;
      this.checkShopIndex = [];
    },
    // 单个删除
    deleteOrder(parentId) {
      removeOne(parentId).then((res) => {
        console.log(res);
        if (res.code != 200) {
          this.$message.error("删除订单失败！");
          return;
        }

        this.$message.success("删除订单成功！");
        this.getItemListFun();
      });
    },
    // 查看详情
    operatingCKXQ(parentId) {
      this.$router.push({
        path: "/backhome/companycenter/QxOrderDetail",
        query: {
          parentId,
        },
      });
    },
    // 申请开票
    operatingSQKP(parentId) {
      this.dialogFormVisible = true;
      this.QXparentId = parentId;
    },
    // 开票确定
    FPsubmitBtn() {
      this.$refs.KFPform.validate((vaild) => {
        if (!vaild) {
          return;
        }

        invoice(this.form, this.QXparentId).then((res) => {
          console.log(res);

          if (res.code != 200) {
            this.$message.error("提交信息失败！");
            return;
          }

          this.dialogFormVisible = false;
          this.FPdialogVisible = true;
          this.getItemListFun();
        });
      });
    },

    // 再次购买
    operatingZCGM(classifyId, goodsId) {
      console.log(classifyId, goodsId);
      this.$router.push({
        path: "/backhome/serviceshop/shopinfo",
        query: {
          classifyId,
          goodsId,
        },
      });
    },
    // 取消订单
    operatingQXDD(parentId) {
      this.dialogVisible = true;
      this.QXparentId = parentId;
    },
    // 立即付款
    operatingLJFK(parentId, createTime) {
      this.$router.push({
        path: "/backhome/serviceshop/payPage",
        query: {
          code: parentId,
          createDate: createTime,
        },
      });
    },
    // 弹窗
    dialogClick() {
      OrdelCancel(this.QXparentId).then((res) => {
        console.log(res);
        if (res.code != 200) {
          this.$message.error("取消订单失败！");
          return;
        }
        this.$message.success("取消订单成功！");
        this.getItemListFun();
      });

      this.dialogVisible = false;
    },
  },
  watch: {
    "form.invoiceType"(value) {
      console.log(value);
      if (value == 1) {
        this.kfpDom = true;
      } else {
        this.kfpDom = false;
      }
    },
  },
  computed: {
    statusIf() {
      return function (val) {
        switch (val) {
          case 0:
            return "待支付";
          case 1:
            return "已支付";
          case 2:
            return "已完成";
          case 3:
            return "已取消";
        }
        console.log(val);
      };
    },
    statusNumFun() {
      return function (id) {
        switch (id) {
          case 0:
            return "willPay";
          case 1:
            return "isPay";
          case 2:
            return "isPay";
          case 3:
            return "calPay";
        }
      };
    },
  },
};
</script>

<style lang='less' scoped>
@import url("../../../../assets/css/shop.css");
// 头部
.head {
  width: 100%;
  height: 60px;
  border-bottom: 2px solid #e3e3e3;

  .headItem {
    width: 140px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    float: left;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #333333;
    cursor: pointer;
    position: relative;
    .num {
      color: #256bff;
      margin-left: 4px;
    }
  }
  .headItem::before {
    content: "";
    width: 1px;
    height: 15px;
    background-color: #e3e3e3;
    position: absolute;
    top: 22px;
    right: 0px;
  }
  .headItem:last-child::before {
    display: none;
  }
  .headItem:first-child .num {
    display: none;
  }
  .clickHeadItem {
    border-bottom: 2px solid #256bff;
    color: #256bff;
  }
}

// 表格头部
.tableHead {
  width: 100%;
  height: 45px;
  line-height: 45px;
  background-color: #f5f5f5;
  margin-top: 20px;
  display: flex;
  div {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #333333;
  }
  div:nth-child(1) {
    flex: 4;
    span {
      margin-left: 50px;
    }
  }
  div:nth-child(2) {
    flex: 1;
  }
  div:nth-child(3) {
    flex: 1;
  }
  div:nth-child(4) {
    flex: 1;
    text-align: center;
  }
  div:nth-child(5) {
    flex: 1;
    text-align: center;
  }
  div:nth-child(6) {
    flex: 1;
    text-align: center;
  }
}

// 全选
.allCheck {
  height: 60px;
  line-height: 60px;
  .allChecked {
    float: left;
    height: 60px;
    margin-left: 30px;
  }
  .deleteCheck {
    float: left;
    height: 30px;
    width: 80px;
    border: 1px solid #ccc;
    border-radius: 3px;
    line-height: 30px;
    margin: 15px 0 0 15px;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
  }
}

// 表主体
.tablebox {
  width: 100%;
  .tableItem {
    width: 100%;
    overflow: hidden;
    margin-top: 20px;
    border: 1px solid #f0f0f0;

    .itemHead {
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #333333;
      background-color: #f5f5f5;

      > div {
        float: left;
      }
      .itemCheck {
        width: 30px;
        height: 40px;
        margin: 0 30px;
      }
      .itemTime {
        margin-right: 70px;
      }
      .delete {
        width: 20px;
        height: 20px;
        float: right;
        margin: 10px 5% 0 0;
        background-repeat: no-repeat;
        background-position: center center;
        cursor: pointer;
      }
    }

    // 小主体
    .itemMain {
      width: 100%;
      // height: 120px;
      display: flex;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #333333;

      // 前三
      .QthreeBox {
        flex: 6;
        line-height: 120px;
        .threeItem {
          width: 100%;
          display: flex;
          .itemImgTitle {
            flex: 4;
            .img {
              width: 200px;
              height: 100px;
              text-align: center;
              float: left;
              margin: 10px 40px 0 30px;
              img {
                height: 100%;
                // border: 1px dashed black;
              }
            }
            .title {
              height: 120px;
              line-height: 120px;
              float: left;
            }
          }
          .price {
            flex: 1;
          }
          .num {
            flex: 1;
          }
        }
      }

      // 总价
      .totalPrice {
        flex: 1;
        font-weight: bold;
        align-items: center;
        display: flex;
        width: 100%;
        text-align: center;
        justify-content: center;
      }

      // 状态
      .status {
        flex: 1;
        font-weight: bold;
        align-items: center;
        display: flex;
        width: 100%;
        text-align: center;
        justify-content: center;
      }

      // 操作
      .operating {
        flex: 1;
        line-height: 15px;
        text-align: center;
        align-items: center;
        display: flex;
        .operBox {
          overflow: hidden;
          margin: auto;
          > div {
            cursor: pointer;
            margin-top: 10px;
          }
          .ljfkBtn {
            width: 76px;
            height: 25px;
            line-height: 25px;
            background: #256bff;
            opacity: 1;
            border-radius: 4px;
            color: white;
            text-align: center;
            font-size: 12px;
          }
        }
      }
    }
  }
}

.mainNo{
  width: 700px;
  height: 400px;
  background: url('../../../../assets/nodata.png') no-repeat;
  background-size: 100%;
  margin: 50px auto 0;
}

.borderDG {
  > div {
    border-left: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
  }
}

// 分页
// .pageBox {
// }
</style>