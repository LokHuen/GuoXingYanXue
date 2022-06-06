<template>
  <view class="oauth_bg" v-if="isShow">
    <view class="oauth_content">
      <view class="oauth_head">该小程序请求获取</view>
      <view>获取您的公开信息（头像，昵称）</view>
      <view class="btn_content">
        <view class="single_btn refuse" @click="onRefuseTap">拒绝</view>
        <view class="single_btn">
          <button
            class="custom_btn"
            open-type="getUserInfo"
            @error="handleError"
            lang="zh_CN"
            @click="onGetUserInfo"
          >
            <view class="single_btn">允许</view>
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script src="./index.js"></script>

<style scoped lang="scss" src="./index.scss"></style>
