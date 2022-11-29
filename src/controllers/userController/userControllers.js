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
const knex = require('../../config/connection');
function getAllusers(tablename) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield knex.select('*').from(tablename);
    });
}
function postUsers(tablename, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield knex.insert(data).into(tablename);
            return { message: 'success' };
        }
        catch (err) {
            return { message: 'unsuccess' };
        }
    });
}
function getSingleUserById(id, tablename) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return knex.select('*').from(tablename).where('id', id);
            console.log('error');
        }
        catch (err) {
            return { message: 'unsuccessfull' };
        }
    });
}
module.exports = { getAllusers, postUsers, getSingleUserById };
