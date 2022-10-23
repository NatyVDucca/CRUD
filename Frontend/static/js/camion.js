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

function getCamion() {
    const id = getIdFromUrl()
    const url = `http://localhost:3000/Camiones/${id}`

    fetch(url).then(res => { return res.json() }).then(object => {
        document.getElementById("matricula").value = object.matricula
        document.getElementById("modelo").value = object.modelo
        document.getElementById("potencia").value = object.tipo
        document.getElementById("tipo").value = object.potencia
       
        document.getElementById("form").className = ""
        document.getElementById('spinner').className = "d-none"

    })

}

function listarCamiones() {
    let url = 'http://localhost:3000/Camiones';
    fetch(url, {})
        .then(response => response.json())
        .then(data => {

            let Camiones = document.getElementById('Camiones')

            let html = ''
            data.map(Camiones => {
                html += `
                    <tr id="${Camiones.id}">
                        <td>${Camiones.id}</td>
                        <td>${Camiones.modelo}</td>
                        <td class="matricula">${Camiones.matricula}</td>
                        <td class="modelo">${Camiones.tipo}</td>
                        <td>${Camiones.potencia}</td>        
                        <td>
                            <a type="button" href="/Camiones/update/${Camiones.id}" class="btn btn-outline-light btn-sm"><i class="bi bi-pencil-square text-dark"></i></a>
                            <button type="button" class="btn btn-outline-light btn-sm" onclick="eliminarCamione('${Camiones.id}')"><i class="bi bi-trash3-fill text-danger"></i></button>
                        </td>
                    </tr>
                `
            })

            Camiones.innerHTML = html
            document.getElementById('spinner').style.display = 'none'
        });
}

function crearCamion() {
    // Deshabilitar botón
    disableButton(id = "guardar")

    // Preparar data
    const url = 'http://localhost:3000/Camiones/create'
    const matricula = document.getElementById("matricula")
    const modelo = document.getElementById("modelo")
    const tipo = document.getElementById("tipo")
    const potencia = document.getElementById("potencia")
    

    const data = {
        'matricula': matricula.value,
        'modelo': modelo.value,
        'potencia': potencia.value,
        'tipo': tipo.value,
        
    }

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
        location.href = "/Camiones"
    }).catch(error => {
        console.log(error);
        document.getElementById("error").innerText = "Ocurrió un error " + error
    })
}

function editarCamion() {
    // Deshabilitar botón
    disableButton(id = "guardar")

    // Preparar data
    const Camion_id = getIdFromUrl()
    const url = `http://localhost:3000/Camiones/update/${Camion_id}`
    const matricula = document.getElementById("matricula")
    const modelo = document.getElementById("modelo")
    const potencia = document.getElementById("potencia")
    const tipo = document.getElementById("tipo")
        

    const data = {
        'matricula': matricula.value,
        'modelo': modelo.value,
        'potencia': potencia.value,
        'tipo': tipo.value,
    }

    fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
        location.href = "/Camioness"
    }).catch(error => {
        console.log(error);
        document.getElementById("error").innerText = "Ocurrió un error " + error
    })
}

function eliminarCamion(id) {
    const item = document.getElementById(id)
    const matricula = item.querySelector('.matricula').innerText
    const modelo = item.querySelector('.modelo').innerText

    if (confirm(`¿Desea eliminar el Camion "${matricula} ${modelo}"?`)) {
        const url = `http://localhost:3000/Camiones/delete/${id}`

        fetch(url, {
            method: 'DELETE'
        }).then(response => response.json()).then(data => {
            location.href = "/Camioness"
        }).catch(error => {
            console.log(error);
            document.getElementById("error").innerText = "Ocurrió un error " + error
        })
    }
}