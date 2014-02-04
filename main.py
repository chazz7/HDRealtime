import os, traceback, time
import ast
import sys
import simplejson
import datetime
import json
import urllib2
from flask import (Flask, request, session, g, redirect, url_for, make_response,
                   abort, render_template, flash, jsonify)
app = Flask(__name__)
app.debug = True

def p(string):
    print string
    sys.stdout.flush()

@app.route('/')
def hello():
    return "Sup Chump"