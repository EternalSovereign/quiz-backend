import { Request, Response, NextFunction } from "express";

export const authenticateSession = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.session.userId) {
        console.log("User is authenticated");
        console.log(req.session.userId);
        next();
    } else {
        res.sendStatus(401);
    }
};
