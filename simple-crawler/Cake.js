module.exports = class Cake {
    static externalCall = true;

    constructor(name, topping, size, price) {
        if (Cake.externalCall) {
            throw new Error('The constructor is private, please use one of the available builders.');
        } else {
            this.name = name;
            this.topping = topping;
            this.size = size;
            this.price = price;
        }
    }

    static buildSimple() {
        Cake.externalCall = false;
        let newCake = new Cake("cookie", [], "SMALL", 2.0);
        Cake.externalCall = true;
        return newCake;
    }


    static buildFree(name, topping, size) {
        Cake.externalCall = false;
        let newCake = new Cake(name, topping, size, -1);
        Cake.externalCall = true;
        return newCake;
    }

    static build(name, topping, size, price) {
        Cake.externalCall = false;
        let newCake = new Cake(name, topping, size, price);
        Cake.externalCall = true;
        return newCake;
    }

    doublePrice() {
        this.price *= 2;
    }

    show() {
        if (this.price > 0) {
            console.log(this.name + " , " + this.topping + " , " + this.size + " , " + this.price);
        } else {
            console.log(this.name + " , " + this.topping + " , " + this.size);
        }
    }


    clone() {
        return Cake.build(this.name, this.topping, this.size, this.price);

    }

}