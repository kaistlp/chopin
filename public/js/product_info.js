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
	 var item_no = 8;
     var table = document.getElementById("requests");
     for (var i = 0;i<item_no;i+=1){
        var row = table.insertRow(i+1);
        var No = row.insertCell(0);
        var User = row.insertCell(1);
        var Price = row.insertCell(2);
        var Time = row.insertCell(3);
        No.innerHTML = i;
        User.innerHTML = "User "+i;
        Price.innerHTML = "Price "+i;
        Time.innerHTML = "Time "+i;
        
     }

}

function request() {
	var price = document.getElementById("maxPriceInput").value
	alert(price);
	//TODO : send input to mysql data
}