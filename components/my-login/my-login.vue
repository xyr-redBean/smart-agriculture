<template>
	<view class="container">
		<!-- 导航栏 -->
		<view class="navigation">
			<view class="title">
				耕农千问
			</view>
		</view>
		<!-- 头像昵称区域 -->
		<view class="personalInfo">
			<image src="@/static/images/default-avatar.jpg" class="avatar" />
			<view class="container2">
			  <view class="tag">点击登录</view>
			</view>
	    </view>
		<!-- 面板区域 -->
			<view class="panel-list">
				<!-- 第1个面板 -->
				<view class="panel">
					<view class="panel-title">
						<view class="order">
							专家咨询订单
						</view>
						<view class="all">
							全部
							<uni-icons type="arrowright" size="10"></uni-icons>
						</view>
					</view>
					<view class="panel-body">
						<view class="panel-item" v-for="(item, index) in panelList1" :key="item.id">
							<uni-icons :type="item.icon" size="30"></uni-icons>
							<text>{{ item.type }}</text>
						</view>
					</view>
				</view>
		
				<!-- 第2个面板 -->
				<view class="panel">
					<view class="panel-list-item" v-for="(item, index) in panelList2" :key="item.id">
						<view class="ahead">
							<uni-icons custom-prefix="iconfont" :type="item.icon" size="21" color="#3ACF78" style="margin-right: 25rpx;"></uni-icons>
							<text>{{ item.type }}</text>
						</view>
						<uni-icons type="arrowright" size="15"></uni-icons>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-login",
		data() {
			return {
				distanceFromTop: 0,
				panelList1: [
					{id: 1, icon: "wallet", type: "待付款"},
					{id: 2, icon: "chatboxes", type: "待回复"},
					{id: 3, icon: "chat", type: "待评价"},
					{id: 4, icon: "headphones", type: "退款/售后"}
				],
				panelList2: [
					{id: 1, icon: "icon-jungongguanli", type: "设置"},
					{id: 2, icon: "icon-questionprompt", type: "常见问题"}
				]
			}
		},
	}
</script>

<style lang="scss">
page {
	height: 100%;
	background: linear-gradient(180deg, rgba(15, 255, 79, 0.18) 0.07%, rgba(79, 255, 158, 0) 75.38%);
}
.container {
	height: 100%;
	.navigation{
		display: flex;
		justify-content: center;
		.title{
			font-size: 35rpx;
			line-height: 80rpx;
			font-weight: 500;
		}
	}
	.personalInfo {
		display: flex;
		height: 200rpx;
		align-items: center;
		.avatar {
			width: 130rpx;
			height: 130rpx;
			border-radius: 50%;
			box-shadow: 0rpx 0rpx 10rpx -4rpx rgba(0, 0, 0, 0.25);
			margin: 20rpx;
		}
		.container2 {
			.tag {
				font-size: 40rpx;
				font-weight: 500;
				color: rgba(0, 0, 0, 0.8);
			}
		}
	}
	.panel-list {
		padding: 0 20rpx;
		position: relative;
		top: -20rpx;
	
		.panel {
			background-color: white;
			border-radius: 30rpx;
			margin-bottom: 60rpx;
			margin-top: 40rpx;
			padding: 0 10rpx;
	
			.panel-title{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-left: 20rpx;			
				border-bottom: 2rpx solid #F4F4F4;
				.order{
					line-height: 90rpx;
					font-size: 30rpx;
				}
				.all{
					font-size: 24rpx;
					color: rgba(163, 163, 163, 1);
				}
			}
	
			.panel-body {
				display: flex;
				justify-content: space-around;
	
				.panel-item {
					position: relative;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;
					padding: 20rpx 0;
					font-size: 26rpx;
				}
			}
		}
	}
	
	.panel-list-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 30rpx;
		padding: 0 20rpx;
		line-height: 90rpx;
	}
}
</style>