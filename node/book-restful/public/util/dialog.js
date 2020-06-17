/*
    cWidth : 弹窗宽度
    cHeight : 弹窗高度
    title : 弹窗标题
    info : 弹窗内容（原生DOM对象）
*/
function MarkBox(cWidth, cHeight, title, info) {
    var reg = /^[0-9]*[1-9][0-9]*$/;
    this.title = title;
    this.mid = "markId";
    this.cid = "contentId";
    this.info = info;
    this.w = reg.test(cWidth) ? cWidth : 300;
    this.h = reg.test(cHeight) ? cHeight : 200;
}

MarkBox.prototype = {
    close: function() {
        document.getElementById("closeId").onclick();
    },
    init: function() {
        this.de = document.documentElement ? document.documentElement : document.body;
        // var flag = document.getElementById("closeId");
        // if(!flag){
        this.createMarkBox(this.w, this.h);
        // }
        var mark = document.getElementById(this.mid);
        var content = document.getElementById(this.cid);
        mark.style.display = 'block';
        content.style.display = 'block';
        this.resetOver(mark, content, this.w, this.h);

        var _this = this;
        document.getElementById("closeId").onclick = function() {
            mark.style.display = 'none';
            content.style.display = 'none';
        }

        window.onresize = function() {
            _this.resetOver(mark, content, _this.w, _this.h);
        }
        window.onscroll = function() {
            _this.resetOver(mark, content, _this.w, _this.h);
        }
    },
    resetCss: function(element, props) {
        for (var p in props) {
            element.style[p] = props[p];
        }
    },
    createMarkBox: function(w, h) {
        var flag = document.getElementById(this.cid);
        if (flag) {
            var ot = flag.children[0];
            var oc = flag.children[1];
            if(oc != this.info){
                oc.style.display = 'none';
                document.body.appendChild(oc);
                this.info.style.display = 'block';
                flag.appendChild(this.info);
            }else{
                // oc.style.display = 'block';
            }
        } else {
            var mark = document.createElement("div");
            mark.id = this.mid;
            document.body.appendChild(mark);

            var content = document.createElement("div");
            var html = "<div style='line-height:40px;height:40px;padding-left:10px;width:" + w + ";background:#76A6F5;'><span>" + this.title + "</span><span id='closeId' style='float:right;color:red;line-height:40px;margin-right:5px;cursor:pointer'>关闭</span></div>";
            content.innerHTML = html;
            content.id = this.cid;
            this.info.style.display = 'block';
            content.appendChild(this.info);
            document.body.appendChild(content);
            this.resetOver(mark, content, w, h);
        }
    },
    resetOver: function(mark, content, w, h) {
        //重设遮罩层
        this.resetCss(mark, {
            position: "absolute",
            zIndex: "998",
            top: "0px",
            left: "0px",
            backgroundColor: "gray",
            opacity: "0.3",
            // display:"block",
            filter: "alpha(opacity=30)",
            width: "100%",
            height: "100%"
        });
        //重设内容
        var eh = this.de.clientHeight - h;
        var ew = this.de.clientWidth - w;
        eh = eh < 0 ? 0 : eh;
        ew = ew < 0 ? 0 : ew;
        this.resetCss(content, {
            position: "absolute",
            zIndex: "999",
            width: w + "px",
            height: h + "px",
            // display: "block",
            background: "lightgreen",
            left: parseInt(ew / 2) + "px",
            top: parseInt(eh / 2) + "px",
            overFlow: "hidden"
        });
    }
}
