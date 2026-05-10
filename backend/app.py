from api import api
from db.src.db import init_database
from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager

app = Flask(__name__, static_folder="../frontend/dist", static_url_path="/")
app.config["JWT_SECRET_KEY"] = "12dfs234545l123SDFsadfasLK46AJ123s38sdf!!"
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_COOKIE_CSRF_PROTECT"] = True
app.config["JWT_ACCESS_CSRF_HEADER_NAME"] = "X-CSRF-TOKEN"
app.config["JWT_COOKIE_SECURE"] = False
app.config["JWT_COOKIE_SAMESITE"] = "Lax"
app.config["JWT_REFRESH_COOKIE_PATH"] = "api/auth/refresh"
app.config["JWT_SESSION_COOKIE"] = False
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = 3600
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = 86400

app.register_blueprint(api)


CORS(
    app,
    supports_credentials=True,
    origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    expose_headers=["Content-Type", "X-CSRF-TOKEN"],
)


jwt = JWTManager(app)
init_database()


@app.route("/", methods=["GET"])
@app.route("/register", methods=["GET"])
@app.route("/login", methods=["GET"])
def index():
    return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    app.run(debug=True)
