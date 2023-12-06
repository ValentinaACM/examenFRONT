// Función para calcular el total basado en los precios del tamaño y tipo de estampado
function calcularTotal() {
  // Obtener el precio del tamaño de estampado desde el input o establecerlo en 0 si está vacío
  var precioTamañoEstampado =
    parseFloat(document.getElementById("inputPrecioTamañoEstampado").value) || 0;

  // Obtener el precio del tipo de estampado desde el input o establecerlo en 0 si está vacío
  var precioDolarEstampado =
    parseFloat(document.getElementById("inputPrecioDolar").value) || 0;

  // Calcular el total sumando los precios del tamaño y tipo de estampado
  var total = precioTamañoEstampado + precioDolarEstampado;

  // Mostrar el total redondeado a dos decimales en el input correspondiente
  document.getElementById("inputTotal").value = total.toFixed(2);
}

// Función para validar el campo de tamaño de estampado
function validarTamañoEstampado() {
  // Obtener referencias a elementos HTML
  var inputTamaño = document.getElementById("inputTamañoEstampado");
  var mensajeError = document.getElementById("mensajeErrorTamaño");

  // Obtener el valor del tamaño, eliminando espacios al principio y al final
  var tamaño = inputTamaño.value.trim();

  // Validaciones del campo de tamaño
  if (tamaño === "") {
    inputTamaño.classList.remove("valido");
    inputTamaño.classList.add("invalido");
    mensajeError.textContent = "Este campo no puede estar vacío.";
    return false;
  } else if (isNaN(tamaño) || parseFloat(tamaño) <= 0) {
    inputTamaño.classList.remove("valido");
    inputTamaño.classList.add("invalido");
    mensajeError.textContent = "Ingrese un tamaño válido (número mayor que 0).";
    return false;
  } else {
    inputTamaño.classList.remove("invalido");
    inputTamaño.classList.add("valido");
    mensajeError.textContent = "";
    return true;
  }
}

// Función para validar el campo de precio del tamaño de estampado
function validarPrecioTamañoEstampado() {
  // Obtener referencias a elementos HTML
  var inputPrecioTamaño = document.getElementById("inputPrecioTamañoEstampado");
  var mensajeError = document.getElementById("mensajeErrorPrecioTamaño");

  // Obtener el valor del precio del tamaño, eliminando espacios al principio y al final
  var precioTamaño = inputPrecioTamaño.value.trim();

  // Validaciones del campo de precio del tamaño
  if (precioTamaño === "") {
    inputPrecioTamaño.classList.remove("valido");
    inputPrecioTamaño.classList.add("invalido");
    mensajeError.textContent = "Este campo no puede estar vacío.";
    return false;
  } else if (isNaN(precioTamaño) || parseFloat(precioTamaño) <= 0) {
    inputPrecioTamaño.classList.remove("valido");
    inputPrecioTamaño.classList.add("invalido");
    mensajeError.textContent = "Ingrese un precio válido (número mayor que 0).";
    return false;
  } else {
    inputPrecioTamaño.classList.remove("invalido");
    inputPrecioTamaño.classList.add("valido");
    mensajeError.textContent = "";
    return true;
  }
}

// Función para validar el campo de tipo de estampado
function validarTipoEstampado() {
  // Obtener referencias a elementos HTML
  var inputTipo = document.getElementById("inputTipoEstampado");
  var mensajeError = document.getElementById("mensajeErrorTipoEstampado");

  // Obtener el valor del tipo de estampado, eliminando espacios al principio y al final
  var tipo = inputTipo.value.trim();

  // Validaciones del campo de tipo de estampado
  if (tipo === "" || tipo === "Seleccione una opción") {
    inputTipo.classList.remove("valido");
    inputTipo.classList.add("invalido");
    mensajeError.textContent = "Seleccione un tipo de estampado válido.";
    return false;
  } else {
    inputTipo.classList.remove("invalido");
    inputTipo.classList.add("valido");
    mensajeError.textContent = "";
    return true;
  }
}

// Función para validar el campo de precio del tipo de estampado
function validarPrecioDolar() {
  // Obtener referencias a elementos HTML
  var inputPrecioDolar = document.getElementById("inputPrecioDolar");
  var mensajeError = document.getElementById("mensajeErrorPrecioDolar");

  // Obtener el valor del precio del tipo, eliminando espacios al principio y al final
  var precioDolar = inputPrecioDolar.value.trim();

  // Validaciones del campo de precio del tipo
  if (precioDolar === "") {
    inputPrecioDolar.classList.remove("valido");
    inputPrecioDolar.classList.add("invalido");
    mensajeError.textContent = "Este campo no puede estar vacío.";
    return false;
  } else if (isNaN(precioDolar) || parseFloat(precioDolar) <= 0) {
    inputPrecioDolar.classList.remove("valido");
    inputPrecioDolar.classList.add("invalido");
    mensajeError.textContent = "Ingrese un precio válido (número mayor que 0).";
    return false;
  } else {
    inputPrecioDolar.classList.remove("invalido");
    inputPrecioDolar.classList.add("valido");
    mensajeError.textContent = "";
    return true;
  }
}

// Asociar eventos de entrada a las funciones de validación correspondientes
document
  .getElementById("inputTamañoEstampado")
  .addEventListener("input", validarTamañoEstampado);
document
  .getElementById("inputPrecioTamañoEstampado")
  .addEventListener("input", validarPrecioTamañoEstampado);
document
  .getElementById("inputTipoEstampado")
  .addEventListener("input", validarTipoEstampado);
document
  .getElementById("inputPrecioDolar")
  .addEventListener("input", validarPrecioDolar);


// URL de la API para obtener y manipular datos de tipo de estampado
const url = "http://localhost:8383/tipoEstampado";

// Función asincrónica para listar tamaños y tipos de estampados
const listarTamanoTipoEstampados = async () => {
  // Realizar una solicitud GET a la API
  fetch(url, {
    method: "GET",
    mode: "cors",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((res) => res.json())
    .then(function (data) {
      // Obtener datos de la respuesta
      let listaTamañoTipo = data.msg;

      // Limpiar el contenido del elemento con el id "contenido"
      const tbody = document.getElementById("contenido");
      tbody.innerHTML = "";

      // Iterar sobre la lista de tamaños y tipos de estampados
      listaTamañoTipo.forEach(function (tamañoTipoEstampado) {
        // Convertir el objeto en una cadena de parámetros de URL
        objetoTamañoTipoEstampado = Object.keys(tamañoTipoEstampado)
          .map(
            (key) => key + "=" + encodeURIComponent(tamañoTipoEstampado[key])
          )
          .join("&");

        // Construir una fila HTML con los datos del tamaño y tipo de estampado
        let filaHTML =
          `<tr>` +
          `<td>${tamañoTipoEstampado.tamano}</td>` +
          `<td>${tamañoTipoEstampado.tipo}</td>` +
          `<td>${tamañoTipoEstampado.precioTamano}</td>` +
          `<td>${tamañoTipoEstampado.precioDolar}</td>` +
          `<td>${tamañoTipoEstampado.total}</td>` +
          `<td>
              <div class="btn-group" role="group" aria-label="Acciones">
                <button type="button" class="btn" onclick='editarTamañoTipoEstampado(${JSON.stringify(
                  tamañoTipoEstampado
                )})'>
                  <img src="img/pencil.ico" alt="Editar" class="iconos-listar">
                </button>
                <button type="button" class="btn" onclick="abrirConfirmarEliminar('${
                  tamañoTipoEstampado._id
                }')">
                  <img src="img/delete.ico" alt="Borrar" class="iconos-listar">
                </button>
              </div>
            </td>` +
          `</tr>`;

        // Agregar la fila al contenido de la tabla
        tbody.innerHTML += filaHTML;
      });
    });
};

// Variable para almacenar el ID del elemento a eliminar
let idDelete = "";

// Función para abrir el modal de confirmación de eliminación
const abrirConfirmarEliminar = (id) => {
  $("#confirmarEliminarModal").modal("show");
  idDelete = id;
};

// Función para confirmar la eliminación de un estampado
const confirmarEliminarEstampado = async () => {
  // Realizar una solicitud DELETE a la API con el ID del elemento a eliminar
  fetch(url, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ _id: idDelete }),
  });

  // Ocultar el modal de confirmación de eliminación
  $("#confirmarEliminarModal").modal("hide");

  // Mostrar modal de eliminación exitosa
  $("#eliminadoExitosamenteModal").modal("show");

  // Actualizar la lista después de la eliminación
  listarTamanoTipoEstampados();
};

// Función para guardar cambios en un estampado
const guardarCambiosEstampado = () => {
  // Validar campos antes de guardar cambios
  if (
    !validarTamañoEstampado() ||
    !validarPrecioTamañoEstampado() ||
    !validarPrecioDolar() ||
    !validarTipoEstampado()
  ) {
    return;
  }

  // Obtener valores de los campos
  const tamanoEstampado = document.getElementById("inputTamañoEstampado").value;
  const tipoEstampado = document.getElementById("inputTipoEstampado").value;
  const precioTamanoEstampado = document.getElementById(
    "inputPrecioTamañoEstampado"
  ).value;
  const precioDolarEstampado = document.getElementById("inputPrecioDolar").value;
  const totalEstampado = document.getElementById("inputTotal").value;

  // Crear objeto con los datos del nuevo estampado
  const nuevoEstampado = {
    tamano: tamanoEstampado,
    tipo: tipoEstampado,
    precioTamano: precioTamanoEstampado,
    precioDolar: precioDolar,
    total: totalEstampado,
  };

  // Realizar una solicitud POST a la API con los datos del nuevo estampado
  fetch(url, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(nuevoEstampado),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(() => {
      // Actualizar la lista después de agregar un nuevo estampado
      listarTamanoTipoEstampados();

      // Limpiar los campos y las clases de validación
      document.getElementById("inputTamañoEstampado").value = "";
      document.getElementById("inputTipoEstampado").value = "";
      document.getElementById("inputPrecioTamañoEstampado").value = "";
      document.getElementById("inputPrecioDolar").value = "";
      document.getElementById("inputTotal").value = "";
      const inputs = document.querySelectorAll(".btnInput");
      inputs.forEach((input) => {
        input.classList.remove("valido", "invalido");
        input.classList.add("btnInput");
      });

      // Mostrar modal de éxito
      $("#exitoModal").modal("show");
    })
    .catch((error) => {
      console.error("Error al crear tamaño y tipo de estampado:", error);
    });
};

// Asociar evento de clic al botón de guardar cambios
document
  .getElementById("guardarCambiosBtn")
  .addEventListener("click", function () {
    // Verificar si se está editando o guardando un nuevo estampado
    if (isEditing) {
      actualizarTamañoTipoEstampado();
    } else {
      guardarCambiosEstampado();
    }
  });

// Función para actualizar un estampado existente
const actualizarTamañoTipoEstampado = async () => {
  // Validar campos antes de actualizar
  if (
    !validarTamañoEstampado() ||
    !validarPrecioTamañoEstampado() ||
    !validarPrecioDolar() ||
    !validarTipoEstampado()
  ) {
    return;
  }

  // Obtener valores de los campos
  const id = document.getElementById("idTamanoTipoEstampado").value;
  const tamanoEstampado = document.getElementById("inputTamañoEstampado").value;
  const tipoEstampado = document.getElementById("inputTipoEstampado").value;
  const precioTamanoEstampado = document.getElementById(
    "inputPrecioTamañoEstampado"
  ).value;
  const precioDolarEstampado = document.getElementById("inputPrecioDolar").value;
  const totalEstampado = document.getElementById("inputTotal").value;

  // Crear objeto con los datos actualizados
  let tamañoTipoEstampado = {
    _id: id,
    tamano: tamanoEstampado,
    tipo: tipoEstampado,
    precioTamano: precioTamanoEstampado,
    precioDolar: precioDolarEstampado,
    total: totalEstampado,
  };

  // Realizar una solicitud PUT a la API con los datos actualizados
  fetch(url, {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify(tamañoTipoEstampado),
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  })
    .then((res) => res.json())
    .then((json) => {
      // Actualizar la lista después de la actualización
      listarTamanoTipoEstampados();
      document.getElementById("inputTamañoEstampado").value = "";
      document.getElementById("inputTipoEstampado").value = "";
      document.getElementById("inputPrecioTamañoEstampado").value = "";
      document.getElementById("inputPrecioDolar").value = "";
      document.getElementById("inputTotal").value = "";
      const inputs = document.querySelectorAll(".btnInput");
      inputs.forEach((input) => {
        input.classList.remove("valido", "invalido");
        input.classList.add("btnInput");
      });
      // Restaurar el texto principal y mostrar modal de éxito de edición
      document.getElementById("texto-principal").textContent =
        "Registrar tamaño y tipo del estampado";
      $("#exitoModalEstampadoEdit").modal("show");

      // Desactivar la bandera de edición
      isEditing = false;
    });
};

// Variables globales para almacenar opciones de tipo de estampado y estado de edición
let opcionesTipoEstampado = "";
let isEditing = false;

// Función para editar un tamaño y tipo de estampado existente
const editarTamañoTipoEstampado = (tamañoTipoEstampado) => {
  // Llenar campos con los datos del estampado a editar
  document.getElementById("idTamanoTipoEstampado").value =
    tamañoTipoEstampado._id;
  document.getElementById("inputTamañoEstampado").value =
    tamañoTipoEstampado.tamano;
  const tipoEstampadoSelect = document.getElementById("inputTipoEstampado");

  // Iterar sobre las opciones del select para seleccionar la opción correspondiente
  for (let i = 0; i < tipoEstampadoSelect.options.length; i++) {
    const option = tipoEstampadoSelect.options[i];

    // Verificar si el valor de la opción coincide con el tipo de tamaño de estampado
    if (option.value === tamañoTipoEstampado.tipo) {
      // Configurar la opción como seleccionada
      option.selected = true;
      break; // Salir del bucle una vez que se haya encontrado la opción
    }
  }

  document.getElementById("inputPrecioTamañoEstampado").value =
    tamañoTipoEstampado.precioTamano;
  document.getElementById("inputPrecioDolar").value =
    tamañoTipoEstampado.precioDolar;
  document.getElementById("inputTotal").value = tamañoTipoEstampado.total;

  // Cambiar el texto principal y hacer scroll al principio de la página
  document.getElementById("texto-principal").textContent =
    "Editar tamaño y tipo del estampado";
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

  // Activar la bandera de edición
  isEditing = true;
};