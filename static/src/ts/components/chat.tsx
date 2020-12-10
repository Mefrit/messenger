import * as React from "react";
interface chatProps {
    history_message: any[];
    sentMessage: (value: string) => void;
    id_curent_user: number | string;
    nick_interlocutor: string;
}
interface chatState {
    content: string;
}
export class ChatComponent extends React.Component<chatProps, any> {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
        };
    }
    renderHistory() {
        return this.props.history_message.map((elem) => {
            return (
                <div className="message-page" key={elem[0] + elem[4]}>
                    <div
                        className={this.props.id_curent_user == elem[3] ? "message message_content-myself" : "message"}
                    >
                        <h3 className="message__content">{elem[0]}</h3>
                        <span className="message__date">{this.getDateMessage(elem[4], new Date())}</span>
                    </div>
                </div>
            );
        });
    }

    t2Dig(num) {
        return num.toString().padStart(2, "0");
    }
    getTime(dat) {
        return this.t2Dig(dat.getHours()) + ":" + this.t2Dig(dat.getMinutes()) + ":" + this.t2Dig(dat.getSeconds());
    }
    getDateMessage(timeServer, dNow) {
        let time = "",
            dat = new Date(parseInt(timeServer) * 1000),
            tmp,
            yDat = new Date(dNow);
        yDat.setDate(dNow.getDate() - 1);
        tmp = dNow.getFullYear() - dat.getFullYear();
        if (dNow.getDate() == dat.getDate() && dNow.getMonth() == dat.getMonth()) {
            tmp == 0 ? (time = "cегодня в " + this.getTime(dat)) : "";
        }
        if (yDat.getDate() == dat.getDate()) {
            (tmp == 0 && yDat.getMonth() == dat.getMonth()) || tmp == 1 ? (time = "вчера в " + this.getTime(dat)) : "";
        }
        return time == ""
            ? this.t2Dig(dat.getDate()) +
            "-" +
            this.t2Dig(dat.getMonth() + 1) +
            "-" +
            dat.getFullYear() +
            " " +
            this.getTime(dat)
            : time;
    }

    sentMessage = (event) => {
        this.props.sentMessage(this.state.content);
        this.setState({ content: "" });
    };
    changeContent = (event) => {
        this.setState({
            content: event.target.value,
        });
    };
    renderSentInterface() {
        return (
            <div className="sent-interface">
                <input
                    className="btn btn-textarea"
                    onChange={this.changeContent}
                    placeholder="Поле для ввода"
                    value={this.state.content}
                />

                <img
                    className="sent-interface__image-sent"
                    src="./static/src/images/sent.png"
                    onClick={this.sentMessage}
                    alt="sent"
                />
            </div>
        );
    }
    render() {
        return (
            <div className="chat">
                <div className="interlocutor-inf">
                    <img className="interlocutor-inf__profile-img" src="./static/src/images/profile.png" alt="profile" />
                    <h3 className="interlocutor-inf__nick">{this.props.nick_interlocutor}</h3>
                </div>
                {this.props.history_message.length == 0 ? (
                    <h4 className="chat__logo">Тут будет выводиться история общения с вашим собеседником</h4>
                ) : (
                        ""
                    )}
                <div className="message-container">{this.renderHistory()}</div>
                {this.renderSentInterface()}
            </div>
        );
    }
}
