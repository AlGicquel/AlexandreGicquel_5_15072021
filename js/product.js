let urlDummie = 'https://oc-devweb-p5-api.herokuapp.com/api/cameras/5be1ed3f1c9d44000030b061';
let urlApi = 'https://oc-devweb-p5-api.herokuapp.com/api/';
const urlLocal = 'http://localhost:3000/api/';


//Récupère les données de l'url
const productType = new URL(location.href).searchParams.get("productType"); 
const productId = new URL(location.href).searchParams.get("id");

// Récupère les données dans le panier
// let productsJSON = [];


//Crée l'url où faire la requête à l'api
function getUrl () {
    return urlApi + productType + '/' + productId;
}

//Se sert des données de l'url pour afficher un nom d'option personnalisé selon le type de produit
function displayOptions (product) {
    let optionArray = [];
    //Determine le type de produit
    if (productType === 'cameras') {
        optionArray = product.lenses;
        document.getElementById('option-label').innerHTML = 'Lentille : ';
    } else if (productType === 'teddies') {
        optionArray = product.colors;
        document.getElementById('option-label').innerHTML = 'Couleurs : ';
    } else if (productType === 'furniture') {
        optionArray = product.varnish;
        document.getElementById('option-label').innerHTML = 'Vernis : ';
    }
    //Remplie le select avec les option propres au produit produit
    let optionSelect = document.getElementById('option-select');
    for (let i = 0 ; i<optionArray.length ; i++){
        optionSelect.innerHTML += `<option value="${i}">${optionArray[i]}</option>`;
    }
}

//gère l'affichage
function getById(url) {
    //récupère les données sur l'api
    fetch(url)
    .then( function (response) {
        if(response.ok) {
            return response.json();
          } else {
            console.log('Mauvaise réponse du réseau');
          }
    })
    //Affiche les données
    .then( function (value) {
        // console.log(value);
        document.getElementById('productImg').src = value.imageUrl;
        document.getElementById('productName').innerHTML = value.name;
        document.getElementById('productDesc').innerHTML = value.description;
        document.getElementById('productPrice').innerHTML = "" + value.price/100 + ",00 €";
        displayOptions(value);
        setupAddToCart(value);
    })
}

// Paramètre le bonton "ajouter au panier" en prenant en compte la quantité
function setupAddToCart (product) {
    document.getElementById('addToCart').addEventListener("click", function () {

        let productsArr = [];
        let productsJSON = localStorage.getItem('products');
        if (productsJSON === null) {
            addToCart(product, productsArr);
            localStorage.setItem('products', JSON.stringify(productsArr));
        } else {
            productsArr = JSON.parse(productsJSON);
            addToCart(product, productsArr);
            productsJSON = JSON.stringify(productsArr);
            localStorage.setItem('products', productsJSON);
        }
        alert('Votre produit a bien été ajouté au panier.');
        // console.log(localStorage);
    })
}

// Ajoute le produit au panier
function addToCart (product, productsArr) {
    let quantity = document.getElementById('quantityInput').value;
    for (let i = 0; i<quantity; i++) {
        productsArr.push(product);
    }
}


getById(getUrl());