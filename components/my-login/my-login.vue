<template>
	<view class="container">
		<!-- 头像昵称区域 -->
		<view class="personalInfo">
			<image src="@/static/images/头像.png" class="avatar" />
			<view class="container2">
			  <view class="tag" @click="gotoLogin">点击登录</view>
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
							<image :src="`/static/images/${item.icon}.png`" class="icon1">
							<text>{{ item.type }}</text>
						</view>
					</view>
				</view>
		
				<!-- 第2个面板 -->
				<view class="panel">
					<view class="panel-list-item" v-for="(item, index) in panelList2" :key="item.id" @click="pageJump(item)">
						<image :src="`/static/images/${item.icon}.png`" class="icon2">
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
		name:"my-login",
		data() {
			return {
				distanceFromTop: 0,
				panelList1: [
					{id: 1, icon: "银行卡", type: "待付款"},
					{id: 2, icon: "沟通", type: "待回复"},
					{id: 3, icon: "信息", type: "待评价"},
					{id: 4, icon: "耳机", type: "退款/售后"}
				],
				panelList2: [
					{id: 1, icon: "设置", type: "设置"},
					{id: 2, icon: "帮助", type: "常见问题"}
				]
			}
		},
		methods: {
			gotoLogin(){
				uni.navigateTo({
				  url: '/pages/login/login'
				});
			},
			// 第二面板页面跳转
			pageJump(item){
				if (item.type === "设置") {
				    uni.navigateTo({
				      url: "/subpkg/settings/settings"
				    });
				} else if (item.type === "常见问题") {
				    uni.navigateTo({
				      url: "/subpkg/questions/questions"
				    });
				}
			}
		},
	}
</script>

<style lang="scss">
page {
	height: 100%;
	background: linear-gradient(180deg, rgba(1, 232, 21, 0.2) 0.07%, rgba(79, 255, 158, 0) 55.38%);
}
.container {
	.personalInfo {
		display: flex;
		height: 200rpx;
		align-items: center;
		.avatar {
			width: 130rpx;
			height: 130rpx;
			border-radius: 50%;
			box-shadow: 0rpx 0rpx 10rpx -4rpx rgba(0, 0, 0, 0.25);
			margin: 0 20rpx 0 30rpx;
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
			margin: 40rpx 10rpx 60rpx 10rpx;
			padding: 0 10rpx;
	
			.panel-title{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-left: 20rpx;			
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
					flex: 1;
					position: relative;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;
					padding: 20rpx 0;
					font-size: 26rpx;
					
					.icon1{
						width: 44rpx;
						height: 44rpx;
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
		line-height: 120rpx;
		border-bottom: 2rpx solid #F4F4F4;
		.icon2{
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