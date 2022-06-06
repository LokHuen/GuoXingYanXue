<template>
	<view class="container" :style="{paddingTop:systemHeight+'px'}">
		<image src="https://kaizhao-weike-oss.comeyes.com/asset/images/wt.png" class="bg" mode=""></image>
		<view class="indexView">
			<swiper :imgList="indexInfo.imgList">

			</swiper>

		</view>
		<view class="indexView">
			<sound-swiper v-if="flag" :soundList="res.data" @linkId="linkId">

			</sound-swiper>
		</view>
		<view v-if="open">
			<over :text="text" @close="close">
				
			</over>
		</view>
	</view>
</template>
<script src="./index.js"></script>
<style scoped lang="scss" src="./index.scss"></style>
