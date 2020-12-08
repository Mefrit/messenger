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
                    content: event.target.value
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
                return React.createElement("div", null,
                    React.createElement("h3", { key: elem[0] },
                        _this.props.id_curent_user == elem[3] ? "You" : "",
                        ":",
                        elem[0]),
                    " time: ",
                    elem[4]);
            });
        };
        ChatComponent.prototype.renderSentInterface = function () {
            return React.createElement("div", null,
                React.createElement("input", { type: "textarea", onChange: this.changeContent, placeholder: "\u041F\u043E\u043B\u0435 \u0434\u043B\u044F \u0432\u0432\u043E\u0434\u0430" }),
                React.createElement("input", { type: "button", onClick: this.sentMessage, value: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C" }));
        };
        ChatComponent.prototype.render = function () {
            return React.createElement("div", null,
                this.renderHistory(),
                this.renderSentInterface());
        };
        return ChatComponent;
    }(React.Component));
    exports.ChatComponent = ChatComponent;
});
