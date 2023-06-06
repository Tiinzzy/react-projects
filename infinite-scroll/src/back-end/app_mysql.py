from database import Database

sql_command = """
SELECT m.title, m.vote_average, m.overview, m.vote_count, m.imdb_id, mal.genre_count, m.id FROM tests.imbd_movies m
join tests.movies_all_genres mal on mal.title = m.title
where m.title <> '0' and m.vote_average <> '0' and m.overview <> '0'
order by rand()
"""

def get_all_movies():
    db = Database()
    con, cur = db.open_database()
    cur.execute(sql_command)
    rows = cur.fetchall()
    result = []
    for i in rows:
        result.append(rows[i])
    db.close_database()
    return result
