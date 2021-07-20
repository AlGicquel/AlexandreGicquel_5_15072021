let url = 'https://oc-devweb-p5-api.herokuapp.com/api/cameras/5be1ed3f1c9d44000030b061';

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

getById(url);