class Nota {

    constructor() {
        this.init();

    }

    init() {
        this.rellenarSelect();
        this.rellenarNota();
        this.rellenarSelectDef();
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


    rellenarSelectDef() {
        url.apiTipoDef()
            .then((res) => {
                const tipos = res.tipos.data;
                console.log(tipos)
                const select = document.querySelector('#tipo');
                tipos.forEach((tipo) => {
                    const option = document.createElement('option');
                    option.value = tipo.idtdef;
                    option.appendChild(document.createTextNode(tipo.nombre));
                    select.appendChild(option);
                    //idtdef": 1,
                    // "nombre": "Interna"
                })
            });
    }

    actualizarNota(calif, idDef) {
        let url = `http://localhost:3000/api/actualizarNota/${idDef}`;
        let data = {};
        data.nota = calif;
        fetch(url, {
                method: 'PUT', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    }

    rellenarNota() {
        const selNota = document.querySelector('#AR')
        const optionA = document.createElement('option');
        const optionR = document.createElement('option');
        optionA.value = 'A';
        optionR.value = 'R';
        optionA.appendChild(document.createTextNode('Aprobado'));
        optionR.appendChild(document.createTextNode('Reprobado'));
        selNota.appendChild(optionA);
        selNota.appendChild(optionR);
    }

    iniciarTablaNotas(fl, tp) {
        $('#tbNotas').DataTable({
            destroy: true,
            "pageLength": 10,
            "processing": true,
            ajax: `http://localhost:3000/api/obtenerNotas/${fl}/${tp}`,
            columns: [{
                    data: 'iddefensa',
                    visible: false
                },
                {
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
                    data: 'area'
                },
                {
                    data: 'caso'
                },
                {
                    data: 'nota',
                    render: function (data, type, row, meta) {
                        if (data === 'A') {
                            data = `<input class="btn A" type="button" disabled value="${data}"> <button onClick="mostrarNotas()" class="cal btn">Calificar</button>`;
                        }
                        if (data === 'R') {
                            data = `<input class="btn R" type="button" disabled value="${data}"> <button onClick="mostrarNotas()" class="cal btn">Calificar</button>`;
                        }
                        if (data === 'S') {
                            data = `<input class="btn S" type="button" disabled value="${data}"> <button onClick="mostrarNotas()" class="cal btn">Calificar</button>`;
                        }
                        return data;
                    }
                }
            ]
        })


    }

}