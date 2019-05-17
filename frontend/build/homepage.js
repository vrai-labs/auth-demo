var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AuthRequest from 'auth-website';
import * as React from 'react';
export default class HomePage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.getMainView = (name, userId) => {
            return (React.createElement("div", null,
                React.createElement("h1", { style: {
                        color: "#3A7FDD"
                    } },
                    "Welcome ",
                    name,
                    "!"),
                React.createElement("h2", null,
                    "Your userId is: ",
                    userId.toUpperCase()),
                React.createElement("br", null),
                React.createElement("h3", null, "Step 1"),
                React.createElement("ul", null,
                    React.createElement("li", null, "Keep note of this UserId"),
                    React.createElement("li", null, "Right click on this page and select \"Inspect Element\""),
                    React.createElement("li", null, "Click on the Storage tab"),
                    React.createElement("li", null, "Copy the value associated with the cookie: sRefreshToken"),
                    React.createElement("li", null, "Open a new Private window (not a new tab) in firefox and go to TODO put domain here."),
                    React.createElement("li", null, "Click on login in that page and then follow Step 2")),
                React.createElement("br", null),
                React.createElement("h3", null, "Step 2"),
                React.createElement("ul", null,
                    React.createElement("li", null, "Right click on this page and select \"Inspect Element\""),
                    React.createElement("li", null, "Click on the Storage tab"),
                    React.createElement("li", null, "Paste the value you copied in Step 1 into the value cell associated with the cookie: sRefreshToken"),
                    React.createElement("li", null, "Now wait for a few seconds. You should be logged out on both the windows! And you should see your userID in the recent thefts section :)")),
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
                    }, onClick: this.logoutPressed }, "Logout")));
        };
        this.logoutPressed = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield AuthRequest.post("/api/logout");
                window.location.href = "/";
            }
            catch (err) {
                if (err.response !== undefined && err.response.status === 440) {
                    window.location.href = "/";
                }
                else {
                    console.log("error while fetching user data");
                }
            }
        });
        this.fetchUserInfo = () => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = (yield AuthRequest.get("/api/userinfo")).data;
                let name = data.name;
                let userId = data.userId;
                this.setState(oldState => (Object.assign({}, oldState, { name,
                    userId })));
            }
            catch (err) {
                if (err.response !== undefined && err.response.status === 440) {
                    window.location.href = "/";
                    return;
                }
                else {
                    console.log("error while fetching user data");
                }
            }
            setTimeout(this.fetchUserInfo, 1000); // so that it keeps on running in the backgroud as a cron job
        });
        this.state = {
            name: undefined,
            userId: undefined
        };
    }
    render() {
        if (this.state.name === undefined || this.state.userId === undefined) {
            return (React.createElement("div", null, "Loading..."));
        }
        return this.getMainView(this.state.name, this.state.userId);
    }
    componentDidMount() {
        this.fetchUserInfo();
    }
}
