const $modalTribu = document.getElementById('modal-tribu');
const $modalTribuA = document.getElementById('modal-tribuA');
const $overlays = document.getElementById("overlays");
const $btnx = document.getElementById("btnx");
const $btnxA = document.getElementById("btnxA");
const $select = document.getElementById('select');
const $text = document.getElementById('text');
const $guardar = document.getElementById('guardar');
const $arrow = document.getElementById('arrow');


function mostrarTribunal() {
    $modalTribu.classList.add('active');
    $overlays.classList.add('is-active');
    $modalTribuA.classList.add('is-active');
}

$btnx.addEventListener('click', () => {
    $modalTribu.classList.remove('active');
    $overlays.classList.remove('is-active');
    $modalTribuA.classList.remove('is-active');
});


function mostrarTribunalA() {
    $modalTribuA.classList.add('active');
    $overlays.classList.add('is-active');
    $modalTribu.classList.add('is-active');
}

$btnxA.addEventListener('click', () => {
    $modalTribuA.classList.remove('active');
    $overlays.classList.remove('is-active');
    $modalTribu.classList.remove('is-active');
});

document.querySelector('#pepe').addEventListener('click', () => {
    // alert('ss');
    // alert($select.value)
    $select.classList.add('active');
    $text.classList.add('active');

})

$guardar.addEventListener('click', () => {
    $select.classList.remove('active');
    $text.classList.remove('active');

    document.getElementById('text').textContent = $select.value
})