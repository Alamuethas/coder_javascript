let sintomas = document.querySelectorAll("input")
const bntenviar = document.getElementById("ingreso")
const listaLi = document.getElementById("lista")
var Datos = [];
let QR_CODIGO = document.getElementById("boton_qr")


QR_CODIGO.addEventListener("click", () => generaciondeQR());
function generaciondeQR() {
    let QR_BODY = document.getElementById("qr");
    fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${sintomasSeleccionados}`
    )
        .then((res) => {
            QR_BODY.innerHTML = `<img src= "${res.url}">`;
        })
        .catch(() => {
            QR_BODY.innerHTML = `no se pudo leer este codigo`;
        });
}


const crearhtml = () => {
    limpiarHtml()
    if (Datos.length > 0) {
        Datos.forEach(paciente => {
            const li = document.createElement("li");
            li.textContent =
                `nombre ${JSON.stringify(paciente.nombre)} , apellido${JSON.stringify(paciente.apellido)}`
            listaLi.appendChild(li)
        })
    }
}

const limpiarHtml = (() => {
    listaLi.innerHTML = ""
})

const borrar = (id) => {
    Datos = Datos.filter(paciente => paciente.id !== id)
    crearhtml()
}


document.addEventListener("ingreso", () => {
    Datos = JSON.parse(localStorage.getItem("Lista"))
})


/* constructor objeto paciente */
function ingreso() {
    function Persona(pacienteNombre, pacienteEdad, pacienteEdad, enfermo) {
        this.nombre = pacienteNombre;
        this.apellido = pacienteApellido;
        this.edad = pacienteEdad;
        this.enfermo = enfermo;
        this.sintomatologia = sintomasconsola
    }
    let pacienteNombre = document.getElementById("nombre").value
    let pacienteApellido = document.getElementById("apellido").value;
    let pacienteEdad = document.getElementById("edad").value;
    let enfermo = crearListaSeleccionados().length > 0
    let sintomasconsola = sintomasSeleccionados
    paciente = new Persona(pacienteNombre, pacienteApellido, pacienteEdad, enfermo, sintomasconsola);
    console.log(paciente)
    handleClick();
    Datos.push(paciente);
    localStorage.setItem('Lista', JSON.stringify(Datos))
    console.log(Datos);
    crearhtml();
}

/* encuentra al 1er paciente enfermo */
const traerEnfermo = () => {
    let primerEnfermo = Datos.find(paciente => paciente.enfermo)
    console.log(primerEnfermo)
}
const traerMismoApellido = () => {
    // Le pedis la usuario que apellido quiere buscar
    let apellido = prompt()
    // Filtrar el array con aquellos pacientes que tengan el mismo apellido ingresado
    let mismoApellido = Datos.filter(pacienteDeLaLista => pacienteDeLaLista.apellido === apellido);
    console.log(mismoApellido)
}

function handleClick() {
    let sintomasSeleccionados = crearListaSeleccionados()
    verificarLista(sintomasSeleccionados)
}

function crearListaSeleccionados() {
    sintomasSeleccionados = []
    for (sintoma of sintomas) {
        if (sintoma.checked) {
            sintomasSeleccionados.push(sintoma.name)
        }
    }
    return sintomasSeleccionados
}


function verificarLista(lista) {
    let largo = lista.length;

    if (largo == 6) {
        Swal.fire(
            'realizo un ingreso urgente',
            'se han seleccionado todos los sintomas',
            'warning'
        )
        limpiarInputs();
    } else if (largo == 0) {
        Swal.fire(
            'no podemos realizar el ingreso',
            'no selecciono ningun sintoma, se coloca en baja prioridad.',
            'info'
        )
    } else {
        Swal.fire(
            `seleccionaste los siguientes sintomas: ${lista}.`,
            'enviando un medico a tu domicilio',
            'info'
        )
        limpiarInputs();
    }
}

function limpiarInputs() {
    for (sintoma of sintomas) {
        if (sintoma.checked) {
            sintoma.checked = false
        }
    }
} 
