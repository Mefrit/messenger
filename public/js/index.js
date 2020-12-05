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
define(["require", "exports", "react", "react-dom", "./components/registration"], function (require, exports, React, ReactDOM, registration_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ROOT = document.getElementById("root");
    var App = (function (_super) {
        __extends(App, _super);
        function App(props) {
            var _this = _super.call(this, props) || this;
            _this.setEnter = function () {
                _this.setState({
                    enter: true
                });
            };
            _this.state = {
                enter: false
            };
            return _this;
        }
        App.prototype.render = function () {
            return React.createElement("div", null, this.state.enter ? React.createElement("h1", null, "You areEnter") : React.createElement(registration_1.RegistrationComponent, { setEnter: this.setEnter }));
        };
        return App;
    }(React.Component));
    ReactDOM.render(React.createElement(App, null), ROOT);
});
