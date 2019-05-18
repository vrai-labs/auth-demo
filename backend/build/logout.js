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
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let session = yield Auth.getSession(req, res);
            yield session.revokeSession();
            res.send("");
        }
        catch (err) {
            if (Auth.Error.isErrorFromAuth(err) && err.errType !== Auth.Error.GENERAL_ERROR) {
                res.status(440).send("Session expired");
            }
            else {
                throw err;
            }
        }
    });
}
exports.default = logout;
//# sourceMappingURL=logout.js.map