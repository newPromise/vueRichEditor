<template lang='html'>
  <div class="rich-editor">
      <div class="editor-toolbar">
          <div class="editor-font editor-format">
              <span class="font-head" @click="clickFontFormat">
                {{fontFormatNow}}
              </span>
              <div class="font-options" v-show="fontOptionsVisible">
                  <span @click="toggleFont(font)" v-for="(font, index) of allFonts" :value="font.name" :class="font.className" :key="index">{{font.name}}</span>
              </div>
          </div>
          <div class="edit-style editor-format">
               <button class="edit-btn" @click.capture="makeBold($event)">
                   <svg class="icon" v-bind:class="[ status.bold ? 'icon-click' : '' ]" width="20px" height="100%" line-height="100%" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#8a8a8a" d="M807.384615 374.153846c0-118.153846-94.523077-216.615385-206.76923-216.615384H275.692308c-21.661538 0-39.384615 17.723077-39.384616 39.384615v649.846154c0 21.661538 17.723077 39.384615 39.384616 39.384615h324.923077C712.861538 886.153846 807.384615 787.692308 807.384615 669.538462c0-57.107692-21.661538-108.307692-57.107692-147.692308 35.446154-39.384615 57.107692-90.584615 57.107692-147.692308zM600.615385 748.307692H374.153846v-157.538461h226.461539c37.415385 0 70.892308 37.415385 70.892307 78.769231s-33.476923 78.769231-70.892307 78.76923z m0-295.384615H374.153846v-157.538462h226.461539c37.415385 0 70.892308 37.415385 70.892307 78.769231s-33.476923 78.769231-70.892307 78.769231z" /></svg>
              </button>
              <button class="edit-btn" @click.stop="makeItalic">
                  <svg class="icon" v-bind:class="[ status.italic ? 'icon-click' : '' ]" width="20px" height="20px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#8a8a8a" d="M748.307692 242.215385V216.615385c0-21.661538-17.723077-39.384615-39.384615-39.384616H433.230769c-21.661538 0-39.384615 17.723077-39.384615 39.384616v39.384615c0 21.661538 17.723077 39.384615 39.384615 39.384615 33.476923 0 59.076923 31.507692 51.2 63.015385L413.538462 704.984615c-5.907692 25.6-27.569231 43.323077-51.2 43.323077H315.076923c-21.661538 0-39.384615 17.723077-39.384615 39.384616v39.384615c0 21.661538 17.723077 39.384615 39.384615 39.384615h275.692308c21.661538 0 39.384615-17.723077 39.384615-39.384615v-39.384615c0-21.661538-17.723077-39.384615-39.384615-39.384616-33.476923 0-59.076923-31.507692-51.2-63.015384L610.461538 338.707692c5.907692-25.6 27.569231-43.323077 51.2-43.323077h33.476924c29.538462 0 53.169231-23.630769 53.16923-53.16923z" /></svg>
              </button>
              <button class="edit-btn" @click.stop="makeUnderline">
                  <svg class="icon" v-bind:class="[ status.underline ? 'icon-click' : '' ]" width="20px" color="#369" height="20.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#8a8a8a" d="M92.23 888.663h830.613v69.22H92.23v-69.22z m0-830.611h357.717v54.425l-77.262 5.442-17.642 15.782v390.222c0 74.38 15.817 127.535 47.452 159.465 31.635 31.925 83.545 47.895 155.74 47.895 66.515 0 114.675-16.965 144.485-50.89 29.81-33.93 44.715-89.525 44.715-166.81V138.055l-18.86-19.047-79.695-6.53V58.052h282.889v54.425l-76.05 6.53-17.035 19.047v386.959c0 103.405-25.955 178.33-77.87 224.769-51.91 46.445-135.665 69.665-251.247 69.665-60.435 0-113.462-7.895-159.087-23.675-45.627-15.785-81.42-38.365-107.377-67.76-19.872-23.22-33.967-49.8-42.28-79.73-8.315-29.935-12.472-72.84-12.472-128.715V133.702l-17.642-15.782-78.477-5.442V58.052z"  /></svg>
              </button>
              <button class="edit-btn" @click.stop="makeDelete">
                  <svg class="icon" v-bind:class="[ status.delete ? 'icon-click' : '' ]" width="20px" height="20px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#8a8a8a" d="M238.276923 356.430769c-3.938462-19.692308-5.907692-43.323077-5.907692-66.953846 0-25.6 5.907692-55.138462 17.723077-82.707692 11.815385-29.538462 29.538462-57.107692 55.138461-80.738462 23.630769-23.630769 57.107692-45.292308 94.523077-61.046154 39.384615-15.753846 84.676923-25.6 139.815385-25.6 49.230769 0 96.492308 5.907692 141.784615 19.692308 35.446154 11.815385 68.923077 31.507692 98.461539 59.076923 11.815385 11.815385 11.815385 31.507692-1.969231 43.323077l-53.169231 49.230769c-11.815385 9.846154-29.538462 11.815385-41.353846 0-13.784615-13.784615-29.538462-25.6-47.261539-35.446154-27.569231-13.784615-59.076923-21.661538-96.492307-21.661538-33.476923 0-63.015385 3.938462-84.676923 13.784615s-41.353846 19.692308-55.138462 35.446154-23.630769 29.538462-29.538461 45.292308-7.876923 31.507692-7.876923 43.323077c0 21.661538 3.938462 39.384615 9.846153 55.138461 5.907692 13.784615-3.938462 27.569231-17.723077 27.569231h-96.492307c-9.846154 0-17.723077-9.846154-19.692308-17.723077zM785.723077 649.846154h-98.461539c-13.784615 0-23.630769 13.784615-17.723076 25.6 5.907692 11.815385 7.876923 27.569231 7.876923 43.323077 0 23.630769-5.907692 45.292308-15.753847 64.984615-11.815385 19.692308-25.6 33.476923-43.323076 47.261539-17.723077 11.815385-37.415385 21.661538-59.076924 27.56923-21.661538 5.907692-41.353846 9.846154-63.015384 9.846154-37.415385 0-72.861538-7.876923-106.338462-23.630769-25.6-11.815385-47.261538-27.569231-66.953846-49.230769-9.846154-11.815385-29.538462-13.784615-41.353846-3.938462l-55.138462 47.261539c-11.815385 9.846154-13.784615 29.538462-1.96923 41.353846 27.569231 31.507692 63.015385 55.138462 104.36923 70.892308 51.2 19.692308 106.338462 29.538462 165.415385 29.538461 43.323077 0 84.676923-5.907692 122.092308-19.692308 37.415385-11.815385 70.892308-31.507692 100.430769-55.138461 27.569231-23.630769 51.2-53.169231 66.953846-88.615385 15.753846-35.446154 25.6-72.861538 25.6-116.184615 0-15.753846 0-25.6-1.969231-39.384616-3.938462-3.938462-11.815385-11.815385-21.661538-11.815384z m196.923077-179.2c-3.938462-11.815385-15.753846-17.723077-27.569231-17.723077h-886.153846c-13.784615 0-23.630769 5.907692-27.569231 17.723077-1.969231 3.938462-1.969231 5.907692-1.969231 9.846154v59.076923c0 15.753846 13.784615 31.507692 29.538462 31.507692h886.153846c15.753846 0 29.538462-15.753846 29.538462-31.507692v-59.076923c0-3.938462 0-5.907692-1.969231-9.846154z" /></svg>
              </button>
          </div>
          <div class="edit-align editor-format">
              <button class="edit-btn" @click.stop="textLeft">
                  <svg class="icon" v-bind:class="[ status.left ? 'icon-click' : '' ]" width="20px" height="20px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#8a8a8a" d="M137.536 202.816v32.64c0 17.984 14.528 32.64 32.64 32.64h457.472a32.64 32.64 0 0 0 32.64-32.64v-32.64a32.64 32.64 0 0 0-32.64-32.64H170.368a32.832 32.832 0 0 0-32.832 32.64z m0.192 196.096v32.64c0 17.92 14.528 32.64 32.64 32.64h620.736a32.64 32.64 0 0 0 32.64-32.64v-32.64a32.64 32.64 0 0 0-32.64-32.64H170.368a32.448 32.448 0 0 0-32.64 32.64z m32.64 163.328a32.768 32.768 0 0 0-32.832 32.64v32.64c0 17.984 14.656 32.64 32.704 32.64h424.768a32.768 32.768 0 0 0 32.704-32.64v-32.64c0-17.92-14.656-32.64-32.704-32.64H170.368z m0 196.16a32.768 32.768 0 0 0-32.832 32.64v32.64c0 17.984 14.656 32.64 32.704 32.64h686.144a32.64 32.64 0 0 0 32.64-32.64v-32.64a32.64 32.64 0 0 0-32.64-32.64H170.368z"  /></svg>
              </button>
              <button class="edit-btn" @click.stop="textCenter">
                  <svg class="icon" v-bind:class="[ status.center ? 'icon-click' : '' ]" width="20px" height="20px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#8a8a8a" d="M743.765 170.24h-457.344c-18.027 0-32.64 14.613-32.64 32.64v32.64c0 18.112 14.656 32.64 32.64 32.64h457.472c18.027 0 32.64-14.613 32.64-32.64v-32.64c0-17.984-14.72-32.64-32.768-32.64zM825.493 366.336h-620.736c0 0 0 0 0 0-18.027 0-32.64 14.613-32.64 32.64v32.64c0 18.112 14.656 32.64 32.64 32.64h620.736c18.027 0 32.64-14.613 32.64-32.64v-32.64c0.001-0.096 0.002-0.209 0.002-0.322 0-17.85-14.47-32.32-32.32-32.32-0.113 0-0.226 0.001-0.339 0.002zM727.445 562.304h-424.768c-18.027 0-32.64 14.613-32.64 32.64v32.704c0 17.92 14.656 32.64 32.64 32.64h424.768c18.038-0.036 32.659-14.613 32.768-32.63v-32.714c0-17.92-14.72-32.64-32.768-32.64zM858.005 758.4h-686.016c-18.027 0-32.64 14.613-32.64 32.64v32.704c0 17.92 14.656 32.64 32.64 32.64h686.144c18.038-0.036 32.659-14.613 32.768-32.63v-32.714c-0.073-18.042-14.715-32.64-32.768-32.64-0.045 0-0.090 0-0.135 0z" /></svg>
              </button>
              <button class="edit-btn" @click.stop="textRight">
                  <svg class="icon" v-bind:class="[ status.right ? 'icon-click' : '']" width="20px" height="20px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#8a8a8a" d="M856.257 170.216H398.951c-18.128 0-32.63 14.667-32.63 32.63v32.63c0 18.127 14.667 32.63 32.63 32.63h457.471c18.127 0 32.63-14.667 32.63-32.63v-32.63c0-17.963-14.667-32.63-32.795-32.63z m0 196.105H235.474c-18.127 0-32.63 14.667-32.63 32.63v32.63c0 18.127 14.667 32.63 32.63 32.63h620.783c18.128 0 32.63-14.667 32.63-32.63v-32.63c0.164-18.127-14.502-32.63-32.63-32.63z m0 195.942H431.58c-17.963 0-32.63 14.667-32.63 32.63v32.63c0 17.963 14.667 32.63 32.63 32.63h424.841c17.963 0 32.63-14.667 32.63-32.63v-32.63c0-17.963-14.667-32.63-32.795-32.63z m0 196.105H170.215c-17.963 0-32.63 14.667-32.63 32.63v32.63c0 17.963 14.667 32.63 32.63 32.63h686.206c17.963 0 32.63-14.667 32.63-32.63v-32.63c0-17.963-14.667-32.63-32.795-32.63z"  /></svg>
              </button>
          </div>
          <div class="editor-format">
              <button class="edit-btn" @click.stop="addQuote">
                  <svg class="icon" width="20px" height="20px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#8a8a8a" d="M832 510.208H704c0-106.048 85.952-192 192-192 35.328 0 64-28.608 64-64 0-35.328-28.672-64-64-64-176.704 0-320 143.296-320 320v256c0 70.72 57.344 128 128 128h128c70.656 0 128-57.28 128-128v-128c0-70.72-57.344-128-128-128z m-448-192c35.328 0 64-28.608 64-64 0-35.328-28.672-64-64-64-176.704 0-320 143.296-320 320v256c0 70.72 57.28 128 128 128h128c70.72 0 128-57.28 128-128v-128c0-70.72-57.28-128-128-128H192c0-106.048 85.952-192 192-192z"  /></svg>
              </button>
              <button class="edit-btn" @click.stop="addCode">
                  <svg class="icon" width="20px" height="20px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#8a8a8a" d="M332.107776 298.66496c-22.177792-22.212608-58.148864-22.212608-80.318464 0L78.260224 472.185856c-22.203392 22.168576-22.203392 58.139648 0 80.309248l173.529088 173.559808c11.0848 11.067392 25.638912 16.626688 40.159232 16.626688s29.06624-5.56032 40.159232-16.626688c22.168576-22.185984 22.168576-58.148864 0-80.330752L198.719488 512.345088l133.388288-133.379072C354.276352 356.788224 354.276352 320.825344 332.107776 298.66496zM946.397184 472.185856 772.859904 298.66496c-22.177792-22.212608-58.140672-22.212608-80.309248 0-22.177792 22.160384-22.177792 58.123264 0 80.300032l133.379072 133.379072L692.550656 645.72416c-22.177792 22.181888-22.177792 58.144768 0 80.330752 11.083776 11.067392 25.621504 16.626688 40.150016 16.626688 14.52032 0 29.074432-5.56032 40.159232-16.626688l173.538304-173.559808C968.592384 530.326528 968.592384 494.354432 946.397184 472.185856zM598.665216 285.824c-29.27616-11.311104-62.152704 3.321856-73.404416 32.596992L391.593984 665.476096c-11.25888 29.284352 3.295232 62.117888 32.571392 73.411584 6.730752 2.57024 13.654016 3.811328 20.402176 3.811328 22.815744 0 44.32896-13.846528 53.009408-36.400128l133.676032-347.063296C642.504704 329.96864 627.914752 297.08288 598.665216 285.824z" /></svg>
              </button>
          </div>
      </div>
      <div class="editor-content" id="editor" ref="content"  @keyup.once="resetFirstPara" contentEditable="true">
      </div>
  </div>
</template>

<script>
import textAlign from './textAlign';
import tools from '../assets/js/tool.js';
export default {
  data () {
    return {
      allFonts: [
        {name: 'Normal', value: 'Normal', className: 'Normal'}
      ],
      fontCosTags: {
        Normal: 'span',
        Heading1: 'h1',
        Heading2: 'h2',
        Heading3: 'h3',
        Heading4: 'h4',
        Heading5: 'h5',
        Heading6: 'h6'
      },
      fontOptionsVisible: false,
      fontFormatNow: 'Normal',
      slectRange: "",
      status: {
          bold: false,
          italic: false,
          underline: false,
          delete: false,
          left: false,
          center: false,
          right: false,
          quote: false,
          code: false
      },
      editor: ""
    };
  },
  components: {
    textAlign
  },
  computed: {},
  mounted () {
    this.init();
  },
  methods: {
    init () {
        this.contentValue = this.$refs.content.innerHTML;
        this.editor = document.getElementsByClassName("editor-content")[0];
        this.initData();
    },
    initData () {
        for (let i = 1; i < 6; i++) {
            const obj = {
            name: `Heading${i}`,
            value: `h${i}`,
            className: `Heading${i}`
            };
            this.allFonts.push(obj);
        }
    },
    clickFontFormat () {
      this.fontOptionsVisible = !this.fontOptionsVisible;
    },
    toggleFont (font) {
        this.clickFontFormat();
        this.fontFormatNow = font.name;
        this.editor.focus();
        tools.command("formatBlock", font.value);
        this.setCaretBlockEnd();
    },
    // 加粗效果
    makeBold (event) {
        this.status.bold = !this.status.bold;
        document.getElementsByClassName("editor-content")[0].focus();      
        tools.command("bold");
    },
    // 斜体
    makeItalic () {
        this.status.italic = !this.status.italic;
        this.editor.focus();
        tools.command("italic");
    },
    // 下划线
    makeUnderline () {
        this.status.underline = !this.status.underline;
        this.editor.focus();
        tools.command("underline");
    },
    // 删除线
    makeDelete () {
        this.status.delete = !this.status.delete;
        this.editor.focus();
        tools.command("strikeThrough");
    },
    // 左对齐
    textLeft () {
        this.status.left = !this.status.left;
        this.editor.focus();
        tools.command("justifyLeft");
    },
    // 文字居中
    textCenter () {
        this.status.center = !this.status.center;
        this.editor.focus();
        tools.command("justifyCenter");
        console.log("center");
    },
    // 右对齐
    textRight () {
        this.status.right = !this.status.right;
        this.editor.focus();
        tools.command("justifyRight");
    },
    // 添加引用效果
    addQuote () {
        this.status.quote = !this.status.quote;
        this.editor.focus();
        if (this.status.quote) {
            tools.command("formatBlock", "BLOCKQUOTE");            
        } else {
            tools.command("formatBlock", "p");            
        }
    },
    // 添加代码片段
    addCode () {
        this.status.code = !this.status.code;
        this.editor.focus();
        if (this.status.code) {
            tools.command("formatBlock", "PRE");
        } else {
            tools.command("formatBlock", "p");
        }
    },
    // 将光标设置到元素的末尾
    setCaretBlockEnd() {
        const focusNode = tools.getSelector().select.focusNode;
        const offsetLen = focusNode.length;
        tools.setCaret(focusNode, offsetLen);
    },
    resetFirstPara() {
        const focusNode = tools.getSelector().select.focusNode;
        if (focusNode.nodeType === 3) {
            tools.command("formatBlock", "p");
        }
    },
    // 点击的时候的动作
    clickEditContent () {
        // if (selectNode.focusNode.nodeType === 3 && selectParentNode.getAttribute("id") === "editor") {
        //     const newNode = document.createElement("div");
        //     newNode.innerText = selectNode.focusNode.nodeValue;
        //     selectParentNode.replaceChild(newNode, selectParentNode.childNodes[0]);
        //     // tools.setCaret(document.getElementById("editor").childNodes[0], 1);
        // }
    //   const 
    //   console.log("select", tools.getSelector().select.);
    //   console.log(tools.command("bold", true));
    // //   console.log(document.getElementsByClassName('editor-content')[0].selectionStart);
    // //   console.log(tools.getSelectorRange().rect);
    // //   console.log("createdRange", window.getSelection().getRangeAt(0));
    // //   tools.getFocusPos();
    // //   tools.getSelection(document.getElementsByClassName('editor-content')[0]);//   const 
    //   console.log("select", tools.getSelector().select.);
    //   console.log(tools.command("bold", true));
    // //   console.log(document.getElementsByClassName('editor-content')[0].selectionStart);
    // //   console.log(tools.getSelectorRange().rect);
    // //   console.log("createdRange", window.getSelection().getRangeAt(0));
    // //   tools.getFocusPos();
    // //   tools.getSelection(document.getElementsByClassName('editor-content')[0]);
    },
    changeHeading (font) {
    },
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
    blockquote {
        border-left: 2px solid gray;
        padding-left: 12px;
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
        overflow-y: auto;
        padding: 12px 15px;
        text-align: left;
    }
    pre {
        background-color: lightgray;
    }
    .edit-btn {
        z-index: 3;
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        &:hover {
           .icon path {
               fill:#06c;
           }
        }
        .icon path {
            fill: black;
        }
        .icon-click path {
            fill: #06c;
        }
    }
}
</style>
