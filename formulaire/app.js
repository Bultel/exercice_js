window.onload = function (){
const inpUtilisateur = document.querySelector (".form-groupe:nth-child(1) input");
const inpMail = document.querySelector (".form-groupe:nth-child(2) input");
const inpMdp = document.querySelector (".form-groupe:nth-child(3) input");
const inpConfirme = document.querySelector (".form-groupe:nth-child(4) input");
const allImg = document.querySelectorAll (".icone-verif");
const allSpan = document.querySelectorAll ("span");
const allLigne = document.querySelectorAll (".ligne div");

// Identification
//input prend ce que l'on ecrit dans l'input
inpUtilisateur.addEventListener("input", (event) =>{
    console.log (event)
    //taget = input
    if (event.target.value.length >= 3) {
        allImg[0].style.display = "inline";     // affiche image
        allImg[0].src = "ressources/check.svg"; // image
        allSpan[0].style.display = "none";      //cache le texte 
    }else{
        allImg[0].style.display = "inline";
        allImg[0].src = "ressources/error.svg";  //image error
        allSpan[0].style.display = "block";      //affiche le texte
    }
})

//Mail
//On utilise le regex
//regex = code qui sert a check. entre les /c'est ce qu'on a envie de verifier, si ca correspond avec notre valeur.
//le S represente tout les caractéres qui ne s nt pas des espaces
//le + = nombre indefinie
inpMail.addEventListener("input", (event) =>{

    const regexEmail = /\S+@\S+\.\S+/;

    if (event.target.value.search(regexEmail) === 0) {   // search permet de verifier si notre regex est valide
                                                        // si ok, = 0, si non, = -1
        allImg[1].style.display = "inline";     // affiche image
        allImg[1].src = "ressources/check.svg"; // image
        allSpan[1].style.display = "none";      //cache le texte 

    } else if (event.target.value.search(regexEmail) === -1) {

        allImg[1].style.display = "inline";     // affiche image
        allImg[1].src = "ressources/error.svg"; // image
        allSpan[1].style.display = "inline";      //cache le texte 
    }
})

// validation du mdp

let valeurMdp;

// tout les caractéres qui sont pas des lettres min, maj et des chiffres
const specialCar = /[^a-zA-Z0-9]/;
const alphabet = /[a-z]/i;    //i = insencitive, permet de ne pas etres sensible a la casse
const chiffres = /[0-9]/;

// objet qui permet de savoir combien de lettres et chiffres il y a dans le mdp
let objValidation = {
    symbole: 0,
    lettre: 0,
    chiffre: 0
};

inpMdp.addEventListener("input", (event)=>{

    valeurMdp = event.target.value;

    //On regarde la valeur de l'input, si elle a un car spe, elle est strictement dif de -1
    // alors obj symbole premt 1
    if (valeurMdp.search(specialCar) !== -1){
        objValidation.symbole = 1;
    }
    if (valeurMdp.search(alphabet) !== -1){
        objValidation.lettre = 1;
    }
    if (valeurMdp.search(chiffres) !== -1){
        objValidation.chiffre = 1;
    }
    
    // propriété de l'objet event qui prend en compte la suppression du input
    if(event.inputType = "deleteContentBackward"){
        // si je fait un retour est que une de ces condition est = a -1, sa veut dire que j'aurais 
        //sois supprimer une lettre, un symbole ou un chiffre
        if (valeurMdp.search(specialCar) === -1){
            objValidation.symbole = 0;
        }
        if (valeurMdp.search(alphabet) === -1){
            objValidation.lettre = 0;
        }
        if (valeurMdp.search(chiffres) === -1){
            objValidation.chiffre = 0;
        }

        // boucle for in qui permet d'itterer dans un objet
        let testAll = 0;
        // on ittere chaque propryete de notre objet, si notre objet de la propriété en cours, donc symbole, lettre et chiffre
        // est sup a 0, on a donc passé la validation, alors testAll ++
        for (const property in objValidation) {
            if (objValidation[property] > 0) {
                testAll ++;
            }
            // si inf a 3, alors afficher le message error
            if (testAll < 3){
                allSpan[2].style.display = "inline";
                allImg[2].style.display = "inline";
                allImg[2].src = "ressources/error.svg";
            }else{ // dans le cas contraire afficher check
                allSpan[2].style.display = "none";
                allImg[2].src = "ressources/check.svg";
            }
        }
    }
    //force mdp 
    //faible
    if(valeurMdp.length <= 6 && valeurMdp.length > 0){
        allLigne[0].style.display = "block";
        allLigne[1].style.display = "none";
        allLigne[2].style.display = "none";
    }else if (valeurMdp.length > 6 && valeurMdp.length <= 9 ){
        //moyen
        allLigne[0].style.display = "block";
        allLigne[1].style.display = "block";
        allLigne[2].style.display = "none";
    }else if (valeurMdp.length > 9){
        //fort
        allLigne[0].style.display = "block";
        allLigne[1].style.display = "block";
        allLigne[2].style.display = "block";
    }
        //Nul
    else if (valeurMdp.length === 0){
        allLigne[0].style.display = "none";
        allLigne[1].style.display = "none";
        allLigne[2].style.display = "none";
    }
});
 //confirmation

 inpConfirme.addEventListener ('input',(event) => {

    if (event.target.value.length === 0) {
        allImg[3].style.display = "inline";     
        allImg[3].src = "ressources/error.svg"; 
    }
     else if (event.target.value === valeurMdp) {
        allImg[3].style.display = "inline";     
        allImg[3].src = "ressources/check.svg"; 
     }else{
        allImg[3].style.display = "inline";
        allImg[3].src = "ressources/error.svg"; 
     }
 });

};