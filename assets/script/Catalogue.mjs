export default class Catalogue {

    #aOeuvresMtl;
    #oeuvresAafficher;

    constructor(domCatalogue, aOeuvresMtl) {
        this.domCatalogue = domCatalogue;
        this.#aOeuvresMtl = aOeuvresMtl;
        this.#oeuvresAafficher = aOeuvresMtl;


    }

    // afin de donner accès au array Oeuvres Mtl 
    setOeuvres(aOeuvresMtl) {
        this.#aOeuvresMtl = aOeuvresMtl;
    }

    // afin de pouvoir manipuler les donnés
    getOeuvres() {
        return this.#aOeuvresMtl;
    }
    getOeuvresAafficher() {
        return this.#oeuvresAafficher;
    }


    /**
     * @param 
     * @return string chaineHtml
     * 
     * construction de la chaine html qui affiche le catalogue des oeuvres
     * de façon dynamique 
     */
    afficher(oeuvres) {


        if (oeuvres) {
            this.#oeuvresAafficher = oeuvres;
        } else {
            this.#oeuvresAafficher = this.#aOeuvresMtl;
        }

        let chaineHTML = "";

        this.#oeuvresAafficher.forEach((oeuvre) => {
            chaineHTML += ` <article class="carte" data-numero=${oeuvre.NoInterne}>
                            <header>
                                <h2>${oeuvre.Titre}</h2>`

            // appel de du module extraireAnnee avec oeuvre.DateFinProduction en param
            chaineHTML += `<h1>${this.extraireAnnee(oeuvre.DateFinProduction)}</h1>         
                            </header>`;
            // utiliser le tableau artiste afin d'extraire le prenom et le nom
            for (const artiste of oeuvre.Artistes) {
                chaineHTML += `<p>${artiste.Prenom} ${artiste.Nom}</p>`;
            }
            chaineHTML += ` <div class="contenu" >
                                <h2></h2>
                                <p>${oeuvre.Arrondissement}</p>
                            </div >
                            </article > `;
        })
        this.domCatalogue.innerHTML = chaineHTML;
        /** pour gerer laffichage du detail de chaques oeuvres */
        this.domCatalogue.childNodes.forEach(element => {

            element.addEventListener("click", this.afficherDialogue.bind(this));
        });
    }

    /**
     * @param {string} timeStamp qui est la DateFinProduction
     * @return {int} year 
     */
    extraireAnnee(timeStamp) {
        // si aucune donnée, null inclue on retourne un chaine vide
        if (!timeStamp) {
            return "";
        }
        //séparer le string timStamp afin d'avoir accès qu'au chiffre nécessaire à la convertion
        timeStamp = timeStamp.substring(7, timeStamp.length - 7);
        //  utilisation de l'obj Date pour convertir le timeStamp en année 
        let date = new Date(parseInt(timeStamp));
        let year = date.getFullYear();

        return year;
    }

    /**
     * 
     * @param {string} event
     * générer la boite modale avec toutes les infos pertinentes 
     */
    afficherDialogue(event) {
        let str = "";
        let artiste = [];

        const module = document.querySelector(".dialogue");
        // récupération du data-numero=${oeuvre.NoInterne}
        let numero = event.currentTarget.dataset.numero;
        // accèder aux oeuvres du catalogue et trouver l'élément correspondant à l'élément sur lequel il y a un clic
        let oeuvre = this.#aOeuvresMtl.find(element =>
            element.NoInterne == numero
        );
        // construction du string pour passer toutes les donnees voulue 
        str += `<h2>Fiche informative</h2>
        <h2>Titres : ${oeuvre.Titre} </h2>
        <h2>Artiste : ${oeuvre.Artistes[0].Prenom} ${oeuvre.Artistes[0].Nom} </h2>
        
                <h3>Collection: ${oeuvre.NomCollection}</h3>
                <h3>Matériaux utilisés: ${oeuvre.Materiaux}</h3>
                <h3>Arrondissement: ${oeuvre.Arrondissement}</h3>
                <h3>Ou le trouver: ${oeuvre.Parc}</h3>
                <h3>${oeuvre.SousCategorieObjet}</h3>`;

        str += `<button class='btnModale'>Fermer</button>`;

        module.innerHTML = str;
        module.classList.add("show");

        const btnfermer = document.querySelector('.btnModale');
        btnfermer.addEventListener("click", (event) => {
            module.classList.remove("show");
        });
    }
}