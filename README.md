# Entrega Final

## Descripción

Esta entrega final implementa un servidor backend con **Express**, **Handlebars**, **Socket.io** y **MongoDB** mediante **Mongoose**, permitiendo visualizar y gestionar productos en tiempo real.

Se incluyen dos vistas principales:

- `/` (**home**): lista todos los productos disponibles, mostrando imagen, título, precio, categoría, descripción y stock.
- `/realtimeproducts`: muestra la misma lista pero con actualización en vivo usando WebSockets. Permite crear y eliminar productos sin recargar la página.

Además, se exponen rutas API para gestión de productos y carritos almacenados en MongoDB.

## Requisitos

- Node.js v14+ o superior
- npm
- Instancia de MongoDB (local o en la nube)

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Init0ne/CoderHouse---BackEnd-Avanzado-I---Entrega-1.git
cd CoderHouse---BackEnd-Avanzado-I---Entrega-1/src
```

Instalar dependencias:

```bash
npm install
```

Copiar `.env.example` a `.env` y configurar `MONGODB_URI`:

```bash
cp .env.example .env
```

## Uso

Iniciar el servidor:

```bash
npm start
```

Acceder desde el navegador:

- Home: <http://localhost:8080/>
- Real Time: <http://localhost:8080/realtimeproducts>

## Endpoints API

### Productos

| Método | Ruta | Descripción |
| ------ | ---- | ----------- |
| GET    | `/api/products` | Listar todos los productos |
| GET    | `/api/products/:pid` | Obtener producto por ID |
| POST   | `/api/products` | Crear un nuevo producto |
| PUT    | `/api/products/:pid` | Actualizar producto por ID |
| DELETE | `/api/products/:pid` | Eliminar producto por ID |

### Carritos

| Método | Ruta | Descripción |
| ------ | ---- | ----------- |
| POST   | `/api/carts` | Crear un nuevo carrito |
| GET    | `/api/carts/:cid` | Ver productos de un carrito por ID |
| POST   | `/api/carts/:cid/product/:pid` | Agregar producto a carrito por IDs |

## Estructura de carpetas

```
src/
├── models/                # Esquemas de Mongoose
│   ├── product.model.js
│   └── cart.model.js
├── managers/
│   ├── ProductManager.js  # Lógica de productos
│   └── CartManager.js     # Lógica de carritos
├── routes/
│   ├── products.router.js # Rutas de productos
│   └── carts.router.js    # Rutas de carritos
├── views/
│   ├── layouts/
│   │   └── main.handlebars  # Layout base
│   ├── home.handlebars      # Vista estática de productos
│   └── realTimeProducts.handlebars # Vista en tiempo real
├── public/
│   └── js/
│       └── realtime.js       # Cliente Socket.io
└── app.js                 # Servidor Express + Handlebars + Socket.io
```

## Funcionalidades

- Visualización estática de productos en `/`.
- Actualización en tiempo real en `/realtimeproducts` al crear o eliminar productos.
- Integración de Handlebars para renderizado de vistas.
- WebSockets (Socket.io) para comunicación bidireccional.
- Gestión de datos mediante ProductManager y CartManager conectados a MongoDB.
- Manejo de errores en backend y emisiones de validaciones al cliente.

## Notes

- La vista de tiempo real envía los datos de creación y eliminación solo por WebSocket.
- La vista home muestra imágenes reales tomadas de URLs públicas.
