<template>
  <div class="fade_content" :animation="pageAnimate">
    <slot></slot>
  </div>
</template>

<script>

import mixin from "@/mixins/index.js";

export default { // 页面加载的淡入淡出效果
  name: 'fade',
  mixins: [mixin],
  data() {
    return {
			pageAnimate: null,
    }
  },
  mounted() {
    setTimeout(() => {
      this.$nextTick(() => {
        const animation = wx.createAnimation({
          duration: 200,
          timingFunction: 'ease',
        });
        animation.opacity(1).step();
        this.pageAnimate = animation.export()
      })
		}, 200);
  }
}
</script>

<style lang="scss" scoped>
.fade_content {
  opacity: 0;
}
</style>