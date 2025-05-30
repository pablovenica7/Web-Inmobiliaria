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

  // Sweetalert Contacto
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

  // Sweetalert Vender
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

  // Simulación de registro
  const formSignup = document.getElementById("form-signup");
  if (formSignup) {
    formSignup.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = document.getElementById("signup-nombre").value.trim();
      const email = document.getElementById("signup-email").value.trim();
      const pass1 = document.getElementById("signup-password").value;
      const pass2 = document.getElementById("signup-confirm").value;
      const checkbox = document.getElementById("acepta-terminos");

      if (
        nombre === "" ||
        email === "" ||
        pass1 === "" ||
        pass2 === "" ||
        !checkbox.checked ||
        pass1 !== pass2
      ) {
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
        confirmButtonColor: "orange",
      }).then(() => {
        window.location.href = "../index.html";
      });
    });
  }

  // Simulación login con usuario falso
  const formLogin = document.getElementById("form-login");
  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value;

      if (!email || !password) {
        Swal.fire({
          icon: 'error',
          title: 'Formulario incompleto',
          text: 'Por favor completá todos los campos correctamente antes de iniciar sesión.',
          confirmButtonColor: 'orange'
        });
        return;
      }

      if (
        email === "pablo.venica@example.com" &&
        password === "123456"
      ) {
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
        }).then(() => {
          window.location.href = "../index.html";
        });
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

  // Navbar dinámico
  actualizarNavbar();

  function actualizarNavbar() {
    const userData = JSON.parse(localStorage.getItem("usuarioActivo"));
    const userBtn = document.querySelector(".btn.dropdown-toggle");
    const dropdown = document.querySelector(".dropdown-menu");

    if (userData) {
      if (userBtn) {
        userBtn.innerHTML = `<img src="../assets/imagenes/icono_user.png" alt="User" width="24" class="me-2"> ${userData.nombre.split(" ")[0]}`;
      }

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

      const btnLogin = document.querySelector("#btn-login");
      const btnSignup = document.querySelector("#btn-signup");
      if (btnLogin) btnLogin.style.display = "none";
      if (btnSignup) btnSignup.style.display = "none";
    }
  }

  // Contador de caracteres en textarea de contacto
  const textareaVender = document.getElementById("comentario-vender");
  const contadorVender = document.getElementById("contador-comentario-vender");
  if (textareaVender && contadorVender) {
    textareaVender.addEventListener("input", () => {
      contadorVender.textContent = `${textareaVender.value.length}/500`;
    });
  }

  // Modal filtros
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

    window.addEventListener("click", (e) => {
      if (e.target === modal) cerrarModal();
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") cerrarModal();
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
