import Vue from "vue";
import VueRouter from "vue-router";

import Add from "../pages/add.vue";
import Table from "../pages/table";
import Charts from "../pages/charts.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    // component: Add
  },
  {
    path: "/add",
    name: "add",
    component: Add,
  },
  {
    path: "/table",
    name: "table",
    component: Table,
  },
  {
    path: "/charts",
    name: "charts",
    component: Charts,
  },
];

// eslint-disable-next-line no-new
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
