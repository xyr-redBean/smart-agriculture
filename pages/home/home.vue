<!-- 有个小问题就是写着写着发现咱们这个页面是不是得考虑下不同设备-->
<!-- 如果需要的话，那我明天再改一改，不过上午有点事情，得拖到下午估计
还有就是这个字体（耕农千问）和图片，找不到它那种，就暂时随便选了种 
然后就暂时写了这点
-->

<template>
	<view class="container" :style="{ paddingTop: distanceFromTop + 'px' }">
		<view class="Top">
		  <view class="logo"><img src="static/images/logo.png"></view>
		  <p>耕农千问</p>
		</view>
		<view class="QandA">
		<view class="BottomRow">
            <view class="ButtonLeft">左侧</view>
            <view class="ButtonMiddle">中间</view>
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
			console.log(this.distanceFromTop)
			console.log(this.distanceFromTop)
			console.log(this.distanceFromTop)
			console.log(this.distanceFromTop)
			this.getHistory()
		},
		methods: {
		  getHistory: async function() {
		    const res = await getHistoryAPI();
		    console.log(res);
		  }
		}
	}
</script>

<style lang="scss">
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
.QandA{
  position: relative; // 设置相对定位
  margin-top: 13px;
  margin-left: 16px;
  width: 343px;
  height: 622px;
  background-color: rgba(17, 156, 75, 0.08);
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" 
        width="100%" height="100%"><text x="50%" y="50%" dominant-baseline="middle" 
        text-anchor="middle" fill="rgba(58, 207, 120, 0.16)" font-size="80px" font-weight="900" 
        letter-spacing="0px" line-height="118.4px" font-family="Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif">
        耕农千问</text></svg>');// 添加背景字
  background-repeat: no-repeat;
  background-position: center center;
  .BottomRow{
    display: flex;
    align-items: center;
    background-color: rgba(17, 156, 75, 0.08);
    position: absolute; // 使用绝对定位
    bottom: 0; // 将搜索框定位到容器的底部
    .ButtonLeft {
    	padding: 10px; // 根据需要调整内边距
    	background-color: rgba(58, 207, 120, 0.16); // 设置按钮背景颜色
    	color: white; // 设置文字颜色
    	text-align: center; // 文字居中
    	// ...其他样式
    }
    .ButtonMiddle {
    	padding: 10px; // 根据需要调整内边距
    	background-color: rgba(58, 207, 120, 0.16); // 设置按钮背景颜色
    	color: white; // 设置文字颜色
    	text-align: center; // 文字居中
    	// ...其他样式
  	}
    .Search{
      flex-grow: 1; // 让搜索框占据剩余空间
      background-color: rgba(17, 156, 75, 0.08); // 设置搜索框背景颜色
    }
  }
}
</style>