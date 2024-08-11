// Inicia EmailJS con tu User ID
(function () {
  emailjs.init('service_extasis'); // Reemplaza "TU_USER_ID" con tu User ID de EmailJS
})();

// Manejar el envío del formulario
document
  .getElementById('contacto-formulario')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const message = document.getElementById('mensaje').value;

    // Parámetros que serán enviados a EmailJS
    const templateParams = {
      from_name: `${nombre} ${apellidos}`, // Combina nombre y apellidos
      from_email: correo,
      from_phone: telefono,
      message: message,
    };

    // Enviar el correo usando EmailJS
    emailjs.send('service_extasis', 'template_e30fd48', templateParams).then(
      function (response) {
        alert('Correo enviado con éxito!', response.status, response.text);
      },
      function (error) {
        alert('Fallo en el envío del correo...', error);
      }
    );
  });
