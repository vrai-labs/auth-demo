"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Auth = require("auth-node-mysql");
const names_1 = require("./names");
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO: see if session already exists.. if so, redirect.
        let session = yield Auth.createNewSession(req, res, getRandomString(), {
            name: getRandomName()
        });
        res.send("");
    });
}
exports.default = login;
function getRandomString() {
    let chars = "abcdefghijklmnopqrstuvwxyz";
    let res = "";
    for (let i = 0; i < 10; i++) {
        res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return res;
}
function getRandomName() {
    let randomName = names_1.default[Math.floor(Math.random() * names_1.default.length)];
    return randomName.firstName + " " + randomName.lastName;
}
//# sourceMappingURL=login.js.map