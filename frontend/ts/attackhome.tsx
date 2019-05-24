import * as React from 'react';
import SuperTokensRequest from 'supertokens-website';

export default class AttackPage extends React.PureComponent<{}, {
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
                    }}><b>Welcome evil <span style={{ color: "#ff0000" }}>ATTACKER</span>!</b></div>
                    <div style={{
                        color: "#ffffff",
                        fontSize: "17px",
                        fontFamily: 'Share Tech, sans-serif'
                    }}>If you have not already copied the victim's cookie, please switch to the other tab and follow the instructions.</div>
                    <div style={{ height: "30px" }} />
                    <div style={{
                        color: "#ffffff",
                        fontSize: "17px",
                        fontFamily: 'Share Tech, sans-serif'
                    }}><span style={{ color: "#ff0000" }}>FOLLOW THESE INSTRUCTIONS:</span><br />
                        - Right click and open Inspect Element<br />
                        - Navigate to the Storage section<br />
                        - Find the cookies associated with <span style={{ color: "#ff9a00" }}>supertokens.io</span><br />
                        - Paste the copied value against the cookie with the name "sRefreshToken"<br />
                        - You have hijacked their session! Now wait for a bit...<br />
                    </div>
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

    fetchUserInfo = async () => {
        try {
            let data = (await SuperTokensRequest.get("/api/userinfo")).data;
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
                window.location.href = "/attacksuccess";
                return;
            } else {
                console.log("error while fetching user data");
            }
        }
        setTimeout(this.fetchUserInfo, 1000);   // so that it keeps on running in the backgroud
    }
}

