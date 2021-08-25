<template>
  <div class="intelle1">
    <el-card>
      <div class="tableModel">
        <div class="headBox">
          <div class="title">专利消息</div>
          <div class="therrBtn">
            <el-button
              type="primary"
              size="small"
              style="background-color: #f47e7e; border-color: #f47e7e"
              @click="deleteZLClick"
              >删除<i class="el-icon-delete"></i
            ></el-button>
            <el-button
              type="primary"
              size="small"
              style="background-color: #7a96ed; border-color: #7a96ed"
              @click="addZLClick"
              >添加<i class="el-icon-circle-plus-outline"></i
            > </el-button>
            <el-button
              type="primary"
              size="small"
              style="background-color: #70b959; border-color: #70b959"
              @click="DCZLClick"
              >导出<i class="el-icon-right"></i></el-button
          >
          </div>
        </div>

        <div class="tableBox">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            stripe
            @selection-change="handleSelectionChange"
            :header-cell-style="{
              'background-color': '#E4EEFF',
              color: '#0453FA',
            }"
            :row-style="{ height: '80px' }"
          >
            <el-table-column type="selection"> </el-table-column>
            <el-table-column label="序号" align="center" width="50">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="AssigneestringList[0]" label="申请人">
            </el-table-column>
            <el-table-column
              prop="ApplicationDate"
              label="专利申请日"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="PublicationDate"
              label="授权公告日"
              width="120"
            >
            </el-table-column>
            <el-table-column prop="Title" label="名称"> </el-table-column>
            <el-table-column
              prop="ApplicationNumber"
              label="申请号"
              width="170"
            >
            </el-table-column>
            <el-table-column
              prop="PublicationNumber"
              label="公开（公布）号"
              width="150"
            >
            </el-table-column>
            <el-table-column prop="KindCode" label="专利类型" width="80">
              <template slot-scope="scope">
                {{ kindCodeFont(scope.row.KindCode) }}
              </template>
            </el-table-column>
            <el-table-column prop="Time" label="缴费倒计时" width="100">
              <template slot-scope="scope">
                <div class="DTimeBox" v-if="scope.row.Time">
                  <div class="DTime"></div>
                  <div class="numTime">{{ scope.row.Time }}天</div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div class="pageBox">
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
    </el-card>

    <!-- 提示删除弹窗 -->
    <el-dialog title="提示" :visible.sync="deleteDialog"  :close-on-click-modal="false" width="35%" center>
      <div class="" style="text-align: center">
        <div class="">
          <img v-lazy="require('@/assets/enter/wh.png')" alt="" />
        </div>
        <div>确定删除选中项吗？</div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteDialogClick">确定</el-button>
      </span>
    </el-dialog>

    <!-- 添加专利弹窗 -->
    <el-dialog title="添加" :visible.sync="addDialog" width="25%">
      <div class="Addtitle">专利信息</div>
      <el-form :model="form" :rules="rules" ref="zlform">
        <el-form-item
          label="申请人"
          prop="assigneeStringList"
          label-width="180px"
        >
          <el-input
            v-model="form.assigneeStringList"
            style="width: 220px"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="专利申请日"
          prop="applicationDate"
          label-width="180px"
        >
          <el-date-picker
            v-model="form.applicationDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="名称" prop="title" label-width="180px">
          <el-input v-model="form.title" style="width: 220px"></el-input>
        </el-form-item>

        <el-form-item
          label="授权公告日"
          prop="publicationDate"
          label-width="180px"
        >
          <el-date-picker
            v-model="form.publicationDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="专利类型" prop="kindCode" label-width="180px">
          <el-select v-model="form.kindCode" :popper-append-to-body="false" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="公开（公布）号"
          prop="publicationNumber"
          label-width="180px"
        >
          <el-input
            v-model="form.publicationNumber"
            style="width: 220px"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="申请号"
          prop="applicationNumber"
          label-width="180px"
        >
          <el-input
            v-model="form.applicationNumber"
            style="width: 220px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="ZLsubmitBtn"
          style="background-color: #256bff; color: white"
          >提交</el-button
        >
      </div>
    </el-dialog>

    <!-- 导出记录 -->
    <el-dialog title="导出" :close-on-click-modal="false" :visible.sync="DCDialog" width="25%">
      <el-form :model="form2" :rules="rules" ref="dcform">
        <el-form-item label="选择导出项目" prop="radio1" label-width="180px">
          <el-radio v-model="form2.radio1" label="1">导出选中项目</el-radio>
          <el-radio v-model="form2.radio1" label="2">导出全部</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="DCsubmitBtn"
          style="background-color: #256bff; color: white"
          >确定导出</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 专利接口
import {
  searchMultiPatents, // 查询
  deletePatent, // 删除
  addPatent, //新增
  exportPatent, //导出
  download, // 下载
} from "@/utils/total";

export default {
  created() {
    this.getZLData();
  },
  props: {
    keyNo: {
      type: String,
    },
  },
  data() {
    return {
      page: {
        pageNum: 1,
        pageSize: 10,
        total: 10,
      },
      tableData: [],
      multipleSelection: [],

      // 提示删除弹窗
      deleteDialog: false,

      // 添加
      addDialog: false,
      form: {
        assigneeStringList: "",
        applicationDate: "",
        title: "",
        publicationDate: "",
        kindCode: "",
        publicationNumber: "",
        applicationNumber: "",
      },
      options: [
        {
          value: "A",
          label: "发明公布 A",
        },
        {
          value: "B",
          label: "发明授权 B",
        },
        {
          value: "C",
          label: "发明授权 C",
        },
        {
          value: "D",
          label: "外观设计 D",
        },
        {
          value: "S",
          label: "外观设计 S",
        },
        {
          value: "U",
          label: "实用新型 U",
        },
        {
          value: "Y",
          label: "实用新型 Y",
        },
      ],

      // 导出
      DCDialog: false,
      form2: {
        radio1: "1",
      },

      rules: {
        assigneeStringList: [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        applicationDate: [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        title: [{ required: true, message: "不能为空", trigger: "blur" }],
        publicationDate: [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        kindCode: [{ required: true, message: "不能为空", trigger: "blur" }],
        publicationNumber: [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        applicationNumber: [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    getZLData() {
      // if(this.keyNo){
      //   return;
      // }
      this.tableData = [];
      searchMultiPatents(
        this.keyNo,
        this.page.pageNum,
        this.page.pageSize
      ).then((res) => {
        console.log(res);
        // if (res.code != 200) {
        //   this.$message.error("获取专利数据失败！");
        //   return;
        // }

        // if (res.data.Status) {
        //   this.$message.error(res.data.Message);
        //   return;
        // }
        if (res.rows != null && res.rows.length != 0) {
          let tenArr = [];
          for (let i = 0; i < 10; i++) {
            // console.log(res.rows[i]);
            if (res.rows[i] != undefined) {
              tenArr.push(res.rows[i]);
            }
          }
          this.tableData = tenArr;
        }

        this.page.total = res.total;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.page.pageNum = val;
      this.getZLData();
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getZLData();
    },

    // 删除
    deleteDialogClick() {
      let checkArrId = [];
      for (let item of this.multipleSelection) {
        checkArrId.push(item.Id);
      }

      console.log(checkArrId);
      deletePatent(checkArrId.join()).then((res) => {
        console.log(res);
        if (res.code != 200) {
          this.$message.error("删除专利记录失败！");
          return;
        }

        this.$message.success("删除专利记录成功！");
        this.deleteDialog = false;
        this.getZLData();
      });
    },
    deleteZLClick() {
      if (this.multipleSelection.length == 0) {
        this.$message.error("请选择要删除的记录！");
        return;
      }
      this.deleteDialog = true;
    },

    // 提交添加
    ZLsubmitBtn() {
      this.$refs.zlform.validate((valid) => {
        if (!valid) {
          return;
        }

        if (
          new Date(this.form.applicationDate) >
          new Date(this.form.publicationDate)
        ) {
          this.$message.error("授权公告日需要大于专利申请日！");
          return;
        }
        addPatent(this.form).then((res) => {
          console.log(res);
          if (res.code != 200) {
            this.$message.error("添加专利记录失败！");
            return;
          }

          this.$message.success("添加专利记录成功！");
          this.addDialog = false;
          this.$refs.zlform.resetFields();
          this.getZLData();
        });
      });
    },
    addZLClick() {
      this.addDialog = true;
    },

    // 导出
    DCZLClick() {
      this.DCDialog = true;
    },
    DCsubmitBtn() {
      if (this.form2.radio1 == "1") {
        if (this.multipleSelection.length == 0) {
          this.$message.error("请选择需要导出的记录或者选择'全部导出！'");
          return;
        }

        let itemArr = [];
        for (let item of this.multipleSelection) {
          itemArr.push(item.Id);
        }
        exportPatent(itemArr.join()).then((res) => {
          console.log(res);
          if (res.code != 200) {
            this.$message.error("导出数据失败！");
            return;
          }

          this.$message.success("导出数据成功！");

          window.location.href =
            this.$http +
            "/common/download?fileName=" +
            encodeURI(res.msg) +
            "&delete=" +
            true;
        });
        this.DCDialog = false;
      } else {
        exportPatent().then((res) => {
          console.log(res);
          if (res.code != 200) {
            this.$message.error("导出数据失败！");
            return;
          }

          this.$message.success("导出数据成功！");
          // 下载
          window.location.href =
            this.$http +
            "/common/download?fileName=" +
            encodeURI(res.msg) +
            "&delete=" +
            true;
          this.DCDialog = false;
        });
      }
    },
  },
  computed: {
    kindCodeFont() {
      return function (code) {
        switch (code) {
          case "A":
            return "发明公布";
          case "B":
            return "发明授权";
          case "C":
            return "发明授权";
          case "D":
            return "外观设计";
          case "S":
            return "外观设计";
          case "U":
            return "实用新型";
          case "Y":
            return "实用新型";
        }
      };
    },
  },
  watch: {
    keyNo() {
      this.getZLData();
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../../assets/css/shop.css");
.intelle1 {
  margin-top: 10px;
}
.tableModel {
  width: 100%;
  .headBox {
    width: 100%;
    overflow: hidden;
    margin: 20px 0;
  }
  .title {
    height: 21px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 21px;
    color: #0052ff;
    float: left;
  }
  .therrBtn {
    float: right;
    img {
      position: relative;
      top: 3px;
      left: 3px;
    }
  }
}

.tableBox {
  .DTimeBox {
    .DTime {
      width: 20px;
      height: 20px;
      background: url("../../assets/enter/djs.png") no-repeat center center;
      float: left;
      margin-top: 1px;
    }
    .numTime {
      float: left;
    }
  }
}

.pageBox {
  margin-top: 20px;
}

.Addtitle {
  font-weight: 600;
  text-align: left;
  margin-bottom: 10px;
}

.el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap>.el-form-item__label:before, .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
  content: '*' !important;
}
/deep/.el-table__header,/deep/.el-table__body,/deep/.el-table__footer{
   width: 100%;
   table-layout: fixed !important;
}
</style>