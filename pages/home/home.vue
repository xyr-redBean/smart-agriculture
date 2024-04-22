<!--  1 -->
<template>
  <view class="container" :style="{ paddingTop: distanceFromTop + 'px' }">
    <view class="top">
      <img src="@/static/images/logo.png" alt="" />
      <p>耕农千问</p>
    </view>
    <view class="content">
      <view class="talking">
        <view class="dialogue iAsk">
          <span>今天星期几</span>
        </view>
        <view class="dialogue aiTalk">
          <span>今天星期四</span>
        </view>
      </view>
      <view class="bottom">
        <view class="ButtonLeft" @click="goToHistory">
          <u-icon class="clock" name="clock" color='green'></u-icon>
        </view>
        <view class="ButtonMiddle" >
          <u-icon class="circle" name="plus-circle-fill" color='green'></u-icon>
        </view>
        <view class="search" style="margin-left: 15rpx;margin-right: 0;">
          <input 
              class="input" 
              v-model="value"
              placeholder="有什么问题尽管问我哦~"
          />
          <view class="search-icon" @click="onClick">
            <img src="@/static/images/search.png" alt="" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
	import { getHistoryAPI } from '@/services/home'
	export default {
		data() {
			return {
				value: '', // 绑定输入框的值
				distanceFromTop: 0
			};
		},
		onLoad(options) {
			// 获取屏幕边界到安全区域的一个距离
			const sysInfo = uni.getSystemInfoSync()
			this.distanceFromTop = sysInfo.safeAreaInsets.top
			// 获取AI问答历史数据
			// this.getHistory()
		},
		methods: {
		  // 获取AI问答历史数据
		  // getHistory: async function() {
		  //   const res = await getHistoryAPI();
		  //   console.log(res);
		  // },
		  goToHistory(){
			 uni.navigateTo({ url: '/subpkg/history/history' });
		  },
      // 输入框
      onClick(){
        console.log(1)
      }
		}
	}
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column; /* 垂直方向排列子元素 */
  height: calc(100vh - 10rpx); /* 视口高度减去 .top 的高度 */
}

.top {
  display: flex;
  height: 74rpx;
  text-align: center;
  align-items: center;
  
  img {
    height: 52rpx;
    width: 52rpx;
    margin-left: 42rpx;
    margin-right: 14rpx;
  }
  
  p {
    font-size: 48rpx;
    font-weight: 900;
    letter-spacing: 0px;
    line-height: 74rpx;
    color: rgba(0, 0, 0, 1);
    text-align: left;
    vertical-align: top;
  }
}

.content {
  position: relative; /* 设置相对定位 */
  flex: 1;
  margin-left: 32rpx;
  margin-right: 32rpx;
  padding-top: 42rpx;
  opacity: 1;
  border-radius: 32px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="rgba(58, 207, 120, 0.16)" font-size="80px" font-weight="900" letter-spacing="0px" line-height="118.4px" font-family="Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif">耕农千问</text></svg>') center/contain no-repeat; /* 将SVG作为背景图片 */
  background-color: rgba(17,156,75,0.08);
  box-shadow: 0px -1px 5px rgba(88, 99, 255, 0.1);
  .dialogue {
    display: inline-block;
    padding: 10px 20px;
    border-radius: 20px;
    max-width: 70%; /* 对话框最大宽度 */
    margin-bottom: 10px;
    clear: both;
  }
  
  .iAsk {
    float: right; /* iAsk 浮动到右边 */
    background-color: rgba(58,207,120,0.96); /* iAsk 背景色 */
  }
  .aiTalk {
    float: left; /* aiTalk 浮动到左边 */
    background-color: rgba(255,255,255,1); /* aiTalk 背景色 */
  }
  .dialogue span {
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0px;
    line-height: 19.89px;
    color: rgba(255, 255, 255, 1);
    vertical-align: top;
  }
  .aiTalk span{
    color: rgba(0, 0, 0, 1);
  }
  .bottom{
    display: flex;
    position: absolute; // 使用绝对定位
    bottom: 0; // 将搜索框定位到容器的底部
    .ButtonLeft {
      margin-left: 22rpx;
      margin-bottom: 18rpx;
      height: 76rpx;
      width: 76rpx;
      opacity: 1;
      background: rgba(60, 199, 118, 0.17);
      border-radius: 50%; /* 圆形框 */
      display: flex;
      justify-content: center; /* 水平居中 */
      align-items: center; /* 垂直居中 */
    }
    .ButtonMiddle {
      margin-left: 22rpx;
      margin-bottom: 18rpx;
      height: 76rpx;
      width: 76rpx;
      opacity: 1;
      background: rgba(60, 199, 118, 0.17);
      border-radius: 50%; /* 圆形框 */
      display: flex;
      justify-content: center; /* 水平居中 */
      align-items: center; /* 垂直居中 */
 	  }
    .input::placeholder {
      font-size: 14px;
      font-weight: 400;
      letter-spacing: 0px;
      line-height: 18.56px;
      color: rgba(1, 148, 62, 0.51);
      text-align: left;
      vertical-align: top;
    }
    .search{
      margin-right: 0;
      display: flex;
      width: 450rpx;
      flex: 1; /* 占据剩余空间 */
     input {
       flex: 1; /* 占据剩余空间 */
       padding: 12rpx; /* 内边距 */
       border-radius: 40rpx; /* 圆角 */
       outline: none; /* 去除输入框点击时的边框阴影 */
       background: rgba(60, 199, 118, 0.17);
       padding-left: 26rpx;
     }
     .search-icon {
       position: absolute; /* 绝对定位 */
       right: 12rpx; /* 距离右侧 12px */
       top: 50%; /* 垂直居中 */
       transform: translateY(-50%); /* 垂直居中 */
       cursor: pointer; /* 设置鼠标指针为手型 */
      img{
        margin-right: 10rpx;
        margin-bottom: 5rpx;
        width: 35rpx;
        height: 30rpx;
      }
     }
    }
  }
}
</style>