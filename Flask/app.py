import pandas as pd

from flask import (
    Flask,
    render_template,
    jsonify)

from flask_sqlalchemy import SQLAlchemy


#################################################
# Flask Setup
#################################################
app = Flask(__name__)

# The database URI
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://root:<password>localhost:3306/box_office_db"

db = SQLAlchemy(app)


# Create our database model
class BoxOffice(db.Model):
    __tablename__ = 'domestic_movie_data'

    year = db.Column(db.Integer, primary_key=True)
    ticket_price = db.Column(db.Float)
    tickets_sold = db.Column(db.Float)
    total_revenue = db.Column(db.Float)
    cinema_sites = db.Column(db.Integer)


    def __repr__(self):
        return f"year={self.year}, tickets={self.tickets_sold}"



#################################################
# Flask Routes
#################################################

# Create database tables
@app.before_first_request
def setup():
    # Recreate database each time for demo
    db.drop_all()
    db.create_all()


@app.route("/")
def home():
    """Render Home Page."""
    return render_template("index.html")


@app.route("/hello1")
def hw1():
    return "Hello World 1!"


@app.route("/ticket_price_data")
def ticket_price_data():
    ## Return year and ticket price from domestic movie data ##

    ##Query for ticket price
    results = db.session.query(BoxOffice.year, BoxOffice.ticket_price).all()  
        

    #Create list from queary results
    # year = [int(result[0]) for result in results]
    # ticket_price = [int(result[1]) for result in results]

    df = pd.DataFrame(results, columns=['year', 'ticket_price'])

    #Generate plot trace
    trace = {
        "x": df["year"].values.tolist(),
        "y": df["ticket_price"].values.tolist(),
        "type": "line"
    }

    return jsonify(trace)



if __name__ == '__main__':
    app.run(debug=True)
