
const bntenviar = document.getElementById("ingreso")
const listaLi = document.getElementById("lista")
var Datos = [];
let QR_CODIGO = document.getElementById("boton_qr")






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
    function Persona(pacienteNombre, pacienteEdad, pacienteEdad, sintomasconsola) {
        this.nombre = pacienteNombre;
        this.apellido = pacienteApellido;
        this.edad = pacienteEdad;
        this.sintomatologia = sintomasconsola
    }
    let pacienteNombre = document.getElementById("nombre").value
    let pacienteApellido = document.getElementById("apellido").value;
    let pacienteEdad = document.getElementById("edad").value;
    let sintomasconsola = document.getElementById("sintomatologia").value
    paciente = new Persona(pacienteNombre, pacienteApellido, pacienteEdad, sintomasconsola);

    /* CREA LA LISTA DE PACIENTES. */
    const crearhtml = () => {
        limpiarHtml()
        if (Datos.length > 0) {
            Datos.forEach(paciente => {
                const li = document.createElement("li");
                li.textContent =
                    `nombre ${JSON.stringify(paciente.nombre)} , apellido${JSON.stringify(paciente.apellido)} , sintomas :${JSON.stringify(paciente.sintomatologia)}`
                listaLi.appendChild(li)
            })
        }
    }

    console.log(paciente)
    Datos.push(paciente);
    localStorage.setItem('Lista', JSON.stringify(Datos))
    console.log(Datos);
    crearhtml();
    Swal.fire(
        `se ha realizado el ingreso`,
        '',
        'info'
    )
    /* CREA EL QR LEYENDO LO PUESTO EN EL TEXTAREA */

    QR_CODIGO.addEventListener("click", () => generaciondeQR());
    function generaciondeQR() {
        let QR_BODY = document.getElementById("qr");
        QR_BODY.innerHTML = `<div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span></div>`
    
        fetch(
            `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${sintomasconsola}`
        )
            .then((res) => {
                QR_BODY.innerHTML = `<img src= "${res.url}">`;
            })
            .catch(() => {
                QR_BODY.innerHTML = `no se pudo leer este codigo`;
            });
    }
}

/* encuentra al 1er paciente */
/* const traerEnfermo = () => {
    let primerEnfermo = Datos.find(paciente => paciente.length > 0)
    console.log(primerEnfermo)
} */
const traerMismoApellido = () => {
    // Le pedis la usuario que apellido quiere buscar
    let apellido = prompt()
    // Filtrar el array con aquellos pacientes que tengan el mismo apellido ingresado
    let mismoApellido = Datos.filter(pacienteDeLaLista => pacienteDeLaLista.apellido === apellido);
    console.log(mismoApellido)
}

