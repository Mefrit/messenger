import * as React from "react";
import { ToolsComponent } from "./tools";
import { ChatComponent } from "./chat";
// import 'css!/../css/main.css';
export class Scene extends React.Component<any, any> {
    interfal_dialog: any;
    constructor(props) {
        super(props);

        this.interfal_dialog;
        this.state = {
            friends_list: [],
            id_sent: -1,
            open_dialog: false,
            history_message: [],
            nick: "",
            nick_interlocutor: "",
            users: [],

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
                    console.log(result.friends_list)
                    this.setState({
                        friends_list: result.friends_list,
                    });
                } else {
                    alert(result.message);
                }
            });
    };
    getInf() {
        // let id_history = this.state.friends_list.map(elem => {
        //     return elem[0];
        // })
        alert(this.props.id_curent_user)
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
                        users: result.users,
                    });
                } else {
                    alert(result.message);
                }
            });
    }
    componentDidMount() {
        this.getInf();
        // this.getHistory();

        // setInterval(() => {

        //     this.getHistory();

        // }, 7000);
    }
    openDialog = (id_sent, nick_interlocutor) => {
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
                    clearInterval(this.interfal_dialog);
                    this.setState({
                        open_dialog: true,
                        id_sent: id_sent,
                        history_message: result.history_message,
                        nick_interlocutor: nick_interlocutor
                    });
                    this.interfal_dialog = setInterval(() => {
                        this.openDialog(id_sent, nick_interlocutor);
                    }, 2000);
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
                    this.openDialog(this.state.id_sent, this.state.nick_interlocutor);
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
        if (search_nick == "")

            fetch("/?module=tools&action=Search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({
                    nick: search_nick,
                }),
            })
                .then((data) => data.json())
                .then((result) => {
                    console.log("result from server sentMessage", result);
                    if (result.status == "ok") {
                        this.setState({
                            users: result.users,
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
    };
    render() {
        return (
            <div className="container">
                <ToolsComponent
                    openDialog={this.openDialog}
                    searchUser={this.searchUser}
                    users={this.state.users}
                    nick={this.state.nick}
                    friends_list={this.state.friends_list}
                    id_sent={this.state.id_sent}
                    id_curent_user={this.props.id_curent_user}
                />
                {
                    <ChatComponent
                        history_message={this.state.open_dialog ? this.state.history_message : []}
                        sentMessage={this.sentMessage}
                        id_curent_user={this.props.id_curent_user}
                        nick_interlocutor={this.state.nick_interlocutor}
                    />
                    /* {this.state.open_dialog ? (
                    <ChatComponent
                        history_message={this.state.history_message}
                        sentMessage={this.sentMessage}
                        id_curent_user={this.props.id_curent_user}
                    />
                ) : (
                    ""
                ) */
                }
            </div>
        );
    }
}
