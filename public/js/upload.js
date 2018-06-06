var domain = "http://localhost:3000" 

setup();

function setup() {
	document.getElementById("upload").onclick = function() {submit()};
}

function submit() {
	var prod = document.getElementById("productInput").value;
	var description = document.getElementById("descriptionInput").value;
	var price = document.getElementById("maxPriceInput").value;
	var initprice = document.getElementById("initPriceInput").value
	if(document.getElementById("maxPriceInput").disabled){
		price = 0;
	}

	register(prod,description,initprice,price)
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

function register(prod,description,initprice,price){
	var api_url = domain + "/api/upload/new/"+prod+"/"+initprice+"/"+price;
    $.ajax({
        url: api_url,
        cache: false,
        async: false
    }).done(function(data) {
        if (data==0){
        	alert("success")
        }else{
        	alert("fail")
        }
    })
    var api_url = domain + "/api/upload/description/ "+description+"/";
    $.ajax({
        url: api_url,
        cache: false,
        async: false
    }).done(function(data) {
    })
    for (var options = 0;options<i+1;options+=1){
    	var fieldname = document.getElementById("ExtraName"+options).value
    	var fieldvalue = document.getElementById("ExtraValue"+options).value
	    var api_url = domain + "/api/upload/option/"+fieldname+"/"+fieldvalue;
	    if(fieldname.length>0){
	    $.ajax({
	        url: api_url,
	        cache: false,
	        async: false
	    }).done(function(data) {
	    })
	    alert(options + " " + fieldname + " " + fieldname)
		}
    }
    
    
}

$("#maxPriceCheckbox").click(function(){   
    $("#maxPriceInput").attr('disabled', !this.checked)
});