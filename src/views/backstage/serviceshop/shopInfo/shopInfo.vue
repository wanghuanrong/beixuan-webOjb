<template>
  <div class="shopInfo">
    <div class="top">
      <div class="left">
        <el-card class="el-card"  ref="shopInfo">
          <div class="main">
            <div class="img">
              <div class="imgBox">
                <img :src="$http + reco.goodsImage" alt="" />
              </div>
            </div>
            <div class="content">
              <div class="title">{{ reco.goodsName }}</div>
              <div class="smallTitle">{{ reco.goodsSynopsis }}</div>
              <div class="price">
                <div>价格</div>
                <div>￥{{ reco.goodsPrice }}</div>
                <div>销量:{{reco.goodsSales}}</div>
              </div>
              <div class="num">
                数量：
                <el-input-number
                  v-model="num"
                  @change="handleChange"
                  :min="1"
                  :max="10"
                  size="small"
                  label="描述文字"
                  style="margin: 0 5px"
                ></el-input-number>
                件
              </div>
              <div class="twoBtn">
                <div @click="addShopCard">加入购物车</div>
                <div @click="buyClick">立即购买</div>
              </div>
            </div>
          </div>

          <div class="hr"></div>

          <div class="foot">
            <ul>
              <li v-for="(item, index) in TSList" :key="index">
                <img :src="require('@/assets/shop/bz.png')" alt="" />
                {{ item }}
              </li>
            </ul>
          </div>
        </el-card>
      </div>

      <div class="right">
        <el-card>
          <div v-html="reco.goodsContent"></div>
        </el-card>
      </div>
    </div>

    <!-- 推荐信息 -->
    <div class="bottom">
      <shop-show-off
        :classifyId="queryInfo.classifyId"
        :goodId="queryInfo.goodId"
        classname="本店推荐"
      ></shop-show-off>
    </div>
  </div>
</template>

<script>
import { details } from "@/utils/backstageShop";
import { addShopCart } from "@/utils/QYcenter";

import shopShowOff from "@/components/shopShowOff/shopShowOff";
export default {
  created() {
    this.queryInfo.classifyId = this.$route.query.classifyId;
    this.queryInfo.goodId = this.$route.query.goodsId;

    this.detailsRequest();
    
  },
  components: {
    shopShowOff,
  },
  data() {
    return {
      queryInfo: {
        classifyId: "",
        goodId: "",
        pageNum: 1,
        pageSize: 3,
      },
      reco: {},
      num: 1,
      TSList: ["证书包邮", "48小时内响应", "提供发票", "按时支付"],
    };
  },
  mounted () {
    this.$emit('srcoll');
    
    // window.addEventListener('scroll', function(){
    //   console.log(this.$refs.shopInfo.scrollTop);
    // })
  },
  methods: {
    detailsRequest() {
      // 获取商品详细信息
      details(this.queryInfo.goodId).then((res) => {
        console.log(res);
        if (res.code != 200) {
          this.$message.error("请求详情数据失败！");
          return;
        }
      
        this.reco = res.data;
      });
    },
    handleChange(value) {
      // console.log(value);
    },
    buyClick() {
      const shopGoodid = this.reco.goodsId;
      const num = this.num;
      this.$router.push({
        path: "/backhome/serviceshop/submitShopInfo",
        query:{
          shopGoodid, num
        }
      });
    },
    // 加入购物车
    addShopCard(){
      addShopCart(this.reco.goodsId, this.num).then((res) => {
        console.log(res);
        if(res.code != 200){
          this.$message.error("添加购物车失败！");
          return;
        }

        this.$message.success("添加购物车成功！");
      })
    }
  },
  watch: {
    $route(to, from) {
      location.reload();
    },
  },
};
</script>

<style lang="less" scoped>
.shopInfo {
  width: 100%;
  // overflow: visible;
  .top {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    // 左边
    .left {
      flex: 6;
      height: 470px;
      margin-right: 20px;
      .main {
        width: 100%;
        display: flex;
        // 图片
        .img {
          flex: 1;
          // align-items: center;
          .imgBox {
            height: 280px;
            margin: 50px auto 0;
            img {
              height: 100%;
            }
          }
        }

        // 详情
        .content {
          width: 250px;
          height: 350px;
          // border: 1px solid red;
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

          .smallTitle {
            height: 16px;
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            line-height: 16px;
            color: #666666;
            text-align: left;
            margin: 20px 0;
          }

          .price {
            width: 234px;
            height: 37px;
            background: rgba(255, 230, 196, 0.54);
            opacity: 1;
            display: flex;
            margin: 20px 0;
            div:nth-child(1) {
              flex: 3;
              font-size: 12px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              line-height: 37px;
              color: #333333;
            }
            div:nth-child(2) {
              flex: 4;
              font-size: 18px;
              font-family: Arial;
              font-weight: bold;
              line-height: 37px;
              color: #fb6d6d;
            }
            div:nth-child(3) {
              flex: 4;
              font-size: 11px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              line-height: 37px;
              color: #999999;
            }
          }

          .num {
            height: 80px;
            line-height: 80px;
            font-size: 12px;
            text-align: left;
          }

          .twoBtn {
            display: flex;
            margin: 50px 0 0 0;
            div:nth-child(1) {
              width: 115px;
              height: 30px;
              background: #fef1de;
              opacity: 1;
              border-radius: 4px;
              font-size: 14px;
              line-height: 30px;
              color: #f7900a;
              cursor: pointer;
            }
            div:nth-child(2) {
              width: 78px;
              height: 30px;
              background: #f59b23;
              border-radius: 4px;
              font-size: 14px;
              line-height: 30px;
              color: white;
              margin-left: 10px;
              cursor: pointer;
            }
          }
        }
      }

      .hr {
        width: 100%;
        height: 0;
        border: 1px solid #e3e3e3;
      }

      .foot {
        li {
          list-style: none;
          float: left;
          margin-left: 30px;
          line-height: 100px;
          display: flex;
          align-items: center;
          img {
            margin-right: 5px;
          }
        }
      }
    }
    // 右边描述
    .right {
      flex: 4;
      height: 470px;
      // .el-card__body{
      //   line-height: 30px;
      //   text-align: left;
      // }
      text-align: left;
      line-height: 30px;
    }
  }

  .bottom {
    height: 400px;
    margin-top: 20px;
  }

  .el-card {
    height: 100%;
  }
}

.el-main {
  color: #333;
  text-align: left;
  line-height: 30px !important;
  padding: 0;
}
</style>