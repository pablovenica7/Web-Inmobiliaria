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
        e.preventDefault(); // Evita envío si no es válido
        Swal.fire({
          icon: 'error',
          title: 'Formulario incompleto',
          text: 'Por favor completá todos los campos correctamente antes de enviar.',
          confirmButtonColor: 'orange'
        });
      } else {
        e.preventDefault(); // Evita envío real (si estás en fase de desarrollo)
        Swal.fire({
          icon: 'success',
          title: 'Mensaje enviado',
          text: 'Gracias por contactarnos. Te responderemos a la brevedad.',
          confirmButtonColor: 'green'
        }).then(() => {
          formulario.reset(); // Limpia el formulario después del mensaje
        });
      }
    });
  }
});

// SweetAlert para el formulario de Vender
document.addEventListener("DOMContentLoaded", () => {
  const formVender = document.getElementById("form-vender");

  if (formVender) {
    formVender.addEventListener("submit", (e) => {
      if (!formVender.checkValidity()) {
        e.preventDefault();
        Swal.fire({
          icon: 'error',
          title: 'Formulario incompleto',
          text: 'Por favor completá todos los campos correctamente antes de enviar.',
          confirmButtonColor: 'orange'
        });
      } else {
        e.preventDefault();
        Swal.fire({
          icon: 'success',
          title: 'Solicitud enviada',
          text: 'Gracias por confiar en VEYOR. Te contactaremos pronto.',
          confirmButtonColor: 'green'
        }).then(() => {
          formVender.reset();
        });
      }
    });
  }
});

// Contador de caracteres para el textarea
const textarea = document.getElementById("comentario-contacto");
const contador = document.getElementById("contador-comentario-contacto");

if (textarea && contador) {
  textarea.addEventListener("input", () => {
    contador.textContent = `${textarea.value.length}/500`;
  });
}

// Contador de caracteres para el textarea de Vender
const textareaVender = document.getElementById("comentario-vender");
const contadorVender = document.getElementById("contador-comentario-vender");

if (textareaVender && contadorVender) {
  textareaVender.addEventListener("input", () => {
    contadorVender.textContent = `${textareaVender.value.length}/500`;
  });
}
