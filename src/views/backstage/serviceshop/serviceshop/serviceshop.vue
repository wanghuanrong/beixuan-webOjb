<template>
  <div class="serviceshop">
    <div v-for="(item, index) in classList" :key="index">
      <shop-show-off
        :classid="item.classifyId"
        :classname="item.classifyName"
      ></shop-show-off>
    </div>
  </div>
</template>

<script>
// 1、通过getShopZczx()得到五个模块的数据（title和type）
// 2、创建卡片组件，把title和type传入，
// 3、组件根据传入的参数，再去请求对应的数据
// 4、判断请求的数据是否大于6条，是：使用分页展示，否：直接展示
// 5、由于每个商品展示的样式相同，再创建商品展示的公共组件
// 6、给组件添加单机事件，参入参数，跳转页面
import { getShopZczx } from "@/utils/backstageShop";

import shopShowOff from "@/components/shopShowOff/shopShowOff";

export default {
  name: 'serviceshop',
  created() {
    getShopZczx().then((res) => {
      // console.log(res);
      if (res.code != "200") {
        this.$message.error("列表请求数据失败！");
        return;
      }

      this.classList = res.data;
    });
  },
  components: {
    shopShowOff,
  },
  data() {
    return {
      classList: {},
    };
  },
  methods: {
  },
};
</script>

<style lang="less" scoped>
</style>