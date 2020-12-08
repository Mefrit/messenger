import * as React from "react";
// import 'css!/../css/main.css';
export class ToolsComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            search_nick: ""
        }
    }
    openDialog = (id_user) => {
        console.log("openDialog", id_user);
        // Подцветить этот элемент
        this.props.openDialog(id_user);
    };
    renderFriendsList(list, show_message_count) {
        // this.props.friends_list
        return list.map((element) => {
            return (
                <li
                    key={element[0] + "list"}
                    onClick={(e) => {
                        this.openDialog(element[0]);
                    }}
                >
                    {element[1]} {show_message_count ? "всего непрочитанных сообщений: " + element[2] : ""}
                </li>
            );
        });
    }
    changeSearchNick = (event) => {
        this.setState({
            search_nick: event.target.value
        })
    }
    searchUser = (event) => {
        event.target.value;
        this.props.searchUser(this.state.search_nick)
    }
    render() {
        return (
            <div>
                <h3>Последние собеседники</h3>
                <ul>{this.renderFriendsList(this.props.friends_list, true)}</ul>
                <input type="text" placeholder="Введите никнейм пользователя" onChange={this.changeSearchNick} />
                <input type="button" onClick={this.searchUser} value="Поиск" />
                <h3>Список возможных собеседников</h3>
                <ul>{this.renderFriendsList(this.props.users, false)}</ul>

            </div>
        );
    }
}
