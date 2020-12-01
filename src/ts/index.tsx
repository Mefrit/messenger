import * as React from "react";
import * as ReactDOM from "react-dom";
import { RegistrationComponent } from "./components/registration"
// import { ImageDownloader } from "./js/loader";
// import { Ai } from "./js/modules/ai";
// import { Scene } from "./js/modules/scene";
// import { Persons } from './js/modules/personsController';
// import { Module } from "./components/modules/module";

const ROOT = document.getElementById("root");
class App extends React.Component<any, any>{
    constructor(props) {
        super(props);
        this.state = {
            enter: false
        };

    }
    render() {
        return <div>
            {this.state.enter ? <h1>You areEnter</h1> : <RegistrationComponent />}
        </div>;
    }
}
ReactDOM.render(<App />, ROOT);

let arrPersons1111s1111s1111sssss1111111111 = [

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

