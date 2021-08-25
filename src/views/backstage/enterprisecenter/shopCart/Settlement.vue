<template>
  <div class="submitShopInfo">
    <el-card class="el-card">
      <div class="title">确定订单信息</div>
      <div class="hr"></div>
      <div class="trueShowInfo">
        <el-table :data="tableData" style="width: 100%">
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
            <template slot-scope="scope">
              <el-input-number
                v-model="scope.row.number"
                @change="handleChange()"
                :min="1"
                size="mini"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="totalPrice" label="实付" style="width: 10%">
            <template slot-scope="scope">
              <div style="color: #fb6d6d">￥{{ scope.row.totalPrice }}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="title">给客服留言</div>
      <div class="hr"></div>
      <div class="KFMessage" style="margin-top: 20px">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="选填，给客服留言"
          v-model="textarea"
        >
        </el-input>
      </div>

      <div class="title">金额明细</div>
      <div class="hr"></div>
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
    </el-card>
    <div class="twoBtn">
      <div class="submitBtn" @click="submitClick">提交订单</div>
      <div class="submitBtn returnBtn" @click="returnGWC">返回购物车</div>
    </div>
  </div>
</template>

<script>
// import { details, buyNow } from "@/utils/backstageShop";
import { getCarList, submitCart } from "@/utils/QYcenter";
export default {
  created() {
    // console.log(this.$route.query.carId);

    this.getShopData();
  },
  data() {
    return {
      shopId: "",
      tableData: [
        {
          num: 1,
          goodsPrice: 0,
          totalPrice: 0,
        },
      ],
      textarea: "",
      totalNum: 0,
      ZtotalPrice: 0,
    };
  },
  methods: {
    //   得到商品信息和数量之后，再次请求数据
    getShopData() {
      getCarList(this.$route.query.carId).then((res) => {
        console.log(res);
        if (res.code != "200") {
          this.$message.error("获取商品信息失败！");
          return;
        }

        // 处理数据（价格）
        this.tableData = res.data;
        this.totalNum = 0;
        this.ZtotalPrice = 0;
        for (let item of this.tableData) {
          item.totalPrice = item.number * item.goodsPrice;
          this.totalNum += item.number;
          this.ZtotalPrice += item.totalPrice;
        }
      });
    },
    // 数量变化
    handleChange() {
      this.totalNum = 0;
      this.ZtotalPrice = 0;
      for (let item of this.tableData) {
        item.totalPrice = item.number * item.goodsPrice;
        this.totalNum += item.number;
        this.ZtotalPrice += item.totalPrice;
      }
    },

    // 提交订单
    submitClick() {
      let carIds = [];
      let num = [];
      for (let item of this.tableData) {
        carIds.push(item.carId);
        num.push(item.number);
      }

      console.log(carIds, num);

      submitCart(carIds.join(), this.textarea, num.join()).then((res) => {
        console.log(res);
        if (res.code != "200") {
          this.$message.error("生成订单信息失败！");
          return;
        }

        const code = res.data.parentOrderId;
        const createDate = res.data.createDate;
        this.$router.push({
          path: "/backhome/companycenter/pay",
          query: {
            code,
            createDate,
          },
        });
      });
    },

    // 返回购物车
    returnGWC() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../../assets/css/Belement.css";

.submitShopInfo {
  .title {
    height: 21px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 21px;
    color: #333333;
    text-align: left;
    margin: 20px 0;
  }
  .hr {
    width: 100%;
    height: 0;
    border: 1px solid #e3e3e3;
  }

  .trueShowInfo {
    .img {
      // width: 150px;
      height: 100px;
      text-align: center;
      img {
        height: 100%;
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

  .submitBtn {
    width: 130px;
    height: 44px;
    background: #256bff;
    border-radius: 4px;
    line-height: 44px;
    text-align: center;
    color: white;
    float: right;
    margin: 20px 50px 0 0;
    cursor: pointer;
  }
  .returnBtn {
    background-color: white;
    border: 1px solid #256bff;
    color: #256bff;
  }
}
/deep/.el-table__header,/deep/.el-table__body,/deep/.el-table__footer{
   width: 100%;
   table-layout: fixed !important;
}
</style>

 