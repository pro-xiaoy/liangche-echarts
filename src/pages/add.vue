<template>
  <div class="echats_content">
    <el-form
      :model="ruleForm"
      :label-position="labelPosition"
      ref="ruleForm"
      label-width="80px"
      :rules="rules"
    >
      <el-form-item label="日期" prop="date" required>
        <el-date-picker
          v-model="ruleForm.date"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="收入" prop="income">
        <el-input v-model="ruleForm.income" @focus="true" ref="income"></el-input>
      </el-form-item>
      <el-form-item label="支出" prop="expenditure">
        <el-input v-model="ruleForm.expenditure"></el-input>
      </el-form-item>

      <el-button type="primary" @click="onSubmit">创建今日</el-button>
    </el-form>
  </div>
</template>

<script>
import { formmteDate } from "../utils/index.js";

export default {
  data() {
    return {
      ruleForm: {
        date: '',
        expenditure: "",
        income: "",
      },
      labelPosition: "right",
      date: "",
      expenditure: "",
      income: "",
      rules: {
        date: [{ required: true, message: "请输入日期", trigger: "blur" }],
        income: [{ required: true, message: "请输入收入", trigger: "blur" }],
        expenditure: [
          { required: true, message: "请输入支出", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    let _this = this;
    document.onkeydown = function () {
      var key = window.event.keyCode;
      if (key == 13) {
        _this.onSubmit();
      }
    };
  },

  methods: {
    onSubmit() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          const { date, income, expenditure } = this.ruleForm;
          const TestObject = this.AV.Object.extend("capital");
          const testObject = new TestObject();
          testObject.set("date", +new Date(date));
          testObject.set("expenditure", expenditure);
          testObject.set("income", income);
          testObject.set("timer", formmteDate(+new Date(date)));
          testObject
            .save()
            .then(() => {
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
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    reset() {
      const { date } = this.ruleForm
      this.ruleForm.date = new Date( +new Date(date) + (1000*60*60*24) );
      this.ruleForm.expenditure = "";
      this.ruleForm.income = "";
      this.$refs['income'].focus()
    },
  },
};
</script>

<style>
</style>