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
            // TODO:
            return (React.createElement("div", null,
                React.createElement("h1", null,
                    "Welcome ",
                    name,
                    "!"),
                "Your userId is: ",
                userId));
        };
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
                    window.location.href = "/logout";
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
