var Item = /** @class */ (function () {
    function Item(name, price) {
        this.name = name;
        this.price = price;
    }
    return Item;
}());
var Cart = /** @class */ (function () {
    function Cart() {
        this.items = [];
        this.count = 0;
    }
    Cart.prototype.add = function () {
        var added = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            added[_i] = arguments[_i];
        }
        for (var i = 0; i < added.length; i++) {
            this.items.push(added[i]);
            this.count++;
        }
    };
    Cart.prototype.size = function () {
        return this.count;
    };
    Cart.prototype.getItems = function () {
        return this.items;
    };
    Cart.prototype.printItems = function () {
        for (var i = 0; i < this.items.length; i++) {
            console.log("Item: " + this.items[i].name + " | Price: $" + this.items[i].price);
        }
    };
    return Cart;
}());
function test() {
    var x = new Cart();
    var iphone = new Item("iphone", 50);
    var banana = new Item("banana", 1);
    x.add(iphone, banana);
    x.printItems();
    console.log();
}
test();
