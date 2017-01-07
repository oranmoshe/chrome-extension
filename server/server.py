from flask import Flask, url_for, json,Response,render_template,send_from_directory
from flask_cors import CORS, cross_origin
import requests,os
import words

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/getAllWords/', methods = ['GET'])
@cross_origin()
def getAllWords():
    return words.getAllWords()


if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug = True)