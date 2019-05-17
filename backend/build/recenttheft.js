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
function recentTheft(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(JSON.stringify(Thefts.list));
    });
}
exports.recentTheft = recentTheft;
class Thefts {
}
Thefts.list = [];
Thefts.add = (userId) => {
    if (Thefts.list.length >= 20) {
        Thefts.list.pop();
    }
    Thefts.list.unshift({ userId, time: Date.now() });
};
exports.Thefts = Thefts;
//# sourceMappingURL=recenttheft.js.map