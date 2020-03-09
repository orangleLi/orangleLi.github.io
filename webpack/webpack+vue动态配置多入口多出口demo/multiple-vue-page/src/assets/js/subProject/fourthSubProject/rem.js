// JavaScript Document
(function(designWidth, maxWidth) {
    var doc = document,
        win = window,
        docEl = doc.documentElement,
        remStyle = document.createElement("style"),
        tid;
 
    function refreshRem() {
        //getBoundingClientRect用于获取某个元素相对于视窗的位置集合.集合中有top, right, bottom, left, width, height等属性。
        var width = docEl.getBoundingClientRect().width;
        maxWidth = maxWidth || 540;
        width>maxWidth && (width=maxWidth);
        var rem = width * 100 / designWidth;
        remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
    }
 
    if (docEl.firstElementChild) {
        docEl.firstElementChild.appendChild(remStyle);
    } else {
        var wrap = doc.createElement("div");
        wrap.appendChild(remStyle);
        doc.write(wrap.innerHTML);
        wrap = null;
    }
    refreshRem();
 
    win.addEventListener("resize", function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);//最后一个参数 可选。布尔值，指定事件是否在捕获或冒泡阶段执行。


//     onpageshow 事件类似于 onload 事件，onload 事件在页面第一次加载时触发， onpageshow 事件在每次加载页面时触发，即 onload 事件在页面从浏览器缓存中读取时不触发。
//
//     为了查看页面是直接从服务器上载入还是从缓存中读取，你可以使用 PageTransitionEvent 对象的 persisted 属性来判断。 如果页面从浏览器的缓存中读取该属性返回 ture，否则返回 false
 
    win.addEventListener("pageshow", function(e) {//用户访问页面时触发
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

//     readyState 属性返回当前文档的状态（载入中……）。
//
//     该属性返回以下值:
//
//     uninitialized - 还未开始载入
//     loading - 载入中
//     interactive - 已加载，文档与用户可以开始交互
//     complete - 载入完成
//     语法
//     document.readyState
    if (doc.readyState === "complete") {
        doc.body.style.fontSize = "16px";
    } else {
        doc.addEventListener("DOMContentLoaded", function(e) {
            doc.body.style.fontSize = "16px";
        }, false);
    }
})(750, 4095);
//designWidth, maxWidth 750, 1980





























