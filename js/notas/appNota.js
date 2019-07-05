const url = new Url();
const nota = new Nota();

let iddef;
let calif;
let idper;
let nombre;
let apellidoP;
let apellidoM;


const $modalNotas = document.getElementById('modalNotas')
const $overlaynotas = document.getElementById('overlaynotas')
const $cerrarNotas = document.getElementById('cerrarNotas')

$cerrarNotas.addEventListener('click', () => {
    $modalNotas.classList.remove('active')
    $overlaynotas.classList.remove('active')

})
document.querySelector('#filtro').addEventListener('change', () => {
    // iniciador de tabla
    const filtro = Number(document.querySelector('#filtro').value);
    const tipo = Number(document.querySelector('#tipo').value);
    console.log(filtro);
    if (filtro !== 0 && tipo !== 0) {
        nota.iniciarTablaNotas(filtro, tipo);
    }
});

document.querySelector('#tipo').addEventListener('change', () => {
    // iniciador de tabla
    const filtro = Number(document.querySelector('#filtro').value);
    const tipo = Number(document.querySelector('#tipo').value);
    console.log(filtro);
    if (filtro !== 0 && tipo !== 0) {
        nota.iniciarTablaNotas(filtro, tipo);
    }
});

document.querySelector('#actNota').addEventListener('click', () => {
    const valor = document.querySelector('#AR').value
    nota.actualizarNota(valor, iddef);
    console.log('nota:', valor, 'iddefensa:', iddef);
});

document.querySelector('#cerrarNotas').addEventListener('click', () => {
    const filtro = document.querySelector('#filtro').value
    const tipo = Number(document.querySelector('#tipo').value);
    nota.iniciarTablaNotas(filtro, tipo);
})


//recupera datos del estudiante seleccionado
$('#tbNotas').on('click', '.odd', function () {
    let arr = $('#tbNotas').dataTable().fnGetData($(this))
    // {idpersona: 5, nombres: "PEDRO", apaterno: "MENDOZA", amaterno: "CORONADO"
    iddef = arr.iddefensa;
    idper = arr.idpersona;
    nombre = arr.nombres;
    apellidoP = arr.apaterno;
    apellidoM = arr.amaterno;
    calif = arr.nota;
    $('#notaEst').val(`${nombre} ${apellidoP} ${apellidoM}`);
    console.log(arr)
})

$('#tbNotas').on('click', '.even', function () {
    let arr = $('#tbNotas').dataTable().fnGetData($(this))
    iddef = arr.iddefensa;
    idper = arr.idpersona;
    nombre = arr.nombres;
    apellidoP = arr.apaterno;
    apellidoM = arr.amaterno;
    calif = arr.nota;
    $('#notaEst').val(`${nombre} ${apellidoP} ${apellidoM}`);
    console.log(arr)
})

function mostrarNotas() {
    $modalNotas.classList.add('active')
    $overlaynotas.classList.add('active')
}