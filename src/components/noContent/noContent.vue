<template>
  <div class="noContent">
    <div class="img"></div>
    <div class="font">功能还未开放</div>
  </div>
</template>

<script>
export default {
  name: "noContent",
};
</script>

<style lang="less" scoped>
.noContent {
    padding: 100px 0;
  width: 100%;
//   height: 100%;
  text-align: center;
  .img{
      width: 300px;
      height: 240px;
      background-image: url("../../assets/555.png");
      background-size: 100% 100%;
      margin: auto;
  }
}
</style>