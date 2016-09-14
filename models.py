#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from app import db

class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    drink = db.Column(db.String(64))

    def to_json(self):
        json_order = {
            'id': self.id,
            'name': self.name,
            'drink': self.drink
        }

        return json_order

    @staticmethod
    def from_json(json_order):
        name = json_order.get('name')
        drink = json_order.get('drink')
        return Order(name=name, drink=drink)

