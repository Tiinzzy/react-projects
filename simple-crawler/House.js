module.exports = class House {

    static BUILD() {
        return new House.#HouseImplementation();
    }


    static #HouseImplementation = class {
        #rooms = 1;
        #baths = 1;

        show() {
            console.log("this is a House!!! " + this.#rooms + " , " + this.#baths);
            return this;
        }    

        rooms(no) {
            this.#rooms = no;
            return this;
        }

        baths(no) {
            this.#baths = no;
            return this;
        }

    } 
}