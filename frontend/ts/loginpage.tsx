import * as React from 'react';

import { postRequest } from './httpRequests';

export default class LoginPage extends React.PureComponent<{}, {}> {
    render() {
        return (
            <div>
                <h1>Welcome to Auth demo</h1>
                <div>How it works:</div>
                <div>-> Start by using a non Firefox browser, or by using firefox in private mode.</div>
                <div>-> Once you login, your session will start which will give your browser a short lived access token (10 seconds validity) and a long lived refresh token (valid for 1 month)</div>
                <br /><br />
                <div>Click below to login</div>
                <button onClick={this.loginPressed}>Login</button>
            </div>
        );
    }

    loginPressed = async () => {
        try {
            await postRequest("/api/login");
            window.location.href = "/home";
        } catch (err) {
            console.log("error while trying to login!");
        }
    }
}