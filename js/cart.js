let urlApi = 'https://oc-devweb-p5-api.herokuapp.com/api/';
let urlDummy = 'https://oc-devweb-p5-api.herokuapp.com/api/cameras/5be1ed3f1c9d44000030b061';

let cart = [];
let sessionKeys = Object.keys(sessionStorage);


getCart();
fillCart();

function getCart () {
    cart = sessionStorage;
    console.log(cart);
    console.log(sessionKeys);
}

function getKey (cartObject) {
    return '' + cartObject.type + '/' + cartObject.id + '/' + cartObject.option;
}

function fillCart () {
    let cartObject;
    for (key of sessionKeys) {
        cartObject = JSON.parse(sessionStorage.getItem(key));
        console.log(cartObject);
        createDivCartObject(cartObject);
    }
}

function createDivCartObject (cartObject) {
    document.getElementById('cart').innerHTML +=
    `<div class="card mb-3 bg-light" style="height: 100%; overflow: hidden;">
        <div class="row no-gutters">
            <div class="col-4">
                <img src="${cartObject.imageUrl}" class="card-img rounded-left" alt="...">
            </div>
            <div class="col-8">
                <div class="card-body">
                    <h5 class="card-title">${cartObject.name}</h5>
                    <p class="card-text">${cartObject.price/100},00 €</p>
                    <span id="quantity-label" class="">
                        Quantité : 
                        <input id="quantityInput" type="number" class="form-control col-2" min="1" max="10" value="${cartObject.quantity}">
                    </span>
                    <p class="">Total : ${(cartObject.price * cartObject.quantity)/100},00 € </p>
                    <p class="btn btn-danger text-right">Supprimer</p>
                </div>
            </div>
        </div>
    </div>`;
}



function deleteFromCart (cartObject) {
    sessionStorage.removeItem(getKey(cartObject));
    Location.reload();
}