import * as React from "react";
// import 'css!/../css/main.css';
export class ToolsComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            search_nick: "",
        };
    }
    openDialog = (id_user, nick_interlocutor) => {
        console.log("openDialog", id_user);
        // Подцветить этот элемент
        this.props.openDialog(id_user, nick_interlocutor);
    };
    renderFriendsList(list, show_message_count) {
        // this.props.friends_list
        return list.map((element) => {
            return (
                <li
                    key={element[0] + "list"}
                    onClick={(e) => {
                        this.openDialog(element[0], element[1]);
                    }}
                    className={element[0] == this.props.id_sent ? "dialog dialog_active" : "dialog "}

                >

                    <img className="dialog__image-profile" src="../src/images/profile.png" alt="profile" />
                    <span className="dialog__author" >{element[1]} </span>
                    { show_message_count && !!element[2] ? <div className="dialog__numb-message">  {element[2]}  </div> : ""}
                </li >
            );
        });
    }
    changeSearchNick = (event) => {
        this.setState({
            search_nick: event.target.value,
        });
    };
    searchUser = (event) => {
        event.target.value;
        this.props.searchUser(this.state.search_nick);
    };
    render() {

        const users = this.props.users.filter(elem => elem[0] != this.props.id_curent_user)
        console.log(this.props.users, users, this.props.id_curent_user);
        return (
            <div className="container_tools">
                <div className="menu">
                    <div className="menu__logo">
                        <span className="menu__logo-title">Mef.me</span>
                        <img className="menu__logo-image" src="../src/images/logo.png" alt="logo" />
                    </div>
                    <a href="#message"><img className="menu__logo-image menu__logo-image_small" src="../src/images/message.png" alt="about" /></a>
                    <a href="#about"><img className="menu__logo-image" src="../src/images/about.png" alt="about" /></a>
                </div>
                <div className="tools">
                    <h2 className="tools__nick">@{this.props.nick}</h2>
                    <h3 className="tools__label">Последние собеседники</h3>
                    <ul className="tools__history">{this.renderFriendsList(this.props.friends_list, true)}</ul>


                    <h3>Список возможных собеседников</h3>
                    <div className="search-user">
                        <input type="text" className="btn btn-text" placeholder="Введите никнейм " onChange={this.changeSearchNick} />
                        <input type="button" className="btn btn-primal" onClick={this.searchUser} value="Поиск" />
                    </div>
                    <ul className="dialog-container">{this.renderFriendsList(users, false)}</ul>
                </div>
            </div>
        );
    }
}
