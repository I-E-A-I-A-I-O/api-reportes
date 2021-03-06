# api-reportes

- **/mysql/reporte/ventas**

Acepta peticiones POST para generar un reporte de ventas desde MySQL. Puede recibir un body formato JSON con el modelo de la forma {"from": Inicio del rango de fechas, "to": Final del rango de fechas, "client": RIF del cliente, "seller": Codigo del vendedor}.

- **/mysql/reporte/productos-facturados**

Acepta peticiones POST para generar un reporte de productos facturados desde MySQL. Puede recibir un body formato JSON con el modelo de la forma {"from": Inicio del rango de fechas, "to": Final del rango de fechas, "client": RIF del cliente, "product": Codigo del producto}.


- **/dbf/reporte/productos-facturados**

Igual que su contraparte en MySQL, solo que trabaja con los datos alojados en los archivos .dbf

- **/dbf/reporte/ventas**

Igual que su contraparte en MySQL, solo que trabaja con los datos alojados en los archivos .dbf

**Nota**: ***Las fechas deben ser en formato ISO***

# Instalacion

- Instalar node.js
- Abrir un terminal e instalar yarn `npm install -g yarn`
- Descargar el [lanzamiento](https://github.com/I-E-A-I-A-I-O/api-reportes/releases) deseado y extraer el archivo
- Navegar, desde el terminal, a la carpeta extraida
- Instalar las dependencias `yarn install --production=true`
- Ejecutar la API `yarn run start-production`
