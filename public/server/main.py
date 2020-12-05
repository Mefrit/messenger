import sqlite3
from  public.server.components.registration import Module_registration  
class Server :
    def __init__(self,path2db):
        self.db = sqlite3.connect(path2db)
        
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
    @staticmethod
    def getModule(self, module_name):
        conf = {}
        conf["db"] = self.db
        if module_name == "registration":
            return Module_registration(conf)

    def getAnswerFromComponent(self, conf):
        print(conf)
        obj = self.getModule(self,conf["module"])
        
        return obj.returnAction(conf["action"],conf["data"])