let url = 'https://oc-devweb-p5-api.herokuapp.com/api/cameras/5be1ed3f1c9d44000030b061';
let url2 = 'https://oc-devweb-p5-api.herokuapp.com/api/';

function getUrl () {
    const productType = new URL(location.href).searchParams.get("productType");
    const productId = new URL(location.href).searchParams.get("id");
    return url2 + productType + '/' + productId;
}

function getById(url) {
    fetch(url)
    .then( function (response) {
        console.log(response);

        if(response.ok) {
            return response.json();
          } else {
            console.log('Mauvaise réponse du réseau');
          }
    })
    .then( function (value) {
        console.log(value);
        document.getElementById('productImg').src = value.imageUrl;
        document.getElementById('productName').innerHTML = value.name;
        document.getElementById('productDesc').innerHTML = value.description;
        document.getElementById('productPrice').innerHTML = "" + value.price/100 + ",00€";
    })
}

console.log(getUrl());
getById(url);