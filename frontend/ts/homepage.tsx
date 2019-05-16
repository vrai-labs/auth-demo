import * as React from 'react';

import { getRequest } from './httpRequests';

export default class HomePage extends React.PureComponent<{}, { name: string | undefined }> {

    constructor(props: any) {
        super(props);
        this.state = {
            name: undefined
        };
    }

    getMainView = (name: string) => {
        // TODO:
        return (
            <div>
                <h1>Welcome {this.state.name}!</h1>
            </div>
        );
    }

    render() {
        if (this.state.name === undefined) {
            return (
                <div>
                    Loading...
                </div>
            );
        }
        return this.getMainView(this.state.name);
    }

    componentDidMount() {
        this.fetchUserInfo();
    }

    fetchUserInfo = async () => {
        try {
            let name = (await getRequest("/api/userinfo")).name;
            this.setState(oldState => ({
                ...oldState,
                name
            }));
        } catch (err) {
            if (err.message === "SESSION_EXPIRED") {
                window.location.href = "/logout";
                return;
            } else {
                console.log("error while fetching user data");
            }
        }
        setTimeout(this.fetchUserInfo, 1000);   // so that it keeps on running in the backgroud as a cron job
    }
}

