var attributeNo = 4;
var lists = {};
var domain = "http://localhost:3000" 

setup();

function setup() {
	show_items();
	document.getElementById("search_go").onclick = function() {search()};
}

function translation(uid) {
    var api_url = domain + "/api/product/user/"+uid;
    var temp = ""
    $.ajax({
        url: api_url,
        cache: false,
        async: false
    }).done(function(data) {
        temp =  data[0]["name"]
    })
    return temp

}

function show_items() {
    var item_no = 8;
    var api_url = domain + "/api/product/all";
    $.ajax({
        url: api_url,
        cache: false,
        async: false
    }).done(function(data) {
        item_no  = data.length
        lists = data
    })
     var table = document.getElementById("products");
     for (var i = 0;i<item_no;i+=1){
        var row = table.insertRow(i+1);
        var No = row.insertCell(0);
        var Name = row.insertCell(1);
        var Seller = row.insertCell(2);
        var Price = row.insertCell(3);
        var MaxPrice = row.insertCell(4);
        var Sold = row.insertCell(5);
        var Time = row.insertCell(6);
        No.innerHTML = i+1;
        Name.innerHTML = lists[i]["name"];
        Seller.innerHTML = translation(lists[i]["uid"]);
        Price.innerHTML = lists[i]["init_price"];
        MaxPrice.innerHTML = lists[i]["max_price"];
        Sold.innerHTML = lists[i]["is_sold"];
        Time.innerHTML = lists[i]["reg_time"];
        
        
     }
     
}
function search() {
	var keyword = document.getElementById("searchInput").value
	alert(keyword);
	//TODO : rearrange list by the keyword
}