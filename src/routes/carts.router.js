import { Router } from 'express';

const createCartRouter = (manager) => {
  const router = Router();

  router.post('/', async (req, res) => {
    const carts = await manager.addCart();
    res.status(201).json({ status: "success", carts });
  });

  router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const quantity = req.body.quantity;
    const carts = await manager.addProductInCart(cid, pid, quantity);
    res.status(200).json({ status: "success", carts });
  });

  router.get('/:cid', async (req, res) => {
    const cid = req.params.cid;
    const products = await manager.getProductsInCartById(cid);
    res.status(200).json({ status: "success", products });
  });

  return router;
};

export default createCartRouter;
