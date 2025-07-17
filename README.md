# 🧾 Entrega Final - Backend Avanzado I - CoderHouse

Este proyecto implementa un servidor backend completo con **Express**, **MongoDB**, **Mongoose**, **Handlebars** y **Socket.io**, con gestión de productos y carritos, vistas dinámicas y comunicación en tiempo real.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB + Mongoose
- Handlebars
- Socket.io
- Bootstrap 5
- Cookie-parser
- Method-override
- JavaScript (ESM)

---

## 🎯 Funcionalidades

- CRUD completo de productos y carritos.
- Paginación, filtros y orden en listado de productos.
- WebSocket en `/realtimeproducts` para crear y eliminar productos en vivo.
- Vistas dinámicas con Handlebars.
- Carrito persistente mediante cookie (`cartId`).
- Estética unificada y minimalista.
- Acciones visuales con `alert()` para eliminar productos o vaciar carrito.
- Filtros por categoría o estado (`disponible`) desde la vista `/products`.

---

## 🖥️ Vistas

### `/`
- Lista estática de productos disponibles.
- Diseño responsive con tarjetas limpias y visuales.

### `/products`
- Lista paginada, ordenable y filtrable de productos.
- Vista con botón para ver detalles de cada producto.
- Formulario con filtro por categoría/estado.
- Cookie persistente para el carrito.

### `/products/:pid`
- Vista individual del producto.
- Botón para agregar al carrito.

### `/realtimeproducts`
- Vista con productos en tiempo real vía Socket.io.
- Crear y eliminar productos con formularios en la misma pantalla.

### `/carts/:cid`
- Lista de productos agregados al carrito.
- Botón para eliminar individualmente productos.
- Botón para vaciar todo el carrito.

---

## 🔌 Endpoints API REST

### Productos

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/products` | Listar productos con paginación, filtros y orden |
| GET | `/api/products/:pid` | Obtener producto por ID |
| POST | `/api/products` | Crear producto |
| PUT | `/api/products/:pid` | Actualizar producto |
| DELETE | `/api/products/:pid` | Eliminar producto |

> Soporta `?limit`, `?page`, `?sort`, `?query` en GET `/api/products`

### Carritos

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/carts` | Crear carrito |
| GET | `/api/carts/:cid` | Obtener carrito (con populate de productos) |
| POST | `/api/carts/:cid/product/:pid` | Agregar producto al carrito |
| PUT | `/api/carts/:cid` | Reemplazar productos del carrito |
| PUT | `/api/carts/:cid/products/:pid` | Modificar cantidad de un producto |
| DELETE | `/api/carts/:cid/products/:pid` | Eliminar producto del carrito |
| DELETE | `/api/carts/:cid` | Vaciar carrito completo |

---

## 📁 Estructura del proyecto

```bash
src:
  app.js: null
  .env.example: null
  models/:
    - product.model.js
    - cart.model.js
  managers/:
    - ProductManager.js
    - CartManager.js
  routes/:
    - products.router.js
    - carts.router.js
    - views.router.js
  public/:
    js/:
      - realtime.js
      - products.js
  views/:
    layouts/:
      - main.handlebars
    "":
      - home.handlebars
      - products.handlebars
      - productDetail.handlebars
      - cart.handlebars
      - realTimeProducts.handlebars

```
---

## ⚙️ Instalación y uso

1. Clonar el repositorio:

```bash
git clone https://github.com/Init0ne/CoderHouse---BackEnd-Avanzado-I---Entrega-1.git
cd CoderHouse---BackEnd-Avanzado-I---Entrega-1/src
Instalar dependencias:
```
```bash
npm install
Configurar archivo .env:
```
```bash
cp .env.example .env
```
# Editar MONGODB_URI con tu conexión
Ejecutar servidor:

npm start
Acceder a las vistas:

http://localhost:8080/

http://localhost:8080/products

http://localhost:8080/realtimeproducts

📌 Notas importantes
La cookie cartId se genera automáticamente al agregar un producto por primera vez.

Se usa method-override para permitir DELETE desde formularios.

Las imágenes de productos son cargadas por URL.

El sistema es compatible con MongoDB Atlas o local.

🧑‍💻 Autor
Mathias Falvo – Desarrollador Backend

Proyecto final del curso Backend Avanzado I – CoderHouse