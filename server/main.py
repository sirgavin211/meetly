import sqlite3

conn = sqlite3.connect('database.db')

cursor = conn.cursor()

# cursor.execute("CREATE TABLE Rooms(room_name varchar(255), psswd varchar(255), bleb varchar(255), bleb2 varchar(255))")
# for x in range(5):
# cursor.execute("""
#     INSERT INTO Rooms(room_name, psswd, bleb, bleb2) VALUES('hello there', 'stinky', 'meh', 'awef');
# """)

# conn.commit()

cursor.execute("SELECT * FROM Rooms")
rows = cursor.fetchall()

class Room:
    def __init__(self, room_name, psswd, bleb, bleb2):
        self.room_name = room_name
        self.psswd = psswd
        self.bleb = bleb
        self.bleb2 = bleb2

    def toString(self):
        print("room_name: {self.room_name}")
        print("psswd: {self.psswd}")
        print("bleb: {self.bleb}")
        print("bleb2: {self.bleb2}")


rooms = []


for row in rows:
    cols = []

    for col in row:
        cols.append(col)
        print(col)

    rooms.append(Room(cols[0], cols[1], cols[2], cols[3]))

    

for room in rooms:
    print(room.toString())

# cursor.execute("DROP TABLE Rooms")