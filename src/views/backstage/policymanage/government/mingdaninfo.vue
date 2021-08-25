<template>
  <div class="policydetails">
  
    <!-- 第三个页面 -->
    <el-card style="margin-top:20px">
        <div class="goback" @click="goback"><i class="iconfont iconfanhui1"></i> 返回</div>
      <h1 class="policytitle">
        {{ policylist.year }}年{{ policylist.title
        }}<span style="margin-left:10px;">公示名单</span>
      </h1>
      <div v-show="allpici.length != 0">
        <div class="type">
          <span
            v-for="(item, index) in piciobj"
            :key="index"
            ref="namerefs"
            :class="index == selected ? 'selected' : ''"
            @click="clikpc(item.publicListId, index)"
            >第{{ item.batchNo }}批</span
          >
          <!-- 超过的部分下拉框显示 -->

          <div class="xialakuagn" v-if="piciobj2.length >= 1">
            <el-dropdown trigger="click" @command="commandchange">
              <el-button type="primary">
                第{{ keynum }}批<i
                  class="el-icon-arrow-down el-icon--right"
                ></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <template>
                  <div>
                    <el-dropdown-item
                      v-for="(item, index) in piciobj2"
                      :command="composeValue(item.publicListId, item.batchNo)"
                      :key="index"
                      >第{{ item.batchNo }}批</el-dropdown-item
                    >
                  </div>
                </template>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <!-- 超过的部分下拉框显示 -->
          <el-input
            class="findinput"
            style="width: 200px;float:right;height:25px"
            value-key="name"
            v-model="pici"
            placeholder="请输入内容"
            @input="inputss"
          >
            <el-button
              type="primary"
              style="background-color:#5689ff;color:white;"
              slot="append"
              icon="el-icon-search"
              @click="selectSearch"
            ></el-button>
          </el-input>
        </div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="序号" prop="" width="180" align="center">
            <template slot-scope="scope">
              <span v-text="getIndex(scope.$index)"> </span>
            </template>
          </el-table-column>
          <el-table-column prop="companyName" label="企业名称" width="280">
          </el-table-column>
          <el-table-column
            prop="departmentName"
            label="立项部门"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="areaName"
            label="地区"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="课题名称"
            width="260"
            align="center"
          >
          <template slot-scope="scope">
             <div v-show="scope.row.projectTitle!='未填写'"> 
               {{ scope.row.projectTitle }}
             </div>
           </template>
          </el-table-column>
          <el-table-column prop="amount" label="立项金额" align="center">
            <template slot-scope="scope">
              <div v-show="scope.row.amount != 0">
                {{ scope.row.amount | moneyFormTwo }}万元
              </div>
              <div v-show="scope.row.amount == 0">未公开</div>
            </template>
          </el-table-column>
          <el-table-column prop="publicityTime" align="center" label="公示时间">
          </el-table-column>
        </el-table>
        <div class="block2">
          <el-pagination
            @current-change="handleCurrent2Change"
            layout="prev, pager, next, jumper"
            :page-size="10"
            :total="total"
          >
          </el-pagination>
          <div class="clickurl" style="height:100px;">
            <span>原文链接：</span><span @click="xminfo">点击前往详情 ></span>
          </div>
        </div>
      </div>
      <div v-show="allpici.length == 0" class="zhanwuimg">
        <img src="@/assets/nodata.png" alt="" />
        <p
          style="text-align:center;font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 21px;
          color: #333333;"
        >
          暂无公示名单
        </p>
      </div>
    </el-card>

    <!-- 第一个 -->
    <el-card>
      <h1 class="policytitle">
        {{ policylist.year }}年{{ policylist.title }}<span>解析</span>
      </h1>
      <div class="policybuzou">
        <div class="one">一、支持对象与申报条件</div>
        <div class="one">二、支持额度与方式</div>
        <div class="one ">三、补充说明</div>
      </div>
      <div :class="[showclass?'policyshuomin':'policyshuomin2']">
        <div
          class="two"
          style="width:25%;margin-right:7.5%;"
          v-html="policylist.applicationConditions"
        ></div>
        <div
          class="two"
          style="width:25%;margin-right:7%;margin-left:1%"
          v-html="policylist.fundingStandards"
        ></div>
        <div
          class="two towlast"
          style="width:25%;margin-left:1.5%"
          v-html="policylist.supplementaryExplanation"
        ></div>
      </div>
     <div class="moreandemore">
           <el-button type="primary" @click="showclass=!showclass" class="button2">
             <span v-if="showclass">了解更多</span>
             <span v-if="showclass==false">加载完成</span>
             </el-button>
      </div>
    </el-card>
    <!-- 第二个页面 -->
    <el-card style="margin-top:20px">
      <h1 class="policytitle">
        {{ policylist.year }}年{{ policylist.title }}
        <span class="yuanwen"> 原文</span>
      </h1>
      <div class="contentxt" v-html="policylist.context"></div>
      <div
        v-show="policylist.context != '<p><br></p>'"
        class="clickurl"
        style="height:100px;"
      >
        <span>原文链接：</span><span @click="newsinfo">点击前往详情 ></span>
      </div>
      <div v-show="policylist.context == '<p><br></p>'" class="zhanwuimg">
        <img src="@/assets/nodata.png" alt="" />
        <p
          style="text-align:center;font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 21px;
          color: #333333;"
        >
          暂无原文
        </p>
      </div>
      <!-- 下载详情 -->
       <div
        v-show="policylist.context != '<p><br></p>'"
        class="clickurl clickurl2"
        style="height:100px;"
      >
        <div class="uploadUrl">
          <div v-show="urlenght != 0" style=" font-weight: bold;margin-bottom:10px;">附件下载：</div>
          <p v-for="(item, index) in policylist.uploadList" :key="index">
            <a id="download" @click="uploadConten(item.uploadUrl,item.name)"
              ><span></span>{{ item.name }}</a
            >
          </p>
        </div>
      </div>

    </el-card>

    <uniInfo :uniid="id"></uniInfo>
  </div>
</template>

<script>
import {
  getpolicyId,
  getIdnoList,
  getsubsidylist,
  getYear,
} from "@/utils/goverment.js";
import { log } from "util";
import uniInfo from './component/uniInfo.vue'
import download from 'downloadjs';
export default {
  name:"mingdaninfo",
   components:{
      uniInfo,
  },
  data() {
    return {
      urlenght:0,
      showclass:true,
      total: 0,
      id: "",
      proxyInfo: "",
      policylist: {},
      input3: "",
      pici: "",
      tableData: [],
      piciobj: {},
      piciarr: [],
      querysublis: {
        pageNum: 1,
        pageSize: 10,
        publicListId: "",
        searchParam: "",
      },
      test: "",
      cardlisd: [],
      urll: "",
      piciobj2: {},
      keynum: "",
      piciurl: "",
      allpici: [],
      selected: 0,
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getpolicyInfo();
    this.gettab();
  },
  mounted() {
    document.querySelector(".goback").scrollIntoView();
  },
  methods: {
    getpolicyInfo() {
      // 查公司头部详情
      getpolicyId(this.id).then((res) => {
        // console.log(res,"公司详情");
        this.policylist = res.data;
        console.log(this.policylist, "详情");
        this.urll = this.policylist.contextUrl;
        this.urlenght = this.policylist.uploadList.length;
      });
      // 查询公司批次信息
      getIdnoList(this.id).then((res) => {
        this.allpici = res.rows;

        if (res.rows.length == 0) {
          return;
        } else if (res.rows.length >= 1 && res.rows.length <= 3) {
          this.piciurl = res.rows[0].url;
          console.log(res.rows);
          this.piciobj = res.rows;
        } else if (res.rows.length > 3) {
          const project = res.rows;
          console.log(project.length, "索引");
          const index = project.length;
          let a1 = project.slice(0, 3);
          let a2 = project.slice(3, index);
          // var p2 = ar.slice(3);
          console.log(a1, "截取的第一");
          console.log(a2, "截取第二");
          this.piciobj = a1;
          this.piciobj2 = a2;
          this.keynum = a2[0].batchNo;
        }
        this.piciurl = res.rows[0].url;
        this.querysublis.publicListId = res.rows[0].publicListId;
        getsubsidylist(this.querysublis).then((res) => {
          // console.log(res,"#111");
          this.tableData = res.rows;
          this.total = res.total;
        });
      });

      // 总补贴
      getYear().then((res) => {
        console.log(res, "总年份");
        this.cardlisd = res.data;
      });
    },
    gettab() {
      // let pid= JSON.parse(sessionStorage.getItem("POID"))
      // this.querysublis.publicListId=pid
    },
    getIndex($index) {
      return (
        (this.querysublis.pageNum - 1) * this.querysublis.pageSize + $index + 1
      );
    },
    clikpc(id, index) {
      // console.log(id);
      this.selected = index;
      this.querysublis.publicListId = id;
      this.allpici.forEach((item) => {
        if (item.publicListId == id) {
          console.log(item, "公司的批次信息");
          this.piciurl = item.url;
        }
      });

      getsubsidylist(this.querysublis).then((res) => {
        console.log(res);
        this.tableData = res.rows;
        this.total = res.total;
      });
    },
    handleCurrent2Change(val) {
      this.querysublis.pageNum = val;
      getsubsidylist(this.querysublis).then((res) => {
        console.log(res);
        this.tableData = res.rows;
        this.total = res.total;
      });
    },
    xminfo() {
      // console.log(url);
      if (
        this.piciurl === "未填写" ||
        this.piciurl === null ||
        this.piciurl === ""
      )
        return this.$message.error("暂无链接");
      if (
        this.piciurl.indexOf("http") == -1 &&
        this.piciurl.indexOf("www") == -1
      )
        return this.$message.error("暂无链接");
      // console.log(this.piciurl.indexOf("www"));
      if (
        this.piciurl.indexOf("www") != -1 &&
        this.piciurl.indexOf("http") == -1
      ) {
        window.open("http://" + this.piciurl, "_blank");
      } else if (this.piciurl.indexOf("http") != -1) {
        window.open(this.piciurl, "_blank");
      }
    },
    newsinfo() {
      if (this.urll === "未填写" || this.urll === null || this.urll === "")
        return this.$message.error("暂无链接");
      if (this.urll.indexOf("http") == -1 && this.urll.indexOf("www") == -1)
        return this.$message.error("暂无链接");
      // console.log(this.urll.indexOf("www"));
      if (this.urll.indexOf("www") != -1 && this.urll.indexOf("http") == -1) {
        window.open("http://" + this.urll, "_blank");
      } else if (this.urll.indexOf("http") != -1) {
        window.open(this.urll, "_blank");
      }
    },
    selectSearch() {
      this.querysublis.searchParam = this.pici;
      getsubsidylist(this.querysublis).then((res) => {
        // console.log(res);
        this.tableData = res.rows;
        this.total = res.total;
      });
    },
    inputss() {
      if (this.pici == "") {
        this.querysublis.searchParam = this.pici;
        getsubsidylist(this.querysublis).then((res) => {
          // console.log(res);
          this.tableData = res.rows;
          this.total = res.total;
        });
      }
    },
    composeValue(item, row) {
      return {
        id: item,
        name: row,
      };
    },
    commandchange(item) {
      this.selected = -1;
      console.log(item.id);
      this.allpici.forEach((itema) => {
        if (itema.publicListId == item.id) {
          console.log(itema, "公司的批次信息");
          this.piciurl = itema.url;
        }
      });

      this.keynum = item.name;
      this.querysublis.publicListId = item.id;
      getsubsidylist(this.querysublis).then((res) => {
        console.log(res, "批次信息");
        this.tableData = res.rows;
        this.total = res.total;
      });
    },
    goback(){
      // this.$router.go(-1)
      this.$router.back()
    },
    Download(row) {
		let fileName = row.name.lastIndexOf(".");//取到文件名开始到最后一个点的长度
		let fileNameLength = row.name.length;//取到文件名长度
		let fileFormat = row.name.substring(fileName + 1, fileNameLength);//截取文件的后缀名。
		if(fileFormat=='xls'||fileFormat=='xlsx'){
			let link = document.createElement("a");
			link.style.display = "none";
			link.href = row.url;
			link.setAttribute("download", row.name);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link); // 下载完成移除元素
		}else{
			download(row.url)
		}
	 },
    uploadConten(urls,names) {
      const rows={
        url:this.$http+urls,
        name:names
      }
    console.log(rows);
    this.Download(rows)
    },
  },
  filters: {
    money: function(value) {
      return Math.ceil(value / 10000);
    },
  },
};
</script>

<style lang="less" scoped>
.policytitle {
  height: 80px;
  line-height: 80px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #333333;
  opacity: 1;
  text-align: center;
  span {
    padding: 2px 3px;

    font-size: 13px;
    width: 40px;
    // height: 21px;
    background: #e8d9fc;
    color: #974afe;
    opacity: 1;
    border-radius: 2px;
  }
  .yuanwen {
    background-color: #fdf0ec;
    color: #fd6f4b;
  }
}
.policybuzou {
  display: flex;
  padding: 0 50px;
  height: 50px;
  background-color: #e4eeff;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 50px;
  color: #0453fa;
  justify-content: space-between;
  .one {
    width: 33%;
  }
}

.policyshuomin2 {
  transition: 1s;
  margin-top: 20px;
  display: flex;
  // justify-content: space-around;
  padding: 0 50px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 20px;
  color: #333333;
  .two {
    width: 33%;
    padding-right: 1%;
  }
  .towlast {
    margin-left: 2%;
  }
}

.policyshuomin {
   transition: 1s;
  height: 98px;
  margin-top: 20px;
  display: flex;
  // justify-content: space-around;
  padding: 0 50px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 20px;
  color: #333333;
  margin-bottom: 20px;
  // display: -webkit-box;
  // -webkit-box-orient: vertical;
  // -webkit-line-clamp: 3;
  // overflow: hidden;
  .two {
    width: 33%;
    padding-right: 1%;
     display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
  }
  .towlast {
    margin-left: 2%;
  }
}


.contentxt {
  padding: 20px 50px;
  line-height: 25px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 24px;
  color: #333333;
}
.type {
  position: relative;
  height: 70px;
  line-height: 70px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 16px;
  color: #427bf2;
  text-align: center;
  // margin-left: 105px;
  display: flex;
  justify-content: center;
  span {
    display: block;
    width: 60px;
    height: 28px;
    margin: 0 8px;
    background-color: #fff;
    border-radius: 5px;
    cursor: pointer;
    padding: 5px 5px;
    background-color: #ecf5ff;
    //  border-top: 1px solid #4c22da;
  }
}
.el-select-dropdown__item {
  font-size: 12px;
}
.findinput {
  position: absolute;
  right: 0;
  background-color: #f0ecfe;
  color: #105bfa;
}
.el-table > .success-row td {
  background: #e4eeff !important;
  cursor: pointer !important;
}
/deep/.el-table /deep/thead > tr:first-child th {
  background: rgb(240, 240, 240) !important;
}
/deep/.el-table /deep/thead > tr:last-child th {
  background-color: #e4eeff !important;
  height: 69px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #0453fa;
  text-align: center;
}
.clickurl {
      margin-right: 50px;
  float: right;
  span {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    &:first-child {
      color: #333333;
    }
    &:last-child {
      color: #1046c4;
      cursor: pointer;
    }
  }
}
.block2 {
  margin-top: 20px;
  position: relative;
  height: 100px;
  .el-pagination {
    position: absolute;
    left: 48%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
}
.foottotal {
  height: 350px;
}
.foottitle {
  img {
    vertical-align: middle;
  }
  span {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 21px;
    color: #333333;
  }
}
.footmain {
  display: flex;
  justify-content: space-around;
  margin-top: 60px;
  // width: 1200px;
  // margin: 0 auto;
  .cardyear {
    width: 20%;
    height: 178px;
    background: url("../../../../assets/indexbg/3449.png");
    background-size: 100%;
    &:nth-child(2) {
      background: url("../../../../assets/indexbg/3450.png");
      background-size: 100%;
    }
    &:nth-child(3) {
      background: url("../../../../assets/indexbg/3451.png");
      background-size: 100%;
    }
    &:nth-child(4) {
      background: url("../../../../assets/indexbg/3452.png");
      background-size: 100%;
    }
    &:nth-child(5) {
      background: url("../../../../assets/indexbg/5718.png");
      background-size: 100%;
    }
    p {
      font-size: 26px;
      font-family: Arial;
      font-weight: bold;
      line-height: 31px;
      color: #ffffff;
      padding-left: 51px;
      padding-top: 35px;
    }
    .jinzi {
      margin-top: 5px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      i {
        font-style: normal;
        font-size: 11px;
        color: #ffffff;
      }
      // div{
      //   // margin-top: 20px;

      // }
      span {
        font-size: 26px;
        font-family: Arial;
        font-weight: normal;
        color: #ffffff;
      }
      .zzjine {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
      }
    }
  }
}

.xialakuagn {
  // float: right;
  // position: absolute;
  // margin-left: 300px;
  top: -8px;
  left: 50%;
  /deep/.el-button--primary {
    position: relative;
    /* line-height: 20px; */
    width: 80px;
    color: #4c22da;
    background-color: #f0ecfe;
    border-color: #ecf5ff;
    height: 20px;
    line-height: 20px;
    span {
      position: absolute;
      top: 3px;
      line-height: 20px;
      left: 18px;
      font-size: 12px;
    }
  }
}
.zhanwuimg {
  position: relative;
  width: 618px;
  height: 390px;
  margin: 0 auto;
  img {
    width: 100%;
    height: 100%;
  }
  p {
    position: absolute;
    top: 350px;
    left: 10px;
    bottom: 0;
    right: 0;
    margin: auto;
  }
}

.selected {
  // border-bottom: 1px solid #256bff!important;
  background-color: #59abff !important;
  color: #fff !important;
  border: 0 !important;
}
.goback {
  width: 100px;
  padding-top: 10px;
  height: 25px;
  font-size: 15px;
  font-family: Microsoft YaHei;
  color: #333;
  cursor: pointer;
}
.clickurl2 {
  height: 100% !important;
  float: left;
  margin-left: 50px;
  .uploadUrl {
    p {
      cursor: pointer;
      height: 20px;
      padding: 15px 0;
      font-family: Microsoft YaHei;
      font-size: 14px;
      &:first-child {
        font-weight: bold;
      }
      span {
        color: #494949;
      }
      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.moreandemore{
  height: 30px;
  display: flex;
  justify-content: center;
  .button2{
    width: 79px;
    height: 26px;
    // line-height: 26px;
    text-align: center;
    background-color: #fff;
    border: 1px solid #929292;
    &:hover span{
      transition: 1s;
      margin-left: -13px;
      color: #256bff;
    }
    &:hover{
    border: 1px solid #256bff;
    }
    &:hover span::after{
      opacity: 1;
      right: -25px;
      color: #256bff;
    }
    span{
      margin-left: -5px;
      position: relative;
      display: block;
      width: 100%;
      height: 26px;
      line-height: 30px;
      color: #929292;
      transition: 1s;
      font-size: 12px;
      margin-top: -15px;
      // line-height: 5px;
      &:after {
          content: '»';
          position: absolute;
          opacity: 0;
          top: -2px;
          right: -30px;
          transition: 0.3s;
          color: #929292;
          font-size: 24px;
      }
    }
  }
}
/deep/.el-table__header,/deep/.el-table__body,/deep/.el-table__footer{
   width: 100%;
   table-layout: fixed !important;
}
</style>
