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
define(["require", "exports", "react", "react-dom", "./components/registration", "./components/scene"], function (require, exports, React, ReactDOM, registration_1, scene_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ROOT = document.getElementById("root");
    var App = (function (_super) {
        __extends(App, _super);
        function App(props) {
            var _this = _super.call(this, props) || this;
            _this.setEnter = function (id_curent_user) {
                _this.setState({
                    enter: true,
                    id_curent_user: id_curent_user
                });
            };
            _this.state = {
                enter: true,
                id_curent_user: 5
            };
            return _this;
        }
        App.prototype.render = function () {
            return React.createElement("div", null, this.state.enter ? React.createElement(scene_1.Scene, { id_curent_user: this.state.id_curent_user }) : React.createElement(registration_1.RegistrationComponent, { setEnter: this.setEnter }));
        };
        return App;
    }(React.Component));
    ReactDOM.render(React.createElement(App, null), ROOT);
});
