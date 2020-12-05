class Module_registration:
    def __init__(self,props):
        print("Module_registration\n",props)
        self.db = props["db"]
    def returnAction(self ,action, data):
        print(action,data)
        return getattr(self, "actionReg")(self, data)
    @staticmethod
    def actionReg(self, data):
        print("REG")
        try:
            cursor = self.db.cursor()
            user_data = (data['nick'],data['login'],data['password'])
            cursor.execute("insert into Users (nick, login, password) values ( ?, ? ,? ) ",user_data)
            # Если мы не просто читаем, но и вносим изменения в базу данных - необходимо сохранить транзакцию
            self.db.commit()
            print("\n registration",data,data['nick'],data['nick'])
            self.db.close()
            result = {}
            result["status"] = "ok"
            return result
        except:
            result = {}
            result["message"] = "Error in adding new user"
            result["status"] = "fail"
            return result
    def actionEnter(self, data):
        print("ENTER")
        try:
            cursor = self.db.cursor()
            print("ENTER")
            print("\n enter!!!!!!!!!!!",data,data['login'],data['password'])
            query = """ SELECT password FROM users WhERE login = ?"""
            cursor.execute(query,data['login'])
            result = cursor.fetchall()
            ptint(result)
            self.db.close()
            result = {}
            result["status"] = "ok"
            return result
        except:
            result = {}
            result["message"] = "Error in enter"
            result["status"] = "fail"
            return result