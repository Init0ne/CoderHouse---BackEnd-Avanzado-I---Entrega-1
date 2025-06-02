import express from 'express';
import CartManager from './managers/CartManager.js';
import ProductManager from './managers/ProductManager.js';
import cartRouter from './routes/carts.router.js';
import productRouter from './routes/products.router.js';

const app = express();
const PORT = 8080;
app.use(express.json());

const cartManager = new CartManager('./src/data/carts.json');
const productManager = new ProductManager('./src/data/products.json');

//endpoints

app.use('/api/carts', cartRouter);
app.use('/api/products', productRouter);

//----------- /api/products ---------------------
//Debe listar todos los productos.
app.get('/api/products', async (req, res)=>{
    try {
    const products = await productManager.getProducts();
    res.status(200).json({ status: "success", products });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

//Debe traer solo el producto con el id proporcionado.
app.get('/api/products/:pid', async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await productManager.getProductById(pid);
    res.status(200).json({ status: "success", product });
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
  }
});

//Debe agregar un nuevo producto
app.post('/api/products', async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = await productManager.addProduct(productData);
    res.status(201).json({ status: "success", newProduct });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

//Debe actualizar un producto
app.put('/api/products/:pid', async (req, res) => {
  try {
    const pid = req.params.pid;
    const updatedFields = req.body;
    const updatedProduct = await productManager.updateProductById(pid, updatedFields);
    res.status(200).json({ status: "success", updatedProduct });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

//Debe eliminar el producto con el pid indicado
app.delete('/api/products/:pid', async (req, res) => {
  try {
    const pid = req.params.pid;
    await productManager.deleteProductById(pid);
    res.status(200).json({ status: "success", message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
  }
});

//----------- /api/carts ---------------------
app.post("/api/carts", async(req, res)=> {
  try {
    const carts = await cartManager.addCart();
    res.status(201).json({ status: "success", carts });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
})

app.post("/api/carts/:cid/product/:pid", async(req, res)=> {
  try {
    const { cid, pid } = req.params;
    const quantity = req.body.quantity;

    const carts = await cartManager.addProductInCart(cid, pid, quantity);
    res.status(200).json({ status: "success", carts });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.get("/api/carts/:cid", async(req, res)=> {
  try {
    const cid = req.params.cid;

    const products = await cartManager.getProductsInCartById(cid);
    res.status(200).json({ status: "success", products });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
})

app.listen(PORT, ()=> {
  console.log('Servidor iniciado en el puerto 8080');
});