import { oeuvresMtl } from "../data/donnees.js";
import Catalogue from "./Catalogue.mjs";
import Filtre from "./Filtre.mjs";
import Recherche from "./Recherche.mjs";
import Tri from "./Tri.mjs";



export default class Application {
    #catalogue;
    #filtre;
    #afficher;
    #recherche;
    #tri;

    constructor() {
        const domCatalogue = document.querySelector("#catalogue");
        this.#catalogue = new Catalogue(domCatalogue, oeuvresMtl);

        this.#catalogue.afficher();

        /** pour gerer laffichage en liste ou en grille */
        const divIcones = document.querySelector(".icones");
        divIcones.addEventListener("click", this.gererAffichage.bind(this));

        /**
         * pour chaque oeuvre du lobj oeuvresMtl, on va chercher les arrondissement. et retire les -
         * si le tableau inclue deja l'arrondissement alors on ne lajoute pas 
         * trier le tableau recu 
         * pour chaque element du tab on cré un element li 
         * lorsque click sur le li, appel a la fonction rechercheFiltre
         * insere dans le dom larrondissement
         */

        this.#filtre = new Filtre(this.#catalogue);
        //filtre dynamique des arrondissements
        const parentUl = document.querySelector("#ul-arrondissement");
        let tabArrond = [];
        oeuvresMtl.forEach(oeuvre => {

            let arrondissement = oeuvre.Arrondissement.replaceAll("-", " ");


            if (!tabArrond.includes(arrondissement)) {
                tabArrond.push(arrondissement);
            }

        });
        tabArrond.sort();
        tabArrond.forEach(arrondissement => {
            let li = document.createElement("li");
            li.addEventListener("click", this.#filtre.rechercheFiltre.bind(this.#filtre));

            let textNode = document.createTextNode(arrondissement);
            li.appendChild(textNode);
            parentUl.appendChild(li);
        });

        //filtre dynamique des noms de materiaux
        const parentUlMateriaux = document.querySelector("#ul-Materiaux");
        let tabMat = [];

        oeuvresMtl.forEach(oeuvre => {
            let materiaux = oeuvre.Materiaux ? oeuvre.Materiaux.split(';') : [];// séparer les matériaux en utilisant le point-virgule comme séparateur
            materiaux.forEach(m => {
                let mat = m.trim();
                if (!tabMat.includes(mat) && mat !== "") { // ajouter le matériau au tableau uniquement s'il n'existe pas déjà et s'il n'est pas vide
                    tabMat.push(mat);
                }
            });
        });

        tabMat.sort();
        tabMat.forEach(materiaux => {
            let li = document.createElement("li");
            li.addEventListener("click", this.#filtre.rechercheFiltre.bind(this.#filtre));

            let textNode = document.createTextNode(materiaux);
            li.appendChild(textNode);
            parentUlMateriaux.appendChild(li);
        });



        /** au click du bouton on rétabli la page catalogue pour afficher toutes les oeuvres */
        let btnRetablir = document.querySelector(".btn-retablir");
        btnRetablir.addEventListener("click", this.#filtre.retablirFiltre.bind(this.#filtre));

        /** pour gerer la recherche */
        this.#recherche = new Recherche(this.#catalogue);
        let btnRecherche = document.querySelector(".btn-rechercher");
        btnRecherche.addEventListener("click", this.#recherche.rechercheMotCle.bind(this.#recherche));


        this.#tri = new Tri(this.#catalogue);
        /** pour gerer le tri */
        const sectionTri = document.querySelector(".section-tri");
        let radioTri = document.querySelector('input[name="trierPar"]:checked');
        let radioOrdre = document.querySelector('input[name="ordre"]:checked');

        // sectionTri.addEventListener("click", this.genererTri


        sectionTri.forEach(radioBtn => {
            radioBtn.addEventListener("change", this.genererTri)
            let params = {
                type: radioTri.value,
                ordre: radioOrdre.value
            };

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
     * 
     * @param {*} event 
     * divIcones.addEvent cré event et va sur la cible pour détecter la classe
     * 
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

    /**
     * 
     * @param {*} evt 
     * 
     */

    appliquerFiltre(evt) {
        let mesFilms;
        if (evt.target.classList.contains("choixFiltre")) {
            console.log(evt.target.dataset);

            const cat = evt.target.dataset.jsCat;
            const valeur = evt.target.dataset.jsCatValeur;
            const eleActif = document.querySelector(".filtre [data-js-actif='1']");
            if (eleActif) {
                eleActif.dataset.jsActif = 0;
            }

            if (eleActif == evt.target) {
                console.log("actif")
                mesFilms = oeuvresMtl;
            }
            else {
                evt.target.dataset.jsActif = 1;
                mesFilms = this.#filtre.appliquerFiltre(cat, valeur, oeuvresMtl)
            }
            //const mesFilms = this.#filtre.appliquerFiltre("running_time", "90-100", oeuvresMtl)

            this.#catalogue.setOeuvres(oeuvresMtl);
            this.#catalogue.afficher();
        }
    }
}
