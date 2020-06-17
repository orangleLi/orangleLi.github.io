let initData = () => {
	let url = $.baseServiceUrl + '/books';
	$.ajax({
	    type : 'get',
	    url : url,
	    dataType : 'json',
	    success : function(data){
	    	var html = template('indexTpl', {list: data});
	    	$("#tableBody").html(html);
	     
	    }
	});
}
let toEditBook = (id) => {
	window.location.href = $.baseServiceUrl + '/www/addBook.html?id=' + id;
}
let deleteConfirm = (id) => {
	if (confirm("确认删除此选项？")) {	
		$.ajax({
		    type : 'delete',
		    url : $.baseServiceUrl + '/books/book/' + id,
		    dataType : 'json',
		    success : function(data){
		    	alert(data.msg)
		    	window.location.href = $.baseServiceUrl + '/www/index.html';
		    }
		});
	}
}

initData();