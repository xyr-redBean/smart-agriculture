<template>
	<view>
		<my-userinfo v-if="token" :dataProp="expertsOrder"></my-userinfo>
		<my-login v-else></my-login>
	</view>
</template>

<script>
	import store from '@/store/store.js'
	import {
		mapState
	} from 'vuex'
	
	export default {
		data() {
			return {
				expertsOrder:null
			};
		},
		computed: {
			...mapState('m_user', ['token'])
		},
		onLoad() {
			// 调用获取专家咨询订单的函数
			this.getExpertsOrder()
		},
		methods: {
			getExpertsOrder(){
				// 发送请求，获取数据并储存在expertsOrder中
			}
		}
	}
</script>

<style lang="scss">

</style>
