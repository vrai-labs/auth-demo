import axios from 'axios';

const defaultPostRequestConfig = {
    timeout: 20000,
    validateStatus: (status: number) => {
        return ((status >= 200 && status < 400) || (status === 440));
    },
    maxRedirects: 20,
    withCredentials: true,
    xsrfCookieName: "",
    xsrfHeaderName: "",
};

const defaultGetRequestConfig = {
    timeout: 20000,
    validateStatus: (status: number) => {
        return ((status >= 200 && status < 400) || (status === 440));
    },
    maxRedirects: 20,
    withCredentials: true,
    xsrfCookieName: "",
    xsrfHeaderName: "",
};

export const SESSION_EXPIRED = "SESSION_EXPIRED";

async function handle440() {
    let response = await onUnauthorisedResponse("/api/refreshtoken");
    if (response.result === "API_ERROR") {
        throw response.error;
    } else if (response.result === "SESSION_EXPIRED") {
        throw new Error(SESSION_EXPIRED);
    }
}

export async function postRequest(url: string) {
    let config = {
        ...defaultPostRequestConfig
    };
    while (true) {
        let response = await axios.post(url, undefined, config);
        if (response.status === 440) {
            await handle440();
        } else {
            return await response.data;
        }
    }
}

export async function getRequest(url: string) {
    let config = {
        ...defaultGetRequestConfig
    };
    while (true) {
        let response = await axios.get(url, config);
        if (response.status === 440) {
            await handle440();
        } else {
            return await response.data;
        }
    }
}

async function onUnauthorisedResponse(REFRESH_TOKEN_URL: string):
    Promise<{ result: "SESSION_EXPIRED" } |
    { result: "SESSION_REFRESHED", apiResponse: any } |
    { result: "API_ERROR", error: any } |
    { result: "RETRY" }> {
    // TODO: get from lib..
    return { result: "SESSION_EXPIRED" };
}