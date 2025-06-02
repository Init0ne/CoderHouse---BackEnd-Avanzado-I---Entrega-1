import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async loadProducts() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await fs.promises.writeFile(this.path, JSON.stringify([], null, 2));
        return [];
      } else {
        throw error;
      }
    }
  }

  generateNewId(products) {
    if (products.length > 0) {
      return products[products.length - 1].id + 1;
    } else {
      return 1;
    }
  }

  // GET /
  async getProducts() {
    return await this.loadProducts();
  }

  // GET /:pid
  async getProductById(pid) {
    const products = await this.loadProducts();
    const product = products.find(p => p.id == pid);
    if (!product) throw new Error("Producto no encontrado");
    return product;
  }

  // POST /
  async addProduct(productData) {
    const requiredFields = ['title', 'description', 'code', 'price', 'status', 'stock', 'category', 'thumbnails'];
    const products = await this.loadProducts();

    for (let field of requiredFields) {
      if (!productData.hasOwnProperty(field)) {
        throw new Error(`Falta el campo obligatorio: ${field}`);
      }
    }

    // Validar unicidad del campo "code"
    const existingCode = products.find(p => p.code === productData.code);
    if (existingCode) throw new Error("Ya existe un producto con ese código");

    const newProduct = {
      id: this.generateNewId(products),
      ...productData
    };

    products.push(newProduct);
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), "utf-8");
    return newProduct;
  }

  // PUT /:pid
  async updateProductById(pid, updatedFields) {
    const products = await this.loadProducts();
    const index = products.findIndex(p => p.id == pid);
    if (index === -1) throw new Error("Producto no encontrado");

    // No se debe modificar el ID
    delete updatedFields.id;

    const updatedProduct = { ...products[index], ...updatedFields };
    products[index] = updatedProduct;

    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), "utf-8");
    return updatedProduct;
  }

  // DELETE /:pid
  async deleteProductById(pid) {
    const products = await this.loadProducts();
    const newProducts = products.filter(p => p.id != pid);

    if (products.length === newProducts.length) {
      throw new Error("Producto no encontrado");
    }

    await fs.promises.writeFile(this.path, JSON.stringify(newProducts, null, 2), "utf-8");
    return true;
  }
}

export default ProductManager;