var lists = {};
var domain = "http://localhost:3000"

$.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    } else {
        return results[1] || 0;
    }
}

function getURL(url, keyword, type, order) {
    var newURL = url + "?";
    if (keyword !== null) {
        newURL = newURL + "keyword=" + keyword;
    }


    if (type !== null) {
        if (keyword !== null) {
            newURL = newURL + "&";
        }
        newURL = newURL + "type=" + type + "&order=" + order;
    }
    return newURL;
}

function calculateToggledOrder(type) {
    if ($.urlParam("type") != type) {
        return "asc";
    } else {
        if ($.urlParam("order") == "asc") {
            return "desc";
        } else {
            return "asc";
        }
    }
}

function calculateOrderHTML (type) {
    if ($.urlParam("type") != type) {
        return "";
    } else {
        if ($.urlParam("order") == "asc") {
            return "▲";
        } else {
            return "▼";
        }
    }
}

function setup() {
    show_items();
    var productURL = domain + "/product";
    $("#form-search").submit(function(event) {
        var keyword = $("#searchInput").val();
        var url = productURL;
        url = getURL(url, keyword, $.urlParam('type'), $.urlParam('order'));
        window.location.href = url;
        event.preventDefault();
    });

    var typeArray = ["pname", "uname", "init_price", "max_price", "is_sold", "reg_time"];
    for (var i = 0, len = typeArray.length; i < len; i++) {
        var type = typeArray[i];
        $("#order_" + type).attr('href', getURL(productURL, $.urlParam('keyword'), type, calculateToggledOrder(type)));
        $("#order_" + type).append(calculateOrderHTML(type));
    }
}

function show_items() {
    var item_no = 0;
    var keyword = $.urlParam('keyword');
    var type = $.urlParam('type');
    var order = $.urlParam('order');
    var api_url = domain + "/api/product/all";
    api_url = getURL(api_url, keyword, type, order);
    $.ajax({
        url: api_url,
        cache: false,
        async: false
    }).done(function(data) {
        item_no = data.length
        lists = data
    })
    var table = document.getElementById("products");
    for (var i = 0; i < item_no; i += 1) {
        var row = table.insertRow(i + 1);
        var No = row.insertCell(0);
        var Name = row.insertCell(1);
        var Seller = row.insertCell(2);
        var Price = row.insertCell(3);
        var MaxPrice = row.insertCell(4);
        var Sold = row.insertCell(5);
        var Time = row.insertCell(6);
        No.innerHTML = i + 1;
        Name.innerHTML = lists[i]["pname"];
        Seller.innerHTML = lists[i]["uname"];
        Price.innerHTML = lists[i]["init_price"];
        MaxPrice.innerHTML = lists[i]["max_price"];
        Sold.innerHTML = lists[i]["is_sold"];
        Time.innerHTML = lists[i]["reg_time"];
    }
}
setup();