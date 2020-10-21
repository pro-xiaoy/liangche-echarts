<template>
  <div>
    <el-form :label-position="labelPosition" label-width="80px">
      <el-form-item label="日期">
        <el-date-picker v-model="date" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="收入">
        <el-input v-model="income"></el-input>
      </el-form-item>
      <el-form-item label="支出">
        <el-input v-model="expenditure"></el-input>
      </el-form-item>

      <el-button type="primary" @click="onSubmit">创建今日</el-button>
    </el-form>
  </div>
</template>

<script>
import {formmteDate} from '../utils/index.js'

export default {
  data() {
    return {
      labelPosition: "right",
      date: "",
      expenditure: "",
      income: "",
    };
  },
  methods: {
    onSubmit() {
      const TestObject = this.AV.Object.extend("capital");
      const testObject = new TestObject();
      testObject.set("date", +new Date(this.date));
      testObject.set("expenditure", this.expenditure);
      testObject.set("income", this.income);
      testObject.set("timer", formmteDate(+new Date(this.date)));
      testObject
        .save()
        .then((testObject) => {
          console.log("保存成功++++", testObject);
          this.$message({
            message: "保存成功",
            type: "success",
          });
          this.reset();
        })
        .catch((err) => {
          this.$message({
            message: err,
            type: "error",
          });
          console.log("err++++", err);
        });
    },
    reset() {
      this.date = "";
      this.expenditure = "";
      this.income = "";
    },
  },
};
</script>

<style>
</style>