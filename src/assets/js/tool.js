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
  let select;
  if (window.getSelection) {
    select = window.getSelection();
  } else if (document.selection) {
    select = document.selection;
  }
  return {
    select
  };
};

// 换行的时候取消生成的新的一行
tools.notAnotherLine = function () {
  const selection = tools.getSelector().select;
  const range = document.createRange();
  range.selectNode(selection.focusNode);
  // selection.focusNode.replace(/<pre>/gi, "br");
  console.log("range", range, selection);
  // range.insertNode(br);
  // range.deleteContents();
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
};

tools.wrapTagsHtml = function (value, tag) {
  if (value && tag) {
    return `<${tag}>${value}</${tag}>`;
  }
};

tools.command = function (commandName, tag) {
  return document.execCommand(commandName, false, tag);
};
// 获取选中焦点的位置
tools.getFocusPos = function () {
};

tools.setCaret = function (node, offset) {
  this.getSelector().select.collapse(node, offset);
};

tools.showTheTag = function (el) {
  const tagsArray = [];
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

tools.getStyles = function (el, styleName) {
  let style = "";
  if (window.getComputedStyle) {
    const getStyles = window.getComputedStyle(el, null);
    style = getStyles.getPropertyValue(styleName);
  } else {
    const getStyles = el.currentStyle;
    style = getStyles.getAttribute(styleName);
  }
  if (style.indexOf("px") > 0) {
    style = +style.split("px")[0];
  }
  return style;
};

tools.setStyles = function (el, styleName, styleValue) {
  if (el) {
    el.style[styleName] = styleValue;
  }
};

tools.getFocusFormat = function (el, styleName = "text-align") {
  return this.getStyles(el, styleName);
};
export default tools;
