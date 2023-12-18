import axios from 'axios';

class BackEndConnectionImpl {
    async get_all_genre(callback) {
        return axios.get('/genre/all', {}, {})
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                if (callback) {
                    callback({ result: false })
                }
                return { result: false };
            })
    }

    async get_all_customers(callback) {
        return axios.get('/customer/all', {}, {})
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                if (callback) {
                    callback({ result: false })
                }
                return { result: false };
            })
    }

    async get_all_movies(callback) {
        return axios.get('/movie/all', {}, {})
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                if (callback) {
                    callback({ result: false })
                }
                return { result: false };
            })
    }

    async get_all_subscriptions(callback) {
        return axios.get('/subscription/all', {}, {})
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                if (callback) {
                    callback({ result: false })
                }
                return { result: false };
            })
    }

    async get_all_tvseries(callback) {
        return axios.get('/tvseries/all', {}, {})
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                if (callback) {
                    callback({ result: false })
                }
                return { result: false };
            })
    }

    async add_genre(query, callback) {
        return axios.post('/genre/add', query, { headers: { 'Content-Type': 'application/json' } })
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                if (callback) {
                    callback({ result: false })
                }
                return { result: false };
            })
    }

    async add_customer(query, callback) {
        return axios.post('/customer/add', query, { headers: { 'Content-Type': 'application/json' } })
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                if (callback) {
                    callback({ result: false })
                }
                return { result: false };
            })
    }

    async add_movie(query, callback) {
        return axios.post('/movie/add', query, { headers: { 'Content-Type': 'application/json' } })
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                if (callback) {
                    callback({ result: false })
                }
                return { result: false };
            })
    }

    async delete_customer(query, callback) {
        return axios.post('/customer/delete', query, { headers: { 'Content-Type': 'application/json' } })
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                if (callback) {
                    callback({ result: false })
                }
                return { result: false };
            })
    }

    async delete_genre(query, callback) {
        return axios.post('/genre/delete', query, { headers: { 'Content-Type': 'application/json' } })
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                if (callback) {
                    callback({ result: false })
                }
                return { result: false };
            })
    }

    async delete_movie(query, callback) {
        return axios.post('/movie/delete', query, { headers: { 'Content-Type': 'application/json' } })
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                if (callback) {
                    callback({ result: false })
                }
                return { result: false };
            })
    }

    async add_subscription(query, callback) {
        return axios.post('/subscription/add', query, { headers: { 'Content-Type': 'application/json' } })
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                if (callback) {
                    callback({ result: false })
                }
                return { result: false };
            })
    }

    async delete_subscription(query, callback) {
        return axios.post('/subscription/delete', query, { headers: { 'Content-Type': 'application/json' } })
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                if (callback) {
                    callback({ result: false })
                }
                return { result: false };
            })
    }

    async update_customer(query, callback) {
        return axios.post('/customer/update', query, { headers: { 'Content-Type': 'application/json' } })
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                if (callback) {
                    callback({ result: false })
                }
                return { result: false };
            })
    }

    async update_genre(query, callback) {
        return axios.post('/genre/update', query, { headers: { 'Content-Type': 'application/json' } })
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                if (callback) {
                    callback({ result: false })
                }
                return { result: false };
            })
    }

    async update_movie(query, callback) {
        return axios.post('/movie/update', query, { headers: { 'Content-Type': 'application/json' } })
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                if (callback) {
                    callback({ result: false })
                }
                return { result: false };
            })
    }

    async update_subscription(query, callback) {
        return axios.post('/subscription/update', query, { headers: { 'Content-Type': 'application/json' } })
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                if (callback) {
                    callback({ result: false })
                }
                return { result: false };
            })
    }

    async add_tvseries(query, callback) {
        return axios.post('/tvseries/add', query, { headers: { 'Content-Type': 'application/json' } })
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                if (callback) {
                    callback({ result: false })
                }
                return { result: false };
            })
    }

    async load_tv_seasons(query, callback) {
        return axios.post('/tvseries/load-seasons', query, { headers: { 'Content-Type': 'application/json' } })
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                if (callback) {
                    callback({ result: false })
                }
                return { result: false };
            })
    }

    async update_tvseries(query, callback) {
        return axios.post('/tvseries/update', query, { headers: { 'Content-Type': 'application/json' } })
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                if (callback) {
                    callback({ result: false })
                }
                return { result: false };
            })
    }

    async delete_tvseries(query, callback) {
        return axios.post('/tvseries/delete', query, { headers: { 'Content-Type': 'application/json' } })
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                if (callback) {
                    callback({ result: false })
                }
                return { result: false };
            })
    }

    async get_directory_path(query, callback) {
        return axios.post('/directory/path', query, { headers: { 'Content-Type': 'application/json' } })
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                if (callback) {
                    callback({ result: false })
                }
                return { result: false };
            })
    }

    async game_of_life_init(query, callback) {
        return axios.post('/gol/init', query, { headers: { 'Content-Type': 'application/json' } })
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                if (callback) {
                    callback({ result: false })
                }
                return { result: false };
            })
    }

    async fetch_evolved_generation(callback) {
        return axios.get('/gol/evolve', {}, {})
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                if (callback) {
                    callback({ result: false })
                }
                return { result: false };
            })
    }

    async update_grid(query, callback) {
        return axios.post('/gol/update', query, { headers: { 'Content-Type': 'application/json' } })
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                if (callback) {
                    callback({ result: false })
                }
                return { result: false };
            })
    }

    async get_initial_space(spaceSize, count, callback) {
        return axios.get(`/gravity/init/size/${spaceSize}/count/${count}`, {}, {})
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                if (callback) {
                    callback({ result: false })
                }
                return { result: false };
            })
    }

    async get_tick_merge(callback) {
        return axios.get('/gravity/tick', {}, {})
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                if (callback) {
                    callback({ result: false })
                }
                return { result: false };
            })
    }

    async get_langtons_ant(callback) {
        return axios.get('/langtons-ant/tick', {}, {})
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                if (callback) {
                    callback({ result: false })
                }
                return { result: false };
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