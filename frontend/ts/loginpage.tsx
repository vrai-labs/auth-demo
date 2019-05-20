import AuthRequest from 'auth-website';
import moment from 'moment';
import * as React from 'react';

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
                <ul>
                    <li>
                        You need Firefox for this demo as you will be stealing auth tokens - which is easiest todo on firefox
                </li>
                    <li>
                        Start by opening this page in a Firefox (non private window).
                </li>
                    <li>
                        Click on the login button below
                </li>
                    <li>
                        Once logged in, follow the steps on the next screen
                </li>
                </ul>
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
            let thefts = (await AuthRequest.get("/api/recenttheft")).data;
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
            let response = await AuthRequest.post("/api/login");
            window.location.href = "/home";
        } catch (err) {
            console.log("error while trying to login!");
        }
    }
}