<!-- 这个页面主要就是时间弹层没弄好，还有个左边那竖着的装饰，没啥想法，弄个循环？ -->
<template>
  <view class="chat-container">
    <view class="chat-header">
      <view class="year-month-selector">
        <picker @change="onChangeYearMonth" :value="selectedYearMonthIndex" mode="selector" :range="yearMonths">
          <view class="picker-item">{{ yearMonths[selectedYearMonthIndex] }}</view>
        </picker>
      </view>
      <view class="delete">
        <img src="@/static/images/回收站.png" alt="Delete" />
      </view>
    </view>
    <view class="chat-message">
      <view class="message" v-for="(message, index) in messages" :key="message.id">
        <view class="message-box">
          <view class="message-text">{{ message.text }}</view>
          <view class="message-time">{{ message.time }}</view>
        </view>
      </view>
      <view class="end-message" v-if="messages.length > 0">已经到底了</view>
      <view class="empty-message" v-if="messages.length === 0">
        <text>暂时还没有记录</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        newMessage: '',
        messages: [{
            id: 1,
            text: "为什么现在一年四季的天气这么奇怪？",
            time: "2023年7月11日 21:09"
          },
          {
            id: 2,
            text: "为什么现在一年四季的天气这么aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa奇怪？",
            time: "2023年7月10日 10:08"
          },
          {
            id: 3,
            text: "为什么现在一年四季的天气这么奇怪？",
            time: "2023年7月8日 21:09"
          },
          {
            id: 4,
            text: "为什么现在一年四季的天气这么奇怪？",
            time: "2023年7月3日 13:25"
          },
          {
            id: 5,
            text: "为什么现在一年四季的天气这么奇怪？",
            time: "2023年7月1日 09:08"
          }
        ],
        yearMonths: this.generateYearMonthArray(), // 年月组合数组
        selectedYearMonthIndex: 0, // 默认选中的年月索引
      }
    },
    computed: {

    },
    methods: {
      onChangeYearMonth(event) {
        this.selectedYearMonthIndex = event.mp.detail.value;
        const selectedYearMonth = this.yearMonths[this.selectedYearMonthIndex];
        console.log(`选中的年月: ${selectedYearMonth}`);
      },
      generateYearMonthArray() {
        const years = Array.from({
          length: 20
        }, (_, i) => i + 2020); // 从 2020 年开始的年份数组
        const months = Array.from({
          length: 12
        }, (_, i) => i + 1); // 1 到 12 的月份数组
        const yearMonths = [];
        years.forEach((year) => {
          months.forEach((month) => {
            yearMonths.push(`${year}年${month}月`);
          });
        });
        return yearMonths;
      },
    }
  }
</script>

<style lang="scss">
  .chat-container {
    left: -7px;
    top: -5.35px;
    width: 782rpx;
    opacity: 1;
    background: linear-gradient(180deg, rgba(15, 255, 79, 0.18) 0.07%, rgba(79, 255, 158, 0) 75.38%);
  }

  .chat-header {
    display: flex;
    justify-content: space-between;
    margin-left: 32rpx;
    margin-right: 32rpx;
    height: 62rpx;
  }

  .chat-header .year-month-selector {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 232rpx;
    height: 62rpx;
    opacity: 1;
    border-radius: 101.92px;
    background: rgba(255, 255, 255, 1);
  }

  .chat-header .delete img {
    margin-right: 25rpx;
    width: 43rpx;
    height: 43rpx;
  }

  .chat-message {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .end-message, .empty-message {
    margin-top: 90px;
    /** 文本1 */
    font-size: 11.54px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 23.08px;
    color: rgba(153, 153, 153, 1);
    text-align: left;
    vertical-align: top;
  }
.message-box {
  display: flex;
  margin-left: 104rpx;
  padding-left: 46rpx;
  padding-right: 46rpx;
  flex-direction: column;
  justify-content: center; /* 垂直居中 */
  margin-top: 44rpx;
  height: 120rpx;
  width: 616rpx;
  opacity: 1;
  border-radius: 19rpx;
  background: rgba(255, 255, 255, 1);

  .message-text {
    font-size: 15.38px;
    font-weight: 500;
    letter-spacing: 0px;
    line-height: 20.4px;
    color: rgba(51, 51, 51, 1);
    text-align: left;
    vertical-align: top;
    white-space: nowrap; /* 文本不换行 */
    overflow: hidden; /* 超出部分隐藏 */
    text-overflow: ellipsis; /* 超出部分显示省略号 */
  }

  .message-time {
    font-size: 11.54px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 15.3px;
    color: rgba(153, 153, 153, 1);
    text-align: left;
    vertical-align: top;
  }
}
</style>