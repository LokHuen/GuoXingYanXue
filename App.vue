<script>
import { mapActions } from "vuex";
import mixin from "@/mixins/index.js";
import { assignConfig, updateMini } from "./utils/common";

// 统计
require("@/utils/baidu/mtj-wx-sdk.js"); // 百度统计

export default {
  mixins: [mixin],
  globalData: {
    config: {}, // 配置数据
    token: null, // 和服务器交互token
	url:"",
	videoList:""
  },
  onLaunch(options) {
	  wx.setKeepScreenOn({
	  　　keepScreenOn: true,
	  })
    console.log(" app onlaunch ", options);
    // 检查小程序是否有更新
    updateMini();
    // 合并config数据
    const config = assignConfig();
    this.resetConfig(config || null);

    this.globalData.config = config;

    // 创建音乐播放
    this.createMusic();
  },
  methods: {
    ...mapActions(["resetConfig"]),
    ...mapActions("music", ["createMusic"]),
  },
};
</script>

<style lang="scss">
@import "./utils/animate.css";

// 修改page的默认颜色
page {
	width: 100%;
	height: 100%;
  background-color: #fff;
  background: #fff;overflow-y: auto;
}
.center{
	 display: flex; 
	  justify-content: center; 
	  align-items: center; 
}
.centerLeft{
	display: flex;
	 justify-content: end; 
	 align-items: center; 
}
.centerEnd{
	display: flex;
	 justify-content: center; 
	 align-items: flex-end;; 
}
.container{overflow-y: auto;overflow: inherit !important;height: auto !important; min-height: 100%;}
</style>
