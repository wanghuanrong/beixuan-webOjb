<template>
  <div class="detailsnew">
    <div class="content">
      <div class="title">
        <div class="time">{{ newMain.createTime | getDateYd }}</div>
        <div class="hx"></div>
        <div class="titlemain">
          <div class="bigTitle">{{ newMain.title }}</div>
          <div class="smallTitle"></div>
        </div>
      </div>

      <hr />

      <div class="ql-container ql-snow">
        <div class="ql-editor">
          <div v-html="newMain.context"></div>
        </div>
      </div>
      <!-- <div class="main" v-html="newMain.context"></div> -->
    </div>
  </div>
</template>

<script>
import { getWebNews } from "@/utils/register";
export default {
  created() {
    this.getDate();
  },
  data() {
    return {
      newMain: "",
    };
  },
  methods: {
    getDate() {
      let newId = this.$route.query.newsId;

      getWebNews(newId).then((res) => {
        console.log(res);

        this.newMain = res.data;
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
      if (val.length > 36) {
        let subNum = val.substr(0, 36);
        return subNum + "...";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  width: 1200px;
  margin: 0 auto 80px;
  padding-top: 130px;
  .title {
    width: 100%;
    display: flex;
    align-items: center;
    .time {
      width: 80px;
      color: #999999;
      font-size: 25px;
    }
    .hx {
      width: 50px;
      height: 0;
      border-top: 3px solid #999999;
      margin: 0 20px;
    }
    .titlemain {
      flex: 1;
      .bigTitle {
        width: 1020px;
        font-size: 25px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #333333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  hr {
    background-color: #cccccc;
    margin: 40px 0;
  }
}

.ql-container.ql-snow{
  border: 1px solid white;
}

.ql-container{
  font-size: 18px;
}
</style>