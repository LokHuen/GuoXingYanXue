<template>
  <view class="image_content" :style="imageStyle">
    <image
      class="image_content_image"
      :style="imageStyle"
      :mode="mode"
      :show-menu-by-longpress="showMenuByLongpress"
      :lazy-load="lazyLoad"
      @error="handleError"
      @load="handleLoad"
      :src="imagePath"
    />
  </view>
</template>
<script src="./index.js"></script>
<style scoped lang="scss" src="./index.scss"></style>
