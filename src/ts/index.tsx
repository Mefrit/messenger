import * as React from "react";
import * as ReactDOM from "react-dom";
// import { ImageDownloader } from "./js/loader";
// import { Ai } from "./js/modules/ai";
// import { Scene } from "./js/modules/scene";
// import { Persons } from './js/modules/personsController';
// import { Module } from "./components/modules/module";

const ROOT = document.getElementById("root");

ReactDOM.render(<h1>Hellen</h1>, ROOT);

let arrPersons = [

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

class Director1 {
    scene: any;
    ai: any;
    persController: any;
    constructor(loader, arrPersons) {
        // this.ai = new Ai([]);
        // this.scene = new Scene(loader, arrPersons, this.ai);

        this.ai.initScene(this.scene);
        this.start();
    }
    start() {
        let play = document.createElement("input");
        play.type = "button";
        play.classList.add("button");
        play.value = "Ход соперника";
        play.addEventListener("click", this.startAI);
        document.getElementById("scene").appendChild(play);
    }
    startAI = () => {
        this.ai.step();
    };
}
new Director1({}, arrPersons);
