/**
 *  params = {
 * 		appId: '', 必传 目标小程序的appid
 * 		path: '', 必传 目标小程序的路径
 *    showCancel: true, 是否显示取消按钮，如果为false会强制一直弹alert
 *  }
 * **/
export default {
  methods: {
    openMini(params = {}) {
      wx.showModal({
        content: params.title || "即将为您跳转小程序",
        showCancel: params.showCancel || true,
        confirmText: "确定",
        confirmColor: "#000000",
        success: (result) => {
          if (result.confirm) {
            this.beginOpen(params);
          }
        },
      });
    },
    beginOpen(params) {
      params = Object.assign(
        {},
        {
          appId: "", // 目标小程序id
          path: "", // 目标小程序路径
          envVersion: getApp().globalData.config.env || "release", // 目标小程序环境
          showCancel: true, // 是否显示取消
        },
        params
      );
      wx.navigateToMiniProgram({
        ...params,
        success: (res) => {
          // 打开成功
          console.log("open member mini success", res);
        },
        fail: (res) => {
          console.error("open member mini error", res);
          if (!params.showCancel) {
            // 强制打开
            this.openMini(params);
          }
        },
      });
    },
  },
};
