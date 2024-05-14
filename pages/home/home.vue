<template>
  <view class="container" :style="{ paddingTop: distanceFromTop + 'px', height: windowHeight  + 'px'}">
    <view class="top">
      <img src="@/static/images/左上.png" alt="" />
    </view>

    <view class="content">

      <view v-if="history.length == 0" class="popup">
        <img class="pop-img" src="@/static/images/popup-image.png" alt="" />
        <view class="pop-content">
          <span>您好!我是</span><span class="special">耕农千问</span><span>,一个专门为解答农业问题而生的智慧农业助手。</span><br />
          <span>从土壤到育种,从预防病虫害到农机具的选型,无论您有任何问题,我都会尽力为您提供解答。</span>
          <view class="pop-botton">
            <button class="first-botton" @click="focusSearchInput">点击提问</button>
            <button class="second-botton" @click="toExpertAns">我的问题较为复杂，需要专家进行解答</button>
          </view>
        </view>
      </view>

      <view v-if="history.length == 0" class="BAckground" :class="{ 'Background': history.length <= 0 }">

      </view>

      <view v-if="history.length>0" class="talking">
        <scroll-view class="dialogue-container" scroll-y :style="{ maxHeight: MaxHeight + 'px'}">
          <view v-for="(dialogue, index) in history" :key="index">
            <view class="BOX">
              <view class="dialogue iAsk">
                <span>{{dialogue.ask}}</span>
              </view>
            </view>
            <view class="dialogue aiTalk">
              <span>{{dialogue.answer}}</span>
            </view>

            <view class="BBBOX">
              <view v-if="dialogue.img == 1" class="content-expert">
                <view class="experts" v-for="item in expertsCategory" :key="item.id">
                  <expert-category :dataProp="item" @navigate="handleNavigate"></expert-category>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>

      <view class="bottom">
        <view class="ButtonLeft" @click="goToHistory">
          <!-- <u-icon class="clock" name="clock" color='green'></u-icon> -->
          <image src="/static/images/时间2.png" class="clock">
        </view>
        <view class="ButtonMiddle" @click="addPage">
          <!-- <u-icon class="circle" name="plus-circle-fill" color='green'></u-icon> -->
          <image src="/static/images/添加.png" class="circle">
        </view>
        <view class="search" style="margin-left: 15rpx;margin-right: 0;">
          <input :focus='focusState' @blur='focusState = false' class="input" v-model="value_ask"
            :placeholder="placeHolder" placeholder-class="placeholder-style" />
          <view class="search-icon" @click="onClick">
            <img :src="isSearching ? '/static/images/loading.png' : '/static/images/search.png'" alt="" />
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
        // 专家信息
        expertsCategory: [{
          id: 1,
          name: "王博士"
        }],

        focusState: true, // 输入框
        isPopupVisible: true, // 控制弹窗的显示
        isProcessing: false, // 回答获取ing
        MaxHeight: 0,
        isSearching: false,
        placeHolder: "有什么问题尽管问我哦",
        value_ask: '',
        history: [], // 修改为存储问题和答案
        distanceFromTop: 0,
        windowHeight: 0,
        dialoguesAns: {
          answer: "默认回答",
          id: 0,
        },

      };
    },
    onLoad(options) {
      const sysInfo = uni.getSystemInfoSync()
      this.distanceFromTop = sysInfo.safeAreaInsets.top
      this.windowHeight = sysInfo.windowHeight
      this.MaxHeight = this.windowHeight - 150 * (sysInfo.windowWidth / 400)
      this.isPopupVisible = true
    },
    methods: {
      async getAnswer(ask_content) {
        try {
          this.isSearching = true;
          this.value_ask = '';
          this.placeHolder = "正在回答..."
          const res = await getAnswerAPI(ask_content);
          this.dialoguesAns.answer = res.data.content;
          this.dialoguesAns.id = res.data.requestId;
        } catch (error) {
          // 错误处理逻辑...
        } finally {
          this.isSearching = false;
          this.placeHolder = "有什么问题尽管问我哦";
          this.value_ask = '';
        }
      },
      goToHistory() {
        uni.navigateTo({
          url: '/subpkg/history/history'
        });
      },
      async addPage() {
        // 向后台传数据（暂时没写）
        this.history = [];
        this.dialoguesAns = [];
      },
      async onClick() {
        if (!this.value_ask.trim()) {
          return;
        }
        if (this.isProcessing) {
          return;
        }
        this.isProcessing = true;
        const asking_content = this.value_ask;
        const currentTime = new Date();
        const month = currentTime.getMonth() + 1;
        const day = currentTime.getDate();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const formattedTime = `${month < 10 ? `0${month}` : month}月${day}日 ${hours}:${minutes}`;
        // 将问题添加到历史记录中并立即显示
        const question = {
          ask: asking_content,
          ask_time: formattedTime,
          answer: '', // 初始化答案为空
          id: null, // 初始化 ID 为 null
          img: 0, // 默认是0
        };
        this.history.push(question);

        // 发送问题并等待答案
        await this.getAnswer(asking_content);

        // 将回答替换到历史记录中
        const lastQuestionIndex = this.history.length - 1;
        this.history[lastQuestionIndex].answer = this.dialoguesAns.answer;
        this.history[lastQuestionIndex].id = this.dialoguesAns.id;
        // 清空输入框
        if (!this.ifClick) {
          this.value_ask = '';
        }
        this.isProcessing = false;
      },
      // 点击提问获得输入框焦点
      focusSearchInput() {
        console.log("聚焦输入框方法被调用");
        this.$nextTick(() => {
          this.focusState = true
        })
      },

      // 我的问题比较复杂按钮
      toExpertAns() {
        const question = {
          ask: "我的问题较为复杂,需要专家进行解答",
          ask_time: 2024,
          answer: "好的,请先简短描述您的问题,我将据此为您推荐合适的专家", // 初始化答案为空
          id: null, // 初始化 ID 为 null
          img: 0, // 默认是0
        };
        this.history.push(question);
        const Question = {
          ask: "土壤肥力越来越差,我想让专家帮我调整我的土壤状况",
          ask_time: 2024,
          answer: "好的,根据您的要求,为您推荐中国农业大学的王博士", // 初始化答案为空
          id: null, // 初始化 ID 为 null
          img: 1, // 默认是0
        };
        this.history.push(Question);
      }

    }
  }
</script>



<style scoped lang="scss">
  // 静态部分-博士XX
  .content {
    .BBBOX{
      padding-right: 10rpx;
      margin-left: 10rpx;
    }
    .content-expert{
      padding-left: -10rpx;
    }
    .experts {
      display: inline-block;
      max-height: 250rpx;
      width: 100%;
      overflow: hidden;
      border-radius: 20rpx;
      /* 防止滚动 */
      /deep/ .container{
        margin: 0 0 0 0 !important;
        margin-left: 1rpx;
      }
      
    }
  }

  .hidden-input {
    position: absolute;
    opacity: 0;
    height: 10px;
    width: 100%;
    border: none;
  }

  .container {
    display: flex;
    flex-direction: column;
    /* 垂直方向排列子元素 */
    height: 100vh;
    padding-bottom: 18rpx;
  }

  .top {
    display: flex;
    height: 74rpx;
    text-align: center;
    align-items: center;
    margin-top: 5rpx;
    margin-bottom: 18rpx;

    img {
      height: 74rpx;
      width: 260rpx;
      margin-left: 42rpx;
      margin-right: 14rpx;
    }
  }

  .content {
    // &.Background {
    //   // background: rgba(17, 156, 75, 0.08) url('@/static/images/耕农千问 _green.png') center/contain no-repeat !important;
    //   background: rgba(17, 156, 75, 0.08) url('@/static/images/耕农千问 _green.png') bottom center/contain no-repeat;
    // }

    position: relative;
    /* 设置相对定位 */
    flex: 1;
    margin-left: 32rpx;
    margin-right: 32rpx;
    // padding-top: 42rpx;
    opacity: 1;
    border-radius: 32px;
    background-color: rgba(17, 156, 75, 0.08);
    box-shadow: 0px -1px 5px rgba(88, 99, 255, 0.1);
    overflow: hidden;

    .dialogue {
      display: inline-block;
      padding: 10px 20px;
      margin: 0 10rpx;
      border-radius: 20px;
      max-width: 70%;
      /* 对话框最大宽度 */
      margin-bottom: 10px;
      clear: both;
    }

    .BOX {
      padding-top: 12rpx;
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
        .clock {
          width: 32rpx;
          height: 32rpx;
        }
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
        .circle {
          width: 32rpx;
          height: 32rpx;
        }
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

        // 输入框提示词字体样式
        .placeholder-style {
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0px;
          line-height: 18.56px;
          color: rgba(1, 148, 62, 0.51);
          text-align: left;
          vertical-align: top;
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
            height: 35rpx;
          }
        }
      }
    }
  }

  // 弹窗部分
  .content {
    .popup {
      margin-left: 10rpx;
      margin-right: 10rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 15px;
      padding-bottom: 0;
      background-color: rgba(0, 0, 0, 0);
      border-radius: 50% 25%;
      text-align: center;

      .pop-img {
        width: 100px;
        height: 100px;
        margin-bottom: 15px;
      }

      .pop-content {
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        color: #333;
        background-color: white;
        border-radius: 60rpx;
        padding-top: 28rpx;
        padding-left: 28rpx;
        padding-right: 28rpx;
        text-align: left;

        .special {
          color: #10b981;
          font-weight: bold;
        }

        .pop-botton {
          display: flex;
          flex-direction: column;
          margin-top: 5px;
          margin-bottom: 30rpx;

          button {
            display: flex;
            justify-content: center;
            align-items: center;
            white-space: nowrap;
            width: 100%;
            height: 80rpx;
            cursor: pointer;
            margin-top: rpx;
            margin-top: 12rpx;
            border-radius: 30rpx;

            &.first-botton {
              background-color: #3acf78;
              color: white;
              font-size: 30rpx;
            }

            &.second-botton {
              background-color: #d9f6d9;
              color: #59cf86;
              font-size: 30rpx;
            }
          }
        }
      }
    }
  }

  .content {
    .BAckground {
      height: 250rpx;
      width: 100%;
      margin-top: 0;

      &.Background {
        // background: rgba(17, 156, 75, 0.08) url('@/static/images/耕农千问 _green.png') center/contain no-repeat !important;
        background: rgba(227, 238, 231, 1.0) url('@/static/images/耕农千问 _green.png') top center/contain no-repeat;
      }
    }
  }
</style>