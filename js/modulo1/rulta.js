$caso = document.getElementById('caso');
// const $asignarCaso = document.getElementById('asignarCaso')

let casoSorteado;
let idper;
let nombre;
let apellidoP;
let apellidoM;

const apiUrl = new Url();

let limite = {};
limite.Array = new Array();

let area1, area2, area3;

document.addEventListener("DOMContentLoaded", function (event) {

    miRuleta.startAnimation();
    // apiUrl.apiTotalCasos()
    //     .then((res) => {
    //         totalC = res.totalCasos.data[0].totalcasos
    //         // console.log(totalC)
    //         document.querySelector('#totalCI').innerHTML = totalC
    //     })

});

let datos = {};
datos.Array = new Array();

let json = (filtro) => {
    datos.Array.splice(0, datos.Array.length)
    $.ajax({
        url: `http://localhost:3000/api/obtenerCasos/${filtro}`,
        contentType: 'application/json',
        success: function (res) {
            res.data.map(
                (x) => (

                    datos.Array.push({
                        "idcaso": x.idcaso,
                        "nombre": x.casonombre,
                        "enlaces": x.enlace,
                        "area": x.area,
                        "carrera": x.carrera
                    }),
                    console.log(datos.Array)
                )
            );
        }
    }).fail(() => {
        //alert('Error!!!!');
    });
};

document.querySelector('#filtro').addEventListener('change', () => {
    const fil = document.querySelector('#filtro').value;
    datos.Array.splice(0, datos.Array.length)
    console.log(datos.Array);
    json(fil);

});


$('#detener').on('click', () => {
    casoSorteado = miRuleta.getIndicatedSegment();
    $caso.textContent = casoSorteado.text;
    $caso.classList.add('paused');
    $caso.style.animation = 'title .3s forwards';

})
$('#equis').on('click', () => {

    const fil = document.querySelector('#filtro').value;
    datos.Array.splice(0, datos.Array.length)
    json(fil);


    $caso.style.animation = '';
    $caso.classList.remove('paused');
    document.getElementById('nombreEst').value = ''
    document.getElementById('enlaceText').value = ''
    document.getElementById('nombreArea').value = ''
})

function mostrarRuleta() {
    $('#miModal').modal({
        backdrop: 'static',
        keyboard: false
    })
    $('#miModal').modal('show');
    miRuleta.resumeAnimation();
    if (limite.Array.length > 0) {
        deleteSegment()
        miRuleta.numSegments = 0
        addSegment(limite.Array)
    } else {
        deleteSegment()
        miRuleta.numSegments = 0
        addSegment(datos.Array)
    }
}

$('#tbEstudiantes').on('click', '.odd', function () {
    let arr = $('#tbEstudiantes').dataTable().fnGetData($(this))
    // {idpersona: 5, nombres: "PEDRO", apaterno: "MENDOZA", amaterno: "CORONADO"
    idper = arr.idpersona;
    nombre = arr.nombres;
    apellidoP = arr.apaterno;
    apellidoM = arr.amaterno;
    // $('#nombreEst').val(`${nombre} ${apallidoP} ${apellidoM}`);
    console.log(arr)
})

$('#tbEstudiantes').on('click', '.even', function () {
    let arr = $('#tbEstudiantes').dataTable().fnGetData($(this))
    idper = arr.idpersona;
    nombre = arr.nombres;
    apellidoP = arr.apaterno;
    apellidoM = arr.amaterno;
    // $('#nombreEst').val(`${nombre} ${apellidoP} ${amaterno}`);
    console.log(arr)
})

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function addSegment(data) {
    // The Second parameter in the call to addSegment specifies the position,
    // in this case 1 meaning the new segment goes at the start of the wheel.
    data.forEach((x) => {
        miRuleta.addSegment({
                // id: x.idcarrera,
                text: x.nombre,
                fillStyle: getRandomColor()
            },
            1
        );
    });
    // The draw method of the wheel object must be called in order for the changes
    // to be rendered.
    miRuleta.draw();
}

function deleteSegment() {
    // Call function to remove a segment from the wheel, by default the last one will be
    // removed; you can pass in the number of the segment to delete if desired.
    for (let index = 0; index < datos.Array.length; index++) {
        miRuleta.deleteSegment(index);
    }
    // The draw method of the wheel object must be called to render the changes.
    miRuleta.draw();
}

//---------------------------------------------
//propiedades de la ruleta
let miRuleta = new Winwheel({
    'numSegments': 0, // Número de segmentos
    'outerRadius': 150, // Radio externo
    'centerX': 280,
    'centerY': 185,
    'textAlignment': 'center',
    'segments': [],
    'animation': {
        'type': 'spinOngoing', // Giro indefinidamente
        'spins': 50,
        'easing': 'Linear.easeNone',
        'direction': 'clockwise',
        'repeat': Infinity,
        'yoyo': false,
        'callbackFinished': 'Mensaje()', // Función para mostrar mensaje
        'callbackAfter': 'dibujarIndicador()', // Funciona de pintar indicador
    }
});



// Funciones complementarias 

function Mensaje() {
    $('#idcaso').empty()
    $('#idpersona').empty()
    // var SegmentoSeleccionado = miRuleta.getIndicatedSegment();
    // const $casoSorteado = document.getElementById('casoSorteado');
    // $casoSorteado.value = SegmentoSeleccionado.text;
    // console.log(casoSorteado.value)
    casoSorteado = miRuleta.getIndicatedSegment();
    datos.Array.forEach((x) => {
        if (x.nombre == casoSorteado.text) {
            //    $('#nombreEst').val(x.)
            $('#idcaso').append(x.idcaso)
            $('#enlaceText').val('Enlace: ' + x.nombre)
            document.getElementById('enlace').href = x.enlaces
            $('#nombreArea').val('Area: ' + x.area)
        }
    })
    $('#idpersona').append(`${idper}`)
    $('#nombreEst').val(`${nombre} ${apellidoP} ${apellidoM}`)
    // miRuleta.numSegments = 0
}

function dibujarIndicador() {
    var ctx = miRuleta.ctx;
    ctx.strokeStyle = 'navy';
    ctx.fillStyle = 'black';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(250, 0);
    ctx.lineTo(310, 0);
    ctx.lineTo(280, 40);
    ctx.lineTo(250, 0);
    ctx.stroke();
    ctx.fill();

}


document.querySelector('#btnLimite').addEventListener('click', () => {
    limite.Array.splice(0, limite.Array.length);
    let cant1 = document.querySelector('#Cant1').value
    let cant2 = document.querySelector('#Cant2').value
    let cant3 = document.querySelector('#Cant3').value
    console.log('cant1', cant1, 'cant2', cant2, 'cant3', cant3)
    if (cant1 != 0) {
        url.apiCasosLimite(area1, cant1)
            .then((res) => {
                console.log(res.casosLim.data)
                res.casosLim.data.map(
                    (x) => (
                        limite.Array.push({
                            "idcaso": x.idcaso,
                            "nombre": x.casonombre,
                            "enlaces": x.enlace,
                            "area": x.area,
                            "carrera": x.carrera
                        }),
                        console.log(limite.Array)
                    )
                );
            })
    }
    if (cant2 != 0) {
        url.apiCasosLimite(area2, cant2)
            .then((res) => {
                console.log(res.casosLim.data)
                res.casosLim.data.map(
                    (x) => (
                        limite.Array.push({
                            "idcaso": x.idcaso,
                            "nombre": x.casonombre,
                            "enlaces": x.enlace,
                            "area": x.area,
                            "carrera": x.carrera
                        }),
                        console.log(limite.Array)
                    )
                );
            })
    }
    if (cant3 != 0) {
        url.apiCasosLimite(area3, cant3)
            .then((res) => {
                console.log(res.casosLim.data)
                res.casosLim.data.map(
                    (x) => (
                        limite.Array.push({
                            "idcaso": x.idcaso,
                            "nombre": x.casonombre,
                            "enlaces": x.enlace,
                            "area": x.area,
                            "carrera": x.carrera
                        }),
                        console.log(limite.Array)
                    )
                );
            })
    }

})

document.querySelector('#btnCcasos').addEventListener('click', () => {
    url.apiAreas(document.querySelector('#filtro').value)
        .then((res) => {
            let data = res.area.data
            for (let index = 0; index < data.length; index++) {
                // const element = data[index];
                document.querySelector('#area1').innerHTML = data[0].nombre
                document.querySelector('#area2').innerHTML = data[1].nombre
                document.querySelector('#area3').innerHTML = data[2].nombre
                area1 = data[0].idarea;
                area2 = data[1].idarea;
                area3 = data[2].idarea;
                // console.log(element)
            }
            url.apiTotalCasosxArea(area1)
                .then((res) => {
                    let data2 = res.totalCasosxArea.data
                    console.log(data2)
                    document.querySelector('#c1').innerHTML = '(' + data2[0].cantarea + ')'
                    document.querySelector('#Cant1').max = data2[0].cantarea
                })
            url.apiTotalCasosxArea(area2)
                .then((res) => {
                    let data2 = res.totalCasosxArea.data
                    console.log(data2)
                    document.querySelector('#c2').innerHTML = '(' + data2[0].cantarea + ')'
                    document.querySelector('#Cant2').max = data2[0].cantarea
                })
            url.apiTotalCasosxArea(area3)
                .then((res) => {
                    let data2 = res.totalCasosxArea.data
                    console.log(data2)
                    document.querySelector('#c3').innerHTML = '(' + data2[0].cantarea + ')'
                    document.querySelector('#Cant3').max = data2[0].cantarea
                })
        });
})