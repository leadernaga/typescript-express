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
exports.log = void 0;
const express_1 = __importDefault(require("express"));
const user_Route_1 = __importDefault(require("./routes/usersRoutes/user.Route"));
const bunyan_1 = __importDefault(require("bunyan"));
const app = (0, express_1.default)();
// bunyan log
exports.log = bunyan_1.default.createLogger({ name: "expressApp" });
exports.log.info("hi");
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/user", user_Route_1.default);
app.get("/", (req, res) => {
    res.send("hi");
});
app.listen(8080, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("serever started");
}));
exports.default = app;
