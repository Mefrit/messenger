

# from http.server import HTTPServer, CGIHTTPRequestHandler
# server_address = ("", 8002)
# httpd = HTTPServer(server_address, CGIHTTPRequestHandler)
# httpd.serve_forever()
# from http.server import HTTPServer, BaseHTTPRequestHandler


# class Serv(BaseHTTPRequestHandler):

#     def do_GET(self):
       
#         if self.path == '/':
#             self.path = './public/index.html'
#         if self.path == '/public':
#             self.path = '/index.html'
#         try:
            
#             file_to_open = open(self.path[1:]).read()
#             self.send_response(200)
#         except:
#             file_to_open = "File not found11"
#             self.send_response(404)
#         self.end_headers()
#         self.wfile.write(bytes(file_to_open, 'utf-8'))


# httpd = HTTPServer(('localhost', 8080), Serv)
# httpd.serve_forever()

import asyncio
import datetime
import random
import websockets

async def time(websocket, path):
    while True:
        now = datetime.datetime.utcnow().isoformat() + 'Z'
        await websocket.send(now)
        await asyncio.sleep(random.random() * 3)

start_server = websockets.serve(time, '127.0.0.1', 5678)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()



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