document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.add-to-cart');

  buttons.forEach(button => {
    button.addEventListener('click', async () => {
      const pid = button.dataset.pid;
      const cartId = localStorage.getItem('cartId');

      if (!cartId) {
        alert('No tenés un carrito creado aún.');
        return;
      }

      try {
        const res = await fetch(`/api/carts/${cartId}/product/${pid}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity: 1 })
        });

        if (res.ok) {
          alert('Producto agregado al carrito');
        } else {
          alert('Error al agregar producto');
        }
      } catch (err) {
        console.error(err);
        alert('Error inesperado');
      }
    });
  });
});
