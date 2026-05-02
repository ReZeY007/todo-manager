from db.src.classes import Task, User
from db.src.db import create_session
from flask import Blueprint, jsonify, make_response, request
from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    jwt_required,
    set_access_cookies,
    unset_jwt_cookies,
)
from werkzeug.security import check_password_hash, generate_password_hash

api = Blueprint("api", __name__, url_prefix="/api")


@api.route("/auth/login", methods=["POST"])
def login():
    session = create_session()
    data = request.get_json()
    user = session.query(User).filter_by(email=data["email"]).first()

    if user and check_password_hash(user.password, data["password"]):
        access_token = create_access_token(identity=str(user.id))
        response = make_response(jsonify({"msg": "Login successful"}))
        set_access_cookies(response, access_token)

        session.close()
        return response, 200

    session.close()

    return jsonify({"msg": "Invalid login or password"}), 401


@api.route("/auth/register", methods=["POST"])
def register():
    data = request.get_json()

    new_user = User()
    new_user.username = data["username"]
    new_user.email = data["email"]

    if data["password"] != data["confirmPassword"]:
        return jsonify({"msg": "Passwords do not match"}), 400

    new_user.password = generate_password_hash(data["password"])

    session = create_session()

    try:
        session.add(new_user)
        session.commit()
    except Exception:
        session.rollback()
        return jsonify({"msg": "User with this email already exists"}), 409
    finally:
        session.close()

    return jsonify({"msg": "Successfully logged in"}), 201


@api.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    response = jsonify({"msg": "Successful logout"})
    unset_jwt_cookies(response)
    response.set_cookie("csrf_access_token", "", expires=0)

    return response, 200


@api.route("/user")
@jwt_required()
def get_user():
    session = create_session()
    user = session.query(User).filter_by(id=get_jwt_identity()).first()
    session.close()

    return jsonify({"username": user.username, "email": user.email}), 200


@api.route("/tasks", methods=["GET", "POST"])
@jwt_required()
def tasks():
    if request.method == "GET":
        session = create_session()
        tasks = session.query(Task).filter_by(user_id=get_jwt_identity()).all()
        session.close()

        json_list = list(
            map(
                lambda task: {
                    "id": task.id,
                    "title": task.title,
                    "description": task.description,
                },
                tasks,
            )
        )

        return jsonify({"tasks": json_list}), 200
    elif request.method == "POST":
        session = create_session()
        task_data = request.get_json()

        task = Task()
        task.title = task_data["title"]
        task.description = task_data["description"]
        task.user_id = get_jwt_identity()

        session.add(task)
        session.commit()
        session.close()

        return jsonify({"msg": "Task created"}), 200


@api.route("/tasks/<int:task_id>", methods=["GET", "PUT", "DELETE"])
@jwt_required()
def task(task_id):
    if request.method == "GET":
        session = create_session()
        task = session.query(Task).filter_by(id=task_id).first()

        if not (task):
            session.close()
            return jsonify({"msg", "No task with this ID"}), 404

        json_task = jsonify(
            {
                "task": {
                    "id": task.id,
                    "title": task.title,
                    "description": task.description,
                }
            }
        )

        session.close()
        return json_task, 200
    elif request.method == "PUT":
        session = create_session()

        task_data = request.get_json()
        task = session.query(Task).filter_by(id=task_data["id"]).first()

        if task:
            task.title = task_data["title"]
            task.description = task_data["description"]
            session.commit()

        session.close()

        return jsonify({"msg": "Task updated"}), 200
    elif request.method == "DELETE":
        session = create_session()

        task = session.query(Task).filter_by(id=task_id).first()
        session.delete(task)

        session.commit()
        session.close()

        return jsonify({"msg": "Task deleted"}), 200
