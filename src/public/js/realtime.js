const socket = io();

// Actualiza la lista con los productos actuales
socket.on('updateProducts', (products) => {
  const list = document.getElementById('product-list');
  list.innerHTML = '';
  products.forEach(p => {
    const li = document.createElement('li');
    li.dataset.id = p.id;

    li.innerHTML = `
      <strong>${p.title}</strong> - $${p.price}<br />
      ID: ${p.id} | Stock: ${p.stock} | Categoría: ${p.category}
    `;

    list.appendChild(li);
  });
});

socket.on('errorMessage', (msg) => {
  alert(`Error: ${msg}`);
});

// Maneja el envío del nuevo producto
document.getElementById('product-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const form = e.target;

  const data = {
    title: form.title.value.trim(),
    description: form.description.value.trim(),
    code: form.code.value.trim(),
    price: parseFloat(form.price.value),
    status: form.status.value.trim(),
    stock: parseInt(form.stock.value),
    category: form.category.value.trim(),
    thumbnails: [form.thumbnails.value.trim()]
  };

  socket.emit('newProduct', data);
  form.reset();
});

// Maneja el envío de la solicitud de eliminación
document.getElementById('delete-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const id = e.target.id.value.trim();
  if (id !== '') {
    socket.emit('deleteProduct', id);
  }
  e.target.reset();
});
