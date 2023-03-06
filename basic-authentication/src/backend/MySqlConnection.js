const mysql = require('mysql2');

class MySqlConnectionImpl {
    #connection = null;
    #connectionInfo = {};

    async insertIntoMySql(params) {
        this.#open();
        let sql = "INSERT INTO tests.user_authentication VALUES('" + params.username + "','" + params.password + "','" + params.email + "')";
        return this.#execute(sql);
    }

    async checkUserIsValid(params) {
        this.#open();
        let sql = "select password from tests.user_authentication where username = '" + params.user + "' or email = '" + params.user + "' limit 1";
        return this.#execute(sql);
    }

    async changeUsersPasswordInDatabase(params) {
        this.#open();
        let sql = `UPDATE tests.user_authentication 
                    SET password = '`+ params.newPassword + `' 
                     WHERE username = '` + params.user + `' or email = '` + params.user + `'`;

        return this.#execute(sql);
    }

    async checkEmailExist(params) {
        this.#open();
        let sql = "select * from tests.user_authentication where email = '" + params.email + "'";
        return this.#execute(sql);
    }

    async insertIntoResetPassword(params) {
        this.#open();
        let sql = "INSERT INTO tests.reset_password VALUES('" + params.email + "', '" + params.id + "', '" + params.date + "')";
        return this.#execute(sql);
    }

    async emailForIdRedirect(params) {
        this.#open();
        let sql = "select email from tests.reset_password where id = '" + params.id + "'";
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
                return { error: null, rows }
            })
            .catch((error) => {
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
