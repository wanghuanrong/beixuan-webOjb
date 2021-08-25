<template>
  <div class="intelle2">
    <el-card>
      <div class="tableModel">
        <div class="headBox">
          <div class="title">计算机软件著作权</div>
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
              >导出<i class="el-icon-right"></i></el-button>
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
            <el-table-column prop="Owner" label="著作权人"> </el-table-column>
            <el-table-column
              prop="PublishDate"
              label="首次发布日期"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="RegisterAperDate"
              label="登记日期"
              width="120"
            >
            </el-table-column>
            <el-table-column prop="Name" label="软件全称"> </el-table-column>
            <el-table-column prop="ShortName" label="软件简称" width="170">
            </el-table-column>
            <el-table-column prop="RegisterNo" label="登记号" width="150">
            </el-table-column>
            <el-table-column prop="Category" label="分类号" width="80">
            </el-table-column>
            <el-table-column prop="VersionNo" label="版本号" width="100">
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
    <el-dialog title="提示" :close-on-click-modal="false" :visible.sync="deleteDialog" width="35%" center>
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

    <!-- 添加软件著作弹窗 -->
    <el-dialog title="添加" :close-on-click-modal="false" :visible.sync="addDialog" width="25%">
      <div class="Addtitle">软件著作信息</div>
      <el-form :model="form" :rules="rules" ref="zlform">
        <el-form-item label="著作权人" prop="owner" label-width="180px">
          <el-input v-model="form.owner" style="width: 220px"></el-input>
        </el-form-item>

        <el-form-item
          label="首次发布日期"
          prop="publishDate"
          label-width="180px"
        >
          <el-date-picker
            v-model="form.publishDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item
          label="登记日期"
          prop="registerAperDate"
          label-width="180px"
        >
          <el-date-picker
            v-model="form.registerAperDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item
          label="软件全称"
          prop="name"
          label-width="180px"
        >
          <el-input
            v-model="form.name"
            style="width: 220px"
          ></el-input>
        </el-form-item>

        <el-form-item label="软件简称" prop="shortName" label-width="180px">
          <el-input v-model="form.shortName" style="width: 220px"></el-input>
        </el-form-item>

        <el-form-item label="登记号" prop="registerNo" label-width="180px">
          <el-input v-model="form.registerNo" style="width: 220px"></el-input>
        </el-form-item>

        <el-form-item label="分类号" prop="category" label-width="180px">
          <el-input v-model="form.category" style="width: 220px"></el-input>
        </el-form-item>

        <el-form-item label="版本号" prop="versioNo" label-width="180px">
          <el-input v-model="form.versioNo" style="width: 220px"></el-input>
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
// 软件著作接口
import {
  searchSoftwareCr, // 查询
  deleteSoftware, // 删除
  addSoftware, //新增
  exportSoftware, //导出
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
        owner: "",
        publishDate: "",
        registerAperDate: "",
        shortName: "",
        name: "",
        registerNo: "",
        category: "",
        versioNo: "",
      },

      // 导出
      DCDialog: false,
      form2: {
        radio1: "1",
      },

      rules: {
        owner: [{ required: true, message: "不能为空", trigger: "blur" }],
        publishDate: [{ required: true, message: "不能为空", trigger: "blur" }],
        registerAperDate: [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        shortName: [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        registerNo: [{ required: true, message: "不能为空", trigger: "blur" }],
        category: [{ required: true, message: "不能为空", trigger: "blur" }],
        versioNo: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
    };
  },
  methods: {
    getZLData() {
      // if(this.keyNo){
      //   return;
      // }
      this.tableData = [];
      searchSoftwareCr(this.keyNo, this.page.pageNum, this.page.pageSize).then(
        (res) => {
          console.log(res);
          // if (res.code != 200) {
          //   this.$message.error("获取软件著作数据失败！");
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
        }
      );
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
        checkArrId.push(item.RegisterNo);
      }

      console.log(checkArrId);
      deleteSoftware(checkArrId.join()).then((res) => {
        console.log(res);
        if (res.code != 200) {
          this.$message.error("删除软件著作记录失败！");
          return;
        }

        this.$message.success("删除软件著作记录成功！");
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
      // if(new Date(this.form.applicationDate) > new Date(this.form.publicationDate)){
      //   this.$message.error("授权公告日需要大于专利申请日！");
      //   return;
      // }
      this.$refs.zlform.validate((valid) => {
        if (!valid) {
          return;
        }

        addSoftware(this.form).then((res) => {
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
          itemArr.push(item.RegisterNo);
        }
        exportSoftware(itemArr.join()).then((res) => {
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
      } else {
        exportSoftware().then((res) => {
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
  computed: {},
  watch: {
    keyNo() {
      this.getZLData();
    },
  },
};
</script>

<style lang="less" scoped>
.intelle2 {
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

.pageBox {
  margin-top: 20px;
}

.Addtitle {
  font-weight: 600;
  text-align: left;
  margin-bottom: 10px;
}
/deep/.el-table__header,/deep/.el-table__body,/deep/.el-table__footer{
   width: 100%;
   table-layout: fixed !important;
}
</style>