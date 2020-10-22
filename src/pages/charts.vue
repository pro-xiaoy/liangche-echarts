<template>
  <div>
    <div id="myChart" style="width: 1000px; height: 600px"></div>
  </div>
</template>

<script>
import {formmteDate} from '../utils/index.js'
const AV = require("leancloud-storage");
export default {
  data() {
    return {
      dataList: [],
    };
  },
  mounted() {
    this.initquery();

  },
  methods: {
    initquery() {
      const query = new AV.Query("capital");
      // 得到最近10天的所有数据
      let newDate = +new Date();
      let oldDate = newDate - 20 * 24 * 60 * 60 * 1000;
      query.greaterThan("date", oldDate);
      query.find().then((resdata) => {
        let arrdate = [];
        resdata.forEach((item) => {
          arrdate.push(item.attributes);
        });

        arrdate.forEach((item) => {
          item.total = (item.income - item.expenditure).toFixed(2);
          item.time = formmteDate(item.date)
        });
        console.log('arrdate++', arrdate)
        this.dataList = arrdate;
        this.drawLine();
      });
    },
    drawLine() {
      console.log('this.dataList +++++++++', this.dataList )
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "gogogoogogog!!!!!" },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["收入", "支出", "合计"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: (this.dataList || []).map((item) => item.time)
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "收入",
            type: "line",
            stack: "总量",
            data: (this.dataList || []).map((item) => item.income),
            itemStyle : {
                normal : {
                  color:'#3de03d', //改变折线点的颜色
                  lineStyle:{
                      color:'#3de03d' //改变折线颜色
                  }
                }
            },
          },
          {
            name: "支出",
            type: "line",
            stack: "总量",
            data: (this.dataList || []).map((item) => item.expenditure),
            itemStyle : {
                normal : {
                  color:'#dc2424', //改变折线点的颜色
                  lineStyle:{
                      color:'#dc2424' //改变折线颜色
                  }
                }
            },
         },
          {
            // 080808
            name: "合计",
            type: "line",
            stack: "总量",
            data: (this.dataList || []).map((item) => item.total),
            itemStyle : {
                normal : {
                  color:'#080808', //改变折线点的颜色
                  lineStyle:{
                      color:'#080808' //改变折线颜色
                  }
                }
            },
          },
        ],
      });
    },
  },
};
</script>

<style>
</style>