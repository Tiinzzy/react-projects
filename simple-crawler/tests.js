const Cake = require('./Cake.js');
const Confectionary = require('./Confectionary.js');
const TheCar = require('./TheCar.js');
const SingletonCar = require('./SingletonCar.js');
const House = require('./House.js');

// Factory pattern ...
let p1 = Cake.buildSimple();
p1.show();

let p2 = Cake.buildFree("apple", [1, 2, 3, 4], "LARGE");
p2.show();

let p3 = Cake.build("apple", [1, 2, 3, 4], "LARGE", 12.99);
p3.show();

let p3c = p3.clone();
p3c.show();


p3.doublePrice();
p3.show();
p3c.show();

console.log("\n\n");

// Abstract Factory pattern ...
let co = Confectionary.buildCookie();
co.show();

let ca = Confectionary.buildCandy();
ca.show();


console.log("\n\n");

// new TheCar().show();
// setTimeout(function () {
//     new TheCar().show();
// }, 1000);


// Singletone ...
SingletonCar.INSTANCE().show();
setTimeout(function () {
    SingletonCar.INSTANCE().show();
}, 1000);


console.log("\n\n");


// Builder ...
let h = House.BUILD().rooms(5).baths(2);
h.show().rooms(15).show();
