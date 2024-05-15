<template>
  <view class="container">
    <view class="Top">
      <image :src="dataProp.img" class="avatar" />
      <view class="profile">
        <view class="upper">
          <view class="name">{{ dataProp.name }}</view>
          <view class="speciality">土壤管理</view>
        </view>
        <view class="university">中国农业大学</view>

      </view>
      <view class="button" @click="handleButtonClick">立即咨询</view>
    </view>
    <view class="bottom">
      <view class="advantage">
        擅长：土壤肥力评价和调理，提供针对不同土壤类型的有效改良方案。
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "expert-category",
    props: {
      dataProp: {
        type: Object,
        default: null,
      }
    },
    data() {
      return {

      };
    },
    methods: {
      handleButtonClick() {
        const pagePath = '/subpkg/experts_details/experts_details'
        const extraParams = {
          param1: 'value1',
          param2: 'value2'
        } // 额外的参数
        this.$emit('navigate', {
          pagePath,
          extraParams
        }) // 触发自定义事件，并传递页面路径和额外参数
      }
    }
  }
</script>

<style lang="scss">
  .container {
    width: 690rpx;
    height: 260rpx;
    border-radius: 20rpx;
    background: rgba(255, 255, 255, 1);
    padding: 25rpx 20rpx;
    margin: 0 30rpx 30rpx 30rpx;

    .Top {
      display: flex;
      height: 120rpx;
      align-items: center;

      .avatar {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
      }

      .profile {
        width: 240rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin: 0 70rpx 0 30rpx;

        .upper {
          display: flex;
          justify-content: space-between;

          .name {
            font-size: 38rpx;
            font-weight: 500;
            color: rgba(34, 34, 34, 1);
          }

          .speciality {
            font-size: 25rpx;
            font-weight: 400;
            color: rgba(96, 102, 114, 1);
            margin-top: 10rpx;
          }
        }

        .university {
          font-size: 28rpx;
          font-weight: 400;
          color: rgba(96, 102, 114, 1);
        }
      }

      .button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 190rpx;
        height: 60rpx;
        border-radius: 30rpx;
        background: linear-gradient(225deg, rgba(58, 207, 120, 1) 0%, rgba(134, 217, 169, 1) 100%);
        box-shadow: 0px 8rpx 30rpx rgba(86, 240, 127, 0.47);
        color: #fff;
      }
    }

    .bottom {
      .advantage {
        height: 100rpx;
        display: flex;
        align-items: center;
        font-size: 28rpx;
        font-weight: 400;
        color: rgba(96, 102, 114, 1);
      }
    }
  }
</style>