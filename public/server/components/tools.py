class Module_tools:
    def __init__(self,props):
        print("Module_tools\n",props)
        self.db = props["db"]

    @staticmethod
    def actionSearch(self,data):
        result = {}
        cursor = self.db.cursor()
        # query = "SELECT id_user, nick FROM users WHERE nick LIKE '%" + data["nick"] + "%' " 
        query = """ SELECT id_owner FROM message_access WHERE id_sent = 5 GROUP BY id_owner """
        print("\n\n",query)
        cursor.execute( query )
        answer = cursor.fetchall()
        result["users"] = answer
        result["status"] = "ok"
        # print("\n\n\n --------------------------------------------result",result,"\n\n")
        return result

    @staticmethod
    def actionGetInf(self,data):
         # try:
        result = {}
        cursor = self.db.cursor()
        query = """SELECT  nick FROM users WHERE id_user = %s""" % (data["id_curent_user"])
        cursor.execute( query )
        curent_user = cursor.fetchall()
     
        result["nick"] = curent_user[0]
        # message_access t2 ON t2.id_sent != %s  GROUP BY t2.id_owner   
        # query = """SELECT id_user,nick FROM users WHERE id NOT IN (%s) ORDER BY id_user LIMIT 7""" %(data["id_history"])
        query = """SELECT id_owner FROM message_access WHERE id_sent = %s OR id_owner = %s GROUP BY id_owner  """ %(data["id_curent_user"],data["id_curent_user"])
        cursor.execute( query )
        id_sent = []
        id_sent = cursor.fetchall()
        print("id_sent=======>>>>>>>>>> \n",id_sent)
        id_sent = ",".join([str(i[0]) for i in  id_sent])
        query = """ SELECT t1.id_user, t1.nick FROM users t1 WHERE t1.id_user NOT IN (%s) AND t1.id_user != %s 
        GROUP BY t1.id_user ORDER BY  t1.id_user DESC  """ %(id_sent,data["id_curent_user"])
        print(query,'=========\n\n\n\n\n\n')
        cursor.execute( query )
        answer = cursor.fetchall()
      
        print("curent_user----------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>\n\n",curent_user,answer,"\n\n\n\n\n\n\n\n")
        result["users"] = answer
        result["status"] = "ok"
        
        print("\n\n\n --------------------------------------------result",result,"\n\n")
        return result
        # except:
        #     result = {}
        #     result["status"] = "fail"
        #     result["message"] = "Ошибка при получении  информации о пользователе"
        #     return result
    @staticmethod
    def actionGetHistory(self,data):
        # try:
        result = {}
        cursor = self.db.cursor()

        query = """SELECT t2.id_user, t2.nick FROM message_access t1
        JOIN users t2 ON t2.id_user = t1.id_owner OR t2.id_user = t1.id_sent WHERE t1.id_sent = %s OR 
        t1.id_owner = %s 
        GROUP BY t2.id_user  ORDER BY t1.id_link DESC""" % (data['id_curent_user'],data['id_curent_user'])
        # query = """SELECT t1.id_owner, t2.nick FROM message_access t1
        # JOIN users t2 ON t2.id_user = t1.id_owner WHERE id_sent = %s OR t1.id_owner =  %s
        # GROUP BY id_owner""" % (data['id_curent_user'],data['id_curent_user'])

        # query = """SELECT t1.id_owner, t2.nick, COUNT(t3.date_read) FROM message_access t1
        # JOIN users t2 ON t2.id_user = t1.id_owner JOIN message_access t3 ON t3.id_owner = t1.id_owner AND t3.date_read IS 
        # NULL WHERE id_sent = %s  
        # GROUP BY id_owner""" % (data['id_curent_user'])
        # print("\n\n query",query, "\n\n")


        # print("\n\n query",query, "\n\n")
        cursor.execute( query )
       
        friends_list = cursor.fetchall()
        # print("\n friends_list",friends_list,"\n")
     
      
        id_sents = ",".join([str(i[0]) for i in friends_list])
        # подсчет количества непрочитанных сообщений
        query = """ SELECT id_owner,COUNT(*) FROM message_access 
        WHERE id_owner IN (%s) AND id_sent = %s AND date_read IS NULL
        GROUP BY id_owner""" % (id_sents, data['id_curent_user'])
        print("\n\n query111111  ",query,"\n")
        cursor.execute( query )
       
        unreaded_messages = cursor.fetchall()
        # print("unreaded_messages===>>>>\n",unreaded_messages)
        for i in range(len(friends_list)):
            for j in range(len(unreaded_messages)):
                friends_list[i] = list(friends_list[i])
                if(friends_list[i][0] == unreaded_messages[j][0]):
                    friends_list[i].append(unreaded_messages[j][1])
              
     
        # print(friends_list)
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