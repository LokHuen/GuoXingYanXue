import { mapActions } from "vuex";
import { getLoginInfo } from "@/api";
import { CONSTKEY } from "@/utils/common";
import mixin from "@/mixins/index";
import downLoad from "@/mixins/downLoad";
import qs from "qs";

export default {
  mixins: [mixin, downLoad],
  data() {
    return {};
  },
  async onLoad(options) {
    // await this.login(options);
    const images = require("./image.js").default;
    this.initImage(images);
    uni.$once(CONSTKEY.DOWNFINISH, () => {
      this.handlePage(options);
    });
  },
  methods: {
    ...mapActions(["setToken", "setSource"]),
    async login(params) {
      const utm_medium = params.utm_medium || null;
      const utm_source = params.utm_source || null;
      this.setSource(utm_source);

      // 获取jscode
      const getCode = () => {
        return new Promise((resolve) => {
          wx.login({
            timeout: 10000,
            success: (res) => {
              resolve(res?.code || null);
            },
            fail: () => {
              resolve();
            },
          });
        });
      };
      const code = await getCode();
      if (code) {
        const res = await getLoginInfo({
          // 请求登陆接口
          code,
          options: wx.getLaunchOptionsSync(),
          utm_medium,
          utm_source,
        }).catch((res) => res);
        if (res?.isSuccess && res?.data?.token) {
          this.setToken(res.data.token);
        }
      }

      // 是否需要获取用的头像和昵称
      const info = await this.showOauth();
      console.log(" == showOauth info ==", info);
    },
    handlePage(params) {
      console.log(" === landing onLoad ===", params);

      // 监听下载完成，处理页面
      if (params.type === "share") {
        // 通过默认分享出去  /pages/landing/index?type=share&wid=xx
        const share = params;
      } else if (params.scene) {
        // 通过接口生成的二维码，参数会拼接在scene
        const share = qs.parse(decodeURIComponent(params.scene));
      }
      wx.reLaunch({
        url: "/pages/home/index",
      });
    },

    showOauth() {
      return new Promise((resolve) => {
        this.$refs.oauth.showOauth((res) => {
          resolve(res || null);
        });
      });
    },
  },
};
