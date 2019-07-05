// instancia de las clases
const url2 = new Url2();
const io2 = new Interface2();

// varibles global
const lista = document.querySelector('#lis');
let codigo, defensa, area, nombres, apellidos, carrera, areaN;
let tribunales = [];



const $modalImpresion = document.getElementById('modal-impresion')
const $overlayd = document.getElementById('overlayd')
const $btnImprimir = document.getElementsByClassName('reporte')
const $cerrarImprimir = document.getElementById('cerrar-impre')

document.querySelector('#añadir').addEventListener('click', () => {
    let x = document.getElementById("tribunales");
    let val = x.value;
    tribunales.push(val);
    console.log(tribunales);
    let text = x.options[x.selectedIndex].innerText;
    lista.innerHTML += `<li class="listaTribunal" id="text">${text}        
                         <a class="borrar-tribunal">X</a>
                        <p id="val" style="display:none">${val}</p></li>
                       `
    console.log('valor:', val, 'text', text);
    x.remove(x.selectedIndex);
})

lista.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.className === 'borrar-tribunal') {
        let val = e.target.parentElement.querySelector('#val').textContent;
        let text = e.target.parentElement.textContent.split(' ')[0];
        console.log('valor:', val, 'text', text);
        let indice = tribunales.indexOf(val);
        tribunales.splice(indice, 1);
        io2.llernarSelect(val, text);
        e.target.parentElement.remove();
    }
});



$cerrarImprimir.addEventListener('click', () => {
    $modalImpresion.classList.remove('active')
    $overlayd.classList.remove('active')

})

function mostrarImprimir() {
    $modalImpresion.classList.add('active')
    $overlayd.classList.add('active')
}


$('#tbSorteos').on('click', '.odd', function () {
    let arr = $('#tbSorteos').dataTable().fnGetData($(this));
    codigo = arr.registro;
    defensa = arr.iddefensa;
    area = arr.idarea;
    nombres = arr.nombres;
    apellidos = `${arr.apaterno} ${arr.amaterno}`;
    carrera = arr.carrera;
    areaN = arr.area
    console.log(defensa);
    // io2.obtnerArea(arr.idarea);
    llenarDatos(codigo);
    defDetalle();
})


$('#tbSorteos').on('click', '.even', function () {
    let arr = $('#tbSorteos').dataTable().fnGetData($(this));
    codigo = arr.registro;
    defensa = arr.iddefensa;
    area = arr.idarea;
    nombres = arr.nombres;
    apellidos = `${arr.apaterno} ${arr.amaterno}`;
    carrera = arr.carrera;
    areaN = arr.area
    console.log(defensa);
    // io2.obtnerArea(arr.idarea);
    llenarDatos(codigo);
    defDetalle();

})


let llenarDatos = (codigoEst) => {
    // location.href = 'usuarios.html'
    fetch(`http://localhost:3000/api/obtenerDetalles/${codigoEst}/INTERNA`)
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            const datos = [myJson.data];
            console.log(datos)
            $('#example').dataTable({
                lengthChange: false,
                searching: false,
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
//funcion para controlar que si aiga seleccionado una hora y una fecha
const control = () => {
    const date = document.querySelector('#def').value;
    const hora = Number(document.querySelector('#hora').value);

    if ((hora !== 0 || hora === '') && date !== '') {
        console.log('fecha:', date, 'hora:', hora);
        io2.obtnerArea(area, hora, date);
    }
}
document.querySelector('#hora').addEventListener('change', () => {
    control();
});

document.querySelector('#def').addEventListener('change', () => {
    control();
});

document.querySelector('#btnx').addEventListener('click', () => {
    io2.limpiar();
    tribunales.splice(0, tribunales.length);
});

document.querySelector('#actualizar').addEventListener('click', () => {
    const fecha = document.querySelector('#def').value;
    const hora = document.querySelector('#hora').value;
    const lab = document.querySelector('#labs').value;
    // io2.actualizar(fecha,hora,lab,defensa);
    tribunales.forEach((x) => {
        io2.insertarDef(defensa, x, fecha, hora, lab);
    });
    io2.limpiar();
});

// funcion para mostrar el detalleDef
const defDetalle = () => {
    io2.llenarDef(defensa, nombres, apellidos, carrera, areaN);
}

// amaterno: "MAMANI"
// apaterno: "MAGNE"
// area: "Ingenieria de Software"
// carrera: "Sistemas"
// caso: "CASO 48"
// enlace: "https://www.dropbox.com/s/drfx4srbjvh0tso/CASO%20DE%20ESTUDIO%209.docx?dl=0"
// idarea: 2
// iddefensa: 28
// nombres: "FERNANDO"