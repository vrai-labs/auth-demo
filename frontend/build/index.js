import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SuperTokensRequest from 'supertokens-website';
import AttackerLoginPage from './attackerlogin';
import AttackPage from './attackhome';
import AttackSuccess from './attacksuccess';
import HomePage from './homepage';
import LoginPage from './loginpage';
class Router extends React.PureComponent {
    constructor(props) {
        super(props);
        SuperTokensRequest.init("/api/refreshtoken", 440, true);
    }
    render() {
        let currlocation = window.location.href;
        let splitted = currlocation.split("/");
        let path = splitted[splitted.length - 1];
        if (path === "") {
            return (React.createElement(LoginPage, null));
        }
        else if (path === "home") {
            return (React.createElement(HomePage, null));
        }
        else if (path === "attackhome") {
            return (React.createElement(AttackPage, null));
        }
        else if (path === "attacksuccess") {
            return React.createElement(AttackSuccess, null);
        }
        else if (path === "attack") {
            return React.createElement(AttackerLoginPage, null);
        }
        else {
            return (React.createElement("div", null,
                React.createElement("h1", null, "Oops!! Nothing to see here.. except for this boring text")));
        }
    }
}
ReactDOM.render((React.createElement(Router, null)), document.getElementById("root"));
