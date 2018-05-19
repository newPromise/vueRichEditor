<template>
<div class="color-picker-wrapper">
  <div class="color-show-pineal">
    <div class="picker-color-show" :style="{backgroundColor: `#${activeColor}`}"></div>
    <div class="picker-color-hex"><span>#</span><input type="text" maxlength="6" v-model="activeColor" class="picker-color-input"></div>
  </div>
  <div class="color-picker">
    <div class="color-picker-line pure-color clearfix">
      <span class="color-span" @mouseover="whenMouseHover(bg)" @click="whenColorSelected(bg)" v-for="(bg, index) of pureColors" v-bind:key="index" :style="{backgroundColor: `#${bg}`}"></span>
    </div>
    <div class="color-picker-line pure-color">
      <span class="color-span" @mouseover="whenMouseHover('000000')" @click="whenColorSelected('000000')" v-for="(i, index) of 12" v-bind:key="index" style="background-color: #000000;"></span>
    </div>
    <div class="color-picker-colors mixin-colors">
      <div class="color-picker-upper">
        <div v-for="(colorItem, itemIndex) of upperPickerColors" v-bind:key="itemIndex">
          <div v-for="(seColor, index) of colorItem" v-bind:key="index">
            <span class="color-span" @click="whenColorSelected(spanColor)"  @mouseover="whenMouseHover(spanColor)" v-for="(spanColor, index) of seColor" v-bind:key="index" :style="{backgroundColor: `#${spanColor}`}"></span>
          </div>
        </div>
      </div>
      <div class="color-picker-lower">
        <div v-for="(colorItem, itemIndex) of lowerPickerColors" v-bind:key="itemIndex">
          <div v-for="(seColor, index) of colorItem" v-bind:key="index">
            <span class="color-span" @click="whenColorSelected(spanColor)" @mouseover="whenMouseHover(spanColor)" v-for="(spanColor, index) of seColor" v-bind:key="index" :style="{backgroundColor: `#${spanColor}`}"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      colors: ["00", "33", "66", "99", "CC", "FF"],
      spColors: ["FF0000", "00FF00", "0000FF", "FFFF00", "00FFFF", "FF00FF"],
      pureColors: [],
      upperPickerColors: [],
      lowerPickerColors: [],
      activeColor: ""
    };
  },
  created () {
    this.initColor();
  },
  methods: {
    initColor () {
      this.setPureColors();
      this.setPickerColors();
    },
    whenColorSelected (bg) {
      this.$emit("select-color", `#${bg}`);
    },
    // 设定面板纯色
    setPureColors () {
      const originPureColors = [...this.colors];
      for (let [index, color] of originPureColors.entries()) {
        originPureColors[index] = color.padEnd(6, color);
      }
      this.pureColors = [...originPureColors, ...this.spColors];
    },
    // 当鼠标移入的时候发生的动作
    whenMouseHover (nowBg) {
      this.activeColor = `${nowBg}`;
    },
    // 设定面板颜色
    setPickerColors () {
      const upperBaseColor = ["00", "33", "66"];
      const lowerBaseColor = ["99", "CC", "FF"];
      const setColorsArray = (baseColors) => {
        const nC = [];
        let divColors = [];
        let spanColors = [];
        for (let baseColor of baseColors) {
          divColors = [];
          for (let secondColor of this.colors) {
            spanColors = [];
            for (let thirdColor of this.colors) {
              let colorStyle = baseColor;
              colorStyle += `${thirdColor}${secondColor}`;
              spanColors.push(colorStyle);
            }
            divColors.push(spanColors);
          }
          nC.push(divColors);
        }
        return nC;
      };
      this.upperPickerColors = setColorsArray(upperBaseColor);
      this.lowerPickerColors = setColorsArray(lowerBaseColor);
    }
  }
};
</script>

<style scoped lang="less">
.color-picker {
  .color-show-pineal {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
    .picker-color-show, .picker-color-hex {
      height: 22px;
      border: 1px solid #e2e2e2;
      border-radius: 4px;
    }
    .picker-color-show {
      width: 44px;
    }
    .picker-color-input {
      float: left;
      height: 100%;
      width: 60px;
    }
    .picker-color-hex {
      margin-left: 20px;
      span {
        float: left;
        display: inline-block;
        width: 20px;
        text-align: center;
      }
    }
  }
  .color-span {
    width: 12px;
    height: 12px;
    border: 1px solid #000;
    margin: -1px 0 0 -1px;
    z-index: 10;
    float: left;
    &:hover {
      border: 1px solid white;
      cursor: pointer;
    }
  }
  .color-picker-line, .color-picker-colors {
    float: left;
    overflow: hidden;
  }
  .color-picker-line {
    display: flex;
    flex-direction: column;
  }
  .mixin-colors {
    .color-picker-upper, .color-picker-lower {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
