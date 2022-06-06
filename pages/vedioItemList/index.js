import mixin from "@/mixins/index.js";
import over from "@/components/alert.vue"
import { getMediaVedioList,getMediaInfo,getFreeList } from "@/api";
export default { //
	mixins: [mixin],
	components: {
	         over
	        },
	data() {
		return {
			systemHeight:0,
			res:"",
			id:"",
			name:"",
			text:"暂无权限",
			open:false
		}
	},
	async onLoad(option) {
		console.log(option)
		this.id=option.id
		this.name=option.name
		let type = option.type
		
		var self = this
		uni.getSystemInfo({
		    success: function (res) {
				console.log(res)
		       self.systemHeight=17.5
		    }
		});
		if( option.type == 1){
			this.res = await getFreeList({}).catch((res) => res);
			this.name = this.res.data[0].name
			this.res = this.res.data[0].list
			
			
		}
		else{
			// this.res = await getMediaVedioList({"series_id":this.id}).catch((res) => res);
			// this.res = this.res.data
			console.log(getApp().globalData.videoList)
			this.res = JSON.parse(getApp().globalData.videoList) 
		}
		
			
		console.log(this.res,111)
	},
	methods: {
		close(e){
			console.log(e,"++++")
			this.open=false
		},
		async link(item,type){
			let res = await getMediaInfo({
				"id": item.id
			}).catch((res) => res);
			console.log(res)
			if(res.code==101){
				this.open=true
			}
			else{
				getApp().globalData.url = res.data.url;
				setTimeout(function(){
					console.log(getApp().globalData.url,"9999")
					uni.navigateTo({
						url: "/pages/detaile/index?item="+JSON.stringify(item)+"&type="+type
					})
				},100)
				
			}
			
		}
	},
	computed: {
	}, 
}
