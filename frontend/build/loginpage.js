var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import moment from 'moment';
import * as React from 'react';
import SuperTokensRequest from 'supertokens-website';
const IS_FIREFOX = typeof InstallTrigger !== 'undefined';
export default class LoginPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.getTheftView = (thefts) => {
            return (React.createElement("div", null,
                React.createElement("br", null),
                " ",
                React.createElement("br", null),
                React.createElement("h2", null, "Recent Thefts:"),
                React.createElement("ul", null, thefts.map(i => {
                    let key = i.userId + i.time;
                    return (React.createElement("li", { key: key }, i.userId.toUpperCase() + ", " + moment(i.time).format("DD MMM YYYY hh:mm a")));
                }))));
        };
        this.loginAsVictimPressed = () => __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield SuperTokensRequest.post("/api/login");
                window.location.href = "/home";
            }
            catch (err) {
                console.log("error while trying to login!");
            }
        });
        this.loginAsAttackerPressed = () => __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield SuperTokensRequest.post("/api/login");
                window.location.href = "/attack";
            }
            catch (err) {
                console.log("error while trying to login!");
            }
        });
        this.state = {
            thefts: undefined
        };
    }
    render() {
        if (!IS_FIREFOX) {
            return (React.createElement("div", null, "Please open this page on Firefox."));
        }
        return (React.createElement("div", { style: {
                background: "#000000",
                height: "100%"
            } },
            React.createElement("div", { style: {
                    background: "#000000",
                    paddingLeft: "16px", paddingRight: "16px",
                    paddingTop: "10px",
                    width: "50%"
                } },
                React.createElement("div", { style: {
                        paddingTop: "5px", paddingBottom: "5px"
                    } },
                    React.createElement("img", { src: "https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/logo%20on%20black%20bg%402x.png", style: {
                            height: "60px"
                        } })),
                React.createElement("div", { style: { height: "10px" } }),
                React.createElement("div", { style: {
                        color: "#ffffff",
                        fontSize: "25px",
                        fontFamily: 'Share Tech, sans-serif'
                    } },
                    React.createElement("b", null, "This is a demo that demonstrates a session management library capable of detecting token theft!")),
                React.createElement("div", { style: { height: "20px" } }),
                React.createElement("div", { style: {
                        color: "#bc0d0d",
                        fontSize: "20px",
                        fontFamily: 'Share Tech, sans-serif'
                    } },
                    "Open this page on two Firefox windows (not tabs) - ",
                    React.createElement("span", { style: { color: "#ff0000" } },
                        React.createElement("b", null, "one private, and one regular"))),
                React.createElement("div", { style: { height: "60px" } }),
                React.createElement("div", { style: {
                        color: "#ffffff",
                        fontSize: "25px",
                        fontFamily: 'Share Tech, sans-serif'
                    } },
                    "If this is the ",
                    React.createElement("b", null, "regular"),
                    " window:"),
                React.createElement("div", { style: {
                        color: "#ffffff",
                        fontSize: "17px",
                        fontFamily: 'Share Tech, sans-serif'
                    } },
                    "You are now the innocent victim ",
                    React.createElement("span", { style: { color: "#00ff00" } }, "'_'"),
                    " ",
                    React.createElement("br", null),
                    "Start by logging in to your account by clicking below:"),
                React.createElement("div", { style: { height: 5 } }),
                React.createElement("button", { style: {
                        color: "#000000",
                        background: "#ffffff",
                        justifyContent: "center", alignItems: "center",
                        paddingTop: 5, paddingBottom: 5,
                        paddingLeft: 5, paddingRight: 5,
                        fontSize: 17,
                        fontFamily: 'Share Tech, sans-serif'
                    }, onClick: this.loginAsVictimPressed },
                    "Login as innocent ",
                    React.createElement("b", null, "victim")),
                React.createElement("div", { style: { height: "40px" } }),
                React.createElement("div", { style: {
                        color: "#ffffff",
                        fontSize: "25px",
                        fontFamily: 'Share Tech, sans-serif'
                    } },
                    "If this is the ",
                    React.createElement("b", null, "private"),
                    " window:"),
                React.createElement("div", { style: {
                        color: "#ffffff",
                        fontSize: "17px",
                        fontFamily: 'Share Tech, sans-serif'
                    } },
                    "You are now the evil ATTACKER ",
                    React.createElement("span", { style: { color: "#ff0000" } }, "'_'"),
                    " ",
                    React.createElement("br", null),
                    "Click below to start the attack:"),
                React.createElement("div", { style: { height: 5 } }),
                React.createElement("button", { style: {
                        color: "#000000",
                        background: "#ffffff",
                        justifyContent: "center", alignItems: "center",
                        paddingTop: 5, paddingBottom: 5,
                        paddingLeft: 5, paddingRight: 5,
                        fontSize: 17,
                        fontFamily: 'Share Tech, sans-serif'
                    }, onClick: this.loginAsAttackerPressed },
                    "Login as evil ",
                    React.createElement("b", null, "ATTACKER")))));
    }
}
