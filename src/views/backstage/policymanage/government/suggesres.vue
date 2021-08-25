<template>
  <div class="suggest">
    <div class="goback" @click="goback"><i class="iconfont iconfanhui1"></i> 返回</div>
    <p class="sugtitle">
      <img width="20px" src="@/assets/indexlogo/suggest1.png" alt="" />
      <span>工商信息</span>
    </p>
    <h1 class="titleh">
      {{ companylist.name }}<span>{{ companylist.status }}</span>
    </h1>
    <div class="naminfo">
      <div>
        <span>法人姓名：</span><i>{{ companylist.operName }}</i>
      </div>
      <div>
        <span>注册时间：</span><i>{{ companylist.startDate }}</i>
      </div>
      <div>
        <span>注册资本：</span><i>{{ companylist.registCapi }}</i>
      </div>
      <div>
        <span>登记机关：</span><i>{{ companylist.belongOrg }}</i>
      </div>
    </div>
    <div class="adress">
      <p><span>注册地址：</span>{{ companylist.address }}</p>
    </div>
    <div class="adress fanwei">
      <div class="p">
        <span>经营范围：</span><i>{{ companylist.scope }}</i>
      </div>
    </div>

  
    <!-- 补贴明细表格 -->
    <div class="mainInfo">
        <p class="sugtitle">
      <img width="20px" src="@/assets/indexlogo/suggest2.png" alt="" />
      <span>补贴明细</span>
      <i v-show="tablist.length!=0"> <span style="color:#0553fa;font-weight:900;">资助总额:{{allmoney}}万</span></i>
    </p>
    <div v-show="tablist.length!=0">
      <el-table :data="tablist" style="width: 100%">
        <el-table-column prop="title"   align="center" label="项目名称" width="260">
        </el-table-column>
        <el-table-column prop="departmentName"   align="center" label="立项部门" width="180">
        </el-table-column>
        <el-table-column prop="areaName"   align="center" label="地区"> </el-table-column>
         <el-table-column    align="center" label="课题名称">
           <template slot-scope="scope">
             <div v-show="scope.row.projectTitle!='未填写'"> 
               {{ scope.row.projectTitle }}
             </div>
           </template>
         </el-table-column>
          <el-table-column  align="center" label="资助时间">
          <template slot-scope="scope">
            <div>
              {{ scope.row.publicityTime |timeFormat}}
            </div>
          </template>  
          </el-table-column>
           <el-table-column  align="center" label="立项金额(万元)">
             <template slot-scope="scope"> <!-- vue实例外创建 -->
               <div>
                 {{scope.row.amount | moneyFormTwo}}万
               </div>
             </template>
           </el-table-column>
      </el-table>
      <div class="block">
        
          <el-pagination
          style="float:left;"
            @current-change="handleCurrentChange"
            layout="prev, pager, next, jumper"
            :page-size="8"
            :total="total">
          </el-pagination>
        </div>
      </div>
   <div v-show="tablist.length==0" class="zhanwuimg">
        <img src="@/assets/nodata.png" alt="">
        <p style="text-align:center;font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 21px;
          color: #333333;">暂无工商信息</p>
      </div>

    </div>

    <!-- 底部图片 -->
    <div class="footer">
      <div v-if="showvipImg">
          <div class="imginfo" v-for="(item,index) in imglist" :key="index" >
          <img :src="imgdefault + item" alt="">
          </div>
      </div>
      <div class="footimg" v-else>
            <img src="@/assets/555.png" alt="">
            <p>暂无权限查看</p>
            <span @click="addshop">立即充值进行查看</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getMatchDefault } from "@/utils/match.js";
import { getsubsidylist,getsubsidytotal } from "@/utils/goverment.js";
export default {
  data() {
    return {
      total:0,
      queryname: "",
      companylist: {},
        queryform:{
          pageNum:1,
          pageSize:8,
          searchParam:""
        },
        tablist:[],
        imglist:[],
        imgdefault:'http://shenzhengtong.cn',
        // 总金
        allmoney:"",
        showvipImg:true
    };
  },
  created() {
    this.queryform.searchParam=this.$route.query.username
    console.log(this.queryform.searchParam,"进去以后查询");
    this.selectchaxun();
    // roleKey common 不是会员
      const userInfo=JSON.parse(localStorage.getItem("userInfo"))
      const userVip=userInfo.roles[0].roleKey
      console.log(userVip,"用户详情");
      if(userVip==="vip"){
        this.showvipImg=true
      }else{
        this.showvipImg=false
      }

  },
  mounted(){
        document.querySelector(".goback").scrollIntoView();
  },
  methods: {
    addshop(){
      this.$router.push("/backhome/serviceshop/serviceshop")
    },
    selectchaxun() {
      this.queryname=this.$route.query.username
      // 查询公司名单
       getMatchDefault(this.queryname).then((res) => {
        this.companylist = res.data;
        console.log(this.companylist);
        if(this.companylist.updateImage){
            this.imglist=this.companylist.updateImage.split(",")
            console.log(this.imglist,"tup");
        }
      });

      // 查询补助明细      
       console.log(this.queryform.searchParam);
         getsubsidylist(this.queryform).then(res=>{
        this.tablist=res.rows
        this.total=res.total
        console.log(this.tablist);
      })

      // 查询总金额  
      getsubsidytotal(this.queryform.searchParam).then(res=>{
          console.log(res,"总金额");
          if(!res.data) return
           const money=res.data.totalAmount
          this.allmoney=Math.floor(money/10000)
      })

    },
    handleCurrentChange(val){
      this.queryform.pageNum=val
           getsubsidylist(this.queryform).then(res=>{
        this.tablist=res.rows
        this.total=res.total
      })
    },
     goback(){
      // this.$router.go(-1)
      this.$router.back()
    }
  },
};
</script>

<style lang="less" scoped>
.suggest {
  min-width: 1300px;
  i {
    font-style: normal;
  }
}
.sugtitle {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 61px;
  color: #333333;
  img {
    vertical-align: middle;
  }
  i{
    float: right;
  }

}
.titleh {
  height: 70px;
  line-height: 70px;
  text-align: center;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #0453fa;
  background-color: #e4eeff;
  span {
    border: 1px solid #369d00;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    // line-height: 16px;
    color: #369d00;
  }
}
.naminfo {
  display: flex;
  justify-content: space-between;
  height: 70px;
  line-height: 70px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #999999;
  i {
    color: #333333;
  }
}
.adress {
  height: 70px;
  line-height: 70px;
  // font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #999999;
  margin-top: 30px;
  .p {
    // display: flex;
    // justify-content: space-between;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #333333;
    span {
      display: block;
      // height: 100%;
      // width: 5%;
      float: left;
      // width: ;
      color: #999999;
      i {
        width: 94%;
        display: block;
        height: 100%;
        float: left;
      }
    }
  }
  p {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #333333;
  }
  span {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #999999;
  }
}
.fanwei {
  line-height: 30px;
}
.mainInfo {
  margin-top: 190px;
}
.el-table > .success-row td {
  background: #e4eeff !important;
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
.block {
  position: relative;
  margin-top: 20px;
  .el-pagination {
    position: absolute;
    left: 48%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
}
.footer{
  margin-top: 300px;
  // height: 1000px;
}
.footimg{
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;

// line-height: 21px;
  p{
    margin: 30px 0;
    font-family: Microsoft YaHei;
    font-weight: 400;
  }
  span{
    color: #4c85fd;
    cursor: pointer;
    font-family: Microsoft YaHei;
    font-weight: 400;
  }
}

.zhanwuimg{
  position: relative;
  width: 618px;
  height: 390px;
  margin: 0 auto;
  img{
    width: 100%;
    height: 100%;
  }
   p{
      position: absolute;
      top: 350px;
      left: 10px;
      bottom: 0;
      right: 0;
      margin: auto;
    }
}
.imginfo{
  width: 600px;
  margin: 0 auto;
  img{
    width: 100%;
  }
}

.goback{
    width: 100px;
    padding-top: 10px;
    height: 25px;
    font-size: 15px;
    font-family: Microsoft YaHei;
    color: #333;
    cursor: pointer;
}
/deep/.el-table__header,/deep/.el-table__body,/deep/.el-table__footer{
   width: 100%;
   table-layout: fixed !important;
}
</style>