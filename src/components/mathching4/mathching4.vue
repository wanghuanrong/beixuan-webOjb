<template>
<!-- 智能推送模块， -->
  <div class="mathching4">
    <div class="InfoMain">
      <div class="twoPP">二级匹配</div>
      <div class="main">
        <!-- 模块一：输入框 -->
        <div class="inputTextBox" v-if="inputGroup[0].length != 0">
          <div
            class="flexThreeBox"
            v-for="(item, index) in this.inputGroup[0]"
            :key="index + '0'"
          >
            <span class="ts"
              >{{ item.head }}{{ item.title }}{{ item.subTitle }}:</span
            >
            <!-- <el-input v-model="item.fillValue" style="width: 200px"></el-input
            ><span> {{ item.unit }}</span> -->
          </div>
        </div>

        <!-- 模块二:区间输入框 -->
        <div class="inputTextBox" v-if="inputGroup[1].length != 0">
          <div
            class="flexThreeBox"
            v-for="(item, index) in this.inputGroup[1]"
            :key="index + '1'"
          >
            <span class="ts"
              >{{ item.head }}{{ item.title }}{{ item.subTitle }}:</span
            ><el-input v-model="item.fillValue" style="width: 200px"></el-input>
            <span> {{ item.unit }}</span>
          </div>
        </div>
        <!-- 模块三：单选框 -->
        <div class="checkBigBox" v-if="inputGroup[2].length != 0">
          <div
            class="radioBox"
            v-for="(item, index) in this.inputGroup[2]"
            :key="index + '2'"
          >
            <span class="ts"
              >{{ item.head }}{{ item.title }}{{ item.subTitle }}(单选):</span
            >
            <div class="gouItem">
              <el-radio
                v-model="item.fillValue"
                :label="item2"
                v-for="(item2, index2) in item.options1"
                :key="index2 + 'radioItem'"
              ></el-radio>
            </div>
          </div>
        </div>
        <!-- 模块四:多选框 -->
        <div class="checkBigBox" v-if="inputGroup[3].length != 0">
          <div
            class="checkBox"
            v-for="(item, index) in this.inputGroup[3]"
            :key="index + '3'"
          >
            <span class="ts"
              >{{ item.head }}{{ item.title }}{{ item.subTitle }}(多选):</span
            >
            <div class="checkItem">
              <el-checkbox-group v-model="item.fillValue">
                <el-checkbox
                  v-for="(item2, index2) in item.options1"
                  :key="index2 + 'checkitem'"
                  :label="item2"
                ></el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>

        <!-- 模块五：勾选框 -->
        <div class="checkBigBox" v-if="inputGroup[4].length != 0">
          <div
            class="gouBox"
            v-for="(item, index) in this.inputGroup[4]"
            :key="index + '4'"
          >
            <span class="ts"
              >{{ item.head }}{{ item.title }}{{ item.subTitle }}(勾选):</span
            >
            <div class="gouItem">
              <el-checkbox v-model="item.fillValue">是</el-checkbox>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="InfoMain">
      <div class="twoPP">三级匹配</div>
      <div class="main">
        <!-- 模块一：输入框 -->
        <div class="inputTextBox" v-if="inputGroup1[0].length != 0">
          <div
            class="flexThreeBox"
            v-for="(item, index) in this.inputGroup1[0]"
            :key="index + '0'"
          >
            <span class="ts"
              >{{ item.head }}{{ item.title }}{{ item.subTitle }}:</span
            ><el-input v-model="item.fillValue" style="width: 200px"></el-input
            ><span> {{ item.unit }}</span>
          </div>
        </div>

        <!-- 模块二:区间输入框 -->
        <div class="inputTextBox" v-if="inputGroup1[1].length != 0">
          <div
            class="flexThreeBox"
            v-for="(item, index) in this.inputGroup1[1]"
            :key="index + '1'"
          >
            <span class="ts"
              >{{ item.head }}{{ item.title }}{{ item.subTitle }}:</span
            ><el-input v-model="item.fillValue" style="width: 200px"></el-input>
            <span> {{ item.unit }}</span>
          </div>
        </div>
        <!-- 模块三：单选框 -->
        <div class="checkBigBox" v-if="inputGroup1[2].length != 0">
          <div
            class="radioBox"
            v-for="(item, index) in this.inputGroup1[2]"
            :key="index + '2'"
          >
            <span class="ts"
              >{{ item.head }}{{ item.title }}{{ item.subTitle }}(单选):</span
            >
            <div class="gouItem">
              <el-radio
                v-model="item.fillValue"
                :label="item2"
                v-for="(item2, index2) in item.options1"
                :key="index2 + 'radioItem'"
              ></el-radio>
            </div>
          </div>
        </div>
        <!-- 模块四:多选框 -->
        <div class="checkBigBox" v-if="inputGroup1[3].length != 0">
          <div
            class="checkBox"
            v-for="(item, index) in this.inputGroup1[3]"
            :key="index + '3'"
          >
            <span class="ts"
              >{{ item.head }}{{ item.title }}{{ item.subTitle }}(多选):</span
            >
            <div class="checkItem">
              <el-checkbox-group v-model="item.fillValue">
                <el-checkbox
                  v-for="(item2, index2) in item.options1"
                  :key="index2 + 'checkitem'"
                  :label="item2"
                ></el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>

        <!-- 模块五：勾选框 -->
        <div class="checkBigBox" v-if="inputGroup1[4].length != 0">
          <div
            class="gouBox"
            v-for="(item, index) in this.inputGroup1[4]"
            :key="index + '4'"
          >
            <span class="ts"
              >{{ item.head }}{{ item.title }}{{ item.subTitle }}(勾选):</span
            >
            <div class="gouItem">
              <el-checkbox v-model="item.fillValue">是</el-checkbox>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="btns">
      <el-button
        type="primary"
        @click="addForm"
        v-loading.fullscreen.lock="fullscreenLoading"
        >提交</el-button
      >
    </div>
  </div>
</template>

<script>
import { nextStep, lastStep, generate, batchList } from "@/utils/match.js";
import {
  // 匹配记录（两个）
  twoPPrecording,
} from "@/utils/aipush.js";
export default {
  created() {
    this.renderInput();
  },
  mounted() {},
  props: {
    templatelist: {
      type: Array,
    },
    mattersId:{
        type: Number
    }
  },
  data() {
    return {
      tempArr: [],
      tempArr1: [],
      inputGroup: [],
      inputGroup1: [],

      // 加载
      fullscreenLoading: false,
    };
  },
  methods: {
    addForm() {
      // 处理数据，并提交
        let subArr = [];
        // 二级匹配提取数据
        for (let item of this.inputGroup) {
          if (item.length != 0) {
            for (let item2 of item) {
              // 深克隆
              subArr.push(JSON.parse(JSON.stringify(item2)));
            }
          }
        }

        // 三级匹配提取数据
        for (let item of this.inputGroup1) {
          if (item.length != 0) {
            for (let item2 of item) {
              // 深克隆
              subArr.push(JSON.parse(JSON.stringify(item2)));
            }
          }
        }

        // 处理数据
        for (let item3 of subArr) {
          if (item3.fillValue instanceof Array) {
            item3.fillValue = item3.fillValue.join("|");
          } 

          if(item3.type == '2' || item3.type == '4'){
            if (item3.fillValue) {
              item3.fillValue = "Y";
            } else {
              item3.fillValue = "N";
            }
          }
          
          if(item3.type == '0' || item3.type == '1'){
            if (item3.fillValue == null || item3.fillValue == "") {
              item3.fillValue = 0;
            } 
          }
        }

        console.log(subArr);

        // 提交
        twoPPrecording(this.mattersId, subArr).then((res) => {
            console.log(res);
            if(res.code != 200){
                this.$message.error(res.msg);
                return;
            }

            this.$message.success(res.msg);
            this.$emit("twoppSuccess");
        })

    },
    // 渲染input函数
    renderInput() {
      if (!this.templatelist) {
        return;
      }
      console.log(this.templatelist);
      this.inputGroup = [];
      this.inputGroup1 = [];
      for (let i = 0; i < 5; i++) {
        this.inputGroup.push([]);
        this.inputGroup1.push([]);
      }

      for (let item of this.templatelist) {
        if (item.level == 2) {
          if (item.type == 0) {
            this.inputGroup[0].push(item);
          } else if (item.type == 1) {
            this.inputGroup[1].push(item);
          } else if (item.type == 2) {
            this.inputGroup[2].push(item);
          } else if (item.type == 3) {
            this.inputGroup[3].push(item);
          } else if (item.type == 4) {
            this.inputGroup[4].push(item);
          }
        } else if (item.level == 3) {
          if (item.type == 0) {
            this.inputGroup1[0].push(item);
          } else if (item.type == 1) {
            this.inputGroup1[1].push(item);
          } else if (item.type == 2) {
            this.inputGroup1[2].push(item);
          } else if (item.type == 3) {
            this.inputGroup1[3].push(item);
          } else if (item.type == 4) {
            this.inputGroup1[4].push(item);
          }
        }
      }

      // 处理多选框，把字符串分割为数组
      for (let item of this.inputGroup[3]) {
        item.options1 = item.options.split("|");
        item.fillValue = [];
      }
      for (let item of this.inputGroup1[3]) {
        item.options1 = item.options.split("|");
        item.fillValue = [];
      }

      // 处理勾选框，把字符串分割为数组
      for (let item of this.inputGroup[3]) {
        item.options1 = item.options.split("|");
        item.fillValue = [];
      }
      // 处理勾选框，把字符串分割为数组
      for (let item of this.inputGroup1[3]) {
        item.options1 = item.options.split("|");
        item.fillValue = [];
      }

      // 处理单选框，把字符串分割为数组
      for (let item of this.inputGroup[2]) {
        item.options1 = item.options.split("/");
        item.fillValue = null;
      }
      for (let item of this.inputGroup1[2]) {
        item.options1 = item.options.split("/");
        item.fillValue = null;
      }
    },
  },

  watch: {
    // 当父界面数据发生改变，开始渲染
    templatelist() {
      this.renderInput();
    },
  },
};
</script>

<style lang="less" scoped>
.InfoMain {
  min-height: 50px;
}

.twoPP{
    font-weight: 600;
    color: black;
    font-size: 16px;
    line-height: 30px;
}
.content {
  width: 100%;
  .title {
    width: 64px;
    height: 21px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 600;
    line-height: 21px;
    color: #333333;
    margin: 20px 0 20px 30px;
  }
  .gsName {
    height: 80px;
    width: 100%;
    background-color: #ecf2fb;
    .name {
      height: 80px;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      line-height: 80px;
      color: #0453fa;
      margin-left: 30px;
    }
  }
}

.main {
  width: 100%;
  line-height: 30px;
  .inputTextBox {
    overflow: hidden;
    width: 100%;
    .flexThreeBox {
      width: 50%;
      float: left;
      // border: 1px solid red;
      margin-top: 10px;

      .ts {
        display: inline-block;
        width: 200px;
        text-align: right;
        padding-right: 10px;
        font-size: 13px;
      }
    }

    .checkBox {
      width: 100%;
      margin-top: 20px;
      padding-left: 50px;
    }
  }

  .checkBigBox {
    padding: 20px 0 0 50px;
    .ts {
      width: 300px;
      font-size: 13px;
    }
    .gouItem {
      display: inline-block;
      padding-left: 50px;
    }
  }
}

.main {
//   margin-top: 50px;
  .radioBox {
    margin-top: 30px;
    .radioDiv {
      margin: 30px 100px;
    }
  }
}

.el-tag.el-tag--success {
  height: 25px;
  line-height: 25px;
  border: 1px solid #69b546;
}

.conditionBox {
  position: relative;
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  .el-select {
    margin-right: 10px;
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
}

.btns {
  height: 100px;
  // width: 100%;
  margin: 0 auto;
  margin-left: 45%;
}
</style>