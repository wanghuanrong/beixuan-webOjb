<template>
  <div class="knowled">
    <el-card>
      <div class="head">
        <div class="titlebox">
          <div class="img"></div>
          <div class="title">知识产权查询</div>
        </div>
        <div class="inputBox">
          <!-- <el-input
            placeholder="请输入内容"
            v-model="search"
            class="input-with-select"
            style="width: 500px"
          >
            <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
          </el-input> -->
        </div>
        <div class="titlebox"></div>
      </div>
    </el-card>

    <intalle1 :keyNo = "keyNo" v-if="keyNoIs"></intalle1>
    <intalle2 :keyNo = "keyNo" v-if="keyNoIs"></intalle2>
    <intalle3 :keyNo = "keyNo" v-if="keyNoIs"></intalle3>

    <no-content v-if="!keyNoIs"></no-content>
  </div>
</template>

<script>
import intalle1 from "@/components/intelle/intelle1";
import intalle2 from "@/components/intelle/intelle2";
import intalle3 from "@/components/intelle/intelle3";

import noContent from '@/components/noContent/noContent.vue';

import { getBasicDetailsByName } from "@/utils/total";
export default {
  created() {
    // 通过用户信息获取keyNo
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(userInfo);
    if (userInfo.keyNo) {
      this.keyNo = userInfo.keyNo;
    } else {
      // console.log(userInfo.companyName);
      // 没有keyNo，查询keyNo
      getBasicDetailsByName(userInfo.companyName).then((res) => {
        // console.log(res);
        if (res.code != 200) {
          this.$message.error("查询keyNo失败！");
          this.keyNoIs = false;
          return;
        }

        if (res.data.Status) {
          // 提示
          // this.$message.error(res.data.Message);
          this.keyNoIs = false;
          return;
        }

        this.keyNo = res.data.keyNo;
      });
    }
  },
  data() {
    return {
      search: "",
      keyNo: "",
      keyNoIs: true,
    };
  },
  methods: {
    searchClick(){
      getBasicDetailsByName(this.search).then((res) => {
        // console.log(res);
        if (res.code != 200) {
          this.$message.error("查询keyNo失败！");
          this.keyNoIs = false;
          return;
        }

        // console.log(res.data.Status);

        if (res.data.Status) {
          // 提示
          // this.$message.error(res.data.Message);
          this.keyNoIs = false;
          return;
        }
        this.keyNo = "";
        this.keyNo = res.data.keyNo;
      });
    }
  },
  components: {
    intalle1,
    intalle2,
    intalle3,
    noContent
  },
};
</script>

<style lang="less" scoped>
.head {
  width: 100%;
  height: 100px;
  display: flex;
  .titlebox {
    flex: 2;
    padding: 40px 0 0 40px;
    .img {
      width: 25px;
      height: 25px;
      background: #4cabff url("../../../../assets/knowled/cx.png") no-repeat
        center center;
      border-radius: 50%;
      float: left;
    }
    .title {
      float: left;
      margin-left: 10px;
    }
  }

  .inputBox {
    flex: 7;
    padding-top: 30px;
  }
}

.el-button--default {
  background-color: #5689ff !important;
  color: white !important;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border: 1px solid #5689ff;
  border-top: 1px !important;
  border-bottom: 1px !important;
}
</style>