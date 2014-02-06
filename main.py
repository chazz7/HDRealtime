import os, traceback, time
import ast
import sys
import simplejson as json
import datetime
import json
import urllib2
from flask import (Flask, request, session, g, redirect, url_for, make_response,
                   abort, render_template, flash, jsonify)
#from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.pymongo import PyMongo

app = Flask(__name__)
#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
app.debug = True
#db = SQLAlchemy(app)

mongo = PyMongo(app)


def p(string):
    print string
    sys.stdout.flush()

def load_data(request):
  return json.loads(request.data)

def do_json(data):
  return json.dumps(data, cls=NewEncoder)

#class Point(db.Model):
#    id = db.Column(db.Integer, primary_key=True)
#    latitude = db.Column(db.Float(precision=7))
#    longitude = db.Column(db.Float(precision=7))
#    values = db.Column(db.Array(Float(precision=7)))
#
#    def __init__(self, latitude, longitude, values):
#        self.latitude = latitude
#        self.longitude = longitude
#        self.values = values
#
#    def __repr____(self):
#        return '<Point %f %f>' % (latitude, longitude)
#
#
#class User(db.Model):
#    id = db.Column(db.Integer, primary_key=True)
#    username = db.Column(db.String(80), unique=True)
#    email = db.Column(db.String(120), unique=True)
#
#    def __init__(self, username, email):
#        self.username = username
#        self.email = email
#
#    def __repr__(self):
#        return '<User %r>' % self.username

@app.route('/')
def hello():
    return "Sup Chump"

@app.route('/data')
def data():
    homes = mongo.db.points.find({"key" : "divHome"})
    p(homes)
    return jsonify(homes)


@app.route('/realtime')
def realtime():
    return render_template('realtime_map.html')

@app.route('/test')
def test():
    post = {}
    post['value'] = 7
    post['time'] = "10:30"
    posts = mongo.db['posts']
    post_id = posts.insert(post)
    p(post_id)
    return "going"





