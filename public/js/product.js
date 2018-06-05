const attributeNo = 4;

var domain = "http://localhost:3000" 
setup();

function setup() {
	show_items();
	document.getElementById("search_go").onclick = function() {search()};
}

function show_items() {
     var item_no = 8;
     var table = document.getElementById("products");
     for (var i = 0;i<item_no;i+=1){
        var row = table.insertRow(i+1);
        var Name = row.insertCell(0);
        var Seller = row.insertCell(1);
        var Price = row.insertCell(2);
        var MaxPrice = row.insertCell(3);
        var Sold = row.insertCell(4);
        Name.innerHTML = "Name "+i;
        Seller.innerHTML = "Seller "+i;
        Price.innerHTML = "Price "+i;
        MaxPrice.innerHTML = "MaxPrice "+i;
        Sold.innerHTML = "Sold "+i;
        
     }
     
}
function search() {
	var keyword = document.getElementById("searchInput").value
	alert(keyword);
	//TODO : rearrange list by the keyword
}