import Express from "express"
import {sales_report, invoiced_products_report} from "../../../controllers/reports/mysql/generate_report"

export const router = Express.Router()

router.post("/reporte/ventas", sales_report)
router.post("/reporte/productos-facturados", invoiced_products_report)
