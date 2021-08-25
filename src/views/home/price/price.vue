<template>
  <div class="price">
    <header>
      <h2>选择最适合您的购买方案</h2>
      <h3>数据驱动，高效协同，提高企业申报项目效率及成本</h3>
      <div class="btnsqs" @click="registerShow"  @click.stop>了解购买方案及价格</div>
    </header>
    <nav>
      <h4>从复杂的政策中脱身，提升项目申报效率</h4>
      <p>功能列表</p>
      <table>
        <tr>
          <td>项目规划</td>
          <td>同行补贴资金查询</td>
          <td>立项项目查询</td>
          <td>项目对比</td>
        </tr>
        <tr>
          <td>政策解析</td>
          <td>公示名单查询</td>
          <td>项目匹配方案导出</td>
          <td>云课堂</td>
        </tr>
        <tr>
          <td>政策查询</td>
          <td>项目匹配方案导出</td>
          <td>企业服务商城</td>
          <td>政策图谱</td>
        </tr>
        <tr>
          <td>政策日历</td>
          <td>智能精准匹配</td>
          <td>政策宣讲会预约</td>
          <td>项目订阅</td>
        </tr>
        <tr>
          <td>最新政策</td>
          <td>项目匹配管理</td>
          <td>知识产权查询</td>
          <td>高新评分</td>
        </tr>
        <tr>
          <td>智能推送</td>
          <td>各行业资金图谱</td>
          <td>知识产权管理</td>
          <td>政策文库</td>
        </tr>
      </table>
    </nav>
    <div></div>
    <footer>
      <h2>常见问答</h2>
      <div :class="{ pricefly: true, testenter: testShow }">
        <div class="onep" ref="onebox">
          <div class="yuandian"></div>
          <p class="titleprice">我购买策千里软件后，后续的培训和服务收费吗？</p>
          <p>您购买策千里后，我们将安排技术支持与您对接，</p>
          <p>并安排专业客服为您服务，</p>
          <p>保证您使用过程的顺畅</p>
        </div>
      </div>
      <div :class="{ pricefly: true, testenter: testShow1 }">
        <div class="onep twop" ref="twobox">
          <div class="yuandian" style="top: 77px;left: 680px;"></div>
          <p class="titleprice" style="margin-left:700px">
            策千里收费模式是怎么样的呢？
          </p>
          <p style="margin-left:700px">
            策千里按照企业所需开通的功能模块多少来收费，
          </p>
          <p style="margin-left:700px">需要用到哪些模块即开通那些模块功能</p>
        </div>
      </div>
      <div style="margin-bottom: 80px;" :class="{ pricefly: true, testenter: testShow2 }">
        <div class="onep threep"  ref="twobox">
          <div class="yuandian"></div>
          <p class="titleprice">我应该怎么购买呢？</p>
          <p style="color:#333">您可以选择以下任意一种方式进行购买：</p>
          <p>① 点击并完成注册，客服人员将在24h内与您沟通，协助您完成购买</p>
          <p>
            ② 拨打
            <span style="color:#256bff;cursor: pointer;">0755-27905047</span
            >点击右侧咨询按钮,工作人员将协助您完成购买
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentScroll: 0,
      testShow: false,
      testShow1: false,
      testShow2: false,
    };
  },
  deactivated() {
    window.removeEventListener("scroll", this.handleScroll, true);
  },
  activated() {
    window.addEventListener("scroll", this.handleScroll, true);
    this.testShow = false;
    this.testShow1 = false;
    this.testShow2 = false;
  },
  methods: {
    handleScroll() {
      // console.log(window.pageYOffset, "111");
      console.log(this.$refs.onebox.offsetTop, "11");
      // console.log(this.currentScroll > this.$refs.testref.offsetTop-800);
      this.currentScroll = window.pageYOffset;
      console.log(this.currentScroll > 1380);
      if (this.currentScroll >= 1380) {
        //当前滚动位置到达testref的时候，显示div（100作为调整用）
        this.testShow = true;
        this.testShow1 = true;
        this.testShow2 = true;
      }
      if (this.currentScroll >= 1780) {
        //当前滚动位置到达testref的时候，显示div（100作为调整用）
        
      }
      if (this.currentScroll >= 2080) {
        //当前滚动位置到达testref的时候，显示div（100作为调整用）
        this.testShow2 = true;
      }
    },
    registerShow(){
       this.$emit('registerShow');
    },
  },
};
</script>

<style lang="less" scoped>
header {
  background: url(../../../assets/newindex/pricebanner.png) no-repeat;
  background-size:cover;
  height: 600px;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  margin-top: 70px;
  h2 {
    font-size: 56px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    line-height: 0px;
    color: #333333;
    margin-top: 210px;
  }
  h3 {
    margin-top: 90px;
    font-size: 30px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 0px;
    color: #333333;
  }
  .btnsqs {
    margin-top: 116px;
    width: 210px;
    height: 40px;
    line-height: 40px;
    background-image: linear-gradient(to right, #ff6541, #ff9580);
    text-align: center;
    border-radius: 50px;
    margin-top: 100px;
    cursor: pointer;
    color: #ffffff;
    transition: box-shadow 0.5s;
    &:hover {
      box-shadow: 0px 12px 22px -4px #ff6541;
    }
  }
}
nav {
  height: 830px;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  margin-top: 120px;
  h4 {
    font-size: 40px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    line-height: 0px;
    color: #333333;
    // margin-top: 100px;
  }
  p {
    margin-top: 79px;
    font-size: 34px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 0px;
    color: #333333;
  }
  table {
    float: left;
    margin-top: 100px;
    border-collapse: collapse;
    border-spacing: 0;
    width: 1200px;
    // margin-right: 80px;
    text-align: center;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
    tr {
      height: 70px;
      td {
        border: 1px solid #ccc;
        line-height: 70px;
        &:hover {
          color: #4681fe;
          cursor: pointer;
        }
        &:first-child{
          width: 200px;
        }
        &:nth-child(2){
          width: 400px;
        }
         &:nth-child(3){
          width: 400px;
        }
         &:nth-child(4){
          width: 200px;
        }
      }
    }
  }
}
footer {
  width: 1200px;
  margin: 0 auto;
  // margin-top: 100px;
  h2 {
    text-align: center;
    font-size: 40px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    line-height: 0px;
    color: #333333;
    margin-bottom: 80px;
  }
  div {
    height: 290px;
    margin-bottom: 50px;
    background-size: cover;
    overflow: hidden;
    p {
      font-size: 20px;
      color: #666;
      margin-bottom: 20px;
      margin-left: 80px;
    }
    .titleprice {
      margin-top: 80px;
      font-size: 30px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      line-height: 0px;
      color: #333333;
      margin-bottom: 40px;
    }
  }
  .onep {
    position: relative;
    background: url(../../../assets/newindex/4836.jpg) no-repeat;
    background-size: cover;
    &:hover{
    box-shadow: #666 0px 0px 10px;
    }
    .yuandian {
      // padding: 0;
      position: absolute;
      top: 77px;
      left: 60px;
      overflow: hidden;
      width: 10px;
      height: 10px;
      background-color: #256bff;
      border-radius: 50%;
    }
  }
  .twop {
    background: url(../../../assets/newindex/4834.jpg) no-repeat;
    background-size: 100%;
    &:hover{
    box-shadow: #ccc 0px 0px 10px;
    }
  }
  .threep {
    background: url(../../../assets/newindex/4835.jpg) no-repeat;
    background-size: cover;
  }
}
@keyframes fadeInL {
  0% {
    opacity: 1;
    transform: translateY(20%);
  }
  // 	50% {
  // 	opacity: 0.5;
  // 	transform:translateX(-20%);
  // }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.pricefly {
  border-radius: 5px;
  transform: translateY(20%); //滚动前的位置
  opacity: 1;
  &:hover{
  box-shadow: #d7e3fc 0px 0px 20px;
  }
}
.testenter {
  transform: translateY(0) !important; //滚动前的位置
  opacity: 1 !important;
  animation: fadeInL 3s 1;
}
</style>
