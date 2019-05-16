var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AuthRequest from 'auth-website';
import * as React from 'react';
export default class LoginPage extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.loginPressed = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield AuthRequest.post("/api/login");
                window.location.href = "/home";
            }
            catch (err) {
                console.log("error while trying to login!");
            }
        });
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("h1", null, "Welcome to Auth demo"),
            React.createElement("div", null, "How it works:"),
            React.createElement("div", null, "-> Start by using a non Firefox browser, or by using firefox in private mode."),
            React.createElement("div", null, "-> Once you login, your session will start which will give your browser a short lived access token (10 seconds validity) and a long lived refresh token (valid for 1 month)"),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("div", null, "Click below to login"),
            React.createElement("button", { onClick: this.loginPressed }, "Login")));
    }
}
