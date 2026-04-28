const positonList = [];
const domList = document.querySelectorAll('[data-is-draggable]>a');
domList.forEach(
    dom => {
        const positionItem = {}
        // 找到 dom 的 `href` 属性，将其文本内容赋值给 positionItem.href
        positionItem.href = dom.getAttribute('href');
        // 找到 dom 下的 `[data-text]` 元素，将其文本内容赋值给 positionItem.text
        const textDom = dom.querySelector('[data-text]');
        positionItem.text = textDom && textDom.textContent;
        // 找到 dom 下的 `div > span` 元素，将其 style 属性的 background-position 付给 positionItem.position
        const spanDom = dom.querySelector('div > span');
        positionItem.position = spanDom && spanDom.style['background-position'];
        positonList.push(positionItem);
    }
)
console.log(JSON.stringify(positonList));