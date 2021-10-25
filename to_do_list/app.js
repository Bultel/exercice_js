const form = document.querySelector('form');
const liste = document.querySelector('ul');
const input = document.querySelector('form input');
let toutesLesTaches = [];

form.addEventListener('submit', event => {
  event.preventDefault();

  const text = input.value.trim();  // enleve les espaces avant et apres le texte
  if(text !== ''){
    rajouterUneTache(text);
    input.value = '';
  }
})

// pour ajouter une tache
function rajouterUneTache(text) {

  //objet todo qui contient le texte et l'id unique
  const todo = {
    text,
    // La méthode Dat.now() renvoie le nb de millisecondes écoulées depuis le 1er janvier 1970
    id: Date.now()
  }
  afficherListe(todo);
}

// pour afficher ma liste
function afficherListe(todo) {

  const item = document.createElement('li');
  item.setAttribute('data-key', todo.id);  // data-key vaut todo.id

  const input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  input.addEventListener('click', tacheFaite);  // declanche la fonction tache faite
  item.appendChild(input);

  const txt = document.createElement('span'); // ajoute le texte
  txt.innerText = todo.text;
  item.appendChild(txt);

  const btn = document.createElement('button');
  btn.addEventListener('click', supprimerTache); // declanche supprimer tache
  const img = document.createElement('img');
  img.setAttribute('src', 'ressources/fermer.svg');
  btn.appendChild(img);
  item.appendChild(btn);


  liste.appendChild(item);  //ajoute le li a ul
  toutesLesTaches.push(item); // ajoute au tableau, permet de supprimer plus facilement les elements
  console.log(toutesLesTaches);
}

function tacheFaite(event) {
  event.target.parentNode.classList.toggle('finDeTache') //ajoute et enleve la class findetache (item barré)
}

function supprimerTache(event) {

  toutesLesTaches.forEach(el => {  //liste tout les elements du tableau
      //si se sur quoi je click, le parent (li) son id
    if(event.target.parentNode.getAttribute('data-key') === el.getAttribute('data-key')){
      el.remove(); // supprime les IDs egaux
      // filtre les elements supprimé du tableau
      toutesLesTaches = toutesLesTaches.filter(li => li.dataset.key !== el.dataset.key);
      // garde tout les li avec un id different entre eux
    }

  })

}