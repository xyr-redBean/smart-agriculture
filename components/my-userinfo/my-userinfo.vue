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
							<view class="panel-item">
								<uni-icons type="wallet" size="30"></uni-icons>
								<text>待付款</text>
							</view>
							<view class="panel-item">
								<uni-icons type="chatboxes" size="30"></uni-icons>
								<text>待回复</text>
							</view>
							<view class="panel-item">
								<uni-icons type="chat" size="30"></uni-icons>
								<text>待评价</text>
							</view>
							<view class="panel-item">
								<uni-icons type="headphones" size="30"></uni-icons>
								<text>退款/售后</text>
							</view>
						</view>
					</view>
			
					<!-- 第2个面板 -->
					<view class="panel">
						<view class="panel-list-item">
							<text>AI问答历史记录</text>
							<uni-icons type="arrowright" size="15"></uni-icons>
						</view>
						<view class="panel-list-item">
							<text>我的收藏</text>
							<uni-icons type="arrowright" size="15"></uni-icons>
						</view>
						<view class="panel-list-item">
							<text>设置</text>
							<uni-icons type="arrowright" size="15"></uni-icons>
						</view>
						<view class="panel-list-item" >
							<text>常见问题</text>
							<uni-icons type="arrowright" size="15"></uni-icons>
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
		height: 100px;
		align-items: center;
		.avatar {
			width: 65px;
			height: 65px;
			border-radius: 50%;
			box-shadow: 0px 0px 5px -2px rgba(0, 0, 0, 0.25);
			margin: 10px;
		}
		.container2 {
			.tag {
				font-size: 20px;
				font-weight: 500;
				color: rgba(0, 0, 0, 0.8);
			}
			.modify {
				font-size: 12px;
				line-height: 20px;
				color: rgba(130, 130, 130, 1);
			}
			
		}
	}
	.panel-list {
		padding: 0 10px;
		position: relative;
		top: -10px;
	
		.panel {
			background-color: white;
			border-radius: 15px;
			margin-bottom: 30px;
			margin-top: 20px;
			padding: 0 5px;
	
			.panel-title{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-left: 10px;			
				border-bottom: 1px solid #F4F4F4;
				.order{
					line-height: 45px;
					font-size: 15px;
				}
				.all{
					font-size: 12px;
					color: rgba(163, 163, 163, 1);
				}
			}
	
			.panel-body {
				display: flex;
				justify-content: space-around;
	
				.panel-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;
					padding: 10px 0;
					font-size: 13px;
				}
			}
		}
	}
	
	.panel-list-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 15px;
		padding: 0 10px;
		line-height: 45px;
	}
}
</style>