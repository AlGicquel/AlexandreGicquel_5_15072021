let url = 'https://algicquel.github.io/AlexandreGicquel_5_15072021/back/routes/camera/';
let url2 = 'http://localhost:3000/api/cameras';
let url3 = 'https://algicquel.github.io/AlexandreGicquel_5_15072021/back/api/cameras'
let url4 = 'https://oc-devweb-p5-api.herokuapp.com/api/cameras';
let url5 = 'https://oc-devweb-p5-api.herokuapp.com/api/teddies';
let url6 = 'https://oc-devweb-p5-api.herokuapp.com/api/furniture';

let urlImg = 'https://m.media-amazon.com/images/I/71yf785aBmL._AC_SX450_.jpg';

function createDiv(divId, productName, productPrice, productDesc, productId, imgUrl) {
    
    document.getElementById(divId).innerHTML+=
    // '<div id="" class="col"><span class="label-name">Name: </span><span class="name">'+productName+'</span></div>'+
    // '<div id="" class="col"><span class="label-price">Price: </span><span class="price">'+productPrice+'€</span></div>'+
    // '<div id="" class="col"><span class="label-description">Description: </span><span class="description">'+productDesc+'</span></div>';
    '<div class="card bg-light col-lg-6 col-xl-4 mt-2">'+
        '<a class="stretched-link" href="pages/product.html"></a>'+
            '<img class=”card-img-top img-fluid” src=' + imgUrl + ' alt=”' + productDesc + '”>'+
            '<div class="card-body">'+
                '<h5 class="card-title">' + productName + '</h5>'+
                '<h6 class="card-text">' + productId + '</h6>'+
                '<p class="card-text text-right">' + productPrice + '€</p>'+
            '</div>'+
        ''+
    '</div>';
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
            createDiv(divId, element.name, rewritePrice(element.price), element.description, element._id, element.imageUrl);
        }
    })
    .catch(function (err){
        //catch error
        console.error(err);
    })
}

getAll(url4, 'cameras');
getAll(url5, 'teddies');
getAll(url6, 'furniture');