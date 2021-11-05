window.onload = function () {

//menu burger

    const nav = () => {
        const burger = document.querySelector(".burger");
        const nav = document.querySelector(".nav_links");
// ecouteur evenement click, au click ajoute la class navactive au css

        burger.addEventListener("click", () => {
            nav.classList.toggle("nav_active");
        })
    }

    nav ();


    //Creation de mes variables
    const allInp = document.querySelectorAll("input");
    const countEl = document.querySelectorAll(".add_order__input > p")
    const addOrder = document.querySelectorAll(".add_order > p > span")
    const total = document.querySelector(".total > p > span")
    const payment = document.querySelector("#paypal-button-container")
    let order = [
        [],
        [],
        [],
        [],       // tab multidimentionnel, un pour chaque item, pizza
        [],
        [],
        []
    ];
    let totalOrder = [0, 0, 0, 0, 0, 0, 0]; // tab des prix totaaux
    let nbOrder;
    let nbTotal;
    count = 0;

// ecouteur evenement click pour tout les inputs
// foreach car seloectoe all renvoi un tableau
    allInp.forEach((element,i) => (element.addEventListener("click", () => {
// element = element sur lequel je click , i = index des elements
                const name = parseInt(element.name) //convertie mes donnees en chiffre
                const item = allInp[i];
                let priceItem = parseInt(item.value)
                const myMap = new Map() // creation de map
                myMap.set(i,priceItem) // remplissage du map, avec i comme key est price item en valeur
                
         
                for (const [key,value] of myMap){  // boucle for of de map
                    if (key === i) { // si ma key === index

                        if (i%2 == 0 ) { // les + sont tous pair
                            addEll(name, value); // fonction ajouter
                            insertEl(name); // fonction affichage des elements
                        }else{ // les - impaire
                            deleteEl(name, value); // fonction enlever
                            insertEl(name); // affichage
                        }  
                    } 
                }
            insertTotal() // fonctions du calcule total
        })))

        //fonction calcule total
    const insertTotal = () => {
        nbTotal = totalOrder.reduce((acc, item) => acc + item, 0) // calcule de la valeur total du tab
        total.innerHTML = nbTotal; // affichage du prix total
        if (nbTotal > 0) { // si le prix sup 0 alors affiche le module paypal
            payment.style.display = "flex";
        } else { // si le prix = 0 alors affiche pas le module paypal
            payment.style.display = "none";
        }
        return nbTotal; // retourne la valeur total pour le paypal
    }
//fonction affichage des elements
    const insertEl = nb => {
        countEl[nb].innerHTML = count; // ajoute le nb de pizza, la longueur du tab
        addOrder[nb].innerHTML = nbOrder; // ajoute la valeur de chaque pizza
    }
// fonction enlever des pizzas
    const deleteEl = (nb, price) => {
        order[nb].pop(price);// enleve des elements de mon tab multidimentionnel a l'index nb, donc le prix
        count = order[nb].length;// longueur du tab pour avoir le nb de pizza
        nbOrder = order[nb].reduce((acc, item) => acc + item, 0)// recalcul resultat apres le retrait 
        totalOrder.splice(nb, 1, nbOrder) //ecrase l'ancien prix dans un nouveau tab total
    }
    // fonction ajouter des pizzas
    const addEll = (nb, price) => {
        order[nb].push(price); // rempli mon tab multidimentionnel a l'index nb, donc le prix
        count = order[nb].length; // longueur du tab pour avoir le nb de pizza
        nbOrder = order[nb].reduce((acc, item) => acc + item, 0) // calcul resultat ajout 
        totalOrder.splice(nb, 1, nbOrder)//ajoute le prix dans un nouveau tab total
    }

// module paypal
    paypal.Buttons({
        createOrder: function (data, actions) {

            // This function sets up the details of the transaction, including the amount and line item details.

            return actions.order.create({

                purchase_units: [{

                    amount: {

                        value: nbTotal // prix total

                    }

                }]

            });
        },
        onApprove: function (data, actions) {

            // This function captures the funds from the transaction.

            return actions.order.capture().then(function (details) {

                // This function shows a transaction success message to your buyer.

                alert('Transaction completed by ' + details.payer.name.given_name);

            });

        }
    }).render('#paypal-button-container');

}
