<template>
  <div class="estimate">
    <el-card>
      <div class="bigTitle">标签对比</div>
    </el-card>

    <!-- 标签对比 -->
    <el-card style="margin-top: 20px">
      <div class="twoBox">
        <!-- 左侧 -->
        <div class="leftBox">
          <div class="buttonBox">
            <el-button type="primary" class="btnOne">一阶匹配</el-button>
          </div>
          <el-card>
            <div class="tableBox">
              <div
                class="tableItem"
                v-for="(item, index) in oneTableDataRight"
                :key="index"
                :class="{ interlaced: index % 2 == 0 }"
              >
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="item.title"
                  placement="top"
                >
                  <div class="title">{{ item.title }}</div>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="resultIs(item.fillValue)"
                  placement="top"
                >
                  <div class="num">{{ resultIs(item.fillValue) }}</div>
                </el-tooltip>
              </div>
            </div>
          </el-card>
        </div>

        <!-- 右侧 -->
        <div class="rightBox" style="margin-left: 10px">
          <div class="buttonBox">
            <el-button type="primary" class="btnTwo">二阶匹配</el-button>
          </div>
          <el-card>
            <div class="tableBox">
              <div
                class="tableItem"
                v-for="(item, index) in oneTableDataLeft"
                :key="index"
                :class="{ interlaced: index % 2 == 0 }"
              >
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="item.title"
                  placement="top"
                >
                  <div class="title">{{ item.title }}</div>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="resultIs(item.fillValue)"
                  placement="top"
                >
                  <div class="num">{{ resultIs(item.fillValue) }}</div>
                </el-tooltip>
              </div>
            </div>
          </el-card>
        </div>
      </div>

      <div class="twoPage">
        <div class="page2">
          <el-pagination
            @size-change="duibiChange2"
            @current-change="pageChange2"
            :current-page.sync="page2.pageNum"
            :page-size="page2.pageSize"
            layout="prev, pager, next, jumper"
            :total="page2.total"
          >
          </el-pagination>
        </div>

        <div class="page1">
          <el-pagination
            @size-change="duibiChange1"
            @current-change="pageChange1"
            :current-page.sync="page1.pageNum"
            :page-size="page1.pageSize"
            layout="prev, pager, next, jumper"
            :total="page1.total"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>

    <!-- 政策对比 -->
    <el-card style="margin-top: 20px">
      <div class="bigTitle">政策对比</div>
    </el-card>

    <el-card style="margin-top: 20px">
      <div class="twoBox">
        <!-- 左侧 -->
        <div class="leftBox">
          <div class="titleBox">一阶匹配政策结果</div>
          <el-card>
            <el-table
              :data="twoTableDataRight"
              :header-cell-style="{
                background: '#E4EEFF',
                color: '#0453FA',
                height: 67,
              }"
              @row-click="PPTableClick"
            >
              <el-table-column width="50" type="selection"> </el-table-column>
              <el-table-column label="序号" width="50" type="index">
              </el-table-column>
              <el-table-column label="项目名称">
                <template slot-scope="scope">
                  {{ scope.row.year }}{{ scope.row.title }}
                </template>
              </el-table-column>
              <el-table-column label="立项部门" prop="departmentName">
              </el-table-column>
              <el-table-column label="地区" prop="areaName"> </el-table-column>
              <el-table-column label="操作" width="150" prop="caozuo">
                <template slot-scope="scope">
                  <span
                    :class="{
                      immediately: scope.row.status == 1,
                      immed: scope.row.status == 0,
                      immediatelyNo: scope.row.status == 2,
                    }"
                    @click.stop
                    @click="ljsbClick(scope.row.status, scope.row.declareUrl)"
                    >{{ scope.row.status | SbStatus }}</span
                  >
                  <!-- v-if条件渲染按钮上面 -->
                  <!-- <el-button size="mini" disabled class="dkf">待开放</el-button> -->
                  <span
                    size="mini"
                    class="dy"
                    @click.stop
                    @click="
                      scope.row.subscrip == 0
                        ? DYClick(scope.row.policyId)
                        : QXDYClick(scope.row.policyId)
                    "
                    :class="{ dyNo: scope.row.subscrip == 1 }"
                    >{{ scope.row.subscrip == 0 ? "订阅" : "已订阅" }}</span
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>

        <!-- 右侧 -->
        <div class="rightBox" style="margin-left: 10px">
          <div class="titleBox">二阶匹配政策结果</div>
          <el-card>
            <el-table
              :data="twoTableDataLeft"
              :header-cell-style="{
                background: '#E4EEFF',
                color: '#0453FA',
                height: 67,
              }"
              @row-click="PPTableClick"
            >
              <el-table-column width="50" type="selection"> </el-table-column>
              <el-table-column label="序号" width="50" type="index">
              </el-table-column>
              <el-table-column label="项目名称">
                <template slot-scope="scope">
                  {{ scope.row.year }}{{ scope.row.title }}
                </template>
              </el-table-column>
              <el-table-column label="立项部门" prop="departmentName">
              </el-table-column>
              <el-table-column label="地区" prop="areaName"> </el-table-column>
              <el-table-column label="操作" width="150" prop="caozuo">
                <template slot-scope="scope">
                  <span
                    :class="{
                      immediately: scope.row.status == 1,
                      immed: scope.row.status == 0,
                      immediatelyNo: scope.row.status == 2,
                    }"
                    @click.stop
                    @click="ljsbClick(scope.row.status, scope.row.declareUrl)"
                    >{{ scope.row.status | SbStatus }}</span
                  >
                  <!-- v-if条件渲染按钮上面 -->
                  <!-- <el-button size="mini" disabled class="dkf">待开放</el-button> -->
                  <span
                    class="dy"
                    @click.stop
                    @click="
                      scope.row.subscrip == 0
                        ? DYClick(scope.row.policyId)
                        : QXDYClick(scope.row.policyId)
                    "
                    :class="{ dyNo: scope.row.subscrip == 1 }"
                    >{{ scope.row.subscrip == 0 ? "订阅" : "已订阅" }}</span
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>
      </div>

      <div class="twoPage">
        <div class="page2">
          <el-pagination
            @size-change="duibiChange4"
            @current-change="pageChange4"
            :current-page.sync="page4.pageNum"
            :page-size="page4.pageSize"
            layout="prev, pager, next, jumper"
            :total="page4.total"
          >
          </el-pagination>
        </div>

        <div class="page1">
          <el-pagination
            @size-change="duibiChange3"
            @current-change="pageChange3"
            :current-page.sync="page3.pageNum"
            :page-size="page3.pageSize"
            layout="prev, pager, next, jumper"
            :total="page3.total"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  labelList,
  recordList,
  PPlabelList,
  PPrecordList,
} from "@/utils/total";
import { getsubscribe, deletepolicyId } from "@/utils/goverment.js";
export default {
  created() {
    this.getData();
  },
  mounted(){
     document.querySelector(".estimate").scrollIntoView();
  },
  data() {
    return {
      page1: {
        pageNum: 1,
        pageSize: 7,
        total: 7,
      },
      page2: {
        pageNum: 1,
        pageSize: 7,
        total: 7,
      },
      page3: {
        pageNum: 1,
        pageSize: 7,
        total: 7,
      },
      page4: {
        pageNum: 1,
        pageSize: 7,
        total: 7,
      },
      oneTableDataLeft: [],
      oneTableDataRight: [],
      twoTableDataLeft: [],
      twoTableDataRight: [],
    };
  },
  methods: {
    getData() {
      // 预估标签
      labelList(
        this.$route.query.estimateBatchNo,
        this.$route.query.matchBatchNo,
        this.page1.pageNum,
        this.page1.pageSize
      ).then((res) => {
        console.log(res);

        this.oneTableDataLeft = res.rows;
        this.page1.total = res.total;
      });

      // 匹配标签
      PPlabelList(
        this.$route.query.matchBatchNo,
        this.page2.pageNum,
        this.page2.pageSize
      ).then((res) => {
        console.log(res);

        this.oneTableDataRight = res.rows;
        this.page2.total = res.total;
      });

      // 政策对比---预估
      recordList(
        this.$route.query.estimateBatchNo,
        this.page3.pageNum,
        this.page3.pageSize
      ).then((res) => {
        console.log(res);
        if (res.code != 200) {
          this.$message.error("获取记录失败！");
          return;
        }

        this.twoTableDataLeft = res.rows;
        this.page3.total = res.total;
      });
      // 政策对比---匹配
      PPrecordList(
        this.$route.query.matchBatchNo,
        this.page4.pageNum,
        this.page4.pageSize
      ).then((res) => {
        console.log(res);
        if (res.code != 200) {
          this.$message.error("获取记录失败！");
          return;
        }

        this.twoTableDataRight = res.rows;
        this.page4.total = res.total;
      });
    },
    pageChange1(val) {
      this.page1.pageNum = val;
      this.getData();
    },
    pageChange2(val) {
      this.page2.pageNum = val;
      this.getData();
    },
    pageChange3(val) {
      this.page3.pageNum = val;
      this.getData();
    },
    pageChange4(val) {
      this.page4.pageNum = val;
      this.getData();
    },

    duibiChange1(val) {
      this.page1.pageNum = val;
      this.getData();
    },
    duibiChange2(val) {
      this.page2.pageNum = val;
      this.getData();
    },
    duibiChange3(val) {
      this.page3.pageNum = val;
      this.getData();
    },
    duibiChange4(val) {
      this.page4.pageNum = val;
      this.getData();
    },
    // 申报
    ljsbClick(status, url) {
      if (status == 1) {
        if (url.indexOf("http") == -1) {
          window.open("https://" + url, "_blank");
        } else {
          window.open(url, "_blank");
        }
      }
    },
    // 订阅
    DYClick(val) {
      getsubscribe(val).then((res) => {
        console.log(res);
        if (res.code != 200) {
          this.$message.error("订阅失败！");
          return;
        }

        this.$message.success("订阅成功！");
        this.getData();
      });
    },

    // 取消订阅
    QXDYClick(val) {
      deletepolicyId(val).then((res) => {
        if (res.code != 200) {
          this.$message.error("取消订阅失败！");
          return;
        }

        this.$message.success("取消订阅成功！");
        this.getData();
      });
    },

    // 匹配表格行点击事件
    PPTableClick(val) {
      console.log(val);
      this.$router.push({ path: "policydetails", query: { id: val.policyId } });
    },
  },
  computed: {
    resultIs() {
      return function (val) {
        if (val == "Y") {
          return "是";
        } else if (val == "N") {
          return "否";
        } else {
          return val;
        }
      };
    },
  },
  // 过滤器
  filters: {
    SbStatus(val) {
      switch (val) {
        case 0:
          return "已截止";
        case 1:
          return "申报中";
        case 2:
          return "待开放";
      }
    },
  },
};
</script>

<style lang='less' scoped>
.bigTitle {
  height: 25px;
  font-size: 17px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 25px;
  color: #333333;
}
.twoBox {
  width: 100%;
  // height: 600px;
  display: flex;
  > div {
    width: 0;
    flex: 1;
    // border: 1px solid red;
    .buttonBox {
      padding: 10px 0 20px 30px;
      .btnOne {
        background-color: #7a96ed;
        border-color: #7a96ed;
      }
      .btnTwo {
        background-color: #aee1ff;
        border-color: #aee1ff;
      }
    }

    .titleBox {
      height: 50px;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      line-height: 50px;
      color: #256bff;
      padding-left: 20px;
    }

    .tableBox {
      width: 100%;
      .tableItem {
        width: 100%;
        height: 60px;
        display: flex;
        line-height: 60px;
        .title {
          flex: 1;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .num {
          flex: 1;
          color: #256bff;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }

      .interlaced {
        background-color: #f7faff;
      }
    }
  }
}

.twoPage {
  // margin-top: 20px;
  width: 100%;
  height: 50px;
  display: flex;
  .page1 {
    width: 0;
    flex: 1;
    text-align: center;
    margin-top: 20px;
  }

  .page2 {
    width: 0;
    flex: 1;
    text-align: center;
    margin-top: 20px;
  }
}

.page {
  text-align: center;
  margin: 30px auto 10px;
}

.ljsb {
  background-color: #fb963e;
  border-top-left-radius: 5%;
  border-bottom-left-radius: 5%;
  color: white;
}

.ljsbNo {
  background-color: #ffd6b1;
  border-top-left-radius: 5%;
  border-bottom-left-radius: 5%;
  color: white;
}

.ljsbYJZ {
  background-color: #fa3232;
  border-top-left-radius: 5%;
  border-bottom-left-radius: 5%;
  color: white;
}

.dy {
  border-top-right-radius: 5%;
  border-bottom-right-radius: 5%;
  background-color: #7a96ed;
  color: white;
}
.dyNo {
  background-color: #d2dcfa;
  color: white;
}
.twoBox {
  span {
    display: block;
    float: left;
    width: 50px;
    height: 26px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 26px;
    color: #ffffff;
    cursor: pointer;
    text-align: center;
  }

  .immediately {
    background-color: #fb963e;
    border-top-left-radius: 5%;
    border-bottom-left-radius: 5%;
  }
  .immediatelyNo {
    background-color: #ffd6b1;
    border-top-left-radius: 5%;
    border-bottom-left-radius: 5%;
  }
  .immed {
    background-color: #fb3e3e;
    border-top-left-radius: 5%;
    border-bottom-left-radius: 5%;
  }
}
/deep/.el-table__header,/deep/.el-table__body,/deep/.el-table__footer{
   width: 100%;
   table-layout: fixed !important;
}
</style>