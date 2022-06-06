// import { mapGetters } from "vuex";
// import { getUpLoadToken } from "@/api";
// // const VODUpload = require('@/utils/ali/aliyun-upload-sdk-1.0.1.min.js').default;
// import VODUpload from "../utils/ali/aliyun-upload-sdk-1.0.1.min.js";

// export default {
//   data() {
//     return {
//       upLoader: null,
//     };
//   },
//   onLoad() {
//     this.initOSSUpLoader();
//   },
//   methods: {
//     initOSSUpLoader() {
//       if (this.upLoader) return;
//       const upLoader = new VODUpload({
//         timeout: 60000,
//         region: "cn-shanghai",
//         // 开始上传
//         onUploadstarted: async (uploadInfo) => {
//           const result = await getUpLoadToken();
//           // 视频ID
//           if (result.isSuccess && result.data) {
//             const { uploadAuth, uploadAddress, videoId } = result.data;
//             upLoader.setUploadAuthAndAddress(
//               uploadInfo,
//               uploadAuth,
//               uploadAddress,
//               videoId
//             );
//           } else {
//             upLoader.stopUpload();
//           }
//         },
//         // 文件上传成功
//         onUploadSucceed: (uploadInfo) => {
//           console.log("文件上传成功!", uploadInfo);
//           try {
//             this.finishUpLoader(uploadInfo?.videoId);
//           } catch (error) {}
//         },
//         // 文件上传失败
//         onUploadFailed: () => {
//           upLoader.stopUpload();
//           this.finishUpLoader();
//         },
//         // 取消文件上传
//         onUploadCanceled: () => {
//           upLoader.stopUpload();
//           this.finishUpLoader();
//         },
//       });
//       this.upLoader = upLoader;
//     },
//     beginUpLoader(file = null) {
//       if (!file) return;
//       const userData = JSON.stringify({ userId: this.userId || "tourist" });
//       this.upLoader.addFile(
//         {
//           url: file,
//         },
//         null,
//         null,
//         null,
//         userData
//       );
//       this.upLoader.startUpload();
//     },
//     upLoadNormalFile(filePath = null, name) {
//       if (!filePath) return;
//       return new Promise((resolve, reject) => {
//         wx.uploadFile({
//           url: this.domain + "api/works/upload",
//           filePath,
//           header: { Authorization: `Bearer ${this.token}` },
//           name,
//           formData: {
//             userId: this.userId || null,
//             id: this.productId || null,
//             channel: this.miniType,
//           },
//           success: (res) => {
//             console.log(" === upLoadfile ==", res);
//             if (typeof res.data === "string") {
//               res = JSON.parse(res.data);
//             }
//             resolve(res || null);
//           },
//           fail: () => {
//             reject();
//           },
//         });
//       });
//     },
//   },
//   computed: {
//     ...mapGetters(["domain", "token", "userId", "miniType"]),
//     ...mapGetters("product", ["productId"]),
//   },
// };
