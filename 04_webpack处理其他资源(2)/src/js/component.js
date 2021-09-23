// import 'css-loader!../css/index.css'; // 直接引入 loader
import '../css/index.css';
import '../css/component.less';

import wukong from '../img/wukong.png'

function component() {
    const element = document.createElement('div');
    element.innerHTML = ['hello', 'webpack'].join(' ');
    element.className = 'content';

    // 创建一个 img 元素，设置src 属性
    const imgEl = new Image();
    //imgEl.src = require('../img/wukong.png').default;
    imgEl.src = wukong;
    element.appendChild(imgEl);

    // 创建一个 div ，设置背景图片
    const bgDivEl = document.createElement('div');
    bgDivEl.style.width = 200 + 'px';
    bgDivEl.style.height = 200 + 'px';
    bgDivEl.className = 'bg-image';
    bgDivEl.style.backgroundColor = 'red';

    element.appendChild(bgDivEl);

    // 创建 i 标签来显示图标
    const iEl = document.createElement('i');
    iEl.className = 'iconfont icon-ashbin'
    element.appendChild(iEl)

    return element;
}

document.body.appendChild(component());