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

