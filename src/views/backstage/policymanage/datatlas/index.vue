<template>
  <div class="datatlas" id="datatlas">
    <el-card style="background-color: #030409">
      <div class="hang1" ref="hang1">
        <div class="main1" id="main1"></div>
        <div class="rightBox">
          <div class="title">{{ provinceName }}各市级政策数据</div>
          <div class="urban">
            <ul>
              <li
                v-for="(item, index) in cityData"
                :key="index"
                @click="cityClick(item.areaId, item.areaName)"
              >
                <el-tooltip class="item" effect="dark" placement="bottom">
                  <div slot="content">
                    　<span class="title">{{ item.areaName }}</span
                    ><br />
                    　<span>高新数量 {{ item.hightCount }}个</span><br />
                    　<span>项目数量 {{ item.projectNumber }}个</span><br />
                    　<span>扶持资金 {{ item.supportTotal }}万</span>
                  </div>
                  <span>{{ item.areaName }}</span>
                </el-tooltip>
              </li>
              <i></i><i></i><i></i>
            </ul>
          </div>
        </div>
      </div>

      <div class="hang2">
        <div class="main2" id="main2"></div>
        <div class="main3" id="main3"></div>
      </div>

      <div class="hang3">
        <div class="main4" id="main4"></div>
        <div class="main5" id="main5"></div>
      </div>

      <div class="hang4">
        <div class="main6" id="main6"></div>
        <div class="main9">
          <div class="selectCheck">
            <div class="title">行业选择</div>
            <div class="selectBox">
              <el-select
                :popper-append-to-body="false"
                v-model="optionsSelectData"
                placeholder="请选择"
                style="width: 200px"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="main9Content" id="main9"></div>
        </div>
      </div>

      <div class="hang5">
        <div class="main7" id="main7"></div>
      </div>

      <div class="hang6">
        <div class="main10">
          <div class="title">{{ main10Title }}</div>
          <div class="main10Content" id="main10"></div>
        </div>
        <div class="main11">
          <div class="main11Content" id="main11"></div>
        </div>
        <div class="main12">
          <div class="title">{{ main10Title }}</div>
          <div class="main12Content" id="main12"></div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
// 1.导入echarts
import * as echarts from "echarts";
// 导入echarts-gl，由于3d地图
import "echarts-gl";

// require("../../../../../node_modules/echarts/lib/component/geo");
// 导入map.js
import "@/assets/js/china.js";

import {
  nationalData,
  areaSumNumber,
  areaSumPrice,
  hightechNumber,
  supportTotal,
  projectNumber,
  departmentStatistics,
  categorySumNumber,
  categorySumPrice,
  HYlist,
} from "@/utils/total.js";

export default {
  created() {},
  mounted() {
    this.getmain1Data();
    this.getmain2Data();
    this.getmain3Data();
    this.getmain4Data();
    this.getmain5Data();
    this.getmain6Data();
    this.getmain7Data();
    this.getHYlist();
  },
  methods: {
    getmain1Data() {
      nationalData("-1").then((res) => {
        console.log("main1", res);
        if (res.code != 200) {
          this.$massage.error("获取图表六数据失败！");
          return;
        }
        this.main1Data = res.data;

        var myChart = echarts.init(document.getElementById("main1"));

        //标识数据,用来标识地图上的点，给用户提供点击事件
        var geoCoordMap = {
          黑龙江: [127.9688, 45.368],
          内蒙古: [110.3467, 41.4899],
          吉林: [125.8154, 44.2584],
          北京市: [116.4551, 40.2539],
          辽宁: [123.1238, 42.1216],
          河北: [114.4995, 38.1006],
          天津: [117.4219, 39.4189],
          山西: [112.3352, 37.9413],
          陕西: [109.1162, 34.2004],
          甘肃: [103.5901, 36.3043],
          宁夏: [106.3586, 38.1775],
          青海: [101.4038, 36.8207],
          新疆: [87.9236, 43.5883],
          西藏: [91.11, 29.97],
          四川: [103.9526, 30.7617],
          重庆: [108.384366, 30.439702],
          山东: [117.1582, 36.8701],
          河南: [113.4668, 34.6234],
          江苏: [118.8062, 31.9208],
          安徽: [117.29, 32.0581],
          湖北: [114.3896, 30.6628],
          浙江: [119.5313, 29.8773],
          福建: [119.4543, 25.9222],
          江西: [116.0046, 28.6633],
          湖南: [113.0823, 28.2568],
          贵州: [106.6992, 26.7682],
          云南: [102.9199, 25.4663],
          广东: [113.12244, 23.009505],
          广西: [108.479, 23.1152],
          海南: [110.3893, 19.8516],
          上海: [121.4648, 31.2891],
        };

        // 地区数据
        var chinaDatas = [];

        // 遍历数据，把数据对应拼接到数组中
        // 遍历数据，把数据对应拼接到数组中
        for (let item of this.main1Data) {
          let arr = [
            {
              name:
                item.areaName == "内蒙古自治区" || item.areaName == "黑龙江省"
                  ? item.areaName.substr(0, 3)
                  : item.areaName.substr(0, 2),
              value: item.hightCount,
              value1: item.projectNumber,
              value2: item.supportTotal,
              areaId: item.areaId,
            },
          ];

          // 把广东的数据作为默认值
          if (item.areaName == "广东省") {
            // defaultP.push([
            //   {
            //     name: "广东",
            //     value: item.hightCount,
            //     value1: item.projectNumber,
            //     value2: item.supportTotal,
            //     areaId: item.areaId,
            //     selected: true,
            //   },
            // ]);

            this.getCityData(item.areaId);
          }

          chinaDatas.push(arr);
        }
        console.log(chinaDatas);

        var convertData = function (data) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i][0].name];
            if (geoCoord) {
              res.push({
                name: data[i][0].name,
                value: geoCoord.concat(data[i][0].value),
                value1: data[i][0].value1,
                value2: data[i][0].value2,
                areaId: data[i][0].areaId,
              });
            }
          }
          return res;
        };

        var option = {
          title: {
            text: "全国数据图谱",
            textStyle: {
              color: "#fff",
            },
            left: "5%",
            top: "5%",
          },
          // backgroundColor: "rgb(128,128,128,0)",
          visualMap: [
            {
              type: "continuous",
              show: false,
              seriesIndex: 0,
              text: ["bar3D"],
              calculable: true,
              max: 300,
              inRange: {
                color: ["#87aa66", "#eba438", "#d94d4c"],
              },
            },
          ],

          geo3D: {
            map: "china",
            roam: true,
            itemStyle: {
              areaColor: "rgb(5,101,123)",
              opacity: 1,
              borderWidth: 0.8,
              borderColor: "rgb(62,215,213)",
            },
            label: {
              show: false,
            },
            viewControl: {
              // rotateSensitivity: 0,
              zoomSensitivity: 0,
            },
            emphasis: {
              //当鼠标放上去  地区区域是否显示名称
              label: {
                show: true,
                textStyle: {
                  // 提示字体颜色
                  color: "#fff",
                  fontSize: 15,
                  // 提示的背景颜色
                  backgroundColor: "rgba(0,23,11,0)",
                },
                formatter: function (params) {
                  sessionStorage.setItem("chinaEnter", params.name);
                  return params.name;
                },
              },
              itemStyle: {
                // itemStyle高亮时的配置
                areaColor: "#4B58DB", // 高亮时地图板块颜色改变
              },
            },
            light: {
              main: {
                // 地图颜色
                color: "#2D3C80", //光照颜色
                intensity: 1.2, //光照强度
                shadowQuality: "high", //阴影亮度
                shadow: false, //是否显示阴影
                beta: 10,
              },
              ambient: {
                // intensity: 0.3,
              },
            },
            regions: [
              {
                name: "广东",
                itemStyle: {
                  // 聚焦的省份颜色
                  color: "#5D7CF7",
                  opacity: 1,
                },
                label: {
                  show: true,
                  textStyle: {
                    // 提示字体颜色
                    color: "#000000",
                    fontSize: 15,
                  },
                },
              },
            ], //默认高亮区域
          },
          series: [],
        };

        myChart.setOption(option);

        // 点击事件,得到地区的name，在通过name获取areaId，
        myChart.getZr().on("click", (params) => {
          // const pointInPixel = [params.offsetX, params.offsetY];
          // if (myChart.containPixel("grid", pointInPixel)) {
          //   let xIndex = myChart.convertFromPixel({ seriesIndex: 0 }, [
          //     params.offsetX,
          //     params.offsetY,
          //   ])[0]; /*事件处理代码书写位置*/
          // }

          var chinaEnter = sessionStorage.getItem("chinaEnter");

          option.geo3D.regions[0].name = chinaEnter;

          myChart.setOption(option);

          for (let item of chinaDatas) {
            if (item[0].name == chinaEnter) {
              this.getCityData(item[0].areaId);
              this.provinceName = item[0].name;
            }
          }
        });

        window.addEventListener("resize", function () {
          myChart.resize();
        });
      });
    },
    // -----------------------------------------------------------
    getmain2Data() {
      areaSumNumber(this.areaId).then((res) => {
        console.log("main2", res);
        if (res.code != 200) {
          this.$massage.error("获取图表二数据失败！");
          return;
        }
        this.main2Data = res.data;

        let myChart = echarts.init(document.getElementById("main2"));

        var dataAxis = [];
        var data = [];
        var data1 = [];

        for (let i = 0; i < this.main2Data.length; i++) {
          dataAxis.push(this.main2Data[i].area_name);
          data.push(this.main2Data[i].hightCount);
          data1.push(this.main2Data[i].projectNumber);
        }

        let option = {
          color: ["#D0A0FE", "#20C5F4"],
          title: {
            text: "政策数据",
            textStyle: {
              color: "#fff",
            },
            left: "5%",
            top: "5%",
          },
          grid: [
            {
              //左侧的柱状图grid
              width: "85%",
              left: "10%",
              top: "20%",
              bottom: "10%",
            },
          ],
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["高新数量", "项目数量"],
            x: "right", //可设定图例在左、右、居中
            padding: [30, 40, 0, 0],
            itemHeight: 10,
            itemWidth: 15,
            textStyle: {
              color: "#ffffff", // 文字的颜色。
              // lineHeight: 20,
              fontSize: 16,
            },
          },
          xAxis: {
            type: "category",
            data: dataAxis,
            axisLabel: {
              // inside: true,
              interval: 0,
              textStyle: {
                color: "#fff",
              },
            },
            axisTick: {
              show: false,
            },
          },
          yAxis: {
            type: "value",
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              // inside: true,
              textStyle: {
                color: "#fff",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#273158",
              },
            },
          },
          series: [
            {
              name: "高新数量",
              data: data,
              type: "bar",
              barWidth: "30%",
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#D0A0FE" },
                  { offset: 1, color: "#7481D9" },
                ]),
              },
            },
            {
              name: "项目数量",
              data: data1,
              type: "bar",
              barWidth: "30%",
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#20C5F4" },
                  { offset: 1, color: "#4A6FC1" },
                ]),
              },
            },
          ],
        };

        myChart.setOption(option);

        window.addEventListener("resize", function () {
          myChart.resize();
        });
      });
    },
    // ----------------------------------------------------------
    getmain3Data() {
      areaSumPrice(this.areaId).then((res) => {
        console.log("main3", res);
        if (res.code != 200) {
          this.$massage.error("获取图表三数据失败！");
          return;
        }
        this.main3Data = res.data;

        let myChart = echarts.init(document.getElementById("main3"));

        var dataAxis = [];
        var data = [];

        for (let i = 0; i < this.main3Data.length; i++) {
          dataAxis.push(this.main3Data[i].area_name);
          data.push(this.main3Data[i].supportTotal);
        }

        let option = {
          title: {
            text: "扶持金额",
            textStyle: {
              color: "#fff",
            },
            left: "5%",
            top: "5%",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          grid: [
            {
              //左侧的柱状图grid
              width: "75%",
              left: "15%",
              top: "15%",
              bottom: "10%",
            },
          ],
          xAxis: {
            type: "value",
            // boundaryGap: [0, 0.01],
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#273158",
              },
            },
            axisLabel: { show: true, textStyle: { color: "none" } },
          },
          yAxis: {
            type: "category",
            data: dataAxis,
            axisLabel: {
              // inside: true,
              textStyle: {
                color: "#fff",
              },
            },
            axisTick: {
              show: false,
            },
          },

          series: [
            {
              type: "bar",
              data: data,
              barWidth: "50%",
              label: {
                show: true,
                position: "right",
                valueAnimation: true,
                color: "#ffffff",
              },
              itemStyle: {
                //通常情况下：
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: "#219DFD",
                    },
                    {
                      offset: 1,
                      color: "#62DAD3",
                    },
                  ]),
                  shadowColor: "rgba(0, 0, 0, 0.4)",
                },
              },
            },
          ],
        };

        myChart.setOption(option);

        window.addEventListener("resize", function () {
          myChart.resize();
        });
      });
    },
    // -------------------------------------------------------------
    getmain4Data() {
      hightechNumber(this.areaId).then((res) => {
        console.log("main4", res);
        if (res.code != 200) {
          this.$massage.error("获取图表四数据失败！");
          return;
        }
        this.main4Data = res.data;

        const year = [];
        const count = [];

        for (let item of this.main4Data) {
          year.push(item.year);
          count.push(item.count);
        }

        var myChart = echarts.init(document.getElementById("main4"));
        var option = {
          title: {
            text: this.areaName + "高新数量",
            textStyle: {
              color: "#fff",
            },
            left: "5%",
            top: "5%",
          },
          grid: [
            {
              //左侧的柱状图grid
              width: "90%",
              left: "5%",
              top: "20%",
              right: "0",
              bottom: "0",
            },
          ],
          xAxis: [
            {
              //左侧柱状图的X轴
              gridIndex: 0, //x 轴所在的 grid 的索引
              show: false,
            },
          ],
          yAxis: [
            {
              //左侧柱状图的Y轴
              gridIndex: 0, //y轴所在的 grid 的索引
              splitLine: "none",
              axisTick: "none",
              axisLine: "none",
              axisLabel: {
                verticalAlign: "bottom",
                align: "left",
                padding: [0, 0, 15, 15],
                textStyle: {
                  color: "#FFFFFF",
                  fontSize: "16",
                },
              },
              data: year,
              inverse: true,
            },
            {
              //左侧柱状图的Y轴
              gridIndex: 0, //y轴所在的 grid 的索引
              splitLine: "none",
              axisTick: "none",
              axisLine: "none",
              data: count,
              inverse: true,
              axisLabel: {
                show: true,
                verticalAlign: "bottom",
                align: "right",
                padding: [0, 160, 15, 0],
                textStyle: {
                  color: "#fff",
                  fontSize: "16",
                },
                formatter: function (value) {
                  return value + "个";
                },
                rich: {
                  y: {
                    color: "#befbff",
                    fontSize: 16,
                  },
                  x: {
                    color: "#f6cf42",
                    fontSize: 16,
                  },
                },
              },
            },
            {
              //左侧柱状图的Y轴
              gridIndex: 0, //y轴所在的 grid 的索引
              splitLine: "none",
              axisTick: "none",
              axisLine: "none",
              data: [],
            },
          ],
          series: [
            {
              name: "2017年",
              type: "bar",
              xAxisIndex: 0, //使用的 x 轴的 index，在单个图表实例中存在多个 x 轴的时候有用。
              yAxisIndex: 0, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
              data: [count[0], , ,],
              barWidth: 15,
              itemStyle: {
                //通常情况下：
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: "#8200F4",
                    },
                    {
                      offset: 1,
                      color: "#FD136A",
                    },
                  ]),
                  shadowColor: "rgba(0, 0, 0, 0.4)",
                },
              },
              z: 2,
            },
            {
              name: "2018年",
              type: "bar",
              xAxisIndex: 0, //使用的 x 轴的 index，在单个图表实例中存在多个 x 轴的时候有用。
              yAxisIndex: 0, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
              data: [, count[1], ,],
              barWidth: 15,
              itemStyle: {
                //通常情况下：
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: "#8200F4",
                    },
                    {
                      offset: 1,
                      color: "#FD136A",
                    },
                  ]),
                  shadowColor: "rgba(0, 0, 0, 0.4)",
                },
              },
              z: 2,
            },
            {
              name: "2019年",
              type: "bar",
              xAxisIndex: 0, //使用的 x 轴的 index，在单个图表实例中存在多个 x 轴的时候有用。
              yAxisIndex: 0, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
              data: [, , count[2]],
              barWidth: 15,
              itemStyle: {
                //通常情况下：
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: "#8200F4",
                    },
                    {
                      offset: 1,
                      color: "#FD136A",
                    },
                  ]),
                  shadowColor: "rgba(0, 0, 0, 0.4)",
                },
              },
              z: 2,
            },
            {
              name: "2020年",
              type: "bar",
              xAxisIndex: 0, //使用的 x 轴的 index，在单个图表实例中存在多个 x 轴的时候有用。
              yAxisIndex: 0, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
              data: [, , , count[3]],
              barWidth: 15,
              itemStyle: {
                //通常情况下：
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: "#8200F4",
                    },
                    {
                      offset: 1,
                      color: "#FD136A",
                    },
                  ]),
                  shadowColor: "rgba(0, 0, 0, 0.4)",
                },
              },
              z: 2,
            },
            {
              name: "外框",
              type: "bar",
              xAxisIndex: 0, //使用的 x 轴的 index，在单个图表实例中存在多个 x 轴的时候有用。
              yAxisIndex: 0, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
              barGap: "-100%",
              data: [50000, 50000, 50000, 50000],
              barWidth: 15,
              itemStyle: {
                normal: {
                  color: "rgba(255, 255, 255, 0.15)",
                  barBorderRadius: 6,
                },
              },
              z: 0,
            },
            {
              name: "2017年",
              type: "pictorialBar",
              symbol:
                "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAZlBMVEUAAABe3uVe3+Vf3uVf3+Zf3uVg3+Zg3+Zf3+Vi4OZh4OZg3+Z86/Bh3+Zi4Odj4Odi4OZ86/B76/B86/Bj4ed56+9x5+xn4umB7/N87PB36e+A7/N+7fF/7vJ/7vJ+7fGA7/OB7/PReX+lAAAAIXRSTlMABQkVDREmIhk3MR10LEFFPHh7cUprXE35h2XnqMLAp+mHAG9cAAAB5ElEQVRIx83WjU7CMBQFYIoiKMqU/XUboHv/l/Tce7t2XamDNSacETEmX86tlK2rx4py150o+MstMBLwWRfHKo6JCVxLnvmFGBjFQ58oF1//sUZhGy/ClSTWObgnL4O+bkeN4nY2okfNMbkRt9/vtxz8InoTsWplJSCzFxPmO8+GpSIByX3YQAuGDWtRKhKjCnxDXhF6Z4yxnZ20Wgko7BMRDmxtSGVaI4kdTIgb+zTYoJQlIMlDlmUFgrcDWWC201qSayqlTkiCddWWeV62VU0YlnpRi9VOKaSUsiyq/N0krwq2Ugt7lVpZl5BfHNiytjagMi+XYp0kCR45hMlivVQrE/uU5pXSrCB5bM6d1t2lOZItMqmliT3q5uVxqxzyW/ccfYLNKx7ZTeykMvNyac2yt2Fbc61MHLSC0rwoxbiNdlQ3GBm1NLHQsHUrtEXppR/ljNpW6DbSCoqlFiVoN6YdaFlgsSFVPs1BdT8OaB5QyQzVcaqWDows/zepxR8ObLglTrdtCRVuRNj4Rrxh+//0ke2f8KVL+Kon3GCSbmsJN9OUW3j6g0Ns+LgCij2u0h+Sghc8mlMPBMgdx5DFh59VmOVHrvmDnoNxCz3J7MFWsMuaLyR089xz/xhlfijvwutR8gv3zk6BLUUeCgAAAABJRU5ErkJggg==",
              symbolSize: [50, 50],
              symbolOffset: [20, 0],
              z: 12,
              data: [
                {
                  value: count[0],
                  symbolPosition: "end",
                },
                {
                  value: 0,
                  symbolPosition: "end",
                },
                {
                  value: 0,
                  symbolPosition: "end",
                },
                {
                  value: 0,
                  symbolPosition: "end",
                },
              ],
            },
            {
              name: "2018年",
              type: "pictorialBar",
              symbol:
                "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAZlBMVEUAAABe3uVe3+Vf3uVf3+Zf3uVg3+Zg3+Zf3+Vi4OZh4OZg3+Z86/Bh3+Zi4Odj4Odi4OZ86/B76/B86/Bj4ed56+9x5+xn4umB7/N87PB36e+A7/N+7fF/7vJ/7vJ+7fGA7/OB7/PReX+lAAAAIXRSTlMABQkVDREmIhk3MR10LEFFPHh7cUprXE35h2XnqMLAp+mHAG9cAAAB5ElEQVRIx83WjU7CMBQFYIoiKMqU/XUboHv/l/Tce7t2XamDNSacETEmX86tlK2rx4py150o+MstMBLwWRfHKo6JCVxLnvmFGBjFQ58oF1//sUZhGy/ClSTWObgnL4O+bkeN4nY2okfNMbkRt9/vtxz8InoTsWplJSCzFxPmO8+GpSIByX3YQAuGDWtRKhKjCnxDXhF6Z4yxnZ20Wgko7BMRDmxtSGVaI4kdTIgb+zTYoJQlIMlDlmUFgrcDWWC201qSayqlTkiCddWWeV62VU0YlnpRi9VOKaSUsiyq/N0krwq2Ugt7lVpZl5BfHNiytjagMi+XYp0kCR45hMlivVQrE/uU5pXSrCB5bM6d1t2lOZItMqmliT3q5uVxqxzyW/ccfYLNKx7ZTeykMvNyac2yt2Fbc61MHLSC0rwoxbiNdlQ3GBm1NLHQsHUrtEXppR/ljNpW6DbSCoqlFiVoN6YdaFlgsSFVPs1BdT8OaB5QyQzVcaqWDows/zepxR8ObLglTrdtCRVuRNj4Rrxh+//0ke2f8KVL+Kon3GCSbmsJN9OUW3j6g0Ns+LgCij2u0h+Sghc8mlMPBMgdx5DFh59VmOVHrvmDnoNxCz3J7MFWsMuaLyR089xz/xhlfijvwutR8gv3zk6BLUUeCgAAAABJRU5ErkJggg==",
              symbolSize: [50, 50],
              symbolOffset: [20, 0],
              z: 12,
              data: [
                {
                  value: 0,
                  symbolPosition: "end",
                },
                {
                  value: count[1],
                  symbolPosition: "end",
                },
                {
                  value: 0,
                  symbolPosition: "end",
                },
                {
                  value: 0,
                  symbolPosition: "end",
                },
              ],
            },
            {
              name: "2019年",
              type: "pictorialBar",
              symbol:
                "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAZlBMVEUAAABe3uVe3+Vf3uVf3+Zf3uVg3+Zg3+Zf3+Vi4OZh4OZg3+Z86/Bh3+Zi4Odj4Odi4OZ86/B76/B86/Bj4ed56+9x5+xn4umB7/N87PB36e+A7/N+7fF/7vJ/7vJ+7fGA7/OB7/PReX+lAAAAIXRSTlMABQkVDREmIhk3MR10LEFFPHh7cUprXE35h2XnqMLAp+mHAG9cAAAB5ElEQVRIx83WjU7CMBQFYIoiKMqU/XUboHv/l/Tce7t2XamDNSacETEmX86tlK2rx4py150o+MstMBLwWRfHKo6JCVxLnvmFGBjFQ58oF1//sUZhGy/ClSTWObgnL4O+bkeN4nY2okfNMbkRt9/vtxz8InoTsWplJSCzFxPmO8+GpSIByX3YQAuGDWtRKhKjCnxDXhF6Z4yxnZ20Wgko7BMRDmxtSGVaI4kdTIgb+zTYoJQlIMlDlmUFgrcDWWC201qSayqlTkiCddWWeV62VU0YlnpRi9VOKaSUsiyq/N0krwq2Ugt7lVpZl5BfHNiytjagMi+XYp0kCR45hMlivVQrE/uU5pXSrCB5bM6d1t2lOZItMqmliT3q5uVxqxzyW/ccfYLNKx7ZTeykMvNyac2yt2Fbc61MHLSC0rwoxbiNdlQ3GBm1NLHQsHUrtEXppR/ljNpW6DbSCoqlFiVoN6YdaFlgsSFVPs1BdT8OaB5QyQzVcaqWDows/zepxR8ObLglTrdtCRVuRNj4Rrxh+//0ke2f8KVL+Kon3GCSbmsJN9OUW3j6g0Ns+LgCij2u0h+Sghc8mlMPBMgdx5DFh59VmOVHrvmDnoNxCz3J7MFWsMuaLyR089xz/xhlfijvwutR8gv3zk6BLUUeCgAAAABJRU5ErkJggg==",
              symbolSize: [50, 50],
              symbolOffset: [20, 0],
              z: 12,
              data: [
                {
                  value: 0,
                  symbolPosition: "end",
                },
                {
                  value: 0,
                  symbolPosition: "end",
                },
                {
                  value: count[2],
                  symbolPosition: "end",
                },
                {
                  value: 0,
                  symbolPosition: "end",
                },
              ],
            },
            {
              name: "2020年",
              type: "pictorialBar",
              symbol:
                "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAZlBMVEUAAABe3uVe3+Vf3uVf3+Zf3uVg3+Zg3+Zf3+Vi4OZh4OZg3+Z86/Bh3+Zi4Odj4Odi4OZ86/B76/B86/Bj4ed56+9x5+xn4umB7/N87PB36e+A7/N+7fF/7vJ/7vJ+7fGA7/OB7/PReX+lAAAAIXRSTlMABQkVDREmIhk3MR10LEFFPHh7cUprXE35h2XnqMLAp+mHAG9cAAAB5ElEQVRIx83WjU7CMBQFYIoiKMqU/XUboHv/l/Tce7t2XamDNSacETEmX86tlK2rx4py150o+MstMBLwWRfHKo6JCVxLnvmFGBjFQ58oF1//sUZhGy/ClSTWObgnL4O+bkeN4nY2okfNMbkRt9/vtxz8InoTsWplJSCzFxPmO8+GpSIByX3YQAuGDWtRKhKjCnxDXhF6Z4yxnZ20Wgko7BMRDmxtSGVaI4kdTIgb+zTYoJQlIMlDlmUFgrcDWWC201qSayqlTkiCddWWeV62VU0YlnpRi9VOKaSUsiyq/N0krwq2Ugt7lVpZl5BfHNiytjagMi+XYp0kCR45hMlivVQrE/uU5pXSrCB5bM6d1t2lOZItMqmliT3q5uVxqxzyW/ccfYLNKx7ZTeykMvNyac2yt2Fbc61MHLSC0rwoxbiNdlQ3GBm1NLHQsHUrtEXppR/ljNpW6DbSCoqlFiVoN6YdaFlgsSFVPs1BdT8OaB5QyQzVcaqWDows/zepxR8ObLglTrdtCRVuRNj4Rrxh+//0ke2f8KVL+Kon3GCSbmsJN9OUW3j6g0Ns+LgCij2u0h+Sghc8mlMPBMgdx5DFh59VmOVHrvmDnoNxCz3J7MFWsMuaLyR089xz/xhlfijvwutR8gv3zk6BLUUeCgAAAABJRU5ErkJggg==",
              symbolSize: [50, 50],
              symbolOffset: [20, 0],
              z: 12,
              data: [
                {
                  value: 0,
                  symbolPosition: "end",
                },
                {
                  value: 0,
                  symbolPosition: "end",
                },
                {
                  value: 0,
                  symbolPosition: "end",
                },
                {
                  value: count[3],
                  symbolPosition: "end",
                },
              ],
            },
          ],
        };

        myChart.setOption(option);

        window.addEventListener("resize", function () {
          myChart.resize();
        });
      });
    },
    // -------------------------------------------------------------
    getmain5Data() {
      supportTotal(this.areaId).then((res) => {
        console.log("main5", res);
        if (res.code != 200) {
          this.$massage.error("获取图表五数据失败！");
          return;
        }
        this.main5Data = res.data;

        const year = [];
        const totalPrice = [];

        for (let i = 0; i < this.main5Data.length; i++) {
          year.push(this.main5Data[i].year);
          totalPrice.push((this.main5Data[i].totalPrice / 10000).toFixed(2));
          // totalPrice.push(this.main5Data[i].totalPrice);
        }

        var myChart = echarts.init(document.getElementById("main5"));
        var option = {
          title: {
            text: this.areaName + "资助总金额（万元）",
            textStyle: {
              color: "#fff",
            },
            left: "5%",
            top: "5%",
          },
          grid: [
            {
              //左侧的柱状图grid
              width: "80%",
              left: "15%",
              top: "20%",
              // right: "25%",
              bottom: "10%",
            },
          ],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985",
              },
            },
            formatter: function (params) {
              var relVal = params[0].name + ": " + params[0].data + " (万元)";
              return relVal;
            },
          },
          // tooltip: {
          //   trigger: "axis",
          //   axisPointer: {
          //     type: "shadow",
          //   },
          //   formatter: function (params) {
          //     var relVal = params[0].name + ": " + params[0].data + " (万元)";
          //     return relVal;
          //   },
          // },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: year,
            axisLabel: {
              // inside: true,
              textStyle: {
                color: "#fff",
              },
            },
          },
          yAxis: {
            type: "value",
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              // inside: true,
              textStyle: {
                color: "#fff",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#273158",
              },
            },
          },
          series: [
            {
              name: "资助总资金",
              type: "line",
              stack: "总量",
              smooth: true,
              itemStyle: {
                normal: {
                  color: "#21F8E4", //折点颜色

                  lineStyle: {
                    color: "#FD136A", //折线颜色
                    width: 3,
                  },
                },
              },
              // lineStyle: {
              //     width: 0
              // },
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#FB1369",
                  },
                  {
                    offset: 1,
                    color: "#061235",
                  },
                ]),
              },
              emphasis: {
                focus: "series",
              },
              data: totalPrice,
            },
          ],
        };
        myChart.setOption(option);

        window.addEventListener("resize", function () {
          myChart.resize();
        });
      });
    },
    // ----------------------------------------------------------
    getmain6Data() {
      projectNumber(this.areaId).then((res) => {
        console.log("main6", res);
        if (res.code != 200) {
          this.$massage.error("获取图表六数据失败！");
          return;
        }
        this.main6Data = res.data;

        const year = [];
        const number = [];

        for (let item of this.main6Data) {
          year.push(item.year);
          number.push(item.number);
        }

        var myChart = echarts.init(document.getElementById("main6"));
        var option = {
          title: {
            text: this.areaName + "项目数量",
            textStyle: {
              color: "#fff",
            },
            left: "5%",
            top: "5%",
          },
          grid: [
            {
              //左侧的柱状图grid
              width: "100%",
              left: "5%",
              top: "20%",
              right: "0",
              bottom: "0",
            },
          ],
          xAxis: [
            {
              //左侧柱状图的X轴
              gridIndex: 0, //x 轴所在的 grid 的索引
              show: false,
            },
          ],
          yAxis: [
            {
              //左侧柱状图的Y轴
              gridIndex: 0, //y轴所在的 grid 的索引
              splitLine: "none",
              axisTick: "none",
              axisLine: "none",
              axisLabel: {
                verticalAlign: "bottom",
                align: "left",
                padding: [0, 0, 15, 15],
                textStyle: {
                  color: "#FFFFFF",
                  fontSize: "16",
                },
              },
              data: year,
              inverse: true,
            },
            {
              //左侧柱状图的Y轴
              gridIndex: 0, //y轴所在的 grid 的索引
              splitLine: "none",
              axisTick: "none",
              axisLine: "none",
              data: number,
              inverse: true,
              axisLabel: {
                show: true,
                verticalAlign: "bottom",
                align: "right",
                padding: [0, 160, 15, 0],
                textStyle: {
                  color: "#fff",
                  fontSize: "16",
                },
                formatter: function (value) {
                  return value + "个";
                },
                rich: {
                  y: {
                    color: "#befbff",
                    fontSize: 16,
                  },
                  x: {
                    color: "#f6cf42",
                    fontSize: 16,
                  },
                },
              },
            },
            {
              //左侧柱状图的Y轴
              gridIndex: 0, //y轴所在的 grid 的索引
              splitLine: "none",
              axisTick: "none",
              axisLine: "none",
              data: [],
            },
          ],
          series: [
            {
              name: "2017年",
              type: "bar",
              xAxisIndex: 0, //使用的 x 轴的 index，在单个图表实例中存在多个 x 轴的时候有用。
              yAxisIndex: 0, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
              data: [number[0] * 5, , ,],
              barWidth: 15,
              itemStyle: {
                //通常情况下：
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: "#F8E700",
                    },
                    {
                      offset: 1,
                      color: "#FB4C19",
                    },
                  ]),
                  shadowColor: "rgba(0, 0, 0, 0.4)",
                },
              },
              z: 2,
            },
            {
              name: "2018年",
              type: "bar",
              xAxisIndex: 0, //使用的 x 轴的 index，在单个图表实例中存在多个 x 轴的时候有用。
              yAxisIndex: 0, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
              data: [, number[1] * 5, ,],
              barWidth: 15,
              itemStyle: {
                //通常情况下：
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: "#F8E700",
                    },
                    {
                      offset: 1,
                      color: "#FB4C19",
                    },
                  ]),
                  shadowColor: "rgba(0, 0, 0, 0.4)",
                },
              },
              z: 2,
            },
            {
              name: "2019年",
              type: "bar",
              xAxisIndex: 0, //使用的 x 轴的 index，在单个图表实例中存在多个 x 轴的时候有用。
              yAxisIndex: 0, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
              data: [, , number[2] * 5],
              barWidth: 15,
              itemStyle: {
                //通常情况下：
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: "#F8E700",
                    },
                    {
                      offset: 1,
                      color: "#FB4C19",
                    },
                  ]),
                  shadowColor: "rgba(0, 0, 0, 0.4)",
                },
              },
              z: 2,
            },
            {
              name: "2020年",
              type: "bar",
              xAxisIndex: 0, //使用的 x 轴的 index，在单个图表实例中存在多个 x 轴的时候有用。
              yAxisIndex: 0, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
              data: [, , , number[3] * 5],
              barWidth: 15,
              itemStyle: {
                //通常情况下：
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: "#F8E700",
                    },
                    {
                      offset: 1,
                      color: "#FB4C19",
                    },
                  ]),
                  shadowColor: "rgba(0, 0, 0, 0.4)",
                },
              },
              z: 2,
            },
            {
              name: "外框",
              type: "bar",
              xAxisIndex: 0, //使用的 x 轴的 index，在单个图表实例中存在多个 x 轴的时候有用。
              yAxisIndex: 0, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
              barGap: "-100%",
              data: [1554, 1554, 1554, 1554],
              barWidth: 15,
              itemStyle: {
                normal: {
                  color: "rgba(255, 255, 255, 0.15)",
                  barBorderRadius: 6,
                },
              },
              z: 0,
            },
            {
              name: "2017年",
              type: "pictorialBar",
              symbol:
                "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAZlBMVEUAAABe3uVe3+Vf3uVf3+Zf3uVg3+Zg3+Zf3+Vi4OZh4OZg3+Z86/Bh3+Zi4Odj4Odi4OZ86/B76/B86/Bj4ed56+9x5+xn4umB7/N87PB36e+A7/N+7fF/7vJ/7vJ+7fGA7/OB7/PReX+lAAAAIXRSTlMABQkVDREmIhk3MR10LEFFPHh7cUprXE35h2XnqMLAp+mHAG9cAAAB5ElEQVRIx83WjU7CMBQFYIoiKMqU/XUboHv/l/Tce7t2XamDNSacETEmX86tlK2rx4py150o+MstMBLwWRfHKo6JCVxLnvmFGBjFQ58oF1//sUZhGy/ClSTWObgnL4O+bkeN4nY2okfNMbkRt9/vtxz8InoTsWplJSCzFxPmO8+GpSIByX3YQAuGDWtRKhKjCnxDXhF6Z4yxnZ20Wgko7BMRDmxtSGVaI4kdTIgb+zTYoJQlIMlDlmUFgrcDWWC201qSayqlTkiCddWWeV62VU0YlnpRi9VOKaSUsiyq/N0krwq2Ugt7lVpZl5BfHNiytjagMi+XYp0kCR45hMlivVQrE/uU5pXSrCB5bM6d1t2lOZItMqmliT3q5uVxqxzyW/ccfYLNKx7ZTeykMvNyac2yt2Fbc61MHLSC0rwoxbiNdlQ3GBm1NLHQsHUrtEXppR/ljNpW6DbSCoqlFiVoN6YdaFlgsSFVPs1BdT8OaB5QyQzVcaqWDows/zepxR8ObLglTrdtCRVuRNj4Rrxh+//0ke2f8KVL+Kon3GCSbmsJN9OUW3j6g0Ns+LgCij2u0h+Sghc8mlMPBMgdx5DFh59VmOVHrvmDnoNxCz3J7MFWsMuaLyR089xz/xhlfijvwutR8gv3zk6BLUUeCgAAAABJRU5ErkJggg==",
              symbolSize: [50, 50],
              symbolOffset: [20, 0],
              z: 12,
              data: [
                {
                  value: number[0] * 5,
                  symbolPosition: "end",
                },
                {
                  value: 0,
                  symbolPosition: "end",
                },
                {
                  value: 0,
                  symbolPosition: "end",
                },
                {
                  value: 0,
                  symbolPosition: "end",
                },
              ],
            },
            {
              name: "2018年",
              type: "pictorialBar",
              symbol:
                "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAZlBMVEUAAABe3uVe3+Vf3uVf3+Zf3uVg3+Zg3+Zf3+Vi4OZh4OZg3+Z86/Bh3+Zi4Odj4Odi4OZ86/B76/B86/Bj4ed56+9x5+xn4umB7/N87PB36e+A7/N+7fF/7vJ/7vJ+7fGA7/OB7/PReX+lAAAAIXRSTlMABQkVDREmIhk3MR10LEFFPHh7cUprXE35h2XnqMLAp+mHAG9cAAAB5ElEQVRIx83WjU7CMBQFYIoiKMqU/XUboHv/l/Tce7t2XamDNSacETEmX86tlK2rx4py150o+MstMBLwWRfHKo6JCVxLnvmFGBjFQ58oF1//sUZhGy/ClSTWObgnL4O+bkeN4nY2okfNMbkRt9/vtxz8InoTsWplJSCzFxPmO8+GpSIByX3YQAuGDWtRKhKjCnxDXhF6Z4yxnZ20Wgko7BMRDmxtSGVaI4kdTIgb+zTYoJQlIMlDlmUFgrcDWWC201qSayqlTkiCddWWeV62VU0YlnpRi9VOKaSUsiyq/N0krwq2Ugt7lVpZl5BfHNiytjagMi+XYp0kCR45hMlivVQrE/uU5pXSrCB5bM6d1t2lOZItMqmliT3q5uVxqxzyW/ccfYLNKx7ZTeykMvNyac2yt2Fbc61MHLSC0rwoxbiNdlQ3GBm1NLHQsHUrtEXppR/ljNpW6DbSCoqlFiVoN6YdaFlgsSFVPs1BdT8OaB5QyQzVcaqWDows/zepxR8ObLglTrdtCRVuRNj4Rrxh+//0ke2f8KVL+Kon3GCSbmsJN9OUW3j6g0Ns+LgCij2u0h+Sghc8mlMPBMgdx5DFh59VmOVHrvmDnoNxCz3J7MFWsMuaLyR089xz/xhlfijvwutR8gv3zk6BLUUeCgAAAABJRU5ErkJggg==",
              symbolSize: [50, 50],
              symbolOffset: [20, 0],
              z: 12,
              data: [
                {
                  value: 0,
                  symbolPosition: "end",
                },
                {
                  value: number[1] * 5,
                  symbolPosition: "end",
                },
                {
                  value: 0,
                  symbolPosition: "end",
                },
                {
                  value: 0,
                  symbolPosition: "end",
                },
              ],
            },
            {
              name: "2019年",
              type: "pictorialBar",
              symbol:
                "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAZlBMVEUAAABe3uVe3+Vf3uVf3+Zf3uVg3+Zg3+Zf3+Vi4OZh4OZg3+Z86/Bh3+Zi4Odj4Odi4OZ86/B76/B86/Bj4ed56+9x5+xn4umB7/N87PB36e+A7/N+7fF/7vJ/7vJ+7fGA7/OB7/PReX+lAAAAIXRSTlMABQkVDREmIhk3MR10LEFFPHh7cUprXE35h2XnqMLAp+mHAG9cAAAB5ElEQVRIx83WjU7CMBQFYIoiKMqU/XUboHv/l/Tce7t2XamDNSacETEmX86tlK2rx4py150o+MstMBLwWRfHKo6JCVxLnvmFGBjFQ58oF1//sUZhGy/ClSTWObgnL4O+bkeN4nY2okfNMbkRt9/vtxz8InoTsWplJSCzFxPmO8+GpSIByX3YQAuGDWtRKhKjCnxDXhF6Z4yxnZ20Wgko7BMRDmxtSGVaI4kdTIgb+zTYoJQlIMlDlmUFgrcDWWC201qSayqlTkiCddWWeV62VU0YlnpRi9VOKaSUsiyq/N0krwq2Ugt7lVpZl5BfHNiytjagMi+XYp0kCR45hMlivVQrE/uU5pXSrCB5bM6d1t2lOZItMqmliT3q5uVxqxzyW/ccfYLNKx7ZTeykMvNyac2yt2Fbc61MHLSC0rwoxbiNdlQ3GBm1NLHQsHUrtEXppR/ljNpW6DbSCoqlFiVoN6YdaFlgsSFVPs1BdT8OaB5QyQzVcaqWDows/zepxR8ObLglTrdtCRVuRNj4Rrxh+//0ke2f8KVL+Kon3GCSbmsJN9OUW3j6g0Ns+LgCij2u0h+Sghc8mlMPBMgdx5DFh59VmOVHrvmDnoNxCz3J7MFWsMuaLyR089xz/xhlfijvwutR8gv3zk6BLUUeCgAAAABJRU5ErkJggg==",
              symbolSize: [50, 50],
              symbolOffset: [20, 0],
              z: 12,
              data: [
                {
                  value: 0,
                  symbolPosition: "end",
                },
                {
                  value: 0,
                  symbolPosition: "end",
                },
                {
                  value: number[2] * 5,
                  symbolPosition: "end",
                },
                {
                  value: 0,
                  symbolPosition: "end",
                },
              ],
            },
            {
              name: "2020年",
              type: "pictorialBar",
              symbol:
                "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAZlBMVEUAAABe3uVe3+Vf3uVf3+Zf3uVg3+Zg3+Zf3+Vi4OZh4OZg3+Z86/Bh3+Zi4Odj4Odi4OZ86/B76/B86/Bj4ed56+9x5+xn4umB7/N87PB36e+A7/N+7fF/7vJ/7vJ+7fGA7/OB7/PReX+lAAAAIXRSTlMABQkVDREmIhk3MR10LEFFPHh7cUprXE35h2XnqMLAp+mHAG9cAAAB5ElEQVRIx83WjU7CMBQFYIoiKMqU/XUboHv/l/Tce7t2XamDNSacETEmX86tlK2rx4py150o+MstMBLwWRfHKo6JCVxLnvmFGBjFQ58oF1//sUZhGy/ClSTWObgnL4O+bkeN4nY2okfNMbkRt9/vtxz8InoTsWplJSCzFxPmO8+GpSIByX3YQAuGDWtRKhKjCnxDXhF6Z4yxnZ20Wgko7BMRDmxtSGVaI4kdTIgb+zTYoJQlIMlDlmUFgrcDWWC201qSayqlTkiCddWWeV62VU0YlnpRi9VOKaSUsiyq/N0krwq2Ugt7lVpZl5BfHNiytjagMi+XYp0kCR45hMlivVQrE/uU5pXSrCB5bM6d1t2lOZItMqmliT3q5uVxqxzyW/ccfYLNKx7ZTeykMvNyac2yt2Fbc61MHLSC0rwoxbiNdlQ3GBm1NLHQsHUrtEXppR/ljNpW6DbSCoqlFiVoN6YdaFlgsSFVPs1BdT8OaB5QyQzVcaqWDows/zepxR8ObLglTrdtCRVuRNj4Rrxh+//0ke2f8KVL+Kon3GCSbmsJN9OUW3j6g0Ns+LgCij2u0h+Sghc8mlMPBMgdx5DFh59VmOVHrvmDnoNxCz3J7MFWsMuaLyR089xz/xhlfijvwutR8gv3zk6BLUUeCgAAAABJRU5ErkJggg==",
              symbolSize: [50, 50],
              symbolOffset: [20, 0],
              z: 12,
              data: [
                {
                  value: 0,
                  symbolPosition: "end",
                },
                {
                  value: 0,
                  symbolPosition: "end",
                },
                {
                  value: 0,
                  symbolPosition: "end",
                },
                {
                  value: number[3] * 5,
                  symbolPosition: "end",
                },
              ],
            },
          ],
        };

        myChart.setOption(option);

        window.addEventListener("resize", function () {
          myChart.resize();
        });
      });
    },
    // -------------------------------------------------------------
    getmain7Data() {
      departmentStatistics(this.areaId).then((res) => {
        console.log("main7", res);
        if (res.code != 200) {
          this.$massage.error("获取图表七数据失败！");
          return;
        }
        this.main7Data = res.data;

        var dataname = [];
        var data = [];
        var data1 = [];
        // name显示的长度
        var nameHenght = 2;

        for (let item of this.main7Data) {
          dataname.push(item.departmentName);
          data.push((item.supportTotal / 10000).toFixed(2));
          data1.push(item.projectNumber);
        }

        if (dataname.length <= 5) {
          nameHenght = 10;
        } else if (dataname.length <= 12) {
          nameHenght = 8;
        } else if (12 < dataname.length && dataname.length <= 20) {
          nameHenght = 3;
        }

        var indicator = [];
        for (var i = 0; i < dataname.length; i++) {
          indicator.push({
            name: dataname[i],
            // max: datamax[i],
          });
        }
        function contains(arrays, obj) {
          var i = arrays.length;
          while (i--) {
            if (arrays[i] === obj) {
              return i;
            }
          }
          return false;
        }

        var myChart = echarts.init(document.getElementById("main7"));

        var option = {
          title: {
            text: "2020年" + this.areaName + "部委项目数量以及扶持金额",
            textStyle: {
              color: "#fff",
            },
            left: "5%",
            top: "5%",
          },
          grid: [
            {
              //左侧的柱状图grid
              width: "85%",
              left: "10%",
              top: "20%",
              bottom: "25%",
            },
          ],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
            // formatter: function (params) {
            //   console.log(params);
            //     var relVal = params[0].name;
            //         relVal += '<br/>' + params[0].seriesName + ''
            //     return relVal;
            // }
          },
          legend: {
            // data: ["蒸发量", "降水量", "平均温度"],
            textStyle: {
              color: "#ffffff", // 文字的颜色。
              // lineHeight: 20,
              fontSize: 16,
            },
            padding: [30, 50, 0, 0],
          },
          xAxis: [
            {
              type: "category",
              data: dataname,
              axisPointer: {
                type: "shadow",
              },
              axisLabel: {
                // inside: true,
                interval: 0,
                textStyle: {
                  color: "#fff",
                },
                // rotate: -30,
                formatter: function (value) {
                  var ret = ""; //拼接加\n返回的类目项
                  var maxLength = nameHenght; //每项显示文字个数
                  var valLength = value.length; //X轴类目项的文字个数
                  var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                  if (rowN > 1) {
                    //如果类目项的文字大于3,
                    for (var i = 0; i < rowN; i++) {
                      var temp = ""; //每次截取的字符串
                      var start = i * maxLength; //开始截取的位置
                      var end = start + maxLength; //结束截取的位置
                      //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                      temp = value.substring(start, end) + "\n";
                      ret += temp; //凭借最终的字符串
                    }
                    return ret;
                  } else {
                    return value;
                  }
                },
              },
              axisTick: {
                show: false,
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              // min: 0,
              // max: 250,
              // interval: 50,
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                formatter: "{value} 万元",
                // inside: true,
                textStyle: {
                  color: "#fff",
                },
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: "#273158",
                },
              },
            },
            {
              type: "value",
              // min: 0,
              // max: 25,
              // interval: 5,
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                formatter: "{value} 个",
                // inside: true,
                textStyle: {
                  color: "#fff",
                },
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: "#273158",
                },
              },
            },
          ],
          series: [
            {
              name: "扶持金额",
              type: "bar",
              data: data,
              barWidth: "50%",
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#06EEFF" },
                  { offset: 1, color: "#1555F6" },
                ]),
              },
            },
            {
              name: "项目数量",
              type: "line",
              yAxisIndex: 1,
              data: data1,
              itemStyle: {
                normal: {
                  color: "#EDE500", //折点颜色

                  lineStyle: {
                    color: "#EDE500", //折线颜色
                    width: 3,
                  },
                },
              },
            },
          ],
        };

        myChart.setOption(option);

        window.addEventListener("resize", function () {
          myChart.resize();
        });
      });
    },
    // ------------------------------------------------------------
    getmain8Data() {
      var myChart = echarts.init(document.getElementById("main8"));

      var dataAxis = [];
      var data = [];

      for (let item of this.main7Data) {
        dataAxis.push(item.departmentName);
        data.push(item.projectNumber);
      }

      var option = {
        title: {
          text: "2020年深圳市部委项目数量",
          textStyle: {
            color: "#fff",
          },
          left: "5%",
          top: "5%",
        },
        grid: [
          {
            //左侧的柱状图grid
            width: "85%",
            left: "10%",
            top: "20%",
            bottom: "15%",
          },
        ],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "category",
          axisLabel: {
            // inside: true,
            textStyle: {
              color: "#fff",
            },
            interval: 0,
            formatter: function (value) {
              var ret = ""; //拼接加\n返回的类目项
              var maxLength = 4; //每项显示文字个数
              var valLength = value.length; //X轴类目项的文字个数
              var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
              if (rowN > 1) {
                //如果类目项的文字大于3,
                for (var i = 0; i < rowN; i++) {
                  var temp = ""; //每次截取的字符串
                  var start = i * maxLength; //开始截取的位置
                  var end = start + maxLength; //结束截取的位置
                  //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                  temp = value.substring(start, end) + "\n";
                  ret += temp; //凭借最终的字符串
                }
                return ret;
              } else {
                return value;
              }
            },
          },
          data: dataAxis,
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            // inside: true,
            textStyle: {
              color: "#fff",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#273158",
            },
          },
        },
        series: [
          {
            data: data,
            type: "bar",
            barWidth: "30%",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#06EEFF" },
                { offset: 1, color: "#1555F6" },
              ]),
            },
          },
        ],
      };

      myChart.setOption(option);

      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    // ------------------------------------------------------------
    getHYlist() {
      HYlist("1", "20").then((res) => {
        // console.log(res);
        if (res.code != 200) {
          this.$massage.error("获取行业列表数据失败！");
          return;
        }

        const totalArr = [];
        const totalArr1 = [];
        for (let item of res.rows) {
          // 遍历，筛选出下拉菜单
          let itemContent = {};
          itemContent.value = item.categoryId;
          itemContent.label = item.categoryName;
          totalArr.push(itemContent);

          // 遍历，筛选出饼图选择菜单
          let itemContent1 = {};
          itemContent1.value = 1;
          itemContent1.num = item.categoryId;
          itemContent1.name = item.categoryName;
          totalArr1.push(itemContent1);
        }
        // console.log(totalArr);

        // 得到main9下拉选择框数据
        this.options = totalArr;
        // 设置下拉框默认值
        this.optionsSelectData = this.options[0].value;

        // 得到饼图数据
        this.options1 = totalArr1;

        this.getmain9Data(this.options[0].value);
        this.getmain11Data();
      });
    },
    // ------------------------------------------------------------
    getmain9Data(num) {
      categorySumNumber(num).then((res) => {
        console.log("main9", res);
        if (res.code != 200) {
          this.$massage.error("获取图表九数据失败！");
          return;
        }
        this.main9Data = res.data;

        var dataAxis = [];
        var data = [];

        for (let i = 0; i < this.main9Data.length; i++) {
          dataAxis.push(this.main9Data[i].categoryName);
          data.push(this.main9Data[i].projectNumber);
        }

        var myChart = echarts.init(document.getElementById("main9"));

        var option = {
          title: {
            text: "行业数据",
            textStyle: {
              color: "#fff",
            },
            left: "5%",
            top: "5%",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          grid: [
            {
              //左侧的柱状图grid
              width: "85%",
              left: "10%",
              top: "20%",
              bottom: "18%",
            },
          ],
          xAxis: {
            type: "category",
            axisLabel: {
              // inside: true,
              textStyle: {
                color: "#fff",
              },
              interval: 0,
              // formatter: function (value) {
              //   var ret = ""; //拼接加\n返回的类目项
              //   var maxLength = 4; //每项显示文字个数
              //   var valLength = value.length; //X轴类目项的文字个数
              //   var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
              //   if (rowN > 1) {
              //     //如果类目项的文字大于3,
              //     for (var i = 0; i < rowN; i++) {
              //       var temp = ""; //每次截取的字符串
              //       var start = i * maxLength; //开始截取的位置
              //       var end = start + maxLength; //结束截取的位置
              //       //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
              //       temp = value.substring(start, end) + "\n";
              //       ret += temp; //凭借最终的字符串
              //     }
              //     return ret;
              //   } else {
              //     return value;
              //   }
              // },
              rotate: 30,
            },
            data: dataAxis,
            axisTick: {
              alignWithLabel: true,
            },
          },
          yAxis: {
            type: "value",
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              // inside: true,
              textStyle: {
                color: "#fff",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#273158",
              },
            },
          },
          series: [
            {
              data: data,
              type: "bar",
              barWidth: "30%",
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#D0A0FE" },
                  { offset: 1, color: "#7481D9" },
                ]),
              },
            },
          ],
        };

        myChart.setOption(option);

        window.addEventListener("resize", function () {
          myChart.resize();
        });
      });
    },
    // ------------------------------------------------------------
    getmain10Data() {
      var dataAxis = [];
      var data = [];

      for (let i = 0; i < this.main10Data.length; i++) {
        dataAxis.push(this.main10Data[i].categoryName);
        data.push(
          (
            this.main10Data[i].supportTotal /
            (this.main10Data[i].supportNumber * 10000)
          ).toFixed(2)
        );
      }

      let myChart = echarts.init(document.getElementById("main10"));

      let option = {
        title: {
          text: "企业平均申报金额（万元）",
          textStyle: {
            color: "#fff",
          },
          left: "5%",
          top: "5%",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: function (params) {
            var relVal = params[0].name + ": " + params[0].data + " (万元)";
            return relVal;
          },
        },
        grid: [
          {
            //左侧的柱状图grid
            width: "68%",
            left: "30%",
            top: "15%",
            bottom: "10%",
          },
        ],
        xAxis: {
          type: "value",
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#273158",
            },
          },
          axisLabel: { show: true, textStyle: { color: "none" } },
        },
        yAxis: {
          type: "category",
          data: dataAxis,
          axisLabel: {
            // inside: true,
            textStyle: {
              color: "#fff",
            },
          },
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            // name: "2011年",
            type: "bar",
            barWidth: "50%",
            data: data,
            itemStyle: {
              //通常情况下：
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#7481D9",
                  },
                  {
                    offset: 1,
                    color: "#D0A0FE",
                  },
                ]),
                shadowColor: "rgba(0, 0, 0, 0.4)",
              },
            },
          },
        ],
      };

      myChart.setOption(option);

      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    // ------------------------------------------------------------
    getmain11Data() {
      console.log("main11", this.options);
      let myChart = echarts.init(document.getElementById("main11"));

      var option = {
        color: [
          "#E062AE",
          "#E690D1",
          "#E7BCF3",
          "#FFDB5C",
          "#FBFB72",
          "#F9E193",
          "#BDD2FD",
          "#5B8FF9",
          "#6DC8EC",
          "#37A2DA",
          "#9FE6B8",
          "#5AD8A6",
          "#FF9F7F",
          "#F27F68",
          "#FB7293",
        ],
        title: {
          text: "行业数据",
          textStyle: {
            color: "#fff",
          },
          left: "5%",
          top: "5%",
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "65%",
            label: {
              show: false,
              position: "center",
            },
            center: ["50%", "50%"],
            data: this.options1,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      myChart.setOption(option);

      window.addEventListener("resize", function () {
        myChart.resize();
      });

      // 圆柱图上添加点击事件
      myChart.on("click", (param) => {
        console.log(param);

        this.getcategorySumPriceData(param.data.num, param.data.name);
      });

      // 在饼图出现后，在渲染两个数据图
      this.getcategorySumPriceData("1", "现代物流");
    },
    // ------------------------------------------------------------
    getmain12Data() {
      var dataAxis = [];
      var data = [];

      for (let i = 0; i < this.main10Data.length; i++) {
        dataAxis.push(this.main10Data[i].categoryName);
        data.push((this.main10Data[i].supportTotal / 10000).toFixed(2));
      }
      let myChart = echarts.init(document.getElementById("main12"));

      let option = {
        title: {
          text: "行业补贴金额（万元）",
          textStyle: {
            color: "#fff",
          },
          left: "5%",
          top: "5%",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: function (params) {
            var relVal = params[0].name + ": " + params[0].data + " (万元)";
            return relVal;
          },
        },
        grid: [
          {
            //左侧的柱状图grid
            width: "68%",
            left: "30%",
            top: "15%",
            bottom: "10%",
          },
        ],
        xAxis: {
          type: "value",
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#273158",
            },
          },
          axisLabel: { show: true, textStyle: { color: "none" } },
        },
        yAxis: {
          type: "category",
          data: dataAxis,
          axisLabel: {
            // inside: true,
            textStyle: {
              color: "#fff",
            },
          },
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            // name: "2011年",
            type: "bar",
            barWidth: "50%",
            data: data,
            itemStyle: {
              //通常情况下：
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#219DFD",
                  },
                  {
                    offset: 1,
                    color: "#62DAD3",
                  },
                ]),
                shadowColor: "rgba(0, 0, 0, 0.4)",
              },
            },
          },
        ],
      };

      myChart.setOption(option);

      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    // 获取10/12的数据
    getcategorySumPriceData(num, title) {
      categorySumPrice(num).then((res) => {
        console.log("main10、12", res);

        if (res.code != 200) {
          this.$massage.error("获取图表十、十二数据失败！");
          return;
        }
        this.main10Data = res.data;

        this.main10Title = title;

        this.getmain10Data();
        this.getmain12Data();
      });
    },
    // 获取市级数据
    getCityData(code) {
      nationalData(code).then((res) => {
        // console.log(res);
        if (res.code != 200) {
          this.$message.error("地图获取市级数据失败！");
          return;
        }

        this.cityData = res.data;

        // this.areaId = this.cityData[0].areaId;
        // this.areaName = this.cityData[0].areaName;

        // this.getmain2Data();
        // this.getmain3Data();
        // this.getmain4Data();
        // this.getmain5Data();
        // this.getmain6Data();
        // this.getmain7Data();
      });
    },
    // 市级点击事件
    cityClick(areaId, areaName) {
      console.log(areaId);
      // this.areaId = areaId;
      // this.areaName = areaName;

      // this.getmain2Data();
      // this.getmain3Data();
      // this.getmain4Data();
      // this.getmain5Data();
      // this.getmain6Data();
      // this.getmain7Data();
    },
  },
  data() {
    return {
      // 两个选择数据
      options: [],
      options1: [],
      optionsSelectData: "",
      optionsSelectData1: "",

      // 每个模块储存数据
      main1Data: [],
      main2Data: [],
      main3Data: [],
      main4Data: [],
      main5Data: [],
      main6Data: [],
      main7Data: [],
      main8Data: [],
      main9Data: [],
      main10Data: [],
      main11Data: [],
      main12Data: [],

      // 用来储存鼠标进入时的省份信息
      chinaEnter: "",

      // 第十模块，标题
      main10Title: "",

      //点击省之后，将该省的市信息保存
      cityData: [],

      // 当前点击市的区划
      provinceName: "广东",
      areaId: "1959",
      areaName: "深圳市",
    };
  },
  watch: {
    selectData(val) {},
    optionsSelectData(val) {
      // console.log(val);
      this.getmain9Data(val);
    },
  },
};
</script>

<style lang="less" scoped>
// @import url("../../../../assets/css/datatlas.css");
.datatlas {
  width: 100%;
  min-height: 1000px;
  background-color: #030409;

  .hang1 {
    width: 100%;
    height: 500px;
    background-color: #041133;
    display: flex;

    .main1 {
      width: 0;
      flex: 6;
    }

    .rightBox {
      width: 0;
      flex: 4;
      height: 100%;

      .title {
        width: 80%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: white;
        background-color: #2d3c80;
        margin: 50px auto 0;
        border-radius: 5px;
      }

      .urban {
        width: 80%;
        height: 350px;
        background-color: #28325e;
        margin: 10px auto 0;
        ul {
          width: 100%;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          li {
            width: 100px;
            height: 50px;
            line-height: 25px;
            color: white;
            text-align: center;
            font-size: 13px;
            cursor: pointer;
          }
          i {
            width: 100px;
          }
        }

        ul li:hover {
          color: rgb(248, 62, 62);
        }
      }
    }
  }

  .hang2 {
    width: 100%;
    // display: flex;
    height: 500px;
    margin-top: 20px;
    .main2 {
      // flex: 6;
      float: left;
      width: 59%;
      height: 100%;
      background-color: #041133;
    }

    .main3 {
      // flex: 4;
      float: left;
      width: 39%;
      height: 100%;
      background-color: #041133;
      margin-left: 2%;
    }
  }

  .hang3 {
    width: 100%;
    display: flex;
    height: 400px;
    margin-top: 20px;
    .main4 {
      // flex: 1;
      width: 49%;
      height: 100%;
      background-color: #041133;
    }

    .main5 {
      // flex: 1;
      width: 49%;
      height: 100%;
      background-color: #041133;
      margin-left: 2%;
    }
  }

  .hang4 {
    width: 100%;
    display: flex;
    height: 400px;
    margin-top: 20px;
    .main6 {
      // flex: 1;
      width: 49%;
      height: 100%;
      background-color: #041133;
    }

    .main9 {
      // flex: 1;
      width: 49%;
      height: 100%;
      background-color: #041133;
      margin-left: 2%;
      position: relative;

      .main9Content {
        width: 100%;
        height: 100%;
      }

      .selectCheck {
        width: 300px;
        height: 40px;
        position: absolute;
        left: 30%;
        top: 3%;
        z-index: 999;
        .title {
          width: 80px;
          height: 40px;
          float: left;
          color: white;
          line-height: 40px;
        }
        .selectBox {
          position: relative;
          float: left;
          // overflow: hidden;
        }
      }
    }
  }

  .hang5 {
    width: 100%;
    display: flex;
    height: 550px;
    margin-top: 20px;

    .main7 {
      width: 100%;
      height: 100%;
      background-color: #041133;
    }
  }

  .hang6 {
    width: 100%;
    display: flex;
    height: 550px;
    margin-top: 20px;
    .main10 {
      // flex: 1;
      width: 33%;
      height: 100%;
      background-color: #041133;
      position: relative;

      .main10Content {
        width: 100%;
        height: 100%;
      }

      .title {
        position: absolute;
        top: 12%;
        left: 30%;
        color: white;
        font-size: 13px;
      }
    }

    .main11 {
      width: 34%;
      height: 100%;
      background-color: #041133;
      position: relative;

      .main11Content {
        width: 100%;
        height: 100%;
      }

      .selectCheck {
        width: 300px;
        height: 40px;
        position: absolute;
        left: 30%;
        top: 3%;
        z-index: 999;
        .title {
          width: 80px;
          height: 40px;
          float: left;
          color: white;
          line-height: 40px;
        }
        .selectBox {
          float: left;
          overflow: hidden;
        }
      }
    }

    .main12 {
      // flex: 1;
      width: 33%;
      height: 100%;
      background-color: #041133;
      position: relative;
      .main12Content {
        width: 100%;
        height: 100%;
      }

      .title {
        position: absolute;
        top: 12%;
        left: 30%;
        color: white;
        font-size: 13px;
      }
    }
  }
}

.item {
  .title {
    font-size: 15px;
  }
}

.el-tooltip__popper {
  font-size: 15px;
  line-height: 20px;
}
</style>