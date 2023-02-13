import axios from 'axios';

class BackEndConnectionImpl {
    async get_crawling_result(url, depth, searchNum) {
        return axios.get('/get-url-crawl-result?url=' + url + '&depth=' + depth + '&searchNum=' + searchNum, {})
            .then(function (response) {
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
