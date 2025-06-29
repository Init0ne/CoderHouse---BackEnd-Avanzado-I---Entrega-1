import { Router } from 'express';

const createProductRouter = (manager) => {
  const router = Router();

  router.get('/', async (req, res) => {
    const products = await manager.getProducts();
    res.json(products);
  });

  router.get('/:pid', async (req, res) => {
    const product = await manager.getProductById(req.params.pid);
    product ? res.json(product) : res.status(404).send('Producto no encontrado');
  });

  router.post('/', async (req, res) => {
    const newProduct = await manager.addProduct(req.body);
    res.status(201).json(newProduct);
  });

  router.put('/:pid', async (req, res) => {
    const updated = await manager.updateProductById(req.params.pid, req.body);
    updated ? res.json(updated) : res.status(404).send('Producto no encontrado');
  });

  router.delete('/:pid', async (req, res) => {
    await manager.deleteProductById(req.params.pid);
    res.send('Producto eliminado');
  });

  return router;
};

export default createProductRouter;
