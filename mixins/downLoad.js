/**
 * 单张图片存储下来的结构体
 * errMsg: "getImageInfo:ok"
 * height: 1700
 * id: "bg_animate_1"
 * orientation: "up"
 * originPath: "https://wx.sephora.cn/h5/ingredients/image/bg_animate/1.jpg"
 * path: "http://tmp/mkSF0ZLKo0Gk4b98c3f7bc306393404b868954c4af7e.jpg"
 * src: "bg_animate/1.jpg"
 * type: "jpeg"
 * width: 750
 *
 * 预加载方法，通过IDE的网络请求，如果版本一致，缓存成功，第二次是不会进行下载的请求
 * 1、获取本地storage对象
 * 2、如果storage有存储这个src的图片，并且存在临时图片地址，并且版本号是一样的，则尝试去拿缓存图片
 * 3、如果没有，从原始的URL地址，通过下载图片的方式，把网络请求地址转为临时图片地址
 * 4、更新本地storage信息
 *
 * */
import { mapActions, mapGetters } from "vuex";
import { CONSTKEY } from "@/utils/common";

export default {
  data() {
    return {
      totalCount: 0, // 总计图片个数
      orginImageInfo: [], // 图片的信息
      downImageInfo: [], // 下载下来的临时图片地址
      storageImageInfo: {}, // 保存在本地的数据
      version: 0,
    };
  },
  methods: {
    ...mapActions(["setImageInfo"]),
    // 下载图片的方法
    initImage(params) {
      this.storageImageInfo = uni.getStorageSync(CONSTKEY.LOCALIMAGEKEY) || {};
      const config = JSON.parse(JSON.stringify(params));
      this.orginImageInfo = config.image;
      this.version = config.version;
      if (!this.orginImageInfo?.length) return;
      this.totalCount = this.orginImageInfo.length;
      const maxCount = 10; // 微信只支持十个图片下载,IDE上会出现下载超出10个线程，在真机上不会出现
      new Array(maxCount).fill(0).map(() => this.beginDownLoad());
    },
    async beginDownLoad() {
      const obj = this.orginImageInfo.splice(0, 1);
      if (obj?.length) {
        const res = await this.getDownLoadInfo(obj[0]);
        if (res?.id) {
          this.downImageInfo.push(res);
        }
        this.beginDownLoad();
      } else {
        if (this.downImageInfo.length >= this.totalCount) {
          const res = this.downImageInfo.reduce(
            (pre, next) => {
              pre[next.id] = next; // 整合数据，预加载的统一用id来拿
              return pre;
            },
            { version: this.version }
          );
          // 存储预加载图片到store中
          await this.setImageInfo(res);
          uni.setStorageSync(CONSTKEY.LOCALIMAGEKEY, res);
          uni.$emit(CONSTKEY.DOWNFINISH, res);
        }
      }
    },
    async getDownLoadInfo(params = null) {
      if (!params || !params.src || !params.id) {
        console.error(" == 预加载必须配置 id 和 src ===");
        return;
      }
      const src =
        params.src.indexOf("http") > -1
          ? params.src
          : `${this.imagePath}${params.src}`;
      const defaultObj = { ...params, originPath: src };

      const localFile = this.storageImageInfo[params.id];
      if (
        localFile?.src === params.src &&
        localFile?.path &&
        this.version === this.storageImageInfo.version
      ) {
        // 如果storage有存储这个src的图片，并且存在临时图片地址，并且版本号是一样的，则尝试去拿缓存图片
        const res = await this.getSingleFile(localFile.path);
        if (res?.path) {
          console.log("拿到缓存的图片");
          return Object.assign({}, defaultObj, res);
        } else {
          console.log("缓存图片不可用");
        }
      }
      const res = await this.getSingleFile(src);
      if (res?.path) {
        return Object.assign({}, defaultObj, res);
      } else {
        console.log("文件下载失败", params.src);
      }
      return defaultObj;
    },
    getSingleFile(src) {
      if (/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(src)) {
        return this.getImageInfo(src);
      }
      return this.getDownLoadFile(src);
    },
    getImageInfo(src) {
      return new Promise((resolve) => {
        uni.getImageInfo({
          src,
          success: (res) => {
            resolve(res);
          },
          fail: (res) => {
            console.log(" == 下载图片失败 ==", res, src);
            resolve();
          },
        });
      });
    },
    getDownLoadFile(url) {
      return new Promise((resolve) => {
        uni.downloadFile({
          url,
          success: (res) => {
            resolve({ path: res.tempFilePath });
          },
          fail: () => {
            resolve();
          },
        });
      });
    },
    async downSingleImage(params = null) {
      if (!params?.id || !params?.src) return;
      const temp = this.imageInfo[params.id];
      if (temp?.path) return temp;
      const res = await this.getDownLoadInfo(params);
      // 更新单张图片
      this.setImageInfo({
        [res.id]: res,
      });
      return res;
    },
  },
  computed: {
    ...mapGetters(["imagePath", "imageInfo"]),
    progress() {
      // 当前加载进度 0-1
      return parseInt((this.downImageInfo.length / this.totalCount) * 100) || 0;
    },
  },
};
