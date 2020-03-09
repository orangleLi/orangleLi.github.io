const setInnerHTML = {
	init: function(id, str){
		console.log(id)
		document.getElementById(id).innerHTML = str;
	}
}
module.exports = setInnerHTML;