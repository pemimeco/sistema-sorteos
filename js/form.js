const $btnADD = document.getElementById("btn-add");
const $overlay = document.getElementById("overlay");
const $modalForm = document.getElementById("modal-form");
const $exit = document.getElementById("btn-exit");
const $add = document.getElementById("add");
const $cancel = document.getElementById("cancel");
const $detener = document.getElementById('detener')
const $salirModal = document.getElementById('equis');
const $asignarCaso = document.getElementById('asignarCaso')


$btnADD.addEventListener("click", event => {
    $overlay.classList.add("is-active");
    $modalForm.style.animation = "formmodalIn .5s forwards";
});
$exit.addEventListener("click", event => {
    // console.log(event);
    $overlay.classList.remove("is-active");
    $modalForm.style.animation = "formmodalOut .5s forwards";
});
$add.addEventListener("click", event => {
    // console.log(event);
    $overlay.classList.remove("is-active");
    $modalForm.style.animation = "formmodalOut .5s forwards";
});

$cancel.addEventListener("click", event => {
    // console.log(event);
    $overlay.classList.remove("is-active");
    $modalForm.style.animation = "formmodalOut .5s forwards";
});
$overlay.addEventListener("click", event => {
    // console.log(event);
    $overlay.classList.remove("is-active");
    $modalForm.style.animation = "formmodalOut .5s forwards";
});


$detener.addEventListener('click', () => {
    $asignarCaso.classList.add('active')
})
$salirModal.addEventListener('click', () => {
    $asignarCaso.classList.remove('active')
})