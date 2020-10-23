<template>
  <div class="echats_content">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="查询日期" required>
        <el-col :span="11">
          <el-date-picker
            v-model="date"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >搜索</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <div id="myChart" style="width: 1000px; height: 700px"></div>
  </div>
</template>

<script>
import { formmteDate } from "../utils/index.js";
const AV = require("leancloud-storage");
export default {
  data() {
    return {
      dataList: [],
      date: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.initquery();
  },
  methods: {
    submitForm() {
      console.log("submit++++", this.date);
      const query = new AV.Query("capital");
      query.greaterThanOrEqualTo("date", +new Date(this.date[0]));
      query.lessThanOrEqualTo("date", +new Date(this.date[1]));
      query.find().then((resdata) => {
        let arrdate = [];
        resdata.forEach((item) => {
          arrdate.push(item.attributes);
        });

        arrdate.forEach((item) => {
          item.profit = (item.income - item.expenditure).toFixed(2);
          item.time = formmteDate(item.date);
        });
        this.dataList = arrdate;
        this.drawLine();
      });
    },
    resetForm() {},
    initquery() {
      const query = new AV.Query("capital");
      let newDate = +new Date();
      let oldDate = newDate - 20 * 24 * 60 * 60 * 1000;
      query.greaterThan("date", oldDate);
      query.find().then((resdata) => {
        let arrdate = [];
        resdata.forEach((item) => {
          arrdate.push(item.attributes);
        });

        arrdate.forEach((item) => {
          item.profit = (item.income - item.expenditure).toFixed(2);
          item.time = formmteDate(item.date);
        });
        this.dataList = arrdate;
        this.drawLine();
      });
    },
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["收入", "支出", "利润"],
        },
        grid: {
          left: "3%",
          right: "4%",
          top: "5%",
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
          data: (this.dataList || []).map((item) => item.time),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "收入",
            type: "line",
            data: (this.dataList || []).map((item) => item.income),
            itemStyle: {
              normal: {
                color: "#3de03d", //改变折线点的颜色
                lineStyle: {
                  color: "#3de03d", //改变折线颜色
                },
              },
            },
          },
          {
            name: "支出",
            type: "line",
            data: this.dataList.map((item) => parseInt(item.expenditure)),
            itemStyle: {
              normal: {
                color: "#dc2424", //改变折线点的颜色
                lineStyle: {
                  color: "#dc2424", //改变折线颜色
                },
              },
            },
          },
          {
            // 080808
            name: "利润",
            type: "line",
            data: (this.dataList || []).map((item) => item.profit),
            itemStyle: {
              normal: {
                color: "#080808", //改变折线点的颜色
                lineStyle: {
                  color: "#080808", //改变折线颜色
                },
              },
            },
          },
        ],
      });
    },
  },
};
</script>

<style>
.echats_content {
  padding-top: 40px;
  padding-left: 40px;
}
</style>