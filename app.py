import os

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

app = Flask(__name__)

from flask_sqlalchemy import SQLAlchemy
import pandas as pd
from sqlalchemy import create_engine

import psycopg2

import json
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') 
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '')

db = SQLAlchemy(app)




@app.route('/')
def render_static():
    return render_template('goodindex.html')

@app.route('/goodindex.html')
def render_index():
    return render_template('goodindex.html')

@app.route('/map.html')
def render_map():
    return render_template('map.html')

@app.route('/funding.html')
def render_funding():
    return render_template('funding.html')

@app.route('/TestScores.html')
def render_TestScores():
    return render_template('TestScores.html')

@app.route('/salary.html')
def render_salary():
    return render_template('salary.html')

@app.route('/team.html')
def render_team():
    return render_template('team.html')

@app.route('/about.html')
def render_about():
    return render_template('about.html')

@app.route('/machine.html')
def render_machine():
    return render_template('machine.html')

@app.route("/states2")
def states2():

    
   #
  # onnection_string = "postgres:postgres@localhost:5432/ETL_Data_Base"
   # engine = create_engine(f'postgresql://{connection_string}')

   # query = '''
   # select *
   # from states
   # '''

   # df = pd.read_sql_query(query, engine)
   # //

    #con = psycopg2.connect(app.config['SQLALCHEMY_DATABASE_URI'] )
    # con = psycopg2.connect(database="school_funding_state_data", user="postgres", password="postgres", host="127.0.0.1", port="5432")
    con = psycopg2.connect(database="dagv01tat8go4m", user="jdvycjjlpqicyd", password="68ff8e5797ea29f0bbeadcf8f8fbe738ae0809e14e69d944ad3662b02da8ee63", host="ec2-174-129-29-101.compute-1.amazonaws.com", port="5432")
    print("Database opened successfully")

    cur = con.cursor()

    cur.execute(" SELECT * FROM states")
    columns = ( 'index','State', 'Year', 'Enroll','Funding_Per_Enrollment','Total_Revenue','Federal_Revenue','State_Revenue','Local_Revenue','Total_Expense','Instruction_Expense','Support_Services_Expense','Other_Expense','Capital_Outlay_Expensej')
   # cur.execute("SELECT * from states")
   # rows = cur.fetchall()
    
    results = []
    for row in cur.fetchall():
        results.append(dict(zip(columns, row)))
    
    #count = 0
    #for row in rows:
    #    print("State =", row[1])
    #    print("Year =", row[2], "\n")
    #    count = count + 1
    #    print("count = ", count)
    #    if count == 5:
    #        break
        

    print("Operation done successfully")
    con.close()

    #my_json_string = json.dumps(rows)
    my_json_string =json.dumps(results, indent=2)
    #print("+++++++++ = "+ my_json_string)
    return my_json_string

if __name__ == '__main__':
    app.run()
