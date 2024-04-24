<template>
	<view>
		专家详情页
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad(options) {
		  const extraParams = options // 获取传递的额外参数
		  // 使用额外参数发送请求，渲染页面
		  console.log(extraParams)
		}
	}
</script>

<style lang="scss">

</style>
