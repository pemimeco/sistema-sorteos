class Url {

    async apiCarreras() {

        const urlCarreras = await fetch('http://localhost:3000/api/obtenerCarreras');

        const carrera = await urlCarreras.json();
        console.log(carrera);
        // retornamos la funcion
        return {
            carrera
        }

    }

    async apiAreas(carrera) {

        const urlAreas = await fetch(`http://localhost:3000/api/obtenerAreasxCarrera/${carrera}`);

        const area = await urlAreas.json();
        console.log(area);
        // retornamos la funcion
        return {
            area
        }

    }

    async apiTipoDef() {

        const urlTipo = await fetch(`http://localhost:3000/api/tipodef`);

        const tipos = await urlTipo.json();
        console.log(tipos);
        // retornamos la funcion
        return {
            tipos
        }

    }


    async apiCasosLimite(area, limite) {

        const urlCasosLim = await fetch(`http://localhost:3000/api/obtenerCasosLimite/${area}/${limite}`);

        const casosLim = await urlCasosLim.json();
        // console.log(casosLim);
        // retornamos la funcion
        return {
            casosLim
        }

    }
    async apiAreasxEstRep(codEst, carrera) {

        const urlAreasRep = await fetch(`http://localhost:3000/api/ObtenerAreasxEstudianteRep/${codEst}/${carrera}/INTERNA`);

        const areasRep = await urlAreasRep.json();
        // console.log(areasRep);
        // retornamos la funcion
        return {
            areasRep
        }

    }
    async apiTotalCasos() {

        const urlTotalC = await fetch(`http://localhost:3000/api/totalCasos`);

        const totalCasos = await urlTotalC.json();
        // console.log(areasRep);
        // retornamos la funcion
        return {
            totalCasos
        }

    }
    async apiCasosAsig(carrera) {

        const urlCasosAsig = await fetch(`http://localhost:3000/api/totalCasosAsig/${carrera}`);

        const casosAsig = await urlCasosAsig.json();
        // console.log(areasRep);
        // retornamos la funcion
        return {
            casosAsig
        }

    }
    async apiCasosSinAsig(carrera) {

        const urlCasosSinAsig = await fetch(`http://localhost:3000/api/totalCasosSinAsig/${carrera}`);

        const casosSinAsig = await urlCasosSinAsig.json();
        // console.log(areasRep);
        // retornamos la funcion
        return {
            casosSinAsig
        }

    }
    async apiTotalCasosxCarrera(carrera) {

        const urlTotalCasosxCarrera = await fetch(`http://localhost:3000/api/TotalCasosxCarrera/${carrera}`);

        const totalCasosxCarrera = await urlTotalCasosxCarrera.json();
        // console.log(areasRep);
        // retornamos la funcion
        return {
            totalCasosxCarrera
        }

    }

    async apiTotalCasosxArea(idarea) {

        const urlTotalCasosxArea = await fetch(`http://localhost:3000/api/totalCasosxArea/${idarea}`);

        const totalCasosxArea = await urlTotalCasosxArea.json();
        // console.log(areasRep);
        // retornamos la funcion
        return {
            totalCasosxArea
        }

    }
}