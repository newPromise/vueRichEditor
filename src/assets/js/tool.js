const tools = {
  selectObj: '',
  baseOffset: 0,
  extentOffset: 0,
  leftPosIndex: 0,
  rightPosIndex: 0,
  focusParentNode: '',
  selectData: ''
};

tools.getSelectorRange = function (element) {
  let text;
  let range;
  let select;
  if (window.getSelection) {
    // 对于 window.getSelection 方法
    // 表示用户选择的文本范围或者光标位置
    select = window.getSelection();
    text = select.toString();
    // range = select.getRangeAt(0);
  } else if (document.selection) {
    range = document.selection.createRange();
    text = range.text;
  }
  return {
    text,
    select
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

tools.command = function (commandName, valueArgument) {
  console.log("command");
  return document.execCommand(commandName, true, valueArgument);
  // return commandFn;
}

export default tools;
