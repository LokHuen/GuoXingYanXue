<template>
	<view class="container" :style="{paddingTop:systemHeight+'px'}">
		<image src="https://kaizhao-weike-oss.comeyes.com/asset/images/wt.png" class="bg" mode=""></image>
		<view class="title">
			<view class="round">
				
			</view>
			<text>{{name}}</text>
		</view>
		<view class="vedioList">
			<view class="vedioView" v-for="(item,index) in res" @click="link(item,'vedio')">
				<view class="vedioImage center">
					<image :src="item.poster?item.poster:'https://kaizhao-weike-oss.comeyes.com/asset/images/user1.png'" class="user" mode="widthFix"></image>
					<image src="https://kaizhao-weike-oss.comeyes.com/asset/images/play.png" class="play" mode="widthFix"></image>
				</view>
				<view class="vedioTitle" >
					{{item.title}}
				</view>
				
			</view>
			
			
		</view>
		<view v-if="open">
			<over :text="text" @close="close">
				
			</over>
		</view>
		
	</view>
</template>
<script src="./index.js"></script>
<style scoped lang="scss" src="./index.scss"></style>
