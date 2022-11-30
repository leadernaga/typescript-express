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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils = require('../../utils/utils');
const employeesControllers = require('../../controllers/employeeControllers/employeeController');
var createError = require('http-errors');
const route = (0, express_1.Router)();
route.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, name, email } = req.body;
    try {
        if (!username || !password || !utils.allLetters(name) || !email) {
            return res.status(400).send('please enter a valid details');
        }
        const data = yield employeesControllers.signupUser(req.body);
        if (data.message !== 'success') {
            console.log(data);
            return res.status(403).send({ message: data.message });
        }
        res.status(200).send(data.message);
    }
    catch (err) {
        console.log(err);
        res.send(createError(500, 'something went wrong try again'));
    }
}));
module.exports = route;
