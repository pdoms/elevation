from flask import Flask, json
from flask_cors import CORS


vieann_elevation = {
  "results": [
    {
      "dataset": "aster30m",
      "elevation": 254.0,
      "location": {
        "lat": 48.2406253105918,
        "lng": 16.3227653503418
      }
    }
  ],
  "status": "OK"
}

api = Flask(__name__)
CORS(api)

@api.route('/', methods=['GET'])
def get_companies():
  return json.dumps(vieann_elevation)

if __name__ == '__main__':
    api.run()
