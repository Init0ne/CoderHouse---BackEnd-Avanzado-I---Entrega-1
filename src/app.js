import express from 'express';
import { Router } from 'express';
import CartManager from './managers/CartManager.js';
import ProductManager from './managers/ProductManager.js';
import createCartRouter from './routes/carts.router.js';
import createProductRouter from './routes/products.router.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productManager = new ProductManager(path.join(__dirname, 'data', 'products.json'));
const cartManager = new CartManager(path.join(__dirname, 'data', 'carts.json'));

const app = express();
const PORT = 8080;
app.use(express.json());

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Routers
app.use('/api/products', createProductRouter(productManager));
app.use('/api/carts', createCartRouter(cartManager));

// Ruta home.handlebars
app.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('home', { title: 'Home', products });
});

// Ruta realTimeProducts.handlebars
app.get('/realtimeproducts', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('realTimeProducts', { title: 'Productos en tiempo real', products });
});

// Socket.io
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on('connection', socket => {
  console.log('🟢 Cliente conectado via WebSocket');

  socket.on('newProduct', async (data) => {
    try {
      await productManager.addProduct(data);
      const updatedProducts = await productManager.getProducts();
      io.emit('updateProducts', updatedProducts);
    } catch (error) {
      console.error('❌ Error al agregar producto:', error.message);
      socket.emit('errorMessage', error.message);
    }
  });

  socket.on('deleteProduct', async (id) => {
    try {
      await productManager.deleteProductById(id);
      const updatedProducts = await productManager.getProducts();
      io.emit('updateProducts', updatedProducts);
    } catch (error) {
      console.error('❌ Error al eliminar producto:', error.message);
      socket.emit('errorMessage', error.message);
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`Servidor listo en puerto ${PORT}`);
});
