import Product from '../models/product.model.js';

class ProductManager {
  async getProducts() {
    const docs = await Product.find().lean();
    return docs.map(d => ({ ...d, id: d._id.toString(), _id: undefined }));
  }

  async getProductById(pid) {
    const product = await Product.findById(pid).lean();
    if (!product) throw new Error('Producto no encontrado');
    return { ...product, id: product._id.toString(), _id: undefined };
  }

  async addProduct(productData) {
    const requiredFields = ['title', 'description', 'code', 'price', 'status', 'stock', 'category', 'thumbnails'];
    for (const field of requiredFields) {
      if (!productData.hasOwnProperty(field)) {
        throw new Error(`Falta el campo obligatorio: ${field}`);
      }
    }
    const product = await Product.create(productData);
    const obj = product.toObject();
    obj.id = obj._id.toString();
    delete obj._id;
    return obj;
  }

  async updateProductById(pid, updatedFields) {
    delete updatedFields.id;
    const updated = await Product.findByIdAndUpdate(pid, updatedFields, { new: true }).lean();
    if (!updated) throw new Error('Producto no encontrado');
    return { ...updated, id: updated._id.toString(), _id: undefined };
  }

  async deleteProductById(pid) {
    const res = await Product.findByIdAndDelete(pid);
    if (!res) throw new Error('Producto no encontrado');
    return true;
  }

  async paginateProducts(filter, options) {
    const result = await Product.paginate(filter, options);
    return result;
  }
}

export default ProductManager;
