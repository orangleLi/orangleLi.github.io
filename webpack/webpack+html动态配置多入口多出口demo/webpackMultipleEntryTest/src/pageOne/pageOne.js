// require("!style-loader!css-loader!./pageOne.css");
import "../css/common.css";
import "../less/common.less";
import "./pageOne.css";
var setInnerHTML = require('../js/common.js');
setInnerHTML.init('pageOneId', 'This is pageOne page!');