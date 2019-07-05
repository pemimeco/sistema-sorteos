class Url2 {

    async apiTribunales(area, hora, fecha) {

        const urlTribu = await fetch(`http://localhost:3000/api/obtenerTribunales/${area}/${hora}/${fecha}`);

        const tribunales = await urlTribu.json();
        console.log(tribunales);
        // retornamos la funcion
        return {
            tribunales
        }

    }

    async apiTurnos() {

        const urlTurno = await fetch(`http://localhost:3000/api/obtenerHora`);
        const turnos = await urlTurno.json();
        console.log(turnos);
        return {
            turnos
        }

    }


    async apiLabs() {

        const urlLabs = await fetch(`http://localhost:3000/api/obtenerLab`);
        const labs = await urlLabs.json();
        console.log(labs);
        return {
            labs
        }

    }

    async detalleDef(iddef) {
        const urlDef = await fetch(`http://localhost:3000/api/obetenerDef/${iddef}`);
        const def = await urlDef.json();
        console.log(def);
        return {
            def
        }
    }

}