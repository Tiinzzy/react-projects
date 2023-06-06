import mysql.connector


class Database:
    @classmethod
    def open_database(cls):
        Database.con = mysql.connector.connect(
            user='dbadmin', password='washywashy', host='127.0.0.1', database='tests')
        return Database.con, Database.con.cursor()

    @classmethod
    def close_database(cls):
        Database.con.cursor().close()
        Database.con.close()
