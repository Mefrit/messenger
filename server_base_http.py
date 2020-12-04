# python server.py

from http.server import BaseHTTPRequestHandler, HTTPServer,CGIHTTPRequestHandler # python3 
import sqlite3
import json
class HandleRequests(BaseHTTPRequestHandler):
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
        print("self.path!!!!!!!!!!!!!!!!!!!!!!!",self.path, self.path.endswith('/?action=test'))
        if self.path.endswith('/?action=test'):
            print("JSSSSSSSSSSSSSSSSSSSSSSOOOOOOOOOOOOOOOOOOOOOOONnnnnnnnnnnnnnnnnnnn")
            self._set_headers_json()
            result["answer"] = self.path + "json"
            result = json.dumps(result)
            self.wfile.write(json.dumps({'hello': 'world', 'received': 'ok'}).encode())
            return
        elif self.path.endswith(".css"):
            self._set_headers_css()
            print(" Csss     FILEOPEN========>>>>>> ",self.path,"\n")
            f = open("." + self.path, 'rb')
            self.wfile.write(f.read())
            f.close()
            return
        else:
            self._set_headers_html()
            #  self.path - текущий путь в url
            print("FILEOPEN========>>>>>> ",self.path,"\n")
            f = open("." + self.path, 'rb')
            # self.wfile.write(result)
            self.wfile.write(f.read())
            f.close()
            return
            # result["answer"] = self.path+ "html"
            # result = json.dumps(result) 
            # self.wfile.write(result.encode())
       

        # return result.encode()

    def do_POST(self):
        # try:
        # ctype, pdict = cgi.parse_header(self.headers['content-type'])
        # fields = cgi.parse_multipart(self.rfile, pdict)
        # pdict['boundary'] = bytes(pdict['boundary'], "utf-8")
        
        
        content_len = int(self.headers.get('content-length', 0))
        post_body = self.rfile.read(content_len)
        print("\n do_POST",json.loads(post_body))
        self.send_response(301)
        self._set_headers_json()
        self.wfile.write(json.dumps({'hello': 'world', 'received': 'ok'}).encode())
        return
        # except:
        #     print("Something went wrong, inside exception..")

    def do_PUT(self):
        self.do_POST()

def main():
    PORT = 8000
    server = HTTPServer(('',PORT), HandleRequests)
    print("Server runing in port %s" % PORT)
    server.serve_forever()

if __name__ == '__main__':
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