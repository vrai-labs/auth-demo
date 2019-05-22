import AuthRequest from 'auth-website';
import * as React from 'react';

export default class HomePage extends React.PureComponent<{}, {
    name: string | undefined,
    userId: string | undefined, apiCalls: number,
    startTime: number
}> {

    constructor(props: any) {
        super(props);
        this.state = {
            name: undefined,
            userId: undefined,
            apiCalls: 0,
            startTime: Date.now()
        };
    }

    getMainView = (name: string, userId: string) => {
        return (
            <div>
                <h1
                    style={{
                        color: "#3A7FDD"
                    }}>
                    Welcome {name}!
                </h1>
                <h2>Your userId is: {userId.toUpperCase()}</h2>
                <br />
                <h3>Step 1</h3>
                <ul>
                    <li>
                        Keep note of this UserId
                    </li>
                    <li>
                        Right click on this page and select "Inspect Element"
                    </li>
                    <li>
                        Click on the Storage tab
                    </li>
                    <li>
                        Copy the value associated with the cookie: sRefreshToken
                    </li>
                    <li>
                        Open a new Private window (not a new tab) in firefox and go to http://supertokens.io
                    </li>
                    <li>
                        Click on login in that page and then follow Step 2
                    </li>
                </ul>
                <br />
                <h3>Step 2</h3>
                <ul>
                    <li>
                        Right click on this page and select "Inspect Element"
                    </li>
                    <li>
                        Click on the Storage tab
                    </li>
                    <li>
                        Paste the value you copied in Step 1 into the value cell associated with the cookie: sRefreshToken
                    </li>
                    <li>
                        Now wait for a few seconds. You should be logged out on both the windows! And you should see your userID in the recent thefts section :)
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
                    onClick={this.logoutPressed}>Logout</button>
            </div>
        );
    }

    render() {
        if (this.state.name === undefined || this.state.userId === undefined) {
            return (
                <div>
                    Loading...
                </div>
            );
        }
        return this.getMainView(this.state.name, this.state.userId);
    }

    componentDidMount() {
        this.fetchUserInfo();
    }

    logoutPressed = async () => {
        try {
            await AuthRequest.post("/api/logout");
            window.location.href = "/";
        } catch (err) {
            if (err.response !== undefined && err.response.status === 440) {
                window.location.href = "/";
            } else {
                console.log("error while fetching user data");
            }
        }
    }

    fetchUserInfo = async () => {
        try {
            let data = (await AuthRequest.get("/api/userinfo")).data;
            let name = data.name;
            let userId = data.userId;
            this.setState(oldState => ({
                ...oldState,
                name,
                userId,
                apiCalls: oldState.apiCalls + 1
            }));
        } catch (err) {
            if (err.response !== undefined && err.response.status === 440) {
                window.location.href = "/";
                return;
            } else {
                console.log("error while fetching user data");
            }
        }
        setTimeout(this.fetchUserInfo, 1000);   // so that it keeps on running in the backgroud as a cron job
    }
}

