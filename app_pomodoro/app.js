window.onload = function (){
const affichageTravail = document.querySelector('.affichageT');
const affichagePause = document.querySelector('.affichageP');
const btnGo = document.querySelector('.b1');
const btnPause = document.querySelector('.b2');
const btnReset = document.querySelector('.b3');
const cycles = document.querySelector('h2');
//checkinterval pour eviter de lancer plusieurs intervals
let checkInterval = false;
let tempsInitial = 1800;
let tempsDeRepos = 300;
let pause = false;
let nbDeCycles = 0;
cycles.innerText = `Nombre de cycles ${nbDeCycles}`;

// affichage des données
// utilisation des template literales
// converti les seconde en minutes
//operation ternaire, esque modulo 60 est >10
affichageTravail.innerText = `${Math.trunc(tempsInitial/60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;
affichagePause.innerText = `${Math.trunc(tempsDeRepos/60)} : ${(tempsDeRepos % 60 < 10) ? `0${tempsDeRepos % 60}` : tempsDeRepos % 60}`;

// selection du bouton 
btnGo.addEventListener('click', () => {
    //evite le spamer le bouton
    if(checkInterval === false) {

    checkInterval = true;

// initialisation du compteur
    tempsInitial--;
    affichageTravail.innerText = `${Math.trunc(tempsInitial/60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;
// permet de lancer une action différé dans le temps qui peut ce repeter
    let timer = setInterval(() => {

        // lance le timer initiale et pause de faire pause...
        if( pause === false && tempsInitial > 0) {
            tempsInitial--;
            affichageTravail.innerText = `${Math.trunc(tempsInitial/60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;
        } 
        // repos est = a 0 et initiale aussi, incremente un cycle
        else if (pause === false && tempsDeRepos === 0 && tempsInitial === 0) {
            tempsInitial = 1800;
            tempsDeRepos = 300;
            nbDeCycles++;
            cycles.innerText = `Nombre de cycles ${nbDeCycles}`;
            affichageTravail.innerText = `${Math.trunc(tempsInitial/60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;
            affichagePause.innerText = `${Math.trunc(tempsDeRepos/60)} : ${(tempsDeRepos % 60 < 10) ? `0${tempsDeRepos % 60}` : tempsDeRepos % 60}`;
        }
         // si j'ai plus de timer initial, lance le repos
        else if (pause === false && tempsInitial === 0) {
            tempsDeRepos--;
            affichagePause.innerText = `${Math.trunc(tempsDeRepos/60)} : ${(tempsDeRepos % 60 < 10) ? `0${tempsDeRepos % 60}` : tempsDeRepos % 60}`;

        } 
        
    }, 1000)

    // Reset 
    //clear iterval arrete l'interval
    btnReset.addEventListener('click', () => {
        clearInterval(timer);
        checkInterval = false;
        tempsInitial = 1800;
        tempsDeRepos = 300;
        affichageTravail.innerText = `${Math.trunc(tempsInitial/60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;
        affichagePause.innerText = `${Math.trunc(tempsDeRepos/60)} : ${(tempsDeRepos % 60 < 10) ? `0${tempsDeRepos % 60}` : tempsDeRepos % 60}`;
    })

    } else {
        return;
    }
})
// recupere le bouton pause
btnPause.addEventListener('click', () => {
    //change le bouton pause en play
    if(pause === false){
        btnPause.innerText = "Play";
    } else if(pause === true){
        btnPause.innerText = "Pause";
    }
    //pause = inverse de pause si pause est true alors pause deviens false ect...
    pause = !pause;
    
})

}