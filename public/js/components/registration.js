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
    exports.RegistrationComponent = void 0;
    var RegistrationComponent = (function (_super) {
        __extends(RegistrationComponent, _super);
        function RegistrationComponent(props) {
            var _this = _super.call(this, props) || this;
            _this.showEnter = function (event) {
                event.preventDefault();
                _this.setState({ register: false });
            };
            _this.showReg = function (event) {
                event.preventDefault();
                _this.setState({ register: true });
            };
            _this.onReg = function (event) {
                event.preventDefault();
                console.log("registation");
            };
            _this.onEnter = function (event) {
                event.preventDefault();
                console.log("enter");
            };
            _this.state = {
                login: "",
                passwd: "",
                register: false
            };
            return _this;
        }
        RegistrationComponent.prototype.render = function () {
            return React.createElement("div", { className: "reg" },
                React.createElement("div", { className: "reg__mode" },
                    React.createElement("a", { className: this.state.register ? "reg__showEnter " : "reg__showEnter reg__activeMode", onClick: this.showEnter }, "\u0412\u0445\u043E\u0434"),
                    React.createElement("a", { className: this.state.register ? "reg__showReg reg__activeMode" : "reg__showReg ", onClick: this.showReg }, "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F")),
                this.state.register ? React.createElement("div", { className: "reg__inf" },
                    React.createElement("div", { className: "inputs" },
                        React.createElement("label", null,
                            "\u041D\u0438\u043A\u043D\u0435\u0439\u043C ",
                            React.createElement("input", { type: "text" })),
                        React.createElement("label", null,
                            "\u041B\u043E\u0433\u0438\u043D ",
                            React.createElement("input", { type: "text" })),
                        React.createElement("label", null,
                            "\u041F\u0430\u0440\u043E\u043B\u044C ",
                            React.createElement("input", { type: "password" })),
                        React.createElement("label", null,
                            "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C ",
                            React.createElement("input", { type: "password" })),
                        React.createElement("input", { type: "button", className: "inputs__btn", onClick: this.onReg, value: "\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F" }))) : React.createElement("div", { className: "reg__inf" },
                    React.createElement("div", { className: "inputs" },
                        React.createElement("label", null,
                            "\u041B\u043E\u0433\u0438\u043D ",
                            React.createElement("input", { type: "text" })),
                        React.createElement("label", null,
                            "\u041F\u0430\u0440\u043E\u043B\u044C ",
                            React.createElement("input", { type: "password" })),
                        React.createElement("input", { type: "button", className: "inputs__btn", onClick: this.onEnter, value: "\u0412\u043E\u0439\u0442\u0438" }))));
        };
        return RegistrationComponent;
    }(React.Component));
    exports.RegistrationComponent = RegistrationComponent;
});
