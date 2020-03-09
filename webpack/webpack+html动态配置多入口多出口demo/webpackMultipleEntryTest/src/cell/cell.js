// require("!style-loader!css-loader!./cell.css");
import "../css/common.css";
import "./cell.css";   //此种方法在loaders中进行配置，对css文件用css-loader style-loader进行处理

var setInnerHTML = require('../js/common.js');
setInnerHTML.init('cellId', 'This is cell page');