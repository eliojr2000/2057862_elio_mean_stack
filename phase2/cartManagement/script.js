function test() {
}
function addItem(item, price) {
    var text = "";
    var index = -1;
    if (sessionStorage.getItem("cart") == null) {
        text = '{}';
        index = 0;
    }
    else {
        text = sessionStorage.getItem("cart");
        index = parseInt(sessionStorage.getItem("index"));
    }
    var cart = JSON.parse(text);
    var newEntry = {
        "name": item,
        "price": price
    };
    cart[index] = newEntry;
    console.log(cart);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    sessionStorage.setItem("index", (index + 1).toString());
    //Update the counter in the page
    document.getElementById("cartSize").innerHTML = "Cart Size: " + (index + 1);
}
function checkoutItems() {
    //Get info from our localStorage
    var cart = JSON.parse(sessionStorage.getItem("cart"));
    if (cart == null) {
        var x = document.createElement('h3');
        x.innerHTML = "There are no items in the cart";
        document.getElementById('emptyCartMessage').appendChild(x);
        return;
    }
    var index = parseInt(sessionStorage.getItem("index"));
    //Here we will add out the total price
    var total = 0;
    //Create the table, its head (container) and body (container)
    var table = document.createElement('table');
    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');
    table.appendChild(thead);
    table.appendChild(tbody);
    //Create the heading and add to the head container
    var heading = document.createElement("tr");
    var a = document.createElement("th");
    var b = document.createElement("th");
    a.innerHTML = "Item";
    b.innerHTML = "Price";
    heading.appendChild(a);
    heading.appendChild(b);
    thead.appendChild(heading);
    //Now that we done the header, we
    //do the table's body now
    for (var i = 0; i < index; i++) {
        //Retrieves the data from the JSON Object
        var itemName = cart[i].name;
        var price = parseInt(cart[i].price);
        //Add to the total
        total = total + price;
        //Creates a row and the row elements
        var row = document.createElement("tr");
        var x = document.createElement("td");
        var y = document.createElement("td");
        //Add text to row elements
        x.innerHTML = itemName;
        y.innerHTML = "$" + price.toLocaleString("en-US");
        //Add row elements to the whole row element
        row.appendChild(x);
        row.appendChild(y);
        //Finally, add the newly created row to the table's body
        tbody.appendChild(row);
    }
    document.getElementById('total').innerHTML = "Total: $" + total.toLocaleString("en-US");
    //Add the table to the DOM
    document.getElementById('checkoutTable').appendChild(table);
}
function clearCart() {
    sessionStorage.removeItem("cart");
    sessionStorage.removeItem("index");
    window.location.reload();
}
window.onload = function () {
    var t = document.getElementsByTagName("title")[0];
    var x = parseInt(sessionStorage.getItem("index"));
    if (t.innerHTML == "Checkout")
        checkoutItems();
    else if (t.innerHTML == "Store" && !isNaN(x))
        document.getElementById("cartSize").innerHTML = "Cart Size: " + x;
};
