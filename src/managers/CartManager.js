import fs from "fs";

class CartManager {
  constructor(path) {
    this.path = path;
  }

  generateNewId(carts) {
    if (carts.length > 0) {
      return carts[carts.length - 1].id + 1;
    } else {
      return 1;
    }
  }

//addCart
async addCart (){
    try {
      const cartJson = await fs.promises.readFile(this.path, "utf-8");
      const carts = JSON.parse(cartJson);

      const id = this.generateNewId(carts);
      carts.push({ id, products: [] });

      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), "utf-8" );
      return carts;
    } catch (error) {
        console.error("Error real en addCart:", error);
      throw new Error("Error, no se pudo agregar el carrito correctamente");
    }
  }

  //getProductsInCartById
  async getProductsInCartById(cid){
    try {
      const cartJson = await fs.promises.readFile(this.path, "utf-8");
      const carts = JSON.parse(cartJson);

      const cart = carts.find((cartData)=> cartData.id == cid );
      if(!cart) throw new Error("Carrito no encontrado");
      return cart.products;
    } catch (error) {
      throw new Error("Error, no se pudo traer los productos del carrito correctamente");
    }
  }

  //addProductInCart
  async addProductInCart(cid, pid, quantity){
    try {
      const cartJson = await fs.promises.readFile(this.path, "utf-8");
      const carts = JSON.parse(cartJson);

  const cart = carts.find(c => c.id == cid);
      if(!cart) throw new Error("Carrito no encontrado");

      const existing = cart.products.find(p => p.id == pid);
      if (existing) {
        existing.quantity = (existing.quantity || 0) + Number(quantity);
      } else {
        cart.products.push({ id: parseInt(pid), quantity: Number(quantity) });
      }

      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), "utf-8");
      return cart;
    } catch (error) {
      throw new Error("Error, no se pudo agregar el producto en el carrito correctamente");
    }
  }
};

export default CartManager;
