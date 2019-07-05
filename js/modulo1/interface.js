class Interface {

    constructor() {
        this.init();


    }

    init() {
        this.rellenarSelect();
        this.iniciar();
    }

    rellenarSelect() {
        url.apiCarreras()
            .then((res) => {
                const carreras = res.carrera.data;
                const select = document.querySelector('#filtro');
                carreras.forEach((carrera) => {
                    const option = document.createElement('option');
                    option.value = carrera.idcarrera;
                    option.appendChild(document.createTextNode(carrera.nombre));
                    select.appendChild(option);
                })


            });
    }

    // recuperarAreas() {
    //     url.apiAreas(this.obtenerFiltro())
    //         .then((res) => {
    //             console.log(res)
    //         });
    // }


    obtenerFiltro() {
        return document.querySelector('#filtro').value;
    }


    iniciarTabla(fl) {
        $('#tbEstudiantes').DataTable({
            destroy: true,
            "pageLength": 5,
            "processing": true,
            ajax: `http://localhost:3000/api/obtenerEstudiantes/${fl}`,
            columns: [{
                    data: 'idpersona',
                    visible: false
                },
                {
                    data: 'nombres'
                },
                {
                    data: 'apaterno'
                },
                {
                    data: 'amaterno'
                },
                {
                    data: 'registro'
                },
                {
                    data: 'carrera'
                },
                {
                    "mDataProp": function (data, type, full) {
                        return ' <button type="button" class="pdro btn btn-info" onClick="mostrarRuleta()">Sorteo</button>'
                    }
                }
            ]
        })
    }
    iniciarTablaSorteo(fl) {
        $('#tbSorteos').DataTable({
            destroy: true,
            "pageLength": 5,
            "processing": true,
            ajax: `http://localhost:3000/api/obtenerSorteos/${fl}/INTERNA`,
            columns: [{
                    data: 'idarea',
                    visible: false
                }, {
                    data: 'iddefensa',
                    visible: false
                },
                {
                    data: 'nombres'
                },
                {
                    data: 'apaterno'
                },
                {
                    data: 'amaterno'
                },
                {
                    data: 'registro'
                },
                {
                    data: 'carrera'
                },
                {
                    data: 'area'
                },
                {
                    data: 'caso'
                },
                {
                    data: 'enlace',
                    render: function (data, type, row, meta) {
                        if (type === 'display') {
                            data = '<a target="_blank" href="' + data + '">' + 'Ver Caso' + '</a>';
                        }
                        return data;
                    }
                },
                {
                    "mDataProp": function (data, type, full) {
                        console.log('datosSorteos', data.estado);
                        if (data.estado === 'A') {
                            return ' <button onClick="mostrarTribunalA()" class="pdro btn btn-info">Detalle</button>'
                        } else {
                            return ' <button onClick="mostrarTribunal()" class="pdro btn btn-info">Tribunal</button>'
                        }
                    }
                },
                {
                    "mDataProp": function (data, type, full) {
                        return ' <button onClick="mostrarImprimir()"  class="btn btn-info">Imprimir</button>'
                    }
                }
            ]
        })
    }


    iniciar() {
        //recupera datos del estudiante seleccionado
        $('#tbEstudiantes').on('click', '.odd', function () {
            let arr = $('#tbEstudiantes').dataTable().fnGetData($(this))
            // {idpersona: 5, nombres: "PEDRO", apaterno: "MENDOZA", amaterno: "CORONADO"
            let idper = arr.idpersona;
            let nombre = arr.nombres;
            let apallidoP = arr.apaterno;
            let apellidoM = arr.amaterno;
            // $('#nombreEst').val(`${nombre} ${apallidoP} ${apellidoM}`);
            console.log(arr)
        })

        $('#tbEstudiantes').on('click', '.even', function () {
            let arr = $('#tbEstudiantes').dataTable().fnGetData($(this))
            let idper = arr.idpersona;
            let nombre = arr.nombres;
            let apallidoP = arr.apaterno;
            let apellidoM = arr.amaterno;
            // $('#nombreEst').val(`${nombre} ${apellidoP} ${amaterno}`);
            console.log(arr)
        })

    }




}