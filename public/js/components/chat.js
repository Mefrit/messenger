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
define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ChatComponent = void 0;
    var ChatComponent = (function (_super) {
        __extends(ChatComponent, _super);
        function ChatComponent(props) {
            var _this = _super.call(this, props) || this;
            _this.sentMessage = function () {
                _this.props.sentMessage(_this.state.content);
            };
            _this.changeContent = function (event) {
                event.preventDefault();
                _this.setState({
                    content: event.target.value,
                });
            };
            _this.state = {
                content: "",
            };
            return _this;
        }
        ChatComponent.prototype.renderHistory = function () {
            var _this = this;
            console.log("this.props.id_curent_user", this.props.id_curent_user);
            return this.props.history_message.map(function (elem) {
                return (React.createElement("div", { className: "message-page", key: elem[0] + elem[4] },
                    React.createElement("div", { className: _this.props.id_curent_user == elem[3] ? "message message_content-myself" : "message" },
                        React.createElement("h3", { className: "message__content" }, elem[0]),
                        React.createElement("span", { className: "message__date" }, _this.getDateMessage(elem[4], new Date())))));
            });
        };
        ChatComponent.prototype.t2Dig = function (num) {
            return num.toString().padStart(2, "0");
        };
        ChatComponent.prototype.getTime = function (dat) {
            return this.t2Dig(dat.getHours()) + ":" +
                this.t2Dig(dat.getMinutes()) + ":" + this.t2Dig(dat.getSeconds());
        };
        ChatComponent.prototype.getDateMessage = function (timeServer, dNow) {
            var time = "", dat = new Date(parseInt(timeServer) * 1000), tmp, yDat = new Date(dNow);
            yDat.setDate(dNow.getDate() - 1);
            tmp = dNow.getFullYear() - dat.getFullYear();
            if (dNow.getDate() == dat.getDate() && dNow.getMonth() == dat.getMonth()) {
                tmp == 0 ? time = "cегодня в " + this.getTime(dat) : "";
            }
            if (yDat.getDate() == dat.getDate()) {
                tmp == 0 && yDat.getMonth() == dat.getMonth() || tmp == 1 ?
                    time = "вчера в " + this.getTime(dat) : "";
            }
            return time == "" ? this.t2Dig(dat.getDate()) + "-" + this.t2Dig((dat.getMonth() + 1)) + "-" + dat.getFullYear() + " " + this.getTime(dat) : time;
        };
        ChatComponent.prototype.renderSentInterface = function () {
            return (React.createElement("div", { className: "sent-interface" },
                React.createElement("textarea", { className: "btn btn-textarea", onChange: this.changeContent, placeholder: "\u041F\u043E\u043B\u0435 \u0434\u043B\u044F \u0432\u0432\u043E\u0434\u0430" }),
                React.createElement("img", { className: "sent-interface__image-sent", src: "../src/images/sent.png", onClick: this.sentMessage, alt: "sent" })));
        };
        ChatComponent.prototype.render = function () {
            return (React.createElement("div", { className: "chat" },
                React.createElement("div", { className: "interlocutor-inf" },
                    React.createElement("img", { className: "interlocutor-inf__profile-img", src: "../src/images/profile.png", alt: "profile" }),
                    React.createElement("h3", { className: "interlocutor-inf__nick" }, this.props.nick_interlocutor)),
                React.createElement("div", { className: "message-container" }, this.renderHistory()),
                this.renderSentInterface()));
        };
        return ChatComponent;
    }(React.Component));
    exports.ChatComponent = ChatComponent;
});
