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

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-propiedades");
  const filtroTipo = document.getElementById("filtro-tipo");
  let propiedades = [];

  fetch("../bd/propiedades.json")
    .then(res => res.json())
    .then(data => {
      propiedades = data;
    })
    .catch(error => {
      console.error("Error cargando propiedades:", error);
    });

  filtroTipo?.addEventListener("change", () => {
    const tipoSeleccionado = filtroTipo.value;

    // Eliminar tarjetas dinámicas anteriores
    document.querySelectorAll(".catalogo-card.dinamica").forEach(el => el.remove());

    // Filtrar por tipo y agregar al DOM
    const filtradas = propiedades.filter(p => p.tipo === tipoSeleccionado);
    renderizarPropiedades(filtradas);
  });

  function renderizarPropiedades(lista) {
    lista.forEach(prop => {
      const card = document.createElement("div");
      card.className = "col-12 bg-white rounded-4 shadow p-3 d-flex flex-column flex-md-row align-items-start gap-4 catalogo-card dinamica";

      card.innerHTML = `
        <div class="imagen-propiedad">
          <img src="../assets/imagenes/img_propiedad1.png" alt="Imagen propiedad" class="img-fluid rounded-3" style="width: 400px;">
        </div>
        <div class="info-propiedad text-dark flex-grow-1">
          <h3 class="fw-bold mb-1">$${prop.precio.toLocaleString()} USD</h3>
          <p class="mb-1">${prop.ubicacion}</p>
          <ul class="list-inline mb-3 text-dark d-flex flex-wrap gap-3">
            <li class="list-inline-item d-flex align-items-center">
              <img src="../assets/imagenes/icono_regla.png" width="20" class="me-1"> ${prop.superficie} m² totales
            </li>
            <li class="list-inline-item d-flex align-items-center">
              <img src="../assets/imagenes/icono_casa.png" width="20" class="me-1"> ${prop.cubierta} m² cubiertos
            </li>
            <li class="list-inline-item d-flex align-items-center">
              <img src="../assets/imagenes/icono_cama.png" width="20" class="me-1"> ${prop.ambientes} ambientes
            </li>
            <li class="list-inline-item d-flex align-items-center">
              <img src="../assets/imagenes/icono_toilette.png" width="20" class="me-1"> ${prop.banos} baño
            </li>
          </ul>
          <p class="mb-2 fw-medium">VENTA ${prop.tipo.toUpperCase()} EN ${prop.ubicacion.toUpperCase()}</p>
          <p class="text-muted small">Corredores responsables: <span class="text-decoration-underline">Pablo Venica CPI 777</span></p>
          <div class="d-flex align-items-center mt-3">
            <img src="../assets/imagenes/icono_user.svg" alt="Asesor" class="rounded-circle me-2" width="45">
            <div><strong class="d-block">${prop.asesor}</strong><small class="text-muted">VEYOR Inmobiliaria</small></div>
          </div>
        </div>
      `;

      contenedor.appendChild(card);
    });
  }
});
