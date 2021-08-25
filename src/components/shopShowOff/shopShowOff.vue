<template>
  <div class="shopShowOff">
    <el-card class="box-card">
      <div class="title">
        {{ classname }}
      </div>
      <div class="hr"></div>
      <!-- 小于6个项目 -->
      <div class="content" v-if="total <= 6">
        <div
          v-for="(item, index) in goodListArr"
          :key="index"
          @click="shopItemClick(item.classifyId, item.goodsId)"
        >
          <el-card class="cardBox">
            <div class="img">
              <img :src="$http + item.goodsImage" alt="" />
            </div>
            <div class="title">
              {{ item.goodsName }}
            </div>
            <div class="smallTitle">
              {{ item.goodsSynopsis }}
            </div>
            <div class="price">￥{{ item.goodsPrice }}起</div>
          </el-card>
        </div>
      </div>

      <!-- 大于6个项目，显示分页 -->
      <div class="content" v-else>
        <div
          v-for="(item, index) in goodListArr"
          :key="index"
          @click="shopItemClick(item.classifyId, item.goodsId)"
        >
          <el-card class="cardBox">
            <div class="img">
              <img :src="$http + item.goodsImage" alt="" />
            </div>
            <div class="title">
              {{ item.goodsName }}
            </div>
            <div class="smallTitle">
              {{ item.goodsSynopsis }}
            </div>
            <div class="price">￥{{ item.goodsPrice }}起</div>
          </el-card>
        </div>

        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="queryInfo.pagenum"
            :page-size="queryInfo.pagesize"
            layout="prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>

      <no-content v-if="goodListArr.length == 0"></no-content>
    </el-card>
  </div>
</template>

<script>
import noContent from '@/components/noContent/noContent.vue';
import { goodList, recoList } from "@/utils/backstageShop";
export default {
  name: "shopShowOff",
  props: {
    // 商品列表的模块号码 和 商品的title
    classid: {
      type: Number,
      // default: 1,
    },
    classname: {
      type: String,
      default: "",
    },

    // 推荐信息的（商品详情）商品模块号码 和 商品的id
    classifyId: {
      // type: Number,
      // default: 4,
    },
    goodId: {
      // type: Number,
      // default: 11,
    },
  },
  created() {
    //   页面初始，请求数据

    if (this.classid) {
      this.goodListFun();
      return;
    }

    this.recoListFun();
  },
  data() {
    return {
      goodListArr: [],
      //   政策查询：查询条件、页数、每页显示个数、一共几条
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 6,
      },
      total: 0,
    };
  },
  methods: {
    goodListFun() {
      goodList(
        this.classid,
        this.queryInfo.pagenum,
        this.queryInfo.pagesize
      ).then((res) => {
        // console.log(res);
        if (res.code != 200) {
          this.$message.error("商品请求数据失败！");
          return;
        }

        this.goodListArr = res.rows;
        this.total = res.total;
      });
    },
    shopItemClick(classifyId, goodsId) {
      this.$router.push({
        path: "/backhome/serviceshop/shopinfo",
        query: {
          classifyId,
          goodsId,
        },
      });
    },
    handleSizeChange(val) {
      this.queryInfo.pagenum = val;
      this.goodListFun();
    },
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val;
      this.goodListFun();
    },

    // 商品详情页面 推荐信息 数据请求，参数（该商品的模块号 、 该商品的id）
    recoListFun() {
      // console.log(this.classifyId, this.goodId)
      recoList(this.classifyId, this.goodId, 1, 3).then((res) => {
        if (res.code != 200) {
          this.$message.error("推荐请求数据失败！");
          return;
        }

        this.goodListArr = res.rows;
        this.total = res.total;
      });
    },
  },
  components: {
    noContent
  }
};
</script>

<style lang="less" scoped>
.shopShowOff {
  margin-top: 20px;
  .title {
    height: 21px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 21px;
    color: #333333;
    text-align: left;
  }
  .hr {
    width: 100%;
    height: 0px;
    border: 1px solid #efefef;
    margin: 10px 0;
  }
  .content {
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    > div {
      width: 32%;
      //   flex: 1;
      margin: 10px 1.5% 0 0;
    }
    > div:nth-child(3n) {
      margin-right: 0;
    }
    .cardBox {
      cursor: pointer;
      overflow: hidden;
      .img {
        width: 100%;
        height: 300px;
        img {
          max-width: 100%;
          height: 100%;
        }
      }
      .title {
        height: 21px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        line-height: 21px;
        color: #333333;
        text-align: center;
        margin: 20px 0 10px 0;
      }
      .smallTitle {
        height: 16px;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 16px;
        color: #666666;
        text-align: center;
      }
      .price {
        height: 24px;
        font-size: 18px;
        font-family: Arial;
        font-weight: bold;
        line-height: 21px;
        color: #fb6d6d;
        text-align: center;
        margin: 35px 0 0 0;
      }
    }

    // 分页
    .page {
      width: 100%;
      margin: 50px auto 0;
      height: 40px;
    }
  }
}
</style>