export const SETUP_PRODUCTOS = `
CREATE TABLE productos (id INTEGER PRIMARY KEY, nombre TEXT, categoria TEXT, precio REAL, stock INTEGER);
INSERT INTO productos VALUES (1,'Laptop Pro 15','Electrónica',1299.99,50);
INSERT INTO productos VALUES (2,'Mouse Inalámbrico','Periféricos',29.99,200);
INSERT INTO productos VALUES (3,'Teclado Mecánico','Periféricos',89.99,150);
INSERT INTO productos VALUES (4,'Monitor 27 4K','Electrónica',499.99,30);
INSERT INTO productos VALUES (5,'Webcam HD','Periféricos',79.99,100);
INSERT INTO productos VALUES (6,'Auriculares Bluetooth','Periféricos',149.99,60);
INSERT INTO productos VALUES (7,'Silla Ergonómica','Mobiliario',349.99,10);
`;

export const SETUP_EMPLEADOS_BASICO = `
CREATE TABLE empleados (id INTEGER PRIMARY KEY, nombre TEXT, apellido TEXT, departamento TEXT, salario REAL, email TEXT, telefono TEXT, activo INTEGER);
INSERT INTO empleados VALUES (1,'María','González','Ventas',45000,'maria@email.com',NULL,1);
INSERT INTO empleados VALUES (2,'Carlos','López','Tecnología',65000,'carlos@email.com','555-0102',1);
INSERT INTO empleados VALUES (3,'Ana','Martínez','Ventas',48000,'ana@email.com','555-0103',1);
INSERT INTO empleados VALUES (4,'Pedro','Sánchez','RRHH',42000,'pedro@email.com',NULL,1);
INSERT INTO empleados VALUES (5,'Laura','Torres','Tecnología',70000,'laura@email.com','555-0105',1);
INSERT INTO empleados VALUES (6,'Miguel','Ramos','Ventas',60000,'miguel@email.com','555-0106',0);
INSERT INTO empleados VALUES (7,'Sofía','Ruiz','Marketing',52000,'sofia@email.com','555-0107',1);
INSERT INTO empleados VALUES (8,'Javier','García','RRHH',38000,'javier@email.com',NULL,1);
INSERT INTO empleados VALUES (9,'Elena','Moreno','Marketing',55000,'elena@email.com','555-0109',1);
INSERT INTO empleados VALUES (10,'Andrés','Jiménez','Tecnología',62000,'andres@email.com','555-0110',1);
`;

export const SETUP_EMPLEADOS_CON_FECHA = `
CREATE TABLE empleados (id INTEGER PRIMARY KEY, nombre TEXT, apellido TEXT, departamento TEXT, salario REAL, fecha_contrato TEXT, email TEXT, telefono TEXT, activo INTEGER);
INSERT INTO empleados VALUES (1,'María','González','Ventas',45000,'2020-03-15','maria@email.com',NULL,1);
INSERT INTO empleados VALUES (2,'Carlos','López','Tecnología',65000,'2019-06-01','carlos@email.com','555-0102',1);
INSERT INTO empleados VALUES (3,'Ana','Martínez','Ventas',48000,'2021-01-10','ana@email.com','555-0103',1);
INSERT INTO empleados VALUES (4,'Pedro','Sánchez','RRHH',42000,'2022-08-20','pedro@email.com',NULL,1);
INSERT INTO empleados VALUES (5,'Laura','Torres','Tecnología',70000,'2018-11-05','laura@email.com','555-0105',1);
INSERT INTO empleados VALUES (6,'Miguel','Ramos','Ventas',60000,'2020-07-15','miguel@email.com','555-0106',0);
INSERT INTO empleados VALUES (7,'Sofía','Ruiz','Marketing',52000,'2021-04-01','sofia@email.com','555-0107',1);
INSERT INTO empleados VALUES (8,'Javier','García','RRHH',38000,'2023-01-10','javier@email.com',NULL,1);
INSERT INTO empleados VALUES (9,'Elena','Moreno','Marketing',55000,'2020-09-30','elena@email.com','555-0109',1);
INSERT INTO empleados VALUES (10,'Andrés','Jiménez','Tecnología',62000,'2019-12-01','andres@email.com','555-0110',1);
`;

export const SETUP_CLIENTES = `
CREATE TABLE clientes (id INTEGER PRIMARY KEY, nombre TEXT, email TEXT, ciudad TEXT, pais TEXT);
INSERT INTO clientes VALUES (1,'Ana García','ana@gmail.com','Madrid','España');
INSERT INTO clientes VALUES (2,'Bob Smith','bob@hotmail.com','Nueva York','USA');
INSERT INTO clientes VALUES (3,'Carlos Ruiz','carlos@gmail.com','Ciudad de México','México');
INSERT INTO clientes VALUES (4,'Diana Lee','diana@yahoo.com','Tokio','Japón');
INSERT INTO clientes VALUES (5,'Eva Müller','eva@gmail.com','Berlín','Alemania');
INSERT INTO clientes VALUES (6,'Frank Brown','frank@outlook.com','Londres','UK');
`;

export const SETUP_CLIENTES_PEDIDOS = `
CREATE TABLE clientes (id INTEGER PRIMARY KEY, nombre TEXT, email TEXT, ciudad TEXT, pais TEXT);
INSERT INTO clientes VALUES (1,'Ana García','ana@gmail.com','Madrid','España');
INSERT INTO clientes VALUES (2,'Bob Smith','bob@hotmail.com','Nueva York','USA');
INSERT INTO clientes VALUES (3,'Carlos Ruiz','carlos@gmail.com','Ciudad de México','México');
INSERT INTO clientes VALUES (4,'Diana Lee','diana@yahoo.com','Tokio','Japón');
INSERT INTO clientes VALUES (5,'Eva Müller','eva@gmail.com','Berlín','Alemania');
INSERT INTO clientes VALUES (6,'Frank Brown','frank@outlook.com','Londres','UK');
INSERT INTO clientes VALUES (7,'Gabi López','gabi@gmail.com','Buenos Aires','Argentina');
CREATE TABLE pedidos (id INTEGER PRIMARY KEY, cliente_id INTEGER, fecha TEXT, total REAL);
INSERT INTO pedidos VALUES (1,1,'2024-01-15',299.99);
INSERT INTO pedidos VALUES (2,3,'2024-01-20',459.50);
INSERT INTO pedidos VALUES (3,1,'2024-02-01',149.00);
INSERT INTO pedidos VALUES (4,5,'2024-02-10',799.99);
INSERT INTO pedidos VALUES (5,2,'2024-03-05',129.99);
INSERT INTO pedidos VALUES (6,4,'2024-03-12',549.00);
INSERT INTO pedidos VALUES (7,3,'2024-03-20',89.99);
`;

export const SETUP_EMPLEADOS_DEPARTAMENTOS = `
CREATE TABLE empleados (id INTEGER PRIMARY KEY, nombre TEXT, apellido TEXT, salario REAL, departamento_id INTEGER, activo INTEGER);
INSERT INTO empleados VALUES (1,'María','González',45000,1,1);
INSERT INTO empleados VALUES (2,'Carlos','López',65000,2,1);
INSERT INTO empleados VALUES (3,'Ana','Martínez',48000,1,1);
INSERT INTO empleados VALUES (4,'Pedro','Sánchez',42000,3,1);
INSERT INTO empleados VALUES (5,'Laura','Torres',70000,2,1);
INSERT INTO empleados VALUES (6,'Miguel','Ramos',60000,1,0);
CREATE TABLE departamentos (id INTEGER PRIMARY KEY, nombre TEXT, ciudad TEXT);
INSERT INTO departamentos VALUES (1,'Ventas','Madrid');
INSERT INTO departamentos VALUES (2,'Tecnología','Barcelona');
INSERT INTO departamentos VALUES (3,'RRHH','Madrid');
`;

export const SETUP_UNION = `
CREATE TABLE empleados_madrid (nombre TEXT);
INSERT INTO empleados_madrid VALUES ('Ana García');
INSERT INTO empleados_madrid VALUES ('Carlos Ruiz');
INSERT INTO empleados_madrid VALUES ('Eva Müller');
CREATE TABLE empleados_barcelona (nombre TEXT);
INSERT INTO empleados_barcelona VALUES ('Bob Smith');
INSERT INTO empleados_barcelona VALUES ('Diana Lee');
`;

export const SETUP_DETALLES_PEDIDO = `
CREATE TABLE productos (id INTEGER PRIMARY KEY, nombre TEXT, categoria TEXT, precio REAL, stock INTEGER);
INSERT INTO productos VALUES (1,'Laptop Pro 15','Electrónica',1299.99,50);
INSERT INTO productos VALUES (2,'Mouse Inalámbrico','Periféricos',29.99,200);
INSERT INTO productos VALUES (3,'Teclado Mecánico','Periféricos',89.99,150);
CREATE TABLE detalles_pedido (pedido_id INTEGER, producto_id INTEGER, cantidad INTEGER, precio REAL);
INSERT INTO detalles_pedido VALUES (1,1,2,1299.99);
INSERT INTO detalles_pedido VALUES (1,2,5,29.99);
INSERT INTO detalles_pedido VALUES (2,3,3,89.99);
INSERT INTO detalles_pedido VALUES (3,1,1,1299.99);
`;

export const SETUP_VENDEDORES = `
CREATE TABLE vendedores (nombre TEXT, region TEXT, ventas REAL);
INSERT INTO vendedores VALUES ('Ana García','Norte',15000);
INSERT INTO vendedores VALUES ('Carlos Ruiz','Norte',22000);
INSERT INTO vendedores VALUES ('Eva Müller','Norte',18000);
INSERT INTO vendedores VALUES ('Bob Smith','Sur',12000);
INSERT INTO vendedores VALUES ('Diana Lee','Sur',28000);
INSERT INTO vendedores VALUES ('Frank Brown','Sur',16000);
`;

export const SETUP_VENTAS_MENSUALES = `
CREATE TABLE ventas_mensuales (mes TEXT, ventas REAL);
INSERT INTO ventas_mensuales VALUES ('Enero',15000);
INSERT INTO ventas_mensuales VALUES ('Febrero',18000);
INSERT INTO ventas_mensuales VALUES ('Marzo',16500);
INSERT INTO ventas_mensuales VALUES ('Abril',22000);
INSERT INTO ventas_mensuales VALUES ('Mayo',19500);
`;

export const SETUP_VENTAS = `
CREATE TABLE ventas (id INTEGER PRIMARY KEY, empleado_id INTEGER, monto REAL, fecha TEXT);
INSERT INTO ventas VALUES (1,1,1500,'2024-01-15');
INSERT INTO ventas VALUES (2,2,2300,'2024-01-20');
INSERT INTO ventas VALUES (3,1,800,'2024-02-01');
INSERT INTO ventas VALUES (4,3,3200,'2024-02-10');
INSERT INTO ventas VALUES (5,2,1200,'2024-03-05');
INSERT INTO ventas VALUES (6,3,2100,'2024-03-12');
INSERT INTO ventas VALUES (7,1,950,'2024-03-20');
CREATE TABLE empleados (id INTEGER PRIMARY KEY, nombre TEXT, departamento TEXT, salario REAL);
INSERT INTO empleados VALUES (1,'Ana García','Ventas',45000);
INSERT INTO empleados VALUES (2,'Carlos López','Tecnología',65000);
INSERT INTO empleados VALUES (3,'Eva Müller','Marketing',55000);
`;

export const SETUP_VENTAS_MES = `
CREATE TABLE ventas_mes (mes TEXT, total REAL);
INSERT INTO ventas_mes VALUES ('Enero',15000);
INSERT INTO ventas_mes VALUES ('Febrero',18000);
INSERT INTO ventas_mes VALUES ('Marzo',16500);
INSERT INTO ventas_mes VALUES ('Abril',22000);
`;
