const urlCameras = 'https://oc-devweb-p5-api.herokuapp.com/api/cameras';
const urlTeddies = 'https://oc-devweb-p5-api.herokuapp.com/api/teddies';
const urlFurniture = 'https://oc-devweb-p5-api.herokuapp.com/api/furniture';
const urlLocal = 'http://localhost:3000/api/';


// Crée une div cart pour chaque element récupéré
function createDiv(divId, product) {
    document.getElementById(divId).innerHTML+=
    `<div class="col-md-6 col-xl-4 mt-2">
        <div class="card bg-light  px-0">
            <a class="stretched-link" href="pages/product.html?productType=${divId}&id=${product._id}"></a>
            <img class="card-img-top rounded-top" src="${product.imageUrl}" alt="${product.description}">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <h6 class="card-text">${product._id}</h6>
                <p class="card-text text-right">${product.price/100},00 €</p>
            </div>
        </div>
    </div>`;
}


// Récupère les données de l'api
function getAll (url, divId) {
    fetch(url)
    .then( function (response) {
        if(response.ok) {
            return response.json();
          } else {
            console.log('Mauvaise réponse du réseau');
          }
    })
    .then(function (value){
        for (let element of value){
            createDiv(divId, element);
        }
    })
    .catch(function (err){
        //catch error
        console.error(err);
    })
}

// importe les trois types de listes
getAll(urlCameras, 'cameras');
// getAll(urlTeddies, 'teddies');
// getAll(urlFurniture, 'furniture');
// getAll(urlLocal + 'cameras', 'cameras');
// getAll(urlLocal + 'teddies', 'teddies');
// getAll(urlLocal + 'furniture', 'furniture');
