import mixin from "@/mixins/index.js";
import swiper from "@/components/swiper.vue"
import over from "@/components/alert.vue"
import soundSwiper from "@/components/soundSwiper.vue"
import {
	getMediaAudioList,getMediaInfo
} from "@/api"
export default { //
	mixins: [mixin],
	components: {
		// 注册
		soundSwiper,swiper,over
	},
	data() {
		return {
			systemHeight: "",
			res: [],
			flag:false,
			text:"暂无权限",
			open:false,
			indexInfo: {
				imgList: [
					"https://kaizhao-weike-oss.comeyes.com/asset/images/1.jpg",
					"https://kaizhao-weike-oss.comeyes.com/asset/images/2.jpg",
					"https://kaizhao-weike-oss.comeyes.com/asset/images/3.jpg",
					"https://kaizhao-weike-oss.comeyes.com/asset/images/4.jpg",
				]
				
			}
		}
	},
	
	async onLoad() {
		var self = this
		uni.getSystemInfo({
			success: function(res) {
				console.log(res)
				self.systemHeight=17.5
			}
		});
		self.res = await getMediaAudioList({}).catch((res) => res);
		if(self.res){
			self.flag = true
		}
		
		console.log(self.res, 111)
	},
	methods: {
		close(e){
			console.log(e,"++++")
			this.open=false
		},
		async linkId(item){
			console.log(item,",id")
			let res = await getMediaInfo({
				"id": item.id
			}).catch((res) => res);
			
			if(res.code==101){
				// uni.showToast({
				// 	icon:'none',
				// 	title: '暂无权限',
				// 	duration: 2000
				// });
					this.open=true
			}
			else{
				console.log(res.data.url,"+++rrrr2222")
				getApp().globalData.url = res.data.url;
				setTimeout(function(){
					console.log(getApp().globalData.url,"9999")
					uni.navigateTo({
						url: "/pages/detaile/index?item="+JSON.stringify(item)+"&type=sound"
					})
				},100)
				// uni.navigateTo({
				// 	url: "/pages/detaile/index?item="+JSON.stringify(item)+"&type=sound"
				// })
			}
		}
	},
	computed: {},
}
