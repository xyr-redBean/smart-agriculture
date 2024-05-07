<template>
	<view class="viewport">
		<view class="tab">
			<view :style="{ height: distanceFromTop + 'px' }" >	</view>
			<!-- 自定义导航栏 -->
			<view class="top">
			  <img src="@/static/images/左上.png" alt="" />
			  <view style="width: 240rpx" @click="gotoSearch">
			 	 <u-search placeholder="查询专家" height="60" bgColor="#DFDFDF" :showAction="flase" :disabled="true"></u-search>
			  </view>
			</view>
		</view>

		<!-- 轮播图 -->
		<view style="margin: 0 30rpx; border-radius: 50rpx; overflow: hidden;">
			<u-swiper
				:list="list1"
				indicator
				indicatorMode="line"
				circular
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
			  <view style="display: flex;">
			  	<view class="experts-list" v-for="(item, index) in expertsRecommend" :key="item.id">
			  		<expert-recommend :dataProp="item" @navigate="handleNavigate"></expert-recommend>
			  	</view>
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
			  <view class="experts" v-for="item in expertsCategory" :key="item.id">
				<expert-category :dataProp="item" @navigate="handleNavigate"></expert-category>
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
				// 轮播图图片
				list1: [
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				],
				// 专家推荐数据
				expertsRecommend: [{id: 1, name: "王博士"}, {id: 2, name: "张教授"}, {id: 3, name: "李教授"}],
				// 热门问题分类
				subTypes: [
				  { type: '1', title: '热门门类', url: '' },//url为后端接口地址
				  { type: '2', title: '作物种植', url: '' },
				  { type: '3', title: '土壤管理', url: '' },
				  { type: '4', title: '农业机械', url: '' },
				],
				// 高亮的下标
				activeIndex: 0,
				// 专家分类列表数据
				expertsCategory: [{id: 1, name: "王博士"}, {id: 2, name: "张教授"}, {id: 3, name: "李教授"}]
			};
		},
		onLoad(options) {
			// 获取屏幕边界到安全区域的一个距离
			const sysInfo = uni.getSystemInfoSync()
			this.distanceFromTop = sysInfo.safeAreaInsets.top
			// 获取专家推荐数据
			this.getExpertsRecommendData()
			// 获取专家分类列表数据
			this.getExpertscategoryData()
		},
		methods: {
			// 跳转到搜索页
			gotoSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			},
			// 跳转到专家详情页
			handleNavigate({ pagePath, extraParams }) {
			    const query = Object.entries(extraParams).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&') // 构造查询参数字符串
			    const url = `${pagePath}?${query}` // 拼接带有额外参数的 URL
			    uni.navigateTo({ url }) // 使用uniapp的导航 API 进行页面跳转
			},
			// 获取专家推荐数据
			getExpertsRecommendData(){
				// 发送请求
			},		 
			// 获取专家分类列表数据
			getExpertscategoryData(){
				// 发送请求，携带subTypes数组元组中的 url参数
			}
		}
	}
</script>

<style lang="scss">	
.tab {
	// 设置定位效果为吸顶
	position: sticky;
	// 吸顶的位置
	top: 0;
	// 提高层级，防止被覆盖
	z-index: 999;
	background-color: #f5f5f5;
	
	.top {
	  display: flex;
	  height: 100rpx;
	  text-align: center;
	  align-items: center;
	  padding: 5rpx 0 20rpx 0;
	  	  
	  img {
		height: 74rpx;
		width: 260rpx;
		margin-left: 42rpx;
		margin-right: 14rpx;
	  }
	}
}	


.hot-categories{
	.tabs {
	  display: flex;
	  justify-content: space-evenly;
	  height: 110rpx;
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
		  font-weight: 600;
		  color: black;
	    &::after {
	      content: '';
	      width: 40rpx;
	      height: 4rpx;
	      transform: translate(-50%);
	      background-color: rgba(58,207,120,0.96);
	      position: absolute;
	      left: 50%;
	      bottom: 30rpx;
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
		margin: 20rpx 30rpx 0 30rpx;
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
		height: 300rpx;
		margin: 0 30rpx;
	}
}
</style>