"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const knexfile = require('../../config/connection');
const utils = require('../../utils/utils');
function signupUser({ name, email, password, username }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hash = yield utils.generateHash(password);
            yield knexfile
                .insert({ name, username, email, password: hash })
                .into('employees');
            return { message: 'success' };
        }
        catch (err) {
            const message = err.detail.split('Key');
            return { message: message[1] };
        }
    });
}
function LoginUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!password || !email) {
            return { message: 'please provide valid details' };
        }
        try {
            let data = yield knexfile
                .select('*')
                .where('email', email)
                .from('employees');
            // console.log(data)
            if (!data[0].name || !utils.verifyHash(password, data[0].password)) {
                return { message: 'username or password is incorrect' };
            }
            const token = utils.generateJWT(email, data.username);
            return { message: 'success', token: token };
            console.log(data);
        }
        catch (err) {
            console.log(err);
            return { message: err };
        }
    });
}
module.exports = { signupUser, LoginUser };
