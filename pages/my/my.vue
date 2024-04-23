<template>
	<view :style="{ paddingTop: distanceFromTop + 'px' }">
		<my-userinfo></my-userinfo>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				distanceFromTop: 0,
			};
		},
		onLoad() {
			// 获取屏幕边界到安全区域的一个距离
			const sysInfo = uni.getSystemInfoSync()
			this.distanceFromTop = sysInfo.safeAreaInsets.top
		},
	}
</script>

<style lang="scss">

</style>
