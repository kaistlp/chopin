var domain = "http://localhost:3000" 
const attributeNo = 2;
const user_attr = 3;
var user_num = 2;

setup();

function setup(){

	title();
	user();
	document.getElementById("send_req").onclick = function() {request()};
    document.getElementById("confirm_req").onclick = confirm;

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
     var table = document.getElementById("requests").getElementsByTagName('tbody')[0];
     for (var i = 0;i<item_no;i+=1){
        var row = table.insertRow(i);
        var No = row.insertCell(0);
        var User = row.insertCell(1);
        var Price = row.insertCell(2);
        var Time = row.insertCell(3);
        No.innerHTML = i;
        User.innerHTML = "User "+i;
        Price.innerHTML = "Price "+i;
        Time.innerHTML = "Time "+i;
        row.setAttribute("id", i);
        row.onclick = select;
     }

}

function request() {
	var price = document.getElementById("maxPriceInput").value
	alert(price);
	//TODO : send input to mysql data
}

function select() {
    var selectedList = document.getElementsByClassName('table-primary');
    if (selectedList.length >= 1) {
        selectedList[0].classList.remove('table-primary');
    }
    this.classList.toggle('table-primary');
}

function confirm() {
    var selectedList = document.getElementsByClassName('table-primary');
    if (selectedList.length == 0) {
        alert("Please select request!");
        return false;
    } else {
        alert("You select product no."+selectedList[0].getAttribute("id"));
    }
}