import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const manager = new CartManager("./data/carts.json");

router.post('/', async (req, res) => {
  const newCart = await manager.addCart();
  res.status(201).json(newCart);
});

router.get('/:cid', async (req, res) => {
  const cart = await manager.getProductsInCartById(req.params.cid);
  cart ? res.json(cart.products) : res.status(404).send('Carrito no encontrado');
});

router.post('/:cid/product/:pid', async (req, res) => {
  const updated = await manager.addProductInCart(req.params.cid, req.params.pid);
  updated ? res.json(updated) : res.status(404).send('Carrito no encontrado');
});

export default router;