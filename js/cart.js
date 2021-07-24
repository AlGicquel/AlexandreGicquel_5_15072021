let urlApi = 'https://oc-devweb-p5-api.herokuapp.com/api/';
let urlDummy = 'https://oc-devweb-p5-api.herokuapp.com/api/cameras/5be1ed3f1c9d44000030b061';

let products = [];



getCart();
fillCart();

//Récupère le panier et le stock dans un tableau products
function getCart () {
    products = JSON.parse(sessionStorage.getItem('products'));
    console.log(products);
}

// Crée une cart pour chaque element du tableau products
function fillCart () {
    document.getElementById('total-article').innerHTML = `Nombre total d'article(s) : ${products.length}`;
    document.getElementById('total-price').innerHTML = `Prix Total : ${calculateTotalPrice()},00 €`;
    document.getElementById('cart').innerHTML = '';
    for (product of products) {
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
                    <p class="card-text">Quantité : </p>
                    <p class="card-text">Total : ,00 € </p>
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

function calculateTotalPrice () {
    let totalPrice = 0;
    for (product of products) {
        totalPrice += product.price;
    }
    return totalPrice/100;
}