const attributeNo = 4;

var domain = "http://localhost:3000" 
setup();

function setup() {
	show_items();
	document.getElementById("search_go").onclick = function() {search()};
}
function show_items() {
     for (var prod = 0; prod < 10; prod += 1) {
        for (var attr = 0; attr < attributeNo; attr += 1){
            var cell = document.getElementById("item-" + prod + "-" + attr);
			cell.textContent = "TBA"; //call sql query
        }
        var head = document.getElementById("product-" + prod);
        head.textContent = "product " + prod; //call sql query
    }
}
function search() {
	var keyword = document.getElementById("searchInput").value
	alert(keyword);
	//TODO : rearrange list by the keyword
}