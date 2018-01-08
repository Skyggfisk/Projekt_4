"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const app_1 = require("../app");
class JwtController {
    verifyToken(req, res, next) {
        var token = req.body.token || req.query.token || req.headers["x-access-token"];
        if (token) {
            jwt.verify(token, app_1.default.get("superSecret"), function (err, decoded) {
                if (err) {
                    return res.json({
                        success: false,
                        message: "Failed to authenticate token."
                    });
                }
                else {
                    req["decoded"] = decoded;
                    next();
                }
            });
        }
        else {
            return res.status(403).send({
                success: false,
                message: "No token provided."
            });
        }
    }
    ;
}
exports.JwtController = JwtController;
//# sourceMappingURL=jwtController.js.map