<template>
  <view class="chat-container">
   <view class="chat-header">
      <view class="year-month-selector">
        <picker @change="onChangeYearMonth" :value="selectedYearMonthIndex" mode="selector" :range="yearMonths">
          <view class="picker-item">{{ yearMonths[selectedYearMonthIndex] }}</view>
        </picker>
      </view>
      <view class="delete">
        <img src="static/images/回收站.png" alt="Delete" />
      </view>
    </view>
   <view class="chat-message">
     <view class="message" v-for="message in messages" :key="message.id">
       <view class="message-text">{{ message.text }}</view>
       <view class="message-time">{{ message.time }}</view>
     </view>
   </view>
  
  </view>
</template>

<script>
  export default {
    data() {
      return {
         newMessage: '',
         messages: [
           { id: 1, text: "为什么现在一年四季的天气这么奇怪？", time: "2023年7月11日 21:09" },
           { id: 2, text: "为什么现在一年四季的天气这么奇怪？", time: "2023年7月10日 10:08" },
           { id: 3, text: "为什么现在一年四季的天气这么奇怪？", time: "2023年7月8日 21:09" },
           { id: 4, text: "为什么现在一年四季的天气这么奇怪？", time: "2023年7月3日 13:25" },
           { id: 5, text: "为什么现在一年四季的天气这么奇怪？", time: "2023年7月1日 09:08" }
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
            const years = Array.from({ length: 20 }, (_, i) => i + 2020); // 从 2020 年开始的年份数组
            const months = Array.from({ length: 12 }, (_, i) => i + 1); // 1 到 12 的月份数组
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

<style>
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
  margin-right: 20rpx;
  width: 43rpx;
  height: 43rpx;
}
</style>