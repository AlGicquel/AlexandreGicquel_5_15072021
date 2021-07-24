let urlApi = 'https://oc-devweb-p5-api.herokuapp.com/api/';
let urlDummy = 'https://oc-devweb-p5-api.herokuapp.com/api/cameras/5be1ed3f1c9d44000030b061';

let products = [];
let productsFiltered = [];


getCart();
createMapWithQuantity();
filterProducts();
fillCart();

//Récupère le panier et le stock dans un tableau products
function getCart () {
    products = JSON.parse(sessionStorage.getItem('products'));
    console.log('products',products);
}

// Crée une cart pour chaque element du tableau products
function fillCart () {
    document.getElementById('total-article').innerHTML = `Nombre total d'article(s) : ${products.length}`;
    document.getElementById('total-price').innerHTML = `Prix Total : ${calculateTotalCart()},00 €`;
    document.getElementById('cart').innerHTML = '';
    for (product of productsFiltered) {
        createDivCartObject(product);
        //document.getElementById(`delete-${getKey(cartObject)}`).addEventListener('click', deleteFromCart(getKey(cartObject)))
    }
}

//Crée une carte du panier
function createDivCartObject (product) {
    document.getElementById('cart').innerHTML +=
    `<div class="card mb-3 bg-light" style="height: 100%; overflow: hidden;" id="${product._id}">
        <div class="row no-gutters">
            <div class="col-4">
                <img src="${product.imageUrl}" class="card-img rounded-left" alt="...">
            </div>
            <div class="col-8">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.price/100},00 €</p>
                    <p class="card-text">Quantité : ${sessionStorage.getItem(product._id)}</p>
                    <p class="card-text">Total : ${calculateTotalPrice(product)},00 € </p>
                    <p class="btn btn-danger text-right" id="delete-${product._id}">Supprimer</p>
                </div>
            </div>
        </div>
    </div>`;

}



function deleteFromCart (objectKey) {
    sessionStorage.removeItem(objectKey);
    // document.getElementById(objectKey).innerHTML = '';
    //fillCart();
}

//Calcule le prix total du panier
function calculateTotalCart () {
    let totalPrice = 0;
    for (product of products) {
        totalPrice += product.price;
    }
    return totalPrice/100;
}

function calculateTotalPrice (product) {
    let quantity = JSON.parse(sessionStorage.getItem(product._id));
    return quantity * product.price / 100;

}

//Crée une element de session storage avec en clé l'id de chaque element du panier et en valeur sa quantité
function createMapWithQuantity () {
    clearSession();
    for (product of products) {
        let productId = sessionStorage.getItem(`${product._id}`)
        if (productId === null) {
            sessionStorage.setItem(`${product._id}`, '1')
        } else {
            let quantity = JSON.parse(productId);
            quantity++;
            sessionStorage.setItem(`${product._id}`, `${quantity}`)
        }
    }
    console.log("SessionStorage : ",sessionStorage)
}

//retire de la session storage toutes les clés de quantité
//utilisée pour ne pas doubler les quantités a chaque refresh
function clearSession () {
    for (product of products) {
        sessionStorage.removeItem(product._id)
    }
}

//crée une liste de produits filtrés pour un meilleur affichage
function filterProducts () {
    for (product of products) {
        if (!isIncludedInProductsFiltered(product._id)) {
            productsFiltered.push(product)
        }
    }
    console.log("productsFiltered : ",productsFiltered)
}

//verifie si l'id est déjà dans la liste productsFiltered
//.includes() ne fonctionne pas avec les objets
function isIncludedInProductsFiltered (id) {
    let result = false;
    for(productFiltered of productsFiltered) {
        if (id === productFiltered._id) {
            result = true;
        }
    }
    return result;
}