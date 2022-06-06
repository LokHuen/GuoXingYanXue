<template>
  <view class="container">
    <view class="landing_content">
      <view class="progress">
        <span class="progress_text">{{ progress }}</span
        ><span class="progress_rate">%</span>
      </view>
    </view>

    <rh-oauth ref="oauth" />
  </view>
</template>
<script src="./index.js"></script>
<style scoped lang="scss" src="./index.scss"></style>
