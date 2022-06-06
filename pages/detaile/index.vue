<template>
	<view class="container" :style="{paddingTop:systemHeight+'px'}">
		<image src="https://kaizhao-weike-oss.comeyes.com/asset/images/wt.png" class="bg" mode=""></image>
		<view class="contant">
			<view class="title centerLeft">
				<view class="view"></view> <text>{{type=="vedio"?'视频':'音频'}}详情</text>
			</view>
		</view>
		<view class="line">

		</view>
		<view v-if="type=='vedio'">
			<video id="myVideo" :src="url" autoplay="true"
			              show-progress="true"   :poster="item.poster"     controls></video>
			<view class="videotitle centerLeft">
				<image src="https://kaizhao-weike-oss.comeyes.com/asset/images/v.png" mode="widthFix"></image> <text>{{item.title}}</text>
			</view>
			<view class="dTitle">
				{{item.description?item.description:''}}
			</view>
		</view>
		<view v-if="type=='sound'">
		
			<view class="postImg center">
				<!-- <image :src="item.poster" style="width: 100%;" mode="widthFix"></image> -->
				<image v-if="item.album.length==1" @click="clickImg(item.album)" :src="item.album?item.album:'https://kaizhao-weike-oss.comeyes.com/asset/images/logo.png'" style="width: 100%;" mode="widthFix"></image>
				<swiper v-if="item.album.length>1" style="width: 100%;height:375.55px;" @change="swiperChange">
					<swiper-item v-for="items in item.album">
						<image  @click="clickImg(items)" :src="items" style="width:100%; height: 100%;" mode="aspectFit"></image>
					</swiper-item>
					
				</swiper>
				
			</view>
			<view class="dotBox center" v-if="item.album.length>1">
				<view v-for="(item,index) in item.album"  class="dot" :class="index==onIndex?'on':''">
					
				</view>
				<!-- <view class="dot">
					
				</view> -->
			</view>
			<view class="videotitle centerLeft">
				<image src='https://kaizhao-weike-oss.comeyes.com/asset/images/s.png' mode="widthFix" ></image> <text>{{item.title}}</text>
			</view>
			<view class="dTitle">
				{{item.description?item.description:''}}
			</view>
			<slider value="" style="width: 115%; margin-top: 80rpx; margin-left: -4%; " @changing="sliderChange" :max="finish" :value="sliderValue" backgroundColor="#cbcbcb" block-color="#057eed"
				block-size="12" />
			
			<view class="" style="width: 115%; overflow: hidden; margin-left: -5%;">
				<text style="float: left; "> {{seekPosition}}</text>
				<text style="float: right;">{{all}}</text>
			</view>
			<view class="center btvox"> 
				<image src="https://kaizhao-weike-oss.comeyes.com/asset/images/del.png" @click="del" mode="widthFix"></image>
				<view style="position: relative; width: 200rpx; height: 85rpx;">
					<image src="https://kaizhao-weike-oss.comeyes.com/asset/images/start.png" @click="play1" :class="play?'dn':''" class="middle" mode="widthFix"></image>
					<image src="https://kaizhao-weike-oss.comeyes.com/asset/images/z.png" @click="pause" :class="play?'':'dn'" class="middle" mode="widthFix"></image>
				</view>
				
				<image src="https://kaizhao-weike-oss.comeyes.com/asset/images/add.png" @click="add" mode="widthFix"></image>
			</view>
		</view>
		<view class="copyright" :class="type!='sound'?'fixed':'ma'">
			<view>
				严禁下载、录屏、转载以及未经授权的第三方使用。版权所有，侵权必究。
			</view>
			<view>
				©2022  Shanghai Kaizhao Enterprise Management Consulting Co., LtdAll rights reserved.
			</view>
		</view>
	</view>
</template>
<script src="./index.js"></script>
<style scoped lang="scss" src="./index.scss"></style>
