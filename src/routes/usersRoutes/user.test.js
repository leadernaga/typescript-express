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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const sinon_1 = __importDefault(require("sinon"));
const query = require('../../controllers/userControllers');
describe('user', () => {
    afterEach(() => {
        sinon_1.default.restore();
    });
    describe('/get', () => {
        it('should give users', () => __awaiter(void 0, void 0, void 0, function* () {
            sinon_1.default.stub(query, 'getAllusers').resolves([]);
            const response = yield (0, supertest_1.default)(index_1.default).get('/user');
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ data: [] });
            // expect(response.headers['content-type']).toMatch('json')
        }));
        it('should give users', () => __awaiter(void 0, void 0, void 0, function* () {
            sinon_1.default
                .stub(query, 'getAllusers')
                .rejects('something happened internally');
            const response = yield (0, supertest_1.default)(index_1.default).get('/user');
            expect(response.status).toBe(500);
            expect(response.error.text).toBe('something happened internally');
            // expect(response.headers['content-type']).toMatch('json')
        }));
        it('/:id get should give perticular user ', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(index_1.default).get('/user/5');
            // expect(response.status).toBe(200)
            expect(response.body).toEqual({
                data: [{ id: '5', name: 'mama', age: 40 }],
            });
        }));
        it('/:id get, on rejects should give an error ', () => __awaiter(void 0, void 0, void 0, function* () {
            sinon_1.default
                .stub(query, 'getSingleUserById')
                .rejects('something happened internally');
            const response = yield (0, supertest_1.default)(index_1.default).get('/user/5');
            // expect(response.status).toBe(200)
            expect(response.error.text).toBe('something happened internally');
        }));
    });
    describe('/post', () => {
        it('should able to post users', () => __awaiter(void 0, void 0, void 0, function* () {
            sinon_1.default.stub(query, 'postUsers').resolves({ message: 'success' });
            const response = yield (0, supertest_1.default)(index_1.default)
                .post('/user')
                .send({ name: 'rajesh', age: 40 });
            expect(response.body.message).toBe('success');
        }));
        it('on empty fields should fail', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(index_1.default).post('/user').send();
            expect(response.status).toBe(400);
            expect(response.body.message).toMatch('please enter every field');
        }));
        it('on reject should give error', () => __awaiter(void 0, void 0, void 0, function* () {
            sinon_1.default
                .stub(query, 'postUsers')
                .rejects('something happened internally');
            const response = yield (0, supertest_1.default)(index_1.default)
                .post('/user')
                .send({ name: 'rajesh', age: 5 });
            expect(response.status).toBe(500);
            expect(response.error.text).toMatch('something happened internally');
            // expect(response.body.name).toMatch('something happened internall')
        }));
    });
});
