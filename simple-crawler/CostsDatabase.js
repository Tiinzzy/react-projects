const mysql = require('mysql2');

module.exports = class CostsDatabase {
    static #costDatabase = null;

    static INSTANCE() {
        if (CostsDatabase.#costDatabase === null) {
            CostsDatabase.#costDatabase = new CostsDatabase.#CostsDatabaseImpl();
        }
        return CostsDatabase.#costDatabase;
    }

    static #CostsDatabaseImpl = class {
        #connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'washywashy',
            database: 'tests'
        });

        async connectionOK() {
            return this.#connection.promise()
                .query('select 1 as result from dual;')
                .then(([rows, fields]) => {
                    return rows[0].result === 1;
                })
                .catch((error) => {
                    console.log(error);
                    this.#connection.end();
                });
        }

        close() {
            this.#connection.end();
        }

        async selectAllRows() {
            return this.#connection.promise()
                .query('select * from tests.costs')
                .then(([rows, fields]) => {
                    return rows;
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        async selectRowsByDate(fromDate, toDate) {
            toDate = toDate || fromDate;
            let sql = "select * from tests.costs where cost_date between '_FROM_DATE_' and '_TO_DATE_'";
            sql = sql.replace("_FROM_DATE_", fromDate);
            sql = sql.replace("_TO_DATE_", toDate);
            return this.#connection.promise()
                .query(sql)
                .then(([rows, fields]) => {
                    return rows;
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }


}