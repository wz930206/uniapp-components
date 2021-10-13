<template>
	<!-- 第三步上传视频 -->
	<view class="container background-color-474747" :style="{height: windowHeight + 'px'}">
		<view class="video-wrap wpercent-100 text-align" :style="{height: takeVideoHeight + 'px'}" v-if="tipShow">
			<view class="content-wrap">
				<view class="font-36-fff font-weight">请保持声音清晰，话术完整，露出五官</view>
				<view class="padding-top-20 font-36-fff font-weight">不符合以上要求，需重新拍摄</view>
				<view class="padding-top-35 padding-bottom-30 font-24-FF2323 font-weight">点击下方按钮开始拍摄</view>
				<image class="tips-icon" src="/static/images/index/take_video_tips.png"></image>
				<text class="know" @click="startCenterCountDown">知道了</text>
			</view>
		</view>
		<view class="video-wrap wpercent-100" v-if="cameraShow" >
			<view v-if="!centerCountDownShow" class="number">{{ second }}s</view>
			<camera 
				mode="normal"
				class="wpercent-100"
				:device-position="devicePosition" 
				:style="{height: takeVideoHeight + 'px'}">
				<!-- 中间3,2,1倒计时 -->
				<cover-view class="center-count-down-wrap" v-if="centerCountDownShow && centerCountDownValue != 4">
					<cover-view :class="centerCountDownValue === '开始' ? 'center-count-down-start' : 'center-count-down'">{{ centerCountDownValue }}</cover-view>
				</cover-view>
				<!-- 正式拍照人面框 -->
				<cover-image v-if="!centerCountDownShow" class="controls" src="/static/images/index/take_video_back.png"/>
				<cover-view class="font-36-fff font-weight absolute-one-font" v-if="!centerCountDownShow">
					正视镜头录制一段匀速朗读下方数字的视频
				</cover-view>
				<cover-view class="font-36-fff font-weight absolute-two-font" v-if="!centerCountDownShow">
					1234
				</cover-view>
			</camera>
		</view>
		<transition name="fade" :duration="{ enter: 500, leave: 800 }">
			<view class="bottom" v-if="showBottom">
				<view class="wrap">
					<view class="back" @click="backTwoStep">
						<image class="w55-h49" src="/static/images/index/back_before_icon.png"></image>
					</view>
					<!-- 开始倒计时 -->
					<view class="take" @click="startCenterCountDown" v-if="tipShow">		
						<image class="w100-h100" src="/static/images/index/take_btn_icon.png"></image>
					</view>
					<!-- 点击就暂停 -->
					<view class="take" @click="stopRecord" v-if="cameraShow && !centerCountDownShow">
						<image class="w100-h100" src="/static/images/index/take_btn_icon.png"></image>
					</view>
					<view class="switch" @click="switchCamera">
						<image class="w69-h56" src="/static/images/index/switch_camera_icon.png"></image>
					</view>
				</view>
			</view>
		</transition>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				windowHeight: '',
				takeVideoHeight: '',
				tipShow: true,
				showBottom: true,
				centerCountDownShow: false,
				cameraShow: false,
				centerCountDownValue: 4,
				cameraContext: {},
				devicePosition: 'front',
				second: 9,
				setTimer: '',
			};
		},
		onLoad() {
			if(uni.createCameraContext) {
				setTimeout(() => {
					this.cameraContext = uni.createCameraContext();
				},200)
			}else {
				// 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
				uni.showModal({
					title: '提示',
					content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
				})
			}
		},
		created() {
			const systemInfo = uni.getSystemInfoSync()
      this.windowHeight = systemInfo.windowHeight
			this.computedHeight(80)
		},
		methods: {
			// 计算height
			computedHeight (number) {
        const systemInfo = uni.getSystemInfoSync()
				this.takeVideoHeight = systemInfo.windowHeight - number
			},
			// 开始倒计时 3,2,1,开始
			startCenterCountDown () {
				this.computedHeight(0)
				this.setBoolean(false)
				this.centerCountDown()
			},
			// 中间倒计时
			centerCountDown() {
				let promise = new Promise((resolve, reject) => {
					let setTimer = setInterval(() => {
						if(this.centerCountDownValue === 1) {
							this.centerCountDownValue = '开始'
							resolve(setTimer)
						} else {
							this.centerCountDownValue = this.centerCountDownValue - 1
						}
						if(this.centerCountDownValue === 2) {			// this.cameraContext.startRecord 有延迟执行的问题，所以需要提前半秒执行
							setTimeout(() => {
								this.startRecord()
							}, 1200)
						}
					}, 1000)
				})
				promise.then((setTimer) => {
					clearInterval(setTimer)
					this.computedHeight(80)
					this.showBottom = true
					this.centerCountDownShow = false
				})
			},
			// 开始录像
			startRecord() {
				this.cameraContext.startRecord({
					success: (res) => {
						this.rightTopCountDown()
					},
					fail: (err) => {
						uni.showToast({
							title: '录像失败，请重试',
							icon: 'none',
							duration: 1200
						})
					}
				})
			},
			// 右上角倒计时
			rightTopCountDown() {
				let promise = new Promise((resolve, reject) => {
					this.setTimer = setInterval(() => {
						this.second = this.second - 1
						if (this.second <= 0) {
							this.stopRecord()
							resolve(this.setTimer)
						}
					}, 1000)
				})
				promise.then((setTimer) => {
					clearInterval(setTimer)
					this.second = 9
				})
			},
			// 结束录像
			stopRecord() {
				uni.showToast({
					title: '结束录像，正在处理视频',
					icon: 'none',
					duration: 10000
				})
				clearInterval(this.setTimer)
				this.second = 9
				this.showBottom = false
				this.computedHeight(0)
			    this.cameraContext.stopRecord({
					compressed: true,
					success: (res) => {
						uni.setStorageSync('taxCollectVideoPath',res.tempVideoPath)
						setTimeout(() => {
							this.stopRecordInitData()
						}, 500)
					},
					fail: (err) => {
						this.showBottom = true
						this.computedHeight(80)
						uni.showToast({
							title: '操作失败，请重试',
							icon: 'none',
							duration: 1200
						})
					}
				})
			},
			// 切换摄像头
			switchCamera() {
				if(this.devicePosition === 'back') {
					this.devicePosition = 'front'
				} else {
					this.devicePosition = 'back'
				}
			},
			// 结束录像之后 初始数据
			stopRecordInitData () {
				this.computedHeight(80)
				this.setBoolean(true)
				this.centerCountDownValue = 4
				this.second = 9
			},
			// 设置 boolean
			setBoolean(boolean) {
				this.tipShow = boolean
				this.showBottom = boolean
				this.cameraShow = !boolean
				this.centerCountDownShow = !boolean
			},
		}
	}
</script>

<style lang="less" scoped>
	.container {
		position: relative;

		.video-wrap {
			position: relative;

			.content-wrap {
				position: absolute;
				bottom: 150px;
				width: 100%;
			}

			.padding-bottom-40 {
				padding-bottom: 40rpx;
			}

			.tips-icon {
				position: absolute;
				left: 242rpx;
				width: 96rpx;
				height: 327rpx;
			}

			.know {
				position: relative;
				top: 210rpx;
				left: 155rpx;
				display: inline-block;
				width: 199rpx;
				height: 92rpx;
				line-height: 92rpx;
				text-align: center;
				border: 3rpx dashed #fff;
				border-radius: 5rpx;
				font-size: 48rpx;
				color: #fff;
			}

			.number {
				position: absolute;
				top: 15px;
				right: 20px;
				z-index: 11;
				color: #fff;
				width: 30px;
				height: 30px;
				background-color: #7a7a7a;
				border-radius: 50%;
				text-align: center;
				line-height: 30px;
			}

			.center-count-down-wrap {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 100%;
			}

			.center-count-down {
				font-size: 330rpx;
				color: #fff;
				font-weight: bold;
			}

			.center-count-down-start {
				font-size: 220rpx;
				color: #fff;
				font-weight: bold;
			}
		}

		.controls {
			position: absolute;
			bottom: 200rpx;
			width: 100%;
			height: 753rpx;
		}

		.absolute-one-font {
			position: absolute;
			left: 4.5%;
			bottom: 130rpx;
		}

		.absolute-two-font {
			position: absolute;
			bottom: 30rpx;
			left: 44%;
		}

		.bottom {
			// position: fixed;
			// bottom: 0;
			width: 100%;
			background-color: #000;

			.wrap {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 80px;
				padding: 0 73rpx;
			}
		}

		.fade-enter-active, .fade-leave-active {
			transition: opacity .5s;
		}

		.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
			opacity: 0;
		}

		.background-color-474747 {
			background-color: #474747;
		}

		.wpercent-100 {
			width: 100%;
		}

		.text-align {
			text-align: center;
		}

		.font-36-fff {
			font-size: 36rpx;
			color: #fff;
		}
		
		.font-weight {
			font-weight: bold;
		}

		.w55-h49 {
			width: 55rpx;
			height: 49rpx;
		}

		.w100-h100 {
			width: 100rpx;
			height: 100rpx;
		}

		.w69-h56 {
			width: 69rpx;
			height: 56rpx;
		}
	}
</style>
