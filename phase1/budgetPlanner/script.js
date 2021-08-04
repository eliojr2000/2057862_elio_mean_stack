function add()
{
    /*
    
    //Changes the funcionality of the add button so it just now clears the localStorage
    //for testing purposes
    localStorage.clear("base");
    localStorage.clear("index");
    return;

    */
    
    //Grab all the information from the page
    var cName = document.getElementById("clientName");
    var pName = document.getElementById("projectName");
    var budget = document.getElementById("budget");

    //Check if the values are valid
    if(cName.value == "" || pName.value == "" || budget.value == "")
    {
        alert("You must fill out all the required info!");
        return;
    }
    if(isNaN(budget.value))
    {
        alert("Budget entry must be a number!");
        return;
    }

    //Load data from the localStorage
    let base = JSON.parse(localStorage.getItem("base"));
    let index = parseInt(localStorage.getItem("index"));

    console.log(JSON.stringify(base));
    console.log(parseInt(index));
    //Check if this is the first time we're adding something
    //If true, we make a new JSON object and make it empty
    //Index will help us track of where will the new entries be placed
    if(base == null || index == null)
    {
        let text = '{ "projects" : {} }';
        base = JSON.parse(text);
        index = 0;
    }
    //Make new JSON with the info that we got form the page
    let newEntry = 
    {
        "clientName": cName.value,
        "projectName": pName.value,
        "budget": budget.value
    };

    //Clear the values of the text boxes
    cName.value = "";
    pName.value = "";
    budget.value = "";

    //Add newly created JSON to the JSON Object that contains all data (base)
    base.projects[index] = newEntry;
    
    console.log(JSON.stringify(base));

    //Save the modified JSON Object to the localStorage along with the index
    localStorage.setItem("base", JSON.stringify(base));
    localStorage.setItem("index", (index+1));
}

function loadTable()
{
    //Get info from our localStorage
    let base = JSON.parse(localStorage.getItem("base"));
    let index = parseInt(localStorage.getItem("index"));

    //Here we will add out the total budgets
    let total = 0;

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
    let c = document.createElement("th");

    a.innerHTML = "Client";
    b.innerHTML = "Project";
    c.innerHTML = "Budget";

    heading.appendChild(a);
    heading.appendChild(b);
    heading.appendChild(c);

    thead.appendChild(heading);

    for(let i = 0; i < index; i++)
    {
        //Retrieves the data from the JSON Object
        cName = base.projects[i].clientName;
        pName = base.projects[i].projectName;
        budget = parseInt(base.projects[i].budget);

        //Add to the total
        total = total + budget;

        //Creates a row and the row elements
        let row = document.createElement("tr");
        let x = document.createElement("td");
        let y = document.createElement("td");
        let z = document.createElement("td");

        //Add text to row elements
        x.innerHTML = cName;
        y.innerHTML = pName;
        z.innerHTML = "$" + budget.toLocaleString("en-US");

        //Add row elements to the whole row element
        row.appendChild(x);
        row.appendChild(y);
        row.appendChild(z);

        //Finally, add the newly created row to the table's body
        tbody.appendChild(row);
    }
    //Add a total row to the table
    let row = document.createElement("tr");
    let x = document.createElement("td");
    let y = document.createElement("td");
    let z = document.createElement("td");

    x.innerHTML = "";
    y.innerHTML = "Annual Budget:";
    z.innerHTML = "$" + total.toLocaleString("en-US");

    row.appendChild(x);
    row.appendChild(y);
    row.appendChild(z);

    tbody.appendChild(row);

    //Add the table to the DOM
    document.getElementById('table').appendChild(table);
}


window.onload = function()
{
    let t = document.getElementsByTagName("title")[0];
    console.log(t.innerHTML)
    if(t.innerHTML == "View Projects")
        loadTable();
}