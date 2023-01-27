import axios from 'axios';

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
                let url = ''
                if (response.data.startsWith('http://') || response.data.startsWith('https://')) {
                    url = response.data;
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
