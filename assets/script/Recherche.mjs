export default class Recherche {

    constructor(catalogue) {
        //  this.donnees = donneesInitiale;
        //    this.domParent = domParent;
        this.catalogue = catalogue;
        // this.rechercheMotCle(donneesInitiale);
    }

    rechercheMotCle(e) {
        //aller chercher la valeur du input type 
        let resultat = [];
        let motCle = document.querySelector('input[type=search]').value;
        console.log(motCle);
        let regex = new RegExp(motCle, "gi");

        resultat = this.catalogue.getOeuvres().filter(oeuvre => {
            let tabAttribut = Object.getOwnPropertyNames(oeuvre);
            for (let i = 0; i < tabAttribut.length; i++) {
                if (regex.test(oeuvre[tabAttribut[i]])) {
                    return true;
                }
            }
            return false;
        })

        this.catalogue.afficher(resultat)
    }

















}//fin class