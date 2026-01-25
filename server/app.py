

from flask import Flask, request, jsonify
from flask_cors import CORS
from config import Config
import config
import sqlite3
import secrets




if(config.build_database):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    cursor.execute("""
        DROP TABLE hangouts
    """)
    cursor.execute("""
        DROP TABLE hangout_locations
    """)
    cursor.execute("""
        DROP TABLE hangout_attendees
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS hangouts(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            date TEXT NOT NULL,
            optional_notes TEXT,
            include_host BOOLEAN NOT NULL DEFAULT 0,
            host_id TEXT NOT NULL,
            hangout_id TEXT NOT NULL
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS hangout_locations(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            hangout_id TEXT NOT NULL,
            address TEXT NOT NULL,
            arrive_at TEXT NOT NULL,
            depart_at TEXT NOT NULL
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS hangout_attendees(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            hangout_id TEXT NOT NULL,
            name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            age INTEGER NOT NULL,
            has_family BOOLEAN NOT NULL,
            children TEXT NOT NULL,
            adults TEXT NOT NULL
        )
    """)

    conn.close()



app = Flask(__name__)
app.config.from_object(Config)

CORS(app, origins=["http://localhost:5173", "https://nonphrenetic-tanya-ironically.ngrok-free.dev"])  # allows React frontend to talk to Flask


def generate_code():
    return str(secrets.randbelow(900000) + 100000)

def get_db():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

#check health of app
@app.route("/api/health", methods=["GET"])
def health():
    print(generate_code())
    return jsonify({"status": "ok"}), 200


@app.route("/api/createhangout", methods=["POST"])
def create_hangout():
    conn = get_db()
    cursor = conn.cursor()

    data = request.get_json()
    code = generate_code()

    try:
        # Insert main hangout
        cursor.execute("""
            INSERT INTO hangouts(name, date, include_host, host_id, hangout_id)
            VALUES(?, ?, ?, ?, ?)
        """, (data["name"], data["date"], data["include_host"], data["host_id"], code))

        # Insert locations
        locations = data["locations"]
        for location in locations:
            cursor.execute("""
                INSERT INTO hangout_locations(hangout_id, address, arrive_at, depart_at)
                VALUES(?, ?, ?, ?)
            """, (code, location["address"], location["arriveAt"], location["departAt"]))

        conn.commit()
        
        return jsonify({
            "status": "ok",
            "code": code
        })
    
    except Exception as e:
        conn.rollback()
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
    
    finally:
        conn.close()



if __name__ == "__main__":
    app.run()



