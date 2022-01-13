# BDA_Proyecto2_G3
Integrantes: Jeffrey Prado, Evelyn Mejia

Documentación del sistema explicando el rediseño de la BDD 
 
![imagen](https://user-images.githubusercontent.com/15317142/149266912-67b7c38f-6d78-4e62-b8ec-1d92e2fcb943.png)

Para el rediseño, tomamos en consideración tener una columna más (shardid) como hash único en las tablas passenger y booking. Con esto se logra evitan los hotspots, ya que las filas nuevas se distribuyen de manera más uniforme en el espacio de claves. Los hash son útiles cuando se tienen fragmentos lógicos o particiones en una base de datos. 

• Código DDL de su BDD 
archivo: [DDL](DDL.txt)

• Datos sintéticos de operaciones INSERT 
Los datos se generaron haciendo uso de la función insert de [gcs.js](models/gcs.js), se encuentran la carpeta /

• Código de su aplicación web
  Vistas: [views](views/)
  
• Código de su API REST 
  Controlador: [airlineController](controllers/airlineController.js)
  
• Video explicando la implementación y el funcionamiento del sistema 
  Video: https://drive.google.com/file/d/14YzCDxH990olrnMyNl4dKG6yAs9JzJPt/view?usp=sharing


