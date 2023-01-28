from database_connection import Database
from random_assignment import get_random_url_assignment


class Tiny_Url:
    def __init__(self):
        pass

    @classmethod
    def submit_and_get_url(self, user_url):
        url_conversion = get_random_url_assignment()
        db = Database()
        con, cur = db.open_database()
        sql = "insert into tests.tiny_url (user_url, url_conversion) values (%s, %s)"
        cur.execute(sql, (user_url, url_conversion))
        con.commit()
        db.close_database()
        return url_conversion

    @classmethod
    def get_url(self, url_conversion):
        db = Database()
        con, cur = db.open_database()
        sql = "select user_url from tests.tiny_url where url_conversion = %s limit 1"
        cur.execute(sql, (url_conversion,))
        rows = cur.fetchall()
        url = rows[0][0] if len(rows) == 1 else ''
        db.close_database()
        return url
