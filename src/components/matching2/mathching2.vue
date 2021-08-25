<template>
  <!-- 智能匹配模块中的，二三阶匹配组件 -->
  <div class="mathching2">
    <div class="InfoMain">
      <div class="main">
        <!-- 模块一：输入框 -->
        <div class="inputTextBox">
          <div
            class="flexThreeBox"
            v-for="(item, index) in this.inputGroup[0]"
            :key="index + '0'"
          >
            <span class="ts" @click="titleClick(item.templateIds)"
              >{{ item.head }}{{ item.title }}{{ item.subTitle }}:</span
            >
            <!-- <el-input v-model="item.fillValue" style="width: 200px"></el-input
            ><span> {{ item.unit }}</span> -->
          </div>
        </div>

        <!-- 模块二:区间输入框 -->
        <div class="inputTextBox">
          <div
            class="flexThreeBox"
            v-for="(item, index) in this.inputGroup[1]"
            :key="index + '1'"
          >
            <span class="ts" @click="titleClick(item.templateIds)"
              >{{ item.head }}{{ item.title }}{{ item.subTitle }}:</span
            ><el-input v-model="item.fillValue" style="width: 200px"></el-input>
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
            <span class="ts" @click="titleClick(item.templateIds)"
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
        <div class="checkBigBox">
          <div
            class="checkBox"
            v-for="(item, index) in this.inputGroup[3]"
            :key="index + '3'"
          >
            <span class="ts" @click="titleClick(item.templateIds)"
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
        <div class="checkBigBox">
          <div
            class="gouBox"
            v-for="(item, index) in this.inputGroup[4]"
            :key="index + '4'"
          >
            <span class="ts" @click="titleClick(item.templateIds)"
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

    <!-- 点击item标题，弹出详细信息 -->
    <el-dialog :visible.sync="dialogVisible" width="900px">
      <div class="dialogbox">
        <div class="leftTitle">
          <ul>
            <li
              v-for="(item, index) in titleData"
              :key="index"
              @click="titleItemClick(index)"
            >
              {{ item.year }}年度{{ item.title }}
            </li>
          </ul>
        </div>
        <div class="rightContent">
          <div
            class="contentbox"
            ref="titleContentBox"
            :style="{
              height: xzTitleContent.url[0].name != '' ? '400px' : '100%',
            }"
          >
            <div class="title">
              <div>{{ xzTitleContent.title }}</div>
              <div class="yw">原文</div>
            </div>
            <div class="content" v-html="xzTitleContent.content"></div>
          </div>
          <div class="down" v-if="xzTitleContent.url[0].name != ''">
            <div class="title">附件下载：</div>
            <div>
              <div v-for="(item, index) in xzTitleContent.url" :key="index">
                <a
                  href="javascript:;"
                  @click="uploadConten(item.uploadUrl, item.name)"
                  >{{ item.name }}</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  nextStep,
  lastStep,
  generate,
  batchList,
  getNote,
} from "@/utils/match.js";
import download from "downloadjs";
export default {
  created() {
    this.renderInput();
  },
  mounted() {},
  props: {
    templatelist: {
      type: Array,
    },
    active: {
      type: Number,
    },
  },
  data() {
    return {
      tempArr: [],
      inputGroup: [],

      // 加载
      fullscreenLoading: false,

      // 标题提示弹窗
      dialogVisible: false,
      // 用来保存请求过来的数据
      titleData: [],
      // 用来保存选中标题对应的内容
      xzTitleContent: {
        title: "",
        content: "",
        url: [
          {
            name: "",
            uploadUrl: "",
          },
        ],
      },
    };
  },
  methods: {
    addForm() {
      // 处理数据，并提交
      // 第二次匹配
      if (this.active == 1) {
        let subArr = [];
        for (let item of this.inputGroup) {
          if (item.length != 0) {
            for (let item2 of item) {
              // 深克隆
              subArr.push(JSON.parse(JSON.stringify(item2)));
            }
          }
        }

        // 提交之前判断不能为空的input是否为空，
        // for (let item4 of subArr) {
        //   if (
        //     item4.type == "0" ||
        //     item4.type == "1" ||
        //     item4.type == "2" ||
        //     item4.type == "4"
        //   ) {
        //     if(item4.fillValue == null || item4.fillValue.length == 0){
        //       this.$message.error("有必填项未填，请检查！");
        //       return;
        //     }
        //   }
        // }

        for (let item3 of subArr) {
          if (item3.fillValue instanceof Array) {
            item3.fillValue = item3.fillValue.join("|");
          }

          if (item3.type == "2" || item3.type == "4") {
            if (item3.fillValue) {
              item3.fillValue = "Y";
            } else {
              item3.fillValue = "N";
            }
          }

          if (item3.type == "0" || item3.type == "1") {
            if (item3.fillValue == null || item3.fillValue == "") {
              item3.fillValue = 0;
            }
          }
        }

        // 加载
        this.fullscreenLoading = true;

        console.log(subArr);
        nextStep(subArr).then((res) => {
          console.log(res);
          if (res.code != 200) {
            this.$message.error("提交信息失败！");
            return;
          }

          if (res.data.schemeSize == 0) {
            this.fullscreenLoading = false;
            //   返回上一个页面
            this.$message.error("未匹配到项目，请重新选择！");
            // this.$emit("returnUp", 0);
          } else {
            if (res.data.templateList.length != 0) {
              this.fullscreenLoading = false;
              //   继续下一步
              this.$emit("returnUp", 2, res.data.templateList);
            } else {
              //   通过接口得到批次号，并跳转到展示页面
              generate().then((res) => {
                this.fullscreenLoading = false;
                console.log(res);
                if (res.code != 200) {
                  this.$message.error("获取批次号失败！");
                  return;
                }
                this.$router.push({
                  path: "/backhome/policymanage/matchingShow",
                  query: {
                    code: res.data,
                  },
                });
              });
            }
          }
        });
        // 第三次匹配
      } else if (this.active == 2) {
        let subArr = [];
        for (let item of this.inputGroup) {
          if (item.length != 0) {
            for (let item2 of item) {
              subArr.push(JSON.parse(JSON.stringify(item2)));
            }
          }
        }

        // 提交之前判断不能为空的input是否为空，
        // for (let item4 of subArr) {
        //   if (
        //     item4.type == "0" ||
        //     item4.type == "1" ||
        //     item4.type == "2" ||
        //     item4.type == "4"
        //   ) {
        //     if (item4.fillValue == null || item4.fillValue.length == 0) {
        //       this.$message.error("有必填项未填，请检查！");
        //       return;
        //     }
        //   }
        // }

        for (let item3 of subArr) {
          if (item3.fillValue instanceof Array) {
            item3.fillValue = item3.fillValue.join("|");
          }

          if (item3.type == "2" || item3.type == "4") {
            if (item3.fillValue) {
              item3.fillValue = "Y";
            } else {
              item3.fillValue = "N";
            }
          }

          if (item3.type == "0" || item3.type == "1") {
            if (item3.fillValue == null || item3.fillValue == "") {
              item3.fillValue = 0;
            }
          }
        }

        // 加载
        this.fullscreenLoading = true;

        console.log(subArr);
        lastStep(subArr).then((res) => {
          console.log(res);
          if (res.code != 200) {
            this.$message.error("提交信息失败！");
            return;
          }

          if (res.data.schemeSize == 0) {
            this.fullscreenLoading = false;
            //   返回上一个页面
            this.$message.error("未匹配到项目，请重新选择！");
            // this.$emit("returnUp", 0);
          } else {
            //   通过接口得到批次号，并跳转到展示页面
            generate().then((res) => {
              this.fullscreenLoading = false;
              console.log(res);
              if (res.code != 200) {
                this.$message.error("获取批次号失败！");
                return;
              }
              this.$router.push({
                path: "/backhome/policymanage/matchingShow",
                query: {
                  code: res.data,
                },
              });
            });
          }
        });
      }
    },

    // 渲染input函数
    renderInput() {
      if (!this.templatelist) {
        return;
      }
      this.tempArr = this.templatelist;
      this.inputGroup = [];
      for (let i = 0; i < 5; i++) {
        this.inputGroup.push([]);
      }
      // 把5种类型分类
      for (let item of this.tempArr) {
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
        item.fillValue = [];
      }

      // 处理勾选框，把字符串分割为数组
      // for (let item of this.inputGroup[3]) {
      //   item.options1 = item.options.split("|");
      //   item.fillValue = [];
      // }

      // 对勾选框进行排序（通过文字的长度）
      for (let item of this.inputGroup[4]) {
        item.titleLength = item.title.length;
      }

      this.inputGroup[4] = sortKey(this.inputGroup[4], "titleLength");

      // 处理单选框，把字符串分割为数组
      for (let item of this.inputGroup[2]) {
        item.options1 = item.options.split("/");
        item.fillValue = null;
      }
    },
    // 点击标题，显示详细信息
    titleClick(templateIds) {
      getNote(templateIds).then((res) => {
        console.log(res);
        this.dialogVisible = true;
        this.titleData = res.data;

        // 遍历数据，将标题分离
        this.xzTitleContent.title = this.titleData[0].title;
        this.xzTitleContent.content = this.titleData[0].context;

        // 处理附件下载数据
        this.xzTitleContent.url = [];
        var downDataName = this.titleData[0].name.split(",");
        var downDataUrl = this.titleData[0].uploadUrl.split(",");
        for (let i = 0; i < downDataName.length; i++) {
          this.xzTitleContent.url.push({
            name: downDataName[i],
            uploadUrl: downDataUrl[i],
          });
        }

        this.$nextTick(() => {
          this.$refs.titleContentBox.scrollTop = 0;
        });
      });
    },
    // 单击左侧，显示内容
    titleItemClick(index) {
      this.$refs.titleContentBox.scrollTop = 0;
      this.xzTitleContent.title = this.titleData[index].title;
      this.xzTitleContent.content = this.titleData[index].context;

      // 处理附件下载数据
      this.xzTitleContent.url = [];
      var downDataName = this.titleData[index].name.split(",");
      var downDataUrl = this.titleData[index].uploadUrl.split(",");
      for (let i = 0; i < downDataName.length; i++) {
        this.xzTitleContent.url.push({
          name: downDataName[i],
          uploadUrl: downDataUrl[i],
        });
      }
    },
    // 下载附件
    // downClick() {},
    Download(row) {
      let fileName = row.name.lastIndexOf("."); //取到文件名开始到最后一个点的长度
      let fileNameLength = row.name.length; //取到文件名长度
      let fileFormat = row.name.substring(fileName + 1, fileNameLength); //截取文件的后缀名。
      if (fileFormat == "xls" || fileFormat == "xlsx") {
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = row.url;
        link.setAttribute("download", row.name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // 下载完成移除元素
      } else {
        download(row.url);
      }
    },
    uploadConten(urls, names) {
      const rows = {
        url: this.$http + urls,
        name: names,
      };
      console.log(rows);
      this.Download(rows);
    },
  },

  watch: {
    // 当父界面数据发生改变，开始渲染
    templatelist() {
      this.renderInput();
    },
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
.InfoMain {
  min-height: 300px;
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
        width: 400px;
        text-align: right;
        padding-right: 10px;
        font-size: 13px;
        cursor: pointer;
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
      cursor: pointer;
    }
    .gouItem {
      display: inline-block;
      padding-left: 50px;
    }

    .gouBox {
      height: 40px;
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

// 单击标题弹窗样式
.dialogbox {
  display: flex;
  height: 550px;
  .leftTitle {
    flex: 3;
    width: 0;
    background-color: #f3f6fd;

    li {
      height: 35px;
      line-height: 35px;
      overflow: hidden;
      padding: 2px 5px;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      &:hover {
        color: rgb(119, 119, 255);
      }
    }
  }

  .rightContent {
    flex: 7;
    width: 0;

    .contentbox {
      height: 400px;
      overflow: auto;
      width: 100%;
      .title {
        height: 35px;
        line-height: 35px;
        font-weight: bold;
        text-align: center;
        margin: 10px auto;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;

        .yw {
          // display: inline-block;
          width: 50px;
          height: 25px;
          line-height: 25px;
          background-color: #fdf0ec;
          color: #ff5227;
          font-size: 13px;
          font-weight: 400;
          margin-left: 10px;
        }
      }
      .content {
        line-height: 30px;
        padding: 10px;
      }
    }
    .down {
      margin-top: 10px;
      line-height: 30px;
      padding-left: 15px;
      .title {
        font-weight: 600;
      }
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