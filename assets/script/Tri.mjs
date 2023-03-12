export default class Tri {

    #catalogue;

    constructor(catalogue) {
        this.#catalogue = catalogue;
    }
    genererTri(e) {
        let radioTri = document.querySelector('input[name="trierPar"]:checked');
        let radioOrdre = document.querySelector('input[name="ordre"]:checked');

        if (radioTri.value == "titre") {
            this.#catalogue.getOeuvresAafficher().sort(function (a, b) {
                return a.Titre.localeCompare(b.Titre, "fr")
            });
        }
        else if (radioTri.value == "annee") {
            this.#catalogue.getOeuvresAafficher().sort(function (a, b) {

                if (a.DateFinProduction == null && b.DateFinProduction == null) {
                    return 0;
                } else if (a.DateFinProduction == null) {
                    return -1;
                } else if (b.DateFinProduction == null) {
                    return 1;
                }

                let timeStamp1 = a.DateFinProduction.substring(7, a.DateFinProduction.length - 7);
                let timeStamp2 = b.DateFinProduction.substring(7, b.DateFinProduction.length - 7);

                let d1 = new Date(parseInt(timeStamp1));//  utilisation de l'obj Date pour convertir le timeStamp en année 
                let d2 = new Date(parseInt(timeStamp2));
                return d1.getFullYear() < d2.getFullYear();
            })
        }
        if (radioOrdre.value == "DESC") {
            this.#catalogue.getOeuvresAafficher().reverse();
        }
        this.#catalogue.afficher();
    }
}

