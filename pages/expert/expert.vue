<template>
	<view class="viewport" :style="{ paddingTop: distanceFromTop + 'px' }">
	    <!-- 自定义导航栏 -->
	    <view class="Top">
	      <view class="logo"><img src="@/static/images/logo.png"></view>
	      <p>耕农千问</p>
		  <u-search placeholder="查询专家" v-model="keyword" height="60" width="50px" bgColor="#DFDFDF" :showAction="flase"></u-search>
	    </view>
	    <!-- 滚动容器 -->
	    <scroll-view
	      class="scroll-view" 
	      scroll-y
	    >
	      <template>
	        <!-- 轮播图 -->
	        <view style="width: 335px;">
	        	<u-swiper
	        		:list="list1"
	        		indicator
	        		indicatorMode="line"
	        		circular
	        		radius="30"
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

</style>
