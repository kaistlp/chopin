var domain = "http://localhost:3000"
const attributeNo = 2;
const user_attr = 3;
var user_num = 2;
var sellid = -1;
var sessid = -1;
var pname = "";
var descr = "";
var success = "false";
var error = "";
var demands = [];
var product_data = {};


$.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    } else {
        return results[1] || 0;
    }
}


function setup() {
    var pid = $.urlParam('pid');
    var api_url = domain + "/api/product/info/" + pid;

    $.ajax({
        url: api_url,
        cache: false,
        async: false
    }).done(function(data) {
        if (data.success == "false") {
            alert(data.error);
            window.location.href = "http://localhost:3000/product"
            return;
        }
        product_data = data.all_data;
        console.log(product_data);
        sellid = product_data[0].uid;
        sessid = data.sessid;
        pname = product_data[0].pname;
        // descr = data.description;
        demands = data.demands;
    })
    title(product_data);
    user();
    document.getElementById("send_req").onclick = function() { request() };
    document.getElementById("confirm_req").onclick = confirm;

}

function title() {
    $("#product-title").html(pname);
    for (var i=0; i<product_data.length; i++) {
        if (product_data[i].name == "description") {
            $("#product-description").html(product_data[i].value);
        } else {
            var original = document.getElementById("extra-info");
            var clone = original.cloneNode(true);
            console.log(clone.childNodes);
            clone.childNodes[1].innerHTML = product_data[i].name;
            clone.childNodes[3].innerHTML = product_data[i].value;
            clone.classList.remove("d-none");
            original.parentNode.appendChild(clone);

        }
    }

}

function user() {
    var item_no = demands.length;
    var table = document.getElementById("requests").getElementsByTagName('tbody')[0];
    for (var i = 0; i < item_no; i += 1) {
        var row = table.insertRow(i);
        var No = row.insertCell(0);
        var User = row.insertCell(1);
        var Price = row.insertCell(2);
        var Time = row.insertCell(3);
        No.innerHTML = i;
        User.innerHTML = demands[i].uname;
        Price.innerHTML = demands[i].offer_price;
        Time.innerHTML = demands[i].reg_time;
        row.setAttribute("id", i);
        row.onclick = select;
    }

}

function request() {
	var price = document.getElementById("maxPriceInput").value
	var pid = $.urlParam('pid');
	var api_url = domain + "/api/product/buy/" + pid + "/" + price;
    $.ajax({
        url: api_url,
        cache: false,
        async: false
    }).done(function(data) {
        alert("Request Successed!")
    }).fail(function() {
        alert("Server failed!");
    });
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
        alert("You select product no." + selectedList[0].getAttribute("id"));
    }
}


setup();