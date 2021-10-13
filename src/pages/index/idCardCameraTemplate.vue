<template>
  <view :style="{ height: windowHeight + 'px' }">
    <camera
      mode="normal"
      device-position="back"
      flash="off"
      :style="{ height: cameraHeight + 'px' }"
    >
      <cover-view class="controls" style="width: 100%;height: 100%;">
        <!-- 头像面 -->
        <cover-image
          v-show="idcardFrontSide"
          class="w569-h828"
          src="/static/images/index/camera_module_front.png"
        />
        <!-- 国徽面 -->
        <cover-image
          v-show="!idcardFrontSide"
          class="w569-h828"
          src="/static/images/index/camera_module_side.png"
        />
      </cover-view>
    </camera>
    <view class="bottom font-36-fff">
      <view class="wrap">
        <view class="back" @click="switchBtn">切换</view>
        <view @click="takePhoto">
          <image class="w131-h131" src="/static/images/index/take_camera_btn_icon.png">
          </image>
        </view>
        <view @click="chooseImage">
          相册
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        cameraContext: {},
        windowHeight: '',
				cameraHeight: '',
        idcardFrontSide: true
      };
    },
    onLoad(options) {
      if(uni.createCameraContext) {
        this.cameraContext = uni.createCameraContext()
      }else {
        // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
        uni.showModal({
            title: '提示',
            content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
      }
    },
    onShow() {
      const systemInfo = uni.getSystemInfoSync()
      this.windowHeight = systemInfo.windowHeight
      this.cameraHeight = systemInfo.windowHeight - 80
    },
    methods: {
      // 拍照
      takePhoto() {
        uni.showLoading({
          title:'拍摄中'
        })
        this.cameraContext.takePhoto({
          quality: 'normal',
          success: (res) => {
            uni.showToast({
              title:'拍照成功',
              icon: 'none',
              duration: 1200
            })
          },
          fail: (err) => {
            uni.showToast({
              title:'拍照失败，请检查系统是否授权',
              icon: 'none',
              duration: 1200
            })
          }
        })
      },
      // 从相册选取
      chooseImage() {
        uni.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['album'],
          success: (res) =>  {},
          fail: (err) => {}
        });
      },
     },
  }
</script>

<style lang="less" scoped>
  .icon-w569-h828 {
    width: 569rpx;
    height: 828rpx;
  }

  .controls {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bottom {
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

  .w569-h828 {
    width: 569rpx;
    height: 828rpx;
  }
  
  .w131-h131 {
    width: 131rpx;
    height: 131rpx;
  }

  .font-36-fff {
    font-size: 36rpx;
    color: #fff;
  }
</style>
