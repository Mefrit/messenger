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
    exports.FriendsComponent = void 0;
    var FriendsComponent = (function (_super) {
        __extends(FriendsComponent, _super);
        function FriendsComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FriendsComponent.prototype.render = function () {
            return React.createElement("h1", null, "Your friends");
        };
        return FriendsComponent;
    }(React.Component));
    exports.FriendsComponent = FriendsComponent;
});
