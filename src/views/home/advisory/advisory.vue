<template>
  <div class="advisory">
    <!-- 模块一 -->
    <div class="model_1">
      <div class="content">
        <div class="title1">news information 新闻资讯</div>
        <div class="title2">聚焦企业资讯、跟踪行业动态</div>
      </div>
    </div>

    <!-- 模块二 -->
    <div class="model_2">
      <div class="title">资讯</div>
      <div class="content" v-if="threeNew[0]">
        <!-- 大新闻 -->
        <div
          class="left"
          v-if="firstNew[0]"
          @click="detailsNew(firstNew[0].newsId)"
        >
          <div class="time">
            <div class="titleNum">{{ firstNew[0].createTime | getDateYd }}</div>
            <div class="jt">&gt;&gt;</div>
          </div>
          <div class="bigTitle">{{ firstNew[0].title | stringNum }}</div>
          <div class="smallTitle" v-text="firstNew[0].context_cl"></div>
          <div class="img">
            <img :src="$http + firstNew[0].image" alt="" />
          </div>
        </div>
        <!-- 三个小新闻 -->
        <div class="right">
          <div
            class="cardItem"
            v-for="(item, index) in threeNew"
            :key="index"
            @click="detailsNew(item.newsId)"
          >
            <el-card>
              <div class="cardBox">
                <div class="hang1">
                  <div class="bigTitle">
                    <ul>
                      <li>
                        <span class="dian">. </span>
                        <span class="titlemain">{{ item.title }}</span>
                      </li>
                    </ul>
                  </div>
                  <div class="time">{{ item.createTime | getDateYd }}</div>
                </div>
                <div class="hang2">
                  <div class="smallTitle">
                    {{ item.context_cl | stringNum }}
                  </div>
                  <div class="jt">&gt;&gt;</div>
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </div>

      <div class="content2" v-if="!threeNew[0]">
        <div class="content2Main" v-if="firstNew[0]" @click="detailsNew(firstNew[0].newsId)">
          <div class="time">
            <div class="titleNum">{{ firstNew[0].createTime | getDateYd }}</div>
            <div class="jt">&gt;&gt;</div>
          </div>
          <div class="bigTitle">{{ firstNew[0].title | stringNum }}</div>
          <div class="smallTitle">
            <div class="img">
              <img :src="$http + firstNew[0].image" alt="" />
            </div>
            <div class="smallContent" v-text="firstNew[0].context_cl"></div>
          </div>
        </div>
      </div>

      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="page.pageNum"
          :page-size="page.pageSize"
          layout="prev, pager, next, jumper"
          :total="page.total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getNewsList } from "@/utils/register";
export default {
  created() {
    this.getNew();
  },
  data() {
    return {
      page: {
        pageSize: 4,
        pageNum: 1,
        total: 4,
      },
      firstNew: [],
      threeNew: [],
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条666`);
      this.page.pageNum = val;
      this.getNew(this.page.pageNum, this.page.pageSize);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.pageNum = val;
      this.getNew(this.page.pageNum, this.page.pageSize);
    },
    getNew() {
      getNewsList(this.page.pageNum, this.page.pageSize).then((res) => {
        console.log(res);
        this.page.total = res.total;

        if (res.data.length == 0) {
          return;
        }

        // 过滤内容中的标签
        for (let item of res.data) {
          item.context_cl = item.context
            .replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, "")
            .replace(/<[^>]+?>/g, "")
            .replace(/\s+/g, " ")
            .replace(/ /g, " ")
            .replace(/>/g, " ")
            .replace("&nbsp;", "");
        }

        // 清空,分类
        this.firstNew = [];
        this.threeNew = [];

        this.firstNew.push(res.data[0]);

        // for (let i = 0; i < 3; i++) {
        //   this.threeNew.push(res.data[0]);
        // }

        for (let i = 1; i < res.data.length; i++) {
          if (res.data[i]) {
            this.threeNew.push(res.data[i]);
          }
        }
      });
    },
    // 跳转详情页
    detailsNew(newsId) {
      this.$router.push({
        path: "/home/detailsnew",
        query: {
          newsId,
        },
      });
    },
  },
  filters: {
    getDateYd(val) {
      let getDate = new Date(val);

      let mm =
        getDate.getMonth() + 1 > 10
          ? getDate.getMonth() + 1
          : "0" + (getDate.getMonth() + 1);
      let day =
        getDate.getDate() > 10 ? getDate.getDate() : "0" + getDate.getDate();
      return mm + "-" + day;
    },
    stringNum(val) {
      console.log(val);
      if (val.length > 36) {
        let subNum = val.substr(0, 36);
        return subNum + "...";
      }else{
        return val;
      }
    },
  },
};
</script>

<style lang="less" scoped>
// 模块一
.model_1 {
  width: 100%;
  height: 600px;
  background-image: url("../../../assets/index/banner.png");
  background-size: 100% 100%;
  overflow: hidden;
  .content {
    width: 1200px;
    margin: 250px auto 0;
    .title1 {
      height: 72px;
      font-size: 45px;
      font-family: Bookman Old Style;
      font-weight: 400;
      color: #333333;
    }
    .title2 {
      font-size: 25px;
      line-height: 90px;
      font-family: Source Han Sans CN;
      color: #333333;
    }
  }
}

// 模块二
.model_2 {
  width: 100%;
  height: 850px;
  .title {
    font-size: 35px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #333333;
    margin: 80px;
    text-align: center;
  }
  .content {
    width: 1100px;
    height: 600px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    .left {
      width: 0;
      flex: 1;
      margin-right: 30px;
      background-color: #f8f9fb;
      padding: 35px;
      cursor: pointer;
      .time {
        font-size: 18px;
        font-family: Source Han Sans CN;
        color: #999999;
        width: 100%;
        height: 35px;
        line-height: 35px;
        display: flex;
        justify-content: space-between;
        .timeNum {
          flex: 1;
        }
        .jt {
          width: 30px;
        }
      }

      .bigTitle {
        font-size: 20px;
        font-family: Source Han Sans CN;
        font-weight: 600;
        line-height: 35px;
        height: 70px;
        overflow: hidden;
        color: #000000;
        margin-top: 20px;
      }

      .smallTitle {
        width: 100%;
        height: 80px;
        font-size: 15px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 20px;
        margin-top: 20px;
        color: #666666;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
      }

      .img {
        margin-top: 30px;
        width: 100%;
        height: 280px;
        text-align: center;
        overflow: hidden;
        img {
          width: 100%;
        }
      }

      &:hover {
        .time .jt {
          color: #256bff;
        }
        .bigTitle {
          color: #256bff;
        }
      }
    }

    .right {
      width: 0;
      flex: 1;
      .cardItem {
        margin-bottom: 30px;
        cursor: pointer;

        .cardBox {
          width: 100%;
          height: 138px;
          padding: 10px;
          overflow: hidden;

          .hang1 {
            width: 100%;
            height: 30px;
            line-height: 30px;
            display: flex;
            .bigTitle {
              flex: 1;
              overflow: hidden;
              font-size: 18px;
              font-family: Source Han Sans CN;
              font-weight: 400;
              height: 30px;
              line-height: 30px;
              color: #333333;
              white-space: nowrap;

              ul {
                width: 100%;
                .dian {
                  font-size: 40px;
                  line-height: 0px;
                  margin-bottom: 5px;
                  display: inline-block;
                }
              }
              li {
                height: 30px;
                list-style: disc;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                position: relative;
              }
            }
            .time {
              width: 100px;
              text-align: right;
              font-size: 18px;
              font-family: Source Han Sans CN;
              color: #999999;
            }
          }

          .hang2 {
            width: 100%;
            height: 60px;
            line-height: 30px;
            margin-top: 30px;
            display: flex;
            .smallTitle {
              flex: 1;
              font-size: 15px;
              font-family: Source Han Sans CN;
              color: #999999;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .jt {
              width: 80px;
              text-align: right;
              line-height: 60px;
              color: #999999;
            }
          }
        }

        // 鼠标进入
        &:hover {
          .hang1 .bigTitle {
            color: #256bff;
          }
          .hang2 .jt {
            color: #256bff;
          }
          .el-card.is-always-shadow {
            box-shadow: 0px 3px 10px rgba(37, 107, 255, 0.18);
          }
        }
      }
    }
  }

  .content2 {
    width: 100%;
    height: 500px;
    background-color: #f8f9fb;
    
    .content2Main {
      width: 1100px;
      height: 100%;
      margin: auto;
      cursor: pointer;
      .time {
        font-size: 24px;
        height: 80px;
        line-height: 80px;
        font-family: Source Han Sans CN;
        color: #999999;
        display: flex;
        justify-content: space-between;
      }
      .bigTitle {
        height: 52px;
        font-size: 22px;
        font-family: Source Han Sans CN;
        font-weight: 600;
        line-height: 52px;
        color: #000000;
        margin: 0 0 30px 0;
      }
      .smallTitle {
        display: flex;
        .img {
          width: 500px;
          height: 300px;
          overflow: hidden;
          img {
            width: 100%;
            // height: 100%;
          }
        }
        .smallContent {
          flex: 1;
          height: 200px;
          margin-left: 50px;
          overflow: hidden;
          line-height: 50px;
          color: #666666;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
        }
      }

      &:hover {
        .time {
          color: #256bff;
        }
        .bigTitle {
          color: #256bff;
        }
      }
    }
  }
}

.page {
  margin-top: 50px;
  text-align: center;
}
</style>