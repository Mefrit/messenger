class Module_registration:
    def __init__(self,props):
        print("Module_registration\n",props)
        self.db = props["db"]
    def returnAction(self ,action, data):
        print(action,data)
        return getattr(self, "action" + action)(self, data)
    @staticmethod
    def actionReg(self, data):
       
        try:
            result = {}
            cursor = self.db.cursor()
            user_data = (data['nick'],data['login'],data['password'])
            cursor.execute("insert into Users (nick, login, password) values ( ?, ? ,? ) ",user_data)
            # Если мы не просто читаем, но и вносим изменения в базу данных - необходимо сохранить транзакцию
            self.db.commit()
       
            self.db.close()
            result["status"] = "ok"
            return result
        except:
            result = {}
            result["message"] = "Ошибка при регистрации пользователя"
            result["status"] = "fail"
            return result
    @staticmethod
    def actionEnter(self, data):
    
        try:
            result = {}
            cursor = self.db.cursor()
            print("ENTER")
            print("\n enter!!!!!!!!!!!",data,data['login'],data['password'])
            query = " SELECT password FROM users WhERE login = '"+ data['login'] +"'"
            print(query)
            cursor.execute( query )
            user_data = cursor.fetchall()
        
            if(len(user_data) != 0):
                if(user_data[0][0] == data['password']):
                    result["status"] = "ok"
                    return result
                else: 
                    result["status"] = "fail"
                    result["message"] = "Пароли не совпадают"
                    return result
            else:
                result["status"] = "fail"
                result["message"] = "Логин не найден"
                return result
            self.db.close()
        
            return result
        except:
            result = {}
            result["status"] = "fail"
            result["message"] = "Ошибка при входе в систему"
            
            return result