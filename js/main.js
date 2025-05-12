document.addEventListener("DOMContentLoaded", () => {
  const abrirBtn = document.getElementById("abrirFiltros");
  const modal = document.getElementById("modalFiltros");
  const cerrarBtn1 = document.getElementById("cerrarFiltros");
  const cerrarBtn2 = document.getElementById("cerrarFiltros2");

  if (abrirBtn && modal && cerrarBtn1 && cerrarBtn2) {
    abrirBtn.addEventListener("click", () => {
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });

    const cerrarModal = () => {
      modal.style.display = "none";
      document.body.style.overflow = "";
    };

    cerrarBtn1.addEventListener("click", cerrarModal);
    cerrarBtn2.addEventListener("click", cerrarModal);

    // Cerrar al hacer click fuera del modal
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        cerrarModal();
      }
    });

    // Cerrar con Escape
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        cerrarModal();
      }
    });
  }
});

// SweetAlert para el formulario de contacto
document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("form-contacto");

  if (formulario) {
    formulario.addEventListener("submit", (e) => {
      if (!formulario.checkValidity()) {
        e.preventDefault(); // Detiene el envío
        Swal.fire({
          icon: 'error',
          title: 'Formulario incompleto',
          text: 'Por favor completá todos los campos correctamente antes de enviar.',
          confirmButtonColor: 'orange'
        });
      }
    });
  }
});
