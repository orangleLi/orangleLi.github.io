var inclu = {};
inclu.Include = (function () {
    var pluginsFolder = "./util"
    var jsFolder = "./js"
    var cssFolder = "./css";

    var css =[
        cssFolder + '/style.css'
    ];

    var js=[
        pluginsFolder + '/jquery.js',
        pluginsFolder + '/config.js',
        pluginsFolder + '/template-web.js',
        jsFolder + '/index.js'
    ];

    var  getLayoutFolder=function () {
        return layoutFolder;
    }

    /**
     * 导入公用的js
     */
    var includeJs=function () {
        for(var i=0;i<js.length;i++ ) {
            document.write("<script src='"+js[i]+"'></script>");
        }
    };

    /**
     * 导入公用的
     */
    var includeCss=function () {

        var head= document.getElementsByTagName("head")[0];
        for(var i=0;i<css.length;i++ ) {
            head.appendChild(createStyle(css[i]));
        }

    }

    /**
     * 创建CSS元素
     * @param url
     * @returns {Element}
     */
    var createStyle=function(url) {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = url;
        return link;
    }

    var include=function () {
        includeCss();
        includeJs();
    }

    return{
        include:include
    }
}());
