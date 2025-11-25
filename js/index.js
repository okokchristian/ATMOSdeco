// Mostrar el modal al cargar la página
window.onload = function() {
  const modal = document.getElementById('modal-bienvenida');
  modal.style.display = 'block';
};

// Cerrar modal al hacer clic en la "X"
document.querySelector('.cerrar').onclick = function() {
  document.getElementById('modal-bienvenida').style.display = 'none';
};

// Cerrar modal al hacer clic en el botón "Empezar"
document.getElementById('btn-cerrar').onclick = function() {
  document.getElementById('modal-bienvenida').style.display = 'none';
};

// (Opcional) Cerrar si se hace clic fuera del contenido
window.onclick = function(event) {
  const modal = document.getElementById('modal-bienvenida');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};