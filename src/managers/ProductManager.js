import Product from '../models/product.model.js';

class ProductManager {
  async getProducts() {
    return await Product.find().lean();
  }

  async getProductById(pid) {
    const product = await Product.findById(pid).lean();
    if (!product) throw new Error('Producto no encontrado');
    return product;
  }

  async addProduct(productData) {
    const requiredFields = ['title', 'description', 'code', 'price', 'status', 'stock', 'category', 'thumbnails'];
    for (const field of requiredFields) {
      if (!productData.hasOwnProperty(field)) {
        throw new Error(`Falta el campo obligatorio: ${field}`);
      }
    }
    const product = await Product.create(productData);
    return product.toObject();
  }

  async updateProductById(pid, updatedFields) {
    delete updatedFields.id;
    const updated = await Product.findByIdAndUpdate(pid, updatedFields, { new: true }).lean();
    if (!updated) throw new Error('Producto no encontrado');
    return updated;
  }

  async deleteProductById(pid) {
    const res = await Product.findByIdAndDelete(pid);
    if (!res) throw new Error('Producto no encontrado');
    return true;
  }
}

export default ProductManager;
