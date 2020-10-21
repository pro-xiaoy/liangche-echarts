<template>
  <div>
    <el-table :data="dataList" style="width: 800px" :fit="true" border size="medium"> 
      <el-table-column prop="time" label="日期" align="center"> </el-table-column>
      <el-table-column prop="income" label="收入" align="center"> </el-table-column>
      <el-table-column prop="expenditure" label="支出" align="center"> </el-table-column>
      <el-table-column prop="total" label="合计" align="center">
        <template slot-scope="scope">
          <span :style="{'color':scope.row.total>0 ? 'green':'red'}">{{scope.row.total}}</span>
        </template>
      </el-table-column>
    </el-table>
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
        this.dataList = arrdate;
      });
    },
  },
};
</script>

<style>
</style>