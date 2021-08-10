"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoiced_products_report = exports.sales_report = void 0;
var db_connection_1 = require("../../../utils/db_connection");
var sales_report = function (req, res, next) {
    var _a = req.body, from = _a.from, to = _a.to, client = _a.client, seller = _a.seller;
    var query = "SELECT * FROM fac00 INNER JOIN ven00 ON ven00.CODV = fac00.CODV ";
    var and_flag = false;
    var reportConstraints = [];
    if ((!from && to) || (from && !to)) {
        return res.status(400).send("Rango de fechas incompleto.");
    }
    if (from && to) {
        if (Date.parse(from) > Date.parse(to)) {
            return res.status(400).send("Rango de fechas invalido.");
        }
        query += "WHERE fecha BETWEEN ? AND ? ";
        reportConstraints.push(from, to);
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
        reportConstraints.push(client);
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
        reportConstraints.push(seller);
    }
    db_connection_1.connection.query(query, reportConstraints, function (err, results, _) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).json(results);
    });
};
exports.sales_report = sales_report;
var invoiced_products_report = function (req, res, next) {
    var query = "SELECT fac01.* FROM fac01 INNER JOIN fac00 ON fac00.DOCUMEN = fac01.DOCUMEN ";
    var and_flag = false;
    var _a = req.body, from = _a.from, to = _a.to, client = _a.client, product = _a.product;
    var reportConstraints = [];
    if ((!from && to) || (from && !to)) {
        return res.status(400).send("Rango de fechas incompleto.");
    }
    if (from && to) {
        if (Date.parse(from) > Date.parse(to)) {
            return res.status(400).send("Rango de fechas invalido.");
        }
        query += "WHERE fac01.fecha BETWEEN ? AND ? ";
        reportConstraints.push(from, to);
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
        query += "fac00.rif = ? ";
        reportConstraints.push(client);
    }
    if (product) {
        if (!and_flag) {
            and_flag = true;
            query += "WHERE ";
        }
        else {
            query += "AND ";
        }
        query += "fac01.codp = ? ";
        reportConstraints.push(product);
    }
    db_connection_1.connection.query(query, reportConstraints, function (err, results, _) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).json(results);
    });
};
exports.invoiced_products_report = invoiced_products_report;
