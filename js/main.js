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

// Contador de caracteres para el textarea de Contacto
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

// SweetAlert para el formulario de Login
document.addEventListener("DOMContentLoaded", () => {
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
});

// SweetAlert para el formulario de Signup
document.addEventListener("DOMContentLoaded", () => {
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
});

// Mostrar/ocultar contraseña en el formulario de Login
document.addEventListener("DOMContentLoaded", () => {
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
});
