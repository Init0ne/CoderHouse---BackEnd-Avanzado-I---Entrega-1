import Cart from '../models/cart.model.js';

class CartManager {
  async addCart() {
    const newCart = new Cart({ products: [] });
    await newCart.save();
    return newCart;
  }

  async addProductInCart(cid, pid, quantity = 1) {
    const cart = await Cart.findById(cid);
    if (!cart) throw new Error('Carrito no encontrado');

    const existing = cart.products.find(p => p.product.toString() === pid);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.products.push({ product: pid, quantity });
    }

    await cart.save();
    return cart;
  }

  async getProductsInCartById(cid) {
    const cart = await Cart.findById(cid).populate('products.product').lean();
    if (!cart) throw new Error('Carrito no encontrado');
    return cart.products;
  }

  async getCartWithProducts(cid) {
    const cart = await Cart.findById(cid).populate('products.product').lean();
    if (!cart) throw new Error('Carrito no encontrado');
    return cart;
  }

  async clearCart(cid) {
    const cart = await Cart.findById(cid);
    if (!cart) throw new Error('Carrito no encontrado');
    cart.products = [];
    await cart.save();
    return cart;
  }

  async removeProductFromCart(cid, pid) {
    const cart = await Cart.findById(cid);
    if (!cart) throw new Error('Carrito no encontrado');

    cart.products = cart.products.filter(p => p.product.toString() !== pid);
    await cart.save();
    return cart;
  }

  async replaceCart(cid, newProducts) {
    const cart = await Cart.findById(cid);
    if (!cart) throw new Error('Carrito no encontrado');

    cart.products = newProducts.map(p => ({
      product: p.product,
      quantity: p.quantity
    }));

    await cart.save();
    return cart;
  }

  async updateProductQuantity(cid, pid, quantity) {
    const cart = await Cart.findById(cid);
    if (!cart) throw new Error('Carrito no encontrado');

    const item = cart.products.find(p => p.product.toString() === pid);
    if (!item) throw new Error('Producto no encontrado en el carrito');

    item.quantity = quantity;
    await cart.save();
    return cart;
  }
}

export default CartManager;
