<template>
  <div class="tabBarItem" :style="{'borderBottomColor': fontColor == 'black' ? 'black': 'white'}">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
    props:{
        tabbarIndex:{
            type: Number,
            defanlt: 0
        },
        fontColor:{
          // type: String
        }
    }
};
</script>

<style lang='less' scoped>
.tabBarItem {
  width: 100%;
  height: 45px;
  border-bottom: 2px solid white;
  margin-top: 40px;
  display: flex;
  div {
    flex: 1;
    height: 45px;
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 35px;
    // color: #ffffff;
    cursor: pointer;
  }

  .left {
    text-align: left;
  }

  .right {
    text-align: right;
  }
}
</style>