"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateSession = void 0;
const authenticateSession = (req, res, next) => {
    if (req.session.userId) {
        console.log("User is authenticated");
        console.log(req.session.userId);
        next();
    }
    else {
        res.sendStatus(401);
    }
};
exports.authenticateSession = authenticateSession;
