var domain = "http://localhost:3000" 
const attributeNo = 2;
var requestnum = 2;
var item_no = 0;
setup();

function setup(){
	userinfo();
	myproduct();
    myrequest();
}
function userinfo() {
    var api_url = domain + "/api/mypage";
    $.ajax({
        url: api_url,
        cache: false,
        async: false
    }).done(function(data) {
        item_no  = data.length
        lists = data
    })
    var name = document.getElementById("myname")
    var phone = document.getElementById("myphone")
    name.innerHTML = lists[0]["uname"];
    phone.innerHTML = lists[0]["phone_num"]

}

function myproduct() {
     var table = document.getElementById("myproduct");
     document.getElementById("productNum").innerHTML = item_no;
     for (var i = 0;i<item_no;i+=1){
        var row = table.insertRow(i+1);
        var Name = row.insertCell(0);
        var Price = row.insertCell(1);
        var MaxPrice = row.insertCell(2);
        var Sold = row.insertCell(3);
        Name.innerHTML = lists[i]["pname"];
        Price.innerHTML = lists[i]["init_price"];
        MaxPrice.innerHTML = lists[i]["max_price"];
        Sold.innerHTML = lists[i]["is_sold"];
        
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