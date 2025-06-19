document.addEventListener("DOMContentLoaded", () => {
  const filtroTipo = document.getElementById("filtroTipo");
  const btnPrecio = document.getElementById("btnPrecio");
  const popover = document.getElementById("precioPopover");
  const aplicarPrecio = document.getElementById("aplicarPrecio");
  const precioDesde = document.getElementById("precioDesde");
  const precioHasta = document.getElementById("precioHasta");
  const btnAplicarFiltros = document.getElementById("btnAplicarFiltros");
  const superficieDesde = document.getElementById("superficieDesde");
  const superficieHasta = document.getElementById("superficieHasta");
  const cubiertaDesde = document.getElementById("cubiertaDesde");
  const cubiertaHasta = document.getElementById("cubiertaHasta");
  const switchAptoCredito = document.getElementById("aptoCreditoSwitch");
  const btnAbrirFiltros = document.getElementById("abrirFiltros");
  const textoFiltros = btnAbrirFiltros?.querySelector("strong");
  let propiedades = [];
  let filtroAmbientes = null;
  let ambienteSeleccionado = null;
  let filtroDormitorios = null;
  let dormitoriosSeleccionado = null;
  let filtroBaños = null;
  let bañosSeleccionado = null;
  let filtroCocheras = null;
  let cocheraSeleccionada = null;
  let filtroAntiguedad = null
  let etiquetasSeleccionadas = [];

  // Cargar propiedades desde el JSON
  fetch("../bd/propiedades.json")
    .then(res => res.json())
    .then(data => {
      propiedades = data;
      renderizarPropiedades(propiedades);
    });

  // Filtro de ambientes
  document.querySelectorAll(".btn-ambiente").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".btn-ambiente").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const valor = parseInt(btn.dataset.ambientes);
      ambienteSeleccionado = isNaN(valor) ? null : valor;
    });
  });

  // Filtro de dormitorios
  document.querySelectorAll(".btn-dormitorio").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".btn-dormitorio").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const valor = parseInt(btn.dataset.dormitorios);
      dormitoriosSeleccionado = isNaN(valor) ? null : valor;
    });
  });

  // Filtro de baños
  document.querySelectorAll(".btn-baño").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".btn-baño").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const valor = parseInt(btn.dataset.baños);
      bañosSeleccionado = isNaN(valor) ? null : valor;
    });
  });

  // Filtro de cocheras
  document.querySelectorAll(".btn-cochera").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".btn-cochera").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const valor = parseInt(btn.dataset.cocheras);
      cocheraSeleccionada = isNaN(valor) ? null : valor;
    });
  });

  // Filtro de antigüedad
  document.querySelectorAll(".btn-antiguedad").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".btn-antiguedad").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const texto = btn.textContent.trim();

      if (texto.includes("Hasta 5")) {
        filtroAntiguedad = { min: 0, max: 5 };
      } else if (texto.includes("5 - 10")) {
        filtroAntiguedad = { min: 5, max: 10 };
      } else if (texto.includes("10 - 20")) {
        filtroAntiguedad = { min: 10, max: 20 };
      } else if (texto.includes("20 - 50")) {
        filtroAntiguedad = { min: 20, max: 50 };
      } else if (texto.includes("+50")) {
        filtroAntiguedad = { min: 51, max: Infinity };
      } else {
        filtroAntiguedad = null;
      }
    });
  });

  // Filtro de etiquetas
  document.querySelectorAll(".btn-etiqueta").forEach(btn => {
    btn.addEventListener("click", () => {
      const etiqueta = btn.dataset.etiqueta;

      btn.classList.toggle("active");

      if (etiquetasSeleccionadas.includes(etiqueta)) {
        etiquetasSeleccionadas = etiquetasSeleccionadas.filter(e => e !== etiqueta);
      } else {
        etiquetasSeleccionadas.push(etiqueta);
      }
    });
  });

  // Botón para aplicar filtros
  if (btnAplicarFiltros) {
    btnAplicarFiltros.addEventListener("click", () => {
      filtroAmbientes = ambienteSeleccionado;
      filtroDormitorios = dormitoriosSeleccionado;
      filtroBaños = bañosSeleccionado;
      filtroCocheras = cocheraSeleccionada;
      aplicarFiltrosCombinados();
      actualizarTextoFiltro();
      const modal = document.getElementById("modalFiltros");
      if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "";
      }
    });
  }

  // Botón para eliminar filtros
  const btnEliminarFiltros = document.getElementById("btnEliminarFiltros");

  if (btnEliminarFiltros) {
    btnEliminarFiltros.addEventListener("click", () => {
      // Reiniciar selects y valores numéricos
      filtroTipo.selectedIndex = 0;
      [precioDesde, precioHasta, superficieDesde, superficieHasta, cubiertaDesde, cubiertaHasta].forEach(input => {
        if (input) input.value = "";
      });

      // Desactivar botones activos
      document.querySelectorAll(".btn-ambiente.active, .btn-dormitorio.active, .btn-baño.active, .btn-cochera.active, .btn-antiguedad.active, .btn-etiqueta.active")
        .forEach(btn => btn.classList.remove("active"));

      // Desmarcar switch apto crédito
      const switchCredito = document.getElementById("aptoCreditoSwitch");
      if (switchCredito) switchCredito.checked = false;

      // Reset variables de filtros
      filtroAmbientes = null;
      ambienteSeleccionado = null;
      filtroDormitorios = null;
      dormitoriosSeleccionado = null;
      filtroBaños = null;
      bañosSeleccionado = null;
      filtroCocheras = null;
      cocheraSeleccionada = null;
      filtroAntiguedad = null;
      filtroAptoCredito = null;
      etiquetasSeleccionadas = [];

      aplicarFiltrosCombinados();
      actualizarTextoFiltro();

      // Cerrar el modal
      const modal = document.getElementById("modalFiltros");
      if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "";
      }
    });
  }

  // Filtros
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
      resultado = resultado.filter(p => filtroAmbientes === 6 ? p.ambientes >= 6 : p.ambientes === filtroAmbientes);
    }

    if (filtroDormitorios !== null) {
      if (filtroDormitorios === 4) {
        resultado = resultado.filter(p => p.dormitorios >= 4);
      } else {
        resultado = resultado.filter(p => p.dormitorios === filtroDormitorios);
      }
    }

    if (filtroBaños !== null) {
      if (filtroBaños === 4) {
        resultado = resultado.filter(p => p.baños >= 4);
      } else {
        resultado = resultado.filter(p => p.baños === filtroBaños);
      }
    }

    if (filtroCocheras !== null) {
      if (filtroCocheras === 3) {
        resultado = resultado.filter(p => p.cocheras >= 3);
      } else {
        resultado = resultado.filter(p => p.cocheras === filtroCocheras);
      }
    }

    // Filtro de superficie total
    const supDesde = parseFloat(superficieDesde?.value);
    const supHasta = parseFloat(superficieHasta?.value);

    if (!isNaN(supDesde)) {
      resultado = resultado.filter(p => p.m2_totales >= supDesde);
    }
    if (!isNaN(supHasta)) {
      resultado = resultado.filter(p => p.m2_totales <= supHasta);
    }

    // Filtro de superficie cubierta
    const cubDesde = parseFloat(cubiertaDesde?.value);
    const cubHasta = parseFloat(cubiertaHasta?.value);

    if (!isNaN(cubDesde)) {
      resultado = resultado.filter(p => p.m2_cubiertos >= cubDesde);
    }
    if (!isNaN(cubHasta)) {
      resultado = resultado.filter(p => p.m2_cubiertos <= cubHasta);
    }

    // Filtro de antigüedad
    if (filtroAntiguedad !== null) {
      resultado = resultado.filter(p =>
        p.antiguedad >= filtroAntiguedad.min && p.antiguedad <= filtroAntiguedad.max
      );
    }

    // Filtro de apto crédito
    if (switchAptoCredito?.checked) {
      resultado = resultado.filter(p => p.apto_credito === true);
    }

    // Filtro de etiquetas
    if (etiquetasSeleccionadas.length > 0) {
      resultado = resultado.filter(p =>
        p.etiquetas && etiquetasSeleccionadas.every(et => p.etiquetas.includes(et))
      );
    }

    renderizarPropiedades(resultado);

    btnPrecio.textContent = (!isNaN(desde) || !isNaN(hasta))
      ? `USD:${!isNaN(desde) ? " " + desde.toLocaleString() : ""} -${!isNaN(hasta) ? " " + hasta.toLocaleString() : ""}`
      : "Precio";
  }

  // Contar filtros aplicados
  function contarFiltrosAplicados() {
    let contador = 0;

    if (filtroTipo?.value && filtroTipo.value !== "Tipo de propiedad") contador++;
    if (!isNaN(parseFloat(precioDesde?.value))) contador++;
    if (!isNaN(parseFloat(precioHasta?.value))) contador++;
    if (!isNaN(parseFloat(superficieDesde?.value))) contador++;
    if (!isNaN(parseFloat(superficieHasta?.value))) contador++;
    if (!isNaN(parseFloat(cubiertaDesde?.value))) contador++;
    if (!isNaN(parseFloat(cubiertaHasta?.value))) contador++;
    if (filtroAmbientes !== null) contador++;
    if (filtroDormitorios !== null) contador++;
    if (filtroBaños !== null) contador++;
    if (filtroCocheras !== null) contador++;
    if (filtroAntiguedad !== null) contador++;
    if (switchAptoCredito?.checked) contador++;
    if (etiquetasSeleccionadas.length > 0) contador++;

    return contador;
  }

  // Actualizar texto de filtros aplicados
  function actualizarTextoFiltro() {
    const cantidad = contarFiltrosAplicados();
    if (textoFiltros) {
      textoFiltros.textContent = `Filtros (${cantidad})`;
    }
  }

  //Bloquear negativos
  [precioDesde, precioHasta, superficieDesde, superficieHasta, cubiertaDesde, cubiertaHasta].forEach(input => {
    if (input) {
      input.addEventListener("input", () => {
        if (parseFloat(input.value) < 0) input.value = "";
      });
    }
  });

  //Mostrar/Ocultar contraseña
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

  // Validaciones con SweetAlert
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
          }).then(() => {
            form.reset();

            //Reset contador si aplica
            if (id === "form-vender") {
              const contadorVender = document.getElementById("contador-comentario-vender");
              if (contadorVender) contadorVender.textContent = "0/500";
            } else if (id === "form-contacto") {
              const contadorContacto = document.getElementById("contador-comentario-contacto");
              if (contadorContacto) contadorContacto.textContent = "0/500";
            }
          });
        }
      });
    }
  }

  //Registro simulado
  const formSignup = document.getElementById("form-signup");
  if (formSignup) {
    formSignup.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = document.getElementById("signup-nombre").value.trim();
      const email = document.getElementById("signup-email").value.trim();
      const pass1 = document.getElementById("signup-password").value;
      const pass2 = document.getElementById("signup-confirm").value;
      const checkbox = document.getElementById("acepta-terminos");

      if (!nombre || !email || !pass1 || !pass2 || !checkbox.checked || pass1 !== pass2) {
        Swal.fire({
          icon: 'error',
          title: 'Error en el registro',
          text: 'Por favor completá todos los campos correctamente antes de registrarte.',
          confirmButtonColor: 'orange'
        });
        return;
      }

      const nuevoUsuario = {
        id: Date.now(),
        nombre,
        email,
        password: pass1,
        favoritos: []
      };

      localStorage.setItem("usuarioActivo", JSON.stringify(nuevoUsuario));
      actualizarNavbar();

      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: `Bienvenido, ${nombre.split(" ")[0]}`,
        confirmButtonColor: "orange"
      }).then(() => window.location.href = "../index.html");
    });
  }

  //Login simulado
  const formLogin = document.getElementById("form-login");
  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value;

      if (!email || !password) {
        return Swal.fire({
          icon: 'error',
          title: 'Formulario incompleto',
          text: 'Por favor completá todos los campos correctamente antes de iniciar sesión.',
          confirmButtonColor: 'orange'
        });
      }

      if (email === "pablo.venica@example.com" && password === "123456") {
        const usuarioFalso = {
          id: 1,
          nombre: "Pablo Venica",
          email,
          password,
          favoritos: []
        };
        localStorage.setItem("usuarioActivo", JSON.stringify(usuarioFalso));
        actualizarNavbar();
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: 'Bienvenido a VEYOR.',
          confirmButtonColor: 'green'
        }).then(() => window.location.href = "../index.html");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Credenciales incorrectas',
          text: 'El email o la contraseña no coinciden con el usuario válido.',
          confirmButtonColor: 'orange'
        });
      }
    });
  }

  //Navbar dinámico
  function actualizarNavbar() {
    const userData = JSON.parse(localStorage.getItem("usuarioActivo"));
    const userBtn = document.querySelector(".btn.dropdown-toggle");
    const dropdown = document.querySelector(".dropdown-menu");

    if (userData) {
      if (userBtn) userBtn.innerHTML = `<img src="./assets/imagenes/icono_user.png" alt="User" width="24" class="me-2"> ${userData.nombre.split(" ")[0]}`;
      if (dropdown) {
        dropdown.innerHTML = `
          <li><a class="dropdown-item" href="../pages/favoritos.html">Favoritos</a></li>
          <li><a class="dropdown-item" href="#" id="signoutBtn">Sign Out</a></li>
        `;
        document.getElementById("signoutBtn").addEventListener("click", () => {
          localStorage.removeItem("usuarioActivo");
          location.reload();
        });
      }
      document.getElementById("btn-login")?.style.setProperty("display", "none");
      document.getElementById("btn-signup")?.style.setProperty("display", "none");
    }
  }
  actualizarNavbar();

  //Contador comentario
  const textareaVender = document.getElementById("comentario-vender");
  const contadorVender = document.getElementById("contador-comentario-vender");
  if (textareaVender && contadorVender) {
    textareaVender.addEventListener("input", () => {
      contadorVender.textContent = `${textareaVender.value.length}/500`;
    });
  }

  const textareaContacto = document.getElementById("comentario-contacto");
  const contadorContacto = document.getElementById("contador-comentario-contacto");

  if (textareaContacto && contadorContacto) {
    textareaContacto.addEventListener("input", () => {
      contadorContacto.textContent = `${textareaContacto.value.length}/500`;
    });
  }

  //Modal filtros
  const modal = document.getElementById("modalFiltros");
  const abrirBtn = document.getElementById("abrirFiltros");
  const cerrarBtn1 = document.getElementById("cerrarFiltros");
  const cerrarBtn2 = document.getElementById("cerrarFiltros2");

  if (modal && abrirBtn && cerrarBtn1 && cerrarBtn2) {
    const cerrarModal = () => {
      modal.style.display = "none";
      document.body.style.overflow = "";
    };

    abrirBtn.addEventListener("click", () => {
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });

    cerrarBtn1.addEventListener("click", cerrarModal);
    cerrarBtn2.addEventListener("click", cerrarModal);

    window.addEventListener("click", (e) => {
      if (e.target === modal) cerrarModal();
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") cerrarModal();
    });
  }
});

//Renderizado de propiedades
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
