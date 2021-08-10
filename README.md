# api-reportes

- **/mysql/reporte/ventas**

Acepta peticiones POST para generar un reporte de ventas desde MySQL. Puede recibir un body formato JSON con el modelo de la forma {"from": Inicio del rango de fechas, "to": Final del rango de fechas, "client": RIF del cliente, "seller": Codigo del vendedor}.

- **/mysql/reporte/productos-facturados**

Acepta peticiones POST para generar un reporte de productos facturados desde MySQL. Puede recibir un body formato JSON con el modelo de la forma {"from": Inicio del rango de fechas, "to": Final del rango de fechas, "client": RIF del cliente, "product": Codigo del producto}.


**Nota**: ***Las fechas deben ser en formato ISO***

# Instalacion

- Instalar node.js
- Abrir un terminal e instalar yarn `npm install -g yarn`
- Descargar el [lanzamiento](https://github.com/I-E-A-I-A-I-O/api-reportes/releases) deseado y extraer el archivo
- Navegar a la carpeta que se extrajo
- Instalar las dependencias `yarn install --production=true`
- Ejecutar la api `yarn run start-production`
