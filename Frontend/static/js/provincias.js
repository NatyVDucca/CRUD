
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

function getProvincia() {
    const id = getIdFromUrl()
    const url = `http://localhost:3000/Provincias/${id}`

    fetch(url).then(res => { return res.json() }).then(object => {
        document.getElementById("nombre").value = object.nombre
        document.getElementById("codigo").value = object.codigo
        loadSelect(provincia = object.provinciaId)

        document.getElementById("form").className = ""
        document.getElementById('spinner').className = "d-none"

    })

}

function listarProvincias() {
    let url = 'http://localhost:3000/Provincias';
    fetch(url, {})
        .then(response => response.json())
        .then(data => {
            let Provincias = document.getElementById('Provincias')
            let html = ''
            let provincia = ''

            data.map(Provincia => {
                if (Provincias.provincia !== null && Provincias.provincia !== undefined && Provincias.provincia !== {}) {
                    provincia = `${Provincias.provincia.nombre} (${Provincias.provincia.id})`
                } else {
                    provincia = ''
                }

                html += `
                    <tr id="${Provincia.id}">
                        <td>${Provincia.id}</td>
                        <td class="nombre">${Provincia.nombre}</td>
                        <td>$${Provincia.codigo}</td>
                        <td>${Camionero}</td>
                        <td>
                            <a type="button" href="/Provincias/update/${Provincia.id}" class="btn btn-outline-light btn-sm"><i class="bi bi-pencil-squar
                            <button type="button" class="btn btn-outline-light btn-sm" onclick="eliminarProvincia('${Provincia.id}')"><i class="bi bi-tr
                        </td>
                    </tr>
                `
            })

            Provincias.innerHTML = html
            document.getElementById('spinner').style.display = 'none'
        });
}

function crearProvincia() {
    // Deshabilitar botón
    disableButton(id = "guardar")

    // Preparar data
    const url = 'http://localhost:3000/Provincias/create'
    const provincia = document.getElementById("provincia")
    const nombre = document.getElementById("nombre")
    const codigo = document.getElementById("codigo")

    const data = {
        'codigo': codigo.value,
        'nombre': nombre.value,
        'provincia': provincia.value
    }

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
        location.href = "/Provincias"
    }).catch(error => {
        console.log(error);
        document.getElementById("error").innerText = "Ocurrió un error " + error
    })
}

function editarProvincia() {
    // Deshabilitar botón
    disableButton(id = "guardar")

    // Preparar data
    const Provincia_id = getIdFromUrl()
    const url = `http://localhost:3000/Provincias/update/${Provincia_id}`
    const provincia = document.getElementById("provincia")
    const nombre = document.getElementById("nombre")
    const codigo = document.getElementById("codigo")

    const data = {
        'codigo': codigo.value,
        'nombre': nombre.value,
        'provincia': provincia.value
    }

    fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
        location.href = "/Provincias"
    }).catch(error => {
        console.log(error);
        document.getElementById("error").innerText = "Ocurrió un error " + error
    })
}

function eliminarProvincia(id) {
    const item = document.getElementById(id)
    const nombre = item.querySelector('.nombre').innerText

    if (confirm(`¿Desea eliminar el Provincia "${nombre}"?`)) {
        const url = `http://localhost:3000/Provincias/delete/${id}`

        fetch(url, {
            method: 'DELETE'
        }).then(response => response.json()).then(data => {
            location.href = "/Provincias"
        }).catch(error => {
            console.log(error);
            document.getElementById("error").innerText = "Ocurrió un error " + error
        })
    }
}










