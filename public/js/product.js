const attributeNo = 4;

var domain = "http://localhost:3000" 
show_items();

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