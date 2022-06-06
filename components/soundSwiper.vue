<template>
	<view >
		<view v-for="(item,index) in soundList" style="margin-bottom: 50rpx;" v-if="item.list.length >0">
			<view class="soundTitle ">
				<image src="https://kaizhao-weike-oss.comeyes.com/asset/images/icon22.png" mode="widthFix"></image>
				<text style="color: #017cee;">
					{{item.name}}
				</text>
			</view>
			<!-- {{Math.ceil(item.list.length/3)}} -->
			<swiper  :autoplay="false" class="banner" :id="item.id" @change="swiperChange" >
				<swiper-item v-for="(items,index) in Math.ceil(item.list.length/3)">
					<view class="list" v-for="(items1,index1) in item.list" v-if="index1>=index*3 &&  index1<(index+1)*3" @click="link(items1)">
						<view class="" >
							<!-- {{items1.title}}  index {{index}} index1 {{index1}} {{index*3}} {{index+1*3}} -->
							<view class="index" style="float: left;position: relative; top: 6rpx;">
								{{index1+1}} 
							</view>
							<view class="title" style="float: left;">
								{{items1.title}}
							</view>
							<view class="description" style="float: left;">
								{{items1.description}} 
								
							</view>
							<image src="https://kaizhao-weike-oss.comeyes.com/asset/images/right.png" style="width: 12rpx; margin-left: 16rpx;float: left; position: relative; top: 8rpx;" mode="widthFix"></image>
						  </view>
					</view> 
					
				</swiper-item>
			
			</swiper>
			
			<view class="dotBox center" v-if="Math.ceil(item.list.length/3)>1">
				<view v-for="(items,index) in Math.ceil(item.list.length/3) "  class="dot" :class="index==item.on ?'on':''">
						
				</view>
				<!-- <view class="dot">
					
				</view> -->
			</view>
		
		</view>
		
		
	</view>
</template>

<script>
	export default {
		name: "swiper",
		data() {
			return {
				msg:{
					
				},
				onIndex:0,
				num:0,
				clickIndex:""
			};
		},
		 props: {
		            soundList: {
		                type: Array,
		                value: null
		            }
		        },
		onReady() {
		
			console.log(this.soundList,"778899")
			this.soundList.map(item=>{
				console.log(item)
				return item.on=0
			})
			this.$forceUpdate()
			console.log(this.soundList,"778899")
		},
		methods: {
			// clickSwiper(index){
			// 	this.clickIndex=index
			// 	console.log(this.clickIndex)
			// },
			swiperChange(e){
				console.log(e)
				this.onIndex1 = e.detail.current
				let id = e.target.id
				this.soundList.map(item=>{
					if(item.id == id){
						return item.on=e.detail.current
					}
					
				})
				this.$forceUpdate()
			},
			link(item){
				this.$emit("linkId",item)
			}
		},
	}
</script>

<style scoped lang="scss">
	.index{ width: 26rpx; height: 26rpx; border-radius: 50%; background: #017cee; text-align: center; line-height: 26 rpx; color: #fff; font-size: 19rpx; color: #fff;}
	.title{ font-size: 28rpx;width: 200rpx;margin-left: 14rpx;}
	.list{margin-top: 54rpx;height: 35rpx;}
	.description{text-decoration: underline;width: calc(100% - 280rpx);text-align: right;font-size: 22rpx; color: #636363;}
	.banner {

		width: 100%;
		height: 275rpx;
		image{
			width: 100%;
		}
	}
	.soundTitle{
		overflow: hidden;
		image{width: 40rpx;margin-right: 10rpx; float:left;position: relative; top:5rpx}
		text{
			font-size: 34rpx;float:left
		}
	}
	.dotBox{
		
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
