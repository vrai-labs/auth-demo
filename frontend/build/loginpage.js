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
                let response = yield AuthRequest.post("/api/login");
                window.location.href = "/home";
            }
            catch (err) {
                console.log("error while trying to login!");
            }
        });
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("h1", { style: {
                    color: "#3A7FDD"
                } }, "Welcome to Auth demo"),
            React.createElement("h2", null, "This site demonstrates our solution for session management that can detect token theft."),
            React.createElement("br", null),
            React.createElement("h3", null, "How it works:"),
            React.createElement("li", null, "You need Firefox for this demo as you will be stealing auth tokens - which is easiest todo on firefox"),
            React.createElement("li", null, "Start by opening this page in a Firefox private window if it's not done already."),
            React.createElement("li", null, "Click on the login button below"),
            React.createElement("li", null, "Once logged in, follow the steps on the next screen"),
            React.createElement("br", null),
            " ",
            React.createElement("br", null),
            React.createElement("button", { style: {
                    color: "#ffffff",
                    background: "#3A7FDD",
                    justifyContent: "center", alignItems: "center",
                    paddingTop: 15, paddingBottom: 15,
                    paddingLeft: 40, paddingRight: 40,
                    fontSize: 20, borderRadius: 10,
                }, onClick: this.loginPressed }, "Login")));
    }
}
