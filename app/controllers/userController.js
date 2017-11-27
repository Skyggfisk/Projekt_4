"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const moment = require("moment");
class UserController {
    getAll(req, res, next) {
        user_1.User.find((err, users) => {
            if (err)
                return console.error(err.stack);
            res.json(users);
        });
    }
    getOne(req, res, next) {
        user_1.User.findOne({ facebookid: req.params.id }, (err, user) => {
            if (err)
                return console.error(err.stack);
            res.json(user);
        });
    }
    createUser(req, res, next) {
        var user = new user_1.User({
            facebookid: req.body.facebookid,
            description: req.body.description,
            services: req.body.services,
            range: req.body.range,
            zipcode: req.body.zipcode,
            fname: req.body.fname,
            lname: req.body.lname,
            imgurl: req.body.imgurl,
            conversations: req.body.imgurl
        });
        user.save((err, user) => {
            if (err)
                return console.error(err.stack);
            console.log(moment().format("h:mm:ss a") + " - User: " + user.facebookid + " saved!");
            res.send("it worked");
        });
    }
    updateUser(req, res, next) {
        var user = user_1.User.findOne({ facebookid: req.params.id }, (err, user) => {
            user.description = req.body.description || user.description;
            user.services = req.body.services || user.services;
            user.range = req.body.range || user.range;
            user.zipcode = req.body.zipcode || user.zipcode;
            user.fname = req.body.fname || user.fname;
            user.lname = req.body.lname || user.lname;
            user.imgurl = req.body.imgurl || user.imgurl;
            user.conversations = req.body.conversation || user.conversations;
            return user.save(function (err) {
                if (err)
                    return console.log(err);
                console.log(moment().format("h:mm:ss a") +
                    " - User: " +
                    user.facebookid +
                    " updated!");
                res.send(moment().format("h:mm:ss a") +
                    " - User: " +
                    user.facebookid +
                    " updated!");
            });
        });
    }
    deleteUser(req, res, next) {
        user_1.User.findOneAndRemove({ facebookid: req.params.id }, (err, user) => {
            if (err)
                return console.error(err.stack);
            res.json(user);
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map