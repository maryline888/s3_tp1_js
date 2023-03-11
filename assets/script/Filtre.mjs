export default class Filtre {

    constructor(catalogue) {
        this.catalogue = catalogue;
    }

    /**
     * 
     * @param {*} e
     * affiche le resultat du catalogue lors que le filtre arrondissement a ete selectionné
     */
    rechercheFiltre(e) {
        let resultat = [];
        let arrondissement = e.currentTarget.innerHTML.replaceAll(" ", "-");

        let regex = new RegExp(arrondissement, "gi");
        resultat = this.catalogue.getOeuvresAafficher().filter(oeuvre => regex.test(oeuvre.Arrondissement));

        this.catalogue.afficher(resultat)


        // const filtreApplique = document.querySelector('.filtreAppliqué');
        // const choixFiltre = document.querySelectorAll('.choixFiltre ul li');
        // choixFiltre.forEach(item => {
        //     item.addEventListener('click', () => {
        //         const filtreSelectionne = item.textContent.trim();
        //         filtreApplique.textContent = `Filtre appliqué : ${filtreSelectionne}`;
        //     });
        // });

    }

    /**
     * methode qui retourne l'affichage de toutes les oeuvres
     */
    retablirFiltre() {
        this.catalogue.afficher();
    }
}