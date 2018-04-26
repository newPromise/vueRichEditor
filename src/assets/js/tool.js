const tools = {
  selectObj: "",
  baseOffset: 0,
  extentOffset: 0,
  leftPosIndex: 0,
  rightPosIndex: 0,
  focusParentNode: "",
  selectData: ""
};

tools.getSelector = function (element) {
  let text;
  let range;
  let select;
  let rect;
  if (window.getSelection) {
    // 对于 window.getSelection 方法
    // 表示用户选择的文本范围或者光标位置
    select = window.getSelection();
    // document.execCommand("defaultParagraphSeparator", false, "");
    text = select.toString();
    range = select.getRangeAt(0).cloneRange();
    range.collapse(true);
    rect = range.getClientRects()[0];
    // range = select.getRangeAt(0);
  } else if (document.selection) {
    range = document.selection.createRange();
    text = range.text;
  }
  return {
    text,
    select,
    range,
    rect
  };
};

// 替换选中的文字
tools.getSelection = function (element) {
  this.selectObj = tools.getSelectorRange().select;
  if (this.selectObj.baseNode.parentElement === element) {
    this.baseOffset = this.selectObj.baseNode.baseOffset - 1;
    this.extentOffset = this.selectObj.extentNode.extendOffset - 1;
    this.leftPosIndex = 0;
    this.rightPosIndex = 0;
    this.focusParentNode = this.selectObj.focusNode.parentNode;
    this.selectData = this.selectObj.focusNode.data;
    if (this.baseOffset < this.extentOffset) {
      this.leftPosIndex = this.baseOffset;
      this.rightPosIndex = this.extentOffset;
    } else {
      this.leftPosIndex = this.extentOffset;
      this.rightPosIndex = this.baseOffset;
    }
  }
  return { leftPosIndex: this.leftPosIndex, rightPosIndex: this.rightPosIndex, selectData: this.selectData, focusParentNode: this.focusParentNode };
  // console.log(leftPosIndex, rightPosIndex);
};

tools.wrapTagsHtml = function (value, tag) {
  if (value && tag) {
    return `<${tag}>${value}</${tag}>`;
  }
};

tools.command = function (commandName, tag) {
  return document.execCommand(commandName, true, tag);
};
// 获取选中焦点的位置
tools.getFocusPos = function () {
  console.log("end", tools.getSelector().select);
};

tools.setCaret = function (node, offset) {
  this.getSelector().select.collapse(node, offset);
};

tools.showTheTag = function (el) {
  const tagsArray = [];
  console.log("el", el);
  const searchTags = (el) => {
    if (el.nodeType === 3 || el.getAttribute("id") !== "editor") {
      if (el.nodeType !== 3) {
        tagsArray.push(el.tagName);
      }
      searchTags(el.parentNode);
    }
  };
  searchTags(el);
  return tagsArray;
};

tools.SetCaretPosition = function (el, pos) {
  for (let node of el.childNodes) {
    if (node.nodeType === 3) {
      if (node.length >= pos) {
        const range = document.createRange();
        const sel = window.getSelection();
        range.setStart(node, pos);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        return -1;
      } else {
        pos -= node.length;
      }
    } else {
      pos = this.SetCaretPosition(node, pos);
      if (pos === -1) {
        return -1;
      }
    }
    return pos;
  }
};

export default tools;
