export default class Recherche {

    /**
     * 
     * @param {*} catalogue 
     * recoit les données du catalogue 
     */
    constructor(catalogue) {
        this.catalogue = catalogue;
    }


    /**
     * motCle | str | int entrée de lusager
     * resulat | array
     * regex utilise MotCle pour passer la boucle et faire les validations :
     * 
     * Object.getOwnPropertyNames est une méthode utilisée afin de pouvoir passer sur toute les propriétées de * l'objet oeuvre. elle retourne seulement le nom de son propre objet pour chaque clé
     * Utilisé pour vérifer l'existence d'une propriété dans l'objet donc un mot ou un nombre dans notre 
     * dataBase
     * 
     */
    rechercheMotCle() {
        let resultat = [];
        let motCle = document.querySelector('input[type=search]').value;
        let regex = new RegExp(motCle, "gi");

        resultat = this.catalogue.getOeuvres().filter(oeuvre => {
            let tabAttribut = Object.getOwnPropertyNames(oeuvre); // ajout des noms de lobjet oeuvre dans le tableau taAttributs
            for (let i = 0; i < tabAttribut.length; i++) { // passer à travers chaque clé
                if (regex.test(oeuvre[tabAttribut[i]])) { // valider si chaque i retourne vrai sur le regex test
                    return true;
                }
            }
            return false; // si ne trouve pas de correspondance retourne faux
        })
        // renvoie le tableaux de resultats à la méthode afficher de la classe catalogue
        this.catalogue.afficher(resultat)
    }

















}//fin class