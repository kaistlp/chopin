var domain = "http://localhost:3000" 
const attributeNo = 2;
const user_attr = 3;
var user_num = 2;

setup();

function setup(){

	title();
	user();
	document.getElementById("send_req").onclick = function() {request()};

}
function title() {
        for (var attr = 0; attr < attributeNo; attr += 1){
            var info = document.getElementById("product_attr" +attr);
			switch(attr){
				case 0:
					info.innerHTML = "Product Name"
					break;
				case 1:
					info.innerHTML = "Product Detail"
			}
        }
    }

function user() {
	for (var users = 0; users<user_num;users+=1){
		var user_head = document.getElementById("usernum-"+users);
        for (var col = 0; col < user_attr; col += 1){
            var user_info = document.getElementById("userinfo-"+users+"-"+col);
            user_info.textContent = "attribute "+col+" by user"+users;
        }

    	user_head.textContent = users
    }

}

function request() {
	var price = document.getElementById("maxPriceInput").value
	alert(price);
	//TODO : send input to mysql data
}