import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const manager = new CartManager("./data/carts.json");

router.post('/', async (req, res) => {
  const newCart = await manager.addCart();
  res.status(201).json(newCart);
});

router.get('/:cid', async (req, res) => {
  try {
    const products = await manager.getProductsInCartById(req.params.cid);
    res.json(products);
  } catch (error) {
    res.status(404).send('Carrito no encontrado');
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const quantity = req.body.quantity || 1;
    const updated = await manager.addProductInCart(
      req.params.cid,
      req.params.pid,
      quantity
    );
    res.json(updated);
  } catch (error) {
    res.status(404).send('Carrito no encontrado');
  }
});

export default router;