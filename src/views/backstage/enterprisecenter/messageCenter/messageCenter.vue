<template>
  <div class="messageCenter">
    <div class="threeRaio">
      <el-radio-group v-model="allMessage">
        <el-radio-button label="">全部消息</el-radio-button>
        <el-radio-button label="1">账户消息</el-radio-button>
        <el-radio-button label="0">系统消息</el-radio-button>
      </el-radio-group>
    </div>
    <div class="main">
      <el-card>
        <div class="head">
          <ul>
            <li :class="{ fontColor: DMessageIs === 0 }" @click="listClick(0)">
              未读消息
            </li>
            <li
              :class="{ fontColor: DMessageIs === -1 }"
              @click="listClick(-1)"
            >
              已读消息
            </li>
          </ul>
        </div>
        <div class="operating">
          <div class="allcheck">全选</div>
          <div class="allYD" @click="allYD">全部设为已读</div>
          <div class="allDelete" @click="deleteCheck">删除选中</div>
        </div>

        <div class="tablebox">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            height="650"
            @selection-change="handleSelectionChange"
            :header-cell-style="{ height: '80px' }"
            :row-style="{ height: '80px' }"
            :cell-style="{ height: '80px' }"
          >
            <el-table-column type="selection" width="105"> </el-table-column>
            <el-table-column prop="title"> </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                发布于：{{ scope.row.createTime }}
              </template>
            </el-table-column>
            <el-table-column width="200">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="small"
                  :style="{
                    'background-color':
                      scope.row.status === 0 ? '#4a84ff' : '#ccc',
                    'border-color': scope.row.status === 0 ? '#4a84ff' : '#ccc',
                  }"
                  style="width: 80px"
                  @click="
                    scope.row.status === 0 && statusClick(scope.row.umsgId)
                  "
                  >{{ scope.row.status === 0 ? "设为已读" : "已读" }}</el-button
                >
                <el-button
                  type="primary"
                  size="small"
                  style="background-color: #f47e7e; border-color: #f47e7e"
                  @click="deleteClick(scope.row.umsgId)"
                  >删除<i class="el-icon-delete"></i></el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div class="pageBox">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="tablePage.pageCurrent"
              :page-size="tablePage.pageSize"
              layout="prev, pager, next, jumper"
              :total="tablePage.pageTotal"
            >
            </el-pagination>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { listMessage, messageCenter, messageCenter1 } from "@/utils/QYcenter";
export default {
  created() {
    this.getListMessage();
  },
  data() {
    return {
      // 消息类型
      allMessage: "",
      // 消息状态
      DMessageIs: "",
      AllChecked: false,
      tableData: [],
      multipleSelection: [],
      tablePage: {
        pageTotal: 80,
        pageSize: 7,
        pageCurrent: 1,
      },
    };
  },
  methods: {
    listClick(index) {
      // console.log(index);
      this.DMessageIs = index;
      this.getListMessage(this.DMessageIs, this.allMessage);
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 翻页
    handleSizeChange(val) {
      this.tablePage.pageCurrent = val;
      this.getListMessage(this.DMessageIs, this.allMessage);
    },
    // 跳转页面
    handleCurrentChange(val) {
      this.tablePage.pageCurrent = val;
      this.getListMessage(this.DMessageIs, this.allMessage);
    },
    getListMessage(status, type) {
      // console.log(type, status)
      listMessage(
        this.tablePage.pageCurrent,
        this.tablePage.pageSize,
        status,
        type
      ).then((res) => {
        // console.log(res);
        if (res.code != 200) {
          this.$message.error("全部消息列表数据请求失败！");
          return;
        }

        this.tableData = [];
        for (let item of res.rows) {
          let obj = {
            title: item.title,
            createTime: item.createTime,
            status: item.status,
            umsgId: item.umsgId,
          };
          this.tableData.push(obj);
        }

        this.tablePage.pageTotal = res.total;
      });
    },

    // 已读按钮
    statusClick(umsgId) {
      // console.log(umsgId);
      messageCenter(umsgId).then((res) => {
        // console.log(res)
        if (res.code != 200) {
          this.$message.error("设置已读失败！");
          return;
        }

        this.$message.success("设置已读成功！");
        this.DMessageIs = "";
        this.getListMessage(this.DMessageIs, this.allMessage);
      });
    },
    // 删除按钮
    deleteClick(umsgId) {
      let umsgIdArr = [];
      umsgIdArr.push(umsgId);
      // console.log(umsgIdArr);
      let umsgIdString = umsgIdArr.join();
      messageCenter1(umsgIdString).then((res) => {
        // console.log(res);
        if (res.code != 200) {
          this.$message.error("删除信息失败！");
          return;
        }

        this.$message.success("删除信息成功！");
        this.DMessageIs = "";
        this.getListMessage(this.DMessageIs, this.allMessage);
      });
    },
    // 全部已读按钮
    allYD() {
      messageCenter().then((res) => {
        if (res.code != 200) {
          this.$message.error("设置已读失败！");
          return;
        }

        this.$message.success("已全部设为已读！");
        this.DMessageIs = "";
        this.getListMessage(this.DMessageIs, this.allMessage);
      });
    },
    // 删除选中
    deleteCheck() {
      console.log(this.multipleSelection);
      if (this.multipleSelection.length == 0) {
        this.$message.error("请选择要删除的信息！");
        return;
      }
      let stringArr = [];
      for (let item of this.multipleSelection) {
        stringArr.push(item.umsgId);
      }

      let stringJoin = stringArr.join();
      console.log(stringJoin);

      messageCenter1(stringJoin).then((res) => {
        console.log(res);
        if (res.code != 200) {
          this.$message.error("删除信息失败！");
          return;
        }

        this.$message.success("删除信息成功！");
        this.DMessageIs = "";
        this.getListMessage(this.DMessageIs, this.allMessage);
      });
    },
  },
  watch: {
    allMessage(val) {
      this.DMessageIs = "";
      this.getListMessage("", val);
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  position: relative;
  .head {
    width: 100%;
    height: 60px;
    line-height: 60px;
    border-bottom: 2px solid rgb(240, 240, 240);
    li {
      float: left;
      margin-left: 25px;
      cursor: pointer;
    }
    .fontColor {
      color: #256bff;
    }
  }

  .operating {
    width: 400px;
    height: 100px;
    // overflow: hidden;
    position: absolute;
    left: 60px;
    top: 105px;
    z-index: 999;
    div {
      float: left;
    }
    .allcheck {
      line-height: 35px;
      // font-size: 20px;
    }
    .allYD {
      border: 1px solid #256bff;
      padding: 5px;
      font-size: 13px;
      color: #256bff;
      margin-left: 20px;
      border-radius: 4px;
      cursor: pointer;
    }
    .allDelete {
      border: 1px solid #256bff;
      padding: 5px;
      font-size: 13px;
      color: #256bff;
      margin-left: 20px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .pageBox{
    text-align: right;
    // height: 50px;
    // line-height: 50px;
    margin-top: 10px;
  }
}

.el-table::before{
  height: 0;
}
/deep/.el-table__header,/deep/.el-table__body,/deep/.el-table__footer{
   width: 100%;
   table-layout: fixed !important;
}
</style>