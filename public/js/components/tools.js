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
            return _this;
        }
        ToolsComponent.prototype.renderFriendsList = function () {
            var _this = this;
            return this.props.friends_list.map(function (element) {
                return React.createElement("li", { key: element[0] + "list", onClick: function (e) { _this.openDialog(element[0]); } },
                    element[1],
                    " \u0432\u0441\u0435\u0433\u043E \u043D\u0435\u043F\u0440\u043E\u0447\u0438\u0442\u0430\u043D\u043D\u044B\u0445 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439:");
            });
        };
        ToolsComponent.prototype.render = function () {
            return React.createElement("div", null,
                React.createElement("h3", null, "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 \u0441\u043E\u0431\u0435\u0441\u0435\u0434\u043D\u0438\u043A\u0438"),
                React.createElement("h3", null, "\u0421\u043F\u0438\u0441\u043E\u043A \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u044B\u0445 \u0441\u043E\u0431\u0435\u0441\u0435\u0434\u043D\u0438\u043A\u043E\u0432"),
                React.createElement("ul", null, this.renderFriendsList()));
        };
        return ToolsComponent;
    }(React.Component));
    exports.ToolsComponent = ToolsComponent;
});
