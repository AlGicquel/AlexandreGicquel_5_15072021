let urlApi = 'https://oc-devweb-p5-api.herokuapp.com/api/';
const urlLocal = 'http://localhost:3000/api/';

// Liste de produits a envoyer
let products = [];
// Liste de produits a afficher
let productsFiltered = [];

coreFunction();

// Fonction principale qui appelle toutes les autres pour la mise en page
function coreFunction () {
    getCart();
    if (products !== null) {
        isCartEmpty(false);
        createMapWithQuantity();
        filterProducts();
        fillCart();
        initiateSubmit();
        initiateClearCart();
    } else {
        isCartEmpty(true);
    }
}

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
                    <button 
                        class="btn btn-danger text-right" 
                        id="delete-${product._id}"
                        onclick="deleteItem(${product._id})">
                            Supprimer
                    </button>
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
    console.log("SessionStorage : ", sessionStorage)
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

//construit les fonctionnalité du bouton submit
function initiateSubmit () {
    document.getElementById('submit').addEventListener('click', function (event) {
        //empèche la redirection
        event.preventDefault();
        console.log('bouton cliqué');

        //crée l'objet contact
        let contact = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value
        } 

        //boucle sur la liste de products pour en créer une nouvelle qui recupère seulement les ID
        let productId = [];
        for (product of products) {
            productId.push(product._id);
        }
        console.log('productID',productId)

        //crée l'objet order à mettre en body de la requête
        let order = {
            contact : contact,
            products : productId
        }

        console.log('order',order);
        console.log('orderJSON', JSON.stringify(order))

        if (testContact(contact)){

            fetch(urlApi+'cameras/order', {
                method: "POST",
                headers: {
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            })
            .then(
                function(res) {
                    if (res.ok) {
                        console.log('ok')
                        return res.json();
                } else {
                    console.log(res)
                    console.log('Mauvaise réponse du serveur.')
                }
            }
            )
            .catch(function (err) {
                console.log(err)
            })
            .then(function(value) {
                console.log(value);
                // sessionStorage.clear();
                sessionStorage.setItem('orderId', value.orderId)
                sessionStorage.setItem('totalPrice', calculateTotalCart());
                sessionStorage.setItem('totalNumber', products.length)
                console.log(sessionStorage);
                document.location.href = 'confirmation.html';
            });
        } else {
            alert('Les données de contact saisies sont incorrects.')
        }
        
    })
}

function initiateClearCart () {
    document.getElementById('clearCart').addEventListener('click', function () {
        console.log('button clicked')
        sessionStorage.clear();
        coreFunction();

    })
}

function isCartEmpty (bool) {
    if (bool) {
        document.getElementById('cart-container').style.display = 'none';
        document.getElementById('emptyCart').style.display = 'block';
    } else {
        document.getElementById('cart-container').style.display = 'block';
        document.getElementById('emptyCart').style.display = 'none';
    }

}

function deleteItem (id) {
    console.log('deleteitem clicked')
    for (let i=0; i<products.length; i++) {
        if (product._id === id) {
            products.splice(i,1);
        }
    }
    sessionStorage.setItem('products', JSON.stringify(products));
    coreFunction();
}

function testContact (contact) {
    const testName = /[A-Za-z éèçàêëñöùä\-]/;
    const testZip = /[0-9]{5}/;
    const testAddress = /(^[0-9]{1,4})([A-Za-z éèçàêëñöùä\-]{1,100})/;
    const testEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (testName.test(contact.firstName) &&
            testName.test(contact.lastName) &&
            testZip.test(contact.city) &&
            testAddress.test(contact.address) &&
            testEmail.test(contact.email)
        )
        {
            return true;
    } else {
        return false;
    }
}