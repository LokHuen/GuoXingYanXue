import mixin from "@/mixins/index.js";
import swiper from "@/components/swiper.vue"
import {
	getToken,
	getUserInfo,
	getUserPhone,
	saveUserInfo
} from "@/api";
export default { //
	mixins: [mixin],
	components: {
		// 注册
		swiper
	},
	data() {
		return {
			systemHeight: "",
			getLaunchOptionsSync: "",
			res: "",
			loginCode: "",
			userInfo: "",
			noPhoneCode: false,
			noUserinfo: false,
			indexInfo: {
				"imgList": [
					"https://kaizhao-weike-oss.comeyes.com/asset/images/1.jpg",
					"https://kaizhao-weike-oss.comeyes.com/asset/images/2.jpg",
					"https://kaizhao-weike-oss.comeyes.com/asset/images/3.jpg",
					"https://kaizhao-weike-oss.comeyes.com/asset/images/4.jpg",
				],
				"address": "上海市黄浦区宁海东路200号申鑫大厦2108室",
				"email": "info@kaizhaochina.cn",
				"tel": "021-63749877",
				"clickWord": "果行研学小程序,随时随地移动学习",
				"name": "上海凯兆企业管理咨询有限公司",
				"brief": "我们为企业提供「调研、策划、实施、后续跟踪」的一站式培训服务",
				"videoTitle": "视频 Video -",
				"videoName": "职场微课",
				"videoContant": ["微课虽 “微”，却面面俱到。", "从职场力、思考力、领导力到生产・品质・安全管理。", "有理论，有技巧。有“纸上谈兵”，更有实操案例。",
					"无论是新人还是老兵，助你认识职场、熟悉职场、胜在职场。"
				],
				"soundTitle": "音频 Audio -",
				"soundName": "日企职场上的那些事",
				"soundContant": ["要想成为“职场精英”，必先塑造“职场习惯”。", "了解“日企职场上的那些事”，助你找到日企职场", "“必胜法则”。寓教于乐、助力实践转化！"],

			}
		}
	},
	async onLoad() {
		var self = this
		this.getLaunchOptionsSync = wx.getLaunchOptionsSync()
		uni.request({
			url: 'https://kaizhao-weike-oss.comeyes.com/asset/config1.json', //仅为示例，并非真实接口地址。
			data: {
				text: 'uni.request'
			},
			header: {
				'custom-header': 'hello' //自定义请求头信息
			},
			success: (res) => {
				this.indexInfo = res.data
				console.log(this.indexInfo)
			}
		});
		uni.login({
			provider: 'weixin',
			success: async function(loginRes) {

				console.log(self.getLaunchOptionsSync)
				console.log(loginRes, 111)
				self.loginCode = loginRes.code

				self.res = await getToken({
					"code": self.loginCode,
					"options": self.getLaunchOptionsSync
				}).catch((res) => res);
				getApp().globalData.token = self.res.data.token;

				self.userInfo = await getUserInfo({}).catch((res) => res);
				console.log(self.userInfo)
				console.log(self.userInfo.data.nick_name, "778899")
				console.log(!self.userInfo.data.has_mobile && self.userInfo.data.nick_name != null)
				if (self.userInfo.data.nick_name != null) {
					self.noUserinfo = true
				}

				if (!self.userInfo.data.has_mobile && self.userInfo.data.nick_name != null) {
					self.noPhoneCode = true
				}
				// self.userInfo = await saveUserInfo({"userInfo":}).catch((res) => res);




			}
		});
		uni.getSystemInfo({
			success: function(res) {
				console.log(res)
				self.systemHeight = 35
			}
		});
	},

	methods: {
		getPhoneNumber(e) {
			let that = this;
			let self = this;
			// 不允许授权
			if (e.detail.errMsg !== "getPhoneNumber:ok") {
				return;
			}

			let encryptedData = e.detail.encryptedData
			let iv = e.detail.iv
			// 检查登录态是否过期
			uni.checkSession({
				success(res) {
					uni.login({
						provider: 'weixin',
						success: async function(loginRes) {

							console.log(that.getLaunchOptionsSync)
							console.log(loginRes, 111)
							that.loginCode = loginRes.code

							let a = await getUserPhone({
								code: that.loginCode,
								encryptedData: encryptedData,
								iv: iv
							}).catch((res) => res);
							console.log(a)
							if (a.message == "ok") {
								self.noPhoneCode = false
							}


						}
					});
				},
				fail(err) {
					uni.login({
						provider: 'weixin',
						success: async function(loginRes) {

							console.log(that.getLaunchOptionsSync)
							console.log(loginRes, 111)
							that.loginCode = loginRes.code

							let a = await getUserPhone({
								code: that.loginCode,
								encryptedData: encryptedData,
								iv: iv
							}).catch((res) => res);
							console.log(a)

							if (a.message == "ok") {
								self.noPhoneCode = false
							}

						}
					});

				}
			})
		},
		linkVideo(type) {
			uni.navigateTo({
				url: "/pages/vedioList/index?type=" + type
			})
		},
		linkVideo1(type) {
			uni.navigateTo({
				url: "/pages/vedioItemList/index?type=" + type
			})
		},

		linkSound() {
			uni.navigateTo({
				url: "/pages/soundList/index"
			})
		},

		getUserProfile() {
			let self = this;
			uni.getUserProfile({
				desc: "登录",
				success: (res) => {

					console.log(res.userInfo);
					let userInfo = saveUserInfo({
						"userInfo": res.userInfo
					}).catch((res) => res);
					self.noUserinfo = true
					if (!self.userInfo.data.has_mobile) {
						self.noPhoneCode = true
					}
				},
				fail: (res) => {

					console.log(res);
				},
			});
		},

	},
	computed: {},
}
