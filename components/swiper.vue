<template>
	<view style="height: 600rpx;">
		<swiper  :autoplay="true" class="banner" @change="swiperChange">
			<swiper-item v-for="(item,index) in imgList">
				　　<image :src="item" mode="widthFix"></image>
			</swiper-item>
		
		</swiper>
		<view class="dotBox center">
			<view v-for="(item,index) in imgList"  class="dot" :class="index==onIndex?'on':''">
				
			</view>
			<!-- <view class="dot">
				
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		name: "swiper",
		data() {
			return {
				onIndex:0
			};
		},
		 props: {
		            imgList: {
		                type: Array,
		                value: null
		            }
		        },
		onReady() {
			
		},
		methods: {
			swiperChange(e){
				
				this.onIndex = e.detail.current
			},
		},
	}
</script>
<style>
	swiper{
		    height: 400rpx;
	}
	
</style>
<style scoped lang="scss">
	.banner {

		width: 100%;
		height: 323rpx;
		image{
			width: 100%;
		}
	}
	.dotBox{
		margin-top: 14rpx;
		padding: 4rpx 0;
		background: #e0e0e0;
		border-radius: 10rpx;
		display: inline-flex;
		margin-left: 50%;
		transform: translateX(-50%);
		.dot{ 
			
			margin: 0 26rpx;
			width: 12rpx;
			height: 12rpx;
			border-radius: 50%;
			background: #fff;
			

		}
		.on{
	
background: #017cee;

}
	}
	
</style>
