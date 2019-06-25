var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import SuperTokensRequest from 'supertokens-website';
export default class HomePage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.getMainView = (name, userId) => {
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
                        React.createElement("b", null,
                            "Welcome ",
                            React.createElement("span", { style: { color: "#00ff00" } }, name),
                            "!")),
                    React.createElement("div", { style: {
                            color: "#ffffff",
                            fontSize: "17px",
                            fontFamily: 'Share Tech, sans-serif'
                        } },
                        "While you are on this page, a background job is running that is calling an API every second. This is meant to simulate user actions on behalf of ",
                        name,
                        ". ",
                        React.createElement("br", null),
                        React.createElement("br", null),
                        " This session is alive via a short lived access token (life of 10 secs) and a long lived refresh token. If you want to see the API calls and what happens after the access token expires, please inspect this page and go to the Network Section."),
                    React.createElement("div", { style: { height: "40px" } }),
                    React.createElement("div", { style: {
                            color: "#ffffff",
                            fontSize: "17px",
                            fontFamily: 'Share Tech, sans-serif'
                        } },
                        "FOLLOW THESE INSTRUCTIONS:",
                        React.createElement("br", null),
                        "- Open ",
                        React.createElement("b", { style: { color: "#ff0000" } }, "demo.supertokens.io/attack"),
                        " in a new ",
                        React.createElement("b", { style: { color: "#ff0000" } }, "Private window"),
                        " and come back here.",
                        React.createElement("br", null),
                        "- Right click and open Inspect Element",
                        React.createElement("br", null),
                        "- Navigate to the Storage section",
                        React.createElement("br", null),
                        "- Find the cookies associated with ",
                        React.createElement("span", { style: { color: "#ff9a00" } }, "demo.supertokens.io"),
                        React.createElement("br", null),
                        "- Copy the value of the cookie with the name \"sRefreshToken\"",
                        React.createElement("br", null),
                        "- Now switch to the other window and login as the attacker there!",
                        React.createElement("br", null)),
                    React.createElement("div", { style: { height: "70px" } }),
                    React.createElement("button", { style: {
                            color: "#000000",
                            background: "#ffffff",
                            justifyContent: "center", alignItems: "center",
                            paddingTop: 5, paddingBottom: 5,
                            paddingLeft: 5, paddingRight: 5,
                            fontSize: 17,
                            fontFamily: 'Share Tech, sans-serif'
                        }, onClick: this.logoutPressed }, "Logout"))));
        };
        this.logoutPressed = () => __awaiter(this, void 0, void 0, function* () {
            try {
                let rawData = yield SuperTokensRequest.post("/api/logout");
                if (rawData.status !== 200) {
                    throw rawData;
                }
                window.location.href = "/";
            }
            catch (err) {
                if (err.status === 440) {
                    window.location.href = "/";
                }
                else {
                    console.log("error while fetching user data");
                }
            }
        });
        this.fetchUserInfo = () => __awaiter(this, void 0, void 0, function* () {
            try {
                let rawData = yield SuperTokensRequest.get("/api/userinfo");
                if (rawData.status !== 200) {
                    throw rawData;
                }
                let data = yield rawData.json();
                let name = data.name;
                let userId = data.userId;
                this.setState(oldState => (Object.assign({}, oldState, { name,
                    userId, apiCalls: oldState.apiCalls + 1 })));
            }
            catch (err) {
                console.log(err);
                if (err.status === 440) {
                    window.location.href = "/";
                    return;
                }
                else {
                    console.log("error while fetching user data");
                }
            }
            setTimeout(this.fetchUserInfo, 1000); // so that it keeps on running in the backgroud
        });
        this.state = {
            name: undefined,
            userId: undefined,
            apiCalls: 0,
            startTime: Date.now()
        };
    }
    render() {
        if (this.state.name === undefined || this.state.userId === undefined) {
            return (React.createElement("div", { style: {
                    background: "#000000",
                    height: "100%"
                } },
                React.createElement("span", { style: { color: "#ffffff" } }, "Loading...")));
        }
        return this.getMainView(this.state.name, this.state.userId);
    }
    componentDidMount() {
        this.fetchUserInfo();
    }
}
