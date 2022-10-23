// Auxiliares

const Camionero = require("../../../Backend/databasee/models/Camionero")

function disableButton(id) {
    const button = document.getElementById(id)
    button.className = button.className + " disabled"
    button.setAttribute('disabled', 'disabled')
    button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'
}

function getIdFromUrl() {
    const route = new URL(window.location).pathname
    const pathArray = route.split('/')
    return pathArray[pathArray.length - 1]
}

// CRUD

function getPaquete() {
    const id = getIdFromUrl()
    const url = `http://localhost:3000/Paquetes/${id}`

    fetch(url).then(res => { return res.json() }).then(object => {
        document.getElementById("descripcion").value = object.descripcion
        document.getElementById("codigo").value = object.codigo
        loadSelect(destinatario = object.destinatarioId)

        document.getElementById("form").className = ""
        document.getElementById('spinner').className = "d-none"

    })

}

function listarPaquetes() {
    let url = 'http://localhost:3000/Paquetes';
    fetch(url, {})
        .then(response => response.json())
        .then(data => {
            let Paquetes = document.getElementById('Paquetes')
            let html = ''
            let destinatario = ''

            data.map(paquete => {
                if (Paquetes.destinatario !== null && Paquetes.destinatario !== undefined && Paquetes.destinatario !== {}) {
                    destinatario = `${Paquetes.destinatario.descripcion} (${Paquetes.destinatario.id})`
                } else {
                    destinatario = ''
                }

                html += `
                    <tr id="${paquete.id}">
                        <td>${paquete.id}</td>
                        <td class="descripcion">${paquete.descripcion}</td>
                        <td>$${paquete.codigo}</td>
                        <td>${Camionero}</td>
                        <td>
                            <a type="button" href="/paquetes/update/${paquete.id}" class="btn btn-outline-light btn-sm"><i class="bi bi-pencil-square text-dark"></i></a>
                            <button type="button" class="btn btn-outline-light btn-sm" onclick="eliminarPaquete('${paquete.id}')"><i class="bi bi-trash3-fill text-danger"></i></
                        </td>
                    </tr>
                `
            })

            Paquetes.innerHTML = html
            document.getElementById('spinner').style.display = 'none'
        });
}

function crearPaquete() {
    // Deshabilitar botón
    disableButton(id = "guardar")

    // Preparar data
    const url = 'http://localhost:3000/Paquetes/create'
    const destinatario = document.getElementById("destinatario")
    const descripcion = document.getElementById("descripcion")
    const codigo = document.getElementById("codigo")

    const data = {
        'codigo': codigo.value,
        'descripcion': descripcion.value,
        'destinatario': destinatario.value
    }

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
        location.href = "/paquetes"
    }).catch(error => {
        console.log(error);
        document.getElementById("error").innerText = "Ocurrió un error " + error
    })
}

function editarPaquete() {
    // Deshabilitar botón
    disableButton(id = "guardar")

    // Preparar data
    const Paquete_id = getIdFromUrl()
    const url = `http://localhost:3000/Paquetes/update/${Paquete_id}`
    const destinatario = document.getElementById("destinatario")
    const descripcion = document.getElementById("descripcion")
    const codigo = document.getElementById("codigo")

    const data = {
        'codigo': codigo.value,
        'descripcion': descripcion.value,
        'destinatario': destinatario.value
    }

    fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
        location.href = "/paquetes"
    }).catch(error => {
        console.log(error);
        document.getElementById("error").innerText = "Ocurrió un error " + error
    })
}

function eliminarPaquete(id) {
    const item = document.getElementById(id)
    const descripcion = item.querySelector('.descripcion').innerText

    if (confirm(`¿Desea eliminar el Paquete "${descripcion}"?`)) {
        const url = `http://localhost:3000/Paquetes/delete/${id}`

        fetch(url, {
            method: 'DELETE'
        }).then(response => response.json()).then(data => {
            location.href = "/paquetes"
        }).catch(error => {
            console.log(error);
            document.getElementById("error").innerText = "Ocurrió un error " + error
        })
    }
}























