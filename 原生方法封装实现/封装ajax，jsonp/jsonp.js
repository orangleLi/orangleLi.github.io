  function jsonp(url, data, callback, callbackId){
      let scriptDom = document.createElement("script");
      // 拼接url参数
      let res = Object.keys(data).map((key) => `${key}=${data[key]}`).join('&');
      url += ('?' + res);
      url += "&jsonpCallback=jp" + callbackId;
      scriptDom.src = url;
      document.body.appendChild(scriptDom);

      window["jp"+callbackId] = function(res) {
        document.body.removeChild(scriptDom);
        window["jp"+callbackId] = null;
        callback && callback(res);
      }
      scriptDom.onerror = function() {
        callback && callback({error: 'error'});
        document.body.removeChild(scriptDom);
        window["jp"+callbackId] = null;
      }

  }

  function JSONP(url, data, callback) {
      // 防止各个请求之间混淆，需要用callbackId进行区分
      // callbackId定义全局变量的话不好，污染全局变量
      JSONP.callbackId = JSONP.callbackId || 1
      jsonp(url, data, callback, JSONP.callbackId);
      JSONP.callbackId++;
  }