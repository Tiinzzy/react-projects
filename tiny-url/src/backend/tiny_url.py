from database_connection import Database


class Tiny_Url:
    def __init__(self):
        pass

    @classmethod
    def submit_and_get_url(self, mainUrl, tinyUrl):
        print('>>>', mainUrl, tinyUrl)
        mainUrl = str(mainUrl)
        tinyUrl = str(tinyUrl)
        main_url_condition = "'" + mainUrl + "'"
        tiny_url_condition = "'" + tinyUrl + "'"
        db = Database()
        con, cur = db.open_database()
        cur.execute(''' insert into tests.tiny_url (user_url, url_conversion)
                            values (_MAIN_URL_, _TINY_URL_)
                        '''.replace('_MAIN_URL_', main_url_condition).replace('_TINY_URL_', tiny_url_condition))
        con.commit()
        cur.execute(''' select url_conversion from tests.tiny_url 
                            where user_url = _MAIN_URL_
                        '''.replace('_MAIN_URL_', main_url_condition))
        rows = cur.fetchall()
        result = []
        for row in rows:
            result.append({'tiny_url': row[0]})
        db.close_database()
        return result

    @classmethod
    def get_url(self, tinyUrl):
        db = Database()
        con, cur = db.open_database()
        cur.execute(
            "select user_url from tests.tiny_url where url_conversion = '" + tinyUrl + "' limit 1")
        rows = cur.fetchall()
        if len(rows) == 1:
            url = rows[0][0]
        else:
            url = ''
        db.close_database()
        return url
