from flask import Flask
from flask_cors import CORS

from routes.router import api_bp


def create_app():
    app = Flask(__name__)
    CORS(app)

    # registrace blueprintu s routami
    app.register_blueprint(api_bp)

    return app


# exportovaná instance pro testy / produkci
app = create_app()

if __name__ == "__main__":
    app.run(port=5000, debug=True)
