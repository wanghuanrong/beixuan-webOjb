<template>
  <div id="app">
    <!-- 暂时不需要，如果需要，要把home.vue进入刷新，防止用户信息不会被加载 -->
    <!-- <keep-alive> -->
    <router-view ref="home"></router-view>
    <!-- </keep-alive> -->
  </div>
</template>


<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
li {
  list-style: none;
}

html,
body,
#app {
  height: 100%;
}
</style>
