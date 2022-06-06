import { throttle } from "@/utils/common";
import { CONSTKEY } from "@/utils/common";

/**
 * 授权后的用户信息结构
 * 如果用户是新注册的账号，有可能avatarUrl不存在
 * avatarUrl: ""
 * city: ""
 * country: ""
 * gender: 0
 * language: ""
 * nickName: ""
 * province: ""
 * */
export default {
  name: "oauth",
  data() {
    return {
      isShow: false,
      callBack: null,
    };
  },
  methods: {
    showOauth(callBack) {
      const temp = wx.getStorageSync(CONSTKEY.USERINFO);
      if (temp && Object.keys(temp).length) {
        // 已经获取到用户的信息
        try {
          callBack(temp);
        } catch (error) {}
        return;
      }

      // 没有用户信息，显示弹窗
      this.callBack = callBack;
      this.isShow = true;
    },
    onGetUserInfo: throttle(function () {
      wx.getUserProfile({
        desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          this.showCallBack(res);
        },
        fail: (res) => {
          console.log("授权失败", res);
          this.showCallBack();
        },
      });
    }, 2000),
    async onRefuseTap() {
      this.showCallBack();
    },
    showCallBack(params = null) {
      try {
        if (params) {
          wx.setStorageSync(CONSTKEY.USERINFO, params.userInfo);
          this.callBack(params.userInfo);
        }
      } catch (error) {}

      this.isShow = false;
    },
    handleError(e) {
      console.error("唤起弹窗出错", e);
    },
  },
};
