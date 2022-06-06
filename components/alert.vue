<template>
	<view class="alert center">
		<view class="alertView">
			<image src="https://kaizhao-weike-oss.comeyes.com/asset/images/abg.png" mode="widthFix"></image>
			<view class="alertContent">
				<!-- <image src="../static/images/close.png" class="close" @click="closeView" mode="widthFix"></image> -->
				<view class="text">
					{{text}}
				</view>
				<view class="button" @click="closeView">
					确定
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		name: "swiper",
		data() {
			return {
				onIndex: 0
			};
		},
		props: {
			open: {
				type: Boolean,
				value: false
			},
			text: {
				type: String,
				value: ""
			}
		},
		onReady() {
			
		},
		methods: {
			closeView(){
				console.log(111)
				this.$emit("close",false)
			}
		},
	}
</script>

<style scoped lang="scss">
	.alert {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba($color: #000000, $alpha: 0.7);
		z-index: 1000;
	}

	.alertView {

		width: 500rpx;
		height: 570rpx;
		background: rgba(255, 255, 255, 1);
		position: relative;
		border-radius: 16px;
		overflow: hidden;

		image {
			width: 100%;
		}

		.alertContent {
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;

			.close {
				width: 24rpx;
				height: 24rpx;
				position: absolute;
				right: 32rpx;
				top: 32rpx;
			}

			.text {
				width: 100%;
				padding: 32rpx;
				position: absolute;
				left: 50%;
				top: 35%;
				transform: translate(-50%, -50%);
				text-align: center;
				font-size: 38rpx;
			}

			.button {
				text-align: center;
				width: 280rpx;
				height: 72rpx;
				line-height: 72rpx;
				font-size: 26rpx;
				color: #6ABDE9;
				border: 2rpx solid #6ABDE9;
				border-radius: 2rpx;
				position: absolute;
				left: 50%;
				bottom: 60rpx;
				transform: translateX(-50%);

			}
		}

	}
</style>
