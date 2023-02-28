const mysql = require('mysql2');

class MySqlConnectionImpl {
    #connection = null;
    #connectionInfo = {};

    async insertIntoMySql(params) {
        this.#open();
        let sql = "INSERT INTO tests.user_authentication VALUES('" + params.username + "','" + params.password + "')";

        return this.#execute(sql);
    }

    async connect(params) {

        this.#connectionInfo.host = params.host;
        this.#connectionInfo.user = params.user;
        this.#connectionInfo.password = params.password;
        this.#connectionInfo.database = params.database;

        this.#open();

        return this.#connection.promise()
            .query('select 1 as result from dual;')
            .then(([rows, fields]) => {
                return rows[0].result === 1;
            })
            .catch((error) => {
                return false;
            }).finally(() => {
                this.#connection.end();
            });
    }

    async #execute(sql) {
        return this.#connection.promise()
            .query(sql)
            .then(([rows, fields]) => {
                return { eror: null, rows }
            })
            .catch((error) => {
                this.#connection.end();
                return { error: error.message, rows: [] };
            }).finally(() => {
                this.#connection.end();
            });
    }

    #open() {
        this.#connection = mysql.createConnection({
            host: this.#connectionInfo.host,
            user: this.#connectionInfo.user,
            password: this.#connectionInfo.password,
            database: this.#connectionInfo.database
        });
    }

    close() {
        this.#connection.end();
    }
}

module.exports = class MySqlConnection {
    static #database = null;

    static INSTANCE() {
        if (MySqlConnection.#database === null) {
            MySqlConnection.#database = new MySqlConnectionImpl();
        }
        return MySqlConnection.#database;
    }
}
