<template>
  <div class="unitInfo">
    <el-card>
      <div class="InfoMain">
        <div class="content">
          <div class="title">单位资料</div>
          <div class="gsName">
            <div class="name">
              {{ companyName }} <el-tag type="success">存续</el-tag>
            </div>
            <!-- <div class="bs"></div> -->
          </div>
        </div>

        <div class="mainNo" v-if="inputListArr.length == 0"></div>

        <div class="main" v-else>
          <!-- 模块一：输入框 -->
          <div class="inputTextBox">
            <div
              class="flexThreeBox"
              v-for="(item, index) in this.inputGroup[0]"
              :key="index + '0'"
            >
              <span class="ts"
                >{{ item.head }}{{ item.title }}{{ item.subTitle }}:</span
              >
              <el-tooltip
                class="item"
                effect="dark"
                :content="item.fillValue"
                placement="bottom"
              >
                <el-input
                  v-model="item.fillValue"
                  style="width: 200px"
                  readonly
                ></el-input>
              </el-tooltip>

              <span> {{ item.unit }}</span>
            </div>
          </div>

          <!-- 模块二:区间输入框 -->
          <div class="inputTextBox">
            <div
              class="flexThreeBox"
              v-for="(item, index) in this.inputGroup[1]"
              :key="index + '1'"
            >
              <span class="ts"
                >{{ item.head }}{{ item.title }}{{ item.subTitle }}:</span
              >
              <el-tooltip
                class="item"
                effect="dark"
                :content="item.fillValue"
                placement="bottom"
              >
                <el-input
                  v-model="item.fillValue"
                  style="width: 200px"
                  :readonly="true"
                ></el-input>
              </el-tooltip>
              <span> {{ item.unit }}</span>
            </div>
          </div>
          <!-- 模块三：单选框 -->
          <div class="checkBigBox">
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
                  :readonly="true"
                ></el-radio>
              </div>
            </div>
          </div>
          <!-- 模块四:多选框 -->
          <div class="checkBigBox">
            <div
              class="checkBox"
              v-for="(item, index) in this.inputGroup[3]"
              :key="index + '3'"
            >
              <span class="ts"
                >{{ item.head }}{{ item.title }}{{ item.subTitle }}(多选):</span
              >
              <div class="checkItem">
                <el-checkbox-group v-model="item.fillValue1">
                  <el-checkbox
                    v-for="(item2, index2) in item.options1"
                    :key="index2 + 'checkitem'"
                    :label="item2"
                    :readonly="true"
                  ></el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>

          <!-- 模块五：勾选框 -->
          <div class="checkBigBox">
            <div
              class="gouBox"
              v-for="(item, index) in this.inputGroup[4]"
              :key="index + '4'"
            >
              <span class="ts"
                >{{ item.head }}{{ item.title }}{{ item.subTitle }}(勾选):</span
              >
              <div class="gouItem">
                <el-radio v-model="item.fillValue" label="Y" disabled
                  >是</el-radio
                >
                <el-radio v-model="item.fillValue" label="N" disabled
                  >否</el-radio
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { information } from "@/utils/QYcenter";
export default {
  created() {
    const local = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(local);
    this.companyName = local.companyName;

    information().then((res) => {
      console.log(res);
      if (res.code != 200) {
        this.$message.error("获取数据失败！");
        return;
      }

      this.inputListArr = sortKey(res.data, "type");
      for (let i = 0; i < 5; i++) {
        this.inputGroup.push([]);
      }
      // 把5种类型分类
      for (let item of this.inputListArr) {
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
      }

      // 处理多选框，把字符串分割为数组
      for (let item of this.inputGroup[3]) {
        item.options1 = item.options.split("|");
        item.fillValue1 = [];
        if (item.fillValue.indexOf("|") != -1) {
          item.fillValue1 = item.fillValue.split("|");
        } else {
          item.fillValue1.push(item.fillValue);
        }
      }

      // 处理勾选框，把字符串分割为数组
      for (let item of this.inputGroup[3]) {
        item.options1 = item.options.split("|");
        item.fillValue1 = [];
        if (item.fillValue.indexOf("|") != -1) {
          item.fillValue1 = item.fillValue.split("|");
        } else {
          item.fillValue1.push(item.fillValue);
        }
      }

      // 处理单选框，把字符串分割为数组
      for (let item of this.inputGroup[2]) {
        item.options1 = item.options.split("/");
        item.fillValue1 = [];
        if (item.fillValue.indexOf("/") != -1) {
          item.fillValue1 = item.fillValue.split("/");
        } else {
          item.fillValue1 = [];
          item.fillValue1.push(item.fillValue);
        }
      }
    });
  },
  data() {
    return {
      companyName: '',
      inputListArr: [],
      inputGroup: [],
    };
  },
  methods: {},
  computed: {
    // inputList: function () {
    //   return sortKey(this.inputListArr, "type");
    // },
  },
};

function sortKey(array, key) {
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}
</script>

<style lang="less" scoped>
@import url("../../../../assets/css/shop.css");
.InfoMain {
  min-height: 700px;
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

.mainNo {
  width: 700px;
  height: 400px;
  background: url("../../../../assets/nodata.png") no-repeat;
  background-size: 100%;
  margin: 50px auto 0;
}

.main {
  width: 100%;
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
        width: 300px;
        text-align: right;
        padding-right: 10px;
        font-size: 13px;
      }
    }

    .checkBox {
      width: 100%;
      padding-left: 50px;
    }
  }

  .checkBigBox {
    padding: 20px 0 0 50px;
    .ts {
      width: 500px;
      font-size: 13px;
    }
    .gouItem {
      display: inline-block;
      padding-left: 50px;
    }
  }
}

.main {
  margin-top: 50px;
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
</style>