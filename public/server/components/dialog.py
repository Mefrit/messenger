import time
class Module_dialog:
    def __init__(self,props):
        print("Module_tools\n",props)
        self.db = props["db"]
    @staticmethod
    def actionOpen(self,data):
        # try:
        print("\n\n actionOpen",data)
        result = {}
        cursor = self.db.cursor()
        # query = " SELECT id_message FROM message_access  WHERE id_sent = " + str(data["id_sent"]) + " AND" + str(data["count"]) 
        query = """ SELECT id_message FROM message_access
        WHERE (id_sent = %s AND id_owner = %s) OR
        (id_sent = %s AND id_owner = %s)
        """ % (data["id_sent"], data["id_curent_user"], data["id_curent_user"], data["id_sent"])
        print(query)
        cursor.execute( query )
        cache_id_messages = cursor.fetchall()
        print("cache_id_messages===>>> ",cache_id_messages,len(cache_id_messages))
        if(len(cache_id_messages) == 0):
            result["history_message"] = []
        else:
            id_message = ",".join([str(i[0]) for i in cache_id_messages])
            query = """ SELECT t1.value, t1.id_message, t2.id_sent, t2.id_owner, t2.date FROM messages t1 
            JOIN message_access t2 ON t1.id_message = t2.id_message WHERE t1.id_message IN ( %s ) """ % (id_message)
            print("\n\n",query, "\n\n")
            cursor.execute( query )
            history_message = cursor.fetchall()
            result["history_message"] = history_message
        # #     if(user_data[0][0] == data['password']):
        # #         result["status"] = "ok"
        # #         return result
        # #     else: 
        # result["friends_list"] = friends_list
     
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
        #     result["message"] = "Ошибка при открытии диалога"
        #     return result
    @staticmethod
    def actionSent(self,data):
        #   try:
        cursor = self.db.cursor()
        result = {}
        print("\n\n actionSent", data) 
        message_data = (data['value'],)
        print("messages",message_data)
        cursor.execute("INSERT INTO messages (value) VALUES ( ? ) ", message_data)
        # Если мы не просто читаем, но и вносим изменения в базу данных - необходимо сохранить транзакцию
        self.db.commit()
        query = """SELECT MAX(`id_message`) FROM messages"""
        cursor.execute( query )
        max_id = cursor.fetchall()
        print("\n max_id",max_id[0][0])
        message_access_data =(max_id[0][0],data['id_sent'],time.time(),data['id_curent_user'],) 
        cursor.execute("INSERT INTO message_access (id_message,id_sent,date,id_owner) VALUES ( ?,?,?,? ) ", message_access_data)
        self.db.commit()
        self.db.close()
        result["status"] = "ok"
        return result
        #     except:
        #     result = {}
        #     result["status"] = "fail"
        #     result["message"] = "Ошибка при отправке сообщения"
            
        #     return result
    def returnAction(self ,action, data):
        print(action,data)
        return getattr(self, "action" + action)(self, data)