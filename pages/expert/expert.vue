<template>
	<view class="viewport" :style="{ paddingTop: distanceFromTop + 'px' }">
	    <!-- 自定义导航栏 -->
	    <view class="top">
	      <img src="@/static/images/logo.png">
	      <p>耕农千问</p>
		 <view style="width: 240rpx" @click="gotoSearch">
		 	 <u-search placeholder="查询专家" v-model="keyword" height="60" bgColor="#DFDFDF" :showAction="flase"></u-search>
		 </view>
	    </view>

		<!-- 轮播图 -->
		<view style="margin: 20rpx;">
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
		<view class="recommend">
			<view class="topic">
				<view class="title">专家推荐</view>
				<view class="more">
					查看全部
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
			</view>
			<scroll-view
			  scroll-x
			  class="scroll-view-x"
			>
			  <view class="experts-list">
				<expert-recommend></expert-recommend>
			  </view>
			</scroll-view>
		</view>
		
		<!-- 热门门类 -->
		<view class="hot-categories">
			<!-- 热门选项 -->
			<view class="tabs">
			  <text
				v-for="(item, index) in subTypes"
				:key="item.type"
				class="text"
				:class="{ active: index === activeIndex }"
				@tap="activeIndex = index"
				>{{ item.title }}</text
			  >
			</view>
			<!-- 专家列表 -->
			<scroll-view
			  v-for="(item, index) in subTypes"
			  :key="item.type"
			  v-show="activeIndex === index"
			  scroll-y
			  class="scroll-view-y"
			>
			  <view class="experts">
				<expert-category></expert-category>
			  </view>
			  <view class="loading-text">
				{{ item.finish ? '没有更多数据了~' : '正在加载...' }}
			  </view>
			</scroll-view>
		</view>
		   
	</view>
</template>

<script>
	export default {
		data() {
			return {
				distanceFromTop: 0,
				keyword: '',
				// 轮播图图片
				list1: [
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				],
				// 热门问题分类
				subTypes: [
				  { type: '1', title: '热门门类' },
				  { type: '2', title: '作物种植' },
				  { type: '3', title: '土壤管理' },
				  { type: '4', title: '农业机械' },
				],
				// 高亮的下标
				activeIndex: 0
			};
		},
		onLoad(options) {
			// 获取屏幕边界到安全区域的一个距离
			const sysInfo = uni.getSystemInfoSync()
			this.distanceFromTop = sysInfo.safeAreaInsets.top
		},
		methods: {
			// 跳转到搜索页
			gotoSearch() {
				console.log(111)
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
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
	line-height: 74rpx;
	color: rgba(0, 0, 0, 1);
	margin-right: 10rpx;
  }
}

.hot-categories{
	.tabs {
	  display: flex;
	  justify-content: space-evenly;
	  height: 100rpx;
	  line-height: 90rpx;
	  font-size: 30rpx;
	  color: rgba(140, 140, 140, 1);
	  position: relative;
	  z-index: 9;
	  .text {
	    margin: 0 20rpx;
	    position: relative;
	  }
	  .active {
		  font-size: 35rpx;
		color: black;
	    &::after {
	      content: '';
	      width: 40rpx;
	      height: 4rpx;
	      transform: translate(-50%);
	      background-color: rgba(58,207,120,0.96);
	      position: absolute;
	      left: 50%;
	      bottom: 24rpx;
	    }
	  }
	}
	.scroll-view-y{
		.loading-text {
		  text-align: center;
		  font-size: 28rpx;
		  color: #666;
		  padding: 20rpx 0 50rpx;
		}
	}
}
.recommend{
	.topic{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 80rpx;
		width: 700rpx;
		margin: 0 30rpx;
		.title{
			font-size: 38rpx;
			font-weight: 500;
			color: rgba(0, 0, 0, 1);
		}
		.more{
			font-size: 27rpx;
			color: rgba(140, 140, 140, 1);
		}
	}
	.scroll-view-x{
		height: 280rpx;
		.experts-list{
			
		}
	}
}
</style>