import moment from 'moment';
import * as React from 'react';
import SuperTokensRequest from 'supertokens-website';

declare const InstallTrigger: any;

const IS_FIREFOX = typeof InstallTrigger !== 'undefined';

export default class LoginPage extends React.PureComponent<{}, {
    thefts: { userId: string, time: number }[] | undefined
}> {

    constructor(props: any) {
        super(props);
        this.state = {
            thefts: undefined
        };
    }

    getTheftView = (thefts: { userId: string, time: number }[]) => {
        return (
            <div>
                <br /> <br />
                <h2>Recent Thefts:</h2>
                <ul>
                    {thefts.map(i => {
                        let key = i.userId + i.time;
                        return (
                            <li
                                key={key}>
                                {i.userId.toUpperCase() + ", " + moment(i.time).format("DD MMM YYYY hh:mm a")}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }

    render() {
        if (!IS_FIREFOX) {
            return (
                <div>
                    Please open this page on Firefox.
                </div>
            );
        }
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
                    }}><b>This is a demo that demonstrates a session management library capable of detecting token theft!</b></div>
                    <div style={{ height: "20px" }} />
                    <div style={{
                        color: "#bc0d0d",
                        fontSize: "20px",
                        fontFamily: 'Share Tech, sans-serif'
                    }}>Open this page on two Firefox windows (not tabs) - <span style={{ color: "#ff0000" }}><b>one private, and one regular</b></span></div>
                    <div style={{ height: "60px" }} />
                    <div style={{
                        color: "#ffffff",
                        fontSize: "25px",
                        fontFamily: 'Share Tech, sans-serif'
                    }}>If this is the <b>regular</b> window:</div>
                    <div style={{
                        color: "#ffffff",
                        fontSize: "17px",
                        fontFamily: 'Share Tech, sans-serif'
                    }}>You are now the innocent victim <span style={{ color: "#00ff00" }}>'_'</span> <br />Start by logging in to your account by clicking below:</div>
                    <div style={{ height: 5 }} />
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
                        onClick={this.loginAsVictimPressed}>Login as innocent <b>victim</b></button>
                    <div style={{ height: "40px" }} />
                    <div style={{
                        color: "#ffffff",
                        fontSize: "25px",
                        fontFamily: 'Share Tech, sans-serif'
                    }}>If this is the <b>private</b> window:</div>
                    <div style={{
                        color: "#ffffff",
                        fontSize: "17px",
                        fontFamily: 'Share Tech, sans-serif'
                    }}>You are now the evil ATTACKER <span style={{ color: "#ff0000" }}>'_'</span> <br />Click below to start the attack:</div>
                    <div style={{ height: 5 }} />
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
                        onClick={this.loginAsAttackerPressed}>Login as evil <b>ATTACKER</b></button>
                </div>
            </div>
        );
    }

    loginAsVictimPressed = async () => {
        try {
            let response = await SuperTokensRequest.post("/api/login");
            window.location.href = "/home";
        } catch (err) {
            console.log("error while trying to login!");
        }
    }

    loginAsAttackerPressed = async () => {
        try {
            let response = await SuperTokensRequest.post("/api/login");
            window.location.href = "/attack";
        } catch (err) {
            console.log("error while trying to login!");
        }
    }
}