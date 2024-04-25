<template>
	<view class="container">
		<view class="panel" v-if="token">
			<view class="panel-list-item" v-for="(item, index) in panelList" :key="item.id" @click="logout(item)">
				<text>{{ item.type }}</text>
				<view class="arrow">
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
			</view>
		</view>
		<view class="panel" v-else>
			<view class="panel-list-item">
				<text>我要反馈</text>
				<view class="arrow">
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import store from '@/store/store.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	
	export default {
		data() {
			return {
				panelList: [
					{id: 1, type: "我要反馈"},
					{id: 2, type: "退出当前帐号"},
				]
			};
		},
		computed: {
			...mapState('m_user', ['token'])
		},
		methods: {
			...mapMutations('m_user', ['updateUserInfo', 'updateToken']),
			async logout(item) {
				if(item.id === 2){
					const [err, succ] = await uni.showModal({
						title: '提示',
						content: '确认退出登录吗？'
					}).catch(err => err)
								
					if (succ && succ.confirm) {
						this.updateUserInfo({})
						this.updateToken('')
					}
				}
			}
		}
	}
</script>

<style lang="scss">
page {
	height: 100%;
	background: linear-gradient(180deg, rgba(1, 232, 21, 0.2) 0.07%, rgba(79, 255, 158, 0) 55.38%);
}

.panel{
	background-color: white;
	border-radius: 30rpx;
	margin: 40rpx;
	padding: 0 10rpx;
	
	.panel-list-item{
		position: relative;
		display: flex;
		align-items: center;
		font-size: 30rpx;
		padding: 0 20rpx;
		line-height: 120rpx;
		border-bottom: 2rpx solid #F4F4F4;
		
		.arrow{
			position: absolute;
			right: 8rpx;
		}
	}
}
</style>
