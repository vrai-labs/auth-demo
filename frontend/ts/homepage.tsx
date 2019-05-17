import AuthRequest from 'auth-website';
import * as React from 'react';

export default class HomePage extends React.PureComponent<{}, { name: string | undefined, userId: string | undefined }> {

    constructor(props: any) {
        super(props);
        this.state = {
            name: undefined,
            userId: undefined
        };
    }

    getMainView = (name: string, userId: string) => {
        // TODO:
        return (
            <div>
                <h1>Welcome {name}!</h1>
                Your userId is: {userId}
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

    fetchUserInfo = async () => {
        try {
            let data = (await AuthRequest.get("/api/userinfo")).data;
            let name = data.name;
            let userId = data.userId;
            this.setState(oldState => ({
                ...oldState,
                name,
                userId
            }));
        } catch (err) {
            if (err.response !== undefined && err.response.status === 440) {
                window.location.href = "/logout";
                return;
            } else {
                console.log("error while fetching user data");
            }
        }
        setTimeout(this.fetchUserInfo, 1000);   // so that it keeps on running in the backgroud as a cron job
    }
}

