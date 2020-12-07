import * as React from "react";
// import 'css!/../css/main.css';
export class ToolsComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    openDialog = (id_user) => {
        console.log("openDialog", id_user);
        // Подцветить этот элемент
        this.props.openDialog(id_user);
    };
    renderFriendsList() {
        return this.props.friends_list.map((element) => {
            return (
                <li
                    key={element[0] + "list"}
                    onClick={(e) => {
                        this.openDialog(element[0]);
                    }}
                >
                    {element[1]} всего непрочитанных сообщений:
                </li>
            );
        });
    }
    render() {
        return (
            <div>
                <h3>Последние собеседники</h3>
                <ul>{this.renderFriendsList()}</ul>
                <h3>Список возможных собеседников</h3>
                <input type="text" placeholder="Поиск" />
                <input type="button" value="Поиск" />
            </div>
        );
    }
}
