var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AuthRequest from 'auth-website';
import moment from 'moment';
import * as React from 'react';
const IS_FIREFOX = typeof InstallTrigger !== 'undefined';
// TODO: show stolen tokens so far!
export default class LoginPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.getTheftView = (thefts) => {
            return (React.createElement("div", null,
                React.createElement("br", null),
                " ",
                React.createElement("br", null),
                React.createElement("h2", null, "Recent Thefts:"),
                React.createElement("ul", null, thefts.map(i => {
                    let key = i.userId + i.time;
                    return (React.createElement("li", { key: key }, i.userId.toUpperCase() + ", " + moment(i.time).format("DD MMM YYYY hh:mm a")));
                }))));
        };
        this.fetchRecentThefts = () => __awaiter(this, void 0, void 0, function* () {
            try {
                let thefts = (yield AuthRequest.get("/api/recenttheft")).data;
                this.setState(oldState => (Object.assign({}, oldState, { thefts })));
            }
            catch (err) {
                console.log("error while fetching recent thefts!");
            }
        });
        this.loginPressed = () => __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield AuthRequest.post("/api/login");
                window.location.href = "/home";
            }
            catch (err) {
                console.log("error while trying to login!");
            }
        });
        this.state = {
            thefts: undefined
        };
    }
    render() {
        if (!IS_FIREFOX) {
            return (React.createElement("div", null, "Please open this page on Firefox."));
        }
        return (React.createElement("div", null,
            React.createElement("h1", { style: {
                    color: "#3A7FDD"
                } }, "Welcome to Auth demo"),
            React.createElement("h2", null, "This site demonstrates our solution for session management that can detect token theft."),
            React.createElement("br", null),
            React.createElement("h3", null, "How it works:"),
            React.createElement("ul", null,
                React.createElement("li", null, "You need Firefox for this demo as you will be stealing auth tokens - which is easiest todo on firefox"),
                React.createElement("li", null, "Start by opening this page in a Firefox (non private window)."),
                React.createElement("li", null, "Click on the login button below"),
                React.createElement("li", null, "Once logged in, follow the steps on the next screen")),
            React.createElement("br", null),
            " ",
            React.createElement("br", null),
            React.createElement("button", { style: {
                    color: "#ffffff",
                    background: "#3A7FDD",
                    justifyContent: "center", alignItems: "center",
                    paddingTop: 15, paddingBottom: 15,
                    paddingLeft: 40, paddingRight: 40,
                    fontSize: 20, borderRadius: 10,
                }, onClick: this.loginPressed }, "Login"),
            this.state.thefts === undefined || this.state.thefts.length === 0 ? null :
                this.getTheftView(this.state.thefts)));
    }
    componentDidMount() {
        this.fetchRecentThefts();
    }
}
