import { mapGetters } from "vuex";

export default {
  name: "image",
  props: {
    src: {
      // 路径地址
      type: String,
      default: null,
      required: true,
    },
    width: {
      // 外部传入的宽度
      type: String,
      default: null,
    },
    height: {
      // 外面传入的高度
      type: String,
      default: null,
    },
    mode: {
      type: String,
      default: "scaleToFil",
    },
    lazyLoad: {
      type: Boolean,
      default: false,
    },
    showMenuByLongpress: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      imageStyle: null, // 合并起来的合并样式
      imagePath: null, //
    };
  },
  methods: {
    resetImage() {
      this.imagePath = null;
      this.imageStyle = "";
    },
    setStyle(info = { width: 0, height: 0 }) {
      let style = "";
      try {
        // 宽高都有的情况
        if (this.width?.length && this.height?.length) {
          style += `width: ${this.calculateNum(
            this.width
          )};height: ${this.calculateNum(this.height)};`;
        } else if (this.width?.length || this.height?.length) {
          // 宽或者高只传了一个，按照宽高的比例来算
          const rate = info.width / (info.height * 1.0);
          if (this.width?.length) {
            style += `width: ${this.calculateNum(
              this.width
            )};height: ${this.calculateNum(parseFloat(this.width) / rate)};`;
          } else if (this.height) {
            style += `width: ${this.calculateNum(
              parseFloat(this.height) * rate
            )};height: ${this.calculateNum(this.height)};`;
          }
        } else {
          // 啥都没传
          style += `width: ${this.calculateNum(
            info.width || "auto"
          )};height: ${this.calculateNum(info.height || "auto")};`;
        }
      } catch (error) {
        style += `width:100%;height:100%;`;
      }
      this.imageStyle = style;
    },
    handleError() {
      console.log(" 图片加载失败 ==", this.src);
    },
    handleLoad(e) {
      // 通过image标签自己的load完成
      console.log(" === e ==", e);
      if (!e?.detail) return;
      this.setStyle({ width: e.detail.width, height: e.detail.height });
    },
    // 尝试获取本地的图片，如果不存在，直接拿src地址
    fetchLocalImage() {
      if (!this.src) return;
      try {
        return this.imageInfo[this.src] || null;
      } catch (e) {
        return;
      }
    },
    calculateNum(params) {
      if (!params) return "100%";
      if (typeof params === "number" || /^\d+$/g.test(params)) {
        return params + "rpx";
      } else if (params.indexOf("px")) {
        // px和rpx不做处理
        return params;
      } else {
        return "100%";
      }
    },
  },
  watch: {
    src: {
      immediate: true,
      handler: function (newVal) {
        if (newVal?.length) {
          // this.resetImage();
          const info = this.fetchLocalImage();
          if (info && info.path) {
            this.imagePath = info.path;
            // 预加载成功了
            this.setStyle(info);
          } else {
            // 预加载失败，直接赋完全的url地址
            this.imagePath = info?.originPath || newVal || "";
            console.log(" === this.imagePath ==", this.imagePath);
          }
        }
      },
    },
  },
  computed: {
    ...mapGetters(["imageInfo"]),
  },
};
