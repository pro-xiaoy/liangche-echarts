<template>
  <div id="app">
    <div style="height: 50px; width: 100%"></div>
    <el-container style="height: calc(100vh - 50px); border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message"></i>工作</template
            >
            <el-menu-item-group>
              <el-menu-item index="1-1" v-for='(item, index) in menulist' :key="index" @click="routerPath(item)">{{item.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
          <router-view/>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      menulist: [
        {name: '日填报', path: '/add', key: 1},
        {name: '表格', path: '/table', key: 2},
        {name: '图表', path: '/charts', key: 2},
      ],
      labelPosition: "right",
      date: "",
      expenditure: "",
      income: "",
    };
  },
  methods: {
    routerPath(item) {
        this.$router.push({path: item.path})
    }
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
