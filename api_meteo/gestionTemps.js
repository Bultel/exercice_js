const jourSemaine = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];

let aujoudhui = new Date();
// objet options pour pouvoir utiliser la methode toLocaleDateString
let options = {weekday: 'long'};
// toLocaleDateString récupere la date en fr
let jourActuel = aujoudhui.toLocaleDateString ('fr-FR', options);
console.log (jourActuel);

//On prend la premiere lettre, on la met en majuscule, est on ajoute le reste du mot
jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);

// oN decoupe ce tableau, il faut un debut et une fin, le debut c'est l'index du jour actuel
//ensuite je concat une nouvelle portion du tableau de base de l'index 0 jusqu'au jour actuel 
let tabJoursEnOrdre = jourSemaine.slice(jourSemaine.indexOf(jourActuel)).concat (jourSemaine.slice(0,jourSemaine.indexOf(jourActuel)));

//export de mon element 
export default tabJoursEnOrdre