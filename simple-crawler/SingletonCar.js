module.exports = class SingletonCar {
    static #car = null;

    static INSTANCE() {
        if (SingletonCar.#car ===  null) {
            SingletonCar.#car = new SingletonCar.#SingletonCarImplementation();
        }
        return SingletonCar.#car;
    }

    static #SingletonCarImplementation = class {
        #creationTime = new Date();

        show() {
            console.log("this is a SingletonCar, crated at => " + this.#creationTime);
        }    
    } 
}