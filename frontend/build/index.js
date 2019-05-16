import * as React from 'react';
import * as ReactDOM from 'react-dom';
import HomePage from './homepage';
import LoginPage from './loginpage';
import LogoutPage from './logoutpage';
class Router extends React.PureComponent {
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
        else if (path === "logout") {
            return (React.createElement(LogoutPage, null));
        }
        else {
            return (React.createElement("div", null,
                React.createElement("h1", null, "Oops!! Nothing to see here.. except for this boring text")));
        }
    }
}
ReactDOM.render((React.createElement(Router, null)), document.getElementById("root"));
