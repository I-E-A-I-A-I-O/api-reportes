import Express from "express"
import {sales_reports, invoiced_products_report} from "../../../controllers/reports/dbf/generate_reports"

export const router = Express.Router()

router.post("/reporte/ventas", sales_reports)
router.post("/reporte/productos-facturados", invoiced_products_report)
