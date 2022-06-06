<template>
	<view class="container" style="padding-top: 30rpx;">
		<image src="https://kaizhao-weike-oss.comeyes.com/asset/images/wt.png" class="bg" mode=""></image>
		<view class="indexView">
			<swiper :imgList="indexInfo.imgList">

			</swiper>
		</view>
		<view class="contentBox center" >
			<view class="contentLeft">
				<view class="contentTitle ">
					<image src="https://kaizhao-weike-oss.comeyes.com/asset/images/icon11.png" class="icon1" mode="widthFix"></image> <text>{{indexInfo.videoTitle}}</text>
				</view>
				<view class="contentMiddle centerLeft" style="clear: both;">
					<text>{{indexInfo.videoName}}</text>
					<view style="position: relative;margin-right: 14rpx;">
						<image src="https://kaizhao-weike-oss.comeyes.com/asset/images/more1.png" @click="linkVideo" mode="heightFix"></image>
						<button class="wechat" open-type='getUserInfo' v-if="!noUserinfo"  @click="getUserProfile" style="width: 100%; z-index: 200; height: 100%; position: absolute;left: 0; top: 0;"></button>
						<button shape="circle" v-if="noPhoneCode" open-type="getPhoneNumber" style="width: 100%; z-index: 300; height: 100%; position: absolute;left: 0; top: 0;" @getphonenumber="getPhoneNumber"></button>
					</view>
					
				</view>
				<view class="contentBottom">
					<text v-for="item in indexInfo.videoContant">{{item}}</text>
					
				</view>
			</view>
			<view class="contentRight" style="top: -4rpx;">
				<image src="https://kaizhao-weike-oss.comeyes.com/asset/images/index1.png" mode=""></image>
				<view class="imgOver">

				</view>
			</view>
		</view>
		<view class="contentBox center">
			<view class="contentLeft">
				<view class="contentTitle ">
					<image src="https://kaizhao-weike-oss.comeyes.com/asset/images/icon22.png" class="icon1" mode="widthFix"></image> <text>{{indexInfo.soundTitle}}</text>
				</view>
				<view class="contentMiddle centerLeft">
					<text>{{indexInfo.soundName}}</text>
					<view style="position: relative; margin-right: 14rpx;">
						<image src="https://kaizhao-weike-oss.comeyes.com/asset/images/more1.png" @click="linkSound" mode="heightFix"></image>
						<button class="wechat" open-type='getUserInfo' v-if="!noUserinfo"  @click="getUserProfile" style="width: 100%; z-index: 200; height: 100%; position: absolute;left: 0; top: 0;"></button>
						<button  shape="circle" v-if="noPhoneCode" open-type="getPhoneNumber" style="width: 100%; z-index: 300; height: 100%; position: absolute;left: 0; top: 0;" @getphonenumber="getPhoneNumber"></button>
					</view>
					
				</view>
				<view class="contentBottom">
					<text v-for="item in indexInfo.soundContant">{{item}}</text>
				<!-- 	<text>了解“日企职场上的那些事”，助你找到日企职场</text>
					<text>“必胜法则”。寓教于乐、助力实践转化！</text> -->

				</view>
			</view>
			<view class="contentRight" style="top: 26rpx;">
				<image src="https://kaizhao-weike-oss.comeyes.com/asset/images/index2.png" mode=""></image>
				<view class="imgOver">

				</view>
			</view>
		</view>
		<view class="moreView center">
			<image src="https://kaizhao-weike-oss.comeyes.com/asset/images/logo.png" mode="widthFix"></image>
			<view class="moreRight center">
				<text>{{indexInfo.clickWord}}</text>
				<image src="https://kaizhao-weike-oss.comeyes.com/asset/images/click.png" mode="widthFix"></image>
				<view style="position: relative;">
					<image src="https://kaizhao-weike-oss.comeyes.com/asset/images/more0412_1.png" class="moreBt"  @click="linkVideo1(1)" mode="widthFix"></image>
					<button class="wechat" open-type='getUserInfo' v-if="!noUserinfo"  @click="getUserProfile" style="width: 100%; z-index: 200; height: 100%; position: absolute;left: 0; top: 0;"></button>
					<button  shape="circle" v-if="noPhoneCode" open-type="getPhoneNumber" style="width: 100%; z-index: 300; height: 100%; position: absolute;left: 0; top: 0;" @getphonenumber="getPhoneNumber"></button>
				</view>
				
			</view>
		</view>
		<view style="width: 100%; height: 80rpx;">
			
		</view>
		<view class="indexFooter">
			<!-- <view class="footerTitle">
				{{indexInfo.brief}}
			</view>
			<view class="footerInfo center">

				<image src="https://kaizhao-weike-oss.comeyes.com/asset/images/logo3.png" mode="widthFix"></image>
				<view class="footerName">
					{{indexInfo.name}}
				</view>
				<view class="footerCInfo">
					<view>{{indexInfo.address}}</view>
					<view>
						<text>E-mail:{{indexInfo.email}}</text>
						
					</view>
					<view>
						<text>TEL:{{indexInfo.tel}}</text>
					</view>
				</view>
			</view> -->
			<image src="https://kaizhao-weike-oss.comeyes.com/asset/images/d.png" style="width: 100%;" mode="widthFix"></image>
		</view>
	</view>
</template>
<script src="./index.js"></script>
<style scoped lang="scss" src="./index.scss"></style>
