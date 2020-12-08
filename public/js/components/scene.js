var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "react", "./tools", "./chat"], function (require, exports, React, tools_1, chat_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Scene = void 0;
    var Scene = (function (_super) {
        __extends(Scene, _super);
        function Scene(props) {
            var _this = _super.call(this, props) || this;
            _this.getHistory = function () {
                fetch("/?module=tools&action=GetHistory", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify({ count: 10, ref: 0, id_curent_user: _this.props.id_curent_user }),
                })
                    .then(function (data) { return data.json(); })
                    .then(function (result) {
                    if (result.status == "ok") {
                        _this.setState({
                            friends_list: result.friends_list,
                        });
                    }
                    else {
                        alert(result.message);
                    }
                });
            };
            _this.openDialog = function (id_sent) {
                console.log(id_sent);
                fetch("/?module=dialog&action=Open", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify({ id_sent: id_sent, id_curent_user: _this.props.id_curent_user }),
                })
                    .then(function (data) { return data.json(); })
                    .then(function (result) {
                    console.log("result from server openDialog", result);
                    if (result.status == "ok") {
                        clearInterval(_this.interfal_dialog);
                        _this.setState({
                            open_dialog: true,
                            id_sent: id_sent,
                            history_message: result.history_message,
                        });
                        _this.interfal_dialog = setInterval(function () { _this.openDialog(id_sent); }, 1200);
                    }
                    else {
                        alert(result.message);
                    }
                });
            };
            _this.sentMessage = function (value) {
                console.log("sentMessage to ", _this.state.id_sent, value, " from ", _this.props.id_curent_user);
                fetch("/?module=dialog&action=Sent", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify({
                        id_sent: _this.state.id_sent,
                        value: value,
                        id_curent_user: _this.props.id_curent_user,
                    }),
                })
                    .then(function (data) { return data.json(); })
                    .then(function (result) {
                    console.log("result from server sentMessage", result);
                    if (result.status == "ok") {
                        _this.openDialog(_this.state.id_sent);
                    }
                });
            };
            _this.searchUser = function (search_nick) {
                fetch("/?module=tools&action=Search", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify({
                        nick: search_nick
                    }),
                })
                    .then(function (data) { return data.json(); })
                    .then(function (result) {
                    console.log("result from server sentMessage", result);
                    if (result.status == "ok") {
                        _this.setState({
                            users: result.users
                        });
                    }
                    else {
                        alert(result.message);
                    }
                });
            };
            console.log("Scene props", props);
            _this.interfal_dialog;
            _this.state = {
                friends_list: [],
                id_sent: -1,
                open_dialog: false,
                history_message: [],
                nick: "",
                users: []
            };
            return _this;
        }
        Scene.prototype.getInf = function () {
            var _this = this;
            fetch("/?module=tools&action=GetInf", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({ id_curent_user: this.props.id_curent_user }),
            })
                .then(function (data) { return data.json(); })
                .then(function (result) {
                if (result.status == "ok") {
                    _this.setState({
                        nick: result.nick,
                        users: result.users
                    });
                }
                else {
                    alert(result.message);
                }
            });
        };
        Scene.prototype.componentDidMount = function () {
            var _this = this;
            this.getInf();
            this.getHistory();
            setInterval(function () {
                _this.getHistory();
            }, 7000);
        };
        Scene.prototype.render = function () {
            return (React.createElement("div", null,
                React.createElement("h1", null, this.state.nick),
                React.createElement("input", { type: "button", value: "Update histoty", onClick: this.getHistory }),
                React.createElement(tools_1.ToolsComponent, { openDialog: this.openDialog, searchUser: this.searchUser, users: this.state.users, friends_list: this.state.friends_list }),
                this.state.open_dialog ? (React.createElement(chat_1.ChatComponent, { history_message: this.state.history_message, sentMessage: this.sentMessage, id_curent_user: this.props.id_curent_user })) : ("")));
        };
        return Scene;
    }(React.Component));
    exports.Scene = Scene;
});
