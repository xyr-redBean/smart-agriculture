<!--  1 -->
<template>
  <view class="container" :style="{ paddingTop: distanceFromTop + 'px' }">
    <view class="top">
      <img src="@/static/images/logo.png" alt="" />
      <p>耕农千问</p>
    </view>
    <view class="content" :class="{ 'Background': history.length <= 0 }">
      <view v-if="history.length>0" class="talking">
        <view v-for="(dialogue, index) in history" :key="index">
          <view class="dialogue iAsk">
            <span>{{dialogue.ask}}</span>
          </view>
          <view class="dialogue aiTalk">
            <span>{{dialogue.answer}}</span>
          </view>
        </view>
      </view>
      <view class="bottom">
        <view class="ButtonLeft" @click="goToHistory">
          <u-icon class="clock" name="clock" color='green'></u-icon>
        </view>
        <view class="ButtonMiddle">
          <u-icon class="circle" name="plus-circle-fill" color='green'></u-icon>
        </view>
        <view class="search" style="margin-left: 15rpx;margin-right: 0;">
          <input class="input" v-model="value_ask" placeholder="有什么问题尽管问我哦~" />
          <view class="search-icon" @click="onClick">
            <img src="@/static/images/search.png" alt="" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    getAnswerAPI
  } from '@/services/home'
  export default {
    data() {
      return {
        value_ask: '', // 绑定输入框的值
        history: [],
        keyword: '',
        distanceFromTop: 0,
        dialoguesAns: [], // 聊天ai回答,用来过渡
      };
    },
    onLoad(options) {
      // 获取屏幕边界到安全区域的一个距离
      const sysInfo = uni.getSystemInfoSync()
      this.distanceFromTop = sysInfo.safeAreaInsets.top
      // 获取AI问答历史数据
      // this.getHistory()
    },
    methods: {
      // 获取AI问答
      getAnswer: async function() {
        const res = await getAnswerAPI();
        // 处理响应，并存储到dialoguesAns数组中
        const answer = {
          answer: res.answer, // 假设响应中有一个字段叫做answer，存储AI的回答
          id: 1
        };
        this.dialoguesAns.push(answer); // 将AI的回答存储到dialoguesAns数组中
      },
      goToHistory() {
        uni.navigateTo({
          url: '/subpkg/history/history'
        });
      },
      // 发送消息
      async onClick() {
        // 检查输入框内容是否为空
        if (!this.value_ask.trim()) {
          return; // 如果为空，直接返回，不执行后续的操作
        }
        const currentTime = new Date(); // 获取当前时间
        const month = currentTime.getMonth() + 1; // 获取月份
        const day = currentTime.getDate(); // 获取日期
        const hours = currentTime.getHours(); // 获取小时
        const minutes = currentTime.getMinutes(); // 获取分钟
        // 构建时间字符串，月份补零，日期不补零
        const formattedTime = `${month < 10 ? `0${month}` : month}月${day}日 ${hours}:${minutes}`;

        await this.getAnswer();
        const question = {
          ask: this.value_ask, // 获取输入框中的内容
          ask_time: formattedTime, // 存储当前时间
          answer: this.dialoguesAns[0].answer, // 存储AI的回答，若无回答则为空字符串
          id: this.dialoguesAns[0].id // 存储AI的回答的ID，若无回答则为null
        };

        // 将对话记录推入 history 数组中
        this.history.push(question);
        this.dialoguesAns = [], // 清空数组
          // 清空输入框
          this.value_ask = '';
        // 调用回答函数，之后修改得考虑传递参数--问的问题进去，先暂时不管
        console.log(this.history)
      }
    }
  }
</script>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    /* 垂直方向排列子元素 */
    height: calc(100vh - 10rpx);
    /* 视口高度减去 .top 的高度 */
  }

  .top {
    display: flex;
    height: 74rpx;
    text-align: center;
    align-items: center;

    img {
      height: 52rpx;
      width: 52rpx;
      margin-left: 42rpx;
      margin-right: 14rpx;
    }

    p {
      font-size: 48rpx;
      font-weight: 900;
      letter-spacing: 0px;
      line-height: 74rpx;
      color: rgba(0, 0, 0, 1);
      text-align: left;
      vertical-align: top;
    }
  }

  .content {
    &.Background {
      background: rgba(17, 156, 75, 0.08) url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="rgba(58, 207, 120, 0.16)" font-size="80px" font-weight="900" letter-spacing="0px" line-height="118.4px" font-family="Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif">耕农千问</text></svg>') center/contain no-repeat !important;
    }

    position: relative;
    /* 设置相对定位 */
    flex: 1;
    margin-left: 32rpx;
    margin-right: 32rpx;
    padding-top: 42rpx;
    opacity: 1;
    border-radius: 32px;
    background-color: rgba(17, 156, 75, 0.08);
    box-shadow: 0px -1px 5px rgba(88, 99, 255, 0.1);

    .dialogue {
      display: inline-block;
      padding: 10px 20px;
      border-radius: 20px;
      max-width: 70%;
      /* 对话框最大宽度 */
      margin-bottom: 10px;
      clear: both;
    }

    .iAsk {
      float: right;
      /* iAsk 浮动到右边 */
      background-color: rgba(58, 207, 120, 0.96);
      /* iAsk 背景色 */
    }

    .aiTalk {
      float: left;
      /* aiTalk 浮动到左边 */
      background-color: rgba(255, 255, 255, 1);
      /* aiTalk 背景色 */
    }

    .dialogue span {
      font-size: 15px;
      font-weight: 500;
      letter-spacing: 0px;
      line-height: 19.89px;
      color: rgba(255, 255, 255, 1);
      vertical-align: top;
    }

    .aiTalk span {
      color: rgba(0, 0, 0, 1);
    }

    .bottom {
      display: flex;
      position: absolute; // 使用绝对定位
      bottom: 0; // 将搜索框定位到容器的底部

      .ButtonLeft {
        margin-left: 22rpx;
        margin-bottom: 18rpx;
        height: 76rpx;
        width: 76rpx;
        opacity: 1;
        background: rgba(60, 199, 118, 0.17);
        border-radius: 50%;
        /* 圆形框 */
        display: flex;
        justify-content: center;
        /* 水平居中 */
        align-items: center;
        /* 垂直居中 */
      }

      .ButtonMiddle {
        margin-left: 22rpx;
        margin-bottom: 18rpx;
        height: 76rpx;
        width: 76rpx;
        opacity: 1;
        background: rgba(60, 199, 118, 0.17);
        border-radius: 50%;
        /* 圆形框 */
        display: flex;
        justify-content: center;
        /* 水平居中 */
        align-items: center;
        /* 垂直居中 */
      }

      .search {
        display: flex;
        flex: 1;
        /* 占据剩余空间 */
        margin-bottom: 18rpx;
        height: 76rpx;
        width: 470rpx;
        border-radius: 40rpx;
        /* 圆角 */
        outline: none;
        /* 去除输入框点击时的边框阴影 */
        background: rgba(60, 199, 118, 0.17);

        // 输入框
        .input {
          height: 76rpx;
          min-height: 70rpx;
          flex: 1;
          /* 占据剩余空间 */
          padding-left: 26rpx;
        }

        // 图片
        .search-icon {
          display: flex;
          justify-content: center;
          /* 水平居中 */
          align-items: center;
          /* 垂直居中 */
          margin-top: 5rpx;
          margin-right: 15rpx;

          img {
            width: 35rpx;
            height: 30rpx;
          }
        }
      }
    }
  }
</style>


<!--     .search-icon {
       position: absolute; /* 绝对定位 */
       right: 12rpx; /* 距离右侧 12px */
       top: 50%; /* 垂直居中 */
       transform: translateY(-50%); /* 垂直居中 */
       cursor: pointer; /* 设置鼠标指针为手型 */
      img{
        margin-right: 10rpx;
        margin-bottom: 5rpx;
        width: 35rpx;
        height: 30rpx;
      }
     } -->

<!--     .input::placeholder {
       font-size: 14px;
       font-weight: 400;
       letter-spacing: 0px;
       line-height: 18.56px;
       color: rgba(1, 148, 62, 0.51);
       text-align: left;
       vertical-align: top;
     }   -->

<!--     // 输入框
     input {
       height: 76rpx;
       min-height: 70rpx;
       flex: 1; /* 占据剩余空间 */
       padding: 12rpx; /* 内边距 */
       border-radius: 40rpx; /* 圆角 */
       outline: none; /* 去除输入框点击时的边框阴影 */
       background: rgba(60, 199, 118, 0.17);
       padding-left: 26rpx;
     } -->