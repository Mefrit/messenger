import * as React from "react";
import { ToolsComponent } from "./tools";
import { ChatComponent } from "./chat";
// import 'css!/../css/main.css';
export class Scene extends React.Component<any, any> {
    constructor(props) {
        super(props);
        console.log("Scene props", props);
        this.interfal_dialog;
        this.state = {
            friends_list: [],
            id_sent: -1,
            open_dialog: false,
            history_message: [],
            nick: "",
            users: []
        };
    }
    getHistory = () => {

        fetch("/?module=tools&action=GetHistory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ count: 10, ref: 0, id_curent_user: this.props.id_curent_user }),
        })
            .then((data) => data.json())
            .then((result) => {
                if (result.status == "ok") {
                    this.setState({
                        friends_list: result.friends_list,
                    });
                } else {
                    alert(result.message);
                }
            });
    }
    getInf() {
        fetch("/?module=tools&action=GetInf", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ id_curent_user: this.props.id_curent_user }),
        })
            .then((data) => data.json())
            .then((result) => {

                if (result.status == "ok") {
                    this.setState({
                        nick: result.nick,
                        users: result.users
                    });
                } else {
                    alert(result.message);
                }
            });
    }
    componentDidMount() {
        this.getInf()
        this.getHistory();
        setInterval(() => {
            this.getHistory();
        }, 7000)
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
                    clearInterval(this.interfal_dialog)
                    this.setState({
                        open_dialog: true,
                        id_sent: id_sent,
                        history_message: result.history_message,
                    });
                    this.interfal_dialog = setInterval(() => { this.openDialog(id_sent); }, 1200)
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
    searchUser = (search_nick) => {
        fetch("/?module=tools&action=Search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                nick: search_nick
            }),
        })
            .then((data) => data.json())
            .then((result) => {
                console.log("result from server sentMessage", result);
                if (result.status == "ok") {
                    this.setState({
                        users: result.users
                    });
                } else {
                    alert(result.message);
                }
                // this.openDialog(this.state.id_sent)
                // this.setState({
                //     open_dialog: true,
                //     id_sent: id_sent,
                //     history_message: result.history_message
                // })
            });
    }
    render() {

        return (
            <div>
                <h1>{this.state.nick}</h1>
                <input type="button" value="Update histoty" onClick={this.getHistory} />
                <ToolsComponent
                    openDialog={this.openDialog}
                    searchUser={this.searchUser}
                    users={this.state.users}
                    friends_list={this.state.friends_list} />
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
