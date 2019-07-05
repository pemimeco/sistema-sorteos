const url = new Url();
const ext = new Externa();

let codigo, defensa, area, nombres, apellidos, carrera, areaN;
const $modalImpresion = document.getElementById('modal-impresion')
const $overlayd = document.getElementById('overlayd')
// const $btnImprimir = document.getElementsByClassName('reporte')
const $cerrarImprimir = document.getElementById('cerrar-impre')


document.querySelector('#filtro').addEventListener('change', () => {
    // iniciador de tabla
    const filtro = document.querySelector('#filtro').value
    console.log(filtro);
    ext.iniciarTablaExt(filtro);
    ext.iniciarTablaSorteo(filtro);

    url.apiTotalCasosxCarrera(document.querySelector('#filtro').value)
        .then((res) => {
            totalC = res.totalCasosxCarrera.data[0].count
            // console.log(totalC)
            document.querySelector('#totalCE').innerHTML = totalC
        })
    url.apiCasosAsig(document.querySelector('#filtro').value)
        .then((res) => {
            asig = res.casosAsig.data[0].casosasig
            // console.log(totalC)
            document.querySelector('#casoAsigE').innerHTML = asig
        })
    url.apiCasosSinAsig(document.querySelector('#filtro').value)
        .then((res) => {
            sinAsig = res.casosSinAsig.data[0].casossinasig
            // console.log(totalC)
            document.querySelector('#casoSinAsigE').innerHTML = sinAsig
        })
});

document.querySelector('#equis').addEventListener('click', () => {
    const filtro = document.querySelector('#filtro').value
    console.log(filtro);
    ext.iniciarTablaExt(filtro);
    ext.iniciarTablaSorteo(filtro);
});

// document.querySelector('#btnx').addEventListener('click', () => {
//     const filtro = document.querySelector('#filtro').value
//     console.log(filtro);
//     ext.iniciarTablaRep(filtro);
//     ext.iniciarTablaSorteo(filtro);
// });


$('#tbSorteos').on('click', '.odd', function () {
    let arr = $('#tbSorteos').dataTable().fnGetData($(this));
    codigo = arr.registro;
    defensa = arr.iddefensa;
    area = arr.idarea;
    nombres = arr.nombres;
    apellidos = `${arr.apaterno} ${arr.amaterno}`;
    carrera = arr.carrera;
    areaN = arr.area
    console.log(arr);
    // io2.obtnerArea(arr.idarea);
    ext.llenarDatos(codigo);
    // defDetalle();
});

$('#tbSorteos').on('click', '.even', function () {
    let arr = $('#tbSorteos').dataTable().fnGetData($(this));
    codigo = arr.registro;
    defensa = arr.iddefensa;
    area = arr.idarea;
    nombres = arr.nombres;
    apellidos = `${arr.apaterno} ${arr.amaterno}`;
    carrera = arr.carrera;
    areaN = arr.area
    console.log(arr);
    // io2.obtnerArea(arr.idarea);
    ext.llenarDatos(codigo);
    // defDetalle();
});

$cerrarImprimir.addEventListener('click', () => {
    $modalImpresion.classList.remove('active')
    $overlayd.classList.remove('active')

})

function mostrarImprimir() {
    $modalImpresion.classList.add('active')
    $overlayd.classList.add('active')
}