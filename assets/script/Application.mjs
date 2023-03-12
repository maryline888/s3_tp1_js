import { oeuvresMtl } from "../data/donnees.js";
import Catalogue from "./Catalogue.mjs";
import Filtre from "./Filtre.mjs";
import Recherche from "./Recherche.mjs";
import Tri from "./Tri.mjs";



export default class Application {
    #catalogue;
    #filtre;
    #afficher;
    #recherche
    #tri;

    constructor() {
        const domCatalogue = document.querySelector("#catalogue");
        this.#catalogue = new Catalogue(domCatalogue, oeuvresMtl);

        this.#catalogue.afficher();

        /** pour gerer laffichage en liste ou en grille */
        const divIcones = document.querySelector(".icones");
        divIcones.addEventListener("click", this.gererAffichage.bind(this));

        /* pour gérer la class filtre */
        this.#filtre = new Filtre(this.#catalogue);
        //filtre dynamique des arrondissements
        const selectArron = document.querySelector(".div__select--arron");
        let tabArrond = [];
        oeuvresMtl.forEach(oeuvre => { //pour chaque oeuvre de lobj oeuvresMtl, on va chercher les arrondissements
            let arrondissement = oeuvre.Arrondissement;
            if (!tabArrond.includes(arrondissement)) {//si le tableau n'inclue pas l'arrondissement
                tabArrond.push(arrondissement);//l'arondissement est ajouté au tableau
            }
        });
        tabArrond.sort();//trier le tableau
        tabArrond.forEach(arrondissement => {
            let option = document.createElement("option");//création de l'élément option dans lequel sera inséré les éléments de notre tableau
            let textNode = document.createTextNode(arrondissement);
            option.appendChild(textNode);
            selectArron.appendChild(option);
        });
        //filtre dynamique des noms de materiaux
        const selectMat = document.querySelector(".div__select--mat");
        let tabMat = [];
        oeuvresMtl.forEach(oeuvre => {
            let materiaux = oeuvre.Materiaux;
            if (materiaux) {
                materiaux = oeuvre.Materiaux.split(/[,;]/);//separer les matériaux au , et ; 
                materiaux.forEach(element => {
                    element = element.trim();//enleve les espaces
                    element = element[0].toUpperCase() + element.substring(1);//met la premiere lettre en maj et retourne element sans sa premiere lettre originale
                    if (!tabMat.includes(element)) { //valider si element n'est pas dans le tableau 
                        tabMat.push(element);//alors on ajoute l'élément à tabMat
                    }
                });
            }
        });
        tabMat.sort();
        tabMat.forEach(materiau => {
            let option = document.createElement("option");
            let textNode = document.createTextNode(materiau);
            option.appendChild(textNode);
            selectMat.appendChild(option);
        });

        /** au click du btn filtrer on appel la methode appliquerFiltre */
        let btnFiltrer = document.querySelector(".btn-filtrer");
        btnFiltrer.addEventListener("click", this.#filtre.appliquerFiltre.bind(this.#filtre))

        /** au click du bouton on rétabli la page catalogue pour afficher toutes les oeuvres */
        let btnRetablir = document.querySelector(".btn-retablir");
        btnRetablir.addEventListener("click", this.#filtre.retablirFiltre.bind(this.#filtre));

        /** pour gerer la recherche */
        this.#recherche = new Recherche(this.#catalogue);
        let btnRecherche = document.querySelector(".btn-rechercher");
        btnRecherche.addEventListener("click", this.#recherche.rechercheMotCle.bind(this.#recherche));

        /** pour gerer le tri */
        this.#tri = new Tri(this.#catalogue);
        const sectionTri = document.querySelector(".section-tri");
        sectionTri.childNodes.forEach(radioBtn => {
            radioBtn.addEventListener("change", this.#tri.genererTri.bind(this.#tri))
        });

    }// fin constructeur

    /**
     * 
     * @returns 
     */
    getCatalogue() {
        return this.#catalogue;
    }

    /**
     * @param {*} event 
     * divIcones.addEvent cré event et va sur la cible pour détecter la classe
     */
    gererAffichage(event) {
        if (event.target.classList.contains('view_list')) {
            this.#catalogue.domCatalogue.classList.add('catalogueRow');
            this.#catalogue.domCatalogue.classList.remove('catalogue');
        } else if (event.target.classList.contains('view_grid')) {
            this.#catalogue.domCatalogue.classList.remove('catalogueRow');
            this.#catalogue.domCatalogue.classList.add('catalogue');
        }
    }
}
