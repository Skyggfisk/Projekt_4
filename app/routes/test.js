"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router.get("/", (req, res, next) => {
    res.send("yo");
});
exports.default = router;
//# sourceMappingURL=test.js.map