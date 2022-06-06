import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    domain: null, // 接口请求地址
    token: null, // 用户授权票据
    imagePath: null, // 图片地址
    isDebug: false,
    source: null, // 数据来源
    imageInfo: {}, // 本地临时图片的地址
  },
  getters: {
    token: (state) => state.token,
    imagePath: (state) => state.imagePath,
    isDebug: (state) => state.isDebug,
    source: (state) => state.source,
    domain: (state) => state.domain,
    imageInfo: (state) => state.imageInfo,
  },
  actions: {
    resetConfig({ state }, config) {
      state.isDebug = config.isDebug;
      state.domain = config.domain;
      state.imagePath = config.imagePath || config.domain || "";
    },
    setImageInfo({ state }, params = {}) {
      // 设置缓存图片对象
      state.imageInfo = Object.assign(state.imageInfo, params);
    },
    setToken({ state }, params = null) {
      if (!params) return;
      state.token = params;
      getApp().globalData.token = params;
    },
    setSource({ state }, params = "default") {
      state.source = params;
    },
  },
  modules,
});

export default store;
