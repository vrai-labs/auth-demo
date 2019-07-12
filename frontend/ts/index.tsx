import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SuperTokensRequest from 'supertokens-website/axios';

import AttackerLoginPage from './attackerlogin';
import AttackPage from './attackhome';
import AttackSuccess from './attacksuccess';
import HomePage from './homepage';
import LoginPage from './loginpage';

class Router extends React.PureComponent<{}, {}> {

    constructor(props: any) {
        super(props);
        SuperTokensRequest.init("/api/refreshtoken", 440);
    }

    render() {
        let currlocation = window.location.href;
        let splitted = currlocation.split("/");
        let path = splitted[splitted.length - 1];
        if (path === "") {
            return (
                <LoginPage />
            );
        } else if (path === "home") {
            return (
                <HomePage />
            );
        } else if (path === "attackhome") {
            return (
                <AttackPage />
            );
        } else if (path === "attacksuccess") {
            return <AttackSuccess />;
        } else if (path === "attack") {
            return <AttackerLoginPage />;
        } else {
            return (
                <div>
                    <h1>Oops!! Nothing to see here.. except for this boring text</h1>
                </div>
            );
        }
    }
}

ReactDOM.render((<Router />), document.getElementById("root"));
