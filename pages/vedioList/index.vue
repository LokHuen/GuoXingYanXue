<template>
	<view class="container" :style="{paddingTop:systemHeight+'px'}">
		<image src="https://kaizhao-weike-oss.comeyes.com/asset/images/wt.png" class="bg" mode=""></image>
		<view class="listBox" v-for="(item,index) in res.data" :key="item.id">
			<view class="title ">
				<image :src="item.icon" mode="widthFix"></image> <text>{{item.name}}</text>
			</view>
			<view class="listView">
				<view class="item" v-for="(items,index) in item.children" :key="items.id" @click="link(items.id,items.name)">
					<image src="https://kaizhao-weike-oss.comeyes.com/asset/images/itembg.png" mode="widthFix"></image>
					<text :class="items.name.length>=10?'fz16':'fz20'">
						{{items.name}} >
					</text>
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
1