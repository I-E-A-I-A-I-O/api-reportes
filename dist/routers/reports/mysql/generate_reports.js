"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var generate_report_1 = require("../../../controllers/reports/mysql/generate_report");
exports.router = express_1.default.Router();
exports.router.post("/reporte/ventas", generate_report_1.sales_report);
exports.router.post("/reporte/productos-facturados", generate_report_1.invoiced_products_report);
