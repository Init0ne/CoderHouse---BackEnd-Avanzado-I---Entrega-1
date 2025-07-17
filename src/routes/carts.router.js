import { Router } from 'express';

const createCartRouter = (manager) => {
  const router = Router();

  router.post('/', async (req, res, next) => {
    try {
      const carts = await manager.addCart();
      res.status(201).json({ status: "success", carts });
    } catch (err) {
      next(err);
    }
  });

  router.post('/:cid/product/:pid', async (req, res, next) => {
    try {
      const { cid, pid } = req.params;
      const quantity = req.body.quantity;
      const carts = await manager.addProductInCart(cid, pid, quantity);
      res.status(200).json({ status: "success", carts });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:cid', async (req, res, next) => {
    try {
      const cid = req.params.cid;
      const cart = await manager.getCartWithProducts(cid);
      res.json({ status: 'success', cart });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:cid/products/:pid', async (req, res, next) => {
    try {
      const { cid, pid } = req.params;
      const cart = await manager.removeProductFromCart(cid, pid);
      res.json({ status: 'success', cart });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:cid', async (req, res, next) => {
    try {
      const { cid } = req.params;
      const { products } = req.body;
      const cart = await manager.replaceCart(cid, products);
      res.json({ status: 'success', cart });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:cid/products/:pid', async (req, res, next) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      const cart = await manager.updateProductQuantity(cid, pid, quantity);
      res.json({ status: 'success', cart });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:cid', async (req, res, next) => {
    try {
      const { cid } = req.params;
      const cart = await manager.clearCart(cid);
      res.json({ status: 'success', cart });
    } catch (err) {
      next(err);
    }
  });

  return router;
};

export default createCartRouter;
