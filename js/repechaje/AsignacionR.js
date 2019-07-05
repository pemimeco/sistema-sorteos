$(document).ready(() => {
    $('#asignarCaso').click(() => {
        obtnerDatos(insert)
    })

    let obtnerDatos = (callback) => {
        let instancia = new Date()
        let fecha = (instancia.getMonth() + 1) + "/" + instancia.getDate() + "/" + instancia.getFullYear()
        let hora = instancia.getHours() + ':' + instancia.getMinutes()

        let idpersona = parseInt($('#idpersona').text())
        let idcaso = parseInt($('#idcaso').text())

        let Djson = {}
            // idcuenta,idcaso,idpersona,fecha,hora

        Djson.idcuenta = 2
        Djson.idcaso = idcaso
        Djson.idpersona = idpersona
        Djson.fecha = fecha
        Djson.hora = hora
        Djson.estado = 'REPECHAJE'

        let json = JSON.stringify(Djson)
        callback(json)


    }

    let insert = (json) => {
        // alert(json)
        $.ajax({
            url: `http://localhost:3000/api/InsertarSorteo`,
            contentType: 'application/json',
            method: 'POST',
            data: json,
            success: (res) => {
                alert('insertado correctamente')
            }
        }).fail(() => {
            alert('fallo al insertar')
        })
    }
})