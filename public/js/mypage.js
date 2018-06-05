var domain = "http://localhost:3000" 
const attributeNo = 2;
const productnum = 3;
var requestnum = 2;

setup();

function setup(){

	userinfo();
	myproduct();
    myrequest();
}
function userinfo() {
        var name = document.getElementById("myname")
        var phone = document.getElementById("myphone")
        name.innerHTML = "USERNAME";
        phone.innerHTML = "USER-PHO-NE"

    }

function myproduct() {
     var table = document.getElementById("myproduct");
     document.getElementById("productNum").innerHTML = productnum;
     for (var i = 0;i<productnum;i+=1){
        var row = table.insertRow(i+1);
        var Name = row.insertCell(0);
        var Price = row.insertCell(1);
        var MaxPrice = row.insertCell(2);
        var Sold = row.insertCell(3);
        Name.innerHTML = "Product " + i;
        Price.innerHTML = "Price "+i;
        MaxPrice.innerHTML = "MaxPrice "+i;
        Sold.innerHTML = "Sold "+i;
        
     }
}
function myrequest() {
    var table = document.getElementById("myrequest");
    document.getElementById("requestNum").innerHTML = requestnum;

     for (var i = 0;i<requestnum;i+=1){
        var row = table.insertRow(i+1);
        var Name = row.insertCell(0);
        var Seller = row.insertCell(1);
        var Price = row.insertCell(2);
        var Sold = row.insertCell(3);
        Name.innerHTML = "Product " + i;
        Seller.innerHTML = "Seller "+i;
        Price.innerHTML = "Price "+i;
        Sold.innerHTML = "Sold "+i;
        
     }
}