<template>
  <div class="productTabBar">
    <div :class="fontColor == 'black' ? 'titleBlack' : 'title'">{{ product.title }}</div>
    <div>
      <tab-bar-item v-if="fontColor == 'black'" :fontColor = "fontColor">
        <div
          v-for="(item, index) in product.tabList"
          :key="index"
          :slot="item.slot"
          @click="tabbarClick(index, item.id)"
          :tabbarIndex = "tabbarIndex"
          :class="{itemClickFontBlack: tabbarIndex == index}"
          style="color: black;"
        >
          {{ item.name }}
        </div>
      </tab-bar-item>
      <tab-bar-item v-else>
        <div
          v-for="(item, index) in product.tabList"
          :key="index"
          :slot="item.slot"
          @click="tabbarClick(index, item.id)"
          :tabbarIndex = "tabbarIndex"
          :class="{itemClickFont: tabbarIndex == index}"
          style="color: white;"
        >
          {{ item.name }}
        </div>
      </tab-bar-item>
    </div>
  </div>
</template>

<script>
import tabBarItem from "./tabBarItem";
export default {
  name: "productTabBar",
//   props:['productTabBar'],
  props:{
      product:{
          type: Object,
          default: ()=>{ return {} }
      },
      fontColor:{
        type: String
      }
  },
  data() {
    return {
      tabbarIndex: 0,
    };
  },
  components: {
    tabBarItem,
  },
  methods: {
      tabbarClick(index, id){
        this.tabbarIndex = index;
        this.$emit('tabBarIndex', index, id);
      }
  }
};
</script>

<style lang="less" scoped>
.productTabBar {
  width: 800px;
  overflow: hidden;
  margin: auto;
  text-align: center;

  .title {
    width: 100%;
    height: 42px;
    font-size: 35px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 42px;
    color: #ffffff;
    text-align: center;
  }

  .itemClickFont{
      font-size: 25px;
      border-bottom: 5px solid white;
      font-weight: 900;
  }

  .titleBlack {
    width: 100%;
    height: 42px;
    font-size: 35px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 42px;
    color: black;
    text-align: center;
  }

  .itemClickFontBlack{
      font-size: 25px;
      border-bottom: 5px solid black;
      font-weight: 900;
  }
}
</style>