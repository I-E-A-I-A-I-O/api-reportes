"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var generate_reports_1 = require("../../../controllers/reports/dbf/generate_reports");
exports.router = express_1.default.Router();
exports.router.post("/reporte/ventas", generate_reports_1.sales_reports);
exports.router.post("/reporte/productos-facturados", generate_reports_1.invoiced_products_report);
