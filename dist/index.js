"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const morgan = require('morgan');
const port = 3000;
app.use(morgan('dev'));
app.get('/', (req, res) => {
    res.send('Hello Typescript!');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
