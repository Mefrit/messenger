from flask import Flask, request, render_template, jsonify
from public.server.main import Server
app = Flask(__name__)


@app.route("/", methods=['GET', 'POST'])
def start():
    if(request.method == "POST"):
        PATH2DB = "base.db"
        conf = {}
        main_server = Server(PATH2DB)

        conf["module"] = request.args.get("module")
        conf["action"] = request.args.get("action")
        conf["data"] = request.json

        result = main_server.getAnswerFromComponent(conf)

        return jsonify(result)
        
    return render_template("index.html")


if __name__ == "__main__":

    app.run(port=4567)
