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
// import { log } from '../../index'
const userController = require('../../controllers/userController/userControllers');
const route = (0, express_1.Router)();
route.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // log.info('here users')
    try {
        const data = yield userController.getAllusers('users');
        res.status(200).send({ data: data });
    }
    catch (err) {
        res.status(500).send('something happened internally');
    }
}));
route.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield userController.getSingleUserById(req.params.id, 'users');
        res.status(200).send({ data });
    }
    catch (err) {
        console.log(err, 'err');
        res.status(500).send('something happened internally');
    }
}));
route.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // log.info('here in user route')
    const { name, age } = req.body;
    try {
        function allLetters(name = '') {
            let letters = /^[A-Za-z]+$/;
            if (name.match(letters)) {
                return true;
            }
            return false;
        }
        if (!allLetters(name) || !age) {
            return res.status(400).send({ message: 'please enter every field' });
        }
        const data = yield userController.postUsers('users', { name, age });
        res.status(200).send(data);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
exports.default = route;
