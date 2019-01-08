# Create flask app that will be used to connect db used for visulizations

# import dependencies
import pandas as pd

from flask import (
    Flask,
    render_template,
    jsonify)

# from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

## Database URI
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db/db.sqlite"

# db = SQLAlchemy(app)

## Classess for data tables in the sql flask
# class ClassName(object):
# 	"""docstring for ClassName"""
# 	def __init__(self, arg):
# 		super(ClassName, self).__init__()
# 		self.arg = arg


# @app.before_first_request
# def setup():
# 	# Recreate database each time for demo
# 	db.drop_all()
# 	db.create_all()



## create the application routes

@app.route("/")
def home():
	return render_template("index.html")



@app.route("/hello1")
def hw1():
	return "Hello World 1!"

@app.route("/hello2")
def hw2():
	return "Hello World 2!"

@app.route("/hello3")
def hw3():
	return "Hello World 3!"

@app.route("/line")
def test():
    data = [{
        "x": [1, 2, 3, 4, 5],
        "y": [1, 2, 4, 8, 16]}]

    return jsonify(data)

# if we want to input data on a form
# @app.route("/send", methods=["GET", "POST"])

# 	return "Hello World form!"




if __name__ == "__main__":
	app.run()


		











