import mixin from "@/mixins/index.js";
import {
	getMediaInfo,
	getToken
} from "@/api";

export default { //
	mixins: [mixin],

	data() {
		return {
			systemHeight: "",
			bgM: "",
			duration: "",
			id: "",
			type: "",
			url: "",
			item: "",
			all: "",
			finish: "",
			onIndex: 0,
			audioContext: "",
			seekPosition: "",
			sliderValue: 0,
			play: false,
			platform: "",
			indexInfo: {
				imgList: [
					"https://kaizhao-weike-oss.comeyes.com/asset/images/banner.png",
					"https://kaizhao-weike-oss.comeyes.com/asset/images/banner.png",
				]
			}
		}
	},
	
	async onLoad(options) {
		var self = this
		self.item = JSON.parse(options.item)
		self.id = JSON.parse(options.item).id
		console.log(options, "+++id")
		self.type = options.type
		let platform = uni.getSystemInfoSync().platform;
		if (platform == 'android') {
			undefined
			try {
				undefined
				this.platform = 'android'
				console.log("安卓")
			} catch (e) {
				undefined
				alert("error:" + e.message);
			}

		} else {
			undefined
			try {
				undefined
				this.platform = 'ios'
				console.log("ios")
			} catch (e) {
				undefined
				alert("error:" + e.message);
			}
		}

		uni.getSystemInfo({
			success: function(res) {
				console.log(res)
				self.systemHeight = 17.5
			}
		});

		self.res = await getMediaInfo({
			"id": self.id
		}).catch((res) => res);
		console.log(this.res)
		self.url = this.res.data.url
		if (self.type == "sound") {
			uni.showLoading({
				title: '音频加载中'
			});
			self.audioContext = wx.createInnerAudioContext() //初始化createInnerAudioContext接口
			//设置播放地址
			self.audioContext.src = self.url


			//   //音频进入可以播放状态，但不保证后面可以流畅播放
			//   innerAudioContext.onCanplay(() => {
			//     innerAudioContext.duration //类似初始化-必须触发-不触发此函数延时也获取不到
			//     setTimeout(function () {
			//      //在这里就可以获取到大家梦寐以求的时长了
			//       console.log(innerAudioContext.duration);//延时获取长度 单位：秒
			// self.duration = innerAudioContext.duration
			//     }, 1000)  //这里设置延时1秒获取
			//   })






			self.audioContext.onCanplay(() => {
				self.audioContext.play();
				if (this.platform == "android") {
					setTimeout(() => {


						self.audioContext.currentTime
						self.audioContext.duration
						self.audioContext.onTimeUpdate(() => {

							self.finish = parseInt(self.audioContext.duration)
							self.all = (parseInt(self.audioContext.duration / 60 % 60) <
									10 ? '0' +
									parseInt(self.audioContext.duration / 60 % 60) :
									parseInt(self.audioContext
										.duration / 60 % 60)) + ":" +
								(parseInt(self.audioContext.duration % 60) < 10 ? '0' +
									parseInt(self.audioContext
										.duration % 60) : parseInt(self.audioContext
										.duration % 60))
							uni.hideLoading()

							console.log(self.audioContext.duration, "77777") //0

						})

					}, 500)
				} else {
					self.audioStatus();
				}


			})
			if (this.platform == "ios") {
				setTimeout(() => {
					console.log(self.audioContext.duration, 10101010)
					self.finish = parseInt(self.audioContext.duration)
					self.all = (parseInt(self.audioContext.duration / 60 % 60) < 10 ? '0' +
							parseInt(self.audioContext.duration / 60 % 60) : parseInt(self.audioContext
								.duration / 60 % 60)) + ":" +
						(parseInt(self.audioContext.duration % 60) < 10 ? '0' + parseInt(self.audioContext
							.duration % 60) : parseInt(self.audioContext.duration % 60))
					uni.hideLoading()
				}, 1000)
			}
		}


	},
	onShareAppMessage: function(res) {
		console.log(res)
		return {
			title: '自定义，一般写小程序的名字',
			path: '/page/home/index',
			imageUrl: "http://file.faqiaolawyer.com/faqiao/image/20190621/1561104063715532.png",
			success: function(shareTickets) {
				console.info(shareTickets + '成功');
				// 转发成功
			}
		}
	},
	onUnload() {
		console.log("销毁")
		const self = this;
		 self.audioContext.offTimeUpdate()
		self.audioContext.src = ""
			self.audioContext.play();
		self.audioContext.stop()
	},
	onHide() {
		console.log("关闭")
		const self = this;
		 self.audioContext.offTimeUpdate()
		self.audioContext.src = ""
			self.audioContext.play();
		self.audioContext.stop()
	},
	methods: {
		clickImg(url) {
			wx.previewImage({
				urls: this.item.album, //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
				current: url, // 当前显示图片的http链接，默认是第一个
				success: function(res) {},
				fail: function(res) {},
				complete: function(res) {},
			})
		},


		swiperChange(e) {

			this.onIndex = e.detail.current
		},
		play1() {

			const self = this;
			self.play = false
			self.audioContext.play()
		},
		pause() {
			const self = this;
			self.play = true
			self.audioContext.pause()
		},
		//记录播放状态
		audioStatus: function() {
			const self = this;
			//音频播放进度更新事件
			self.audioContext.onTimeUpdate(() => {
				console.log(self.audioContext.currentTime)
				self.seekPosition = (parseInt(self.audioContext.currentTime / 60 % 60) < 10 ? '0' +
						parseInt(self.audioContext.currentTime / 60 % 60) : parseInt(self.audioContext
							.currentTime / 60 % 60)) + ":" +
					(parseInt(self.audioContext.currentTime % 60) < 10 ? '0' + parseInt(self.audioContext
						.currentTime % 60) : parseInt(self.audioContext.currentTime % 60))

				self.sliderValue = parseInt(self.audioContext.currentTime)

			})
			//音频播放结束
			self.audioContext.onEnded(() => {
				self.seekPosition = "00:00";
				self.sliderValue = 0;
				self.play = true

			})
		},

		sliderChange(e) {
			var self = this
			self.audioContext.pause()
			self.seekPosition = (parseInt(e.detail.value / 60 % 60) < 10 ? '0' +
					parseInt(e.detail.value / 60 % 60) : parseInt(e.detail.value / 60 % 60)) + ":" +
				(parseInt(e.detail.value % 60) < 10 ? '0' + parseInt(e.detail.value % 60) : parseInt(e.detail.value %
					60))
			// self.audioContext.seek = e.detail.value
			self.audioContext.seek(e.detail.value)
			console.log('value 发生变化111：' + e.detail.value)
			setTimeout(function() {
				self.audioContext.play()
			}, 300)
		},
		add() {
			var self = this
			if (self.sliderValue + 15 <= self.finish) {
				self.audioContext.seek(self.sliderValue + 15)
			} else {
				self.seekPosition = "00:00";
				self.sliderValue = 0;
				self.play = true
				self.audioContext.stop()
			}
		},
		del() {
			var self = this
			if (self.sliderValue - 15 > 0) {
				self.audioContext.seek(self.sliderValue - 15)
			} else {
				self.audioContext.seek(0)
				self.seekPosition = "00:00";
				self.sliderValue = 0;

			}
		}

	},
	computed: {},
}
