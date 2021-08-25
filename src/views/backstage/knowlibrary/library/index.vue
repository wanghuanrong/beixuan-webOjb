<template>
  <div>
    <el-card v-if="typelist.length != 0">
      <el-button
        type="primary"
        :class="active == item.libraryTypeId ? 'activeClass' : ''"
        v-for="item in typelist"
        :key="item.libraryTypeId"
        @click="getlibrary(item.libraryTypeId)"
        ref="buttonFocus"
        >{{ item.name }}</el-button
      >
    </el-card>
    <div class="fatherCard">
      <no-content v-if="librarylist.length == 0"></no-content>
      <el-card
        class="cardbox"
        v-for="item in librarylist"
        :key="item.libraryId"
      >
        
        <div
          class="wenziyinc"
          @click="getlbInfo(item.libraryId, item.libraryTypeId)"
        >
          {{ item.title }}
        </div>
        <div
          @click="getlbInfo(item.libraryId, item.libraryTypeId)"
          class="text"
          v-html="item.content"
        >
          <!-- <p></p> -->
        </div>
        <span class="librarytime">{{ item.createDate }}</span>
      </el-card>

      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="queryform.pageSize"
          :page-sizes="[8, 10, 12]"
          :current-page="queryform.pageNum"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totall"
        >
        </el-pagination>
      </div>
    </div>
   
  </div>
</template>

<script>
import noContent from "@/components/noContent/noContent.vue";
import { getAdminType, getlibraryList } from "@/utils/register";
export default {
  data() {
    return {
    
      typelist: {},
      queryform: {
        typeId: 2,
        libraryId: "",
        pageNum: 1,
        pageSize: 8,
      },
      librarylist: {},
      totall: 0,
      active: 0,
    };
  },
  created() {
    this.gettype();
  },
  mounted() {
    console.log(this.$refs.buttonFocus);
  },
  methods: {
    gettype() {
      this.getlibrary(16);
      getAdminType().then((res) => {
        console.log(res,"文库");
        this.typelist = res.data;
       
      });
    },
    getlibrary(id) {
      this.active = id;
      // console.log(id);
      this.queryform.typeId = id;
      (this.queryform.pageNum = 1), (this.queryform.pageSize = 8);
      getlibraryList(this.queryform).then((res) => {
        console.log(res);
        this.librarylist = res.rows;
        this.totall = res.total;
      });
    },
    handleSizeChange(val) {
      this.queryform.pageSize = val;
      //   console.log(`每页 ${val} 条`);
      // this.getlibrary(this.queryform)
      getlibraryList(this.queryform).then((res) => {
        console.log(res);
        this.librarylist = res.rows;
        this.totall = res.total;
      });
    },
    handleCurrentChange(val) {
      this.queryform.pageNum = val;
      //   console.log(`当前页: ${val}`);
      // this.getlibrary(this.queryform)
      getlibraryList(this.queryform).then((res) => {
        console.log(res);
        this.librarylist = res.rows;
        this.totall = res.total;
      });
    },
    getlbInfo(id, tid) {
      this.$router.push({ path: "libraryinfo", query: { id: id, tid: tid } });
    },
  },
  components: {
    noContent,
  },
};
</script>

<style lang="less" scoped>
.cardbox {
  // margin: 15px;
  margin-top: 15px;
  width: 49%;
  height: 155px;
  // float: left;
  // padding: 5px 5px;
  // background-color: #ccc;
  cursor: pointer;
  .wenziyinc {
    margin-top: 20px;
    margin-left: 10px;
    padding-top: 7px;
    width: 200px !important;
    height: 15px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #333333;

    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .text {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 16px;
    color: #666666;
    width: 100%;
    height: 50px;
    margin-top: 12px;
    padding-right: 10px;
    padding-left: 10px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
  .librarytime {
    margin-top: 20px;
    float: right;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    // line-height: 16px;
    color: #999999;
  }
}
.fatherCard {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
}
.block {
  position: relative;
  width: 100%;
  padding-top: 50px;
  display: flex;
  justify-content: center;
}
.el-button {
  background-color: #fff;
  color: #40b3ff;
  &:hover {
    color: #fff;
    // border: 1px solid #ca151e;
    background-color: #409eff;
  }
}
.activeClass {
  color: #fff;
  // border: 1px solid #ca151e;
  background-color: #409eff;
}
</style>
