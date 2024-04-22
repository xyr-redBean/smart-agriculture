<template>
	<view class="container2">
		<view class="top2">
			<image src="https://img.js.design/assets/smartFill/img328164da748e08.jpeg" class="avatar2" />
			<view class="name2">王博士</view>
		</view>
		<view class="center">
			<view class="university2">陕西农业大学</view>
			<view class="introduction">简介：著名灌溉专家</view>
		</view>
		<view class="button2">立即咨询</view>
	</view>
</template>

<script>
	export default {
		name:"expert-recommend",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.container2{
	position: relative; /* 添加相对定位 */
	overflow: visible; /* 设置溢出为可见 */
	width: 265rpx;
	height: 225rpx;
	border-radius: 9.08px;
	background: rgba(255, 255, 255, 1);
	margin: 30rpx 20rpx;
	.top2{
		display: flex;
		position: relative; /* 添加相对定位 */
		overflow: visible; /* 设置溢出为可见 */
		.avatar2{
			width: 49.96px;
			height: 49.96px;
			border-radius: 50%;
			position: absolute; /* 添加绝对定位 */
			top: -40%; /* 将盒子的上方超出父盒子的 40% */
			margin: 0 20rpx;
		}
		.name2{
			display: flex;
			align-items: center;
			height: 60rpx;
			font-size: 35rpx;
			font-weight: 500;
			color: rgba(34, 34, 34, 1);
			margin-left: 140rpx;
		}
	}
	.center{
		display: flex;
		flex-direction: column;
		height: 100rpx;
		margin: 20rpx;
		.university2{
			font-size: 28rpx;
			line-height: 70rpx;
			color: rgba(96, 102, 114, 1);
		}
		.introduction{
			font-size: 22rpx;
			color: rgba(96, 102, 114, 1);
		}
	}
	.button2{
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		width: 95.37px;
		height: 25.43px;
		border-radius: 12.72px;
		background: linear-gradient(225deg, rgba(58, 207, 120, 1) 0%, rgba(134, 217, 169, 1) 100%);
		box-shadow: 0px 1.82px 15.44px  rgba(86, 240, 127, 0.47);
		position: absolute; /* 添加绝对定位 */
		bottom: -12px; /* 将盒子的下方超出父盒子的下方 50% */
		left: 50%; /* 将盒子水平居中 */
		transform: translateX(-50%); /* 调整位置使其居中 */
	}
}
</style>