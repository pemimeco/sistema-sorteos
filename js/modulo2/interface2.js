class Interface2 {

    constructor() {
        this.llenarHora();
        this.llenarLab();
        // this.init();
    }

    // init() {

    //     this.iniciar();
    //     this.iniciar2();
    // }

    obtnerArea(area, hora, fecha) {
        const select = document.querySelector('#tribunales');
        select.innerHTML = '';
        let option = `<option value='0'>Seleccione un tribunal</option>`;
        url2.apiTribunales(area, hora, fecha)
            .then((res) => {
                const tribunales = res.tribunales.data;
                tribunales.forEach((tribunal) => {
                    option += `<option value='${tribunal.idtipo}'>${tribunal.nombre}</option>`;

                })
                console.log(option);
                select.innerHTML = option;
            })

    }
    llernarSelect(val, text) {
        const select = document.querySelector('#tribunales');
        select.innerHTML += `<option value='${val}'>${text}</option>`;
    }

    guardar(defensa, tipo) {

        console.log('iddefensa:', defensa, 'tipo:', tipo)
    }

    limpiar() {
        const lista = document.querySelector('#lis');
        const date = document.querySelector('#def');
        const hora = document.querySelector('#hora');
        const lab = document.querySelector('#labs');
        const tribunal = document.querySelector('#tribunales');
        lista.innerHTML = '';
        date.value = '';
        hora.value = 0;
        lab.value = 0;
        tribunal.options.length = 0;
        // tribunal.value = 0; 
    }

    insertarDef(def, tipo, fecha, hora, lab) {
        let url = `http://localhost:3000/api/InsertarDef`;
        let data = {};
        data.iddefensa = def;
        data.idtipo = tipo;
        data.fecha = fecha;
        data.idhora = hora;
        data.idlab = lab;
        fetch(url, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));


    }

    actualizar(fecha, hora, lab, idDef) {
        let url = `http://localhost:3000/api/AcutalizarDef/${idDef}`;
        let data = {};
        data.fecha = fecha;
        data.idhora = hora;
        data.idlab = lab;
        fetch(url, {
                method: 'PUT', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .catch(error => alert('eroor: ' + error))
            .then(response => alert('insertado Correctamente'));
    }

    llenarHora() {
        const selHora = document.querySelector('#hora');
        selHora.innerHTML = '';
        let option = `<option value='0'>Seleccione una Hora</option>`;
        url2.apiTurnos()
            .then((res) => {
                const turno = res.turnos.data;
                turno.forEach((x) => {
                    option += `<option value='${x.idhora}'>${x.hora}</option>`;
                })
                selHora.innerHTML = option;
            }).catch((err) => console.log(err));

    }

    llenarLab() {
        const selLab = document.querySelector('#labs');
        selLab.innerHTML = '';
        let option = `<option value='0'>Seleccione un lab</option>`;
        url2.apiLabs()
            .then((res) => {
                const labs = res.labs.data;
                labs.forEach((x) => {
                    option += `<option value='${x.idlab}'>${x.lab}</option>`;
                })
                selLab.innerHTML = option;
            }).catch((err) => console.log(err));
    }

    llenarDef(iddef, nombres, Apellidos, carrea, area) {
        const lis = document.querySelector('#lisD');
        lis.innerHTML = '';
        let listado = '';
        let fecha = '';
        let aula = '';
        let hora = '';
        listado += `Nombre:<li class="listaTribunal">${nombres}</li>
        Apellidos:<li class="listaTribunal">${Apellidos}</li>
        Carrera:<li class="listaTribunal">${carrea}</li>
        Arrea:<li class="listaTribunal">${area}</li>`;
        console.log(listado);
        url2.detalleDef(iddef)
            .then(res => {
                let detalle = res.def.data;
                console.log('encontrado:', detalle);
                detalle.forEach(x => {
                    fecha = x.fecha.substring(0, 10);
                    aula = x.lab;
                    hora = x.hora;
                    listado += ` Tribunal:<li class="listaTribunal">${x.nombre}</li>`;
                });
                listado += `Fecha:<li class="listaTribunal">${fecha}</li>
                      Hora:<li class="listaTribunal">${hora}</li>
                      Aula:<li class="listaTribunal">${aula}</li> `
                lis.innerHTML = listado;
            })
            .catch(err => {
                console.log('no se pudo obtener las defensas:', err);
            });

    }
}