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
function refreshtoken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield Auth.refreshSession(req, res);
            res.send("");
        }
        catch (err) {
            if (err.errCode !== undefined && err.errCode !== 40002 && err.errCode !== 40001 && err.errCode !== 31001) {
                res.status(440).send("Session expired");
            }
            else {
                throw err;
            }
        }
    });
}
exports.default = refreshtoken;
//# sourceMappingURL=refreshtoken.js.map