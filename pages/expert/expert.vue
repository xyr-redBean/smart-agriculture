<template>
	<view class="viewport" :style="{ paddingTop: distanceFromTop + 'px' }">
	    <!-- 自定义导航栏 -->
	    <view class="top">
	      <img src="@/static/images/logo.png">
	      <p>耕农千问</p>
		  <u-search placeholder="查询专家" v-model="keyword" height="60" bgColor="#DFDFDF" :showAction="flase"></u-search>
	    </view>
	    <!-- 滚动容器 -->
	    <scroll-view
	      class="scroll-view" 
	      scroll-y
	    >
	      <template>
	        <!-- 轮播图 -->
	        <view style="margin: 10px;">
	        	<u-swiper
	        		:list="list1"
	        		indicator
	        		indicatorMode="line"
	        		circular
	        		radius="50"
					height="180"
	        	></u-swiper>
	        </view>
	        <!-- 专家推荐 -->
	        
	        <!-- 热门推荐 -->
	       
	      </template>
	    </scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				distanceFromTop: 0,
				keyword: '',
				list1: [
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				]
			};
		},
		onLoad(options) {
			// 获取屏幕边界到安全区域的一个距离
			const sysInfo = uni.getSystemInfoSync()
			this.distanceFromTop = sysInfo.safeAreaInsets.top
		}
	}
</script>

<style lang="scss">
.top {
  display: flex;
  height: 74rpx;
  text-align: center;
  align-items: center;
  margin-right: 95px;
  
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
</style>