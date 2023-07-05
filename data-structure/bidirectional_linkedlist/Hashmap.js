const Bidirectional_LinkedList = require('./Bidirectional_LinkedList');

module.exports = class Hashmap {
    constructor() {
        this.hashedKeys = {}
    }

    #hashFunction(key) {
        if (key.length > 0) {
            return key.charAt(0);
        } else {
            return '';
        }
    }

    #searchCriteria(e, key) {
        return typeof e === 'object' && e['key'] === key;
    }

    insert(key, value) {
        let hash_key = this.#hashFunction(key);
        if (Object.keys(this.hashedKeys).indexOf(hash_key) < 0) {
            this.hashedKeys[hash_key] = new Bidirectional_LinkedList();
        }
        this.hashedKeys[hash_key].add({ 'key': key, 'value': value });
    }

    remove(key) {
        let hash_key = this.#hashFunction(key);
        if (!Object.keys(this.hashedKeys).includes(hash_key)) {
            return false;
        } else {
            let linked_list = this.hashedKeys[hash_key];
            let node_to_remove_index = linked_list.find_first_index((e) => this.#searchCriteria(e, key));
            if (node_to_remove_index < 0) {
                return false;
            } else {
                linked_list.remove(node_to_remove_index);
                return true;
            }
        }
    }

    get(key) {
        let hash_key = this.#hashFunction(key);
        if (!hash_key in this.hashedKeys) {
            return null;
        } else {
            return this.hashedKeys[hash_key].find_first((e) => this.#searchCriteria(e, key))
        }
    }

    showAll() {
        for (let [key, linked_list] of Object.entries(this.hashedKeys)) {
            console.log(key);
            console.log(linked_list.show_all());
        }
    }

}