export default {
  namespaced: true,
  state: {
    player: null, // 播放器
    isPlay: false, // 播放状态
    isLoad: false, // 播放器是否加载完毕
  },
  getters: {
    player: (state) => state.player,
    isPlay: (state) => state.isPlay,
    isLoad: (state) => state.isLoad,
  },
  actions: {
    createMusic({ state }, params) {
      // 创建背景音乐播放器
      const innerAudioContext = wx.createInnerAudioContext();
      state.player = innerAudioContext;
      innerAudioContext.autoplay = true;
      innerAudioContext.loop = true;
      if (params) {
        innerAudioContext.src = params;
      }
      state.isPlay = state.isLoad = false;
      innerAudioContext.onPlay(() => {
        console.log(" music begin play ");
        state.isPlay = true;
      });
      innerAudioContext.onPause(() => {
        console.log(" music begin pause ");
        state.isPlay = false;
      });
      innerAudioContext.onCanplay(() => {
        console.log(" music can play ");
        state.isLoad = true;
      });
    },
    changeMusicStatus({ state }) {
      // 切换播放状态
      state.isPlay ? state.player.pause() : state.player.play();
    },
    resetSrc({ state, rootState }, params = null) {
      // 重置地址并且播放
      if (!params) return;
      const info = rootState.imageInfo[params];
      if (!info) return;
      state.player.src = info.path || info.originPath;
      state.player.play();
    },
    stopMusic({ state }) {
      state.player.stop();
    },
  },
};
