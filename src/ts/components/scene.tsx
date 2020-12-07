import * as React from "react";
import { ToolsComponent } from "./tools";
import { ChatComponent } from "./chat";
// import 'css!/../css/main.css';
export class Scene extends React.Component<any, any> {
    constructor(props) {
        super(props);
        console.log("Scene props", props);
        this.state = {
            friends_list: [],
            id_sent: -1,
            open_dialog: false,
            history_message: [],
        };
    }
    componentDidMount() {
        fetch("/?module=tools&action=GetHistory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ count: 10, ref: 0, id_curent_user: this.props.id_curent_user }),
        })
            .then((data) => data.json())
            .then((result) => {
                console.log("result from server", result);
                if (result.status == "ok") {
                    this.setState({
                        friends_list: result.friends_list,
                        user_list: [],
                    });
                } else {
                    alert(result.message);
                }
            });
    }
    openDialog = (id_sent) => {
        console.log(id_sent);
        fetch("/?module=dialog&action=Open", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ id_sent: id_sent, id_curent_user: this.props.id_curent_user }),
        })
            .then((data) => data.json())
            .then((result) => {
                console.log("result from server openDialog", result);
                if (result.status == "ok") {
                    this.setState({
                        open_dialog: true,
                        id_sent: id_sent,
                        history_message: result.history_message,
                    });
                } else {
                    alert(result.message);
                }
            });
    };
    sentMessage = (value) => {
        console.log("sentMessage to ", this.state.id_sent, value, " from ", this.props.id_curent_user);
        fetch("/?module=dialog&action=Sent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                id_sent: this.state.id_sent,
                value: value,
                id_curent_user: this.props.id_curent_user,
            }),
        })
            .then((data) => data.json())
            .then((result) => {
                console.log("result from server sentMessage", result);
                if (result.status == "ok") {
                    //сообщение что успешно все отправлено
                    this.openDialog(this.state.id_sent);
                }
                // this.openDialog(this.state.id_sent)
                // this.setState({
                //     open_dialog: true,
                //     id_sent: id_sent,
                //     history_message: result.history_message
                // })
            });
    };
    render() {
        console.log(this.state);
        return (
            <div>
                <ToolsComponent openDialog={this.openDialog} friends_list={this.state.friends_list} />
                {this.state.open_dialog ? (
                    <ChatComponent
                        history_message={this.state.history_message}
                        sentMessage={this.sentMessage}
                        id_curent_user={this.props.id_curent_user}
                    />
                ) : (
                    ""
                )}
            </div>
        );
    }
}
