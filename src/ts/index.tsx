import * as React from "react";
import * as ReactDOM from "react-dom";
import { RegistrationComponent } from "./components/registration";
import { Scene } from "./components/scene";
// import { ImageDownloader } from "./js/loader";
// import { Ai } from "./js/modules/ai";
// import { Scene } from "./js/modules/scene";
// import { Persons } from './js/modules/personsController';
// import { Module } from "./components/modules/module";

const ROOT = document.getElementById("root");
class App extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            enter: true,
            id_curent_user: 5,
        };
    }
    setEnter = (id_curent_user) => {
        this.setState({
            enter: true,
            id_curent_user: id_curent_user,
        });
    };
    render() {
        return (
            <div>
                {this.state.enter ? (
                    <Scene id_curent_user={this.state.id_curent_user} />
                ) : (
                    <RegistrationComponent setEnter={this.setEnter} />
                )}
            </div>
        );
    }
}
ReactDOM.render(<App />, ROOT);
