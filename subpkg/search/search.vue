<template>
	<view class="viewport" style="margin: 0 20rpx;">
		<!-- 搜素框 -->
		<view class="search-box">
			<uni-search-bar @input="input" :radius="100" cancelButton="none" bgColor="#DFDFDF"></uni-search-bar>
		</view>
	
		<!-- 搜索建议列表 -->
		<view class="sugg-list"  v-if="searchResults.length !== 0">
			<view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item)">
				<view class="experts-name">王博士</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
	
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<!-- 标题区域 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="clean"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="history-list">
				<uni-tag :text="item" v-for="(item, i) in histories" :key="i" @click="gotoDetail(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				distanceFromTop: 0,
				timer: null,
				kw: '',
				// 搜索的结果列表
				searchResults: [],
				// 搜索历史的数组
				historyList: ["王博士", "张教授"]
			};
		},
		onLoad() {
			// 获取屏幕边界到安全区域的一个距离
			const sysInfo = uni.getSystemInfoSync()
			this.distanceFromTop = sysInfo.safeAreaInsets.top
			// this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		},
		methods: {
			// input 输入事件的处理函数
			input(e) {
				clearTimeout(this.timer)

				this.timer = setTimeout(() => {
					this.kw = e.value
					this.getSearchList()
				}, 500)
			},
			async getSearchList() {
				// 判断搜索关键词是否为空
				if (this.kw.length === 0) {
					this.searchResults = []
					return
				}

				// 搜素关键词不为空，则发送请求，获得推荐列表

				// 将保存搜索历史记录
				this.saveSearchHistory()
			},
			saveSearchHistory() {
				const set = new Set(this.historyList)
				set.delete(this.kw)
				set.add(this.kw)

				this.historyList = Array.from(set)

				// 对搜索历史数据，进行持久化的存储
				uni.setStorageSync('kw', JSON.stringify(this.historyList))
			},
			// 去专家详情页
			gotoDetail(item) {
				uni.navigateTo({
					url: '/subpkg/experts_details/experts_details?experts_id=' + item.experts_id
				})
			},
			// 清空历史记录
			clean() {
				this.historyList = []
				uni.setStorageSync('kw', '[]')
			}
		},
		computed: {
			histories() {
				return [...this.historyList].reverse()
			}
		}
	}
</script>

<style lang="scss">
.search-box {
	position: sticky;
	top: 0;
	z-index: 999;
}

.sugg-list {
	padding: 0 10rpx;

	.sugg-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 24rpx;
		padding: 26rpx 0;
		border-bottom: 2rpx solid #efefef;

		.experts-name {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-right: 6rpx;
		}
	}
}

.history-box {
	padding: 0 10rpx;

	.history-title {
		display: flex;
		justify-content: space-between;
		height: 80rpx;
		align-items: center;
		font-size: 26rpx;
		border-bottom: 2rpx solid #efefef;
	}

	.history-list {
		display: flex;
		flex-wrap: wrap;

		.uni-tag {
			margin-top: 10rpx;
			margin-right: 10rpx;
		}
	}
}
</style>
