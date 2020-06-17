let deleteConfirm = (id) => {
	if (confirm("确认删除此选项？")) {	
		window.location.href = '/toDeleteBook?id=' + id;
	}
}