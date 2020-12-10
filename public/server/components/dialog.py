import time
class Module_dialog:
    def __init__(self,props):
        self.db = props["db"]
    @staticmethod
    def actionOpen(self,data):
        try:
            result = {}
            cursor = self.db.cursor()
            query = """ SELECT id_message FROM message_access
            WHERE (id_sent = %s AND id_owner = %s) OR
            (id_sent = %s AND id_owner = %s)
            """ % (data["id_sent"], data["id_curent_user"], data["id_curent_user"], data["id_sent"])
            cursor.execute( query )
            cache_id_messages = cursor.fetchall()
            if(len(cache_id_messages) == 0):
                result["history_message"] = []
            else:
                id_message = ",".join([str(i[0]) for i in cache_id_messages])
                query = """ SELECT t1.value, t1.id_message, t2.id_sent, t2.id_owner, t2.date FROM messages t1 
                JOIN message_access t2 ON t1.id_message = t2.id_message WHERE t1.id_message IN ( %s )  """ % (id_message)
                cursor.execute(query)
                history_message = cursor.fetchall()
                result["history_message"] = history_message
                query = """
                UPDATE message_access 
                SET date_read = %d 
                WHERE id_owner = %s AND id_sent = %s
                """ % (time.time(),data["id_sent"],data["id_curent_user"] )
                cursor.execute(query)
                self.db.commit()
            result["status"] = "ok"
            self.db.close()
            return result
        except:
            result = {}
            result["status"] = "fail"
            result["message"] = "Ошибка при открытии диалога"
            return result
    @staticmethod
    def actionSent(self,data):
        try:
            cursor = self.db.cursor()
            result = {}
            query = """ SELECT COUNT(*) FROM users_access  WHERE id_user_owner = %s AND id_user_sent = %s""" % (data["id_curent_user"],data["id_sent"])
            cursor.execute(query)
            new_user = cursor.fetchall()
            if(new_user[0][0] == 0):
                users_data = [(data['id_curent_user'],data['id_sent']),(data['id_sent'],data['id_curent_user'])]
                cursor.executemany("INSERT INTO users_access (id_user_owner,id_user_sent) VALUES ( ?,? ) ", users_data)
                self.db.commit()
            message_data = (data['value'],)
            cursor.execute("INSERT INTO messages (value) VALUES ( ? ) ", message_data)
            # Если мы не просто читаем, но и вносим изменения в базу данных - необходимо сохранить транзакцию
            self.db.commit()
            query = """SELECT MAX(`id_message`) FROM messages"""
            cursor.execute( query )
            max_id = cursor.fetchall()
            message_access_data =(max_id[0][0],data['id_sent'],time.time(),data['id_curent_user'],) 
            cursor.execute("INSERT INTO message_access (id_message,id_sent,date,id_owner) VALUES ( ?,?,?,? ) ", message_access_data)
            self.db.commit()
            self.db.close()
            result["status"] = "ok"
            return result
        except:
            result = {}
            result["status"] = "fail"
            result["message"] = "Ошибка при отправке сообщения"
            return result
    def returnAction(self ,action, data):
        return getattr(self, "action" + action)(self, data)