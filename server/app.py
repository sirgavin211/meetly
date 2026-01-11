
# conn = sqlite3.connect('database.db')

# cursor = conn.cursor()

# cursor.execute("CREATE TABLE Rooms(room_name varchar(255), psswd varchar(255), bleb varchar(255), bleb2 varchar(255))")
# for x in range(5):
# cursor.execute("""
#     INSERT INTO Rooms(room_name, psswd, bleb, bleb2) VALUES('hello there', 'stinky', 'meh', 'awef');
# """)

# conn.commit()

# cursor.execute("SELECT * FROM Rooms")
# rows = cursor.fetchall()

# class Room:
#     def __init__(self, room_name, psswd, bleb, bleb2):
#         self.room_name = room_name
#         self.psswd = psswd
#         self.bleb = bleb
#         self.bleb2 = bleb2

#     def toString(self):
#         print("room_name: {self.room_name}")
#         print("psswd: {self.psswd}")
#         print("bleb: {self.bleb}")
#         print("bleb2: {self.bleb2}")


# rooms = []


# for row in rows:
#     cols = []

#     for col in row:
#         cols.append(col)
#         print(col)

#     rooms.append(Room(cols[0], cols[1], cols[2], cols[3]))

    

# for room in rooms:
#     print(room.toString())

# cursor.execute("DROP TABLE Rooms")

# const [hangout_data, setHangoutData] = useState({
#         name: "",
#         date: "",
#         locations: [
#             { address: "", ariveAt: "", departAt: "" }
#         ],
#         optional_notes: "",
#         include_host: false,
#         multiple_locations: false,
#         host_id: getOrCreateUserId()
#     });

from flask import Flask, request, jsonify
from flask_cors import CORS
from config import Config
import config
import sqlite3


conn = sqlite3.connect('database.db')
cursor = conn.cursor()

if(config.build_database):

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



app = Flask(__name__)
app.config.from_object(Config)

CORS(app, origins=["http://localhost:5173"])  # allows React frontend to talk to Flask


#check health of app
@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200


@app.route("/api/createroom", methods=["POST"])
def create_hangout():
    data = request.get_json()


if __name__ == "__main__":
    app.run()
