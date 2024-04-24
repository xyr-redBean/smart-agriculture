<template>
	<view class="container">
		<!-- 头像昵称区域 -->
		<view class="personalInfo">
			<image src="https://img.js.design/assets/smartFill/img328164da748e08.jpeg" class="avatar" />
			<view class="container2">
			  <text class="tag">张三</text>
			  <view class="modify">
				修改资料
				<uni-icons type="forward" size="12"></uni-icons>
			  </view>
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
							<view class="badge">
								<uni-badge class="uni-badge-left-margin" text="1" />
							</view>
							<uni-icons :type="item.icon" size="30"></uni-icons>
							<text>{{ item.type }}</text>
						</view>
						
					</view>
				</view>
		
				<!-- 第2个面板 -->
				<view class="panel">
					<view class="panel-list-item" v-for="(item, index) in panelList2" :key="item.id">
						<image :src="`/static/images/${item.icon}`" class="icon">
						<text>{{ item.type }}</text>
						<view class="arrow">
							<uni-icons type="arrowright" size="15"></uni-icons>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-userinfo",
		data() {
			return {
				panelList1: [
					{id: 1, icon: "wallet", type: "待付款"},
					{id: 2, icon: "chatboxes", type: "待回复"},
					{id: 3, icon: "chat", type: "待评价"},
					{id: 4, icon: "headphones", type: "退款/售后"}
				],
				panelList2: [
					{id: 1, icon: "时间.png", type: "AI问答历史记录"},
					{id: 2, icon: "星星.png", type: "我的收藏"},
					{id: 3, icon: "设置.png", type: "设置"},
					{id: 4, icon: "帮助.png", type: "常见问题"}
				]
			};
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
page {
	height: 100%;
	background: linear-gradient(180deg, rgba(1, 232, 21, 0.2) 0.07%, rgba(79, 255, 158, 0) 55.38%);
}
.container {
	height: 100%;
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
			.modify {
				font-size: 24rpx;
				line-height: 40rpx;
				color: rgba(130, 130, 130, 1);
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
					.badge{
						position: absolute;
						top: 8rpx;
						left: 52rpx;
					}
				}
			}
		}
	}
	
	.panel-list-item {
		position: relative;
		display: flex;
		align-items: center;
		font-size: 30rpx;
		padding: 0 20rpx;
		line-height: 90rpx;
		.icon{
			width: 44rpx;
			height: 44rpx;
			margin-right: 25rpx;
		}
		.arrow{
			position: absolute;
			right: 8rpx;
		}
	}
}
</style>