from flask import Flask, request, jsonify
import app_mysql

app = Flask(__name__)


@app.route("/movies/all", methods=["POST"])
def all_movies():
    result = app_mysql.get_all_movies()
    return jsonify(result)
