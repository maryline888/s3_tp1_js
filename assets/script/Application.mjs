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
        const domCatalogue = document.querySelector(".catalogue");
        this.#catalogue = new Catalogue(domCatalogue);

        // convertion de la dateIso en date lisible : 
        const dateFinProduction = "/Date(1291352400000-0500)\\/";
        const timestamp = parseInt(dateFinProduction.match(/\d+/)[0], 10);
        const date = new Date(timestamp);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        console.log(date.toLocaleDateString('fr-FR', options));
        // doit rendre le tout dynamique


        // oeuvresMtl.forEach((oeuvre) => {
        //     oeuvre.dureeHeure = parseInt(oeuvre.running_time / 60) + "h" + parseInt(oeuvre.running_time % 60).toString().padStart(2, '0');
        // })

        this.#catalogue.setOeuvres(oeuvresMtl);

        this.#catalogue.afficher();

        let sectionFiltre = document.querySelector(".liste-categorie");
        this.#filtre = new Filtre(sectionFiltre, oeuvresMtl);
        sectionFiltre.addEventListener("click", this.appliquerFiltre.bind(this));
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