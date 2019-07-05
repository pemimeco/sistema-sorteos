//instancia a las clases
const url = new Url();
const io = new Interface();


// addEvenlistnert

document.querySelector('#filtro').addEventListener('change', () => {
    // iniciador de tabla
    const valor = io.obtenerFiltro();
    console.log(valor);
    io.iniciarTabla(valor);
    io.iniciarTablaSorteo(valor);

    url.apiTotalCasosxCarrera(document.querySelector('#filtro').value)
        .then((res) => {
            totalC = res.totalCasosxCarrera.data[0].count
            console.log(totalC)
            document.querySelector('#totalCI').innerHTML = totalC
        })
    url.apiCasosAsig(document.querySelector('#filtro').value)
        .then((res) => {
            asig = res.casosAsig.data[0].casosasig
            // console.log(totalC)
            document.querySelector('#casoAsigI').innerHTML = asig
        })
    url.apiCasosSinAsig(document.querySelector('#filtro').value)
        .then((res) => {
            sinAsig = res.casosSinAsig.data[0].casossinasig
            // console.log(totalC)
            document.querySelector('#casoSinAsigI').innerHTML = sinAsig
        })
});

document.querySelector('#equis').addEventListener('click', () => {
    const valor = io.obtenerFiltro();
    console.log(valor);
    io.iniciarTabla(valor);
    io.iniciarTablaSorteo(valor);
});

document.querySelector('#btnx').addEventListener('click', () => {
    const valor = io.obtenerFiltro();
    console.log(valor);
    io.iniciarTablaSorteo(valor);
});

document.querySelector('#resetc1').addEventListener('click', () => {
    const valor = document.querySelector('#')
})