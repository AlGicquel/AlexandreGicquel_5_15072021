

let urlDummie = 'https://oc-devweb-p5-api.herokuapp.com/api/cameras/5be1ed3f1c9d44000030b061';
let urlApi = 'https://oc-devweb-p5-api.herokuapp.com/api/';
const productType = new URL(location.href).searchParams.get("productType"); 
const productId = new URL(location.href).searchParams.get("id");

function getUrl () {
    // productType = new URL(location.href).searchParams.get("productType");
    // productId = new URL(location.href).searchParams.get("id");
    return urlApi + productType + '/' + productId;
}

function displayOptions (product) {
    let optionArray = [];
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
    let optionSelect = document.getElementById('option-select');
    for (let i = 0 ; i<optionArray.length ; i++){
        optionSelect.innerHTML += `<option value="${i}">${optionArray[i]}</option>`;
    }
}

function getById(url) {
    fetch(url)
    .then( function (response) {
        // console.log(response);
        if(response.ok) {
            return response.json();
          } else {
            console.log('Mauvaise réponse du réseau');
          }
    })
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

function getKey (cartObject) {
    return '' + cartObject.type + '/' + cartObject.id + '/' + cartObject.option;
}

function addToCart (cartObject) {
    // let sessionStorage = new Storage ();
    sessionStorage.setItem(getKey(cartObject), JSON.stringify(cartObject));
    // alert('Le produit a bien été ajouté a votre panier.')
    // console.log(sessionStorage);
    
}

function setupAddToCart (product) {
    document.getElementById('addToCart').addEventListener("click", function () {
        const option = parseInt(document.getElementById('option-select').value);
        const quantity = parseInt(document.getElementById('quantityInput').value);
        let cartObject = new CartObject (productType, product, option, quantity);
        // console.log(cartObject);
        checkCart(cartObject);
    })
}


function checkCart (cartObject) {
    let newCartObject = sessionStorage.getItem(getKey(cartObject));
    // console.log(newCartObject);
    // console.log(sessionStorage);
    // console.log(JSON.parse(newCartObject));

    if (newCartObject === null) {
        addToCart(cartObject);
    } else {
        // console.log(JSON.parse(newCartObject));
        let newCartObjectJS = JSON.parse(newCartObject);
        newCartObjectJS.quantity += cartObject.quantity;
        console.log(newCartObjectJS);
        addToCart(newCartObjectJS);

        
    }

}



// console.log(getUrl());
getById(getUrl());











class CartObject {
    

    constructor (type, element, option, quantity) {
        this.type = type;
        this.id = element._id;
        this.name = element.name;
        this.descritpion = element.description;
        this.price = element.price;
        this.imageUrl = element.imageUrl;
        this.option = option;
        this.quantity = quantity;
    }

    getType() {
        return this.type;
    }

    getId() {
        return this.id;
    }

    getImgUrl() {
        return this.imageUrl;
    }

    getQuantity() {
        return this.quantity;
    }

    setQuantity(qt) {
        this.quantity = qt;
    }


}