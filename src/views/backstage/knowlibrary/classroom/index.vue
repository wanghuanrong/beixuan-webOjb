<template>
  <div>
    <el-button  type="primary" ref="buttonFocus" plain @click="getywt">政府一网通</el-button>
    <el-button type="primary" plain @click="getzf">政府发布视频</el-button>
    <div class="veodio">
      <no-content v-if="vedioList.length == 0"></no-content>
      <el-card
        class="vediocard"
        v-for="item in vedioList"
        :key="item.libraryVideoId"
      >
        <img
          :src="baseImg + item.coverImage"
          class="image"
          @click="pushClassInfo(item.libraryVideoId)"
        />
        <div class="play" @click="pushClassInfo(item.libraryVideoId)"></div>
        <!-- 视频时间 -->
        <div class="vediotime"><span>{{item.duration | dateFormate}}</span></div>
        <div>
          <span class="wev">{{ item.title }}</span>
          <div class="wenz">{{ item.synopsis }}</div>
          <div
            class="bottom clearfix"
            @click="pushClassInfo(item.libraryVideoId)"
          >
            <el-button type="text" class="button">立即观看</el-button>
              <span
                      style="float: right;"
                      class="el-icon-view"
                      >{{ item.pageView }}</span
                    >
          </div>
        </div>
      </el-card>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="queryform.pageSize"
        :page-sizes="[8,12, 16]"
        :current-page="queryform.pageNum"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totall"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import noContent from '@/components/noContent/noContent.vue';
import { getvideoList } from "@/utils/register";
export default {
  data() {
    return {
      // baseImg: "http://192.168.2.23:8080",
      baseImg: " http://shenzhengtong.cn/stage-api",    
      vedioList: {},
      queryform: {
        type: "",
        pageNum: 1,
        pageSize:12,
      },
      librarylist: {},
      totall: 0,
      aflag:true,
    };
  },
  created() {
    this.getvideo();
  },
  mounted(){
    this.$refs.buttonFocus.$el.focus();
  },
  methods: {
    getvideo() {
      let id = 1;
      this.queryform.type = id;
      getvideoList(this.queryform).then((res) => {
        console.log(res,"class");
        this.vedioList = res.rows;
        console.log(this.vedioList);
        this.totall = res.total;
       
      });
    },
    handleSizeChange(val) {
      this.queryform.pageSize = val;
      //   console.log(`每页 ${val} 条`);
      // this.getlibrary(this.queryform)
      getvideoList(this.queryform).then((res) => {
        this.vedioList = res.rows;
        this.totall = res.total;
      });
    },
    handleCurrentChange(val) {
      this.queryform.pageNum = val;
      //   console.log(`当前页: ${val}`);
      // this.getlibrary(this.queryform)
      getvideoList(this.queryform).then((res) => {
        this.vedioList = res.rows;
        this.totall = res.total;
      });
    },
    getywt() {
      this.queryform.type = 1;
      getvideoList(this.queryform).then((res) => {
        this.vedioList = res.rows;
        this.totall = res.total;
      });
    },
    getzf() {
      this.queryform.type = 2;
      getvideoList(this.queryform).then((res) => {
        this.vedioList = res.rows;
        this.totall = res.total;
      });
    },
    pushClassInfo(id) {
      const typeId=this.queryform.type 
      this.$router.push({ path: "classroomInfo", query: { id: id ,tyid:typeId }});
    },
  },
  components: {
    noContent
  },
  // 格式化时间过滤器
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
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  // margin-top: 13px;
  line-height: 12px;
  span{
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 16px;
    color: #999999;
  }
}

.button {
  padding: 0;
  // float: right;
  margin-top: 29px;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.vediocard {
  position: relative;
  width: 23%;
  height: 350px;
  float: left;
  margin-top: 20px;
  // margin: 20px 10px;
  margin-right: 20px;
  cursor: pointer;
  img {
    width: 100%;
    height: 170px;
  }
  span {
    display: block;
    margin-top: 30px;
  }
  .wenz {
    width: 100%;
    height: 50px;
    // background-color: #ccc;
    // margin-top: 10px;
    line-height: 17px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #666;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
  .vediotime{
  position: absolute;
  top: 156px;
  right: 4%;
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

/deep/.el-card__body {
  padding: 10px;
}
.play {
  width: 47px;
  height: 47px;
  position: absolute;
  top: 27%;
  margin-top: -23px;
  left: 50%;
  margin-left: -15px;
  background: url(../../../../assets/video.png);
} 
.block {
   position: relative;
   width: 100%;
   padding-top: 50px;
   display: flex;
   justify-content: center;
 }
.wev{
  font-size: 14px;
font-family: Microsoft YaHei;
font-weight: bold;
color: #333333;
  display: block;
  width: 200px;
  height: 26px;
  padding-top: 8px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.noneimg{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>