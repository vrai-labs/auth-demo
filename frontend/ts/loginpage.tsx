import moment from 'moment';
import * as React from 'react';
import SuperTokensRequest from 'supertokens-website';

declare const InstallTrigger: any;

const IS_FIREFOX = typeof InstallTrigger !== 'undefined';

// TODO: show stolen tokens so far!
export default class LoginPage extends React.PureComponent<{}, {
    thefts: { userId: string, time: number }[] | undefined
}> {

    constructor(props: any) {
        super(props);
        this.state = {
            thefts: undefined
        };
    }

    getTheftView = (thefts: { userId: string, time: number }[]) => {
        return (
            <div>
                <br /> <br />
                <h2>Recent Thefts:</h2>
                <ul>
                    {thefts.map(i => {
                        let key = i.userId + i.time;
                        return (
                            <li
                                key={key}>
                                {i.userId.toUpperCase() + ", " + moment(i.time).format("DD MMM YYYY hh:mm a")}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }

    render() {
        if (!IS_FIREFOX) {
            return (
                <div>
                    Please open this page on Firefox.
                </div>
            );
        }
        return (
            <div>
                <h1
                    style={{
                        color: "#3A7FDD"
                    }}>
                    Welcome to Auth demo
                </h1>
                <h2>This site demonstrates our solution for session management that can detect token theft.</h2>
                <br />
                <h3>How it works:</h3>
                Click on the login button below and follow Step 1 and 2
                <br /> <br />
                <button
                    style={{
                        color: "#ffffff",
                        background: "#3A7FDD",
                        justifyContent: "center", alignItems: "center",
                        paddingTop: 15, paddingBottom: 15,
                        paddingLeft: 40, paddingRight: 40,
                        fontSize: 20, borderRadius: 10,
                    }}
                    onClick={this.loginPressed}>Login</button>
                {this.state.thefts === undefined || this.state.thefts.length === 0 ? null :
                    this.getTheftView(this.state.thefts)}
            </div >
        );
    }

    componentDidMount() {
        this.fetchRecentThefts();
    }

    fetchRecentThefts = async () => {
        try {
            let thefts = (await SuperTokensRequest.get("/api/recenttheft")).data;
            this.setState(oldState => ({
                ...oldState,
                thefts
            }));
        } catch (err) {
            console.log("error while fetching recent thefts!");
        }
    }

    loginPressed = async () => {
        try {
            let response = await SuperTokensRequest.post("/api/login");
            window.location.href = "/home";
        } catch (err) {
            console.log("error while trying to login!");
        }
    }
}