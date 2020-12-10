import time
import hashlib
class Module_registration:
    def __init__(self,props):
        self.db = props["db"]
    def returnAction(self ,action, data):
        return getattr(self, "action" + action)(self, data)
    @staticmethod
    def actionReg(self, data):
        try:
            result = {}
            cursor = self.db.cursor()
            query = " SELECT COUNT(*) as count FROM users WhERE login = '"+ data['login'] +"'"
            cursor.execute( query )
            user_data = cursor.fetchall()
            if(user_data[0][0] == 0):
                password = hashlib.md5(data['password'].encode())
                user_data = (data['nick'],data['login'],password.hexdigest())
                cursor.execute("INSERT INTO Users (nick, login, password) VALUES ( ?, ? ,? ) ",user_data)
                self.db.commit()      
                query = " SELECT MAX(id_user)  FROM users"
                cursor.execute( query )
                id_user = cursor.fetchall()[0][0]
                users_data = (id_user,id_user,)
                cursor.execute("INSERT INTO users_access (id_user_owner, id_user_sent) VALUES ( ?,? ) ", users_data)
                self.db.commit()
                self.db.close()
                result["id_curent_user"] = id_user
                result["status"] = "ok"
                return result
            else:
                result["message"] = "Текущий логин уже существует"
                result["status"] = "fail"
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
        
            query = """ SELECT password,id_user FROM users WhERE login = '%s' """ % ( data['login'] )
            print("\n\n data['password']=> ",data['password'],data['password'].encode(),"\n\n")
            cursor.execute( query )
            user_data = cursor.fetchall()

            if(len(user_data) != 0):
                password = hashlib.md5(data['password'].encode())
                if(user_data[0][0] == password.hexdigest()):
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