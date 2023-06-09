from database import Database


def get_all_movies(parameters):
    offset = parameters.get('offset_number')
    display_number = parameters.get('display_number')

    db = Database()
    con, cur = db.open_database()
    sql_command = f"""
    select m.title, m.vote_average, m.overview, m.vote_count, m.imdb_id, mal.genre_count, m.id from tests.imbd_movies m
    join tests.movies_all_genres mal on mal.id = m.id
    where m.title <> '0' and m.vote_average <> '0' and m.overview <> '0'
    limit {offset} ,{display_number}
    """
    print(sql_command)
    cur.execute(sql_command)
    rows = cur.fetchall()
    result = []
    row_number = offset
    for row in rows:
        result.append(
            {'row_number': row_number, 'title': row[0], 'vote': row[1], 'overview': row[2],
             'vote_count': row[3], 'imdb': row[4], 'genres': row[5], 'movie_id': row[6]})
        row_number += 1
    db.close_database()
    return result


def get_length_of_all_data():
    db = Database()
    con, cur = db.open_database()
    sql_command = """
        select count(*) from tests.imbd_movies m
        join tests.movies_all_genres mal on mal.id = m.id
        where m.title <> '0' and m.vote_average <> '0' and m.overview <> '0' 
    """
    cur.execute(sql_command)
    rows = cur.fetchall()
    result = {}
    for row in rows:
        result = {'data_length': row[0]}
        db.close_database()
    return result
