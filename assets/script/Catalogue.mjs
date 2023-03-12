export default class Catalogue {

    #aOeuvresMtl;
    #oeuvresAafficher;

    constructor(domCatalogue, aOeuvresMtl) {
        this.domCatalogue = domCatalogue;
        this.#aOeuvresMtl = aOeuvresMtl;
        this.#oeuvresAafficher = aOeuvresMtl;// oeuvreAafficher est une copie du tab aOeuvresMtl mais permet de pouvoir gere laffichage

    }
    // afin de donner accès au array Oeuvres Mtl 
    setOeuvres(aOeuvresMtl) {
        this.#aOeuvresMtl = aOeuvresMtl;
    }
    // afin de pouvoir manipuler les donnés à l'extérieur
    getOeuvres() {
        return this.#aOeuvresMtl;
    }
    getOeuvresAafficher() {
        return this.#oeuvresAafficher;
    }
    /**
     * @param {array} oeuvres
     * @return {string } chaineHtml
     * construction de la chaine html qui affiche le catalogue des oeuvres de façon dynamique 
     */
    afficher(oeuvres) {
        // si la méthode reçoit une param, alors utilisé ce tableau pour construire le DOM
        if (oeuvres) {
            this.#oeuvresAafficher = oeuvres;
        } else { // si aucun param, alors retourner le tableau dobj des oeuvres complet
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
                chaineHTML += `<div class="contenu" ><p>${artiste.Prenom} ${artiste.Nom}</p>`;
            }
            chaineHTML += ` <div class="footer" >
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
        const module = document.querySelector(".dialogue");
        let numero = event.currentTarget.dataset.numero; // récupération du data-numero=${oeuvre.NoInterne}
        let oeuvre = this.#aOeuvresMtl.find(element =>  // accèder aux oeuvres du catalogue et trouver l'élément correspondant à l'élément sur lequel il y a un clic
            element.NoInterne == numero
        );
        // construction du string pour passer toutes les donnees voulue 
        str += `<h2>${oeuvre.Titre} </h2>
                <h3>Artiste </h3> ${oeuvre.Artistes[0].Prenom} ${oeuvre.Artistes[0].Nom} 
                <h3>Collection</h3>${oeuvre.NomCollection}
                <h3>Matériaux utilisés</h3> ${oeuvre.Materiaux}
                <h3>Arrondissement</h3> ${oeuvre.Arrondissement}
                <h3>Emplacement</h3> ${oeuvre.Parc}
                <h3>Sous catégorie</h3>${oeuvre.SousCategorieObjet};
                <br><button class='btnModale'>Fermer</button>`;
        module.innerHTML = str;
        module.classList.add("show");

        const btnfermer = document.querySelector('.btnModale');
        btnfermer.addEventListener("click", (event) => {
            module.classList.remove("show");
        });
    }
}