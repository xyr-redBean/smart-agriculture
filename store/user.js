export default {
	// 开启命名空间
	namespaced: true,

	// 数据
	state: () => ({
		// token: uni.getStorageSync('token') || '',
		token: 123456,
		// 用户的信息对象
		userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
	}),

	// 方法
	mutations: {
		updateToken(state, token) {
			state.token = token
			this.commit('m_user/saveTokenToStorage')
		},
		saveTokenToStorage(state) {
			uni.setStorageSync('token', state.token)
		},
		updateUserInfo(state, userinfo) {
			state.userinfo = userinfo		
			this.commit('m_user/saveUserInfoToStorage')
		},
		saveUserInfoToStorage(state) {
			uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
		},
	},

	getters: {}
}