<template>
  <div>
    <div class="top">
      <el-button type="primary" plain @click="returnS">返回上一页</el-button>
    </div>
    <p class="roomtitle">{{ vedioInfoList.title }}</p>
    <div class="timesee">
      <span>{{ vedioInfoList.createDate }}</span
      ><span style="margin-left: 29px" class="el-icon-view">{{
        vedioInfoList.pageView
      }}</span>
    </div>
    <div class="roomvedio">
      <iframe
        :src="basevedio + vedioInfoList.videoUrl"
        frameborder="0"
        type="video/mp4"
      ></iframe>
      <!-- <video :src=""> -->
    </div>
    <div class="menudh">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="简介" name="first">
          <div class="content">
            {{ vedioInfoList.synopsis }}
          </div>
        </el-tab-pane>
        <el-tab-pane label="视频" name="second">
            
          <div class="fatherye">     
            <div class="content">
              <div class="overfl">
              <el-card
                class="vediocard clearfix"
                v-for="item in otherVedio"
                :key="item.libraryVideoId"
              >
                <img :src="basevedio + item.coverImage" class="image" @click="newvideo(item.libraryVideoId)"/>
                <div class="videotime"><span>{{item.duration | dateFormate}}</span></div>
                <div>
                  <p class="vedioInfoList">{{ item.title }}</p>
                  <div class="bottom clearfix">
                    <span style="float: left; margin-top: 18px">{{
                      item.createDate
                    }}</span>
                    <span
                      style="float: right; margin-top: 24px"
                      class="el-icon-view"
                      >{{ item.pageView }}</span
                    >
                  </div>
                </div>
              </el-card>
                </div>
                <div class="blockpan">
                  <el-pagination
                    @current-change="handleCurrentChange"
                    :page-size="otherQuery.pageSize"
                    layout="prev, pager, next, jumper"
                    :total="total"
                  >
                  </el-pagination>
                </div>
            </div>          
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getvideoList, getOtherVedio, addJL } from "@/utils/register";

export default {
  data() {
    return {
      // basevedio: "http://192.168.2.23:8080",
      basevedio: "http://shenzhengtong.cn/stage-api",
      activeName: "second",
      queryform: {
        type: "",
        libraryVideoId: "",
        pageNum: 1,
        pageSize: 1
      },
      otherQuery: {
        libraryVideoId:"",
        pageNum:1,
        pageSize:8
      },
      vedioInfoList: [],
      activeName: "first",
      otherVedio: {},
      total:0
    };
  },
  created() {
    this.queryform.libraryVideoId = this.$route.query.id;
    this.queryform.type = this.$route.query.tyid;
    // console.log(this.$route.query.id,this.$route.query.tyid);
    // console.log(this.queryform.libraryVideoId,this.queryform.type);
    this.getVedioInfo();
  },
  methods: {
    handleClick(tab) {
      // console.log(tab);
        this.otherQuery.libraryVideoId = this.$route.query.id;
        getOtherVedio(this.otherQuery).then((res) => {
        console.log(res);
        this.otherVedio = res.rows;
        this.total= res.total
      });
    },
    getVedioInfo() {
      // 查询视频的列表
      getvideoList(this.queryform).then((res) => {
        this.vedioInfoList = res.rows[0];
        // console.log(this.vedioInfoList);
      });
      // 监测浏览量
      addJL(this.queryform.libraryVideoId).then((res) => {
        console.log(res);
      });
    },
    returnS() {
      this.$router.go(-1);
    },
    handleCurrentChange(val) {
        this.otherQuery.pageNum=val
         getOtherVedio(this.otherQuery).then((res) => {
        console.log(res);
        this.otherVedio = res.rows;
        this.total=total
      });
    },
    // 点击其他视频播放其他视频
    newvideo(id){
      this.queryform.type = this.$route.query.tyid;
      this.queryform.libraryVideoId=id
      console.log(this.queryform);
      getvideoList(this.queryform).then((res) => {
      this.vedioInfoList = res.rows[0];
      });
      this.otherQuery.libraryVideoId=id
      getOtherVedio(this.otherQuery).then((res) => {
        console.log(res);
        this.otherVedio = res.rows;
        this.total= res.total
      });
    }
  },
   filters:{
    dateFormate:function(val){
        let seconds = val % 60 > 10 ? val % 60 : '0' + val % 60
      // let minute =''
      let minutes = Math.floor((val - seconds) / 60 % 60) > 10 ? Math.floor((val - seconds) / 60 % 60) : '0' + Math.floor((val - seconds) / 60 % 60)
      let hours = Math.floor(val / 60 / 60) > 10 ? Math.floor(val / 60 / 60) : '0' + Math.floor(val / 60 / 60)
      return `${hours}:${minutes}:${seconds}`
    }
  }
};
</script>

<style lang="less" scoped>
.top {
  margin-top: -20px;
  height: 100px;
  border-bottom: 1px solid #f0f0f0;
  padding-top: 30px;
}
.roomtitle {
  margin-top: 30px;
}
.timesee {
  margin-top: 25px;
  span {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 16px;
    color: #999999;
  }
}
.roomvedio {
  height: 700px;
  iframe {
    width: 100%;
    height: 100%;
  }
}
.content {
 line-height: 20px;
  // height: 500px;
}
.menudh {
  padding-top: 30px;
}

.vediocard {
  position: relative;
  width: 24%;
  height: 255px;
  float: left;
  margin-top: 18px;
  margin-right: 5px;
  line-height: 20px;
  cursor: pointer;
  img {
    width: 100%;
    padding:0 10px;
    height: 170px;
  }
  span {
    display: block;
    margin-top: 15px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    // line-height: 16px;
    color: #999999;
  }
  .vedioInfoList {
    width: 100%;
    font-size: 14px;
    // padding-top: -5px;
    line-height: -5px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #333333;
    text-align: center;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .videotime{
    position: absolute;
      position: absolute;
  top: 166px;
  right: 31px;
  width: 60px;
  height: 23px;
  background:#1d1c1a;
  border-radius: 5px;
   span{
  font-size: 10px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 23px;
    color: #FFFFFF;
    margin-top: 0;
    text-align: center;
  }
  }
}
// .blockpan{
// width: 500px;
// height: 30px;
// margin: 0 auto;
// overflow: hidden;
// .el-pagination{
// margin-top: 305px;

// }
// }



.el-main{
     padding-bottom: 50px!important;
}
/deep/.el-tabs__content {
    padding-bottom: 60px!important;
    overflow: hidden;
    position: relative;
}
.clearfix:after {
  clear: both;
}
.overfl{
  // position: relative;
  overflow: hidden;
  margin-bottom: 30px;
  
}
  .blockpan{
    display: flex;
    justify-content: center;
  }
</style>