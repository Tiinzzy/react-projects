import axios from 'axios';
import { Base64 } from 'js-base64';

class BackEndConnectionImpl {
    async get_tiny_url(mainUrl, tinyUrl, callback) {
        let url = '/getting_url_and_convert?mainUrl=' + mainUrl + '&tinyUrl=' + tinyUrl;
        return axios.get(url, {})
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

    redirect_if_needed(tinyUrl, callback) {
        let url = '/get_url?tinyUrl=' + tinyUrl;
        axios.get(url, {})
            .then(function (response) {
                let respond = Base64.decode(response.data);
                let url = ''
                if (respond.startsWith('http://') || respond.startsWith('https://')) {
                    url = respond;
                }
                if (callback) {
                    callback(url);
                }
            });
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
