class Module_tools:
    def __init__(self,props):
        print("Module_tools\n",props)
        self.db = props["db"]

    @staticmethod
    def actionSearch(self,data):
        try:
            result = {}
            cursor = self.db.cursor()
            query = "SELECT id_user, nick FROM users WHERE nick LIKE '%" + data["nick"] + "%' " 

            cursor.execute( query )
            answer = cursor.fetchall()
            result["users"] = answer
            result["status"] = "ok"
            return result
        except:
            result = {}
            result["status"] = "fail"
            result["message"] = "Ошибка при поиске информации о пользователе"
            return result
    @staticmethod
    def actionGetInf(self,data):
        try:
            result = {}
            cursor = self.db.cursor()
            query = """SELECT nick FROM users WHERE id_user = %s """ % (data["id_curent_user"])
            cursor.execute( query )
            curent_user = cursor.fetchall()
            result["nick"] = curent_user 
            query = """SELECT id_user_sent FROM users_access WHERE id_user_owner= %s """ % (data["id_curent_user"])
            cursor.execute( query )
            id_in_history = cursor.fetchall()
            id_in_history = ",".join([str(i[0]) for i in  id_in_history])
            query = """SELECT id_user, nick FROM users WHERE id_user NOT IN (%s) ORDER BY id_user DESC""" % (id_in_history)
            cursor.execute( query )
            users = []
            users = cursor.fetchall()
            result["users"] = users
            result["status"] = "ok"
            return result
        except:
            result = {}
            result["status"] = "fail"
            result["message"] = "Ошибка при получении  информации о пользователе"
            return result
    @staticmethod
    def actionGetHistory(self,data):
        try:
            result = {}
            cursor = self.db.cursor()
            query = """SELECT t2.id_user, t2.nick FROM users t2
            JOIN users_access t1 ON t1.id_user_sent = t2.id_user WHERE t1.id_user_owner = %s OR t2.id_user = %s 
            GROUP BY t2.id_user""" % (data['id_curent_user'],data['id_curent_user'])
            cursor.execute( query )
            friends_list = cursor.fetchall()
            id_sents = ",".join([str(i[0]) for i in friends_list])
            # подсчет количества непрочитанных сообщений
            query = """ SELECT id_owner,COUNT(*) FROM message_access 
            WHERE id_owner IN (%s) AND id_sent = %s AND date_read IS NULL
            GROUP BY id_owner""" % (id_sents, data['id_curent_user'])
            cursor.execute( query )
            unreaded_messages = cursor.fetchall()
            for i in range(len(friends_list)):
                for j in range(len(unreaded_messages)):
                    friends_list[i] = list(friends_list[i])
                    if(friends_list[i][0] == unreaded_messages[j][0]):
                        friends_list[i].append(unreaded_messages[j][1])

            result["friends_list"] = friends_list
            result["status"] = "ok"
            self.db.close()
            return result
          
        except:
            result = {}
            result["status"] = "fail"
            result["message"] = "Ошибка при получении списка друзей"
            return result
    def returnAction(self ,action, data):
        print(action,data)
        return getattr(self, "action" + action)(self, data)