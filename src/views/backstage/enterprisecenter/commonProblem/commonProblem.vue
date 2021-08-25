<template>
  <div class="commonProblem">
    <div class="leftBox">
      <el-card>
        <div class="modelTitle">常见问题</div>
        <div class="titleList">
          <no-content v-if="title.length == 0"></no-content>
          <ul>
            <li
              v-for="(item, index) in title"
              :key="index"
              @click="titleClick(item.questionId)"
            >
              {{ item.title }}
            </li>
          </ul>
        </div>
      </el-card>
    </div>
    <div class="rightBox">
      <el-card>
        <div class="modelTitle">帮助文档</div>
        <div class="content">
          <no-content v-if="content.length == 0"></no-content>
          <ul>
            <li v-for="(item, index) in content" :key="index">
              <div class="rightTitle">{{ item.title }}</div>
              <div class="rightContent" v-html="item.content"></div>
            </li>
          </ul>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import noContent from '@/components/noContent/noContent.vue';
import { listTitle } from "@/utils/QYcenter";
export default {
  created() {
    listTitle("").then((res) => {
      console.log(res);
      if (res.code != 200) {
        this.$message.error("获取常见问题数据失败！");
        return;
      }

      for (let item of res.data) {
        let titleObj = { questionId: item.questionId, title: item.title };
        this.title.push(titleObj);
      }

      this.content = res.data;
    });
  },
  data() {
    return {
      title: [],
      content: [],
    };
  },
  methods: {
    titleClick(code) {
      console.log(code)
      listTitle(code).then((res) => {
      console.log(res);
      if (res.code != 200) {
        this.$message.error("获取回答数据失败！");
        return;
      }

      // for (let item of res.data) {
      //   let titleObj = { questionId: item.questionId, title: item.title };
      //   this.title.push(titleObj);
      // }
      this.content = [];
      this.content.push(res.data);
    });
    },
  },
  components: {
    noContent
  }
};
</script>

<style lang="less" scoped>
.commonProblem {
  width: 100%;
  height: 100%;
  display: flex;
  .leftBox {
    flex: 1;
    width: 0;
    height: 100%;
    .el-card {
      height: 100%;
      max-height: 800px;
      min-height: 600px;
      // overflow-y: scroll;
      overflow: auto;
    }
    .titleList {
      margin-left: 40px;
      li {
        // height: 40px;
        font-size: 16px;
        line-height: 40px;
        color: #256bff;
        list-style: disc;
        cursor: pointer;
      }
    }
  }
  .rightBox {
    flex: 1;
    width: 0;
    height: 100%;

    .el-card {
      height: 100%;
      max-height: 800px;
      min-height: 600px;
      overflow-y: scroll;
    }
    .content {
      margin-left: 40px;
      li {
        margin: 40px 0;
        .rightTitle {
          // height: 25px;
          font-size: 16px;
          font-weight: bold;
          line-height: 25px;
          color: #333333;
          margin-bottom: 10px;
        }
        .rightContent {
          font-size: 14px;
          word-wrap : break-word ;

        }
      }
    }
  }

  .modelTitle {
    height: 50px;
    font-weight: 600;
    font-size: 16px;
    font-family: Microsoft YaHei;
    line-height: 50px;
    color: #333333;
    margin: 0 0 10px 30px;
  }
}
</style>