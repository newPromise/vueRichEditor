<template>
 <div ref="screen" class="screen">
	 <slot></slot>
   <div class="danmaku-mask-wrapper">
     <div class="danmaku-mask" ref="mask">
       <transition v-for="(item, index) of damakuPool" :key="index" name="danmakuSlide">
         <span class="active" v-show="item.startSlide">{{ item.msg }}</span>
       </transition>
     </div>
   </div>
   <div class="danmaku-bar">
     <div class="danmaku-input-bar">
       <input class="danmaku-input" v-model="danmakuMsg">
       <div class="danmaku-lanuch-btn" @click="sendMsg">发送</div>
     </div>
   </div>
 </div>
</template>

<script type="text/ecmascript-6">
// import tools from "@/assets/js/tool";
export default {
  name: "bulletScreen",
  data () {
    return {
		  screenStyle: {
        width: "",
        height: ""
      },
      screenDom: null,
      danmakuMsg: "",
      damakuPool: [],
      baseTime: "",
      danmakuIndex: 0,
      slideTime: 0
    };
  },
  mounted () {
    // this.startSlide();
  },
  components: {
  },
  methods: {
    // 发送弹幕
    sendMsg () {
      if (this.danmakuMsg.trim()) {
        // document.getElementsByClassName("danmaku-mask")[0].innerHTML += `<span class="active">${this.danmakuMsg}</span>`;
        const timestamp = Date.parse(new Date());
        const msg = this.danmakuMsg;
        this.pushDamakuPool({ timestamp, msg, startSlide: false });
        this.danmakuMsg = "";
        this.scrollMsg();
      }
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
        this.damakuPool = this.sortByKey(this.damakuPool, "timestamp");
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
          console.log("damakuPool", this.damakuPool);
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
  height: 300px;
  margin: auto;
  background-color: black;
  opacity: 0.5;
  position: relative;
  .danmaku-mask-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    color: #ffffff;
  }
  .danmaku-mask {
    position: relative;
    width: 100%;
    height: 100%;
    .active {
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
      right: 500px;
    }
  }
  .danmaku-bar {
    bottom: 0px;
    background-color: gray;
    opacity: .6;
    width: 100%;
    .danmaku-input-bar {
      width: 80%;
      height: 40px;
      text-align: left;
    }
    .danmaku-input {
      background-color: lightblue;
      height: 100%;
      width: 80%;
      height: 40px;
      padding: 10px;
    }
    .danmaku-lanuch-btn {
      display: inline-block;
      background-color: #00a1d6;
      width: 60px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
