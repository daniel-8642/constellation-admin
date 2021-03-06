import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Authorized from "@/components/Authorized";
import Auth from "@/directives/auth";
import {
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Form,
  Input,
  Checkbox,
} from "ant-design-vue";

Vue.config.productionTip = false;
Vue.component("Authorized", Authorized);
Vue.use(Auth);
Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Form);
Vue.use(Input);
Vue.use(Checkbox);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
