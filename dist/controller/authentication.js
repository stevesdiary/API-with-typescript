"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const users_1 = require("../db/users");
const helpers_1 = require("../helpers");
const login = async (req, res) => {
    try {
        const salt = (0, helpers_1.random)();
        const { email, password } = req.body;
        if (!email && !password) {
            return res.status(400).json('Email and password are required!');
        }
        const user = await (0, users_1.getUserByEmail)(email); //.selected(+authentication.salt +authentication.password);
        if (!user) {
            return res.status(404).json('User ' + email + ' is not found, registration is required before you login!');
        }
        //Authentication of the user without knowing their password
        const encrypted = (0, helpers_1.authentication)(user.authentication.salt, password);
        const expectedHash = encrypted;
        if (encrypted != expectedHash) {
            return res.status(403).json('Incorrect password!');
        }
        user.authentication.sessionToken = (0, helpers_1.authentication)(salt, user._id.toString());
        await user.save();
        res.cookie('STEVE-AUTH', user.authentication.sessionToken), { domain: 'localhost', path: '/' };
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.login = login;
const register = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            console.log("Oops! Email, password and username is required!");
            return res.status(400).json('Email, password and username is required!');
        }
        const existingUser = await (0, users_1.getUserByEmail)(email);
        if (existingUser) {
            return res.status(400).json('User already exists!');
        }
        const salt = (0, helpers_1.random)();
        const user = await (0, users_1.createUser)({
            email,
            username,
            authentication: {
                salt,
                password: (0, helpers_1.authentication)(salt, password),
            },
        });
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.register = register;
//# sourceMappingURL=authentication.js.map