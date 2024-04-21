<template>
	<view class="viewport" :style="{ paddingTop: distanceFromTop + 'px' }">
	    <!-- 自定义导航栏 -->
	    <view class="Top">
	      <view class="logo"><img src="@/static/images/logo.png"></view>
	      <p>耕农千问</p>
	    </view>
	    <!-- 滚动容器 -->
	    <scroll-view
	      class="scroll-view"
	      scroll-y
	    >
	      <template>
	        <!-- 自定义轮播图 -->
	        <view class="carousel">
	            <swiper :circular="true" :autoplay="false" :interval="3000" @change="onChange">
	              <swiper-item v-for="item in list" :key="item.id">
	                <navigator url="/pages/index/index" hover-class="none" class="navigator">
	                  <image mode="aspectFill" class="image" :src="item.imgUrl"></image>
	                </navigator>
	              </swiper-item>
	            </swiper>
	            <!-- 指示点 -->
	            <view class="indicator">
	              <text
	                v-for="(item, index) in list"
	                :key="item.id"
	                class="dot"
	                :class="{ active: index === activeIndex }"
	              ></text>
	            </view>
	        </view>
	        <!-- 分类面板 -->
	        
	        <!-- 热门推荐 -->
	        
	        <!-- 猜你喜欢 -->
	       
	      </template>
	    </scroll-view>
	  </view>
</template>

<script>
	export default {
		data() {
			return {
				distanceFromTop: 0
			};
		},
		onLoad(options) {
			const sysInfo = uni.getSystemInfoSync()
			this.distanceFromTop = sysInfo.safeAreaInsets.top
		},
	}
</script>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  overflow: hidden;
}

.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;
  .Top{
    display: flex;
    align-items: center;
    height: 37px;
    img{
      margin-left: 23.46px;
      margin-top: 5.5px;
      width: 26px;
      height: 26px;
      opacity: 1;
      border-radius: 50%; // 添加这个属性来设置圆角
    }
    p{
      // 字体待设置
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
      margin-left: 7px;
      font-size: 24px;
      font-weight: 900;
      letter-spacing: 0px;
      line-height: 37px;
      color: rgba(0, 0, 0, 1);
      text-align: left;
      vertical-align: top;    
    }
  }
  .scroll-view {
    flex: 1;
    overflow: hidden;
	template {
		.carousel {
		  height: 280rpx;
		  position: relative;
		  overflow: hidden;
		  transform: translateY(0);
		  background-color: #efefef;
		  .indicator {
		    position: absolute;
		    left: 0;
		    right: 0;
		    bottom: 16rpx;
		    display: flex;
		    justify-content: center;
		    .dot {
		      width: 30rpx;
		      height: 6rpx;
		      margin: 0 8rpx;
		      border-radius: 6rpx;
		      background-color: rgba(255, 255, 255, 0.4);
		    }
		    .active {
		      background-color: #fff;
		    }
		  }
		  .navigator,
		  .image {
		    width: 100%;
		    height: 100%;
		  }
		}
	}
  }
}

</style>
