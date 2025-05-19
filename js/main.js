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

//Filtro de búsqueda
document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-propiedades");
  const filtroTipo = document.getElementById("filtro-tipo");
  let propiedades = [];

  // Cargar propiedades desde JSON
  fetch("../bd/propiedades.json")
    .then(res => res.json())
    .then(data => {
      propiedades = data;
      renderizarPropiedades(propiedades);
    })
    .catch(err => {
      console.error("Error al cargar propiedades:", err);
      contenedor.innerHTML = "<p class='text-white'>No se pudieron cargar las propiedades.</p>";
    });

  // Filtrar por tipo
  if (filtroTipo) {
    filtroTipo.addEventListener("change", () => {
      const tipoSeleccionado = filtroTipo.value;
      const filtradas = propiedades.filter(p => p.tipo === tipoSeleccionado);
      renderizarPropiedades(filtradas);
    });
  }

  // Función para renderizar propiedades en el DOM
  function renderizarPropiedades(lista) {
    contenedor.innerHTML = "";

    if (lista.length === 0) {
      contenedor.innerHTML = "<p class='text-white'>No se encontraron propiedades.</p>";
      return;
    }

    lista.forEach(prop => {
      const card = document.createElement("div");
      card.className = "col-12 bg-white rounded-4 shadow p-3 mb-3";

      card.innerHTML = `
        <div class="d-flex flex-column flex-md-row align-items-start gap-4">
          <img src="${prop.imagen}" alt="Propiedad" class="img-fluid rounded" style="width: 300px;">
          <div>
            <h4 class="fw-bold mb-2">$${formatearPrecio(prop.precio)} USD</h4>
            <p>${prop.ubicacion}</p>
            <p>${prop.tipo} - ${prop.ambientes} ambientes - ${prop.dormitorios} dormitorios - ${prop.banos} baño(s)</p>
            <p>Superficie total: ${prop.superficie} m² | Cubierta: ${prop.cubierta} m²</p>
            <small class="text-muted">Asesor: ${prop.asesor}</small>
          </div>
        </div>
      `;

      contenedor.appendChild(card);
    });
  }

  function formatearPrecio(valor) {
    return valor.toLocaleString("es-AR");
  }
});

