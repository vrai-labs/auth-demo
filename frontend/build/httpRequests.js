var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { onUnauthorisedResponse } from 'auth-website';
import axios from 'axios';
const defaultPostRequestConfig = {
    timeout: 20000,
    validateStatus: (status) => {
        return ((status >= 200 && status < 400) || (status === 440));
    },
    maxRedirects: 20,
    withCredentials: true,
    xsrfCookieName: "",
    xsrfHeaderName: "",
};
const defaultGetRequestConfig = {
    timeout: 20000,
    validateStatus: (status) => {
        return ((status >= 200 && status < 400) || (status === 440));
    },
    maxRedirects: 20,
    withCredentials: true,
    xsrfCookieName: "",
    xsrfHeaderName: "",
};
export const SESSION_EXPIRED = "SESSION_EXPIRED";
function handle440() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield onUnauthorisedResponse("/api/refreshtoken");
        if (response.result === "API_ERROR") {
            throw response.error;
        }
        else if (response.result === "SESSION_EXPIRED") {
            throw new Error(SESSION_EXPIRED);
        }
    });
}
export function postRequest(url) {
    return __awaiter(this, void 0, void 0, function* () {
        let config = Object.assign({}, defaultPostRequestConfig);
        while (true) {
            let response = yield axios.post(url, undefined, config);
            if (response.status === 440) {
                yield handle440();
            }
            else {
                return yield response.data;
            }
        }
    });
}
export function getRequest(url) {
    return __awaiter(this, void 0, void 0, function* () {
        let config = Object.assign({}, defaultGetRequestConfig);
        while (true) {
            let response = yield axios.get(url, config);
            if (response.status === 440) {
                yield handle440();
            }
            else {
                return yield response.data;
            }
        }
    });
}
