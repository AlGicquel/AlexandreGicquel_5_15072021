let urlApi = 'https://oc-devweb-p5-api.herokuapp.com/api/';

let cart = [];

// function addToCart () {
    document.getElementById('addToCart').addEventListener("click", function () {
        console.log('qmlskdjf');
        const productType = new URL(location.href).searchParams.get("productType"); 
        const productId = new URL(location.href).searchParams.get("id");
        fetch(urlApi + productType + '/' + productId)
        .then( function (response) {
            if(response.ok) {
                return response.json();
              } else {
                console.log('Mauvaise réponse du réseau');
              }
        })
        .then( function (product) {
            const option = document.getElementById('option-select').nodeValue;
            const quantity = document.getElementById('quantityInput').nodeValue;
            let cartObject = new CartObject (productType, product, option, quantity);
            console.log(cartObject);
        })

        // let cartObject = {
        //     id= productId,
        //     option = productOption,
        //     qt = quantity
        // }
        // cart.push(cartObject);
    })
// }

function deleteFromCart (productId) {
    for (let i=0 ; i<cart.length ; i++) {
        if (cart[i].id === productId) {
            cart.splice(i,1);
        }
    }
}