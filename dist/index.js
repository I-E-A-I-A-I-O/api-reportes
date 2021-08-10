"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var generate_reports_1 = require("./routers/reports/mysql/generate_reports");
var generate_reports_2 = require("./routers/reports/dbf/generate_reports");
var app = express_1.default();
var port = process.env.PORT || 8000;
app.use(express_1.default.json());
app.use("/mysql", generate_reports_1.router);
app.use("/dbf", generate_reports_2.router);
app.listen(port, function () {
    console.info("Servidor activo en el puerto " + port + ".");
});
