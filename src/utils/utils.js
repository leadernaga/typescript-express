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
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var jwt = require('jsonwebtoken');
function generateHash(password) {
    return __awaiter(this, void 0, void 0, function* () {
        var hash = bcrypt.hashSync(password, salt);
        return hash;
    });
}
function verifyHash(password, hash) {
    return bcrypt.compareSync(password, hash);
}
function generateJWT(email, username) {
    return jwt.sign({ data: { email, username } }, 'secret', {
        expiresIn: 60 * 60,
    });
}
function verifyJWT(token) {
    return jwt.verify(token, 'secret');
}
function allLetters(name = '') {
    let letters = /^[A-Za-z]+$/;
    if (name.match(letters)) {
        return true;
    }
    return false;
}
module.exports = {
    allLetters,
    generateHash,
    verifyHash,
    generateJWT,
    verifyJWT,
};
