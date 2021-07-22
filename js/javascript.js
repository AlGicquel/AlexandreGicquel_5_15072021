const urlCameras = 'https://oc-devweb-p5-api.herokuapp.com/api/cameras';
const urlTeddies = 'https://oc-devweb-p5-api.herokuapp.com/api/teddies';
const urlFurniture = 'https://oc-devweb-p5-api.herokuapp.com/api/furniture';


function createDiv(divId, product) {
    
    document.getElementById(divId).innerHTML+=
    
    '<div class="card bg-light col-lg-6 col-xl-4 mt-2 px-0">'+
        '<a class="stretched-link" href="pages/product.html?productType=' + divId + '&id=' + product._id + '"></a>'+
            '<img class=”card-img-top rounded-top” src="' + product.imageUrl + '" alt=” ”>'+
            '<div class="card-body">'+
                '<h5 class="card-title">' + product.name + '</h5>'+
                '<h6 class="card-text">' + product._id + '</h6>'+
                '<p class="card-text text-right">' + product.price + '€</p>'+
            '</div>'+
        ''+
    '</div>';
}

function createDivJS (divId, product) {
    document.getElementById(divId)
}

function rewritePrice (price){
    return "" + price/100 + ",00 ";
}

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
        console.log(value);
        let list = value;
        for (let element of list){
            createDiv(divId, element);
        }
    })
    .catch(function (err){
        //catch error
        console.error(err);
    })
}

getAll(urlCameras, 'cameras');
getAll(urlTeddies, 'teddies');
getAll(urlFurniture, 'furniture');