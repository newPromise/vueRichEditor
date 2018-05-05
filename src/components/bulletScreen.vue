<template>
 <div ref="screen" class="screen">
   <div ref="content" class="danmaku-content">
     <slot></slot>
   </div>
   <div class="danmaku-mask-wrapper" ref="mask" :style="maskStyle">
     <div class="danmaku-mask">
       <transition-group tag="ul" name="danmakuSlide">
         <li  v-for="(item, index) of damakuPool" :key="index" class="active" v-if="item.startSlide" :style="[{ top: `${item.top}px` }, item.danmakuMsgStyle]">{{ item.msg }}</li>
       </transition-group>
     </div>
   </div>
   <div class="danmaku-bar">
     <div class="danmaku-font-picker">
       <span @click="toggleFontPicker">字体选择</span>
       <div class="font-picker-container" v-show="selectorPickerShow">
         <div class="font-picker-content">
           <div class="font-size-selector">
             <div class="selector-picker-title">字号</div>
             <div class="selector-picker-content">
               <span class="picker-font picker-font-small" :class="{'when-font-style-select' : (danmakuMsgStatus.fontStyle === 'small')}" @click="changeDanmakuFont('small')">小</span>
               <span class="picker-font picker-font-middle" :class="{'when-font-style-select' : (danmakuMsgStatus.fontStyle === 'middle')}" @click="changeDanmakuFont('middle')">中</span>
             </div>
           </div>
           <div class="font-color-selector">
             <div class="selector-picker-title">颜色</div>
             <div class="selector-picker-content"></div>
           </div>
         </div>
       </div>
     </div>
     <div class="danmaku-input-bar">
       <input class="danmaku-input" v-model="danmakuMsg"><div class="danmaku-lanuch-btn" @click="sendMsg">发送</div>
     </div>
   </div>
 </div>
</template>

<script type="text/ecmascript-6">
import tools from "@/assets/js/tool";
export default {
  name: "bulletScreen",
  data () {
    return {
		  maskStyle: {
        width: "",
        height: ""
      },
      danmakuMsgStyle: {
        color: "",
        fontSize: ""
      },
      danmakuMsgStatus: {
        fontStyle: ""
      },
      danmakuMsgFonts: {
        small: "12px",
        middle: "20px"
      },
      screenDom: null,
      danmakuMsg: "",
      damakuPool: [],
      baseTime: "",
      danmakuIndex: 0,
      slideTime: 0,
      selectorPickerShow: false
    };
  },
  mounted () {
    this.startSlide();
    this.initStyle();
  },
  components: {
  },
  methods: {
    initStyle () {
      this.maskStyle.height = tools.getStyles(this.$refs.content, "height");
      this.maskStyle.width = tools.getStyles(this.$refs.content, "width");
    },
    // 发送弹幕
    sendMsg () {
      if (this.danmakuMsg.trim()) {
        // document.getElementsByClassName("danmaku-mask")[0].innerHTML += `<span class="active">${this.danmakuMsg}</span>`;
        const timestamp = Date.parse(new Date());
        const msg = this.danmakuMsg;
        const top = Math.random() * this.maskStyle.height;
        const danmakuMsgStyle = Object.assign({}, this.danmakuMsgStyle);
        console.log("top", top);
        this.pushDamakuPool({ timestamp, msg, startSlide: false, top, danmakuMsgStyle });
        this.danmakuMsg = "";
        this.scrollMsg();
      }
    },
    changeDanmakuFont (fontStyle) {
      this.danmakuMsgStyle.fontSize = this.danmakuMsgFonts[fontStyle];
      this.danmakuMsgStatus.fontStyle = fontStyle;
    },
    // 切换显示的面板
    toggleFontPicker () {
      this.selectorPickerShow = !this.selectorPickerShow;
    },
    // 当前弹幕信息压入动画序列
    pushDamakuPool (instance) {
      this.damakuPool.push(instance);
    },
    // 跟据数组中对象的某一个key进行排序
    sortByKey (array, key) {
      const bubbleSort = (arr, key) => {
        const len = arr.length;
        for (let i = 0; i < len; i++) {
          for (let j = i + 1; j < len; j++) {
            if (arr[j][key] < arr[i][key]) {
              let t = arr[j];
              arr[j] = arr[i];
              arr[i] = t;
            }
          }
        }
        return arr;
      };
      return bubbleSort(array, key);
    },
    // 滚动弹幕
    scrollMsg () {
      if (this.damakuPool.length > 0) {
        let firstMsgTime = this.damakuPool[0].timestamp;
        console.log("第一个时间的time", firstMsgTime);
        if (firstMsgTime !== 0) {
          this.baseTime = firstMsgTime;
          this.damakuPool[0].timestamp = 0;
        }
        this.damakuPool.map((damakuInstance, instanceIndex) => instanceIndex !== 0 && (damakuInstance.timestamp = damakuInstance.timestamp - this.baseTime));
        // this.damakuPool = this.sortByKey(this.damakuPool, "timestamp");
        console.log("time now", this.damakuPool, "baseTime", this.baseTime);
        // document.getElementsByClassName("active")[0].style.right = "500px";
        this.danmakuIndex++;
      }
    },
    // 倒序排序函数
    reverseSortFn (value1, value2, sortKey = "timestamp") {
      if (value1[sortKey] < value2[sortKey]) {
        return 1;
      } else if (value1[sortKey] > value2[sortKey]) {
        return -1;
      } else {
        return 0;
      }
    },
    // 滚动函数
    startSlide () {
      this.slideTimer = setInterval(() => {
        if (this.damakuPool.length > 0) {
          this.slideTime += 1000;
          this.damakuPool.forEach(damaku => {
            if (!damaku.startSlide && damaku.timestamp <= this.slideTime) {
              damaku.startSlide = true;
            }
          });
          // this.damakuPool.every((item, index) => item.timestamp > this.slideTime);
        }
      }, 1000);
    }
  }
};
</script>

<style scoped lang="less">
.screen {
  width: 500px;
  margin: auto;
  opacity: 0.5;
  position: relative;
  border: 1px solid black;
  .danmaku-mask-wrapper {
    position: absolute;
    bottom: 40px;
    top: 0;
    left: 0;
    color: #ffffff;
  }
  .danmaku-mask {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .active {
      display: block;
      position: absolute;
      color: white;
      right: 500px;
      z-index: 3;
    }
    .danmakuSlide-enter-active, .danmakuSlide-leave-active {
      transition: right 10s ease-in-out;
    }
    .danmakuSlide-enter, .danmakuSlide-leave-to {
      right: 0px;
    }
    .danmakuSlide-enter-to {
      right: 600px;
    }
  }
  .danmaku-bar {
    bottom: 0px;
    width: 100%;
    height: 40px;
    border-top: 1px solid black;
    font-size: 12px;
    & > div {
      display: inline-block;
      float: left;
    }
    .danmaku-font-picker {
      width: 50px;
      height: 100%;
      line-height: 40px;
      cursor: pointer;
      .font-picker-container {
        position: absolute;
        background: hsla(0,0%,100%, 1);
        bottom: 40px;
        padding: 10px;
        z-index: 4;
        border-radius: 2px;
        .font-picker-content {
          width: 150px;
          height: 80px;
        }
      }
    }
    .font-size-selector, .font-color-selector {
      width: 100%;
      overflow: hidden;
      float: left;
      & > div {
        display: inline-block;
        float: left;
      }
      .selector-picker-title {
        width: 40px;
      }
      .selector-picker-content {
        padding-left: 10px;
      }
      .when-font-style-select {
        color: lightblue;
        border: 1px solid lightblue;
      }
      .picker-font {
        display: inline-block;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        margin-left: 10px;
        border-radius: 4px;
        &:hover {
          .when-font-style-select()
        }
      }
    }
    .danmaku-input-bar {
      width: 80%;
      height: 100%;
      text-align: left;
    }
    .danmaku-input {
      background-color: lightblue;
      height: 100%;
      width: 80%;
      padding: 10px;
    }
    .danmaku-lanuch-btn {
      display: inline-block;
      background-color: #00a1d6;
      width: 60px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
