export default class Catalogue {

    #aOeuvresMtl = [];

    constructor(domParent) {
        this.domParent = domParent;
    }

    setOeuvres(aOeuvresMtl) {
        this.#aOeuvresMtl = aOeuvresMtl;
    }

    afficher() {

        console.log(this.#aOeuvresMtl);
        let chaineHTML = "";
        this.#aOeuvresMtl.forEach((oeuvre) => {
            chaineHTML += ` <article class="carte">
                    <header>
                        <h2>Porte de jour</h2>     
                        <h1>Date</h1>         
                    </header>
                    <div class="contenu">
                        <h2>Jocelyne Alloucherie</h2>
                        <p>arrondissement</p>
                    </div>
                    <footer class="action">Plus de détails</footer>
                </article>`;
        })

        this.domParent.innerHTML = chaineHTML;
    }

}