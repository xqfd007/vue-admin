import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";
import router from "./router";
import store from "./store";
import "./icons";
// import httpRequest from "./utils/httpRequest";
// Vue.prototype.$http = httpRequest;
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
  FontAwesomeLayersText,
} from "@fortawesome/vue-fontawesome";

library.add(fas, far, fab);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("font-awesome-layers", FontAwesomeLayers);
Vue.component("font-awesome-layers-text", FontAwesomeLayersText);

// 引入全局样式
import "@/styles/index.scss";
import "./styles/element-variables.scss";
import "normalize.css/normalize.css";
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
