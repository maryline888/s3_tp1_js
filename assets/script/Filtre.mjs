export default class Filtre {
    #recherche;
    constructor(catalogue) {
        this.catalogue = catalogue;
        this.rechercheMotCle;
    }
    /**
     * affiche le resultat du catalogue lors que le filtre arrondissement a ete selectionné
     */
    appliquerFiltre(e) {
        let resultat = [];
        let liste = "";
        const arronSelect = document.querySelector(".div__select--arron");
        const matSelect = document.querySelector(".div__select--mat");
        const domFiltreAppliquer = document.querySelector(".filtreApplique");
        const arronValue = arronSelect.options[arronSelect.selectedIndex].value;
        const matValue = matSelect.options[matSelect.selectedIndex].value;
        //si il y a une sélection
        if (arronValue) {
            liste = `<li>${arronValue}</li>`;
        }
        if (matValue) {
            liste += `<li>${matValue}`;
        }
        domFiltreAppliquer.innerHTML = liste;//insertion des filtres sélectionné au DOM

        let regexArron = new RegExp(arronValue, "gi");
        let regexMat = new RegExp(matValue, "gi");

        resultat = this.catalogue.getOeuvresAafficher().filter(oeuvre => {
            if (regexArron.test(oeuvre.Arrondissement) && regexMat.test(oeuvre.Materiaux)) { // valider si chaque i retourne vrai sur le regex test
                return true;
            }
            return false; // si ne trouve pas de correspondance retourne faux
        });
        // renvoie le tableaux de resultats à la méthode afficher de la classe catalogue
        this.catalogue.afficher(resultat)
    }

    /**
     * methode qui rétabli l'affichage des oeuvres lorsquon click sur bouton Rétablir
     */
    retablirFiltre(e) {
        const arronSelect = document.querySelector(".div__select--arron");
        const matSelect = document.querySelector(".div__select--mat");
        arronSelect.getElementsByTagName('option')[0].selected = 'selected';//retrait des filtres sur les options
        matSelect.getElementsByTagName('option')[0].selected = 'selected';

        let elmLi = document.querySelector(".filtreApplique li");//retrait des filtres un a la fois
        elmLi.parentNode.removeChild(elmLi);

        this.catalogue.afficher();
    }
}