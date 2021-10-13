<!-- home -->
<template>
  <div class="about-container">
    <div class="warpper">
      <div class="center">
        <div class="logo" />
        <div class="title">uniapp H5开发模板</div>
        <div class="item">项目作者: ur home</div>
        <div class="item">
          <h2>项目地址:</h2>
          <a href="https://github.com/wz930206/uniapp-ma-template.git"
            >https://github.com/wz930206/uniapp-ma-template.git</a
          >
        </div>
        <div class="item">
          <h2>Eslint+Stylelint+Pettier详细配置</h2>
          <a href="https://blog.csdn.net/wz_coming/article/details/119996186"
            >https://blog.csdn.net/wz_coming/article/details/119996186</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getInfo } from '@/api/user.js';
  export default {
    onShow() {
      this.getInfo();
    },
    methods: {
      async getInfo() {
        await getInfo();
      },
    },
  };
</script>
<style lang="less" scoped>
  .about-container {
    background: #fff;
    height: 90vh;
    box-sizing: border-box;

    .warpper {
      padding: 50rpx 12rpx 12rpx 12rpx;

      .center {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #666;
        font-size: 14rpx;

        .title {
          margin: 20rpx;
          font-size: 32rpx;

          .title img,
          .title span {
            display: inline-block;
          }
        }

        .item {
          font-size: 18rpx;
          line-height: 80rpx;

          a {
            text-decoration: underline;
          }
        }

        .logo {
          width: 120rpx;
          height: 120rpx;
          background: url(../../static/images/index/logo.png) center / contain no-repeat;
        }

        .wechat {
          width: 200rpx;
          height: 200rpx;

          img {
            width: 100%;
            height: auto;
          }
        }
      }
    }
  }
</style>
