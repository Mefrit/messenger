import * as React from "react";
import * as ReactDOM from "react-dom";
import { RegistrationComponent } from "./components/registration";
import { Scene } from "./components/scene";

const ROOT = document.getElementById("root");
interface appState {
    enter: boolean;
    id_curent_user: number;
}
class App extends React.Component<{}, appState> {
    constructor(props) {
        super(props);
        this.state = {
            enter: false,
            id_curent_user: 25,
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
            <div className="container">
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
