import Vue from "vue";
import Router from "vue-router";
import helloWorld from "@/components/helloWorld";
import richEditor from "@/components/richEditor";
import bulletScreen from "@/components/bulletScreen";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/richEditor",
      name: "richEditor",
      component: richEditor
    },
    {
      path: "/helloWorld",
      name: "helloWorld",
      component: helloWorld
    },
    {
      path: "/bulletScreen",
      name: "bulletScreen",
      component: bulletScreen
    }
  ]
});
