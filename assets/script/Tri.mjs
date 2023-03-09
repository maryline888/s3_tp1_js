export default class Tri {

    #aOeuvresMtl = [];

    constructor(domParent, aOeuvresMtl) {

        this.#aOeuvresMtl = aOeuvresMtl;
        this.domParent = domParent;
        this.genererTri(this.params);



    }
    genererTri(params) {

        this.params = params;

        // if (params.type == "titre") {
        //     aOeuvresMtl.Titre.sort(function (a, b) {
        //         console.log(aOeuvresMtl.Titre);
        //         return a.nom.localeCompare(b.nom, "fr")
        //     });
        // }
        // else if (params.type == "annee") {
        //     aOeuvresMtl.sort(function (a, b) {
        //         if (a.debut === b.debut) {
        //             return a.fin - b.fin;
        //         } else {
        //             return a.debut - b.debut;
        //         }
        //     })


        // }

        // if (params.ordre == "DESC") {
        //     aOeuvresMtl.reverse();
        // }
        // return mesMaires;


    }
}
