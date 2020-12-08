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
    exports.ToolsComponent = void 0;
    var ToolsComponent = (function (_super) {
        __extends(ToolsComponent, _super);
        function ToolsComponent(props) {
            var _this = _super.call(this, props) || this;
            _this.openDialog = function (id_user) {
                console.log("openDialog", id_user);
                _this.props.openDialog(id_user);
            };
            _this.changeSearchNick = function (event) {
                _this.setState({
                    search_nick: event.target.value,
                });
            };
            _this.searchUser = function (event) {
                event.target.value;
                _this.props.searchUser(_this.state.search_nick);
            };
            _this.state = {
                search_nick: "",
            };
            return _this;
        }
        ToolsComponent.prototype.renderFriendsList = function (list, show_message_count) {
            var _this = this;
            return list.map(function (element) {
                return (React.createElement("li", { key: element[0] + "list", onClick: function (e) {
                        _this.openDialog(element[0]);
                    } },
                    element[1],
                    " ",
                    show_message_count ? "всего непрочитанных сообщений: " + element[2] : ""));
            });
        };
        ToolsComponent.prototype.render = function () {
            return (React.createElement("div", { className: "container_tools" },
                React.createElement("h3", null, "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 \u0441\u043E\u0431\u0435\u0441\u0435\u0434\u043D\u0438\u043A\u0438"),
                React.createElement("ul", null, this.renderFriendsList(this.props.friends_list, true)),
                React.createElement("input", { type: "text", placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0438\u043A\u043D\u0435\u0439\u043C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F", onChange: this.changeSearchNick }),
                React.createElement("input", { type: "button", onClick: this.searchUser, value: "\u041F\u043E\u0438\u0441\u043A" }),
                React.createElement("h3", null, "\u0421\u043F\u0438\u0441\u043E\u043A \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u044B\u0445 \u0441\u043E\u0431\u0435\u0441\u0435\u0434\u043D\u0438\u043A\u043E\u0432"),
                React.createElement("ul", null, this.renderFriendsList(this.props.users, false))));
        };
        return ToolsComponent;
    }(React.Component));
    exports.ToolsComponent = ToolsComponent;
});
