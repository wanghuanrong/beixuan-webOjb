<template>
  <div class="estimate">
    <el-card>
      <div class="diyiye">
        <div class="">
          <el-button
            type="flex"
            class="btn sc"
            size="small"
            @click="dialogVisible = true"
            >删除<i class="el-icon-delete-solid"></i
          ></el-button>
          <el-button
            type="flex"
            class="btn tj"
            size="small"
            @click="dialogVisible4 = true"
            >添加<i class="el-icon-circle-plus-outline"></i
          ></el-button>
          <el-button
            type="flex"
            class="btn dc"
            size="small"
            @click="dialogVisible1 = true"
            >导出<i class="el-icon-right"></i
          ></el-button>
        </div>

        <el-table
          :data="tableData"
          style="
            width: 100%;
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #333333;
          "
          @selection-change="handleSelectionChange1"
          row-key="policyId"
          class="biao"
          :header-cell-style="{
            background: '#E4EEFF',
            color: '#0453FA',
            height: 67,
          }"
        >
          <el-table-column type="selection" :reserve-selection="true"> </el-table-column>

          <el-table-column align="center" label="序号" type="index" :index='indexMethod'>
            <!-- <span class="new">new</span> -->
            <!-- 这里new按需求渲染 -->
          </el-table-column>
          <el-table-column align="center" label="项目名称">
            <template slot-scope="scope">
              <div @click="selectpage(scope.row.policyId)">
                {{ scope.row.title }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="立项部门"
            align="center"
            prop="departmentName"
          >
          </el-table-column>
          <el-table-column align="center" label="地区" prop="areaName">
          </el-table-column>
          <el-table-column align="center" label="申报条件">
            <template slot-scope="scope">
              <div v-html="scope.row.applicationConditions"></div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="申报时间">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px"
                >{{ scope.row.policyBeginTime | timefilters }}--{{
                  scope.row.policyEndTime | timefilters
                }}</span
              >
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" prop="caozuo" width="150px">
            <template slot-scope="scope">
              <div class="btnsds">
                <div class="btnss">
                  <span
                    :class="{
                      immediately: scope.row.status == 1,
                      immed: scope.row.status == 0,
                      immediatelyNo: scope.row.status == 2,
                    }"
                    @click="nowaddurl(scope.row.status, scope.row.declareUrl)"
                    >{{ scope.row.status | SbStatus }}</span
                  >
                  <span
                    :class="
                      scope.row.subscrip === 0 ? 'subscribe' : 'onsubscribe'
                    "
                    @click="
                      scope.row.subscrip == 0
                        ? subscribe2(scope.row.policyId)
                        : QXsubscribe2(scope.row.policyId)
                    "
                    >{{ scope.row.subscrip === 0 ? "订阅" : "已订阅" }}</span
                  >
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row type="flex" justify="center" style="height: 60px">
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange1"
              :current-page.sync="page.pageNum"
              :page-size="page.pageSize"
              layout="prev, pager, next, jumper"
              :total="page.total"
            >
            </el-pagination>
          </div>
        </el-row>

        <div>
          <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" width="40%">
            <span slot="title" class="scxm">删除项目</span>
            <el-row type="flex" justify="center">
              <span class="diaxinxi">
                <el-alert
                  :closable="false"
                  title="确定要删除选中项目吗？"
                  type="warning"
                  show-icon
                ></el-alert>
              </span>
            </el-row>
            <el-row type="flex" justify="space-around"
              ><el-button @click="dialogVisible = false" class="quxiao"
                >取 消</el-button
              >
              <el-button type="primary" @click="deletePublic" class="queding"
                >确 定</el-button
              >
            </el-row>
          </el-dialog>
        </div>

        <div>
          <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible1" width="40%">
            <span slot="title" class="scxm">导出项目</span>
            <el-row type="flex" justify="center">
              <el-col class="xzdcxm" :push="4" :span="12"
                ><span>选择导出项目</span>
              </el-col>
              <el-row type="flex"
                ><el-col :push="0" :span="12"
                  ><el-radio v-model="radio" label="1"> 导出选中项目</el-radio>
                  <el-radio v-model="radio" label="2"> 导出全部</el-radio>
                </el-col>
              </el-row> </el-row
            ><el-row type="flex" justify="center"> </el-row>
            <el-row type="flex" justify="center">
              <el-col class="xzdcxm" :push="4" :span="10">
                <span></span>
                <span style="margin-left: -60px; margin-top: 50px"
                  >选择导出方式</span
                >
              </el-col>
              <el-row type="flex" class="divradio">
                <el-radio-group v-model="radio2">
                  <el-radio label="1">
                    <img
                      src="@/assets/indexlogo/excl.png"
                      alt=""
                      style="vertical-align: middle"
                  /></el-radio>
                  <el-radio label="2">
                    <img
                      src="@/assets/indexlogo/word.png"
                      alt=""
                      style="vertical-align: middle"
                  /></el-radio>
                </el-radio-group>
              </el-row>
            </el-row>
            <el-row>
              <el-col :span="12"></el-col>
            </el-row>
            <el-row type="flex" justify="center" :pull="2"
              ><el-button class="quedingdaochu" @click="DCsubmitBtn"
                >确定导出</el-button
              ></el-row
            >
          </el-dialog>
        </div>

        <!-- 导出 -->
        <div>
          <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible2" width="40%">
            <span slot="title" class="scxm">选择导出项目</span>
            <el-alert
              type="success"
              :closable="false"
              center
              show-icon
              class="cgtb"
            >
            </el-alert>
            <el-row type="flex" justify="center">恭喜你项目导出成功！</el-row>
          </el-dialog>
        </div>

        <!-- 添加 -->
        <!-- <div>
          <el-dialog :visible.sync="dialogVisible3" width="35%">
            <span slot="title" class="scxm">添加项目</span>
            <el-input
              placeholder="请输入内容"
              v-model="title"
              class="input-with-select"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                class="iconfont"
                style="height: 30px !important"
              ></el-button>
            </el-input>
            <el-table :data="tableData3" style="width: 100%; margin: 0 auto">
              <el-table-column prop="date" label="项目名称"> </el-table-column>
              <el-table-column prop="name" label="地区"> </el-table-column>
            </el-table>
          </el-dialog>
        </div> -->

        <!-- 添加数据无数据版本 -->
        <div>
          <el-dialog  :close-on-click-modal="false" :visible.sync="dialogVisible4" width="40%">
            <span slot="title" class="scxm">添加项目</span>
            <el-input
              v-model="area"
              placeholder="请输入项目名称"
              class="input-with-select"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="selectarea"
              ></el-button>
            </el-input>
            <el-form label-width="80px">
              <el-row type="flex" justify="center">
                <el-form-item label="地区" class="pipei1">
                  <el-select
                  :popper-append-to-body="false"
                    v-model="value"
                    clearable
                    placeholder="请选择活动区域"
                    @change="changearea"
                  >
                    <el-option
                      v-for="item in options1"
                      :key="item.areaCode"
                      :label="item.areaName"
                      :value="item.areaCode"
                      class="inp"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="年度" class="pipei1">
                  <el-select
                  :popper-append-to-body="false"
                    v-model="years"
                    clearable
                    placeholder="请选择活动区域"
                    @change="changeyear"
                  >
                    <el-option
                      v-for="item in yearlist"
                      :key="item.id"
                      :label="item.year"
                      :value="item.id"
                      class="inp"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-row>
            </el-form>

            <el-table
              :data="tableData4"
              @selection-change="handleSelectionChange"
              :show-header="false"
              style="width: 100%"
            >
              <el-table-column type="selection"> </el-table-column>
              <el-table-column align="center" prop="title"> </el-table-column>
              <el-table-column align="center" prop="areaName">
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="center" style="height: 60px">
              <el-pagination
                @current-change="handleCurrentChange"
                :page-size="10"
                layout="prev, pager, next, jumper"
                :total="totaltb4"
              >
              </el-pagination>
            </el-row>
            <el-row type="flex" justify="center" :pull="2"
              ><el-button class="quedingdaochu" @click="addpublick"
                >确定添加</el-button
              ></el-row
            >
          </el-dialog>
        </div>

        <div>
          <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible5" width="40%">
            <span slot="title" class="scxm">删除对比记录</span>
            <el-row type="flex" justify="center">
              <span class="diaxinxi">
                <el-alert
                  :closable="false"
                  title="确定要删除全部对比记录吗？"
                  type="warning"
                  show-icon
                ></el-alert>
              </span>
            </el-row>
            <el-row type="flex" justify="center"
              ><el-button @click="dialogVisible5 = false" class="quxiao"
                >取 消</el-button
              >
              <el-button
                type="primary"
                @click="dialogVisible = false"
                class="queding"
                >确 定</el-button
              ></el-row
            >
          </el-dialog>
        </div>
      </div>
    </el-card>

    <div class="foot">
      <div class="footLeft">
        <div class="title">获取资助额度与更准确的申报方案请进行二阶匹配</div>
        <div
          class="btn"
          @click="pathClick"
        >
          进入二阶匹配
        </div>
      </div>
      <div class="footRight">
        <div class="title">获取资助额度与更准确的申报方案请进行三阶匹配</div>
        <div class="btn">进入三阶匹配</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  exportPatent, //导出
} from "@/utils/total";
import { recordList } from "@/utils/match.js";
import {
  getBatchList,
  getRecordList,
  addppResult,
  deleterecord,
  getRecordworld,
  getRecordexcl,
} from "@/utils/records.js";

import {
  getpolicy,
  getAreaList,
  getsubscribe,
  deletepolicyId,
} from "@/utils/goverment.js";
export default {
  created() {
    this.gettablePolicy();

    getAreaList().then((res) => {
      // console.log(res, "地区");
      this.options1 = res.rows;
    });

    getpolicy(this.queyform).then((res) => {
      // console.log(res, "地区表格查询");
      this.tableData4 = res.rows;
      this.totaltb4 = res.total;
    });

    // 匹配记录批次查询
    // getBatchList().then((res) => {
    //   this.queryrecord.batchNo = res.data[0].batchNo;
    //   // 匹配记录查询
    //   getRecordList(this.queryrecord).then((res) => {
    //     console.log(res,"批评记录");
    //     this.tableData = res.rows;
    //     this.totalpp = res.total;
    //     // console.log(this.totalpp,"toatl1");
    //   });
    // });
  },
  data() {
    return {
      tableData: [],
      multipleSelection1: [],
      page: {
        pageNum: 1,
        pageSize: 10,
        total: 10,
      },

      multipleSelection: [],

      // 删除，添加、导出弹窗
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      dialogVisible4: false,
      dialogVisible5: false,

      radio: "1",
      radio2: "1",

      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],

      value: "",
      totaltb4: 0,
      options1: [],

      yearlist: [
        { id: 2017, year: "2017年" },
        { id: 2018, year: "2018年" },
        { id: 2019, year: "2019年" },
        { id: 2020, year: "2020年" },
        { id: 2021, year: "2021年" },
      ],

      queyform: {
        areaCode: "",
        pageNum: 1,
        pageSize: 5,
        title: "",
        year: "",
      },

      area: "",
      years: "",
      title: "",

      addform: {
        batchNo: "",
        policyIds: "",
      },
    };
  },
  methods: {
    // 获取数据
    gettablePolicy() {
      getRecordList(
        {batchNo : this.$route.query.code,
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize}
      ).then((res) => {
        console.log(res);
        this.tableData = res.rows;
        this.page.total = res.total;
      });
    },

    // 总表选中事件
    handleSelectionChange1(val) {
      this.multipleSelection1 = val;
    },
    // 添加表选中事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 翻页
    handleSizeChange(val) {
      console.log(val);
      this.page.pageNum = val;
      this.gettablePolicy();
    },
    handleCurrentChange1(val) {
      console.log(val);
      this.page.pageNum = val;
      this.gettablePolicy();
    },

    // 删除
    deletePublic() {
      let ArrList = [];
      for (let item of this.multipleSelection1) {
        ArrList.push(item.matchRecordId);
      }

      console.log(ArrList.join());
      deleterecord(ArrList.join()).then((res) => {
        console.log(res);
        if (res.code != 200) {
          this.$message.error("删除失败！");
          return;
        }

        this.$message.success("删除成功");
        this.gettablePolicy();
        this.dialogVisible = false;
      });
    },

    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return [
        { value: "2020-12-7   14：12", address: "上海市长宁区金钟路633号" },
      ];
    },

    handleCurrentChange(val) {
      this.queyform.pageNum = val;
      getpolicy(this.queyform).then((res) => {
        // console.log(res,"地区表格查询");
        this.tableData4 = res.rows;
        this.totaltb4 = res.total;
      });
    },
    changearea() {
      this.queyform.areaCode = this.value;
      getpolicy(this.queyform).then((res) => {
        // console.log(res,"地区表格查询");
        this.tableData4 = res.rows;
        this.totaltb4 = res.total;
      });
    },
    changeyear() {
      this.queyform.year = this.years;
      getpolicy(this.queyform).then((res) => {
        // console.log(res,"地区表格查询");
        this.tableData4 = res.rows;
        this.totaltb4 = res.total;
      });
    },
    selectarea() {
      // console.log(this.area);
      this.queyform.title = this.area;
      getpolicy(this.queyform).then((res) => {
        // console.log(res,"地区表格查询");
        this.tableData4 = res.rows;
        this.totaltb4 = res.total;
      });
    },
    addpublick() {
      let ArrList = [];
      for (let item of this.multipleSelection) {
        ArrList.push(item.policyId);
      }
      this.addform.batchNo = this.$route.query.code;
      this.addform.policyIds = ArrList.join();
      addppResult(this.addform).then((res) => {
        console.log(res, "添加");
        if (res.code != 200) {
          this.$message.error("添加失败！");
          return;
        }

        this.$message.success("添加成功！");
        this.gettablePolicy();

        this.dialogVisible4 = false;
      });
    },
    // 导出文件
    DCsubmitBtn() {
      if (this.radio === "1") {
        if (this.multipleSelection1.length === 0) {
          this.$message.error("请选择需要导出的记录或者选择'全部导出！'");
          return;
        }
        if (this.radio2 === "1") {
          let itemArr = [];
          for (let item of this.multipleSelection1) {
            itemArr.push(item.matchRecordId);
          }
          itemArr = itemArr.toString();
          const data = {
            batchNo: this.$route.query.code,
            matchRecordIds: itemArr,
          };
          getRecordexcl(data).then((res) => {
            console.log(res, "res结果");
            if (res.code != 200) return this.$message.error("下载失败");
            this.$message.success("导出数据成功！");
            window.location.href =
              this.$http +
              "/common/download?fileName=" +
              encodeURI(res.msg) +
              "&delete=" +
              true;
          });
        } else {
          let itemArr = [];
          for (let item of this.multipleSelection1) {
            itemArr.push(item.matchRecordId);
          }
          itemArr = itemArr.toString();
          const data = {
            batchNo: this.$route.query.code,
            matchRecordIds: itemArr,
          };
          getRecordworld(data).then((res) => {
            console.log(res);
            if (res.code != 200) return this.$message.error("下载失败");
            this.$message.success("导出数据成功！");
            window.location.href =
              this.$http +
              "/common/download?fileName=" +
              encodeURI(res.msg) +
              "&delete=" +
              true;
          });
        }
        // getRecordexcl()
      } else {
        if (this.radio2 === "1") {
          const data2 = {
            batchNo: this.$route.query.code,
            matchRecordIds: "",
          };
          getRecordexcl(data2).then((res) => {
            console.log(res, "res结果");
            this.$message.success("导出数据成功！");
            window.location.href =
              this.$http +
              "/common/download?fileName=" +
              encodeURI(res.msg) +
              "&delete=" +
              true;
          });
        } else {
          const data2 = {
            batchNo: this.$route.query.code,
            matchRecordIds: "",
          };
          getRecordworld(data2).then((res) => {
            console.log(res);
            console.log(res, "res结果");
            this.$message.success("导出数据成功！");
            window.location.href =
              this.$http +
              "/common/download?fileName=" +
              encodeURI(res.msg) +
              "&delete=" +
              true;
          });
        }
      }
    },
    // 项目详情跳转
    selectpage(id) {
      this.$router.push({ path: "policydetails", query: { id: id } });
      // console.log(id);
    },
    // 立即订阅
    subscribe2(id) {
      console.log(id);
      getsubscribe(id).then((res) => {
        console.log(res);
        this.gettablePolicy();
      });
    },
    // 取消订阅
    QXsubscribe2(id) {
      console.log(id);
      deletepolicyId(id).then((res) => {
        console.log(res);
        this.gettablePolicy();
      });
    },
    nowaddurl(status, url) {
      if (status == 1) {
        if (url.indexOf("http") == -1) {
          window.open("https://" + url, "_blank");
        } else {
          window.open(url, "_blank");
        }
      }
    },

    // 匹配跳转
    pathClick(){
      this.$emit("pathClick");
      this.$router.push('/backhome/policymanage/estimate');
    },


    // 序号自增
    indexMethod(index) {
      let curpage = this.page.pageNum; //单前页码，具体看组件取值
      let limitpage = this.page.pageSize; //每页条数，具体是组件取值
      return index + 1 + (curpage - 1) * limitpage;
    },
  },
  // 过滤器过滤时间格式
  filters: {
    timefilters(val) {
      if (val == null || val == "") {
        return "";
      } else {
        let d = new Date(val); //val 为表格内取到的后台时间
        let month =
          d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
        let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
        let hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
        let min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
        let sec = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
        let times = d.getFullYear() + "-" + month + "-" + day;
        return times;
      }
    },
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

<style lang="less" scoped>
.ppjl {
  // 你要的样式
  min-width: 1200px;
  max-width: 1500px;
  padding: 20px;
}
.gs {
  height: 21px;
  opacity: 1;
  color: #256bff;
  font-weight: bold;
  font-family: Microsoft YaHei;
  line-height: 41px;
  font-size: 16px;
}
.inp {
  height: 32px;
  background: #ffffff;

  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0);
  opacity: 1;
  border-radius: 2px;
}
.pipei {
  height: 19px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 19px;
  color: #333333;
  opacity: 1;
}
.pipei1 {
  height: 19px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 19px;
  color: #333333;
  opacity: 1;
  margin-top: 20px;
}
.sc {
  width: 80px;
  //  height: 30px;
  background: #f47e7e;
  opacity: 1;
  border-radius: 4px;
  // line-height: 30px;
  // text-align: center;
  color: #fff;
}
.tj {
  width: 80px;

  background: #7a96ed;
  opacity: 1;
  border-radius: 4px;
  color: #fff;
}
.dc {
  width: 80px;

  background: #70b959;
  opacity: 1;
  border-radius: 4px;
  color: #fff;
}

.biao {
  // background: #e4eeff;
  // 不知道怎么表头上涩
  margin-top: 38px;
}
.ljsb {
  background: #fb963e;
  color: #fff;
}
.dy {
  background: #7a96ed;
  color: #fff;
}
.el-icon-time {
  color: #5088ff;
}
// 下面本来只想该表头结果表单也影响了

.dbjl {
  height: 21px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 21px;
  color: #333333;
  opacity: 1;
}
.pcxz {
  height: 91px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 21px;
  color: #333333;
  opacity: 1;
}
.yjpp {
  width: 104px;
  height: 37px;
  background: #7a96ed;
  opacity: 1;
  border-radius: 4px;
  color: #fff;
}
.ejpp {
  width: 104px;
  height: 37px;
  background: #59c1fd;
  opacity: 1;
  border-radius: 4px;
  color: #fff;
}
.yjppzc {
  height: 19px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 19px;
  color: #256bff;
  opacity: 1;
}
.ejppzc {
  height: 19px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 19px;
  color: #256bff;
  opacity: 1;
}
.dkf {
  width: 65px;
  background: rgba(251, 150, 62, 0.3);
  color: #fff;
}
// /deep/.el-table td,
// .el-table th {
//   padding: 0px 0px;
// }

/deep/.el-dialog__header {
  height: 20px;
  background-color: #417eff;
  opacity: 1;
  border-radius: 4px 4px 0px 0px;
  color: #fff;

  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 21px;
  color: #ffffff;
  opacity: 1;
}
/deep/.el-dialog__close {
  color: #fff;
}
.quxiao {
  width: 100px;
  height: 40px;
  background: #dcdcdc;
  opacity: 1;
  border-radius: 4px;
  color: #fff;
}
.queding {
  width: 100px;
  height: 40px;
  background: #256bff;
  opacity: 1;
  border-radius: 4px;
  color: #fff;
  margin-left: 112px;
}
.quedingdaochu {
  width: 100px;
  height: 40px;
  background: #256bff;
  opacity: 1;
  border-radius: 4px;
  color: #fff;
}
.diaxinxi {
  height: 100px;
}
/deep/.el-alert__title {
  color: #000000;
  background-color: #fff;
}
/deep/.el-alert {
  background-color: #fff;
}
.xzdcxm {
  height: 100px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 21px;
  color: #0453fa;
  opacity: 1;
}
/deep/.cgtb {
  font-size: 50px;
  color: #23b899ff;
}
/deep/.el-input-group__append button.el-button,
.el-input-group__append div.el-select .el-input__inner,
.el-input-group__append div.el-select:hover .el-input__inner,
.el-input-group__prepend button.el-button,
.el-input-group__prepend div.el-select .el-input__inner,
.el-input-group__prepend div.el-select:hover .el-input__inner {
  color: #fff;
  background-color: #417eff;
}
.new {
  width: 32px;
  height: 16px;
  background: #fb6d6d;
  opacity: 1;
  border-radius: 8px;
  color: #fff;
}
/deep/.el-table > .success-row td {
  background: #e4eeff !important;
}
/deep/.el-table/deep/thead > tr:first-child th {
  background: rgb(240, 240, 240) !important;
}
/deep/.el-table/deep/thead > tr:last-child th {
  background-color: #e4eeff !important;
  height: 69px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #0453fa;
  text-align: center;
}
.inline-input {
  width: 284px;
  height: 32px;
  background: #ffffff;

  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0);
  opacity: 1;
  border-radius: 2px;
}
.el-col-push-3 {
  left: 10.5%;
}
.el-button + .el-button {
  margin-left: 0;
}
.diyiye {
  margin-bottom: 66px;
  min-height: 500px;
}
.el-pagination {
  padding-top: 20px;
}
/deep/ .el-dialog__header {
  height: 50px;
}
.btn {
  margin-right: 20px;
}
.btnsds {
  position: relative;
  // width: 150px;
  // margin: 0 auto;
  span {
    display: block;
    float: left;
    width: 60px;
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
  .subscribe {
    border-top-right-radius: 5%;
    border-bottom-right-radius: 5%;
    background-color: #7a96ed;
  }
}
/deep/.el-table td div {
  height: 28px;
  box-sizing: border-box;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
/deep/.el-input__inner {
  height: 32px;
  line-height: 32px;
}
/deep/.el-table__body,
.el-table__footer,
.el-table__header {
  margin: 0 auto;
}
/deep/.el-table .cell:first-child {
  cursor: pointer;
}
.onsubscribe {
  background-color: #d2dcfa;
  color: white;
}

.foot {
  margin-top: 20px;
  width: 100%;
  display: flex;
  height: 150px;
  .footLeft {
    flex: 1;
    background-image: url("../../../../assets/enter/two.png");
    background-size: 100% 100%;
    background-color: #283890;
    .title {
      margin: 50px 0 30px 0;
      text-align: center;
      color: white;
    }
    .btn {
      width: 120px;
      height: 40px;
      background-color: white;
      color: #256bff;
      text-align: center;
      line-height: 40px;
      margin: auto;
      cursor: pointer;
    }
  }
  .footRight {
    flex: 1;
    margin-left: 20px;
    background-image: url("../../../../assets/enter/three.png");
    background-size: 100% 100%;
    background-color: #256e9c;
    .title {
      margin: 50px 0 30px 0;
      text-align: center;
      color: white;
    }
    .btn {
      width: 120px;
      height: 40px;
      background-color: white;
      color: #256bff;
      text-align: center;
      line-height: 40px;
      margin: auto;
    }
  }
}

.btnss {
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