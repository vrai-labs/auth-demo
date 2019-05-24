import * as React from 'react';

export default class AttackSuccess extends React.PureComponent<{}, {}> {

    render() {
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
                        fontSize: "30px",
                        fontFamily: 'Share Tech, sans-serif'
                    }}>Demo successful!!</div>
                    <div style={{ height: "20px" }} />
                    <div style={{
                        color: "#ffffff",
                        fontSize: "20px",
                        fontFamily: 'Share Tech, sans-serif'
                    }}>You have successfully stolen the victim's auth tokens!<br /><br />
                        But since this webapp is using <a href="https://github.com/supertokens/supertokens-node-mysql-ref-jwt" target="_blank" style={{ color: "#00ff00" }}>SuperTokens' session management solution</a>, the victim is safe! Our solution detected this theft and revoked their session! Go back to the other window.. they would have been logged out :)<br />
                        Thank you for your time!<br /><br /><br />
                        If you want to see how this demo works, please visit this <a href="https://github.com/supertokens/auth-demo" target="_blank" style={{ color: "#00ff00" }}>GitHub Repo</a></div>
                </div>
            </div>
        );
    }
}

