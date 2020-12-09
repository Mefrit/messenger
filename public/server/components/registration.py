import time
class Module_registration:
    def __init__(self,props):
        print("Module_registration\n",props)
        self.db = props["db"]
    def returnAction(self ,action, data):
        print(action,data)
        return getattr(self, "action" + action)(self, data)
    @staticmethod
    def actionReg(self, data):
       
        # try:
        result = {}
        cursor = self.db.cursor()
        query = " SELECT COUNT(*) as count FROM users WhERE login = '"+ data['login'] +"'"
        cursor.execute( query )
        user_data = cursor.fetchall()
        print("\n\n\n", user_data)
        if(user_data[0][0] == 0):
            user_data = (data['nick'],data['login'],data['password'])
            cursor.execute("INSERT INTO Users (nick, login, password) VALUES ( ?, ? ,? ) ",user_data)
            # Если мы не просто читаем, но и вносим изменения в базу данных - необходимо сохранить транзакцию
            self.db.commit()
            
         
            # Если мы не просто читаем, но и вносим изменения в базу данных - необходимо сохранить транзакцию
            self.db.commit()
            query = " SELECT id_user  FROM users WhERE login = '"+ data['login'] +"'"
            cursor.execute( query )
            id_user = cursor.fetchall()[0][0]
            curent_user_message = (-1, id_user, time.time(), id_user)
            cursor.execute("INSERT INTO message_access (id_message, id_sent, date, id_owner) VALUES ( ?, ? ,? ) ",curent_user_message)
            self.db.commit()
            self.db.close()
            result["id_user"] = id_user
            result["status"] = "ok"

            return result
        else:
            result["message"] = "Текущий логин уже существует"
            result["status"] = "fail"
            return result
        # except:
        #     result = {}
        #     result["message"] = "Ошибка при регистрации пользователя"
        #     result["status"] = "fail"
        #     return result
    @staticmethod
    def actionEnter(self, data):
    
        try:
            result = {}
            cursor = self.db.cursor()
            print("ENTER")
            print("\n enter!!!!!!!!!!!",data,data['login'],data['password'])
            query = " SELECT password,id_user FROM users WhERE login = '"+ data['login'] +"'"
            print(query)
            cursor.execute( query )
            user_data = cursor.fetchall()
        
            if(len(user_data) != 0):
                if(user_data[0][0] == data['password']):
                    result["id_curent_user"] = user_data[0][1]
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