import {Request, Response, NextFunction} from "express"
import {ReportConstraints, InvoiceReportConstraints} from "../../../utils/types"
import {DBFFile} from "dbffile"

const sales_reports = async (req: Request, res: Response, next: NextFunction) => {
  const {from, to, client, seller} = req.body as ReportConstraints
  try {
    const fac00 = await DBFFile.open(process.env.DBF_ROUTE + "\\FAC00.dbf", {readMode: "loose"})
    let records = await fac00.readRecords()
    if ((from && !to) || (!from && to)) {
      return res.status(400).send("Rango de fechas incompleto.")
    }
    if (from && to) {
      if (Date.parse(from) > Date.parse(to)) {
        return res.status(400).send("Rango de fechas invalido.")
      }
      records = records.filter(value => (Date.parse(value.FECHA as string) >= Date.parse(from)) && (Date.parse(value.FECHA as string) <= Date.parse(to)))
    }
    if (client) {
      records = records.filter(value => value.RIF == client)
    }
    if (seller) {
      records = records.filter(value => value.CODV == seller)
    }
    res.status(200).json(records)
  } catch(err) {
    console.error(err)
    res.status(500).send("Error leyendo el archivo.")
  }
}

const invoiced_products_report = async (req: Request, res: Response, next: NextFunction) => {
  const {from, to, client, product} = req.body as InvoiceReportConstraints
  try {
    const fac01 = await DBFFile.open(process.env.DBF_ROUTE + "\\FAC01.dbf", {readMode: "loose"})
    let records = await fac01.readRecords()
    if (client) {
      const fac00 = await DBFFile.open(process.env.DBF_ROUTE + "\\FAC00.dbf", {readMode: "loose"})
      let records00 = await fac00.readRecords()
      let filtered_records = []
      records00 = records00.filter(value => value.RIF == client)
      for (let i = 0; i < records.length; i++) {
        for (let n = 0; n < records00.length; n++) {
          if (records[i].DOCUMEN == records00[n].DOCUMEN) {
            filtered_records.push(records[i])
            break
          }
        }
      }
      records = filtered_records
    }
    if ((from && !to) || (!from && to)) {
      return res.status(400).send("Rango de fechas incompleto.")
    }
    if (from && to) {
      if (Date.parse(from) > Date.parse(to)) {
        return res.status(400).send("Rango de fechas invalido.")
      }
      records = records.filter(value => (Date.parse(value.FECHA as string) >= Date.parse(from)) && (Date.parse(value.FECHA as string) <= Date.parse(to)))
    }
    if (product) {
      records = records.filter(value => value.CODP == product)
    }
    res.status(200).json(records)
  } catch(err) {
    console.error(err)
    res.status(500).send("Error leyendo el archivo.")
  }
}

export {
  sales_reports,
  invoiced_products_report
}
