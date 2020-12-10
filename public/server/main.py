import sqlite3
from public.server.components.registration import Module_registration  
from public.server.components.tools import Module_tools  
from public.server.components.dialog import Module_dialog 
class Server :
    def __init__(self,path2db):
        self.db = sqlite3.connect(path2db)
   
    def getDB(self):
        return self.db
    @staticmethod
    def getModule(self, module_name):
        conf = {}
        conf["db"] = self.db
        if module_name == "registration":
            return Module_registration(conf)
        if module_name == "tools":
            return Module_tools(conf)
        if module_name == "dialog":
            return Module_dialog(conf)

    def getAnswerFromComponent(self, conf):
        obj = self.getModule(self,conf["module"])
        return obj.returnAction(conf["action"],conf["data"])