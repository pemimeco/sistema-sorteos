const $btnCcasos = document.getElementById('btnCcasos')
const $modalCCasos = document.getElementById('modalCCasos')
const $overlayCnotas = document.getElementById('overlayCnotas')
const $closeMCasos = document.getElementById('closeMCasos')

$btnCcasos.addEventListener('click', () => {
    $modalCCasos.classList.add('active')
    $overlayCnotas.classList.add('active')
})
$closeMCasos.addEventListener('click', () => {
    $modalCCasos.classList.remove('active')
    $overlayCnotas.classList.remove('active')
})