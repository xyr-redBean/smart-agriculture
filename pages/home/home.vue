<!--  1 -->
<template>
  <view class="container">
    <view class="top">
      <img src="static/images/logo.png" alt="" />
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
        <view class="Search"><u-search placeholder="日照香炉生紫烟" v-model="keyword"></u-search></view>
      </view>
    </view>
  </view>
</template>

<script>
	import { getHistoryAPI } from '@/services/home'
	
	// 获取屏幕边界到安全区域的一个距离
	
	export default {
		data() {
			return {
				history: [],
				keyword: '',
				distanceFromTop: 0
			};
		},
		onLoad(options) {
			const sysInfo = uni.getSystemInfoSync()
			this.distanceFromTop = sysInfo.safeAreaInsets.top
			this.getHistory()
		},
		methods: {
		  getHistory: async function() {
		    const res = await getHistoryAPI();
		    console.log(res);
		  },
      goToHistory(){
         uni.navigateTo({ url: '/pages/history/history' });
      }
		}
	}
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column; /* 垂直方向排列子元素 */
  height: calc(100vh - 70rpx); /* 视口高度减去 .top 的高度 */
}

.top {
  display: flex;
  height: 74rpx;
  padding-top: 16rpx;
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
    .search{
      
    }
  }
}

</style>