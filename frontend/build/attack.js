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
export default class AttackPage extends React.PureComponent {
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
                            "Welcome evil ",
                            React.createElement("span", { style: { color: "#ff0000" } }, "ATTACKER"),
                            "!")),
                    React.createElement("div", { style: {
                            color: "#ffffff",
                            fontSize: "17px",
                            fontFamily: 'Share Tech, sans-serif'
                        } },
                        "You are now going to steal the cookies of the victim on the other window - MUHAHAHAHA.",
                        React.createElement("br", null),
                        " To do so, please go back to the other window and follow the instructions \"COPYING COOKIES\""),
                    React.createElement("div", { style: { height: "30px" } }),
                    React.createElement("div", { style: {
                            color: "#ffffff",
                            fontSize: "17px",
                            fontFamily: 'Share Tech, sans-serif'
                        } },
                        "PASTING COOKIES",
                        React.createElement("br", null),
                        "- Right click and open Inspect Element",
                        React.createElement("br", null),
                        "- Navigate to the Storage section",
                        React.createElement("br", null),
                        "- Find the cookies associated with ",
                        React.createElement("span", { style: { color: "#ff9a00" } }, "supertokens.io"),
                        React.createElement("br", null),
                        "- Paste the copied value against the cookie with the name \"sRefreshToken\"",
                        React.createElement("br", null),
                        "- You have hijacked their session! Now wait for a bit...",
                        React.createElement("br", null)))));
        };
        this.fetchUserInfo = () => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = (yield SuperTokensRequest.get("/api/userinfo")).data;
                let name = data.name;
                let userId = data.userId;
                this.setState(oldState => (Object.assign({}, oldState, { name,
                    userId, apiCalls: oldState.apiCalls + 1 })));
            }
            catch (err) {
                if (err.response !== undefined && err.response.status === 440) {
                    window.location.href = "/attacksuccess";
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
