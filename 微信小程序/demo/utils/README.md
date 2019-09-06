# canvasDraw.js canvas绘制海报API

## 使用方法：
1. const drawD = require('../../utils/canvasDraw.js'); 

2. let draw = new drawD.canvasDraw('shareImg', that); // 参数为canvas-id  , 和当前this对象

3. draw.XXX 可以调用API中的方法，支持链式调用

### draw.nowHeight:  此属性可以获得当前canvas已经绘制的总高度

> 

插件地址： 
https://github.com/orangleLi/orangleLi.github.io/blob/master/%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F/demo/utils/canvasDraw.js

demo1: 
https://github.com/orangleLi/orangleLi.github.io/tree/master/%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F/demo/pages/drawPosterTest

![demo1](https://orangleli.github.io/imagesResources/demo1.png)


demo2:
https://github.com/orangleLi/orangleLi.github.io/tree/master/%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F/demo/pages/drawPoster

![demo2](https://orangleli.github.io/imagesResources/demo2.png)

<br/>
<br/>

# API
> ## getImagesInfo(imgArr)
由于canvas不能处理网络图片，所以要先拿到图片的临时路径

### 参数
imgArr ： 图片数组

### 返回值 数组
 对应每一个图片的getImagesInfo信息
 数组的每一项信息包括
 
 ```
 {
    errMsg: "getImageInfo:ok"  
    height: 400  
    orientation: "up"  
    path: "http://tmp/wx25b5049efc8d3843.xxx.jpeg" 
    type: "jpeg"
    width: 400
  
 }
 ```
 
### 使用示例

```

draw.getImagesInfo([data.logo, data.ActivityImgUrl, data.qrCode]).then((res) => {
  data.logo = res[0].path;
  data.ActivityImgUrl = res[1].path;
  data.qrCode = res[2].path;
  that.setData({
    imageWidth: res[1].width,
    imageHeight: res[1].height,
    shareActivityInfo: data
  });
  // next 
})

```


<br/>
<br/>

> ## getDownloadFiles(imgArr)
微信头像要使用downloadFile 才可以，并且要配置合法域名

### 参数
imgArr ： 图片数组

### 返回值 数组
 对应每一个图片的downloadFile信息
 数组的每一项信息包括
 
 ```
 
 {
    cookies: []
    errMsg: "downloadFile:ok"
    header: {Server: "NWSs", Date: "Fri, 06 Sep 2019 06:59:27 GMT", Content-Type: "image/jpeg", Content-Length: "3255", Connection: "close", …}
    statusCode: 200
    tempFilePath: "http://tmp/wx25b5049efc8d3843.xxx.jpeg"
 }
 ```
 
 
### 使用示例

```

draw.getDownloadFiles([data.headImg]).then((res) => {
  data.headImg = res[0].tempFilePath;
  that.setData({
    shareActivityInfo: data
  });
  // next 
})

```


<br/>
<br/>

> ## drawCricleImg(x, y, r, logo)
绘制圆形图片


### 参数

|参数   |     说明                     | 类型   |    默认值  |
| ---- | ---------------------------- |:------:| -------: |
| x    | 圆形图片所在正方形位置的x坐标值 | 可填小数 |   无   |
| y    | 圆形图片所在正方形位置的y坐标值 | 可填小数 |   无   |
| r    | 半径                          | 可填小数 |   无   |
| logo | 图片临时路径                  | string  |   无   |


<br/>
<br/>

> ## drawFilletImg(img, sx, sy, swidth, sheight, x, y, width, height, r, bgColor = '#fff')
绘制圆角图片

### 参数

|参数   |     说明                     | 类型   |    默认值  |
| ----   | ------------------------ |:------:| -------: |
| img    | 图片临时路径              | string |   无   |
| sx     | 源图片上取值的x坐标       | 可填小数 |   无   |
| sy     | 源图片上取值的y坐标        | 可填小数 |   无   |
| swidth | 源图片上取的宽度          | 可填小数  |   无   |
| sheight | 源图片上取的高度         | 可填小数  |   无   |
| x      | 绘制到canvas上的x坐标      | 可填小数  |   无   |
| y      | 绘制到canvas上的y坐标     | 可填小数  |   无   |
| width  | 绘制到canvas上的宽度      | 可填小数  |   无   |
| height | 绘制到canvas上的高度      | 可填小数  |   无   |
| r      | 圆角半径                  | 可填小数  |   无   |
| bgColor | canvas背景颜色            | 可填小数  |   #fff   |


<br>
<br>

> ## drawFilletFillImg(img, x, y, width, height, r, bgColor = '#fff') 
绘制圆角图片 全图绘制


### 参数

|参数   |     说明                     | 类型   |    默认值  |
| ----   | ------------------------ |:------:| -------: |
| img    | 图片临时路径              | string |   无   |
| x      | 绘制到canvas上的x坐标      | 可填小数  |   无   |
| y      | 绘制到canvas上的y坐标     | 可填小数  |   无   |
| width  | 绘制到canvas上的宽度      | 可填小数  |   无   |
| height | 绘制到canvas上的高度      | 可填小数  |   无   |
| r      | 圆角半径                  | 可填小数  |   无   |
| bgColor | canvas背景颜色            | 可填小数  |   #fff   |

<br>
<br>

> ## drawImage(img, sx, sy, swidth, sheight, x, y, width, height) 
同原本的drawImage用法相同

可传入(img, sx, sy, swidth, sheight, x, y, width, height) 
或(img, x, y, width, height) 

<br>
<br>

> ## drawText(str, x, y, fontSize = 24, color = '#000', bold, align = 'left')
绘制单行文本


### 参数

|参数   |     说明                     | 类型   |    默认值  |
| ----   | ------------------------ |:------:| -------: |
| str    | 文本内容路径              | string |      无   |
| x      | 绘制到canvas上的x坐标      | 可填小数     |   无   |
| y      | 绘制到canvas上的y坐标     | 可填小数     |   无   |
| fontSize  | 字体大小              | 整数             |   无   |
| color | 颜色                      | 十六进制或rgb, rgba都可  |   '#000'   |
| bold  | 是否加粗                  | true/false  |   false   |
| align | 对齐方式                  | string  |   'left'  |


<br>
<br>

> ## drawMultiLineText(str, x, y, width, fontSize, maxRow, color = '#000', bold, align = 'left', suffixStr = '...') 
绘制多行文本


### 参数

|参数   |     说明                     | 类型   |    默认值  |
| ----   | ------------------------ |:------:| -------: |
| str    | 文本内容                  | string |      无   |
| x      | 绘制到canvas上的x坐标      | 可填小数     |   无   |
| y      | 绘制到canvas上的y坐标     | 可填小数     |   无   |
| width  | 绘制区域宽度              | 可填小数  |   无   |
| fontSize  | 字体大小              | 整数             |   无   |
| maxRow | 最多绘制几行              | 整数 0:不限制  |   不限制   |
| color | 颜色                      | 十六进制或rgb, rgba都可  |   '#000'   |
| bold  | 是否加粗                  | true/false  |   false   |
| align | 对齐方式                  | string  |   'left'  |
| suffixStr | 文本多余时显示的后缀   | string  |   '...'  |


<br>
<br>


> ## drawFinally(callback)
绘制函数，会执行draw()方法

## 参数

callback  绘制完成之后执行的回调方法


### 使用示例


```
draw
  .drawCricleImg(50, 50, 35, logo)
  .drawText(WxName, 134, 80, 24, '#333333')
  .drawText(ActivityIssueTime + ' ' + CommunityName, 134, 110, 20, '#aaaaaa')
  .drawMultiLineText(ActivityName, 50, 180, that.data.width - 100, 42, 0, '#333333')
  .drawMultiLineText(ActivityContent.replace(/&ensp;/g, ' '), 50, draw.nowHeight + 10, that.data.width - 100, 26, 3, '#666666')
  .drawFilletImg(ActivityImg, x, y, imageWidth, imageHeight, 50, draw.nowHeight + 30, that.data.width - 100, drawHeight, 10)
  .drawText('长按扫码', that.data.width - 330, draw.nowHeight + 84, 24, '#333333')
  .drawText('参加更多有趣活动', that.data.width - 425, draw.nowHeight + 21, 24, '#333333')
  .drawImage(data.qrCode, that.data.width - 168 - 50, draw.nowHeight - 130, 168, 168)
  .drawFinally(function (ctx) {
    let canvasHeight = draw.nowHeight + 50;
    that.setData({
      height: canvasHeight,
      isFinished: true
    })
  });
      
```
