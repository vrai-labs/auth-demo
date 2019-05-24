import * as React from 'react';
export default class AttackSuccess extends React.PureComponent {
    render() {
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
                        fontSize: "30px",
                        fontFamily: 'Share Tech, sans-serif'
                    } }, "Demo successful!!"),
                React.createElement("div", { style: { height: "20px" } }),
                React.createElement("div", { style: {
                        color: "#ffffff",
                        fontSize: "20px",
                        fontFamily: 'Share Tech, sans-serif'
                    } },
                    "You have successfully stolen the victim's auth tokens!",
                    React.createElement("br", null),
                    React.createElement("br", null),
                    "But since this webapp is using ",
                    React.createElement("a", { href: "https://github.com/supertokens/supertokens-node-mysql-ref-jwt", target: "_blank", style: { color: "#00ff00" } }, "our session management solution"),
                    ", the victim is safe! Our solution detected this theft and revoked their session! Go back to the other window.. they would have been logged out :)",
                    React.createElement("br", null),
                    "Thank you for your time!",
                    React.createElement("br", null),
                    React.createElement("br", null),
                    React.createElement("br", null),
                    "If you want to see how this demo works, please visit this ",
                    React.createElement("a", { href: "https://github.com/supertokens/auth-demo", target: "_blank", style: { color: "#00ff00" } }, "GitHub Repo")))));
    }
}
