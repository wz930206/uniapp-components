<!--
 * @Author: your name
 * @Date: 2021-10-13 12:45:29
 * @LastEditTime: 2021-10-13 14:15:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \uniapp-components\src\pages\index\index.vue
-->
<template>
  <div class="index-container">
    <div class="warpper">
      <h1 class="title"><span>Uniapp 组件</span></h1>
      <h2 class="desc">基于uniapp-template</h2>
      <h2 class="desc">功能已实现，具体还需根据自己业务优化</h2>
    </div>
    <tui-list-view color="#777">
      <tui-list-cell v-for="item in list" :hover="false" :arrow="false" :key="item" @click="inUrl(item.url)">
        <tui-icon name="check" :size="24" color="#999"></tui-icon>
        <text class="tui-list-cell_name">{{ item.title }}</text>
      </tui-list-cell>
    </tui-list-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [
          {
            title: '身份证模板',
            url: '/pages/index/idCardCameraTemplate'
          }, {
            title: '人脸视频',
            url: '/pages/index/takeVideo'
          }
        ],
      };
    },
    methods: {
      inUrl(url) {
        uni.navigateTo({
          url: url
        })
      }
    }
  };
</script>
<style lang="less" scoped>
  .index-container {
    .warpper {
      padding: 20rpx;
      background: #fff;

      .tui-list-cell_name {
        padding-left: 100rpx;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .title {
        margin: 0 0 20rpx;
        font-size: 60rpx;

        .title img,
        .title span {
          display: inline-block;
          vertical-align: middle;
        }

        img {
          width: 70rpx;
        }

        span {
          margin-left: 30rpx;
          font-weight: bold;
        }
      }

      .desc {
        padding: 30rpx;
        color: #999;
        font-size: 32rpx;
      }
    }
  }
</style>
