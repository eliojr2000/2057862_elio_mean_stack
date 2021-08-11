class Item
{
    constructor
    (
        public name: string,
        public price: number,
    ){}
}

class Cart
{
    private items: Item[] = [];
    private count = 0;

    public add(...added: Item[])
    {
        for(var i = 0; i < added.length; i++)
        {
            this.items.push(added[i]);
            this.count++;
        }
    }

    public size()
    {
        return this.count;
    }

    public getItems()
    {
        return this.items;
    }

    public printItems()
    {
        for(var i = 0; i < this.items.length; i++)
        {
            console.log("Item: " + this.items[i].name + " | Price: $" + this.items[i].price);
        }
    }
}

function test()
{
    var x = new Cart();
    var iphone = new Item("iphone", 50);
    var banana = new Item("banana", 1);

    x.add(iphone, banana);
    x.printItems();
}

test();