<template lang='html'>
  <div class="rich-editor">
      <div class="editor-toolbar">
          <div class="editor-font editor-format">
              <span class="font-head" @click.stop="clickFontFormat">
                {{fontFormatNow}}
                <!-- <svg viewBox="0 0 18 18">
                  <polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"></polygon>
                  <polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"></polygon>
                </svg> -->
              </span>
              <div class="font-options" v-show="fontOptionsVisible">
                  <span @click="toggleFont(font.value)" v-for="(font, index) of allFonts" :value="font.name" :class="font.className" :key="index">{{font.value}}</span>
              </div>
          </div>
          <div class="edit-style editor-format">
              <button class="edit-btn">
                  <span>B</span>
              </button>
              <button class="edit-btn">
                  <span style="font-style: italic; text-transform:uppercase">I</span>
              </button>
              <button class="edit-btn">
                  <span style="text-decoration:underline">U</span>
              </button>
              <button class="edit-btn">
                  <span style="text-decoration:line-through">S</span>
              </button>
          </div>
      </div>
      <div class="editor-content" ref="content" @keyup.enter="toggleNewLine" @click.stop="clickEditContent" contentEditable="true">
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      allFonts: [
        {name: 'Normal', value: 'Normal', className: 'Normal'},
        {name: 'Heading1', value: 'Heading1', className: 'Heading1'},
        {name: 'Heading2', value: 'Heading2', className: 'Heading2'},
        {name: 'Heading3', value: 'Heading3', className: 'Heading3'},
        {name: 'Heading4', value: 'Heading4', className: 'Heading4'},
        {name: 'Heading5', value: 'Heading5', className: 'Heading5'},
        {name: 'Heading6', value: 'Heading6', className: 'Heading6'}
      ],
      fontCosTags: {
        Normal: 'div',
        Heading1: 'h1',
        Heading2: 'h2',
        Heading3: 'h3',
        Heading4: 'h4',
        Heading5: 'h5',
        Heading6: 'h6'
      },
      fontOptionsVisible: false,
      fontFormatNow: 'Normal'
    };
  },
  components: {},
  computed: {},
  mounted () {
    this.init();
  },
  methods: {
    init () {
      this.contentValue = this.$refs.content.innerHTML;
    },
    clickFontFormat () {
      this.fontOptionsVisible = !this.fontOptionsVisible;
    },
    toggleFont (font) {
      this.clickFontFormat();
      this.fontFormatNow = font;
      console.log('现在的位置', this.getSelectorRange());
      this.$refs.content.innerHTML = this.wrapTagsHtml(this.$refs.content.innerText, this.fontCosTags[this.fontFormatNow]);
      console.log('被包裹的元素', this.wrapTagsHtml(this.$refs.content.innerText, this.fontCosTags[this.fontFormatNow]));
    },
    // 点击的时候的动作
    clickEditContent () {
    },
    toggleNewLine () {
      this.contentValue = this.$refs.content.innerHTML;
    }
  }
};
</script>
<style lang="less">
.rich-editor {
    width: 100%;
    height: 300px;
    border: 1px solid black;
    .Heading1 {
        font-size: 2em;
    }
    .Heading2 {
        font-size: 1.5rem;
    }
    .Heading3 {
        font-size: 1.17rem;
    }
    .Heading4 {
        font-size: 1rem;
    }
    .Heading5 {
        font-size: 0.83em;
    }
    .Heading6 {
        font-size: 0.67em;
    }
    .editor-toolbar {
        text-align: center;
        padding: 10px;
        height: 50px;
        border-bottom: 1px solid black;
        & > div {
            display: inline-block;
            cursor: pointer;
        }
        .editor-font {
            position: relative;
        }
        .font-head {
            position: relative;
            & > svg {
                position: absolute;
                right: 0;
            }
        }
        .font-options {
            padding: 4px 8px;
            position: absolute;
            // width: 80px;
            z-index: 2;
            background-color: white;
            border: 1px solid gray;
            box-shadow: 0 2px 8px rgba(0,0,0,.2);
            & > span {
                width: 100%;
                height: 30px;
                display: inline-block;
                text-align: center;
                line-height: 30px;
                padding: 5px 0;
                &:hover {
                    color: #06c;
                }
            }
        }
        .font-head {
        }
        .editor-format {
            margin-bottom: 10px;
            margin-right: 15px;
            line-height: 30px;
        }
    }
    .editor-content {
        min-height: 200px;
        font-size: 20px;
        overflow-y: auto;
        padding: 12px 15px;
        text-align: left;
    }
    .edit-btn {
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        &:hover {
            color: #06c;
        }
    }
}
</style>
