var domain = "http://localhost:3000" 


setup();

function setup() {
	if(userid)
	document.getElementById("upload").onclick = function() {submit()};
}

function submit() {
	var prod = document.getElementById("productInput").value;
	var description = document.getElementById("descriptionInput").value;
	var price = document.getElementById("maxPriceInput").value;
	alert(prod + " " + description + " " + price);
}

var i = 0;

function add_info() {
	i++;
	var original = document.getElementById("extra-info-input-0");
	var clone = original.cloneNode(true);
	clone.id = "extra-info-input-"+i;
	var inputs = clone.getElementsByTagName("input");
	inputs[0].id = "ExtraName"+i;
	inputs[0].value = "";
	inputs[1].id = "ExtraValue"+i;
	inputs[1].value = "";
	original.parentNode.appendChild(clone);
}

$("#maxPriceCheckbox").click(function(){   
    $("#maxPriceInput").attr('disabled', !this.checked)
});