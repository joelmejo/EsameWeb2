from flask import Flask, jsonify, render_template, request
import psycopg
from datetime import datetime
import os
import json

app = Flask(__name__)

db_config: dict = {
    'host': 'localhost',
    'port': '5432',
    'dbname': 'accademia',
    'user': 'postgres',
    'password': 'postgres'
}

def db_connection():
    try:
        connection = psycopg.connect(
            dbname=db_config['dbname'],
            host=db_config['host'],
            user=db_config['user'],
            password=db_config['password']
        )
        return connection
    except psycopg.OperationalError:
        return None

def format_date(date_str):
    try:
        date_obj = datetime.strptime(date_str, "%a, %d %b %Y %H:%M:%S %Z")
    except ValueError:
        try:
            date_obj = datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S")
        except ValueError:
            return date_str  # Return the original string if it doesn't match any known format
    return date_obj.strftime("%Y-%m-%d")

@app.route('/', methods=['GET'])
def benvenuto():
    return render_template('index.html')

@app.route('/query', methods=['GET'])
def query():
    query_type = request.args.get('azione')
    connection = db_connection()
    records = None
    columns = None

    if connection:
        try:
            cursor = connection.cursor()
            if query_type == "":
                raise ValueError("Invalid query type")
            elif query_type == "assenza":
                queri = '''SELECT * FROM assenza;'''
            elif query_type == "attivitanonprogettuale":
                queri = '''SELECT * FROM attivitanonprogettuale;'''
            elif query_type == "attivitaprogetto":
                queri = '''SELECT * FROM attivitaprogetto;'''
            elif query_type == "persona":
                queri = '''SELECT * FROM persona;'''
            elif query_type == "progetto":
                queri = '''SELECT * FROM progetto;'''
            elif query_type == "wp":
                queri = '''SELECT * FROM wp;'''
            cursor.execute(queri)
            columns = [desc[0] for desc in cursor.description]
            records = cursor.fetchall()
        except ValueError as ve:
            print(ve)
            return render_template('index.html')
        finally:
            connection.close()
    else:
        try:
            file_path = os.path.join('fakequeries', f'{query_type}.json')
            with open(file_path, 'r') as file:
                data = json.load(file)
                if isinstance(data, dict) and 'columns' in data and 'records' in data:
                    columns = data['columns']
                    records = data['records']
                else:
                    raise ValueError("Invalid JSON format")
        except (FileNotFoundError, ValueError) as e:
            print(e)
            return render_template('index.html')

    if records:
        result = []
        for row in records:
            row_dict = dict(zip(columns, row))
            for key in row_dict:
                if isinstance(row_dict[key], str) and "GMT" in row_dict[key]:
                    row_dict[key] = format_date(row_dict[key])
            result.append(row_dict)
        return jsonify(result)
    
if __name__ == '__main__':
    app.run(host="127.0.0.1", port=8080, debug=True)

