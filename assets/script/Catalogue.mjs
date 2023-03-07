export default class Catalogue {

    #aOeuvresMtl = [];

    constructor(domCatalogue, aOeuvresMtl) {
        this.domCatalogue = domCatalogue;
        this.#aOeuvresMtl = aOeuvresMtl;



    }

    setOeuvres(aOeuvresMtl) {
        this.#aOeuvresMtl = aOeuvresMtl;
    }

    getOeuvres() {
        return this.#aOeuvresMtl;
    }

    afficher() {

        let chaineHTML = "";

        this.#aOeuvresMtl.forEach((oeuvre) => {
            chaineHTML += ` <article class="carte" data-numero=${oeuvre.NoInterne}>
                            <header>
                                <h2>${oeuvre.Titre}</h2>`


            chaineHTML += `<h1>${this.extraireAnnee(oeuvre.DateFinProduction)}</h1>         
                            </header>`;
            for (const artiste of oeuvre.Artistes) {
                chaineHTML += `<p>${artiste.Prenom} ${artiste.Nom}</p>`;
            }
            chaineHTML += ` <div class="contenu" >
                                <h2></h2>
                                <p>${oeuvre.Arrondissement}</p>
                            </div >
                            <footer class="action">Plus de détails</footer>
                            </article > `;
        })
        this.domCatalogue.innerHTML = chaineHTML;
    }

    extraireAnnee(timeStamp) {
        if (!timeStamp) {
            return "";
        }

        timeStamp = timeStamp.substr(7, timeStamp.length - 15);

        let date = new Date(parseInt(timeStamp));
        let year = date.getFullYear();

        return year;
    }



    afficherDialogue(event) {
        let str = "";
        const module = document.querySelector(".dialogue");
        let numero = event.currentTarget.dataset.numero;


        let oeuvre = this.getCatalogue().getOeuvres().find(element =>
            element.NoInterne == numero
        );


        str += `<h2>${oeuvre.Titre} </h2>`;

        module.innerHTML = str;
        module.classList.add("show");



    }

}