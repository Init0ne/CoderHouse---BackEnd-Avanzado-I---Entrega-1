import { Router } from 'express';

const createProductRouter = (manager) => {
  const router = Router();

  router.get('/', async (req, res, next) => {
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

      const result = await manager.paginateProducts(filter, options);

      res.json({
        status: 'success',
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage ? `/api/products?page=${result.prevPage}` : null,
        nextLink: result.hasNextPage ? `/api/products?page=${result.nextPage}` : null
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:pid', async (req, res, next) => {
    try {
      const product = await manager.getProductById(req.params.pid);
      product ? res.json(product) : res.status(404).send('Producto no encontrado');
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const newProduct = await manager.addProduct(req.body);
      res.status(201).json(newProduct);
    } catch (err) {
      next(err);
    }
  });

  router.put('/:pid', async (req, res, next) => {
    try {
      const updated = await manager.updateProductById(req.params.pid, req.body);
      updated ? res.json(updated) : res.status(404).send('Producto no encontrado');
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:pid', async (req, res, next) => {
    try {
      await manager.deleteProductById(req.params.pid);
      res.send('Producto eliminado');
    } catch (err) {
      next(err);
    }
  });

  return router;
};

export default createProductRouter;
