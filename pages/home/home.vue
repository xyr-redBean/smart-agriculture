<template>
	<view>
		<u-search placeholder="日照香炉生紫烟" v-model="keyword"></u-search>
	</view>
</template>

<script>
	import { getHistoryAPI } from '@/services/home'
	export default {
		data() {
			return {
				history: []
			};
		},
		onLoad(options) {
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

</style>
