$("#login-pk").click(function() {
	if($("#studentid").val() && $("#pw").val() && $("#verified-info").is(':checked')) {
		location.href = '../../../choose-test/client/views/index.html';
	} else {
		$("#incomplete-login-form").fadeIn();
	}
});