# python server.py

from http.server import BaseHTTPRequestHandler, HTTPServer,CGIHTTPRequestHandler # python3 
from public.server.main import Server 
import os
import json
class HandleRequests(BaseHTTPRequestHandler):
    def __init__(self, *args, directory=None, **kwargs):
        if directory is None:
            directory = os.getcwd()
        self.directory = os.fspath(directory)
        self.main_server = Server(PATH2DB)
        super().__init__(*args, **kwargs)
        # init main server class
     
      

    def _set_headers_html(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    def _set_headers_css(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/css')
        self.end_headers()

    def _set_headers_json(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

    def do_GET(self):
        result = dict()
        self.main_server.getAllUsers()
        # print(self.path, self.path.endswith(".html"));
        # print("self.path!!!!!!!!!!!!!!!!!!!!!!!",self.path, self.path.endswith('/?action=test'))
        # if self.path == '/':
        #     self.path = "/public/index.html"
           
            # self._set_headers_json()
            # result["answer"] = self.path + "json"
            # result = json.dumps(result)
            # self.wfile.write(json.dumps({'hello': 'world', 'received': 'ok'}).encode())
        
        if self.path.endswith(".css"):
            self._set_headers_css()
            print(" Csss     FILEOPEN========>>>>>> ",self.path,"\n")
            f = open("." + self.path, 'rb')
            self.wfile.write(f.read())
            f.close()
            return
        else:
            self._set_headers_html()
            print("FILEOPEN========>>>>>> ",self.path,"\n")
            f = open("." + self.path, 'rb')
          
            self.wfile.write(f.read())
            f.close()
            return
        # return result.encode()``

    def do_POST(self):
        content_len = int(self.headers.get('content-length', 0))
        post_body = self.rfile.read(content_len)
        data = json.loads(post_body)
      
        conf = self.geActionRequest(self,self.path)
        conf["data"] = data
        answer = self.main_server.getAnswerFromComponent(conf)
        self.send_response(301)
        self._set_headers_json()
        self.wfile.write(json.dumps(answer).encode())
        return
    @staticmethod
    def geActionRequest(self,path):
        
        result = dict()
        cache = path.split("&")
        result["module"] = cache[0].split("=")[1]
        result["action"] = cache[1].split("=")[1]
        return result
    
        
# python server.py
def main():
    server = HTTPServer(('',PORT), HandleRequests)
    print("Server runing in port %s" % PORT)
    server.serve_forever()

if __name__ == '__main__':
    PORT = 8000
    # PATH2DB = "F:\\projects\\messenger\\public\\server\\db\\base.db"
    PATH2DB = "D:\\Projects\\messenger\\public\\server\\db\\base.db"
    main()

# from http.server import HTTPServer, CGIHTTPRequestHandler
# server_address = ("", 8002)
# httpd = HTTPServer(server_address, CGIHTTPRequestHandler)
# httpd.serve_forever()


# from http.server import HTTPServer, BaseHTTPRequestHandler
# import socket

# sock = socket.socket()
# sock.bind(('', 9090))
# sock.listen(1)
# conn, addr = sock.accept()

# print ('connected:', addr)

# while True:
#     data = conn.recv(1024)
#     if not data:
#         break
#     conn.send(data.upper())



# conn.close()

# work
# import asyncio
# import datetime
# import random
# import websockets

# async def time(websocket, path):
#     while True:
#         now = datetime.datetime.utcnow().isoformat() + 'Z'
#         await websocket.send(now)
#         await asyncio.sleep(random.random() * 3)

# start_server = websockets.serve(time, '127.0.0.1', 5678)

# asyncio.get_event_loop().run_until_complete(start_server)
# asyncio.get_event_loop().run_forever()



# from http.server import BaseHTTPRequestHandler, HTTPServer # python3
# class HandleRequests(BaseHTTPRequestHandler):
#     def _set_headers(self):
#         self.send_response(200)
#         self.send_header('Content-type', 'text/html')
#         self.end_headers()

#     def do_GET(self):
#         self._set_headers()
#         self.wfile.write("received get request")

#     def do_POST(self):
#         '''Reads post request body'''
#         self._set_headers()
#         content_len = int(self.headers.getheader('content-length', 0))
#         post_body = self.rfile.read(content_len)
#         self.wfile.write("received post request:<br>{}".format(post_body))

#     def do_PUT(self):
#         self.do_POST()

# host = ''
# port = 8002
# HTTPServer((host, port), HandleRequests).serve_forever()