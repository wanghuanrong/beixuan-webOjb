<template>
  <div class="pubilclecture">
    <div class="title">政策宣讲会列表</div>
    <div class="bnnerBox"   v-if="List.length != 0">
      <el-carousel indicator-position="outside" arrow="never" height="400px">
        <el-carousel-item v-for="(item, index) in bnnerImg" :key="index">
          <img :src="$http + item.backgroundImage" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="fkList"  v-if="List.length != 0">
      <div
        class="ListBox"
        v-for="(item, index) in List"
        :key="index"
        @click.stop="detailsClick(item)"
      >
        <el-card>
          <!-- 图片 -->
          <div
            class="image"
            v-lazy:background-image="$http + item.coverImage"
          ></div>
          <!-- 内容 -->
          <div class="content">
            <!-- 标题 -->
            <div class="title">{{ item.title }}</div>
            <!-- 文章 -->
            <div class="article" v-html="item.context"></div>
            <!-- 底部 -->
            <div class="foot">
              <!-- 时间 -->
              <div class="time">{{ item.beginDate }}</div>
              <!-- 按钮 -->
              <div
                :class="{ btn: item.status == '0', btn2: item.status == '1' }"
                @click.stop="item.status != 0 && reservation(item.url)"
              >
                {{ item.status == 0 ? "时间已截止" : "立即预约" }}
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
     <!-- v-if="List.length == 0" -->

    <no-content v-if="List.length == 0"></no-content>
  </div>
</template>

<script>
import noContent from '@/components/noContent/noContent.vue';
import { lecturebBnner, lecturebList } from "@/utils/total";
export default {
  name: "pubilclecture",
  created() {
    this.lecturebBnnerFun();
    this.lecturebListFun();
  },
  data() {
    return {
      bnnerImg: [],
      List: [],
    };
  },
  methods: {
    lecturebBnnerFun() {
      lecturebBnner().then((res) => {
        console.log(res);
        if (res.code != "200") {
          this.$message.error("请求轮播图数据失败！");
          return;
        }

        this.bnnerImg = res.data;
      });
    },
    lecturebListFun() {
      lecturebList().then((res) => {
        console.log(res);
        if (res.code != "200") {
          this.$message.error("请求列表数据失败！");
          return;
        }

        this.List = res.rows;
      });
    },
    reservation(url) {
      if (url.indexOf("http") == -1) {
        window.open("https://" + url, "_blank");
      } else {
        window.open(url, "_blank");
      }
    },
    detailsClick(item) {
      this.$store.commit("getxjfData", item);
      this.$router.push("/backhome/policymanage/details");
    },
  },
  components: {
    noContent
  }
};
</script>

<style lang="less" scoped>
@import url("../../../../assets/css/Belement.css");
.pubilclecture {
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 21px;
    color: #333333;
    text-align: center;
  }
  .bnnerBox {
    img {
      width: 100%;
    }
  }

  .fkList {
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    .ListBox {
      width: 48%;
      // flex: 1;
      margin-left: 1%;
      margin-top: 10px;
      cursor: pointer;

      .image {
        width: 30%;
        height: 150px;
        border-radius: 3px;
        background-size: 100% 100%;
        float: left;
      }

      .content {
        width: 65%;
        height: 150px;
        float: right;

        .title {
          width: 100%;
          height: 20px;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          line-height: 20px;
          color: #333333;
          overflow: hidden;
          // white-space: nowrap;
          text-overflow: ellipsis;
          text-align: left;
        }

        .article {
          width: 100%;
          height: 60px;
          line-height: 20px;
          color: #666666;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          margin-top: 10px;
          font-size: 13px;
        }
        .foot {
          margin-top: 30px;
          width: 100%;
          height: 30px;
          line-height: 30px;

          .time {
            float: left;
            width: 145px;
            height: 30px;
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            line-height: 30px;
            color: #999999;
          }

          .btn {
            float: right;
            width: 67px;
            height: 22px;
            background: #fb6d6d;
            opacity: 1;
            border-radius: 2px;
            line-height: 22px;
            margin-top: 6px;
            text-align: center;
            color: white;
            font-size: 12px;
            cursor: pointer;
          }
          .btn2 {
            float: right;
            width: 67px;
            height: 22px;
            background: #2edce9;
            opacity: 1;
            border-radius: 2px;
            line-height: 22px;
            margin-top: 6px;
            text-align: center;
            color: white;
            font-size: 12px;
            cursor: pointer;
          }
        }
      }
    }
  }
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>