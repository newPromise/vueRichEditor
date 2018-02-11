function getSelectorRange () {
  let select;
  let range;
  if (window.getSelection) {
    // 对于 window.getSelection 方法
    // 表示用户选择的文本范围或者光标位置
    select = window.getSelection();
    range = select.getRangeAt(0);
  } else if (document.selection) {
    range = document.selection.createRange();
  }
  return range;
};

function wrapTagsHtml (value, tag) {
  if (value && tag) {
    return `<${tag}>${value}</${tag}>`;
  }
}

export { getSelectorRange, wrapTagsHtml };
