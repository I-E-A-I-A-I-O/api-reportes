# api-reportes

- **/mysql/reporte/ventas**

Acepta peticiones POST para generar un reporte de ventas desde MySQL. Puede recibir un body formato JSON con el modelo de la forma {"from": Inicio del rango de fechas, "to": Final del rango de fechas, "client": RIF del cliente, "seller": Codigo del vendedor}.

- **/mysql/reporte/productos-facturados**

Acepta peticiones POST para generar un reporte de productos facturados desde MySQL. Puede recibir un body formato JSON con el modelo de la forma {"from": Inicio del rango de fechas, "to": Final del rango de fechas, "client": RIF del cliente, "product": Codigo del producto}.
