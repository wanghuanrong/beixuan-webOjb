<template>
  <div>
    <el-button type="primary" plain @click="returnS">返回上一页</el-button>
    <h3>文库详情页</h3>
    <div class="textbox" v-html="infolist.content">

    </div>
  </div>
</template>

<script>

import {  getlibraryList } from "@/utils/register";
export default {
  data() {
    return { 
      query:{
          libraryId: "",
          typeId:"",
          pageNum:1,
          pageSize:1
      },
      infolist:[]
    }
  },
  created() {
    this.query.libraryId = this.$route.query.id;
    this.query.typeId= this.$route.query.tid;
    // console.log( this.query.libID, this.query.typeID);
    // let {libID,typeID} =this.$route.query
    // console.log(this.query.libID, this.query.typeID);
    this.getlibInfo()
  },
  methods: {
    getlibInfo() {
      getlibraryList(this.query).then(res=>{
          // console.log(res);
          this.infolist=res.rows[0]
          // console.log(this.infolist);
      })
    },
    returnS(){
      this.$router.go(-1)
    }
  },
};
</script>

<style lang="less" scoped>
h3 {
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  // line-height: 21px;
  color: #333333;
  margin-top: -40px;
  border-bottom: 1px solid #f0f0f0;
}
.textbox{
  padding: 20px;
  line-height: 20px;
}
</style>