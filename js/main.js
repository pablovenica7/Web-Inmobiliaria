document.addEventListener("DOMContentLoaded", () => {
  // Mostrar/Ocultar contraseña
  const toggleIcons = document.querySelectorAll(".toggle-password");
  toggleIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      const inputId = icon.dataset.target;
      const input = document.getElementById(inputId);
      if (input) {
        const isPassword = input.type === "password";
        input.type = isPassword ? "text" : "password";
        icon.src = isPassword
          ? "../assets/imagenes/icono_ojo_cerrado.svg"
          : "../assets/imagenes/icono_ojo.svg";
      }
    });
  });

  // SweetAlert - Contacto
  const formContacto = document.getElementById("form-contacto");
  if (formContacto) {
    formContacto.addEventListener("submit", (e) => {
      if (!formContacto.checkValidity()) {
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
          title: 'Mensaje enviado',
          text: 'Gracias por contactarnos. Te responderemos a la brevedad.',
          confirmButtonColor: 'green'
        }).then(() => {
          formContacto.reset();
        });
      }
    });
  }

  // SweetAlert - Vender
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

  // SweetAlert - Login
  const formLogin = document.getElementById("form-login");
  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      if (!formLogin.checkValidity()) {
        e.preventDefault();
        Swal.fire({
          icon: 'error',
          title: 'Formulario incompleto',
          text: 'Completá los campos correctamente.',
          confirmButtonColor: 'orange'
        });
      } else {
        e.preventDefault();
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: 'Bienvenido a VEYOR.',
          confirmButtonColor: 'green'
        }).then(() => {
          formLogin.reset();
        });
      }
    });
  }

  // SweetAlert - Signup
  const formSignup = document.getElementById("form-signup");
  if (formSignup) {
    formSignup.addEventListener("submit", (e) => {
      const pass1 = document.getElementById("signup-password");
      const pass2 = document.getElementById("signup-confirm");

      if (!formSignup.checkValidity() || pass1.value !== pass2.value) {
        e.preventDefault();
        Swal.fire({
          icon: 'error',
          title: 'Error en el registro',
          text: pass1.value !== pass2.value
            ? 'Las contraseñas no coinciden.'
            : 'Completá todos los campos correctamente.',
          confirmButtonColor: 'orange'
        });
      } else {
        e.preventDefault();
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Tu cuenta ha sido creada correctamente.',
          confirmButtonColor: 'green'
        }).then(() => {
          formSignup.reset();
        });
      }
    });
  }

  // Contadores de caracteres
  const textarea = document.getElementById("comentario-contacto");
  const contador = document.getElementById("contador-comentario-contacto");
  if (textarea && contador) {
    textarea.addEventListener("input", () => {
      contador.textContent = `${textarea.value.length}/500`;
    });
  }

  const textareaVender = document.getElementById("comentario-vender");
  const contadorVender = document.getElementById("contador-comentario-vender");
  if (textareaVender && contadorVender) {
    textareaVender.addEventListener("input", () => {
      contadorVender.textContent = `${textareaVender.value.length}/500`;
    });
  }

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

// Variable global donde se guardan todas las propiedades del JSON
let propiedades = [];

//Función que recibe una lista de propiedades y las renderiza dinámicamente dentro del contenedor principal del catálogo
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

// Controla el filtro de precio: abre/cierra el popover, aplica el rango seleccionado, actualiza el botón y bloquea números negativos.
const btnPrecio = document.getElementById("btnPrecio");
const popover = document.getElementById("precioPopover");
const aplicarPrecio = document.getElementById("aplicarPrecio");
const precioDesde = document.getElementById("precioDesde");
const precioHasta = document.getElementById("precioHasta");

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

if (aplicarPrecio) {
  aplicarPrecio.addEventListener("click", () => {
    const desde = parseFloat(precioDesde.value);
    const hasta = parseFloat(precioHasta.value);

    let resultado = propiedades;

    if (!isNaN(desde)) resultado = resultado.filter(p => p.precio >= desde);
    if (!isNaN(hasta)) resultado = resultado.filter(p => p.precio <= hasta);

    renderizarPropiedades(resultado);
    popover.style.display = "none";

    if (!isNaN(desde) || !isNaN(hasta)) {
      let texto = "USD:";
      if (!isNaN(desde)) texto += ` ${desde.toLocaleString()}`;
      texto += " -";
      if (!isNaN(hasta)) texto += ` ${hasta.toLocaleString()}`;
      btnPrecio.textContent = texto;
    } else {
      btnPrecio.textContent = "Precio";
    }
  });
}

function bloquearNegativos(input) {
  input.addEventListener("input", () => {
    if (parseFloat(input.value) < 0) {
      input.value = "";
    }
  });
}

bloquearNegativos(precioDesde);
bloquearNegativos(precioHasta);

fetch("../bd/propiedades.json")
  .then(res => res.json())
  .then(data => {
    propiedades = data;
    renderizarPropiedades(propiedades);

    // Filtro tipo de propiedad
    if (filtroTipo) {
      filtroTipo.addEventListener("change", () => {
        aplicarFiltrosCombinados();
      });
    }

    // Filtro precio
    if (aplicarPrecio) {
      aplicarPrecio.addEventListener("click", () => {
        popover.style.display = "none";
        aplicarFiltrosCombinados();
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

      if (!isNaN(desde)) {
        resultado = resultado.filter(p => p.precio >= desde);
      }

      if (!isNaN(hasta)) {
        resultado = resultado.filter(p => p.precio <= hasta);
      }

      renderizarPropiedades(resultado);

      // Actualizar texto del botón
      if (!isNaN(desde) || !isNaN(hasta)) {
        let texto = "USD:";
        if (!isNaN(desde)) texto += ` ${desde.toLocaleString()}`;
        texto += " -";
        if (!isNaN(hasta)) texto += ` ${hasta.toLocaleString()}`;
        btnPrecio.textContent = texto;
      } else {
        btnPrecio.textContent = "Precio";
      }
    }
  });
