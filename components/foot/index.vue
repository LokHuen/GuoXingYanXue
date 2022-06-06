<template>
  <view class="policy safe-padding-bottom" :style="{ color: color || '#fff' }">
    <view class="policy_left">
      <image class="policy_left_image" :src="leftImg" />
      <view
        ><text class="text_color" @click="onPolciyTap(3)">中国工商</text>
        <text class="text_color text_left" @click="onPolciyTap(1)"
          >沪ICP备08100043-7号</text
        ></view
      >
    </view>
    <view class="policy_left" @click="onPolciyTap(2)">
      <image class="policy_right_image" :src="rightImg" />
      <view class="text_color">沪公网安备 31010602001532号</view>
      <view class="text_color text_left"
        >©L'Oreal China 欧莱雅（中国）有限公司版权所有</view
      >
    </view>
    <cover-view class="contain_box" v-if="isShow" @click="onHiddenPage">
      <cover-image class="contain_img" :src="showImg" />
    </cover-view>
  </view>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "foot",
  props: {
    color: String,
  },
  data() {
    return {
      isShow: false,
      type: 1,
    };
  },
  methods: {
    onPolciyTap(type) {
      this.type = type;
      this.isShow = true;
    },
    onHiddenPage() {
      this.isShow = false;
    },
  },
  computed: {
    ...mapGetters(["imagePath"]),
    showImg() {
      if (this.type === 1) {
        return require("./1.png");
      } else if (this.type === 2) {
        return require("./2.png");
      } else if (this.type === 3) {
        return require("./3.png");
      }
      // return `${this.imagePath}foot_policy_${this.type}.jpg`;
    },
    leftImg() {
      return require("./policy_left.png");
    },
    rightImg() {
      return require("./policy_right.png");
    },
  },
};
</script>
<style lang="scss" scoped>
.policy {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 40rpx;
  margin: 0rpx auto;
  display: flex;
  align-items: center;
  font-size: 10rpx;
  justify-content: center;
  z-index: 2;
}

.text_left {
  margin-left: 10rpx;
}
.text_color {
  color: white;
}

.policy_left {
  display: flex;
  align-items: center;
  margin: 0rpx 7rpx;
}

.policy_left_image {
  width: 24rpx;
  height: 26rpx;
  margin-right: 10rpx;
}

.policy_right_image {
  width: 22rpx;
  height: 24rpx;
  margin-right: 7rpx;
}

.contain_box {
  @include pt();
  @include fc();
  background: rgba(0, 0, 0, 0.7);
  z-index: 20;
  .contain_img {
    width: 700rpx;
    height: auto;
  }
}
</style>
