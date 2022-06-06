import { mapGetters } from "vuex";

export default {
  data() {
    return {
      shareConfig: {},
      isShareCompelete: false,
    };
  },
  onLoad() {
    uni.hideHomeButton();
    this.resetShareInfo();
  },
  onShow() {
    this.pageTrack("onShow");

    if (this.isShareCompelete) {
      this.isShareCompelete = false;
      try {
        // 小程序分享回调是拿不到的，在onshow的时候，可以去做一个伪判断
        this.onShareCompelete();
      } catch (error) {}
    }
  },
  onHide() {
    this.pageTrack("onHide");
  },
  methods: {
    pageTrack(type) {
      try {
        if (type === "onShow") {
          getApp().mtj.pageEvent.onShow();
        } else if (type === "onHide") {
          getApp().mtj.pageEvent.onHide();
        } else if (type === "onShareAppMessage") {
          getApp().mtj.pageEvent.onShareAppMessage(this.shareConfig || {});
        }
      } catch (error) {
        console.log(" 统计还没准备好");
      }
    },
    baiduTrack(key, value) {
      const params = {
        // 上报当前用户的基础信息
      };
      getApp().mtj.trackEvent(key, Object.assign(params, value));
    },

    resetShareInfo(params = {}) {
      // 设置分享的类型，
      // 小程序分享图支持PNG及JPG。显示图片长宽比是 5:4。标题文字最多28个字，超出显示省略号。
      this.shareConfig = Object.assign(
        {},
        {
          //imageUrl: this.imagePath + "/share.png", // 助力的图片
		  imageUrl:'https://kaizhao-weike-oss.comeyes.com/asset/images/11.jpg',
          title: "果行研学小程序",
          path: "/pages/home/index?type=share", // 卡片分享参数需要带在后面
          query: {
            // 朋友圈分享
            type: "share",
          },
        },
        params
      );
    },
  },
  // 默认普通的分享
  onShareAppMessage(options) {
    if (options && options.from == "button") {
      // 来自页面内的转发按钮
      // 页面内的触发分享需要在 wxml文件里面加入 <button open-type="share"></button>
    } else {
      // 点击微信右上角的分享按钮
    }
    if (!this.shareConfig?.path) {
      this.resetShareInfo();
    }
    this.pageTrack("onShareAppMessage");
    // this.isShareCompelete();
    return this.shareConfig;
  },
  onShareTimeline() {
    // 分享到朋友圈
    return {
      title: this.shareConfig.title,
      query: this.shareConfig.query,
      imageUrl: this.shareConfig.image,
    };
  },
  computed: {
    ...mapGetters(["imagePath"]),
  },
};
