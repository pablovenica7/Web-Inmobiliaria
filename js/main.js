// Abrir el modal de filtros al hacer clic en el botón
document.getElementById('abrirFiltros').addEventListener('click', () => {
  document.getElementById('modalFiltros').style.display = 'flex';
});

// Cerrar el modal al hacer clic en el botón "Cancelar" del pie del modal
document.getElementById('cerrarFiltros2').addEventListener('click', () => {
  document.getElementById('modalFiltros').style.display = 'none';
});

// Cerrar el modal si se presiona la tecla ESC
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    document.getElementById('modalFiltros').style.display = 'none';
  }
});
