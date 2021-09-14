import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import app from "./modules/app";
import settings from "./modules/settings";
import tagsView from "./modules/tagsView";
Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    tagsView,
    settings,
    app,
  },
  getters,
});

export default store;
