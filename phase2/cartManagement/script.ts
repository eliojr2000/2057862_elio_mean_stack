function test()
{
    
}

function addItem(item: string, price: number)
{   
    let text: string = "";
    let index: number = -1;

    if(sessionStorage.getItem("cart") == null)
    {
        text = '{}'
        index = 0;
    }
    else
    {
        text = sessionStorage.getItem("cart");
        index = parseInt(sessionStorage.getItem("index"));
    }

    let cart: JSON = JSON.parse(text);

    let newEntry = 
    {
        "name": item,
        "price": price
    };

    cart[index] = newEntry;

    console.log(cart);

    sessionStorage.setItem('cart', JSON.stringify(cart))
    sessionStorage.setItem("index", (index+1).toString());

    //Update the counter in the page
    document.getElementById("cartSize").innerHTML = "Cart Size: " + (index+1);
}

function checkoutItems()
{
    //Get info from our localStorage
    let cart = JSON.parse(sessionStorage.getItem("cart"));
    if(cart == null)
    {   
        let x = document.createElement('h3');
        x.innerHTML = "There are no items in the cart";
        document.getElementById('emptyCartMessage').appendChild(x);
        return;
    }
    let index = parseInt(sessionStorage.getItem("index"));

    //Here we will add out the total price
    let total: number = 0;

    //Create the table, its head (container) and body (container)
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    table.appendChild(thead);
    table.appendChild(tbody);

    //Create the heading and add to the head container
    let heading = document.createElement("tr");
    let a = document.createElement("th");
    let b = document.createElement("th");

    a.innerHTML = "Item";
    b.innerHTML = "Price";

    heading.appendChild(a);
    heading.appendChild(b);

    thead.appendChild(heading);

    //Now that we done the header, we
    //do the table's body now
    for(let i = 0; i < index; i++)
    {
        //Retrieves the data from the JSON Object
        let itemName: string = cart[i].name;
        let price: number = parseInt(cart[i].price);

        //Add to the total
        total = total + price;

        //Creates a row and the row elements
        let row = document.createElement("tr");
        let x = document.createElement("td");
        let y = document.createElement("td");

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

function clearCart()
{
    sessionStorage.removeItem("cart");
    sessionStorage.removeItem("index");
    window.location.reload();
}

window.onload = function()
{
    let t = document.getElementsByTagName("title")[0];
    let x = parseInt(sessionStorage.getItem("index"));

    if(t.innerHTML == "Checkout")
        checkoutItems();
    else if(t.innerHTML == "Store" && !isNaN(x))
        document.getElementById("cartSize").innerHTML = "Cart Size: " + x;
}