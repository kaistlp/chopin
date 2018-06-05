var domain = "http://localhost:3000" 

setup();

function setup() {
	document.getElementById("submit").onclick = function() {submit()};
}

function submit() {
	var username = document.getElementById("usernameInput").value;
	var password = document.getElementById("passwordInput").value;
	var password_correct = document.getElementById("passwordInput").value == document.getElementById("passwordInputConfirm").value;
	var phone = document.getElementById("phoneInput").value;
	if (password_correct){
		alert("sucess!");
	}else{
		alert("check your password");
	}
	
}