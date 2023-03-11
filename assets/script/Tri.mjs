export default class Tri {

    #aOeuvresMtl = [];

    constructor(domParent) {

        //this.#aOeuvresMtl = aOeuvresMtl;
        this.domParent = domParent;
        //   this.genererTri(this.params);



    }
    genererTri(ordre, tri) {

        console.log("allo");
        // let radioTri = document.querySelector('input[name="trierPar"]:checked');
        // let radioOrdre = document.querySelector('input[name="ordre"]:checked');

        console.log("par", radioTri, "ordre", radioOrdre);
        this.params = params;

        if (params.type == "titre") {
            aOeuvresMtl.Titre.sort(function (a, b) {
                console.log(aOeuvresMtl.Titre);
                return a.nom.localeCompare(b.nom, "fr")
            });
        }
        else if (params.type == "annee") {


            aOeuvresMtl.DateFinProduction.sort(function (a, b) {
                if (a.debut === b.debut) {
                    return a.fin - b.fin;
                } else {
                    return a.debut - b.debut;
                }
            })


        }

        if (params.ordre == "DESC") {
            aOeuvresMtl.reverse();
        }
        return mesMaires;


    }
}
// listeMaires(params) {

//     let mesMaires = this.#aMaires;

//     if (params.type == "nom") {
//         mesMaires.sort(function (a, b) {
//             return a.nom.localeCompare(b.nom, "fr")
//         });
//     }
//     else if (params.type == "date") {
//         mesMaires.sort(function (a, b) {
//             if (a.debut === b.debut) { // si la date de debut est parreil -> comparer la date de fin pour le tri 
//                 return a.fin - b.fin;
//             } else {
//                 return a.debut - b.debut;
//             }
//         })
//     }

//     if (params.ordre == "DESC") {
//         mesMaires.reverse();
//     }
//     return mesMaires;
// }
