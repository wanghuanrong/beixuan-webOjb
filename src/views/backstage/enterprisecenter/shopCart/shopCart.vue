<template>
  <div class="shopCart">
    <el-card>
      <div class="head">
        <div class="title">全部商品</div>
      </div>

      <div class="tableBox">
        <!-- 表头 -->
        <div class="tableHead">
          <div><span>购买服务项目信息</span></div>
          <div>实付款</div>
          <div>数量</div>
          <div>操作</div>
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

        <div class="mainNo" v-if="shopList.length == 0"></div>

        <el-checkbox-group v-model="checkShopIndex" v-else>
          <!-- 表主体 -->
          <div class="tableCentent">
            <!-- 又来遍历的item -->
            <div
              class="tableItem"
              v-for="(item, index) in shopList"
              :key="index"
            >
              <div class="colMain">
                <!-- 多选框 -->
                <div class="checkbox">
                  <el-checkbox :label="item.carId"></el-checkbox>
                </div>
                <!-- 照片 -->
                <div class="img">
                  <div class="imgaeBox">
                    <img v-lazy="$http + item.goodsImage" alt="" />
                  </div>
                </div>
                <!-- 名称 -->
                <div class="name">{{ item.goodsName }}</div>
              </div>

              <!-- 价格 -->
              <div class="price">￥{{ item.goodsPrice }}</div>
              <!-- 数量 -->
              <div class="num">
                <el-input-number
                  :min="1"
                  :max="10"
                  size="small"
                  @change="handleChange(item.carId, item.number)"
                  v-model="item.number"
                ></el-input-number>
              </div>
              <!-- 操作 -->
              <div class="caozuo">
                <div class="delete" @click="oneDelete(item.carId)"></div>
                <div class="payBtn" @click="payShop(item.carId)">立即购买</div>
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

    <div class="foot">
      <div class="HJBtn" @click="HJBtnClick">结 算</div>
      <div class="totalPrice">
        合计：<span class="Price">￥ {{ checkTotal }}</span>
      </div>
      <div class="shopNum">
        已选商品 <span class="num"> {{ checkNum }} </span> 件
      </div>
    </div>
  </div>
</template>

<script>
import { GWCshopList, GWCupdateNum, GWCdelete } from "@/utils/QYcenter";
export default {
  created() {
    this.getShopListData();
  },
  data() {
    return {
      // 全选
      allchecked: false,
      // 商品列表
      shopList: [],
      // 多选框，选中的商品carId
      checkShopIndex: [],
      // 选中的商品信息
      checkShopArr: [],
      // 合计
      checkTotal: 0,
      // 选中数量
      checkNum: 0,
      pageObj: {
        pageNum: 1,
        pageSize: 4,
        total: 30,
      },
    };
  },
  methods: {
    getShopListData() {
      GWCshopList(this.pageObj.pageNum, this.pageObj.pageSize).then((res) => {
        console.log(res);
        if (res.code != 200) {
          this.$message.error("获取购物车列表信息失败！");
          return;
        }

        for (let item of res.rows) {
          item.check = false;
        }

        this.shopList = res.rows;
        this.pageObj.total = res.total;
      });
    },
    // 删除选中
    deleteCheck() {
      if(this.checkShopIndex.length == 0){
        this.$message.error("请选择商品！");
        return;
      }
      GWCdelete(this.checkShopIndex.join()).then((res) => {
        console.log(res);
        if (res.code != 200) {
          this.$message.error("删除记录失败！");
          return;
        }
        this.$message.success("删除记录成功！");
        this.getShopListData();
        this.checkShopIndex = [];
        this.allchecked = false;
      });
    },
    // 单个删除
    oneDelete(carId) {
      let carIdArr = [];
      carIdArr.push(carId);
      GWCdelete(carIdArr.join()).then((res) => {
        console.log(res);
        if (res.code != 200) {
          this.$message.error("删除记录失败！");
          return;
        }
        this.$message.success("删除记录成功！");
        this.getShopListData();
        this.checkShopIndex = [];
      });
    },
    handleSizeChange(val) {
      this.pageObj.pageNum = val;
      this.getShopListData();
      // 取消全选
      this.allchecked = false;
      this.checkShopIndex = [];
    },
    handleCurrentChange(val) {
      this.pageObj.pageNum = val;
      this.getShopListData();
      // 取消全选
      this.allchecked = false;
      this.checkShopIndex = [];
    },
    // 全选按钮
    allcheckedChnage() {
      this.allchecked = !this.allchecked;
      for (let item of this.shopList) {
        item.check = this.allchecked;
      }

      this.checkShopIndex = [];

      for (let i = 0; i < this.shopList.length; i++) {
        // console.log(this.shopList[i].check);
        if (this.shopList[i].check == true) {
          this.checkShopIndex.push(this.shopList[i].carId);
        }
      }

      // 遍历数组，如果是true这拼接，否则删除
      // for (let i = 0; i < this.shopList.length; i++) {
      //   if (this.shopList[i].check == true) {
      //     // 在拼接之前，需要先判断是否有相同的，如果有先删除
      //     for (let z = 0; z < this.checkShopIndex.length; z++) {
      //       if (this.checkShopIndex[z] == this.shopList[i].carId) {
      //         this.checkShopIndex.splice(z, 1);
      //       }
      //     }
      //     this.checkShopIndex.push(this.shopList[i].carId);
      //   }
      //   if (this.shopList[i].check == false) {
      //     for (let j = 0; j < this.checkShopIndex.length; j++) {
      //       if (this.checkShopIndex[j] == this.shopList[i].carId) {
      //         this.checkShopIndex.splice(j, 1);
      //       }
      //     }
      //   }
      // }
    },

    // 计数器数量变化
    handleChange(carId, num) {
      console.log(carId, num);
      GWCupdateNum(carId, num).then((res) => {
        console.log(res);
      });

      this.checkTotal = 0;
      this.checkNum = 0;
      for (let item of this.shopList) {
        if (item.check) {
          this.checkTotal += item.goodsPrice * item.number;
          this.checkNum += item.number;
        }
      }
    },
    // 立即购买
    payShop(carId) {
      // let carIdArr = [];
      // carIdArr.push(carId);
      // let carIdArrString = carIdArr.join();
      this.$router.push({
        path: "/backhome/companycenter/Settlement",
        query: {
          carId,
        },
      });
    },
    // 结算事件
    HJBtnClick() {
      if(this.checkShopIndex.length == 0){
        this.$message.error("未选中商品！");
        return;
      }
      let carId = this.checkShopIndex.join();
      this.$router.push({
        path: "/backhome/companycenter/Settlement",
        query: {
          carId,
        },
      });
    },
  },
  watch: {
    checkShopIndex() {
      // 改变shopList选中状态
      for (let item of this.shopList) {
        item.check = false;
      }

      for (let i = 0; i < this.checkShopIndex.length; i++) {
        for (let j = 0; j < this.shopList.length; j++) {
          if (this.checkShopIndex[i] == this.shopList[j].carId) {
            this.shopList[j].check = true;
          }
        }
      }

      // 算出选中的总价格
      this.checkTotal = 0;
      this.checkNum = 0;
      for (let item of this.shopList) {
        if (item.check) {
          this.checkTotal += item.goodsPrice * item.number;
          this.checkNum += item.number;
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../../../../assets/css/shop.css");
.head {
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom: 2px solid #e3e3e3;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #256bff;
  .title {
    width: 100px;
    height: 50px;
    border-bottom: 2px solid #256bff;
    text-align: center;
  }
}

.tableBox {
  margin-top: 20px;
  height: 550px;
  width: 100%;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
  .tableHead {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #f5f5f5;
    display: flex;
    div:nth-child(1) {
      flex: 4;
      span {
        padding-left: 80px;
      }
    }
    div:nth-child(2) {
      flex: 2;
    }
    div:nth-child(3) {
      flex: 2;
    }
    div:nth-child(4) {
      flex: 2;
    }
  }

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

  .tableCentent {
    width: 100%;
    .tableItem {
      width: 100%;
      height: 100px;
      line-height: 100px;
      margin: 10px 0;
      border: 1px solid #ccc;
      display: flex;
      div:nth-child(1) {
        flex: 4;
        .checkbox {
          margin-left: 30px;
          float: left;
        }
        .img {
          height: 90px;
          width: 150px;
          margin: 5px 30px;
          // border: 1px solid red;
          float: left;
          .imgaeBox {
            margin: auto;
            height: 90px;
            text-align: center;
            img {
              height: 100%;
              max-width: 150px;
            }
          }
        }
        .name {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          float: left;
        }
      }
      div:nth-child(2) {
        flex: 2;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #333333;
      }
      div:nth-child(3) {
        flex: 2;
      }
      div:nth-child(4) {
        flex: 2;
        .delete {
          width: 20px;
          height: 20px;
          background: url("../../../../assets/enter/redSc.png") no-repeat center;
          float: left;
          margin: 40px 0;
          cursor: pointer;
        }
        .payBtn {
          float: left;
          width: 76px;
          height: 30px;
          line-height: 30px;
          color: white;
          text-align: center;
          background: #256bff;
          border-radius: 4px;
          margin: 35px 0 0 30px;
          cursor: pointer;
        }
      }
    }
  }
}

.foot {
  width: 100%;
  height: 60px;
  line-height: 60px;
  div {
    float: right;
  }

  .HJBtn {
    width: 120px;
    height: 60px;
    background-color: #f56c6c;
    color: white;
    line-height: 60px;
    text-align: center;
    cursor: pointer;
  }
  .totalPrice {
    width: 220px;
    .Price {
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #f56c6c;
    }
  }
  .shopNum {
    width: 150px;
    .num {
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #f56c6c;
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

.el-checkbox__label {
  display: none;
}
</style>