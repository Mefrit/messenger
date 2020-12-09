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
        self.main_server.getAllUsers()
        if self.path == '/':
            self.path = "/public/index.html"
        
        if self.path.endswith(".css"):
            self._set_headers_css()
            f = open("./public/" + self.path, 'rb')
            self.wfile.write(f.read())
            f.close()
            return
        else:
            self._set_headers_html()
            f = open("." + self.path, 'rb')
            self.wfile.write(f.read())
            f.close()
            return

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
    PATH2DB = "base.db"
    main()
