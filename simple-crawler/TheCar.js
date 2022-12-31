module.exports.TheCar = class {
    #creationTime = new Date();

    show() {
        console.log("this is a CAR, crated at => " + this.#creationTime);
    }
}