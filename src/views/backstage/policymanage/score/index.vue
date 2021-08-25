<template>
  <div class="score">
    <el-card>
      <h1 class="scoretop scoretop2">基本信息</h1>
      <!-- 表单信息 -->
      <el-form
        :model="addForm"
        :rules="rules"
        ref="addForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 公司名称 成立时间 -->
        <el-form-item class="toptime topw">
          <el-col :span="6">
            <el-form-item>
              <template slot="label">
                <span style="color:red">*</span>公司名称</template
              >
              <el-input style="width: 218px" v-model.trim="addForm.name">{{
                getform.company
              }}</el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" class="zhong">
            <el-form-item>
              <template slot="label">
                <span style="color:red">*</span>成立时间</template
              >
              <el-date-picker
                type="date"
                @change="changedate"
                placeholder="*选择日期"
                style="width: 218px"
                v-model="addForm.date1"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                >{{ getform.registerTime }}</el-date-picker
              >
            </el-form-item>
          </el-col>
        </el-form-item>
        <!-- 公司名称 成立时间 -->

        <!-- 技术领域-->
        <el-form-item class="toptime topw ">
          <el-col :span="6">
            <el-form-item>
              <template slot="label">
                <span style="color:red">*</span>技术领域</template
              >
              <el-select
                :popper-append-to-body="false"
                v-model="value1"
                placeholder="请选择技术领域"
                @change="handleChangeOne"
                style="width:218px;"
              >
                <el-option
                  v-for="item in datalist"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" class="zhong">
            <el-form-item id="dialo">
              <template slot="label">
                <span style="color:red">*</span>技术行业</template
              >
              <el-cascader
                :append-to-body="false"
                style="width: 218px"
                v-model="value"
                :options="options"
                :placeholder="this.optionss"
                @change="handleChange"
                :key="ishowce"
              ></el-cascader>
            </el-form-item>
          </el-col>
        </el-form-item>
        <!-- //技术领域-->

        <!-- 是否违法 -->
        <el-form-item class="topw labletxt">
          <template :slot-scope="lable">
            <span class="isillegal">
              <span style="color:red">*</span>近两年是否有行政处罚
              <i>(消防、安监、环保)：</i>
            </span>
          </template>
          <el-radio-group v-model="addForm.resource" @change="chufa">
            <el-radio style="margin-right: 30px" :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 是否违法 -->

        <!-- 人力资源情况 -->
        <h1 class="scoretop styleh">人力资源情况</h1>

        <el-form-item class="topww">
          <el-row type="flex" justify="space-between" align="top">
            <el-col :span="6">
              <el-form-item>
                <template :slot-scope="lable">
                  <span
                    style="
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        word-break: keep-all;
                        margin-left: -5px;
                      "
                    ><span style="color:red">*</span>职工人数
                  </span>
                </template>
                <el-input
                  maxlength="10"
                  :style="{ width: '218px' }"
                  onkeyup="value=value.replace(/[^\d]/g,'')"
                  v-model.trim="addForm.worker"
                  class="inputH"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <template :slot-scope="lable"
                  ><span
                    style="
                        margin-right:7px;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        word-break: keep-all;
                        margin-left: -65px;
                      "
                  >
                    <span style="color:red">*</span>
                    科技人员数量
                  </span></template
                >
                <el-input
                  v-model.trim="addForm.scienceworker"
                  onkeyup="value=value.replace(/[^\d]/g,'')"
                  @blur="testyanfa"
                  :style="{ width: '218px' }"
                  maxlength="10"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item class="wdth">
                <template :slot-scope="lable">
                  <span
                    style="
                        margin-right:7px;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        word-break: keep-all;
                        margin-left: -90px;
                      "
                    ><span style="color:red">*</span
                    >本科及本科以上学历数量</span
                  >
                </template>
                <el-input
                  v-model.trim="addForm.undergraduate"
                  onkeyup="value=value.replace(/[^\d]/g,'')"
                  :style="{ width: '218px' }"
                  maxlength="10"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>

        <!-- 人力资源情况 -->

        <!-- 技术先进程度 -->
        <h1 class="scoretop styleh" style="margin-bottom: 45px">知识产权</h1>
        <h3>技术的先进程度</h3>
        <el-form-item class="topw labletxt">
          <el-radio-group v-model="addForm.skill">
            <el-radio :label="4">高</el-radio>
            <el-radio :label="3" style="margin-left: 80px">较高</el-radio>
            <el-radio :label="2" style="margin-left: 80px">一般</el-radio>
            <el-radio :label="1" style="margin-left: 80px">较低</el-radio>
            <el-radio :label="0" style="margin-left: 80px">无</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 技术先进程度 -->

        <!-- 发挥作用 -->
        <h3>对主要产品（服务）在技术上发挥核心支持作用</h3>
        <el-form-item class="topw labletxt">
          <el-radio-group v-model="addForm.effect">
            <el-radio :label="4">高</el-radio>
            <el-radio :label="3" style="margin-left: 80px">较高</el-radio>
            <el-radio :label="2" style="margin-left: 80px">一般</el-radio>
            <el-radio :label="1" style="margin-left: 80px">较低</el-radio>
            <el-radio :label="0" style="margin-left: 80px">无</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 发挥作用 -->

        <!-- 知识产权数量 -->
        <h3>知识产权数量</h3>
        <el-form-item class="topw labletxt">
          <el-radio-group v-model="addForm.type">
            <el-radio :label="4">1项及以上（I类）</el-radio>
            <el-radio :label="3" style="margin-left: 80px"
              >5项及以上（II类）</el-radio
            >
            <el-radio :label="2" style="margin-left: 80px"
              >3-4项（II类）</el-radio
            >
            <el-radio :label="1" style="margin-left: 80px"
              >1-2项（II类）</el-radio
            >
            <el-radio :label="0" style="margin-left: 80px">0项</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 知识产权数量 -->

        <!-- 产权获得方式 -->
        <h3>产权获得方式</h3>
        <el-form-item class="topw labletxt">
          <!-- @change="changeGetway" -->
          <el-radio-group v-model="addForm.property">
            <el-radio :label="1">有自主研发</el-radio>
            <el-radio :label="0" style="margin-left: 80px"
              >仅有受让、受赠和并购等</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <!-- 产权获得方式 -->

        <!-- 企业参与编制国家标准、行业标准、检测方法、技术规范 -->
        <h3>企业参与编制国家标准、行业标准、检测方法、技术规范</h3>
        <el-form-item class="topw labletxt">
          <!-- @change="changestand" -->
          <el-radio-group v-model="addForm.joingj">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0" style="margin-left: 80px">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 产权获得方式 -->

        <!-- 科技成果转换能力 -->
        <h1 class="scoretop styleh" style="margin-top: 40px">
          科技成果转换能力
        </h1>
        <el-form-item class="topw labletxt">
          <!-- @change="changeconver" -->
          <el-radio-group v-model="addForm.conversion" style="margin-top: 20px">
            <el-radio :label="5">转化能力强，≥5项</el-radio>
            <el-radio :label="4" style="margin-left: 50px"
              >转化能力较强，≥4项</el-radio
            >
            <el-radio :label="3" style="margin-left: 50px"
              >转化能力一般，≥3项</el-radio
            >
            <el-radio :label="2" style="margin-left: 50px"
              >转化能力较弱，≥2项</el-radio
            >
            <el-radio :label="1" style="margin-left: 50px"
              >转化能力弱，≥1项</el-radio
            >
            <el-radio :label="0" style="margin-left: 50px"
              >转化能力无，0项</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <!-- 科技成果转换能力 -->

        <!-- 研究开发组织管理水平 -->
        <h1 class="scoretop styleh" style="padding-top: 10px">
          研究开发组织管理水平
        </h1>
        <el-form-item class="topw labletxt" style="padding-top: 20px">
          <template :slot-scope="lable">
            <span class="isillegal"> 是否开展产学研合作： </span>
          </template>
          <el-radio-group v-model="addForm.research">
            <!-- @change="changeresearch" -->
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0" style="margin-left: 84px">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 研究开发组织管理水平 -->

        <h1 class="scoretop styleh" style="margin-top: 40px">近三年财务情况</h1>
        <!-- 资产,收入,研发费用状况 -->
        <el-form-item class="topw labletxt money">
          <template :slot-scope="lable">
            <span
              class="moneyspan"
              style="
                float: left;
                line-hight: 40px;
                margin-top: 5px;
                padding-right: 19px;
              "
            >
              净资产（万元）
            </span>
          </template>
          <el-col :span="7">
            <el-form-item>
              <el-input
                v-model="firstast"
                placeholder="请输入2018年的净资产"
                style="width: 300px"
                class="inputH"
                onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                maxlength="10"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item>
              <el-input
                v-model="secontast"
                placeholder="请输入2019年的净资产"
                style="width: 300px"
                onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                class="inputH"
                maxlength="10"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item>
              <el-input
                v-model="thirdast"
                placeholder="请输入2020年的净资产"
                style="width: 300px"
                onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                class="inputH"
                maxlength="10"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <!-- 资产,收入,研发费用状况 -->

        <!-- 资产,收入,研发费用状况 -->
        <el-form-item class="topw labletxt money">
          <template :slot-scope="lable">
            <span
              class="moneyspan"
              style="
                float: left;
                line-hight: 40px;
                margin-top: 5px;
                padding-right: 5px;
              "
            >
              &nbsp;销售收入（万元）
            </span>
          </template>
          <el-col :span="7">
            <el-form-item>
              <el-input
                v-model="firsIncome"
                placeholder="请输入2018年销售收入"
                style="width: 300px"
                class="inputH"
                onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                maxlength="10"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item>
              <el-input
                v-model="secontIncome"
                placeholder="请输入2019年销售收入"
                style="width: 300px"
                class="inputH"
                onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                maxlength="10"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item>
              <el-input
                v-model="thirdIncome"
                placeholder="请输入2020年销售收入"
                style="width: 300px"
                class="inputH"
                onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                maxlength="10"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <!-- 资产,收入,研发费用状况 -->

        <!-- 资产,收入,研发费用状况 -->
        <el-form-item class="topw labletxt money">
          <template :slot-scope="lable">
            <span
              class="moneyspan"
              style="
                float: left;
                line-hight: 40px;
                margin-top: 5px;
                padding-right: 5px;
              "
            >
              研发费用（万元）
            </span>
          </template>
          <el-col :span="7">
            <el-form-item>
              <el-input
                v-model="firsDev"
                placeholder="请输入2018年研发费用"
                style="width: 300px"
                class="inputH"
                  maxlength="10"
                onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item>
              <el-input
                v-model="secontDev"
                placeholder="请输入2019年研发费用"
                style="width: 300px"
                class="inputH"
                  maxlength="10"
                onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item>
              <el-input
                v-model="thirdDev"
                placeholder="请输入2020年研发费用"
                style="width: 300px"
                class="inputH"
                  maxlength="10"
                onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                @blur="bluryanfa"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <!-- 资产,收入,研发费用状况 -->
        <el-form-item style="margin-left:40%;">
          <el-button type="primary" @click="submitForm('addForm')"
            >确定</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <!-- //表单 -->
  </div>
</template>

<script>
import { addAdminAp, getAdmin } from "@/utils/register";
export default {
  data() {
    return {
      isResouceShow: 0,
      addForm: {
        name: "",
        industry: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: 0,
        resource: "",
        desc: "",
        sonindustry: "",
        worker: "",
        scienceworker: "",
        undergraduate: "",
        skill: 0,
        effect: 0,
        property: 0,
        joingj: 0,
        research: 0,
        assets: "",
        Income: "",
        development: "",
        conversion: 0,
      },
      getform: {},
      arrAssets: [],
      arrIncome: [],
      arrDevelopment: [],
      firstast: "",
      secontast: "",
      thirdast: "",
      firsIncome: "",
      secontIncome: "",
      thirdIncome: "",
      firsDev: "",
      secontDev: "",
      thirdDev: "",
      value: [],
      options: [],
      optionss: "",
      value1: "",
      formresource: "",
      FindustryOne: "",
      FindustryTwo: "",
      rules: {
        name: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        "value1.label": [
          { required: true, message: "请选择技术领域", trigger: "change " },
        ],
        value: [
          { required: true, message: "请选择技术子领域", trigger: "blur" },
        ],
        "addForm.date1": [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        type: [{ required: true, message: "请选择一项", trigger: "change" }],
        resource: [
          { required: true, message: "请选择是否违法", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
        worker: [
          { required: true, message: "请输入职工人数", trigger: "blur" },
        ],
        scienceworker: [
          { required: true, message: "请输入科研人员数量", trigger: "blur" },
        ],
        undergraduate: [
          {
            required: true,
            message: "请输入本科学历及以上数量",
            trigger: "blur",
          },
        ],
        skill: [
          { required: true, message: "请选择技术先进程度", trigger: "change" },
        ],
        effect: [
          {
            required: true,
            message: "请选择对主要产品是否在技术上发挥核心支持作用",
            trigger: "change",
          },
        ],
        property: [
          {
            required: true,
            message: "请选择知识产权的获得方式",
            trigger: "change",
          },
        ],
        joingj: [
          {
            required: true,
            message: "是否参与国家标准、行业标准、检测方法、技术规范",
            trigger: "change",
          },
        ],
        conversion: [
          {
            required: true,
            message: "请选择科技成果转换能力",
            trigger: "change",
          },
        ],
        research: [
          {
            required: true,
            message: "请选择是否开展产学研合作：",
            trigger: "change",
          },
        ],
        firstast: [
          { required: true, message: "请输入2018年的净资产", trigger: "blur" },
        ],
        secontast: [
          { required: true, message: "请输入2019年的净资产", trigger: "blur" },
        ],
        thirdast: [
          { required: true, message: "请输入2020年的净资产", trigger: "blur" },
        ],
        firsDev: [
          {
            required: true,
            message: "请输入2018年的研发费用",
            trigger: "blur",
          },
        ],
        secontDev: [
          {
            required: true,
            message: "请输入2019年的研发费用",
            trigger: "blur",
          },
        ],
        thirdDev: [
          {
            required: true,
            message: "请输入2020年的研发费用",
            trigger: "blur",
          },
        ],
        firsIncome: [
          {
            required: true,
            message: "请输入2018年的销售收入",
            trigger: "blur",
          },
        ],
        seconIncome: [
          {
            required: true,
            message: "请输入2019年的销售收入",
            trigger: "blur",
          },
        ],
        thirdast: [
          {
            required: true,
            message: "请输入2020年的销售收入",
            trigger: "blur",
          },
        ],
      },
      depShowType: {
        value: "value",
        label: "label",
        children: "children",
        expandTrigger: "click",
      },
      datalist: [
        {
          id: "1",
          label: "电子信息",
          children: [
            {
              pid: "1",
              value: "软件",
              label: "软件",
              children: [
                {
                  value: "基础软件",
                  label: "基础软件",
                },
                {
                  value: "嵌入式软件",
                  label: "嵌入式软件",
                },
                {
                  value: "计算机辅助设计与辅助工程管理软件",
                  label: "计算机辅助设计与辅助工程管理软件",
                },
                {
                  value: "中文及多语种处理软件",
                  label: "中文及多语种处理软件",
                },
                {
                  value: "图形和图像处理软件",
                  label: "图形和图像处理软件",
                },
                {
                  value: "地理信息系统（GIS）软件",
                  label: "地理信息系统（GIS）软件",
                },
                {
                  value: "电子商务软件",
                  label: "电子商务软件",
                },
                ,
                {
                  value: "电子政务软件",
                  label: "电子政务软件",
                },
                {
                  value: "企业管理软件",
                  label: "企业管理软件",
                },
                {
                  value: "物联网应用软件",
                  label: "物联网应用软件",
                },
                {
                  value: "云计算与移动互联网软件",
                  label: "云计算与移动互联网软件",
                },
                {
                  value: "Web服务与集成软件",
                  label: "Web服务与集成软件",
                },
              ],
            },
            {
              pid: "2",
              value: "微电子技术",
              label: "微电子技术",
              children: [
                {
                  value: "集成电路设计技术",
                  label: "集成电路设计技术",
                },
                {
                  value: "集成电路产品设计技术",
                  label: "集成电路产品设计技术",
                },
                {
                  value: "集成电路封装技术",
                  label: "集成电路封装技术",
                },
                {
                  value: "集成电路测试技术",
                  label: "集成电路测试技术",
                },
                {
                  value: "集成电路芯片制造工艺技术",
                  label: "集成电路芯片制造工艺技术",
                },
                {
                  value: "集成光电子器件设计、制造与工艺技术",
                  label: "集成光电子器件设计、制造与工艺技术",
                },
              ],
            },
            {
              pid: "3",
              label: "计算机产品及其网络应用技术",
              value: "计算机产品及其网络应用技术",
              children: [
                {
                  value: "计算机及终端设计与制造技术",
                  label: "计算机及终端设计与制造技术",
                },
                {
                  value: "计算机外围设备设计与制造技术",
                  label: "计算机外围设备设计与制造技术",
                },
                {
                  value: "计算机外围设备设计与制造技术",
                  label: "计算机外围设备设计与制造技术",
                },
                {
                  value: "计算机外围设备设计与制造技术",
                  label: "计算机外围设备设计与制造技术",
                },
              ],
            },
            {
              pid: "4",
              value: "通信技术",
              label: "通信技术",
              children: [
                {
                  value: "通信网络技术",
                  label: "通信网络技术",
                },
                {
                  value: "光传输系统技术",
                  label: "光传输系统技术",
                },
                {
                  value: "移动通信系统技术",
                  label: "移动通信系统技术",
                },
                {
                  value: "宽带无线通信系统技术",
                  label: "宽带无线通信系统技术",
                },
                {
                  value: "卫星通信系统技术",
                  label: "卫星通信系统技术",
                },
                {
                  value: "微波通信系统技术",
                  label: "微波通信系统技术",
                },
                {
                  value: "物联网设备、部件及组网技术",
                  label: "物联网设备、部件及组网技术",
                },
                {
                  value: "电信网络运营支撑管理技术",
                  label: "电信网络运营支撑管理技术",
                },
                {
                  value: "电信网与互联网增值业务应用技术",
                  label: "电信网与互联网增值业务应用技术",
                },
              ],
            },
            {
              pid: "5",
              value: "广播影视技术",
              label: "广播影视技术",
              children: [
                {
                  value: "广播电视节目采编播系统技术",
                  label: "广播电视节目采编播系统技术",
                },
                {
                  value: "广播电视业务集成与支撑系统技术",
                  label: "广播电视业务集成与支撑系统技术",
                },
                {
                  value: "有线传输与覆盖系统技术",
                  label: "有线传输与覆盖系统技术",
                },
                {
                  value: "无线传输与覆盖系统技术",
                  label: "无线传输与覆盖系统技术",
                },
                {
                  value: "广播电视监测监管、安全运行与维护系统技术",
                  label: "广播电视监测监管、安全运行与维护系统技术",
                },
                {
                  value: "数字电影系统技术",
                  label: "数字电影系统技术",
                },
                {
                  value: "数字电视终端技术",
                  label: "数字电视终端技术",
                },
                {
                  value: "专业视频应用服务平台技术",
                  label: "专业视频应用服务平台技术",
                },
                {
                  value: "音响、光盘技术",
                  label: "音响、光盘技术",
                },
              ],
            },
            {
              pid: "6",
              value: "新型电子元器件",
              label: "新型电子元器件",
              children: [
                {
                  value: "半导体发光技术",
                  label: "半导体发光技术",
                },
                {
                  value: "大功率半导体器件",
                  label: "大功率半导体器件",
                },
                {
                  value: "专用特种器件",
                  label: "专用特种器件",
                },
                {
                  value: "敏感元器件与传感器",
                  label: "敏感元器件与传感器",
                },
                {
                  value: "中高档机电组件",
                  label: "中高档机电组件",
                },
                {
                  value: "平板显示器件",
                  label: "平板显示器件",
                },
                {
                  value: "专业视频应用服务平台技术",
                  label: "专业视频应用服务平台技术",
                },
              ],
            },
            {
              pid: "7",
              value: "信息安全技术",
              label: "信息安全技术",
              children: [
                {
                  value: "密码技术",
                  label: "密码技术",
                },
                {
                  value: "认证授权技术",
                  label: "认证授权技术",
                },
                {
                  value: "系统与软件安全技术",
                  label: "系统与软件安全技术",
                },
                {
                  value: "网络与通信安全技术",
                  label: "网络与通信安全技术",
                },
                {
                  value: "安全保密技术",
                  label: "安全保密技术",
                },
                {
                  value: "安全测评技术",
                  label: "安全测评技术",
                },
                {
                  value: "安全管理技术",
                  label: "安全管理技术",
                },
                {
                  value: "应用安全技术",
                  label: "应用安全技术",
                },
              ],
            },
            {
              pid: "8",
              value: "智能交通和轨道交通技术",
              label: "智能交通和轨道交通技术",
              children: [
                {
                  value: "交通控制与管理技术",
                  label: "交通控制与管理技术",
                },
                {
                  value: "交通基础信息采集、处理技术",
                  label: "交通基础信息采集、处理技术",
                },
                {
                  value: "车、船载电子设备技术",
                  label: "车、船载电子设备技术",
                },
                {
                  value: "轨道交通车辆及运行保障技术",
                  label: "轨道交通车辆及运行保障技术",
                },
                {
                  value: "轨道交通运营管理服务技术",
                  label: "轨道交通运营管理服务技术",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "生物与新医药",
          children: [
            {
              pid: "1",
              value: "医药生物技术",
              label: "医药生物技术",
              children: [
                {
                  value: "新型疫苗",
                  label: "新型疫苗",
                },
                {
                  value: "生物治疗技术和基因工程药物",
                  label: "生物治疗技术和基因工程药物",
                },
                {
                  value: "快速生物检测技术",
                  label: "快速生物检测技术",
                },
                {
                  value: "生物大分子类药物研发技术",
                  label: "生物大分子类药物研发技术",
                },
                {
                  value: "天然药物生物合成制备技术",
                  label: "天然药物生物合成制备技术",
                },
                ,
                {
                  value: "生物分离介质、试剂、装置及相关检测技术",
                  label: "生物分离介质、试剂、装置及相关检测技术",
                },
              ],
            },
            {
              pid: "2",
              value: "中药、天然药物",
              label: "中药、天然药物",
              children: [
                {
                  value: "中药资源可持续利用与生态保护技术",
                  label: "中药资源可持续利用与生态保护技术",
                },
                {
                  value: "创新药物研发技术",
                  label: "创新药物研发技术",
                },
                {
                  value: "中成药二次开发技术",
                  label: "中成药二次开发技术",
                },
                {
                  value: "中药质控及有害物质检测技术",
                  label: "中药质控及有害物质检测技术",
                },
              ],
            },
            {
              pid: "3",
              value: "化学药研发技术",
              label: "化学药研发技术",
              children: [
                {
                  value: "创新药物技术",
                  label: "创新药物技术",
                },
                {
                  value: "手性药物创制技术",
                  label: "手性药物创制技术",
                },
                {
                  value: "晶型药物创制技术",
                  label: "晶型药物创制技术",
                },
                {
                  value: "国家基本药物生产技术",
                  label: "国家基本药物生产技术",
                },
                {
                  value: "国家基本药物原料药和重要中间体的技术",
                  label: "国家基本药物原料药和重要中间体的技术",
                },
              ],
            },
            {
              pid: "4",
              value: "药物新剂型与制剂创新技术",
              label: "药物新剂型与制剂创新技术",
              children: [
                {
                  value: "创新制剂技术",
                  label: "创新制剂技术",
                },
                {
                  value: "新型给药制剂技术",
                  label: "新型给药制剂技术",
                },
                {
                  value: "制剂新辅料开发及生产技术",
                  label: "制剂新辅料开发及生产技术",
                },
                {
                  value: "制药装备技术",
                  label: "制药装备技术",
                },
              ],
            },
            {
              pid: "5",
              value: "医疗仪器、设备与医学专用软件",
              label: "医疗仪器、设备与医学专用软件",
              children: [
                {
                  value: "创新制剂技术",
                  label: "创新制剂技术",
                },
                {
                  value: "新型给药制剂技术",
                  label: "新型给药制剂技术",
                },
                {
                  value: "制剂新辅料开发及生产技术",
                  label: "制剂新辅料开发及生产技术",
                },
                {
                  value: "制药装备技术",
                  label: "制药装备技术",
                },
              ],
            },
            {
              pid: "6",
              value: "轻工和化工生物技术",
              label: "轻工和化工生物技术",
              children: [
                {
                  value: "高效工业酶制备与生物催化技术",
                  label: "高效工业酶制备与生物催化技术",
                },
                {
                  value: "微生物发酵技术",
                  label: "微生物发酵技术",
                },
                {
                  value: "生物反应及分离技术",
                  label: "生物反应及分离技术",
                },
                {
                  value: "天然产物有效成分的分离提取技术",
                  label: "天然产物有效成分的分离提取技术",
                },
                {
                  value: "食品安全生产与评价技术",
                  label: "食品安全生产与评价技术",
                },
                {
                  value: "食品安全检测技术",
                  label: "食品安全检测技术",
                },
              ],
            },
            {
              pid: "7",
              value: "农业生物技术",
              label: "农业生物技术",
              children: [
                {
                  value: "农林植物优良新品种与优质高效安全生产技术",
                  label: "农林植物优良新品种与优质高效安全生产技术",
                },
                {
                  value: "畜禽水产优良新品种与健康养殖技术",
                  label: "畜禽水产优良新品种与健康养殖技术",
                },
                {
                  value: "重大农林生物灾害与动物疫病防控技术",
                  label: "重大农林生物灾害与动物疫病防控技术",
                },
                {
                  value: "现代化农业装备与信息化技术",
                  label: "现代化农业装备与信息化技术",
                },
                {
                  value: "农业面源和重金属污染农田综合防治与修复技术",
                  label: "农业面源和重金属污染农田综合防治与修复技术",
                },
              ],
            },
          ],
        },
        {
          id: "3",
          label: "航空航天",
          children: [
            {
              pid: "1",
              value: "航空技术",
              label: "航空技术",
              children: [
                {
                  value: "飞行器",
                  label: "飞行器",
                },
                {
                  value: "飞行器动力技术",
                  label: "飞行器动力技术",
                },
                {
                  value: "飞行器系统技术",
                  label: "飞行器系统技术",
                },
                {
                  value: "飞行器制造与材料技术",
                  label: "飞行器制造与材料技术",
                },
                {
                  value: "空中管制技术",
                  label: "空中管制技术",
                },
                {
                  value: "民航及通用航空运行保障技术",
                  label: "民航及通用航空运行保障技术",
                },
              ],
            },
            {
              pid: "2",
              value: "航天技术",
              label: "航天技术",
              children: [
                {
                  value: "卫星总体技术",
                  label: "卫星总体技术",
                },
                {
                  value: "运载火箭技术",
                  label: "运载火箭技术",
                },
                {
                  value: "卫星平台技术",
                  label: "卫星平台技术",
                },
                {
                  value: "卫星有效载荷技术",
                  label: "卫星有效载荷技术",
                },
                {
                  value: "航天测控技术",
                  label: "航天测控技术",
                },
                {
                  value: "航天电子与航天材料制造技术",
                  label: "航天电子与航天材料制造技术",
                },
                {
                  value: "先进航天动力设计技术",
                  label: "先进航天动力设计技术",
                },
                {
                  value: "卫星应用技术",
                  label: "卫星应用技术",
                },
              ],
            },
          ],
        },
        {
          id: "4",
          label: "新材料",
          children: [
            {
              pid: "1",
              value: "金属材料",
              label: "金属材料",
              children: [
                {
                  value: "精品钢材制备技术",
                  label: "精品钢材制备技术",
                },
                {
                  value: "铝、铜、镁、钛合金清洁生产与深加工技术",
                  label: "铝、铜、镁、钛合金清洁生产与深加工技术",
                },
                {
                  value: "稀有、稀土金属精深产品制备技术",
                  label: "稀有、稀土金属精深产品制备技术",
                },
                {
                  value: "纳米及粉末冶金新材料制备与应用技术",
                  label: "纳米及粉末冶金新材料制备与应用技术",
                },
                {
                  value: "金属及金属基复合新材料制备技术",
                  label: "金属及金属基复合新材料制备技术",
                },
                {
                  value: "半导体新材料制备与应用技术",
                  label: "半导体新材料制备与应用技术",
                },
                {
                  value: "先进航天动力设计技术",
                  label: "先进航天动力设计技术",
                },
                {
                  value: "电工、微电子和光电子新材料制备与应用技术",
                  label: "电工、微电子和光电子新材料制备与应用技术",
                },
              ],
            },
            {
              pid: "2",
              value: "无机非金属材料",
              label: "无机非金属材料",
              children: [
                {
                  value: "结构陶瓷及陶瓷基复合材料强化增韧技术",
                  label: "结构陶瓷及陶瓷基复合材料强化增韧技术",
                },
                {
                  value: "功能陶瓷制备技术",
                  label: "功能陶瓷制备技术",
                },
                {
                  value: "功能玻璃制备技术",
                  label: "功能玻璃制备技术",
                },
                {
                  value: "节能与新能源用材料制备技术",
                  label: "节能与新能源用材料制备技术",
                },
                {
                  value: "环保及环境友好型材料技术",
                  label: "环保及环境友好型材料技术",
                },
              ],
            },
            {
              pid: "3",
              value: "高分子材料",
              label: "高分子材料",
              children: [
                {
                  value: "新型功能高分子材料的制备及应用技术",
                  label: "新型功能高分子材料的制备及应用技术",
                },
                {
                  value: "工程和特种工程塑料制备技术",
                  label: "工程和特种工程塑料制备技术",
                },
                {
                  value: "新型橡胶的合成技术及橡胶新材料制备技术",
                  label: "新型橡胶的合成技术及橡胶新材料制备技术",
                },
                {
                  value: "新型纤维及复合材料制备技术",
                  label: "新型纤维及复合材料制备技术",
                },
                {
                  value: "高分子材料制备及循环在利用技术",
                  label: "高分子材料制备及循环在利用技术",
                },
                {
                  value: "高分子材料的新型加工和应用技术",
                  label: "高分子材料的新型加工和应用技术",
                },
              ],
            },
            {
              pid: "4",
              value: "生物医用材料",
              label: "生物医用材料",
              children: [
                {
                  value: "介入治疗器具材料制备技术",
                  label: "介入治疗器具材料制备技术",
                },
                {
                  value: "心脑血管外科用新型生物材料制备技术",
                  label: "心脑血管外科用新型生物材料制备技术",
                },
                {
                  value: "骨科内置物制备技术",
                  label: "骨科内置物制备技术",
                },
                {
                  value: "口腔材料制备技术",
                  label: "口腔材料制备技术",
                },
                {
                  value: "组织工程用材林制备技术",
                  label: "组织工程用材林制备技术",
                },
                {
                  value: "新型敷料和止血材料制备技术",
                  label: "新型敷料和止血材料制备技术",
                },
                {
                  value: "专用手术器械和材料制备技术",
                  label: "专用手术器械和材料制备技术",
                },
                {
                  value: "其他新型医用材料及制备技术",
                  label: "其他新型医用材料及制备技术",
                },
              ],
            },
            {
              pid: "5",
              value: "精细和专用化学品",
              label: "精细和专用化学品",
              children: [
                {
                  value: "新型催化剂制备及应用技术",
                  label: "新型催化剂制备及应用技术",
                },
                {
                  value: "电子化学品制备及应用技术",
                  label: "电子化学品制备及应用技术",
                },
                {
                  value: "超细功能材料制备及应用技术",
                  label: "超细功能材料制备及应用技术",
                },
                {
                  value: "精细化学品制备及应用技术",
                  label: "精细化学品制备及应用技术",
                },
              ],
            },
            {
              pid: "6",
              value: "与文化艺术产品相关的新材料",
              label: "与文化艺术产品相关的新材料",
              children: [
                {
                  value: "文化载体和介质新材料制备技术",
                  label: "文化载体和介质新材料制备技术",
                },
                {
                  value: "艺术专用新材料制备技术",
                  label: "艺术专用新材料制备技术",
                },
                {
                  value: "影视场景和舞台专用新材料的加工生产技术",
                  label: "影视场景和舞台专用新材料的加工生产技术",
                },
                {
                  value: "文化产品印刷新材料制备技术",
                  label: "文化产品印刷新材料制备技术",
                },
                {
                  value: "文物保护新材料制备技术",
                  label: "文物保护新材料制备技术",
                },
              ],
            },
          ],
        },
        {
          id: "5",
          label: "高技术服务",
          children: [
            {
              pid: "1",
              value: "研发与设计服务",
              label: "研发与设计服务",
              children: [
                {
                  value: "研发服务",
                  label: "研发服务",
                },
                {
                  value: "设计服务",
                  label: "设计服务",
                },
              ],
            },
            {
              pid: "2",
              value: "检验检测认证与标准服务",
              label: "检验检测认证与标准服务",
              children: [
                {
                  value: "检验检测认证技术",
                  label: "检验检测认证技术",
                },
                {
                  value: "标准化服务技术",
                  label: "标准化服务技术",
                },
              ],
            },
            {
              pid: "3",
              value: "检验检测认证与标准服务",
              label: "检验检测认证与标准服务",
              children: [
                {
                  value: "云计算服务技术",
                  label: "云计算服务技术",
                },
                {
                  value: "数据服务技术",
                  label: "数据服务技术",
                },
                {
                  value: "其他信息服务技术",
                  label: "其他信息服务技术",
                },
              ],
            },
            {
              ///////////////////////////////// 这是单个的数据
              pid: "4",
              label: "高技术产业服务",
              value: "高技术产业服务",
            },
            {
              value: "知识产权与成果转化服务",
              pid: "5",
              label: "知识产权与成果转化服务",
            },
            {
              pid: "6",
              value: "电子商务与现代化物流技术",
              label: "电子商务与现代化物流技术",
              children: [
                {
                  value: "电子商务技术",
                  label: "电子商务技术",
                },
                {
                  value: "物流与供应链管理技术",
                  label: "物流与供应链管理技术",
                },
              ],
            },
            {
              pid: "7",
              value: "城市管理与社会服务",
              label: "城市管理与社会服务",
              children: [
                {
                  value: "智慧城市服务支撑技术",
                  label: "智慧城市服务支撑技术",
                },
                {
                  value: "互联网教育",
                  label: "互联网教育",
                },
                {
                  value: "健康管理",
                  label: "健康管理",
                },
                {
                  value: "现代体育服务支撑技术",
                  label: "现代体育服务支撑技术",
                },
              ],
            },
            {
              pid: "8",
              value: "城市管理与社会服务",
              label: "城市管理与社会服务",
              children: [
                {
                  value: "创作、设计与制作技术",
                  label: "创作、设计与制作技术",
                },
                {
                  value: "传播与展示技术",
                  label: "传播与展示技术",
                },
                {
                  value: "文化遗产发现与在利用技术",
                  label: "文化遗产发现与在利用技术",
                },
                {
                  value: "运营与管理技术",
                  label: "运营与管理技术",
                },
              ],
            },
          ],
        },
        {
          id: "6",
          label: "新能源与节能",
          children: [
            {
              pid: "1",
              value: "可再生清洁能源",
              label: "可再生清洁能源",
              children: [
                {
                  value: "太阳能",
                  label: "太阳能",
                },
                {
                  value: "风能",
                  label: "风能",
                },
                {
                  value: "生物质能",
                  label: "生物质能",
                },
                {
                  value: "地热能、海洋能及运动能",
                  label: "地热能、海洋能及运动能",
                },
              ],
            },
            {
              pid: "2",
              value: "核能及氢能",
              label: "核能及氢能",
              children: [
                {
                  value: "核能",
                  label: "核能",
                },
                {
                  value: "氢能",
                  label: "氢能",
                },
              ],
            },
            {
              pid: "3",
              value: "新型高效能力转换与存储技术",
              label: "新型高效能力转换与存储技术",
              children: [
                {
                  value: "高性能绿色电池（组）技术",
                  label: "高性能绿色电池（组）技术",
                },
                {
                  value: "新型动力电池（组）与储能电池技术",
                  label: "新型动力电池（组）与储能电池技术",
                },
                {
                  value: "燃料电池技术",
                  label: "燃料电池技术",
                },
                {
                  value: "超级电容器与热电转换技术",
                  label: "超级电容器与热电转换技术",
                },
              ],
            },
            {
              pid: "4",
              value: "高效节能技术",
              label: "高效节能技术",
              children: [
                {
                  value: "工业节能技术",
                  label: "工业节能技术",
                },
                {
                  value: "能量回收利用技术",
                  label: "能量回收利用技术",
                },
                {
                  value: "蓄热式燃烧技术",
                  label: "蓄热式燃烧技术",
                },
                {
                  value: "输配电系统优化技术",
                  label: "输配电系统优化技术",
                },
                {
                  value: "高温热泵技术",
                  label: "高温热泵技术",
                },
                {
                  value: "建筑节能技术",
                  label: "建筑节能技术",
                },
                {
                  value: "能源系统管理、优化与控制技术",
                  label: "能源系统管理、优化与控制技术",
                },
                {
                  value: "节能检测技术",
                  label: "节能检测技术",
                },
              ],
            },
          ],
        },
        {
          id: "7",
          label: "资源与环境",
          children: [
            {
              pid: "1",
              value: "水污染控制与水资源利用技术",
              label: "水污染控制与水资源利用技术",
              children: [
                {
                  value: "城镇污水处理与资源化技术",
                  label: "城镇污水处理与资源化技术",
                },
                {
                  value: "工业废水处理与资源化技术",
                  label: "工业废水处理与资源化技术",
                },
                {
                  value: "农业水污染控制技术",
                  label: "农业水污染控制技术",
                },
                {
                  value: "流域水污染治理与富营养化综合控制技术",
                  label: "流域水污染治理与富营养化综合控制技术",
                },
                {
                  value: "节水与非常规水资源综合利用技术",
                  label: "节水与非常规水资源综合利用技术",
                },
                {
                  value: "饮用水安全保障技术",
                  label: "饮用水安全保障技术",
                },
              ],
            },
            {
              pid: "2",
              value: "大气污染控制技术",
              label: "大气污染控制技术",
              children: [
                {
                  value: "煤燃烧污染防治技术",
                  label: "煤燃烧污染防治技术",
                },
                {
                  value: "机动车排放控制技术",
                  label: "机动车排放控制技术",
                },
                {
                  value: "工业炉窑污染防治技术",
                  label: "工业炉窑污染防治技术",
                },
                {
                  value: "工业有害废气控制技术",
                  label: "工业有害废气控制技术",
                },
                {
                  value: "有限空间空气污染防治技术",
                  label: "有限空间空气污染防治技术",
                },
              ],
            },
            {
              pid: "3",
              value: "固体废弃物处置与综合利用技术",
              label: "固体废弃物处置与综合利用技术",
              children: [
                {
                  value: "危险固体废弃物处置技术",
                  label: "危险固体废弃物处置技术",
                },
                {
                  value: "生活垃圾处置与资源化技术",
                  label: "生活垃圾处置与资源化技术",
                },
                {
                  value: "生活垃圾处置与资源化技术",
                  label: "生活垃圾处置与资源化技术",
                },
                {
                  value: "建筑垃圾处置与资源化技术",
                  label: "建筑垃圾处置与资源化技术",
                },
                {
                  value: "有机固体废物处理与资源化技术",
                  label: "有机固体废物处理与资源化技术",
                },
                {
                  value: "社会源固体废物处置与资源化技术",
                  label: "社会源固体废物处置与资源化技术",
                },
              ],
            },
            {
              pid: "4",
              value: "物理性污染防治技术",
              label: "物理性污染防治技术",
              children: [
                {
                  value: "噪声、振动污染防治技术",
                  label: "噪声、振动污染防治技术",
                },
                {
                  value: "核与辐射安全防治技术",
                  label: "核与辐射安全防治技术",
                },
              ],
            },
            {
              pid: "5",
              value: "环境监测及环境事故应急处理技术",
              label: "环境监测及环境事故应急处理技术",
              children: [
                {
                  value: "环境监测预警技术",
                  label: "环境监测预警技术",
                },
                {
                  value: "应急环境监测技术",
                  label: "应急环境监测技术",
                },
                {
                  value: "生态环境监测技术",
                  label: "生态环境监测技术",
                },
                {
                  value: "非常规污染物监测技术",
                  label: "非常规污染物监测技术",
                },
              ],
            },
            {
              pid: "6",
              value: "生态环境建设与保护技术",
              label: "生态环境建设与保护技术",
            },
            {
              pid: "7",
              value: "清洁生产技术",
              label: "清洁生产技术",
              children: [
                {
                  value: "重污染行业生产过程中节水、减排及资源化关键技术",
                  label: "重污染行业生产过程中节水、减排及资源化关键技术",
                },
                {
                  value: "清洁生产关键技术",
                  label: "清洁生产关键技术",
                },
                {
                  value: "环保制造关键技术",
                  label: "环保制造关键技术",
                },
              ],
            },
            {
              pid: "8",
              value: "资源勘查、高效开采与综合利用技术",
              label: "资源勘查、高效开采与综合利用技术",
              children: [
                {
                  value: "资源勘查开采技术",
                  label: "资源勘查开采技术",
                },
                {
                  value: "提高矿产资源回收利用率的采矿、选矿技术",
                  label: "提高矿产资源回收利用率的采矿、选矿技术",
                },
                {
                  value: "伴生有价元素的分选提取技术",
                  label: "伴生有价元素的分选提取技术",
                },
                {
                  value: "低品位资源和尾矿资源综合利用技术",
                  label: "低品位资源和尾矿资源综合利用技术",
                },
                {
                  value: "放射性资源勘查开发技术",
                  label: "放射性资源勘查开发技术",
                },
                {
                  value: "放射性废物处理处置技术",
                  label: "放射性废物处理处置技术",
                },
                {
                  value: "绿色矿山建设技术",
                  label: "绿色矿山建设技术",
                },
              ],
            },
          ],
        },
        {
          id: "8",
          label: "先进制造与自动化",
          children: [
            {
              pid: "1",
              value: "工业生产过程控制系统",
              label: "工业生产过程控制系统",
              children: [
                {
                  value: "现场总线与工业以太网技术",
                  label: "现场总线与工业以太网技术",
                },
                {
                  value: "嵌入式系统技术",
                  label: "嵌入式系统技术",
                },
                {
                  value: "新一代工业控制计算机技术",
                  label: "新一代工业控制计算机技术",
                },
                {
                  value: "制造执行系统（MES）技术",
                  label: "制造执行系统（MES）技术",
                },
                {
                  value: "工业生产过程综合自动化控制系统技术",
                  label: "工业生产过程综合自动化控制系统技术",
                },
              ],
            },
            {
              pid: "2",
              value: "安全生产技术",
              label: "安全生产技术",
              children: [
                {
                  value: "矿山安全生产技术",
                  label: "矿山安全生产技术",
                },
                {
                  value: "危险化学品安全生产技术",
                  label: "危险化学品安全生产技术",
                },
              ],
            },
            {
              pid: "3",
              value: "高性能、智能化仪器仪表",
              label: "高性能、智能化仪器仪表",
              children: [
                {
                  value: "新型传感器",
                  label: "新型传感器",
                },
                {
                  value: "新型自动化仪器仪表",
                  label: "新型自动化仪器仪表",
                },
                {
                  value: "科学分析仪器／监测仪器",
                  label: "科学分析仪器／监测仪器",
                },
                {
                  value: "精确制造中的测控仪器仪表",
                  label: "精确制造中的测控仪器仪表",
                },
                {
                  value: "微机电系统技术",
                  label: "微机电系统技术",
                },
              ],
            },
            {
              pid: "4",
              value: "先进制造工艺与装备",
              label: "先进制造工艺与装备",
              children: [
                {
                  value: "高档数控装备与数控加工技术",
                  label: "高档数控装备与数控加工技术",
                },
                {
                  value: "机器人",
                  label: "机器人",
                },
                {
                  value: "智能装备驱动控制技术",
                  label: "智能装备驱动控制技术",
                },
                {
                  value: "大规模集成电路制造相关技术",
                  label: "大规模集成电路制造相关技术",
                },
                {
                  value: "增材制造技术",
                  label: "增材制造技术",
                },
                {
                  value: "高端装备在制造技术",
                  label: "高端装备在制造技术",
                },
              ],
            },
            {
              pid: "5",
              value: "新型机械",
              label: "新型机械",
              children: [
                {
                  value: "机械基础件及制造技术",
                  label: "机械基础件及制造技术",
                },
                {
                  value: "通用机械装备制造技术",
                  label: "通用机械装备制造技术",
                },
                {
                  value: "极端制造与专用机械装备制造技术",
                  label: "极端制造与专用机械装备制造技术",
                },
                {
                  value: "纺织及其他行业专用设备制造技术",
                  label: "纺织及其他行业专用设备制造技术",
                },
              ],
            },
            {
              pid: "6",
              value: "电力系统与设备",
              label: "电力系统与设备",
              children: [
                {
                  value: "发电与储能技术",
                  label: "发电与储能技术",
                },
                {
                  value: "输电技术",
                  label: "输电技术",
                },
                {
                  value: "配电与用电技术",
                  label: "配电与用电技术",
                },
                {
                  value: "变电技术",
                  label: "变电技术",
                },
              ],
            },
            {
              pid: "7",
              value: "汽车及轨道车辆相关技术",
              label: "汽车及轨道车辆相关技术",
              children: [
                {
                  value: "车用发动机及其相关技术",
                  label: "车用发动机及其相关技术",
                },
                {
                  value: "汽车关键零部件技术",
                  label: "汽车关键零部件技术",
                },
                {
                  value: "节能与新能源汽车技术",
                  label: "节能与新能源汽车技术",
                },
                {
                  value: "机动车及发动机先进设计、制造和测试平台技术",
                  label: "机动车及发动机先进设计、制造和测试平台技术",
                },
                {
                  value: "轨道车辆及关键零部件技术",
                  label: "轨道车辆及关键零部件技术",
                },
              ],
            },
            {
              pid: "8",
              value: "高技术船舶与海洋工程装备设计制造技术",
              label: "高技术船舶与海洋工程装备设计制造技术",
              children: [
                {
                  value: "高技术船舶设计制造技术",
                  label: "高技术船舶设计制造技术",
                },
                {
                  value: "海洋工程装备设计制造技术",
                  label: "海洋工程装备设计制造技术",
                },
              ],
            },
            {
              pid: "9",
              value: "传统文化产业改造技术",
              label: "传统文化产业改造技术",
              children: [
                {
                  value: "乐器制造技术",
                  label: "乐器制造技术",
                },
                {
                  value: "印刷技术",
                  label: "印刷技术",
                },
              ],
            },
          ],
        },
      ],
      datalist2: [],
      datalist3: [],
      dateadm: "",
      formdegree: "",
      FhighMatchId: "",
      ishowce: 0,
      FindustryOne2: "",
      hId: null,
    };
  },
  created() {
    this.getUser();
  },
  watch: {
    value1: function(newal) {
      // console.log(val);
      // // console.log(e);
      // // this.handleChangeOne(val)
      // var obj = {
      //   item:"",
      //   id:""
      // };
      // // this.value = this.getform.industryTwo.split("/");
      // console.log(newal);
      // for (let i = 0; i < this.datalist.length; i++) {
      //   if (this.datalist[i].lable === newal) {
      //     // console.log(i);
      //     console.log(newal);
      //       return obj.id = i + 1; //筛选出匹配数据
      //   }
      // }
      // console.log(obj.id);
      // //  this.handleChangeOne(obj)
    },
  },
  methods: {
    getUser() {
      getAdmin().then((res) => {
        if (!res.data) return;
        this.getform = res.data;
        console.log(this.getform, "回显");
        // if(res.data===undefined) return
        // console.log(res.data===undefined);
        this.hId = this.getform.highMatchId;
        this.addForm.name = this.getform.companyName;
        this.addForm.date1 = this.getform.registerTime;
        // this.FindustryOne = this.getform.technicalField;
        const valueindus = this.getform.technicalField;

        // 回填一级菜单 行业领域
        this.datalist.forEach((item) => {
          if (item.label == valueindus) {
            this.value1 = item.id;
            this.FindustryOne = item.label;
          }
        });
        // this.value1=
        /////处理第一个下拉框后面的数据
        console.log(this.getform.industryOne, this.getform.industryTwo);
        this.FindustryOne2 = this.getform.industryOne;
        this.FindustryTwo = this.getform.industryTwo;
        // console.log(this.getform.industryOne);
        // let objid=""
        // for (let i = 0; i < this.datalist.length; i++) {
        //         if (this.datalist[i].label ===this.getform.industryOne ) {
        //              objid = i + 1; //筛选出匹配数据
        //         }
        //     }
        // this.handleChangeThree(objid)
        this.optionss = this.getform.industryTwo;
        this.optionss = `${this.getform.industryOne}/${this.getform.industryTwo}`;
        // 	const newval=this.getform.industryTwo.split('-')
        // 	this.FindustryTwo=newval.toString();
        //   // 把返回来的数据先处理成数组模式
        //   // 处理第二层的数据结构
        this.datalist.forEach((item) => {
          // console.log(item.label,this.getform.industryOne);
          if (item.label === this.getform.technicalField) {
            this.options = item.children;
          }
        });

        //头部ID
        this.FhighMatchId = this.getform.highMatchId;
        // 是否违法
        this.addForm.resource = this.getform.punish;
        // this.formresource=this.getform.punish
        this.addForm.worker = this.getform.workersNumber;
        this.addForm.scienceworker = this.getform.researchNumber;
        this.addForm.undergraduate = this.getform.collegeNumber;

        // 科技先进程度 this.formdegree=
        this.addForm.skill = this.getform.degree;

        //         getAdmin().then((res)=>{
        //           this.getform=res.data
        //           // console.log( this.getform);
        //           if(!res.data){
        //             alert('请填写')
        //           }
        //           console.log(res);
        //             this.addForm.name=this.getform.companyName
        //             this.addForm.date1=this.getform.registerTime
        //             this.value1=this.getform.industryOne
        //             // industryOne:this.type,
        //             // industryTwo:this.type,
        //             // industryOne=this.FindustryOne,
        //             // industryTwo="航天技术/卫星应用技术",
        //             this.value1=this.getform.industryOne,
        //             this.FindustryTwo=this.getform.industryTwo
        //             this.value=this.getform.industryTwo.split("/")
        //             console.log(this.value);
        // >>>>>>> eb4dc1abb0bc060ead0d7784a8026fddaa0da64b

        // 核心支持作用   this.formEffect=
        this.addForm.effect = this.getform.effect;

        // 知识产权数量
        this.addForm.type = this.getform.rightOne;

        // 产权获得方式
        this.addForm.property = this.getform.getway;

        // 企业是否参加国家标准
        this.addForm.joingj = this.getform.standard;

        // 科技转换能力
        this.addForm.conversion = this.getform.ability;

        // 研究开发水平
        this.addForm.research = this.getform.cooperation;

        // 净收入
        let arrast = this.getform.netAssets;
        var arr = arrast.split(",");

        this.firstast = arr[0];
        this.secontast = arr[1];
        this.thirdast = arr[2];

        // 销售收入
        let arrcome = this.getform.salesRevenue;
        var arr2 = arrcome.split(",");
        this.firsIncome = arr2[0];
        this.secontIncome = arr2[1];
        this.thirdIncome = arr2[2];
        // 研发收入
        let arrDev = this.getform.researchExpenses;
        var arr3 = arrDev.split(",");
        this.firsDev = arr3[0];
        this.secontDev = arr3[1];
        this.thirdDev = arr3[2];
      });
    },
    submitForm(formName) {
      const asstes = `${this.firstast},${this.secontast},${this.thirdast}`;
      const Income = `${this.firsIncome},${this.secontIncome},${this.thirdIncome}`;
      const Dev = `${this.firsDev},${this.secontDev},${this.thirdDev}`;

      // this.$refs[formName].validate((valid) => {
      // if (valid) {
      // 提交成功接口
      //  console.log(this.formresource);

      const addAdminForm = {
        highMatchId: this.FhighMatchId,
        companyName: this.addForm.name,
        registerTime: this.addForm.date1,
        // technicalField不需要传值ID
        technicalField: this.FindustryOne,
        // technicalField: this.value1,
        industryOne: this.FindustryOne2,
        industryTwo: this.FindustryTwo,
        // industryOne:"航空航天",
        // industryTwo:"航天技术/卫星应用技术",
        punish: this.addForm.resource,
        workersNumber: this.addForm.worker,
        researchNumber: this.addForm.scienceworker,
        collegeNumber: this.addForm.undergraduate,
        degree: this.addForm.skill,
        effect: this.addForm.effect,
        rightOne: this.addForm.type,
        getway: this.addForm.property,
        standard: this.addForm.joingj,
        ability: this.addForm.conversion,
        cooperation: this.addForm.research,
        netAssets: asstes,
        salesRevenue: Income,
        researchExpenses: Dev,
        highMatchId: this.hId,
      };

      if (
        this.firstast.trim() === "" ||
        this.secontast.trim() == "" ||
        this.thirdast.trim() == ""
      ) {
        return this.$message.error("请填写净资产");
      }

      if (
        this.firsIncome.trim() === "" ||
        this.secontIncome.trim() == "" ||
        this.thirdIncome.trim() == ""
      ) {
        return this.$message.error("请填写销售收入");
      }
      if (
        this.firsDev.trim() === "" ||
        this.secontDev.trim() == "" ||
        this.thirdDev.trim() == ""
      ) {
        return this.$message.error("请填写研发收入");
      }
      if (
        this.FindustryTwo === "" ||
        this.FindustryOne2 == "" ||
        this.technicalField == ""
      ) {
        //     industryOne: this.FindustryOne2,
        // industryTwo: this.FindustryTwo,
        return this.$message.error("请填写技术领域和子行业");
      }

      if (this.addForm.name === "") {
        return this.$message.error("请填写公司名字");
      }
      if (this.addForm.date1 === "") {
        return this.$message.error("请填写成立时间");
      }
      if (this.addForm.resource === "") {
        return this.$message.error("请确认两年内是否有处罚");
      }
      if (
        this.addForm.worker == "" ||
        this.addForm.scienceworker == "" ||
        this.addForm.undergraduate == ""
      ) {
        return this.$message.error("请输入人力资源情况");
      }

      addAdminAp(addAdminForm).then((res) => {
        if (res.code != 200) return this.$message.error(res.msg);
        this.$message.success("评分成功");
        this.$store.commit("getresList", res.data);
        this.getUser();
        //  console.log(res);
        this.$router.push("scoreres");
      });
      // } else {
      //   // console.log(this.value1);
      //   // console.log(this.value);
      //   console.log("error submit!!");
      //   return false;
      // }
      // }
      // );
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    bluryanfa() {
      // 计算研发所占的费用
      const devres =
        Number(this.firsDev) + Number(this.secontDev) + Number(this.thirdDev);

      // 计算公司的销售利润
      const sellres =
        Number(this.thirdIncome) +
        Number(this.secontIncome) +
        Number(this.firsIncome);

      // console.log(devres,sellres,(devres/sellres).toFixed(2));
      const res = (devres / sellres).toFixed(2);
      if (res < 0.05) {
        this.$confirm(
          "国家高新技术企业认定需要企业近三年总研发费用占同期总销售收入5%（4%/3%）您现在的情况不符合条件，请问还继续评分吗？  ",
          "提示",
          {
            confirmButtonText: "确定",
            type: "warning",
          }
        )
          .then(() => {
            this.$message({
              type: "info",
              message: "继续评分!",
            });
          })
          .catch(() => {});
      }
    },
    testyanfa() {
      let kyres = this.addForm.worker * 0.1;
      if (this.addForm.scienceworker < kyres) {
        this.$confirm(
          "研发人员数量需要占职工总人数的百分之十以上,您现在的情况不符合条件，请问还继续评分吗？ ",
          "提示",
          {
            confirmButtonText: "确定",
            type: "warning",
          }
        )
          .then(() => {
            this.$message({
              type: "info",
              message: "继续评分!",
            });
          })
          .catch(() => {
            // this.$message({
            //   type: "info",
            //   message: "取消了评分",
            // });
          });
      }
    },
    chufa() {
      if (this.addForm.resource === 1) {
        this.formresource = 0;
        this.$confirm(
          "您公司近两年有行政处罚，您现在的情况不符合条件，请问还继续评分吗？ ",
          "提示",
          {
            confirmButtonText: "确定",
            type: "warning",
          }
        )
          .then(() => {
            this.$message({
              type: "info",
              message: "继续评分!",
            });
          })
          .catch(() => {
            // this.$message({
            //   type: "info",
            //   message: "取消了评分",
            // });
          });
      }
    },
    changedate(d1) {
      // 获取时间差
      let dateBegin = new Date(d1.replace(/-/g, "/")); //将-转化为/，使用new Date
      let dateEnd = new Date(); //获取当前时间
      let dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
      let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
      if (dayDiff < 365) {
        this.$confirm(
          "公司成立时间需365天以上，您现在的情况不符合条件，请问还继续评分吗？ ",
          "提示",
          {
            confirmButtonText: "确定",
            type: "warning",
          }
        )
          .then(() => {
            this.$message({
              type: "info",
              message: "继续评分!",
            });
          })
          .catch(() => {
            // this.$message({
            //   type: "info",
            //   message: "取消了评分",
            // });
          });
      }
    },
    handleChangeOne(val) {
      console.log(val);
      this.optionss = "";
      // 选出一级菜单
      let obj = {};
      obj = this.datalist.find((item) => {
        ++this.ishowce;
        return item.id === val; //筛选出匹配数据
      });
      // console.log(obj);
      this.FindustryOne = obj.label;
      this.datalist.forEach((item) => {
        if (item.id === this.value1) {
          this.options = item.children;
        }
      });
      this.FindustryTwo = "";
    },
    //  handleChangeThree(idd){
    // // let ids=`"${idd}"`
    // let ids=idd
    //    this.datalist.forEach((item) => {
    //      if (item.id === ids) {
    // 		// console.log(item.id)
    //        this.optionss = item.children;
    //      }
    //    });
    //  // console.log(this.optionss)
    //   // this.value=["药物新剂型与制剂创新技术", "创新制剂技术"]
    //  // this.value=this.getform.industryTwo.split("/")
    //  },
    handleChange(val) {
      // 筛选出第二级菜单的值
      // console.log(this.value[3]);
      if (!this.value[1]) {
        this.value[1] = "";
        return (this.FindustryTwo = `${this.value[0]}`);
      }
      // this.FindustryTwo = `${this.value[0]}/${this.value[1]}`;
      this.FindustryOne2 = this.value[0];
      this.FindustryTwo = this.value[1];
    },
  },
};
</script>

<style lang="less" scoped>
.score {
  // width: 1562px;
  height: 100%;
}
.scoretop {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  // line-height: 21px;
  color: #0453fa;
  // padding-bottom: 31px;
  margin-left: 20px;
}
// /deep/.el-input__inner {
//     // width: 30%;
// }
.zhong {
  margin-left: 200px;
}

.el-form-item {
  padding-top: 5px;
}
.topw {
  margin-left: -98px;
}
element.style {
  margin-left: 0px;
}
.labletxt {
  margin-left: -72px;
}
.isillegal {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 19px;
  color: #333333;
  i {
    font-style: normal;
    color: #cacaca;
  }
}
.styleh {
  margin-left: 25px;
  margin-top: 40px;
}
.inputH {
  margin-left: 2px;
  width: 190px;
}
.topww {
  margin-left: -65px;
  margin-top: 30px;
}
.scoretop2 {
  padding-bottom: 30px;
  margin-left: 25px;
}
h3 {
  margin-top: 30px;
  margin-left: 25px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #333333;
}
.money {
  margin-top: 38px;
}
.moneyspan {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333;
}
.ml {
  margin-left: 12px;
}

.wdth {
  width: 400px;
}
.zhongjan {
  width: 50px;
  height: 10px;
}
.zhonghou1 {
  width: 60px;
}
.el-radio {
  margin-right: 0;
}

/deep/input::-webkit-input-placeholder {
  color: #383838 !important;
}

/deep/input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #383838 !important;
}
/deep/input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #383838 !important;
}
/deep/input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #383838 !important;
}
/deep/input {
  color: #383838 !important;
}
/deep/.el-radio__label {
  font-size: 14px;
  padding-left: 5px !important;
}
</style>
