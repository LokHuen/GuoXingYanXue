<template>
  <view class="music_content" @click="changeMusicStatus" v-if="isLoad">
    <rh-image :src="iconSrc" width="72" />
  </view>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "music",
  methods: {
    ...mapActions("music", ["changeMusicStatus"]),
  },
  computed: {
    ...mapGetters("music", ["isPlay", "isLoad"]),
    iconSrc() {
      return this.isPlay ? "music_open" : "music_close";
    },
  },
};
</script>

<style lang="scss" scoped>
.music_content {
  position: fixed;
  top: 100rpx;
  right: 40rpx;
}
</style>
