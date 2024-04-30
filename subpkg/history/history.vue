<template>
  <view class="chat-container">
    <view class="chat-header">
      <view class="year-month-selector">
        <picker @change="onChangeYearMonth" :value="selectedYearMonthIndex" mode="selector" :range="yearMonths">
          <view class="picker-item">{{ yearMonths[selectedYearMonthIndex] }}</view>
        </picker>
      </view>
      <view @click="confirmDelete" class="delete">
        <img src="@/static/images/回收站.png" alt="Delete" />
      </view>
    </view>
    <view class="chat-message">
      <view class="message" v-for="(message, index) in selected_history" :key="index">
        <view class="message-wrapper">
          <view class="additional-box"></view>
          <view class="circular"></view>
          <view class="message-box">
            <view class="message-text">{{ message.ask }}</view>
            <view class="message-time">{{ message.ask_time }}</view>
          </view>
        </view>
      </view>
      <view class="end">
        <view class="end-message" v-if="selected_history.length > 0">已经到底了</view>
        <view class="empty-message" v-if="selected_history.length === 0">
          <text>暂时还没有记录</text>
        </view>
        <view class="ToAddPage" @click="ToAdd"></view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    getHistoryAPI
  } from '@/services/history'
  export default {
    data() {
      return {
        selected_year: 2024, // 选择的年份
        selected_month: 4, // 选择的月份
        distanceFromTop: 0,
        historyTalk: [], // 历史聊天信息
        selected_history: [], // 对应日期的历史聊天记录
        newMessage: '',
        yearMonths: this.generateYearMonthArray(), // 年月组合数组
        selectedYearMonthIndex: 0, // 默认选中的年月索引
      }
    },
    onLoad() {
      // 获取历史记录
      this.fetchHistory();

      // 获取屏幕边界到安全区域的一个距离
      const sysInfo = uni.getSystemInfoSync()
      this.distanceFromTop = sysInfo.safeAreaInsets.top

      // 设置默认日期为当前日期
      const currentDate = new Date();
      this.selected_year = currentDate.getFullYear();
      this.selected_month = currentDate.getMonth() + 1;

      // 找到默认日期在 yearMonths 数组中的索引
      const defaultIndex = this.yearMonths.findIndex(month => {
        const [year, monthStr] = month.split("年");
        const currentYear = parseInt(year);
        const currentMonth = parseInt(monthStr.split("月")[0]);
        return currentYear === this.selected_year && currentMonth === this.selected_month;
      });

      if (defaultIndex !== -1) {
        this.selectedYearMonthIndex = defaultIndex;
      }
    },
    methods: {
      // 弹出确认删除弹窗
      confirmDelete() {
        uni.showModal({
          title: '确认删除',
          content: '确定要删除选定的历史记录吗？',
          success: (res) => {
            if (res.confirm) {
              // 用户点击确定删除
              this.clearSelectedHistory();
            }
          }
        });
      },
      // 清空选定的历史记录
      clearSelectedHistory() {
        // 清空selected_history
        this.selected_history = [];
        // 清空historyTalk中对应日期的数据
        const selectedYearMonthString =
          `${this.selected_year}-${this.selected_month < 10 ? '0' + this.selected_month : this.selected_month}`;
        this.historyTalk = this.historyTalk.filter(item => {
          const itemYearMonth = item.ask_time.substring(0, 7); // 提取历史记录中的年份和月份
          return itemYearMonth !== selectedYearMonthString;
        });
      },
      // 筛选历史记录
      filterSleHistory() {
        const selectedYearMonthString =
          `${this.selected_year}-${this.selected_month < 10 ? '0' + this.selected_month : this.selected_month}`;
        this.selected_history = this.historyTalk.filter(item => {
          const itemYearMonth = item.ask_time.substring(0, 7); // 提取历史记录中的年份和月份
          return itemYearMonth === selectedYearMonthString;
        });
      },
      // 时间选择器
      onChangeYearMonth(event) {
        this.selectedYearMonthIndex = event.mp.detail.value;
        const selectedYearMonth = this.yearMonths[this.selectedYearMonthIndex];
        console.log(`选中的年月: ${selectedYearMonth}`);
        // 提取年份和月份
        this.selected_year = selectedYearMonth.split("年")[0];
        this.selected_month = selectedYearMonth.split("年")[1].split("月")[0];
        console.log(`选中的年份: ${this.selected_year}`);
        console.log(`选中的月份: ${this.selected_month}`);
        // 根据选择的年份和月份筛选历史记录
        this.filterSleHistory();
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
      // 获取历史信息函数
      async fetchHistory() {
        try {
          // 调用接口获取历史记录数据
          const response = await getHistoryAPI();
          // 将数据存储到 historyTalk 中
          this.historyTalk = response.HISTORY;
          // 数据获取完成后再调用筛选方法
          this.filterSleHistory();
        } catch (error) {
          console.error('Error fetching history:', error);
        }
      },
      // 增添问答
      ToAdd(){
        console.log(1),
        uni.switchTab({ // 针对tabBar页面跳转
          url: '/pages/home/home'
        });
      }
    }
  }
</script>

<style lang="scss">
  page {
  	height: 100%;
  	background: linear-gradient(180deg, rgba(1, 232, 21, 0.2) 0.07%, rgba(79, 255, 158, 0) 55.38%);
    background-attachment: fixed; // 将背景设为固定
  }
  .chat-container {
    left: -14rpx;
    top: -10.7rpx;
    width: 782rpx;
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

  .end {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* 水平居中 */
    justify-content: center;
    /* 垂直居中 */
  }

  .end-message,
  .empty-message {
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

  // 跳转（新增问答）
  .ToAddPage {
    position: absolute;
    /* 设置绝对定位 */
    top: calc(100% + 150rpx);
    right: 100rpx;
    /* 靠右排列 */
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-image: url("@/static/images/add.png");
    background-size: contain;
    /* 自适应大小 */
    background-repeat: no-repeat;
    /* 不重复 */
  }

  .message-box {
    display: flex;
    margin-right: 48rpx;
    margin-left: 50rpx;
    padding-left: 46rpx;
    padding-right: 46rpx;
    flex-direction: column;
    justify-content: center;
    /* 垂直居中 */
    margin-top: 44rpx;
    height: 120rpx;
    width: 590rpx;
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
      white-space: nowrap;
      /* 文本不换行 */
      overflow: hidden;
      /* 超出部分隐藏 */
      text-overflow: ellipsis;
      /* 超出部分显示省略号 */
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

  .message-wrapper {
    display: flex;
    align-items: center;
    position: relative;
    /* 添加相对定位 */
    margin-left: 34rpx;

    /* 调整为与.additional-box的宽度一致 */
    // border-left: 0.96px solid rgba(199, 199, 199, 1);
    .additional-box {
      position: absolute;
      left: 17rpx;
      height: 200rpx;
      width: 3rpx;
      background-color: rgba(199, 199, 199, 1);
    }

    .circular {
      position: absolute;
      height: 34rpx;
      width: 34rpx;
      border-radius: 50%;
      background-color: #3ACF78;
    }
  }
</style>