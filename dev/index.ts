import dotenv from "dotenv"
dotenv.config()

import Express from "express"
import {router as mysql_report_router} from "./routers/reports/mysql/generate_reports"
import {router as dbf_report_router} from "./routers/reports/dbf/generate_reports"

const app = Express()
const port = process.env.PORT || 8000

app.use(Express.json())

app.use("/mysql", mysql_report_router)
app.use("/dbf", dbf_report_router)

app.listen(port, () => {
  console.info(`Servidor activo en el puerto ${port}.`)
})
