// require("!style-loader!css-loader!./pageOne.css");
import "../css/common.css";
import "./pageTwo.css";
var setInnerHTML = require('../js/common.js');
setInnerHTML.init('pageTwoId', 'This is pageTwo page!');