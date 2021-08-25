<template>
  <div class="ppjl">
    <el-card
      ><div class="diyiye">
        <el-row type="flex" class="demo-autocomplete">
          <el-col class="gs" :span="6">{{ userInfo.companyName }}</el-col>
          <el-col :span="10"
            ><el-form label-width="160px">
              <el-form-item label="匹配记录" class="pipei">
                <el-col :span="12">
                  <el-autocomplete
                    :readonly="true"
                    class="inline-input"
                    v-model="state1"
                    :fetch-suggestions="querySearch2"
                    :placeholder="timedate"
                    @select="handleSelect"
                    value-key="createDate"
                    :popper-append-to-body="false" 
                  >
                    <!-- <template slot-scope="{ item }"> 
                      <div>{{ item.createDate }}</div> 
                    </template> -->
                  </el-autocomplete>
                </el-col>
              </el-form-item>
            </el-form></el-col
          >
          <el-col :span="8" class="therrBtn"
            ><el-button
              type="flex"
              class="btn sc"
              size="small"
              @click="dialogVisible = true"
              >删除<i class="el-icon-delete"></i
            ></el-button>
            <el-button
              type="flex"
              class="btn tj"
              size="small"
              @click="dialogVisible4 = true"
              >添加<i class="el-icon-circle-plus-outline"></i
            ></el-button>
            <!-- 有无数据版本3.4 -->
            <el-button
              type="flex"
              class="btn dc"
              size="small"
              @click="dialogVisible1 = true"
              >导出<i class="el-icon-right"></i></el-button
          ></el-col>
        </el-row>
        <el-table
          :data="tableData"
          style="
            width: 100%;
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #333333;
          "
          class="biao"
          :header-cell-style="{
            background: '#E4EEFF',
            color: '#0453FA',
            height: 67,
          }"
          row-key="policyId"
          @select-all="allpublic"
          @selection-change="selectsome"
        >
          <el-table-column type="selection" :reserve-selection="true"> </el-table-column>

          <el-table-column align="center" label="序号" type="index" :index='indexMethod'>
            <!-- <span class="new">new</span> -->
            <!-- 这里new按需求渲染 -->
          </el-table-column>
          <el-table-column align="center" label="项目名称">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" placement="top-start">
                <div slot="content">
                  {{ scope.row.year }}年{{ scope.row.title }}
                </div>
                <div @click="selectpage(scope.row.policyId)">
                  {{ scope.row.year }}年{{ scope.row.title | ellipsisname }}
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="立项部门" align="center" width="180">
            <template slot-scope="scope">
              <div @click="selectpage(scope.row.policyId)">
                {{ scope.row.departmentName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="地区" width="50">
            <template slot-scope="scope">
              <div @click="selectpage(scope.row.policyId)">
                {{ scope.row.areaName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="申报条件">
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                width="500"
                trigger="hover"
                popper-class="popperclass-recode"
                 v-show="scope.row.applicationConditions"
              >
                <div
                  style="min-width:5%"
                  v-html="scope.row.applicationConditions"
                ></div>
                <!-- <el-button slot="reference">hover 激活</el-button> -->
                <div
                  slot="reference"
                  v-html="
                    $options.filters.ellipsis(scope.row.applicationConditions)
                  "
                  @click="selectpage(scope.row.policyId)"
                ></div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column align="center" width="350" label="申报时间">
            <template slot-scope="scope">
              <div
                @click="selectpage(scope.row.policyId)"
                v-if="scope.row.policyBeginTime != null"
              >
                <i class="el-icon-time"></i>
                <!-- timefilters -->
                <span style="margin-left: 10px"
                  >{{ scope.row.policyBeginTime | iosTime }}至{{
                    scope.row.policyEndTime | iosTime
                  }}</span
                >
              </div>
              <div v-else></div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            prop="caozuo"
            width="150px"
          >
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
              @current-change="handleCurrent2Change"
              layout="prev, pager, next, jumper"
              :page-size="10"
              :total="totalpp"
            >
            </el-pagination>
          </div>
        </el-row>
      </div>

      <!-- 对比列表-->
      <div class="estimate">
        <el-card>
          <div class="selectBox">
            <div class="bigTitle">标签对比</div>
            <div class="selectPc">
              批次选择
              <el-select
                :popper-append-to-body="false"
                v-model="batchNo"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                  class="PcSelect"
                >
                </el-option>
              </el-select>
            </div>
          </div>
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
                      :content="item.fillValue | resultIs"
                      placement="top"
                    >
                      <div class="num">{{ item.fillValue | resultIs }}</div>
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
                      <div class="title">{{item.title}}</div>
                    </el-tooltip>
                <!-- <el-popover
                      placement="top-start"
                      width="500"
                      trigger="hover"
                      popper-class="popperclass-recode"
                    >
                      <div>{{item.title}}</div>
                    
                      <div
                        slot="reference"
                      >{{item.title | ellipsishot}}</div>
                    </el-popover> -->

                    <el-tooltip
                      class="item"
                      effect="dark"
                      :content="item.fillValue | resultIs"
                      placement="top"
                    >
                      <div class="num">{{ item.fillValue | resultIs }}</div>
                    </el-tooltip>
                       <!-- <el-popover
                      placement="top-start"
                      width="200"
                      trigger="hover"
                      popper-class="popperclass-recode"
                    >
                      <div>{{ item.fillValue | resultIs }}</div>
                    
                      <div
                        slot="reference"
                      >{{ item.fillValue | resultIs }}</div>
                    </el-popover> -->
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
          <div class="bigTitle1">政策对比</div>
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
                  <el-table-column width="50" type="selection">
                  </el-table-column>
                  <el-table-column label="序号" width="50" type="index">
                  </el-table-column>
                  <el-table-column label="项目名称">
                    <template slot-scope="scope">
                      {{ scope.row.year }}{{ scope.row.title }}
                    </template>
                  </el-table-column>
                  <el-table-column label="立项部门" prop="departmentName">
                  </el-table-column>
                  <el-table-column label="地区" prop="areaName">
                  </el-table-column>
                  <el-table-column label="操作" width="150" prop="caozuo">
                    <template slot-scope="scope">
                      <span
                        @click.stop
                        :class="{
                          immediately: scope.row.status == 1,
                          immed: scope.row.status == 0,
                          immediatelyNo: scope.row.status == 2,
                        }"
                        @click="
                          nowaddurl(scope.row.status, scope.row.declareUrl)
                        "
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
                  <el-table-column width="50" type="selection">
                  </el-table-column>
                  <el-table-column label="序号" width="50" type="index">
                  </el-table-column>
                  <el-table-column label="项目名称">
                    <template slot-scope="scope">
                      {{ scope.row.year }}{{ scope.row.title }}
                    </template>
                  </el-table-column>
                  <el-table-column label="立项部门" prop="departmentName">
                  </el-table-column>
                  <el-table-column label="地区" prop="areaName">
                  </el-table-column>
                  <el-table-column label="操作" width="150" prop="caozuo">
                    <template slot-scope="scope">
                      <span
                        size="mini"
                        @click.stop
                        :class="{
                          immediately: scope.row.status == 1,
                          immed: scope.row.status == 0,
                          immediatelyNo: scope.row.status == 2,
                        }"
                        @click="
                          nowaddurl(scope.row.status, scope.row.declareUrl)
                        "
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
      <!--// 对比列表 -->

      <!-- 弹框在下面 -->
      <div>
        <el-dialog
          :close-on-click-modal="false"
          :visible.sync="dialogVisible"
          width="500px"
          :before-close="handleClose"
        >
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
            <!-- @click="dialogVisible5 = true" -->
            <!-- @click="dialogVisible = false" -->
            <!-- @click="dialogVisible5 = true" -->
          </el-row>
        </el-dialog>
      </div>
      <!-- 删除 -->
      <div>
        <el-dialog
          :close-on-click-modal="false"
          :visible.sync="dialogVisible1"
          width="800px"
          :before-close="handleClose"
        >
          <span slot="title" class="scxm">导出项目</span>
          <el-row type="flex" justify="center">
            <el-col class="xzdcxm" :push="4" :span="12"
              ><span>选择导出项目</span>
            </el-col>
            <el-row type="flex"
              ><el-col :push="0" :span="12">
                <el-radio-group v-model="radio" @change="changeradio">
                  <el-radio label="1"> 导出选中项目</el-radio>
                  <el-radio label="2"> 导出全部</el-radio>
                </el-radio-group>
              </el-col>
            </el-row>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col class="xzdcxm" :push="4" :span="10">
              <span></span>
              <span style="margin-left: -50px; margin-top: 50px"
                >选择导出方式</span
              >
            </el-col>
            <el-row type="flex" class="divradio">
              <el-radio-group v-model="radio2" @change="changeradio">
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
          <el-row type="flex" justify="center" :pull="2"
            ><el-button class="quedingdaochu" @click="DCsubmitBtn"
              >确定导出</el-button
            ></el-row
          >
        </el-dialog>
      </div>
      <!-- 导出 -->
      <div>
        <el-dialog
          :close-on-click-modal="false"
          :visible.sync="dialogVisible2"
          width="600px"
          :before-close="handleClose"
        >
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
        <!-- 导出成功 -->
      </div>
      <div>
        <el-dialog
          :close-on-click-modal="false"
          :visible.sync="dialogVisible3"
          width="60%"
          :before-close="handleClose"
        >
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
      </div>
      <!-- 添加数据无数据版本 -->
      <div>
        <el-dialog
          :close-on-click-modal="false"
          :visible.sync="dialogVisible4"
          width="60%"
          :before-close="handleClose"
        >
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
            <el-table-column align="center" prop="areaName"> </el-table-column>
          </el-table>
          <el-row type="flex" justify="center" style="height: 60px">
            <el-pagination
              @current-change="handleCurrentChange"
              :page-size="5"
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
      <!-- 添加数据有数据版本 -->
      <div>
        <el-dialog
          :close-on-click-modal="false"
          :visible.sync="dialogVisible5"
          width="60%"
          :before-close="handleClose"
        >
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
      <!-- 确定要删除？ -->
    </el-card>
  </div>
</template>

<script>
import {
  labelList,
  recordList,
  PPlabelList,
  PPrecordList,
  generate,
  batchList,
} from "@/utils/total";
import {
  exportPatent, //导出
} from "@/utils/total";
import {
  getBatchList,
  getRecordList,
  addppResult,
  deleterecord,
  getRecordexcl,
  getRecordworld,
} from "@/utils/records.js";
import {
  getpolicy,
  getAreaList,
  getsubscribe,
  deletepolicyId,
} from "@/utils/goverment.js";

// 导入mac冲突的时间格式处理插件
import moments from "moment/moment";

export default {
  name: "record",
  data: function() {
    return {
      tableData: [],
      options: [],
      options1: [],
      options2: [],
      value: "",
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
      restaurants: [],
      state1: "",
      state2: "",
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      title: "",
      queyform: {
        areaCode: "",
        pageNum: 1,
        pageSize: 5,
        title: "",
        year: "",
      },
      yearlist: [
        { id: 2017, year: "2017年" },
        { id: 2018, year: "2018年" },
        { id: 2019, year: "2019年" },
        { id: 2020, year: "2020年" },
        { id: 2021, year: "2021年" },
      ],
      years: "",
      totaltb4: 0,
      area: "",
      multipleSelection: [],
      piciNo: "",
      queryrecord: {
        batchNo: "",
        pageNum: 1,
        pageSize: 10,
      },
      totalpp: 0,
      addform: {
        batchNo: "",
        policyIds: "",
      },
      selectallpublic: [],
      somepublic: [],
      deleteallpublic: "",
      delsomepublic: "",
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
      resjiluList: [],
      matchBatchNo: "",
      estimateBatchNo: "",

      // 批次
      pcListData: [],
      options: [],
      batchNo: "",
      userInfo: {},
      timedate: "",
    };
  },
  created() {
    this.getUserInfo();

    batchList().then((res) => {
      console.log(res);
      if (res.code != 200) {
        // this.$message.error("获取批次号失败！");
        return;
      }

      if (res.data.length != 0) {
        this.pcListData = res.data;
        for (let item of res.data) {
          let arr = {};
          arr.value = item.batchNo;
          arr.label = item.batchNo;
          this.options.push(arr);
        }
        this.batchNo = res.data[0].batchNo;

        this.matchBatchNo = res.data[0].matchBatchNo;
        this.estimateBatchNo = res.data[0].estimateBatchNo;

        this.getData();
      }
    });

    this.gettablePolicy();
  },
  methods: {
    getUserInfo() {
      const userinfo = JSON.parse(localStorage.getItem("userInfo"));
      this.userInfo = userinfo;

      getBatchList().then((res) => {
        this.resjiluList = res.data;
        this.timedate = moments(this.resjiluList[0].createDate).format(
          "YYYY/MM/DD HH:mm:ss"
        );
      });
    },
    querySearch2(queryString, cb) {
      getBatchList(queryString).then((res) => {
        this.resjiluList = res.data;
        for (let i = 0; i < this.resjiluList.length; i++) {
          let times = moments(this.resjiluList[i].createDate).format(
            "YYYY/MM/DD HH:mm:ss"
          );
          this.resjiluList[i].createDate = times;
        }
        var restaurants = this.resjiluList;
        cb(restaurants);
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(this.multipleSelection);
      let ponoar = [];
      this.multipleSelection.forEach((element) => {
        ponoar.push(element.policyId);
      });
      // console.log(,"pici");
      this.addform.batchNo = this.queryrecord.batchNo;
      this.addform.policyIds = ponoar.toString();
    },
    handleCurrent2Change(val) {
      this.queryrecord.pageNum = val;
      getRecordList(this.queryrecord).then((res) => {
        // console.log(res, "批评记录");
        this.tableData = res.rows;
        this.totalpp = res.total;
      });
    },
    // 添加表单查询
    gettablePolicy() {
      // table表格查询
      getpolicy(this.queyform).then((res) => {
        // console.log(res, "地区表格查询");
        this.tableData4 = res.rows;
        this.totaltb4 = res.total;
      });
      // 地区查询
      getAreaList().then((res) => {
        // console.log(res, "地区");
        this.options1 = res.rows;
      });

      // 匹配记录批次查询
      getBatchList().then((res) => {
        console.log(res, "批次查询");
        if (res.data.length == 0) return;
        this.queryrecord.batchNo = res.data[0].batchNo;
        // 匹配记录查询
        getRecordList(this.queryrecord).then((res) => {
          console.log(res, "批评记录");
          this.tableData = res.rows;
          this.totalpp = res.total;
          // console.log(this.totalpp,"toatl1");
        });
      });
    },
    handleClose(done) {
      done();
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
    handleSelect(item) {
      // console.log(item.batchNo);
      this.state1 = item.createDate;
      this.queryrecord.batchNo = item.batchNo;
      getRecordList(this.queryrecord).then((res) => {
        this.tableData = res.rows;
        this.totalpp = res.total;
        // console.log(this.totalpp,"toatl1");
      });
    },
    /////////////////////////////////////////////////
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page.pageNum = val;
      this.getData();
    },
    handleSizeChange1(val) {
      console.log(`每页 ${val} 条`);
      this.page1.pageNum = val;
      this.getData();
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
      addppResult(this.addform).then((res) => {
        console.log(res, "添加");
        if (res.code === 200) {
          this.$message.success("添加成功");
          this.dialogVisible4 = false;
          //  this.multipleSelection=[]
        }
        getRecordList(this.queryrecord).then((res) => {
          // console.log(res,"批评记录");
          this.tableData = res.rows;
          this.totalpp = res.total;
          // console.log(this.totalpp,"toatl1");
        });
      });
    },
    // 选中所有checkbox框
    allpublic(val) {
      console.log(val)
      this.selectallpublic = val;
      // console.log(this.selectallpublic);
      let ponoar = [];
      this.selectallpublic.forEach((element) => {
        ponoar.push(element.matchRecordId);
      });

      this.deleteallpublic = ponoar.toString();
    },
    // 选中部分单选框
    selectsome(val) {
      console.log(val)
      this.selectallpublic = val;
      let ponoar = [];
      
      this.selectallpublic.forEach((element) => {
        ponoar.push(element.matchRecordId);
      });
      // console.log(ponoar);
      this.deleteallpublic = ponoar.toString();
      // console.log(this.deleteallpublic);
    },
    // 确定删除所有选项框
    deletePublic() {
      if (this.selectallpublic.length === 0) {
        this.$message.error("请选择需要删除的记录");
        return;
      }

      // if(this.selectallpublic.length<10){}
      console.log(this.deleteallpublic);
      deleterecord(this.deleteallpublic).then((res) => {
        console.log(res);
        if (res.code === 200) {
          this.$message.success("删除成功");
          this.dialogVisible = false;
          getRecordList(this.queryrecord).then((res) => {
            // console.log(res,"批评记录");
            this.tableData = res.rows;
            this.totalpp = res.total;
            // console.log(this.totalpp,"toatl1");
          });
        }
      });
    },
    // 导出文件
    DCsubmitBtn() {
      if (this.radio === "1") {
        if (this.selectallpublic.length === 0) {
          this.$message.error("请选择需要导出的记录或者选择'全部导出！'");
          return;
        }
        if (this.radio2 === "1") {
          let itemArr = [];
          for (let item of this.selectallpublic) {
            itemArr.push(item.matchRecordId);
          }
          itemArr = itemArr.toString();
          const data = {
            batchNo: this.queryrecord.batchNo,
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
          for (let item of this.selectallpublic) {
            itemArr.push(item.matchRecordId);
          }
          itemArr = itemArr.toString();
          const data = {
            batchNo: this.queryrecord.batchNo,
            matchRecordIds: itemArr,
          };
          getRecordworld(data).then((res) => {
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
            batchNo: this.queryrecord.batchNo,
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
            batchNo: this.queryrecord.batchNo,
            matchRecordIds: "",
          };
          getRecordworld(data2).then((res) => {
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
    changeradio() {
      console.log(this.radio2);
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
        getRecordList(this.queryrecord).then((res) => {
          // console.log(res,"批评记录");
          this.tableData = res.rows;
          this.totalpp = res.total;
          // console.log(this.totalpp,"toatl1");
        });
      });
    },
    // 取消订阅
    QXsubscribe2(id) {
      console.log(id);
      deletepolicyId(id).then((res) => {
        console.log(res);
        getRecordList(this.queryrecord).then((res) => {
          // console.log(res,"批评记录");
          this.tableData = res.rows;
          this.totalpp = res.total;
          // console.log(this.totalpp,"toatl1");
        });
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
    // 二层
    getData() {
      // 预估标签
      labelList(
        this.estimateBatchNo,
        this.matchBatchNo,
        this.page1.pageNum,
        this.page1.pageSize
      ).then((res) => {
        console.log(res, "预估标签");

        this.oneTableDataLeft = res.rows;

        this.page1.total = res.total;
      });

      // 匹配标签
      PPlabelList(
        this.matchBatchNo,
        this.page2.pageNum,
        this.page2.pageSize
      ).then((res) => {
        console.log(res, "匹配标签");

        this.oneTableDataRight = res.rows;

        this.page2.total = res.total;
      });

      // 政策对比---预估
      recordList(
        this.estimateBatchNo,
        this.page3.pageNum,
        this.page3.pageSize
      ).then((res) => {
        console.log(res, "预估对比");
        if (res.code != 200) {
          this.$message.error("获取记录失败！");
          return;
        }

        this.twoTableDataLeft = res.rows;

        this.page3.total = res.total;
      });
      // 政策对比---匹配
      PPrecordList(
        this.matchBatchNo,
        this.page4.pageNum,
        this.page4.pageSize
      ).then((res) => {
        console.log(res, "匹配对比");
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
    // 立即申报
    ljsbClick(val) {
      if (url.indexOf("http") == -1) {
        window.open("https://" + url, "_blank");
      } else {
        window.open(url, "_blank");
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

    // 序号自增
    indexMethod(index) {
      console.log(index);
      let curpage = this.queryrecord.pageNum; //单前页码，具体看组件取值
      let limitpage = 10; //每页条数，具体是组件取值
      return index + 1 + (curpage - 1) * limitpage;
    },
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
  watch: {
    batchNo(val) {
      for (let item of this.pcListData) {
        if (item.batchNo == val) {
          this.matchBatchNo = item.matchBatchNo;
          this.estimateBatchNo = item.estimateBatchNo;

          this.getData();
        }
      }
    },
  },
  // 过滤器过滤时间格式
  filters: {
     ellipsishot(value) {
      if (!value) return "";
     
      if (value.length > 8) {
        return value.slice(0, 8) + "...";
      }
      return value;
    },
    resultIs(val) {
      if (val == "Y") {
        return "是";
      } else if (val == "N") {
        return "否";
      } else {
        return val;
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
    iosTime(val) {
      return moments(val).format("YYYY/MM/DD HH:mm:ss");
    },
    ellipsis(value) {
      if (!value) return "";
      let val = value.replace(/<p>/g, "");
      if (val.length > 10) {
        return val.slice(0, 10) + "...";
      }
      return val;
    },
    ellipsisname(value) {
      if (!value) return "";
      let val = value.replace(/<p>/g, "");
      if (val.length > 7) {
        return val.slice(0, 7) + "...";
      }
      return val;
    },
  },
};
</script>

<style lang="less" scoped>
.ppjl {
  // 你要的样式
  // min-width: 1200px;
  // max-width: 1500px;
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
  height: 80px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 70px;
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
  right: 3% !important;
}
.el-button + .el-button {
  margin-left: 0;
}
.diyiye {
  margin-bottom: 66px;
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
  .subscribe {
    border-top-right-radius: 5%;
    border-bottom-right-radius: 5%;
    background-color: #7a96ed;
  }
}
/deep/.diyiye .el-table td div {
  height: 28px;
  // box-sizing: border-box;
  // white-space: nowrap;
  // text-overflow: ellipsis;
  // overflow: hidden;
  //   p:first-child{
  //   white-space: nowrap!important;
  // text-overflow: ellipsis!important;
  // overflow: hidden!important;
  // }
}

.twoBox .el-table td div {
  white-space: normal;
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

.selectBox {
  // overflow: hidden;
  height: 30px;
  display: flex;
  .bigTitle {
    flex: 1;
    height: 25px;
    font-size: 17px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 25px;
    color: #333333;
  }

  .selectPc {
    flex: 1;
    margin-right: 20%;
    .el-select {
      width: 100px;
      border: 1px solid #4c22da;
      border-radius: 3px;
      color: red;
    }
  }
}
.bigTitle {
  height: 25px;
  font-size: 17px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 25px;
  color: #333333;
  // float: left;
}
.bigTitle1 {
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
  justify-content: space-between;
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
        background-color: #59c1fd;
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
      height: 460px;
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
  width: 100%;
  height: 50px;
  display: flex;
  .page1 {
    width: 0;
    flex: 1;
    text-align: center;
  }

  .page2 {
    width: 0;
    flex: 1;
    text-align: center;
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
.divradio {
  margin-top: 5px;
  padding-left: 38px;
}

/deep/.el-row--flex.is-justify-center {
  padding: 0 125px;
  justify-content: center;
}
/deep/.el-radio {
  padding: 10px 0;
  color: #606266;
  cursor: pointer;
  margin-right: 30px;
}

.therrBtn {
  text-align: right;
}
/deep/.el-table__header,
/deep/.el-table__body,
/deep/.el-table__footer {
  width: 100%;
  table-layout: fixed !important;
}
</style>
<style>
.tooltippopper {
  max-width: 50% !important;
}
</style>
<style lang="less">
.popperclass-recode {
  background-color: #303133 !important;
  color: white !important;
  font-size: 12px !important;
  .el-popper .popper__arrow::after {
  // background-color: #303133;
  border-top-color: #303133 !important;
  border-bottom-color: #303133 !important;
}
}

</style>
