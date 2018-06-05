var domain = "http://localhost:3000" 

setup();

function setup() {
	document.getElementById("upload").onclick = function() {submit()};
}

function submit() {
	var prod = document.getElementById("productInput").value;
	var description = document.getElementById("descriptionInput").value;
	var price = document.getElementById("maxPriceInput").value;
	alert(prod + " " + description + " " + price);
	
}