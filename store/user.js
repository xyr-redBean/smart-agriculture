export default {
	// 开启命名空间
	namespaced: true,

	// 数据
	state: () => ({
		token: uni.getStorageSync('token') || ''
	}),

	// 方法
	mutations: {
		updateToken(state, token) {
			state.token = token
			this.commit('m_user/saveTokenToStorage')
		},
		saveTokenToStorage(state) {
			uni.setStorageSync('token', state.token)
		}
	},

	getters: {}
}