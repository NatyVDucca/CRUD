
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

function getCamionero() {
    const id = getIdFromUrl()
    const url = `http://localhost:3000/camioneros/${id}`

    fetch(url).then(res => { return res.json() }).then(object => {
        document.getElementById("nombre").value = object.nombre
        document.getElementById("telefono").value = object.telefono
        document.getElementById("direccion").value = object.direccion
        document.getElementById("salario").value = object.salario
        document.getElementById("region").value = object.region

        document.getElementById("form").className = ""
        document.getElementById('spinner').className = "d-none"

    })

}

function listarCamioneros() {
    let url = 'http://localhost:3000/camioneros';
    fetch(url, {})
        .then(response => response.json())
        .then(data => {

            let camioneros = document.getElementById('camioneros')

            let html = ''
            data.map(camioneros => {
                html += `
                    <tr id="${camioneros.id}">
                        <td>${camioneros.id}</td>
                        <td>${camioneros.telefono}</td>
                        <td class="nombre">${camioneros.nombre}</td>
                        <td class="telefono">${camioneros.telefono}</td>
                        <td>${camioneros.direccion}</td>
                        <td>${camioneros.salario}</td>
                        <td>${camioneros.region}</td>                        
                        <td>
                            <a type="button" href="/camioneros/update/${camioneros.id}" class="btn btn-outline-light btn-sm"><i class="bi bi-pencil-square text-dark"></i></a>
                            <button type="button" class="btn btn-outline-light btn-sm" onclick="eliminarcamionero('${camioneros.id}')"><i class="bi bi-trash3-fill text-danger"></i></button>
                        </td>
                    </tr>
                `
            })

            camioneros.innerHTML = html
            document.getElementById('spinner').style.display = 'none'
        });
}

function crearCamionero() {
    // Deshabilitar botón
    disableButton(id = "guardar")

    // Preparar data
    const url = 'http://localhost:3000/camioneros/create'
    const nombre = document.getElementById("nombre")
    const telefono = document.getElementById("telefono")
    const salario = document.getElementById("salario")
    const direccion = document.getElementById("direccion")
    const region = document.getElementById("region")

    const data = {
        'nombre': nombre.value,
        'telefono': telefono.value,
        'direccion': direccion.value,
        'salario': salario.value,
        'region': region.value
    }

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
        location.href = "/camioneros"
    }).catch(error => {
        console.log(error);
        document.getElementById("error").innerText = "Ocurrió un error " + error
    })
}

function editarCamionero() {
    // Deshabilitar botón
    disableButton(id = "guardar")

    // Preparar data
    const camionero_id = getIdFromUrl()
    const url = `http://localhost:3000/camioneros/update/${camionero_id}`
    const nombre = document.getElementById("nombre")
    const telefono = document.getElementById("telefono")
    const direccion = document.getElementById("direccion")
    const salario = document.getElementById("salario")
    const region = document.getElementById("region")
    

    const data = {
        'nombre': nombre.value,
        'telefono': telefono.value,
        'direccion': direccion.value,
        'salario': salario.value,
        'region': region.value
    }

    fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
        location.href = "/camioneross"
    }).catch(error => {
        console.log(error);
        document.getElementById("error").innerText = "Ocurrió un error " + error
    })
}

function eliminarCamionero(id) {
    const item = document.getElementById(id)
    const nombre = item.querySelector('.nombre').innerText
    const telefono = item.querySelector('.telefono').innerText

    if (confirm(`¿Desea eliminar el Camionero "${nombre} ${apellido}"?`)) {
        const url = `http://localhost:3000/camioneros/delete/${id}`

        fetch(url, {
            method: 'DELETE'
        }).then(response => response.json()).then(data => {
            location.href = "/camioneross"
        }).catch(error => {
            console.log(error);
            document.getElementById("error").innerText = "Ocurrió un error " + error
        })
    }
}