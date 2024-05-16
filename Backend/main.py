import flask

app = flask.Flask(__name__)

@app.route("/bearings")
def rodamiento():
    return "Bearing JSON"

@app.route("/")
def index():
    return "Hello World!"

app.run()