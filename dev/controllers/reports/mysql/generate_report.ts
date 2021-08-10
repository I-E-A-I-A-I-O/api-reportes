import {connection} from "../../../utils/db_connection"
import {Request, Response, NextFunction} from "express"
import {ReportConstraints, InvoiceReportConstraints} from "../../../utils/types"

const sales_report = (req: Request, res: Response, next: NextFunction) => {
  const {from, to, client, seller} = req.body as ReportConstraints
  let query = "SELECT * FROM fac00 INNER JOIN ven00 ON ven00.CODV = fac00.CODV "
  let and_flag = false
  let reportConstraints = []
  if ((!from && to) || (from && !to)) {
    return res.status(400).send("Rango de fechas incompleto.")
  }
  if (from && to) {
    query += "WHERE fecha BETWEEN ? AND ? "
    reportConstraints.push(from, to)
    and_flag = true
  }
  if (client) {
    if (!and_flag) {
      and_flag = true
      query += "WHERE "
    } else {
      query += "AND "
    }
    query += "rif = ? "
    reportConstraints.push(client)
  }
  if (seller) {
    if (!and_flag) {
      and_flag = true
      query += "WHERE "
    } else {
      query += "AND "
    }
    query += "fac00.codv = ? "
    reportConstraints.push(seller)
  }
  connection.query(query, reportConstraints, (err, results, _) => {
    if (err) {
      return res.status(500).send(err.message)
    }
    res.status(200).json(results)
  })
}

const invoiced_products_report = (req: Request, res: Response, next: NextFunction) => {
  let query = "SELECT fac01.* FROM fac01 INNER JOIN fac00 ON fac00.DOCUMEN = fac01.DOCUMEN "
  let and_flag = false
  const {from, to, client, product} = req.body as InvoiceReportConstraints
  let reportConstraints = []
  if ((!from && to) || (from && !to)) {
    return res.status(400).send("Rango de fechas incompleto.")
  }
  if (from && to) {
    query += "WHERE fac01.fecha BETWEEN ? AND ? "
    reportConstraints.push(from, to)
    and_flag = true
  }
  if (client) {
    if (!and_flag) {
      and_flag = true
      query += "WHERE "
    } else {
      query += "AND "
    }
    query += "fac00.rif = ? "
    reportConstraints.push(client)
  }
  if (product) {
    if (!and_flag) {
      and_flag = true
      query += "WHERE "
    } else {
      query += "AND "
    }
    query += "fac01.codp = ? "
    reportConstraints.push(product)
  }
  connection.query(query, reportConstraints, (err, results, _) => {
    if (err) {
      return res.status(500).send(err.message)
    }
    res.status(200).json(results)
  })
}

export {
  sales_report,
  invoiced_products_report
}
