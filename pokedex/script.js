window.onload = function (){
keyAPI = "https://pokeapi.co/api/v2/pokemon";
let allPokemon = [];
let tableauFin = [];
const searchInput = document.querySelector('.recherche-poke input');
const listePoke = document.querySelector('.liste-poke');
const chargement = document.querySelector('.loader');

const types = {
    grass: '#78c850',
	ground: '#E2BF65',
	dragon: '#6F35FC',
	fire: '#F58271',
	electric: '#F7D02C',
	fairy: '#D685AD',
	poison: '#966DA3',
	bug: '#B3F594',
	water: '#6390F0',
	normal: '#D9D5D8',
	psychic: '#F95587',
	flying: '#A98FF3',
	fighting: '#C25956',
    rock: '#B6A136',
    ghost: '#735797',
    ice: '#96D9D6'
};

function AppelAPI (){

    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then ((reponse)=>{
            return reponse.json();
        })
        .then ((data) => {
            data.results.forEach(pokemon => {
                fetchPokemonComplet (pokemon);
            });
        })

}
AppelAPI();

// pour recuperer le nom des pokemons en fr, les images et les types
function fetchPokemonComplet(pokemon) {

    //objet qui va contenir mes pokemons
    let objPokemonFull = {};

    let url = pokemon.url;
    let nameP = pokemon.name;

    // recuperation des sprites et des types
    fetch(url)
    .then ((reponse) => {
        return reponse.json();
    })
    .then ((pokeData) => {
        //ajout de propriété dans mon objet 
        objPokemonFull.picture = pokeData.sprites.front_default;
        objPokemonFull.type = pokeData.types[0].type.name;
        objPokemonFull.id = pokeData.id;
    })

    // recuperation du nom en fr
    fetch (`https://pokeapi.co/api/v2/pokemon-species/${nameP}`)
    .then ((reponse) => {
        return reponse.json();
    })
    .then ((pokedata) => {
        objPokemonFull.name = pokedata.names[4].name;
        allPokemon.push (objPokemonFull);

    //recupere les 21 premier dans l'ordre
        if (allPokemon.length === 151) {
    // sort() permet de comparer un elements avec tous les autres et de la placer avant ou apres
    // ou ne pas bouger,puis on fait la méme avec le second
            tableauFin = allPokemon.sort((a,b) => {
                return a.id - b.id;
            }).slice(0,21);    // recupere les 21 premiers pokemons dans un nouveau tableau
            createCard (tableauFin); // fonction creer les cartes
            chargement.style.display = "none";
        }
    }) 
}

// creation des cartes

function createCard(arr) {
    for (let i = 0; i < arr.length; i++) {
        
        // creation du li
        const carte = document.createElement("li");
        //type du poke
        let couleur = types[arr[i].type];
        carte.style.background = couleur;
        //nom du poke
        const txtCarte = document.createElement("h5");
        txtCarte.innerHTML = arr[i].name;
        //id
        const idCarte = document.createElement ("p")
        idCarte.innerHTML = arr[i].id;
        //img
        const imgCarte = document.createElement ("img")
        imgCarte.src = arr[i].picture;

        // ajoute des enfants a li donc carte
        carte.appendChild (imgCarte);
        carte.appendChild (txtCarte);
        carte.appendChild (idCarte);
        // ajoute un enfant a la liste
        listePoke.appendChild (carte);

    }
}

// Scroll Infini
 //ecoite de l'objet window objet global
window.addEventListener ("scroll", () => {
    // dans documentelement jai mes parametres scrollTop ...
    //scroll top = scroller depuis notre top
    //scrollHeight = la hauteur totale du site
    //clienHeuight= hauteur de la fenetre
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    console.log (scrollHeight,scrollTop,clientHeight)

    if (clientHeight + scrollTop >= scrollHeight - 20) {
        addPoke (6);
    }
})

let index = 21;
function addPoke (nb){
    if (index > 151) {
        return
    }
    //Morceau de tableau que je souhaite afficher
    //6 prochain poke depuis mon all pokemon
    const arrToAdd = allPokemon.slice(index, index + nb);
    createCard (arrToAdd)
    index += nb;
}

//Recherche
searchInput.addEventListener ("keyup",recherche);

    function recherche() {
        
        if (index < 151)
        addPoke (130);
    
    
        let filter, allLi, titleValue, allTitles;

        // pour eviter les erreurs de lettre en min ou maj
        filter = searchInput.value.toUpperCase();
        allLi = document.querySelectorAll ("li");
        allTitles = document.querySelectorAll ("li > h5")

        for (let i = 0; i< allLi.length; i++) {
        
            titleValue = allTitles[i].innerHTML;

            if (titleValue.toUpperCase().indexOf(filter) > -1) {
                allLi[i].style.display = "flex";
            } else {
                allLi[i].style.display = "none";
            }
        }
    }



    searchInput.addEventListener ("input",function (event){
        if (event.target.value !== ""){
            event.target.parentNode.classList.add ("active-input");
        }else if (event.target.value === ""){
            event.target.parentNode.classList.remove ("active-input");
        }
})
}