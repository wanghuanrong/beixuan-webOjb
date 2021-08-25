<template>
  <div class="QxOrderDetail">
    <!-- 倒计时 -->
    <div class="tishi" v-if="this.status == 0">
      <el-alert type="error" style="color: black"
        >订单提交成功，请尽快完成支付！请在
        <span style="color: #fb6d6d"
          >{{ SYhour }}小时{{ SYminute }}分钟{{ SYsecond }}秒</span
        >
        内完成支付，超时后将取消订单</el-alert
      >
    </div>
    <el-card>
      <!-- 订单信息 -->
      <div class="orderinfo">
        <div class="title">订单信息</div>
        <div class="returnDD" @click="returnDD">&lt; 返回</div>
        <div class="content">
          <div class="imgSmall">
            <div class="imgSmallBox">
              <div class="img" v-if="statusFun" :style="{'backgroundImage': 'url(' + require('../../../../assets/enter/' + (statusFun ? statusFun : '')) + ')'}"></div>
              <div>{{statusFontFun ? statusFontFun:""}}</div>
            </div>
          </div>
          <div class="orderId">
            <div class="orderIdBox">
              <div class="ts">订单编号：</div>
              <div class="">{{orderNum}}</div>
            </div>
          </div>
          <div class="orderId">
            <div class="orderIdBox">
              <div class="ts">交易编号：</div>
              <div class="">{{tranNum ? tranNum : '无'}}</div>
            </div>
          </div>
          <div class="orderId">
            <div class="orderIdBox">
              <div class="ts">创建时间：</div>
              <div class="">{{orderCreateTime}}</div>
            </div>
          </div>
          <div class="payBtn">
            <div class="zfBtn" v-if="this.status == 0" @click="ljPayClick()">立即付款</div>
          </div>
        </div>
      </div>
      <!-- 订单详情 -->
      <div class="orderDetail" style="margin-top: 40px">
        <div class="title">订单详情</div>
        <div class="content">
          <el-table
            :data="tableData"
            style="width: 100%"
            :header-cell-style="{
              background: '#F5F5F5',
              color: '#333333',
              fontWeight: '600',
            }"
          >
            <el-table-column prop="goodsImage" style="width: 10%">
              <template slot-scope="scope">
                <div class="img">
                  <img :src="$http + scope.row.goodsImage" alt="" />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="服务项目信息"
              style="width: 10%"
            >
            </el-table-column>
            <el-table-column prop="goodsPrice" label="单价" style="width: 10%">
            </el-table-column>
            <el-table-column prop="number" label="数量" style="width: 10%">
            </el-table-column>
            <el-table-column prop="totalPrice" label="实付" style="width: 10%">
              <template slot-scope="scope">
                <div style="color: #fb6d6d">￥{{ scope.row.goodsPrice * scope.row.number}}</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 发票信息 -->
      <div class="FPInfo" style="margin-top: 40px" v-if="status == 1 || status == 2">
        <div class="title">发票信息</div>
        <div class="content">
          <el-table
            :data="tableData1"
            style="width: 100%"
            :header-cell-style="{
              background: '#F5F5F5',
              color: '#333333',
              fontWeight: '600',
              textAlign: 'center'
            }"
            :cell-style="{ textAlign: 'center' }"
          >
            <el-table-column prop="invoiceType" label="发票类型"> 
              <template slot-scope="scope">
                {{scope.row.invoiceType == 1 ? '专票' : '普票'}}
              </template>
            </el-table-column>
            <el-table-column prop="invoiceTitle" label="发票抬头"></el-table-column>
            <el-table-column prop="taxpayerNumber" label="纳税人识别号">
            </el-table-column>
            <el-table-column prop="companyAddress" label="公司地址"> </el-table-column>
            <el-table-column prop="companyPhone" label="公司电话"> </el-table-column>
            <el-table-column prop="bankName" label="开户行名称">
            </el-table-column>
            <el-table-column prop="bankAccount" label="开户行账号">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 发票邮寄地址 -->
      <div class="FPdress" style="margin-top: 40px"  v-if="status == 1 || status == 2">
        <div class="title">发票邮寄地址</div>
        <div class="content">
          <div class="threeBox">
            <div class="hang">
              <div class="ts">收件人：</div>
              <div class="tsInfor">{{ FPperson }}</div>
            </div>
            <div class="hang">
              <div class="ts">收件地址：</div>
              <div class="tsInfor">{{ FPaddress }}</div>
            </div>
            <div class="hang">
              <div class="ts">收件电话：</div>
              <div class="tsInfor">{{ FPPhone }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 金额明细 -->
      <div class="allDetail" style="margin-top: 40px">
        <div class="title">金额明细</div>
        <div class="content">
          <div class="priceMX">
            <div class="priceMXBox">
              <div>
                <div>{{ totalNum }}件</div>
                <div>项目服务数量：</div>
              </div>
              <div>
                <div>￥{{ ZtotalPrice }}</div>
                <div>服务项目总价：</div>
              </div>
              <div style="margin-top: 40px">
                <div class="totalPrice">￥{{ ZtotalPrice }}元</div>
                <div>应付金额：</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { orderList } from "@/utils/QYcenter";
export default {
  created() {
    orderList('','',-1, this.$route.query.parentId).then((res) => {
      console.log(res);
      if(res.code !=200){
        this.$message.error("获取订单信息失败！");
        return;
      }

      this.DdInfo = res.rows[0];
      console.log(this.DdInfo);

      // 把子列表填到数组中
      this.tableData = this.DdInfo.mallChildrenOrder;
      // 把基本信息填到数组中
      this.tableData1.push(this.DdInfo.mallInvoice);

      // 提取发票信息
      this.FPperson = this.tableData1[0].addresseeName;
      this.FPaddress = this.tableData1[0].emailAddress;
      this.FPPhone = this.tableData1[0].contactPhone;

      // 提取状态
      this.status = this.DdInfo.status;

      // 提取商品信息
      this.orderNum = this.DdInfo.parentOrderId;
      this.tranNum = this.DdInfo.transactionNo;
      this.orderCreateTime = this.DdInfo.createDate;

      // 提取订单中的商品数量和总价
      this.totalNum = this.tableData.length;
      this.ZtotalPrice = this.DdInfo.totalPrice;

      this.Countdown();
    })
  },
  data() {
    return {
      // 订单信息
      DdInfo:{},
      // 订单状态
      status: -1,
      // 倒计时，时分秒
      SYhour: 0,
      SYminute: 0,
      SYsecond: 0,

      // 商品信息
      orderNum: '',
      tranNum: '',
      orderCreateTime: '',
      
      // 商品列表详情
      tableData: [
      ],
      tableData1: [
      ],
      // 发票邮寄
      FPperson: "*",
      FPaddress: "*",
      FPPhone: "*",

      // 金额明细
      totalNum: 0,
      ZtotalPrice: 0,
    };
  },
  methods: {
    // 倒计时
    Countdown() {
      var TimeCountdown = setInterval(() => {
        const nowDate = Date.now();
        const mtDate = new Date(
          new Date(this.DdInfo.createDate).getTime() + 24 * 60 * 60 * 1000
        );
        var timediff = Math.round((mtDate - nowDate) / 1000);

        // 剩余小时
        this.SYhour = parseInt((timediff / 3600) % 24);
        this.SYminute = parseInt((timediff / 60) % 60);
        this.SYsecond = parseInt(timediff % 60);
        if (this.SYhour < 0 && this.SYminute < 0 && this.SYsecond < 0) {
          clearInterval(TimeCountdown);
        }
      }, 1000);
    },
    ljPayClick(){
      this.$router.push({
        path: '/backhome/serviceshop/payPage',
        query: {
            code:this.DdInfo.parentOrderId,
            createDate: this.DdInfo.createDate,
        }
      })
    },
    // 返回
    returnDD(){
      this.$router.go(-1);
    }
  },
  computed: {
    statusFun(){
      switch(this.status){
        case 0:
          return 'ddfk.png';
        case 1:
          return 'success.png';
        case 2:
          return 'success.png';
        case 3:
          return 'error.png';
      }
    },
    statusFontFun(){
      switch(this.status){
        case 0:
          return '代付款交易';
        case 1:
          return '交易成功';
        case 2:
          return '交易成功';
        case 3:
          return '交易失败';
      }
    }
  }
};
</script>

<style lang="less" scoped>
// 标题
.title {
  height: 35px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 25px;
  color: #333333;
  border-bottom: 2px solid #e3e3e3;
  text-align: left;
}

// 倒计时提示
.tishi {
  margin-bottom: 10px;
}

// 订单消息
.orderinfo {
  width: 100%;
  position: relative;

  .returnDD{
    width: 60px;
    height: 30px;
    position: absolute;
    top: 0px;
    right: 20px;
    cursor: pointer;
  }

  .returnDD:hover{
    color: red;
  }

  .content {
    width: 100%;
    height: 150px;
    display: flex;
    > div {
      flex: 1;
    }
    .imgSmall {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 19px;
      color: #333333;
      .imgSmallBox {
        .img {
          margin: auto;
          width: 50px;
          height: 50px;
          // background-image: url("../../../../assets/enter/error.png");
          background-size: 100% 100%;
        }
      }
    }

    .orderId {
      display: flex;
      align-items: center;
      justify-content: center;
      .orderIdBox {
        line-height: 40px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #666666;
      }
    }

    .payBtn {
      display: flex;
      align-items: center;
      justify-content: center;
      .zfBtn {
        width: 80px;
        height: 30px;
        background: #256bff;
        border-radius: 4px;
        color: white;
        text-align: center;
        line-height: 30px;
        font-size: 13px;
        cursor: pointer;
      }
    }
  }
}


.orderDetail{
  text-align: center;
  .img{
    width: 150px;
    height: 100px;
    margin: auto;
    text-align: center;
    img{
      // width: 100%;
      height: 100%;
    }
  }
}

.FPdress {
  .threeBox {
    margin: 20px 0 0 50px;
    .hang {
      height: 50px;
      line-height: 50px;
      .ts {
        width: 100px;
        float: left;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #999999;
      }
      .tsInfo {
        float: left;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
      }
    }
  }
}

.priceMX {
  overflow: hidden;
  .priceMXBox {
    float: right;
    margin: 20px 0;
    > div {
      overflow: hidden;
      margin: 20px;
      div:nth-child(2) {
        float: right;
        text-align: right;
        font-size: 16px;
        font-weight: 400;
        line-height: 21px;
        color: #666666;
      }
      div:nth-child(1) {
        float: right;
        width: 200px;
        text-align: right;
        font-size: 16px;
        font-weight: 400;
        line-height: 21px;
        color: #333333;
      }

      .totalPrice {
        font-size: 20px;
        font-weight: 600;
        line-height: 26px;
        color: #fd5b5b !important;
      }
    }
  }
}
/deep/.el-table__header,/deep/.el-table__body,/deep/.el-table__footer{
   width: 100%;
   table-layout: fixed !important;
}
</style>