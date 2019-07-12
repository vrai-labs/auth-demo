import axios from 'axios';
import * as React from 'react';
import SuperTokensRequest from 'supertokens-website/axios';

SuperTokensRequest.makeSuper(axios);

export default class HomePage extends React.PureComponent<{}, {
    name: string | undefined,
    userId: string | undefined, apiCalls: number,
    startTime: number
}> {

    constructor(props: any) {
        super(props);
        this.state = {
            name: undefined,
            userId: undefined,
            apiCalls: 0,
            startTime: Date.now()
        };
    }

    getMainView = (name: string, userId: string) => {
        return (
            <div style={{
                background: "#000000",
                height: "100%"
            }}>
                <div
                    style={{
                        background: "#000000",
                        paddingLeft: "16px", paddingRight: "16px",
                        paddingTop: "10px",
                        width: "50%"
                    }}>
                    <div
                        style={{
                            paddingTop: "5px", paddingBottom: "5px"
                        }}>
                        <img
                            src={"https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/logo%20on%20black%20bg%402x.png"}
                            style={{
                                height: "60px"
                            }} />
                    </div>
                    <div style={{ height: "10px" }} />
                    <div style={{
                        color: "#ffffff",
                        fontSize: "25px",
                        fontFamily: 'Share Tech, sans-serif'
                    }}><b>Welcome <span style={{ color: "#00ff00" }}>{name}</span>!</b></div>
                    <div style={{
                        color: "#ffffff",
                        fontSize: "17px",
                        fontFamily: 'Share Tech, sans-serif'
                    }}>While you are on this page, a background job is running that is calling an API every second. This is meant to simulate user actions on behalf of {name}. <br /><br /> This session is alive via a short lived access token (life of 10 secs) and a long lived refresh token. If you want to see the API calls and what happens after the access token expires, please inspect this page and go to the Network Section.</div>
                    <div style={{ height: "40px" }} />
                    <div style={{
                        color: "#ffffff",
                        fontSize: "17px",
                        fontFamily: 'Share Tech, sans-serif'
                    }}>FOLLOW THESE INSTRUCTIONS:<br />
                        - Open <b style={{ color: "#ff0000" }}>demo.supertokens.io/attack</b> in a new <b style={{ color: "#ff0000" }}>Private window</b> and come back here.<br />
                        - Right click and open Inspect Element<br />
                        - Navigate to the Storage section<br />
                        - Find the cookies associated with <span style={{ color: "#ff9a00" }}>demo.supertokens.io</span><br />
                        - Copy the value of the cookie with the name "sRefreshToken"<br />
                        - Now switch to the other window and login as the attacker there!<br />
                    </div>
                    <div style={{ height: "70px" }} />
                    <button
                        style={{
                            color: "#000000",
                            background: "#ffffff",
                            justifyContent: "center", alignItems: "center",
                            paddingTop: 5, paddingBottom: 5,
                            paddingLeft: 5, paddingRight: 5,
                            fontSize: 17,
                            fontFamily: 'Share Tech, sans-serif'
                        }}
                        onClick={this.logoutPressed}>Logout</button>
                    <div style={{ height: "40px" }} />
                    <div style={{
                        color: "#ffffff",
                        fontSize: "17px",
                        fontFamily: 'Share Tech, sans-serif'
                    }}>{this.state.apiCalls}</div>
                </div>
            </div>
        );
    }

    render() {
        if (this.state.name === undefined || this.state.userId === undefined) {
            return (
                <div style={{
                    background: "#000000",
                    height: "100%"
                }}>
                    <span style={{ color: "#ffffff" }}>Loading...</span>
                </div>
            );
        }
        return this.getMainView(this.state.name, this.state.userId);
    }

    componentDidMount() {
        this.fetchUserInfo();
    }

    logoutPressed = async () => {
        try {
            let rawData = await SuperTokensRequest.post("/api/logout");
            if (rawData.status !== 200) {
                throw rawData;
            }
            window.location.href = "/";
        } catch (err) {
            if (err.status === 440) {
                window.location.href = "/";
            } else {
                console.log("error while fetching user data");
            }
        }
    }

    fetchUserInfo = async () => {
        try {
            let rawData = await axios("/api/userinfo");
            let data = await rawData.data;
            let name = data.name;
            let userId = data.userId;
            this.setState(oldState => ({
                ...oldState,
                name,
                userId,
                apiCalls: oldState.apiCalls + 1
            }));
        } catch (err) {
            if (err.response !== undefined && err.response.status === 440) {
                window.location.href = "/";
                return;
            } else {
                console.log("error while fetching user data");
            }
        }
        setTimeout(this.fetchUserInfo, 1000);   // so that it keeps on running in the backgroud
    }
}
