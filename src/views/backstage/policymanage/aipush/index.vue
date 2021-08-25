<template>
  <div class="aipush">
    <!-- 订阅管理 -->
    <div class="subscribe">
      <div class="subtop">
        <div class="sublogo">
          <div class="img">
            <img src="@/assets/indexlogo/pushlogo2.png" alt="" />
          </div>
          <span  class="subtitle">订阅管理</span>
        </div>
        <div class="submethod">
          <div class="queding" v-show="showone">
            <!-- <span @click="showone = false">🗙</span> -->
            <p>您已开启推送通知啦！</p>
            <p style="margin-top:20px">
              我们将会把政策以 <i v-if="showtitl1">邮箱 </i
              ><i v-if="showtitl2">短信</i> 的形式推送给您。
            </p>
          </div>
          <span class="bunsde" ref="youxiang1" @click="updateEmail">邮箱</span>
          <span class="bunsde" ref="duanx1" @click="updateSys">短信</span>
          <!-- <el-button type="primary" size="small" plain ref="duanx1"></el-button> -->
          <!-- <el-button type="success" size="small" plain>短信</el-button> -->
        </div>
      </div>
      <div class="submain">
        <div class="leftsub">
         
          <div class="leftitle">
            <span style="margin-left:1px">已订阅列表</span>
          </div>
          <div>
          <div class="leftab">
           <div v-show="dingyuedata.length!=0"> <div
              class="cardlist"
              v-for="(item, index) in dingyuedata"
              :key="index"
            >
              <span class="onetile" @click="selectpage(item.policyId)">{{item.year}}年{{
                item.title
              }}</span>
              <span class="twolist">{{item.areaName}}{{ item.departmentName }}</span>
              <span class="twolist secontl"
                ><i class="el-icon-time"></i> 订阅时间:
                {{ item.createTime |iosTime}}</span
              >
              <div class="notsuc" @click="notSubscribe1(item.policyId)">
                取消订阅
              </div>
            </div>
            <div class="blocklefttab">
              <el-pagination
                @current-change="handleOneCurrentChange"
                layout="prev, pager, next, jumper"
                :page-size="6"
                :total="total1"
              >
              </el-pagination>
            </div>
            </div>
             <div v-show="dingyuedata.length==0" class="zhanwuimg">
                <img style="width:100%" src="@/assets/nodata.png" alt="">
                <p>暂无订阅</p>
            </div>
          </div>
          </div>
     
        </div>
        <div class="leftsub rightsub">
          <div class="leftitle">
            <span style="margin-left:16px;">推送列表</span>
          </div>
        
          <div class="leftab" style="margin-left: 1%;">  
              <div v-show="tuisongdata.length!=0">
             <div
              class="cardlist"
              v-for="(item, index) in tuisongdata"
              :key="index"
            >
              <span class="onetile" @click="clickinfo(item.policyId)">{{item.year}}年{{ item.title }}</span>
              <div class="newNameList">
                {{ item.type === 0 ? "此项目公示名单已更新" : "申报时间已过期" }}
              </div>
              <span class="twolist">{{item.areaName}}{{ item.departmentName }}</span>
              <span class="twolist secontl"
                ><i class="el-icon-time"></i> 订阅时间:
                {{ item.createTime |iosTime}}</span
              >
              <div class="suc" @click="addmdxq(item.policyId)">查看详情</div>
            </div>
              </div>
            <div v-show="tuisongdata.length!=0" class="blocklefttab">
              <el-pagination
                @current-change="handleTwoCurrentChange"
                layout="prev, pager, next, jumper"
                :page-size="6"
                :total="total2"
              >
              </el-pagination>
             
            </div>
          <div v-show="tuisongdata.length==0" class="zhanwuimg">
              <img style="width:100%" src="@/assets/nodata.png" alt="">
              <p>暂无推送</p>
           </div>
          </div>
        </div>
      </div>
    </div>
    <!--// 订阅管理 -->

    <!-- 智能推送政策列表 -->
    <div class="subscribe">
      <div class="subtop">
        <div class="sublogo">
          <div class="img">
            <img height="25" src="@/assets/indexlogo/pushlogo1.png" alt="" />
          </div>
          <span class="subtitle">智能推送政策列表</span>
        </div>
        <div class="submethod">
          <div class="queding" v-show="showtwo">
            <!-- <span @click="showtwo = false">🗙</span> -->
            <p>您已开启推送通知啦！</p>
            <p style="margin-top:20px">
              我们将会把政策以 <i v-if="showtitl3">邮箱 </i
              ><i v-if="showtitl4">短信</i> 的形式推送给您。
            </p>
          </div>
          <span class="bunsde" ref="youxiang2" @click="updateyx2">邮箱</span>
          <span class="bunsde" ref="duanx2" @click="updateysys2">短信</span>
        </div>
      </div>
      <div class="submain submain2">
        <div v-show="zhinengdata.length!=0">
        <div
          class="cardlist cardlist2"
          v-for="(item, index) in zhinengdata"
          :key="index"
        >
          <span class="onetile" @click="clickinfo(item.policyId)">{{item.year}}年{{ item.title }}</span>
          <div class="newNameList">
            {{
              item.state === 0
                ? "此项目公示名单已更新"
                : "此项目的申报时间快到截止日期"
            }}
          </div>
        
          <span class="twolist">{{item.areaName}}{{ item.departmentName }}</span>
          <span class="twolist secontl"
            ><i class="el-icon-time"></i> 推送时间: {{ item.createTime |iosTime}}</span
          >
          <div class="suc nowpush newpushbtn" @click="aipushadd(item.state,item.policyId,item.declare_url)">
            {{ item.state === 0 ? "立即查看" : "立即申报" }}
          </div>
        </div>
      </div>
     
         <div v-show="zhinengdata.length==0" class="zhanwuimg"> 
              <img style="width:100%" src="@/assets/nodata.png" alt="">
              <p>暂无推送</p>
         </div>

      </div>
       <div class="blockmaintab" v-show="zhinengdata.length!=0" >
        <el-pagination
          @current-change="handleThreeCurrentChange"
          layout="prev, pager, next, jumper"
         :page-size="6"
          :total="total3"
        >
        </el-pagination>
      </div>
    </div>
    <!--// 智能推送政策列表 -->

    <!-- 待办事宜 -->
    <div class="subscribe">
      <div class="subtop">
        <div class="sublogo">
          <div class="img">
            <img src="@/assets/indexlogo/pushlogo3.png" alt="" />
          </div>
          <span class="subtitle">待办事宜</span>
        </div>
        <div class="submethod">
          <div class="queding" v-show="showthree">
            <!-- <span @click="showthree = false">🗙</span> -->
            <p>您已开启推送通知啦！</p>
            <p style="margin-top:20px">
              我们将会把政策以 <i v-if="showtitl5">邮箱 </i
              ><i v-if="showtitl6">短信</i> 的形式推送给您。
            </p>
          </div>
          <span class="bunsde" ref="youxiang3" @click="updateyx3">邮箱</span>
          <span class="bunsde" ref="duanx3" @click="updateysys3">短信</span>
        </div>
      </div>
      <div class="submain">
        <div class="leftsub">
          <div class="leftitle">
            <span style="margin-left:1px;">待办</span>
          </div>
          <div class="leftab">
           <div v-show="daibnadata.length!=0">
            <div
              class="cardlist"
              v-for="(item, index) in daibnadata"
              :key="index"
            >
              <span class="onetile" @click="clickinfo(item.policyId)">{{item.year}}年{{ item.title }}</span>
              <span class="twolist secondspan" >{{item.areaName}}{{ item.departmentName }}</span>
              <span class="twolist secontl secondspan"
                ><i class="el-icon-time"></i> 推送时间:
                {{ item.createTime |iosTime }}</span
              >
              <span class="ppeihou">此项目已通过一级匹配，可录入二级和三级匹配条件进行更精确匹配</span>
              <div class="suc nowpush nowblue" @click="addMatch(item.policyId, item.mattersId)">
                立即录入
              </div>
            </div>

            <div class="blocklefttab">
              <el-pagination
                @current-change="handlefourCurrentChange"
                layout="prev, pager, next, jumper"
                :page-size="6"
                :total="total4"
              >
              </el-pagination>
            </div>
            </div>
            <div v-show="daibnadata.length==0" class="zhanwuimg">
              <img style="width:100%" src="@/assets/nodata.png" alt="">
              <p>暂无待办</p>
            </div>

          </div>
        </div>

        <div class="leftsub rightsub ">
          <div class="leftitle">
            <span>已办</span>
          </div>
          <div class="leftab" style="margin-left: 1%;">
            <div v-show="yibnadata.length!=0">
            <div
              class="cardlist"
              v-for="(item, index) in yibnadata"
              :key="index"
            >
              <span v-if="item.result==2" class="onetile suces">未成功</span><span  v-if="item.result==1" class="onetile suces errors">已成功</span><span class="onetile" @click="clickinfo(item.policyId)">{{item.year}}年{{ item.title }}</span>
              <!-- <div class="newNameList">
                {{
                  item.state === 0
                    ? "此项目公示名单已更新"
                    : "此项目的申报时间快到截止日期"
                }}
              </div> -->
              <span class="twolist">{{item.areaName}}{{ item.departmentName }}</span>
              <span class="twolist secontl"
                ><i class="el-icon-time"></i> 办理时间:
                {{ item.handleTime |iosTime}}</span
              >
              <div v-if="item.state==0" class="suc nowpush colornot" >已截止</div>
              <div v-if="item.state==1" class="suc nowpush" @click="clickadd(item.declareUrl)">申报中</div>
              <div v-if="item.state==2" class="suc nowpush" style="cursor:not-allowed;">待开放</div>
            </div>
            <div class="blocklefttab">
              <el-pagination
                @current-change="handleFiveCurrentChange"
                layout="prev, pager, next, jumper"
                :page-size="6"
                :total="total5"
              >
              </el-pagination>
            </div>
            </div>
             <div v-show="yibnadata.length==0" class="zhanwuimg">
              <img style="width:100%" src="@/assets/nodata.png" alt="">
              <p>暂无已办</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--// 待办事宜 -->

    <!-- 弹窗立即录入 -->
    <el-dialog  :close-on-click-modal="false" :visible.sync="dialogVisible" width="60%">
      <span slot="title" class="scxm">2019年度宝安区经贸交流活动补贴</span>


      <div class="two">
        <mathching4 :templatelist="templatelist" :mattersId="mattersId" @twoppSuccess="twoppSuccess"></mathching4>
      </div>


      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
import {
  getSubscribeList,
  getpassList,
  getsmartPush,
  getalreadyHandle,
  getwaitHandle,
  getSendlist,
  getLable,
  updatePush,
  // 匹配记录（两个）
  twoPPrecording
} from "@/utils/aipush.js";
import { deletepolicyId } from "@/utils/goverment.js";
// 导入mac冲突的时间格式处理插件
import moments from 'moment/moment'

import mathching4 from "@/components/mathching4/mathching4.vue"
export default {
  name:"aipush",
  data() {
    return {
      timer: "",
      // 控制弹窗的显示
      dialogVisible: false,
      // 立即订阅
      issubscribe: true,
      //立即查看
      isseenow: false,
      yqueryform: {
        pageNum: 1, //页数
        pageSize: 6, //条数
      },
      pqueryform: {
        pageNum: 1, //页数
        pageSize: 6, //条数
      },
      squeryform: {
        pageNum: 1, //页数
        pageSize: 6, //条数
      },
      //待办事项query
      awaitform: {
        pageNum: 1, //页数
        pageSize: 6, //条数
      },
      alreadyform: {
        pageNum: 1, //页数
        pageSize: 6, //条数
      },
      currentPage3: 5,
      total1: 0,
      total2: 0,
      total3: 0,
      total4: 0,
      total5: 0,
      dingyuedata: [],
      tuisongdata: [],
      zhinengdata: [],
      daibnadata: [],
      yibnadata: [],
      sendtype: [],
      showone: false,
      showtitl1: false,
      showtitl2: false,
      showtitl3: false,
      showtwo: false,
      showtitl3: false,
      showtitl4: false,
      showthree: false,
      showtitl5: false,
      showtitl6: false,
      // radio:"1"
      // 二阶匹配值
      mianji1: "",
      mianji2: "",
      mianji3: "",
      mianji4: "",
      mianji5: "",
      mianji6: "",
      radioguo: "1",
      checkList: [],
      radiozz: "0",
      // 二阶匹配值

      // 三阶匹配值
      mianji7: "",
      mianji8: "",
      mianji9: "",
      mianji10: "",
      mianji11: "",
      mianji12: "",
      radioguo1: "1",
      checkList1: [],
      radiozz1: "0",
      // 三阶匹配值
      //改变订阅方式
      updateform: {
        email: "",
        inside: "",
        sms: "",
        type: "",
      },
      updateform2: {
        email: "",
        inside: "",
        sms: "",
        type: "",
      },
      updateform3: {
        email: "",
        inside: "",
        sms: "",
        type: "",
      },

      // 匹配记录（两个）
      templatelist: [],
      mattersId:'',
    };
  },
  created() {
    this.getInfo();
    this.gettype();
  },
   filters: {
    iosTime(val){
      return moments(val).format('YYYY/MM/DD HH:mm:ss')
    }
  },
  methods: {
    aipushadd(state,id,url){
      if(state===0){
        // this.$router.push({ path: "policydetails", query: { id: id } });
        this.$router.push({ path: "mingdaninfo", query: { id: id } });
      }else{
      // if (url === "未填写" || url === null || url === "") return;
      // top.location.href = url
      if (url.indexOf("http") == -1) {
          window.open("https://" + url, "_blank");
        } else {
          window.open(url, "_blank");
        }
      }
    },
    // 点击跳转
    clickadd(url){
      console.log(url);
      //  if (url === "未填写" || url === null || url === "") return;
      // top.location.href = url
     if (url.indexOf("http") == -1) {
          window.open("https://" + url, "_blank");
        } else {
          window.open(url, "_blank");
        }
    },
    clickinfo(id) {
      this.$router.push({ path: "policydetails", query: { id: id } });
    },
    // clickinfo(url){
    //   console.log(url);
    // },
    getInfo() {
      // 订阅列表 $1
      getSubscribeList(this.yqueryform).then((res) => {
        console.log(res, "订阅列表");
        this.dingyuedata = res.rows
        this.total1 = res.total;
        // console.log(this.total1);
      });
      // 推送列表
      // pqueryform $2
      getpassList(this.pqueryform).then((res) => {
        console.log(res, "推送列表");
        this.tuisongdata = res.rows;
        this.total2 = res.total;
      });

      //智能推送列表 #4
      getsmartPush(this.squeryform).then((res) => {
        console.log(res,"智能推送列表");
        this.zhinengdata = res.rows;
        this.total3 = res.total;
      });

      // 待办列表  #5
      getwaitHandle(this.awaitform).then((res) => {
        console.log(res, "待办列表");
        this.daibnadata = res.rows;
        this.total4 = res.total;
      });

      // 已办事项 #6
      getalreadyHandle(this.alreadyform).then((res) => {
        console.log(res,"已办事项");
        this.yibnadata = res.rows
        this.total5 = res.total;
      });
    },
    gettype() {
      // 请求推送方式接口
      getSendlist().then((res) => {
        console.log(res, "推送方式");
        this.sendtype = res.data;
        this.updateform.email = this.sendtype[0].email;
        this.updateform.inside = this.sendtype[0].inside;
        this.updateform.sms = this.sendtype[0].sms;

        // 第二个form的数据
        this.updateform2.email = this.sendtype[1].email;
        this.updateform2.inside = this.sendtype[1].inside;
        this.updateform2.sms = this.sendtype[1].sms;

        // 第三个form数据
        this.updateform3.email = this.sendtype[2].email;
        this.updateform3.inside = this.sendtype[2].inside;
        this.updateform3.sms = this.sendtype[2].sms;

        if (this.sendtype[0].type == 1) {
          if (this.sendtype[0].email == 1) {
            // this.showone = false;
            this.$refs.youxiang1.style =
              " background-color: #417eff;color:white";
            this.showtitl1 = true;
          }
          if (this.sendtype[0].sms == 1) {
            // this.showone = true;
            this.$refs.duanx1.style = " background-color: #70b959;color:white";
            this.showtitl2 = true;
          }
        }

        if (this.sendtype[1].type == 2) {
          if (this.sendtype[1].email == 1) {
            // this.showtwo = true;
            this.$refs.youxiang2.style =
              " background-color: #417eff;color:white";
            this.showtitl3 = true;
          }
          if (this.sendtype[1].sms == 1) {
            // this.showtwo = true;
            this.$refs.duanx2.style = " background-color: #70b959;color:white";
            this.showtitl4 = true;
          }
        }

        if (this.sendtype[2].type == 3) {
          if (this.sendtype[2].email == 1) {
            // this.showthree = true;
            this.$refs.youxiang3.style =
              " background-color: #417eff;color:white";
            this.showtitl5 = true;
          }
          if (this.sendtype[2].sms == 1) {
            // this.showtwo = true;
            this.$refs.duanx3.style = " background-color: #70b959;color:white";
            this.showtitl6 = true;
          }
        }
      });
    },
    // 点击订阅
    addSubscribe() {
      this.issubscribe = false;
    },
    // 点击取消订阅
    notSubscribe() {
      this.issubscribe = true;
    },
    //  文章多了以后切换下一页 $3
    handleTwoCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.yqueryform.pageNum = val;
      getSubscribeList(this.yqueryform).then((res) => {
        this.tuisongdata = res.rows;
        this.total2 = res.total;
      });
    },
    //  文章多了切换下一页 $4
    handleOneCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.yqueryform.pageNum = val;
      getSubscribeList(this.yqueryform).then((res) => {
        // console.log(res, "订阅列表");
        this.dingyuedata = res.rows;
        this.total1 = res.total;
      });
    },
    handleThreeCurrentChange(val) {
      this.squeryform.pageNum = val;
      getsmartPush(this.squeryform).then((res) => {
        // console.log(res,"智能推送列表");
        this.zhinengdata = res.rows;
        this.total3 = res.total;
      });
    },
    // 已办
    handleFiveCurrentChange(val) {
      this.alreadyform.pageNum = val;
      getalreadyHandle(this.alreadyform).then((res) => {
        console.log(res,"已办事项");
        this.yibnadata = res.rows
        this.total5 = res.total;
      });
    },
    // 待办
    handlefourCurrentChange(val) {
      this.awaitform.pageNum = val;
      getwaitHandle(this.awaitform).then((res) => {
        console.log(res, "待办列表");
        this.daibnadata = res.rows;
        this.total4 = res.total;
      });
    },
    // 订阅列表取消订阅
    notSubscribe1(id) {
      deletepolicyId(id).then((res) => {
        console.log(res);
        if (res.code === 200) {
          this.$message.success("取消订阅成功");
          getSubscribeList(this.yqueryform).then((res) => {
            console.log(res, "订阅列表");
            this.dingyuedata = res.rows;
            this.total1 = res.total;
          });
        }
      });
    },
    // 匹配记录（两个）
    addMatch(id, mattersId) {
      console.log("pid",id,"mat",mattersId);
      this.mattersId = mattersId;
      getLable(id).then((res) => {
        console.log(res, "立即录入");
        if(res.code != 200){
          this.$message.error("获取匹配数据失败！");
          return;
        }

        this.templatelist = res.data;
        this.dialogVisible = true;
      });
    },
    twoppSuccess(){
      this.dialogVisible = false;
       // 待办列表  #5
      getwaitHandle(this.awaitform).then((res) => {
        console.log(res, "待办列表");
        this.daibnadata = res.rows;
        this.total4 = res.total;
      });

      // 已办事项 #6
      getalreadyHandle(this.alreadyform).then((res) => {
        // console.log(res,"已办事项");
        this.yibnadata = res.rows;
        this.total5 = res.total;
      });
    },
    selectpage(id) {
      this.$router.push({ path: "policydetails", query: { id: id } });
    },
    // 更改订阅方式
    updateEmail() {
      // 确定第一个类型
      this.updateform.type = 1;
      if (this.sendtype[0].type == 1) {
        if (this.sendtype[0].email == 1) {
          this.updateform.email = 0;
          updatePush(this.updateform).then((res) => {
            this.gettype();
            this.$message.success("取消订阅成功");
            this.$refs.youxiang1.style =
              " background-color: white;color:#417eff";
            this.showtitl1 = false;
          });
        } else {
          this.updateform.email = 1;
          updatePush(this.updateform).then((res) => {
            this.gettype();
            this.$message.success("订阅成功");
            this.showone = true;
            this.timer = setTimeout(() => {
              this.showone = false;
            }, 3000);
            this.timer = "";
          });
        }
      }
    },
    updateSys() {
      // 确定第一个类型的短信订阅方式
      this.updateform.type = 1;
      if (this.sendtype[0].type == 1) {
        if (this.sendtype[0].sms == 1) {
          this.updateform.sms = 0;
          updatePush(this.updateform).then((res) => {
            this.gettype();
            this.$message.success("取消订阅成功");
            this.$refs.duanx1.style = " background-color: white;color:#417eff";
            this.showtitl2 = false;
          });
        } else {
          this.updateform.sms = 1;
          updatePush(this.updateform).then((res) => {
            this.gettype();
            // this.$message.success('订阅成功')
            this.showone = true;
            this.timer = setTimeout(() => {
              this.showone = false;
            }, 2000);
            this.timer = "";
          });
        }
        // // 判断关闭框框
        // if(this.sendtype[0].sms == 0 || this.sendtype[0].email == 0){
        //   this.showone=false
        // }
      }
    },
    // 点击第二个
    updateyx2() {
      // 确定第一个类型
      // console.log(1);
      this.updateform2.type = 2;
      if (this.sendtype[1].type == 2) {
        if (this.sendtype[1].email == 1) {
          this.updateform2.email = 0;
          updatePush(this.updateform2).then((res) => {
            this.gettype();
            this.$message.success("取消订阅成功");
            this.$refs.youxiang2.style =
              " background-color: white;color:#417eff";
            this.showtitl3 = false;
          });
        } else {
          this.updateform2.email = 1;
          updatePush(this.updateform2).then((res) => {
            this.gettype();
            //  this.$message.success('订阅成功')
            this.showtwo = true;
            this.timer = setTimeout(() => {
              this.showtwo = false;
            }, 2000);
            this.timer = "";
          });
        }
      }
    },
    updateysys2() {
      this.updateform2.type = 2;
      if (this.sendtype[1].type == 2) {
        if (this.sendtype[1].sms == 1) {
          this.updateform2.sms = 0;
          updatePush(this.updateform2).then((res) => {
            this.gettype();
            this.$message.success("取消订阅成功");
            this.$refs.duanx2.style = " background-color: white;color:#417eff";
            this.showtitl4 = false;
          });
        } else {
          this.updateform2.sms = 1;
          updatePush(this.updateform2).then((res) => {
            this.gettype();
            // this.$message.success('订阅成功')
            this.showtwo = true;
            this.timer = setTimeout(() => {
              this.showtwo = false;
            }, 2000);
            this.timer = "";
          });
        }
      }
    },
    updateyx3(){
        this.updateform3.type = 3;
      if (this.sendtype[2].type == 3) {
        if (this.sendtype[2].email == 1) {
          this.updateform3.email = 0;
          updatePush(this.updateform3).then((res) => {
            this.gettype();
            this.$message.success("取消订阅成功");
            this.$refs.youxiang3.style =
              " background-color: white;color:#417eff";
            this.showtitl5 = false;
          });
        } else {
          this.updateform3.email = 1;
          updatePush(this.updateform3).then((res) => {
            this.gettype();
            //  this.$message.success('订阅成功')
            this.showthree = true;
            this.timer = setTimeout(() => {
              this.showthree = false;
            }, 2000);
            this.timer = "";
          });
        }
      }
    },
     updateysys3() {
      this.updateform3.type = 3;
      if (this.sendtype[2].type == 3) {
        if (this.sendtype[2].sms == 1) {
          this.updateform3.sms = 0;
          updatePush(this.updateform3).then((res) => {
            this.gettype();
            this.$message.success("取消订阅成功");
            this.$refs.duanx3.style = " background-color: white;color:#417eff";
            this.showtitl6= false;
          });
        } else {
          this.updateform3.sms = 1;
          updatePush(this.updateform3).then((res) => {
            this.gettype();
            // this.$message.success('订阅成功')
            this.showthree = true;
            this.timer = setTimeout(() => {
              this.showthree = false;
            }, 2000);
            this.timer = "";
          });
        }
      }
    },
    // 跳转到名单详情
    addmdxq(id) {
      this.$router.push({ path: "mingdaninfo", query: { id: id } });
    },
  },
  components: {
    mathching4
  }
};
</script>

<style lang="less" scoped>
.aipush {
  padding: 20px;
}
.subtop {
  position: relative;
  height: 70px;
  border-bottom: 1px solid #ccc;
  // width: 1200px;
}
.sublogo {
  position: relative;
  width: 300px;
  .img {
    position: absolute;
    top: 27px;
    width: 25px;
    height: 25px;
    // top: 10px;
    // padding-top: 10px;
    vertical-align: middle;

    img {
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
  }
  .subtitle {
    position: absolute;
    top: 40px;
    left: 33px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #333333;
  }
}
.submethod {
  margin-top: 24px;
  margin-right: 5%;
  float: right;
}
.submain {
  margin-top: 35px;
  height: 815px;
  min-height: 327px;
  margin-left: 10px;
  .leftitle {
    span {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #333333;
      border-left: 5px solid #256bff;
      padding-left: 8px;
      margin-left: 16px;
    }
  }
  .leftab {
  //    &:last-child{
  //  margin-left: 1%; 
  // }&:first-child{
  //   margin-left: 0;
  // }
    position: relative;
    width: 49%;
    height: 650px;
    margin-top: 15px;
    border: 1px solid #e6e6e6;
    // border-bottom: 0px solid #000;
    float: left;
    // margin-right: 20px;
    .blocklefttab {
      position: absolute;
      top: 665px;
      left: 50%;
      transform: translateX(-50%);
      // margin-left: -108px;
    }
  }
 
}
.cardlist {
  position: relative;
  height: 108px;
  border-bottom: 1px solid #e6e6e6;
  span {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 19px;
    color: #333333;
  }
  .suc,
  .notsuc {
    width: 73px;
    height: 29px;
    background-color: #417eff;
    line-height: 29px;
    font-size: 12px;
    text-align: center;
    color: white;
    border-radius: 3px;
    cursor: pointer;
  }
  .notsuc {
    background-color: white;
    text-align: center;
    color: #417eff;
    border: 1px solid #417eff;
  }
  .onetile {
    // position: absolute;
    float: left;
    margin-top: 18px;
    margin-left: 21px;
    cursor: pointer;
  }
  .suces{
    margin-top: 18px;
    margin-left: 21px;
    margin-right: -10px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight:3s00;
    line-height: 14px;
    color: #FB6D6D;
    background-color: #ffe1e1;
    padding: 2px 3px;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .errors{
     margin-top: 18px;
    margin-left: 21px;
    margin-right: -10px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight:3s00;
    line-height: 14px;
    color: #7fdbae;
    background-color: #e0fff1;
    padding: 2px 3px;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .twolist {
    position: absolute;
    top: 66px;
    left: 21px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #999999;
  }
  .secontl {
    position: absolute;
    left: 187px;
  }
  .suc,
  .notsuc {
    position: absolute;
    top: 39px;
    left: 80%;
  }
  .newNameList {
    // position: absolute;
    margin-top: 18px;
    // left: 258px;
    float: left;
    // width: 128px;
    padding: 0px 6px;
    height: 19px;
    background-color: #e2ebff;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 19px;
    color: #256bff;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
  }
}
.sucmatching {
  // position: absolute;
  float: left;
  margin-top: 18px;
  left: 457px;
  background-color: #ebffdf;
  width: 48px;
  color: #71d33b;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 16px;
  margin-left: 20px;
}
.nowpush {
  background-color: #fb963e !important;
}
.cardlist2 {
  margin-top: 10px;
  height: 100px;
  border: 0;
  border-bottom: 1px solid #ccc;
}
.blockmaintab {
  width: 300px;
  margin-left: 25%;
  margin: 0 auto;
  margin-top: -120px;
}
.nowpush,
.rightsuc {
  position: absolute;
  left: 79% !important;
}
.nowblue {
  background-color: #7a96ed !important;
}
.bunsde {
  padding: 5px 10px;
  width: 57px;
  height: 27px;
  border: 1px solid #ccc;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 16px;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 5px;
}
.submethod {
  position: relative;
  .queding {
    position: absolute;
    top: 23px;
    left: -93px;
    width: 300px;
    height: 101px;
    background-color: #fff;
    border: 1px solid #b8ceff;
    z-index: 5;
    p {
      margin-top: 20px;
      text-align: center;
      i {
        font-style: normal;
      }
      &:first-child {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 19px;
        color: #256bff;
      }
      &:last-child {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 19px;
        color: #666666;
      }
    }
    span {
      position: absolute;
      color: #256bff;
      top: 10px;
      left: 270px;
      cursor: pointer;
    }
  }
}

/deep/.el-dialog__header {
  height: 50px;
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
/deep/.el-radio__input.is-checked .el-radio__inner {
  background-color: #0453fa;
  // color: #0453fa;
}
/deep/.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #0453fa;
  // color: #0453fa;
}
/deep/.el-form-item__label {
  font-size: 13px;
  padding: 0px 3px 0 0;
  width: 115px;
}
.zhanwuimg{
  position: relative;
  width: 500px;
  height: 390px;
  margin: 0 auto;
  margin-top: 50%;
  transform: translateY(-70%);
  img{
    width: 100%;
    height: 100%;
  }
   p{
      position: absolute;
      top: 350px;
      left: 50%;
    margin-left: -20px;
    }
}
.newpushbtn{
  left: 88.5%!important;
}
.secondspan{
  position: absolute;
  top: 50px!important;
}
.ppeihou{
  position: absolute;
  top: 80px;
  left: 21px;
  font-size: 12px!important;
  font-family: Microsoft YaHei!important;
  font-weight: 300!important;
  color: #256bff!important;
}
.colornot{
  background-color:#fb3e3e!important;
}
.submain2{
  margin-top: 0!important;
}
</style>
