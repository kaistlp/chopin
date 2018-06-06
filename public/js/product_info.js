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
    if (sessid == sellid) {
        if (product_data[0].is_sold != 'Y') {
            $("#div-btn-confirm").removeClass('d-none');
        }
    } else if (sessid !== undefined) {
        if (product_data[0].is_sold != 'Y') {
            $("#div-btn-buy").removeClass('d-none');
        }
    }
    if (product_data[0].is_sold == 'Y') {
        $("#badge-sale").addClass('d-none');
    } else {
        $("#badge-sold").addClass('d-none');
    }
}

function title() {
    $("#product-title").html(pname);
    $("#owner-name").html(product_data[0].uname);
    $("#owner-phone-num").html(product_data[0].phone_num);
    $("#desc-init-price").html('₩'+product_data[0].init_price);
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
        var Phone = row.insertCell(2);
        var Price = row.insertCell(3);
        var Time = row.insertCell(4);
        No.innerHTML = i;
        User.innerHTML = demands[i].uname;
        Phone.innerHTML = demands[i].phone_num;
        Price.innerHTML = demands[i].offer_price;
        Time.innerHTML = demands[i].reg_time;
        row.setAttribute("id", demands[i].uid);
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
        window.location.reload()
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
        console.log();
        $('#confirm-user').html(selectedList[0].childNodes[1].innerHTML);


        $('#confirmModal').modal('show');
        $('#btn-confirm').attr("onclick", "do_trade("+selectedList[0].getAttribute("id")+")");
    }
}

function do_trade(uid) {
    var pid = $.urlParam('pid');
    var selectedList = document.getElementsByClassName('table-primary');
    var price = selectedList[0].childNodes[2].innerHTML;
    var buyer = selectedList[0].childNodes[1].innerHTML;
    
    var api_url = domain + "/api/product/confirm/" + pid + "/" + buyer + "/" +price;
    $.ajax({
        url: api_url,
        cache: false,
        async: false
    }).done(function(data) {
        alert("Request Successed!")
        window.location.reload()
    }).fail(function() {
        alert("Server failed!");
    });
}

setup();