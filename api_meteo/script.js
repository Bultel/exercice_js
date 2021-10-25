import tabJoursEnOrdre from "./gestionTemps.js"

const APIKEY = "964089612635c019676c04adc2cbcc96";
let resultatsAPI;
const temps = document.querySelector (".temps");
const temperature = document.querySelector (".temperature");
const localisation = document.querySelector (".localisation");
const imgIcone = document.querySelector (".logo_meteo");
const chargementContainer = document.querySelector (".overlay_icone__chargement")
// querySelectorALL retourne un tableau
const heure = document.querySelectorAll (".heure_nom__prevision");
const tempPourH = document.querySelectorAll (".heure_prevision_valeur");
const joursDiv = document.querySelectorAll (".jour_prevision__nom");
const tempJoursDiv = document.querySelectorAll (".jour_prevision__temp");

// permet de recuperer la geoloc du navigateur
if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long, lat)
    }, () =>{
        alert ("Vous avez refusé la geolocalisation")
    })
}


function AppelAPI (long, lat){
    // fetch permet de faire des requetes HTTP, prend les données depuis les API
    fetch (`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${APIKEY}`)
    // fetch retourne une promesse, elle va se resoudre lorsque notre requete se sera bien effectué 
    // then prend la reponse de la promesse donc de l'API
    .then((reponse) =>{
        return reponse.json();
    })
    // convertie mes donées API en format JSON
    .then((data)=>{
        console.log (data);
        resultatsAPI = data;
        // recupere le temps dans l'API, j'ai juste exploré le console log.
        temps.innerText = resultatsAPI.current.weather[0].description;
        temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`;
        // Math.trunc enleve les chiffres apres la virgule
        localisation.innerText = resultatsAPI.timezone;

        // les heures par tranche de 3 avec leurs temperatures
        let heureActuelle = new Date().getHours (); // pour recuperer l'heure actuel

        for (let i = 0; i < heure.length; i++){

            let heureIncr = heureActuelle + i*3;
            // pour convertir en heures "normal"
            if (heureIncr > 24){
                heure[i].innerHTML = `${heureIncr - 24} h`
            }else if (heureIncr === 24){
                heure[i].innerHTML = "00 h";
            }else {
                heure[i].innerHTML = `${heureIncr} h`;
            }
        }

        //temp par tranche de 3h
        for (let i = 0; i < tempPourH.length; i++){
            
            tempPourH[i].innerHTML = `${Math.trunc(resultatsAPI.hourly[i*3].temp)}°`
        }

        //trois premieres lettres des jours

        for (let i = 0; i < tabJoursEnOrdre.length; i++){
            joursDiv[i].innerHTML = tabJoursEnOrdre[i].slice(0,3);
        }

        //Temps par jour
        for (let i = 0; i < 7; i++){
            tempJoursDiv[i].innerHTML = `${Math.trunc(resultatsAPI.daily[i+1].temp.day)}°`
        }

        //Icone dynamique
        if (heureActuelle >=6 && heureActuelle <21) {
            imgIcone.src = `ressources/jour/${resultatsAPI.current.weather[0].icon}.svg`
        } else{
            imgIcone.src = `ressources/jour/${resultatsAPI.current.weather[0].icon}.svg`
        }

        chargementContainer.classList.add('disparition');
    })
}