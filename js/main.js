document.addEventListener("DOMContentLoaded", () => {
  const filtroTipo = document.getElementById("filtroTipo");
  const btnPrecio = document.getElementById("btnPrecio");
  const popover = document.getElementById("precioPopover");
  const aplicarPrecio = document.getElementById("aplicarPrecio");
  const precioDesde = document.getElementById("precioDesde");
  const precioHasta = document.getElementById("precioHasta");
  const btnAplicarFiltros = document.getElementById("btnAplicarFiltros");

  let propiedades = [];
  let filtroAmbientes = null;
  let ambienteSeleccionado = null;

  fetch("../bd/propiedades.json")
    .then(res => res.json())
    .then(data => {
      propiedades = data;
      renderizarPropiedades(propiedades);
    });

  // Filtro de ambientes (solo activa visualmente)
  document.querySelectorAll(".btn-ambiente").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".btn-ambiente").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const valor = parseInt(btn.dataset.ambientes);
      ambienteSeleccionado = isNaN(valor) ? null : valor;
    });
  });

  // Aplicar filtros al hacer clic en "Aplicar filtros"
  if (btnAplicarFiltros) {
    btnAplicarFiltros.addEventListener("click", () => {
      filtroAmbientes = ambienteSeleccionado;
      aplicarFiltrosCombinados();

      const modal = document.getElementById("modalFiltros");
      if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "";
      }
    });
  }

  // Filtros tipo y precio
  if (filtroTipo) {
    filtroTipo.addEventListener("change", aplicarFiltrosCombinados);
  }

  if (aplicarPrecio) {
    aplicarPrecio.addEventListener("click", () => {
      popover.style.display = "none";
      aplicarFiltrosCombinados();
    });
  }

  if (btnPrecio && popover) {
    btnPrecio.addEventListener("click", () => {
      popover.style.display = popover.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", (e) => {
      if (!popover.contains(e.target) && e.target !== btnPrecio) {
        popover.style.display = "none";
      }
    });
  }

  function aplicarFiltrosCombinados() {
    const tipo = filtroTipo?.value;
    const desde = parseFloat(precioDesde.value);
    const hasta = parseFloat(precioHasta.value);

    let resultado = propiedades;

    if (tipo && tipo !== "Tipo de propiedad") {
      resultado = resultado.filter(p => p.tipo === tipo);
    }

    if (!isNaN(desde)) resultado = resultado.filter(p => p.precio >= desde);
    if (!isNaN(hasta)) resultado = resultado.filter(p => p.precio <= hasta);

    if (filtroAmbientes !== null) {
      resultado = resultado.filter(p =>
        filtroAmbientes === 6 ? p.ambientes >= 6 : p.ambientes === filtroAmbientes
      );
    }

    renderizarPropiedades(resultado);

    btnPrecio.textContent = (!isNaN(desde) || !isNaN(hasta))
      ? `USD:${!isNaN(desde) ? " " + desde.toLocaleString() : ""} -${!isNaN(hasta) ? " " + hasta.toLocaleString() : ""}`
      : "Precio";
  }

  [precioDesde, precioHasta].forEach(input => {
    if (input) {
      input.addEventListener("input", () => {
        if (parseFloat(input.value) < 0) input.value = "";
      });
    }
  });

  document.querySelectorAll(".toggle-password").forEach(icon => {
    icon.addEventListener("click", () => {
      const input = document.getElementById(icon.dataset.target);
      if (input) {
        const isPassword = input.type === "password";
        input.type = isPassword ? "text" : "password";
        icon.src = isPassword
          ? "../assets/imagenes/icono_ojo_cerrado.svg"
          : "../assets/imagenes/icono_ojo.svg";
      }
    });
  });

  validarFormulario("form-contacto", "Mensaje enviado", "Gracias por contactarnos. Te responderemos a la brevedad.");
  validarFormulario("form-vender", "Solicitud enviada", "Gracias por confiar en VEYOR. Te contactaremos pronto.");

  function validarFormulario(id, tituloExito, textoExito) {
    const form = document.getElementById(id);
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!form.checkValidity()) {
          Swal.fire({
            icon: 'error',
            title: 'Formulario incompleto',
            text: 'Por favor completá todos los campos correctamente antes de enviar.',
            confirmButtonColor: 'orange'
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: tituloExito,
            text: textoExito,
            confirmButtonColor: 'green'
          }).then(() => form.reset());
        }
      });
    }
  }
});

// Renderizado de propiedades
function renderizarPropiedades(lista) {
  const contenedor = document.getElementById("contenedor-propiedades");
  contenedor.innerHTML = "";

  lista.forEach(p => {
    const div = document.createElement("div");
    div.className = "col-12 bg-white rounded-4 shadow p-3 d-flex flex-column flex-md-row align-items-start gap-4 catalogo-card";

    div.innerHTML = `
      <div class="imagen-propiedad">
        <img src="${p.imagen}" alt="Imagen propiedad" class="img-fluid rounded-3" style="width: 400px;">
      </div>
      <div class="info-propiedad text-dark flex-grow-1">
        <h3 class="fw-bold mb-1">$${p.precio.toLocaleString()} USD</h3>
        <p class="mb-1">${p.direccion}</p>
        <ul class="list-inline mb-3 text-dark d-flex flex-wrap gap-3">
          <li class="list-inline-item d-flex align-items-center"><img src="../assets/imagenes/icono_regla.png" width="20" class="me-1"> ${p.m2_totales} m² totales</li>
          <li class="list-inline-item d-flex align-items-center"><img src="../assets/imagenes/icono_casa.png" width="20" class="me-1"> ${p.m2_cubiertos} m² cubiertos</li>
          <li class="list-inline-item d-flex align-items-center"><img src="../assets/imagenes/icono_cama.png" width="20" class="me-1"> ${p.ambientes} ambientes</li>
          <li class="list-inline-item d-flex align-items-center"><img src="../assets/imagenes/icono_toilette.png" width="20" class="me-1"> ${p.baños} baño/s</li>
        </ul>
        <p class="mb-2 fw-medium">${p.tipo.toUpperCase()} EN ${p.direccion}</p>
        <p class="text-muted small">Corredores responsables: <span class="text-decoration-underline">Pablo Venica CPI 777</span></p>
        <div class="d-flex align-items-center mt-3">
          <img src="../assets/imagenes/icono_user.svg" alt="Asesor" class="rounded-circle me-2" width="45">
          <div><strong class="d-block">${p.asesor}</strong><small class="text-muted">VEYOR Inmobiliaria</small></div>
        </div>
      </div>
    `;
    contenedor.appendChild(div);
  });
}
