
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
    Datos = JSON.parse(localStorage.getItem("Lista"));
})


/* constructor objeto paciente */
async function ingreso() {
    function Persona(pacienteNombre, pacienteEdad, pacienteEdad, sintomasconsola, qr) {
        this.nombre = pacienteNombre;
        this.apellido = pacienteApellido;
        this.edad = pacienteEdad;
        this.sintomatologia = sintomasconsola
        this.qr = qr
    }

    let pacienteNombre = document.getElementById("nombre").value
    let pacienteApellido = document.getElementById("apellido").value;
    let pacienteEdad = document.getElementById("edad").value;
    let sintomasconsola = document.getElementById("sintomatologia").value

    let response = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${sintomasconsola}`
    )

    paciente = new Persona(pacienteNombre, pacienteApellido, pacienteEdad, sintomasconsola, response.url);
    console.log(paciente)
    Datos.push(paciente);
    localStorage.setItem('Lista', JSON.stringify(Datos))
    console.log(Datos);

    Swal.fire(
        `se ha realizado el ingreso`,
        '',
        'info'
    )
}


const traerMismoApellido = () => {
    // Le pedis la usuario que apellido quiere buscar
    let apellido = prompt()
    // Filtrar el array con aquellos pacientes que tengan el mismo apellido ingresado
    let mismoApellido = Datos.filter(pacienteDeLaLista => pacienteDeLaLista.apellido === apellido);
    console.log(mismoApellido)
}

const handleClickBtn = (qr) => {
    QR_BODY = document.getElementById("qr");
    QR_BODY.innerHTML = `<img src="${qr}" alt="" srcset="">`
}

/* CREA LA LISTA DE PACIENTES. */
const crearHtml = () => {
    Datos = JSON.parse(localStorage.getItem("Lista"));
    limpiarHtml();
    if (Datos.length > 0) {
        Datos.forEach(paciente => {
            const btn = document.createElement("div")
            btn.innerHTML = '<a href="" id="boton_qr" data-bs-toggle="modal" data-bs-target="#idmodalqr" class="btn btn-secondary">Ver tu QR</a>'
            btn.addEventListener('click', () => {
                handleClickBtn(paciente.qr)
            }, false);
            const li = document.createElement("li");
            li.textContent =
                `nombre ${JSON.stringify(paciente.nombre)} , apellido ${JSON.stringify(paciente.apellido)}`
            listaLi.appendChild(li);
            listaLi.appendChild(btn);
        })
    }
}