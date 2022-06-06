import mixin from "@/mixins/index.js";
import { getVedioList,getFreeList,getMediaVedioList } from "@/api";
import over from "@/components/alert.vue"
export default { //
	mixins: [mixin],
	components: {
	         over
	        },
	data() {
		return {
			systemHeight:0,
			res:"",
			open:false,
			text:"课程即将呈献，敬请期待",
		}
	},
	async onLoad(options) {
		var self = this
		let type = options.type
		console.log(options,"223344")
		this.res = await getVedioList({}).catch((res) => res);
		
		
		uni.getSystemInfo({
		    success: function (res) {
				console.log(res)
		        // self.systemHeight=res.statusBarHeight + 40
				self.systemHeight=17.5
		    }
		});
		
			
		console.log(this.res,111)
	},
	methods: {
		close(e){
			console.log(e,"++++")
			this.open=false
		},
		 async link(id,name){
			console.log(id)
			let res = await getMediaVedioList({"series_id":id}).catch((res) => res);
			console.log(res)
			if(res.data.length==0){
				this.open=true
			}
			else{
				getApp().globalData.videoList = JSON.stringify(res.data)
				setTimeout(function(){
				
					uni.navigateTo({
						url: `/pages/vedioItemList/index?id=${id}&name=${name}`
					})
				},100)
				
			}
		
		}
	},
	computed: {
	}, 
}
