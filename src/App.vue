<template>
  <div id="app">
    <div  class="header">
      <h3 class="header_title">靓车饰界</h3>
    </div>
    <div class="container">
      <div class="aside">
        <div v-for='(item, index) in menulist' :key="index" @click="routerPath(item)">
          {{item.name}}
        </div>
      </div>
      <div class="main">
        <router-view/>
      </div>
    </div>
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
  color: #2c3e50;
}
.buttons {
  width: 345px;
  background: red;
}
.header {
  height: 50px; 
  width: 100%;
  padding-left: 40px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
.header_title {
  font-size: 25px;
}
.container {
  height: calc(100vh - 50px);
  border: 1px solid #eee;
  box-sizing: border-box;
  display: flex;
}
.aside {
  width: 200px;
  height: 100%;
}
.main {
  flex: 1;
  height: 100%;
}
@media screen and  (max-width: 750px) {
  .aside {
    width: 0;
  }
}

</style>
