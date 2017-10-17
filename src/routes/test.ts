"use strict";

import * as express from "express";
const router = express.Router();

/* GET test data */
router.get("/", (req, res, next) => {
  res.send("yo");
});

export default router;
