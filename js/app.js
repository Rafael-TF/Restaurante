// Seleccionamos los elementos del DOM que vamos a necesitar
const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelector('img');
const enlacesMenu = document.querySelectorAll('.navegacion a'); // Nuevamente, asegurate que esta clase sea correcta

// Seleccionamos los botones para poder agregarles un evento en el HTML
const btnTodos = document.querySelector('.todos');
const btnAperitivos = document.querySelector('.aperitivos');
const btnEntrantes = document.querySelector('.entrantes');
const btnPlatosPrincipales = document.querySelector('.platosPrincipales');
const btnPostres = document.querySelector('.postres');
const contenedorPlatos = document.querySelector('.platos');

// Cuando el contenido del DOM esté completamente cargado, ejecutamos las funciones
document.addEventListener('DOMContentLoaded', () => {
  eventos();
  cargarPlatos();
});

// Función para agregar los eventos
const eventos = () => {
  menu.addEventListener('click', abrirMenu);
};

// Función para abrir el menú de navegación
const abrirMenu = () => {
  navegacion.classList.remove('ocultar');
  botonCerrar();
};

// Función para crear y manejar el botón de cerrar menú y el overlay
const botonCerrar = () => {
  const btnCerrar = document.createElement('p');
  const overlay = document.createElement('div');
  overlay.classList.add('pantalla-completa');
  const body = document.querySelector('body');

  // Evitamos múltiples overlays
  if (document.querySelectorAll('.pantalla-completa').length > 0) return;

  body.appendChild(overlay);
  btnCerrar.textContent = 'x';
  btnCerrar.classList.add('btn-cerrar');
  navegacion.appendChild(btnCerrar);

  cerrarMenu(btnCerrar, overlay);
};

// Función para cerrar el menú de navegación y eliminar el overlay
const cerrarMenu = (boton, overlay) => {
  const cerrar = () => {
    navegacion.classList.add('ocultar');
    if (overlay) overlay.remove();
    if (boton) boton.remove();
  };

  boton.addEventListener('click', cerrar);
  overlay.addEventListener('click', cerrar);

  // Agregamos el evento click a cada enlace del menú para que cierren el menú
  enlacesMenu.forEach(enlace => {
    enlace.addEventListener('click', cerrar);
  });
};

// Carga diferida de imágenes
document.addEventListener('DOMContentLoaded', function () {
  const lazyImages = document.querySelectorAll('img.lazy');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => {
    imageObserver.observe(img);
  });
});

// Función para cargar y categorizar los platos
const cargarPlatos = () => {
  let platosArreglo = [];
  const platos = document.querySelectorAll('.plato');

  platos.forEach((plato) => (platosArreglo = [...platosArreglo, plato]));
  // Iteramos y guardamos en un array todos los platos

  const aperitivos = platosArreglo.filter(
    (aperitivo) => aperitivo.getAttribute('data-plato') === 'aperitivos'
  );
  const entrantes = platosArreglo.filter(
    (entrante) => entrante.getAttribute('data-plato') === 'entrantes'
  );
  const platosPrincipales = platosArreglo.filter(
    (platoPrincipal) =>
      platoPrincipal.getAttribute('data-plato') === 'platosPrincipales'
  );
  const postres = platosArreglo.filter(
    (postre) => postre.getAttribute('data-plato') === 'postres'
  );

  // Aquí lo que hacemos es que vamos iterando cada uno de los tipos de platos y los vamos guardando por tipos
  mostrarPlatos(
    aperitivos,
    entrantes,
    platosPrincipales,
    postres,
    platosArreglo
  );
};

// Función para mostrar los platos según la categoría seleccionada
const mostrarPlatos = (
  aperitivos,
  entrantes,
  platosPrincipales,
  postres,
  todos
) => {
  btnTodos.addEventListener('click', () => {
    limpiarHtml(contenedorPlatos);
    todos.forEach((plato) => contenedorPlatos.appendChild(plato));
  });

  btnAperitivos.addEventListener('click', () => {
    limpiarHtml(contenedorPlatos);
    aperitivos.forEach((aperitivo) => contenedorPlatos.appendChild(aperitivo));
  });

  btnEntrantes.addEventListener('click', () => {
    limpiarHtml(contenedorPlatos);
    entrantes.forEach((entrante) => contenedorPlatos.appendChild(entrante));
  });

  btnPlatosPrincipales.addEventListener('click', () => {
    limpiarHtml(contenedorPlatos);
    platosPrincipales.forEach((platoPrincipal) =>
      contenedorPlatos.appendChild(platoPrincipal)
    );
  });

  btnPostres.addEventListener('click', () => {
    limpiarHtml(contenedorPlatos);
    postres.forEach((postre) => contenedorPlatos.appendChild(postre));
  });
};

// Función para limpiar el HTML del contenedor de platos
const limpiarHtml = (contenedor) => {
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  }
};

AOS.init({
  duration: 2000, // Duración de la animación en milisegundos
  once: false, // Si deseas que la animación se ejecute solo una vez
});

document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('.fade-down-right');

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Deja de observar una vez que se ha animado
        }
      });
    },
    {
      threshold: 0.1, // Puedes ajustar este valor según tus necesidades
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
});
