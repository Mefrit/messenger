class Module_tools:
    def __init__(self,props):
        print("Module_tools\n",props)
        self.db = props["db"]
    @staticmethod
    def actionGetHistory(self,data):
        # try:
        result = {}
        cursor = self.db.cursor()
        # query = " SELECT nick,id_user FROM users  WHERE id_user > " + str(data["ref"]) + " LIMIT " + str(data["count"])
        # query = """ SELECT t2.nick , t2.id_user FROM message_access t1 JOIN users t2 ON t1.id_user = t2.id_owner WHERE """
        query = """SELECT t1.id_owner , t2.nick FROM message_access t1 JOIN users t2 ON t2.id_user = t1.id_owner WHERE id_sent = %s  GROUP BY id_owner""" % (data['id_curent_user'])
        print("\n\n query",query, "\n\n")
        cursor.execute( query )
        friends_list = cursor.fetchall()
        print("\n friends_list",friends_list,"\n")
        # if(len(user_data) != 0):
        #     if(user_data[0][0] == data['password']):
        #         result["status"] = "ok"
        #         return result
        #     else: 
        result["friends_list"] = friends_list
        result["status"] = "ok"
        self.db.close()
        return result
            # else:
            #     result["status"] = "fail"
            #     result["message"] = "Логин не найден"
            #     return result
         
        
            # return result
        # except:
        #     result = {}
        #     result["status"] = "fail"
        #     result["message"] = "Ошибка при получении списка друзей"
        #     return result
    def returnAction(self ,action, data):
        print(action,data)
        return getattr(self, "action" + action)(self, data)