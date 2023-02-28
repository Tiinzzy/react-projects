import axios from 'axios';

const md5 = require('md5');

const MYSQL = { host: 'localhost', user: 'dbadmin', password: 'washywashy', database: 'tests' };

class BackEndConnectionImpl {
    #user = null;

    async login_user(user, password, callback) {
        this.#user = user;

        return axios.post('/login', { user, password: md5(password) }, {})
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

    async logout_user(callback) {
        return axios.post('/logout', { authorized: false, user: this.#user }, {})
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

    async checkLoginStatus(callback) {
        return axios.post('/login-status', this.#user, {})
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

    async callSecrete(callback) {
        return axios.post('/secret', this.#user, {})
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

    async get_mysql_connection_status(callback) {
        return axios.post('/get-connection-status', MYSQL, {})
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

    async sign_up_new_user(username, password, callback) {
        let query = { username: username, password: md5(password) }
        return axios.post('/sign-up-new-user', query, {})
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
