import { Router } from 'express';
import Product from '../models/product.model.js';
import Cart from '../models/cart.model.js';
import cookieParser from 'cookie-parser';

const router = Router();

router.get('/products', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort === 'asc' || sort === 'desc' ? { price: sort } : {},
      lean: true
    };

    const filter = query
      ? {
          $or: [
            { category: { $regex: query, $options: 'i' } },
            { status: { $regex: query, $options: 'i' } }
          ]
        }
      : {};

    const result = await Product.paginate(filter, options);

    res.render('products', {
      title: 'Productos',
      products: result.docs,
      page: result.page,
      totalPages: result.totalPages,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      cartId: req.cookies.cartId || null,
      year: new Date().getFullYear()
    });
  } catch (err) {
    res.status(500).send('Error cargando productos');
  }
});

router.get('/products/:pid', async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid).lean();
    if (!product) return res.status(404).send('Producto no encontrado');
    res.render('productDetail', { title: product.title, product });
  } catch (err) {
    res.status(500).send('Error al cargar el producto');
  }
});

router.get('/carts/:cid', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate('products.product').lean();
    if (!cart) return res.status(404).send('Carrito no encontrado');
    res.render('cart', {
      title: 'Carrito',
      cart,
      cartId: req.params.cid,
      year: new Date().getFullYear()
    });
  } catch (err) {
    res.status(500).send('Error al cargar el carrito');
  }
});

export default router;
