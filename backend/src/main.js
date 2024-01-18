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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const morgan_1 = __importDefault(require("morgan"));
const sum_1 = require("./sum");
const PORT = (_a = process.env.PORT, (_a !== null && _a !== void 0 ? _a : 8080));
// フロントエンドの URL を 'http://frontend.example.com' のように指定してください。
const CORS_ORIGIN = undefined;
const app = express_1.default();
app.use(morgan_1.default('combined'));
app.use(express_1.default.static('../frontend', { extensions: ['html'] }));
app.use(cors_1.default({ origin: CORS_ORIGIN }));
app.get('/api/health', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        status: 'OK'
    });
}));
app.get('/api/sum', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const input1 = parseInt(req.query.input1);
    const input2 = parseInt(req.query.input2);
    if (isNaN(input1) || isNaN(input2)) {
        res.status(400).json({
            type: 'InvalidInput'
        });
        return;
    }
    const result = sum_1.sum(input1, input2);
    res.json({
        sum: result
    });
}));
app.listen(PORT, () => {
    console.log(`Sample app listening on port ${PORT}`);
});
