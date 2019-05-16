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
        this.getMainView = (name) => {
            // TODO:
            return (React.createElement("div", null,
                React.createElement("h1", null,
                    "Welcome ",
                    this.state.name,
                    "!")));
        };
        this.fetchUserInfo = () => __awaiter(this, void 0, void 0, function* () {
            try {
                let name = (yield AuthRequest.get("/api/userinfo")).data.name;
                this.setState(oldState => (Object.assign({}, oldState, { name })));
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
            name: undefined
        };
    }
    render() {
        if (this.state.name === undefined) {
            return (React.createElement("div", null, "Loading..."));
        }
        return this.getMainView(this.state.name);
    }
    componentDidMount() {
        this.fetchUserInfo();
    }
}
