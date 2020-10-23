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
    <el-table
      :data="dataList"
      show-summary
      style="width: 800px"
      :fit="true"
      border
      size="medium"
    >
      <el-table-column prop="time" label="日期" align="center">
      </el-table-column>
      <el-table-column prop="income" label="收入" align="center">
      </el-table-column>
      <el-table-column prop="expenditure" label="支出" align="center">
      </el-table-column>
      <el-table-column prop="profit" label="利润" align="center">
        <template slot-scope="scope">
          <span :style="{ color: scope.row.profit > 0 ? 'green' : 'red' }">{{
            scope.row.profit
          }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { formmteDate } from "../utils/index.js";
const AV = require("leancloud-storage");

export default {
  data() {
    return {
      date: [],
      dataList: [],
    };
  },
  mounted() {
    this.initquery();
  },
  methods: {
    submitForm() {
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
      });
    },
    resetForm() {},
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
          item.profit = (item.income - item.expenditure).toFixed(2);
          item.time = formmteDate(item.date);
        });
        this.dataList = arrdate;
      });
    },
  },
};
</script>

<style>
</style>