#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os

from flask import Flask, jsonify, request

from flask_sqlalchemy import SQLAlchemy

# 获得脚本运行的文件夹名
basedir = os.path.abspath(os.path.dirname(__file__))

# 配置项
DATABASE = 'ajax-demo.db'
DEBUG = True
SECRET_KEY = 'my_precious'

# 数据库全地址
DATABASE_PATH = os.path.join(basedir, DATABASE)

SQLALCHEMY_DATABASE_URI = 'sqlite:///' + DATABASE_PATH
SQLALCHEMY_TRACK_MODIFICATIONS = True

app = Flask(__name__)
app.config.from_object(__name__)
db = SQLAlchemy(app)

import models


@app.route("/")
def index():
    return app.send_static_file('index.html')


@app.route('/api/orders', methods=['GET'])
def get_orders():
    orders = models.Order.query.all()
    return jsonify([order.to_json() for order in orders])


@app.route('/api/orders', methods=['POST'])
def add_order():
    from models import db

    order = models.Order.from_json(request.json)
    db.session.add(order)
    db.session.commit()
    return jsonify(order.to_json())


@app.route('/api/orders/<int:id>', methods=['PUT'])
def edit_order(id):
    from models import db

    order = models.Order.query.get_or_404(id)
    order.name = request.json.get('name', order.name)
    order.drink = request.json.get('drink', order.drink)
    db.session.add(order)
    db.session.commit()
    return jsonify(order.to_json())


@app.route('/api/orders/<int:id>', methods=['DELETE'])
def delete_order(id):
    from models import db

    order = models.Order.query.get_or_404(id)
    db.session.delete(order)
    db.session.commit()
    return jsonify({'message': 'order deleted'})


if __name__ == "__main__":
    app.run()
