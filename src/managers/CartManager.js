import Cart from '../models/cart.model.js';

class CartManager {
  async addCart() {
    const cart = await Cart.create({ products: [] });
    return cart.toObject();
  }

  async getProductsInCartById(cid) {
    const cart = await Cart.findById(cid).populate('products.product').lean();
    if (!cart) throw new Error('Carrito no encontrado');
    return cart.products;
  }

  async addProductInCart(cid, pid, quantity) {
    const cart = await Cart.findById(cid);
    if (!cart) throw new Error('Carrito no encontrado');

    const existing = cart.products.find(p => p.product.toString() === pid);
    if (existing) {
      existing.quantity += Number(quantity);
    } else {
      cart.products.push({ product: pid, quantity: Number(quantity) });
    }
    await cart.save();
    return cart.toObject();
  }
}

export default CartManager;
