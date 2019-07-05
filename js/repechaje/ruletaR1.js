$caso = document.getElementById('caso');
const $asignarCaso = document.getElementById('asignarCaso');
const $detener = document.getElementById('detener');
const $salirModal = document.getElementById('equis');
let casoSorteado;
let idper;
let nombre;
let apellidoP;
let apellidoM;

document.addEventListener("DOMContentLoaded", function (event) {

    miRuleta.startAnimation();

});

let datos = {};
datos.Array = new Array();

let json = (filtro,idper) => {
    datos.Array.splice(0, datos.Array.length)
    $.ajax({
        url: `http://localhost:3000/api/obtenerCasosR/${filtro}/${idper}`,
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
    // json(fil);
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
    json(fil,idper);


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

    deleteSegment()
    miRuleta.numSegments = 0
    setTimeout(() => {
        addSegment() 
    }, 1000);
   
}

$('#tbRepechaje').on('click', '.odd', function () {
    let arr = $('#tbRepechaje').dataTable().fnGetData($(this))
    const fil = document.querySelector('#filtro').value;
    // {idpersona: 5, nombres: "PEDRO", apaterno: "MENDOZA", amaterno: "CORONADO"
    idper = arr.idpersona;
    nombre = arr.nombres;
    apellidoP = arr.apaterno;
    apellidoM = arr.amaterno;
    json(fil,idper);
    // $('#nombreEst').val(`${nombre} ${apallidoP} ${apellidoM}`);
    console.log(arr)
})

$('#tbRepechaje').on('click', '.even', function () {
    let arr = $('#tbRepechaje').dataTable().fnGetData($(this))
    const fil = document.querySelector('#filtro').value;
    idper = arr.idpersona;
    nombre = arr.nombres;
    apellidoP = arr.apaterno;
    apellidoM = arr.amaterno;
    json(fil,idper);
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

function addSegment() {
    // The Second parameter in the call to addSegment specifies the position,
    // in this case 1 meaning the new segment goes at the start of the wheel.
    datos.Array.forEach((x) => {
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

$detener.addEventListener('click', () => {
    $asignarCaso.classList.add('active')
})
$salirModal.addEventListener('click', () => {
    $asignarCaso.classList.remove('active')
})