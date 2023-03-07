import { oeuvresMtl } from "../data/donnees.js";
import Catalogue from "./Catalogue.mjs";
import Filtre from "./Filtre.mjs";
import Recherche from "./Recherche.mjs";
import Tri from "./Tri.mjs";



export default class Application {
    #catalogue;
    #filtre;
    #Recherche;
    #Tri;

    constructor() {


        const domCatalogue = document.querySelector("#catalogue");
        this.#catalogue = new Catalogue(domCatalogue, oeuvresMtl);

        this.#catalogue.afficher();

        /** pour gerer laffichage en liste ou en grille */
        const divIcones = document.querySelector(".icones");
        divIcones.addEventListener("click", this.gererAffichage.bind(this));

        /** pour gerer laffichage du detail de chaques oeuvres */
        this.#catalogue.domCatalogue.childNodes.forEach(element => {

            element.addEventListener("click", this.#catalogue.afficherDialogue.bind(this));
        });

        /** pour gerer les filtres */
        let sectionFiltre = document.querySelector(".liste-categorie");
        this.#filtre = new Filtre(sectionFiltre, oeuvresMtl);
        sectionFiltre.addEventListener("click", this.appliquerFiltre.bind(this));

        this.modale;
        let gabaritDetail;

        /** pour gerer la recherche */


        /** pour gerer la boite dialogue */
        // const modaleDetail = document.getElementById("modale");
        // const modeleDetail = document.getElementById("modeleDetail");
        // const btnfermer = document.querySelector('.btnModale');
        // btnfermer.onClick('click').close();

    }



    getCatalogue() {
        return this.#catalogue;
    }

    /**
     * pour gerer laffichage en liste ou en grille 
     * ne fonctionne pas 
     * 
     */
    gererAffichage(event) {

        if (event.target.classList.contains('view_list')) {
            console.log("liste-click");

            this.#catalogue.domCatalogue.classList.add('catalogueRow');
            this.#catalogue.domCatalogue.classList.remove('catalogue');

        } else if (event.target.classList.contains('view_grid')) {
            this.#catalogue.domCatalogue.classList.remove('catalogueRow');
            this.#catalogue.domCatalogue.classList.add('catalogue');

            console.log("grid-click");

        }
        //  this.#catalogue.setAffichage(choixAffichage);
        this.#catalogue.afficher();
    }


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


            console.log(mesFilms)
            this.#catalogue.setOeuvres(oeuvresMtl);
            this.#catalogue.afficher();
        }
    }
}
