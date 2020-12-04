import sqlite3
class Server :
    def __init__(self,path2db):
        print("constructor Server")
        self.db = sqlite3.connect("F:\\projects\\messenger\\public\\server\\db\\base.db")
        
        # как вариант написать в конфиг
    def getAllUsers (self):
        cursor = self.db.cursor()
        query = """ SELECT * FROM users """
        cursor.execute(query)
        results = cursor.fetchall()
        print(results)
        self.db.close()
    def getDB(self):
        return self.db