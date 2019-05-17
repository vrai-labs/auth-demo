import AuthRequest from 'auth-website';
import * as React from 'react';

export default class LoginPage extends React.PureComponent<{}, {}> {
    render() {
        return (
            <div>
                <h1
                    style={{
                        color: "#3A7FDD"
                    }}>
                    Welcome to Auth demo
                </h1>
                <h2>This site demonstrates our solution for session management that can detect token theft.</h2>
                <br />
                <h3>How it works:</h3>
                <li>
                    You need Firefox for this demo as you will be stealing auth tokens - which is easiest todo on firefox
                </li>
                <li>
                    Start by opening this page in a Firefox private window if it's not done already.
                </li>
                <li>
                    Click on the login button below
                </li>
                <li>
                    Once logged in, follow the steps on the next screen
                </li>
                <br /> <br />
                <button
                    style={{
                        color: "#ffffff",
                        background: "#3A7FDD",
                        justifyContent: "center", alignItems: "center",
                        paddingTop: 15, paddingBottom: 15,
                        paddingLeft: 40, paddingRight: 40,
                        fontSize: 20, borderRadius: 10,
                    }}
                    onClick={this.loginPressed}>Login</button>
            </div >
        );
    }

    loginPressed = async () => {
        try {
            let response = await AuthRequest.post("/api/login");
            window.location.href = "/home";
        } catch (err) {
            console.log("error while trying to login!");
        }
    }
}