var domain = "http://localhost:3000" 

$('#btn_signup').click(function(){
	var username = $("#usernameInput").val();
	var password = $("#passwordInput").val();
	var password_correct = $("#passwordInput").val() == $("#passwordInputConfirm").val();
	var phone = $("#phoneInput").val();
	if (password_correct){
		var api_url = domain + "/api/user/signup/" + username + "/" + password + "/" + phone;
		var signup_sucess = false;
		$.post({
			url: api_url,
			cache: false,
			async: false
		}).done(function(data) {
			var success = data.success;
			if(success == "true"){
				alert('Sign Up success!!!');
				window.location.href = "http://localhost:3000";
				signup_success = true;
			}
			else {
				alert("Check format or may ID duplication.");
			}

		}).fail(function() {
			alert("server failed!");
		});
	}else{
		alert("check your password");
		return true;
	}
	
	return !signup_success;
	
});