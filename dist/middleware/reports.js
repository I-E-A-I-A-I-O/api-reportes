"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setQuery = void 0;
var setQuery = function (req, res, next) {
    var _a, _b, _c;
    var _d = req.body, from = _d.from, to = _d.to, client = _d.client, seller = _d.seller;
    var query = "";
    var and_flag = false;
    req.reportConstraints = [];
    if ((!from && to) || (from && !to)) {
        return res.status(400).send("Rango de fechas incompleto.");
    }
    if (from && to) {
        query += "WHERE fecha BETWEEN ? AND ? ";
        (_a = req.reportConstraints) === null || _a === void 0 ? void 0 : _a.push(from, to);
        and_flag = true;
    }
    if (client) {
        if (!and_flag) {
            and_flag = true;
            query += "WHERE ";
        }
        else {
            query += "AND ";
        }
        query += "rif = ? ";
        (_b = req.reportConstraints) === null || _b === void 0 ? void 0 : _b.push(client);
    }
    if (seller) {
        if (!and_flag) {
            and_flag = true;
            query += "WHERE ";
        }
        else {
            query += "AND ";
        }
        query += "fac00.codv = ? ";
        (_c = req.reportConstraints) === null || _c === void 0 ? void 0 : _c.push(seller);
    }
    req.reportQuery = query;
    next();
};
exports.setQuery = setQuery;
