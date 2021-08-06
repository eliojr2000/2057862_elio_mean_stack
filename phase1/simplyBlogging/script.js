function submit()
{   
    let title = document.getElementById("title");
    let article = document.getElementById("article");
    let imgurl = document.getElementById("imgurl");

    if(title.value == "" || article.value == "" || imgurl.value == "")
    {
        alert("You must fill out all the required info!");
        return;
    }


    //Load data from the localStorage
    let blogBase = JSON.parse(localStorage.getItem("blogBase"));
    let index = parseInt(localStorage.getItem("index"));

    //Check if this is the first time we're adding something
    //If true, we make a new JSON object and make it empty
    //Index will help us track of where will the new entries be placed
    if(blogBase == null || index == null)
    {
        let text = '{ "posts" : {} }';
        blogBase = JSON.parse(text);
        index = 0;
    }
    //Make new JSON with the info that we got form the page
    let newEntry = 
    {
        "title": title.value,
        "article": article.value,
        "imgurl": imgurl.value
    };

    //Now that we don't need them, we can
    //clear the values of the text fields
    title.value = "";
    article.value = "";
    imgurl.value = "";

    //Add new entry to the blogBase JSON Object
    blogBase.posts[index] = newEntry;

    //Convert blogBase to a string and put both the index and 
    //blogBase in the localStorage
    //Index is increased by 1 so that it'll be ready for the next 
    //post added
    localStorage.setItem("blogBase", JSON.stringify(blogBase));
    localStorage.setItem("index", (index+1));

    updateCards();
    window.scrollTo(0,document.body.scrollHeight);
}

function updateCards()
{
    //Load data from the localStorage
    let blogBase = JSON.parse(localStorage.getItem("blogBase"));
    let index = parseInt(localStorage.getItem("index"));
    let cardsGrid = document.getElementById("cardsGrid");

    if(Number.isNaN(index))
    {
        cardsGrid.innerHTML = "";
        return;
    }

    cardsGrid.innerHTML = "";

    for(let i = 0; i < index; i++)
    {
        let template = document.getElementById("cardTemplate").cloneNode(true);

        let title = blogBase.posts[i].title;
        let article = blogBase.posts[i].article;
        let imgurl = blogBase.posts[i].imgurl;

        template.childNodes[1].innerHTML = title;
        template.childNodes[3].innerHTML = article;
        template.childNodes[5].src = imgurl;

        template.id = "card" + i;

        cardsGrid.appendChild(template);
    }
}

function clearAll()
{
    localStorage.clear("blogBase");
    localStorage.clear("index");
    updateCards();
}

window.onload = function()
{
    updateCards();
}