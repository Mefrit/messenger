import * as React from "react";
// import 'css!/../css/main.css';
export class ChatComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
        }
    }
    renderHistory() {
        console.log("this.props.id_curent_user", this.props.id_curent_user)
        return this.props.history_message.map(elem => {

            return <div><h3 key={elem[0]}>{this.props.id_curent_user == elem[3] ? "You" : ""}:{elem[0]}</h3> time: {elem[4]}</div>
        });
    }
    sentMessage = () => {
        this.props.sentMessage(this.state.content)
    }
    changeContent = (event) => {
        event.preventDefault();
        this.setState({
            content: event.target.value
        });
    }
    renderSentInterface() {
        return <div>
            <input type="textarea" onChange={this.changeContent} placeholder="Поле для ввода" />
            <input type="button" onClick={this.sentMessage} value="Отправить" />
        </div>
    }
    render() {
        return <div>
            {this.renderHistory()}
            {this.renderSentInterface()}
        </div>
    }
}