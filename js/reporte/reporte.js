document.addEventListener("DOMContentLoaded", (event) => {

    const table = $('#example').DataTable({
        destroy: true,
        lengthChange: false,
        ajax: {
            "url": `http://localhost:3000/api/obtenerSorteosAll`,
            "type": "GET"
        },
        "columns": [{

            "data": "nombres",
        }, {
            "data": "apaterno",

        }, {
            "data": "carrera"
        }, {
            "data": "caso"
        }, {
            "data": "enlace"
        }, {
            "data": "area"
        }]

    });

    setTimeout(() => {
        const table1 = $('#example').DataTable({
            destroy: true,
            lengthChange: false,
            buttons: ['copy', 'excel', 'csv', 'pdf', 'colvis']
        });

        table1.buttons().container()
            .appendTo('#example_wrapper .col-md-6:eq(0)');
    }, 1000);


});