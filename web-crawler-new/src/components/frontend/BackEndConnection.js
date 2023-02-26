import axios from 'axios';

export const USER_ID = Math.floor(1000000 * Math.random())

class BackEndConnectionImpl {
    async trigger_crawling(url, depth, searchNum, callback) {
        console.log(USER_ID);
        return axios.get('/trigger-crawling?url=' + url + '&depth=' + depth + '&searchNum=' + searchNum + '&userId=' + USER_ID , {})
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

    async get_crawling_result(callback) {
        console.log(USER_ID);
        return axios.get('/get-crawl-result?userId=' + USER_ID, {})
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