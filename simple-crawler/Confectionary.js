module.exports = class Confectionary {
    static buildCookie() {
        return new Confectionary.#Cookie();
    }

    static buildCandy() {
        return new Confectionary.#Candy();
    }

    static #Cookie = class {
        constructor() {            
        }

        show() {
            console.log('This is a COOKIE!');
        }
    }

    static #Candy = class {
        constructor() {            
        }

        show() {
            console.log('This is a CANDY!');
        }
    }
}



