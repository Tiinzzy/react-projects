import axios from 'axios';

class BackEndConnectionImpl {
    async trigger_crawling(url, depth, searchNum, callback) {
        return axios.get('/trigger-crawling?url=' + url + '&depth=' + depth + '&searchNum=' + searchNum, {})
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

}

export default class BackEndConnection {
    static #object = null;

    static INSTANCE() {
        if (BackEndConnection.#object === null) {
            BackEndConnection.#object = new BackEndConnectionImpl();
        }
        return BackEndConnection.#object;
    }

}
