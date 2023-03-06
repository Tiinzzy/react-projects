import axios from 'axios';

const md5 = require('md5');

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
        return axios.post('/get-connection-status', {})
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

    async sign_up_new_user(email, username, password, callback) {
        let query = { email: email, username: username, password: md5(password) }
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

    async change_password(username, currentPassword, newPassword, callback) {
        let query = { user: username, password: md5(currentPassword), newPassword: md5(newPassword) }
        return axios.post('/change-users-password', query, {})
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

    async check_see_if_email_exist(email, callback) {
        let query = { email: email };
        return axios.post('/check-email-to-see-user-exist', query, {})
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

    async send_email_reset_password(email, callback) {
        let query = { email: email };
        return axios.post('/send-email-for-password-reset', query, {})
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
