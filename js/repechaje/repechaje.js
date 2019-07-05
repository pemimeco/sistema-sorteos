class Repechaje {
    constructor() {
        this.init();

    }

    init() {
        this.rellenarSelect();

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



    iniciarTablaRep(fl) {
        $('#tbRepechaje').DataTable({
            destroy: true,
            "pageLength": 5,
            "processing": true,
            ajax: `http://localhost:3000/api/obtenerReprobados/${fl}`,
            columns: [{
                    data: 'idcaso',
                    visible: false
                }, {
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
                    data: 'caso'
                },
                {
                    "mDataProp": function (data, type, full) {
                        return '  <button type="button" class="pdro btn btn-info" onClick="mostrarRuleta()">Sorteo</button>'
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
            ajax: `http://localhost:3000/api/obtenerSorteos/${fl}/REPECHAJE`,
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
                        // console.log('datosSorteos', data.estado);
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


    llenarDatos = (codigoEst) => {
        // location.href = 'usuarios.html'
        fetch(`http://localhost:3000/api/obtenerDetalles/${codigoEst}/REPECHAJE`)
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                const datos = [myJson.data];
                console.log(datos)
                $('#example').dataTable({
                    destroy: true,
                    data: datos,
                    columns: [{
                            data: 'nombres'
                        },
                        {
                            data: 'apaterno'
                        },
                        {
                            data: 'carrera'
                        },
                        {
                            data: 'caso'
                        },
                        {
                            data: 'enlace'
                        },
                        {
                            data: 'area'
                        }
                    ]
                })

            });

        setTimeout(() => {
            let table = $('#example').DataTable({
                destroy: true,
                searching: false,
                lengthChange: false,
                buttons: ['copy', 'excel', 'csv', 'pdf']
            });

            table.buttons().container()
                .appendTo('#example_wrapper .col-md-6:eq(0)');
        }, 1000);
    }
}