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
});















};