define(["require", "exports", "react", "react-dom"], function (require, exports, React, ReactDOM) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ROOT = document.getElementById("root");
    ReactDOM.render(React.createElement("h1", null, "Hellen"), ROOT);
    var arrPersons = [
        {
            url: "./src/images/person2.png",
            x: 8,
            y: 0,
            evil: true,
            class: "fighter",
            damage: 1,
            health: 50,
            id: 3,
        }
    ];
    var Director1 = (function () {
        function Director1(loader, arrPersons) {
            var _this = this;
            this.startAI = function () {
                _this.ai.step();
            };
            this.ai.initScene(this.scene);
            this.start();
        }
        Director1.prototype.start = function () {
            var play = document.createElement("input");
            play.type = "button";
            play.classList.add("button");
            play.value = "Ход соперника";
            play.addEventListener("click", this.startAI);
            document.getElementById("scene").appendChild(play);
        };
        return Director1;
    }());
    new Director1({}, arrPersons);
});
