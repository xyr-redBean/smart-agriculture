<template>
	<view class="viewport">
	    <view class="logo">
	      <image
	        src="@/static/images/logoGreen.jpg"
	      ></image>
	    </view>
		<view class="title">
		  <image
		    src="@/static/images/耕农千问.png"
		  ></image>
		</view>
	    <view class="login">
	      <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">
	        微信一键登录
	      </button>
		  <view>
			<radio-group>
				<label class="radio"><radio value="r2" /></label>
			</radio-group>
		  	<view class="agreement">
		  		我们的服务依赖于微信登录，请阅读并同意
				<view class="file">
					“用户登录指引协议”
				</view>
		  	</view>
		  </view>
		</view>
	</view>
</template>

<script>
	import store from '@/store/store.js'
	import {
		mapMutations,
		mapState
	} from 'vuex'
	
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			...mapMutations('m_user', ['updateToken', 'updateUserInfo', 'updateRedirectInfo']),
			// 用户授权之后，获取用户的基本信息
			getUserInfo(e) {
				if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')
		
				console.log(e.detail.userInfo)
				this.updateUserInfo(e.detail.userInfo)
		
				this.getToken(e.detail)
			},
			async getToken(info) {
				// 获取 code 对应的值
				const [err, res] = await uni.login().catch(err => err)
		
				if (err || res.errMsg !== 'login:ok') return uni.$showMsg('登录失败！')
		
				// 准备参数
				const query = {
					code: res.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature
				}
		
				// 发送请求,获取用户的微信登录信息
		
				// 直接把 token 保存到 vuex 中
				// this.updateToken()
				
				// 页面跳转，跳转到首页
				this.gotoHome()
			},
			gotoHome() {
			    console.log(123)
				// why?跳转不了
				uni.navigateTo({
				  url: '/pages/home/home'
				});
			},
		}
	}
</script>

<style lang="scss">
page {
  height: 100%;
  background-color: #fff;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20rpx 40rpx;
}

.logo {
  // flex: 1;
  text-align: center;
  image {
    width: 220rpx;
    height: 220rpx;
    margin-top: 12vh;	
  }
}

.title{
	text-align: center;
	image{
		width: 220rpx;
		height: 82rpx;
		margin-bottom: 12vh;
	}
}

.login {
  display: flex;
  flex-direction: column;
  height: 60vh;
  padding: 40rpx 20rpx 20rpx;

  .btn-login {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80rpx;
    font-size: 28rpx;
	color: #fff;
    border-radius: 10rpx;
	background-color: #41D07C   
  }
  
  .agreement{
	font-size: 22rpx;
	line-height: 34rpx;
	color: rgba(166, 166, 166, 1);
	
	.file{
	  font-size: 22rpx;
	  line-height: 34rpx;
	  text-decoration-line: underline;
	  color: rgba(56, 56, 56, 1);
	}
  }
}
</style>