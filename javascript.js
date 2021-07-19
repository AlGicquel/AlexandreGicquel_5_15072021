let url = 'https://algicquel.github.io/AlexandreGicquel_5_15072021/back/routes/camera/';
let url2 = 'http://localhost:3000/api/cameras';
let url3 = 'https://algicquel.github.io/AlexandreGicquel_5_15072021/back/api/cameras'
let url4 = 'https://oc-devweb-p5-api.herokuapp.com/api/cameras';

function createDiv(productName, productPrice, productDesc) {
    document.getElementById('cameras').innerHTML+=
    '<div id=""><span class="label-name">Name: </span><span class="name">'+productName+'</span></div>'+
    '<div id=""><span class="label-price">Price: </span><span class="price">'+productPrice+'€</span></div>'+
    '<div id=""><span class="label-description">Description: </span><span class="description">'+productDesc+'</span></div>';
}

fetch(url4)
    .then( function (response) {
        // document.getElementById('name').innerHTML = results.json().name.value;
        if(response.ok) {
            // console.log(response.json());
            return response.json();
          } else {
            console.log('Mauvaise réponse du réseau');
          }
        

    })
    .then(function (value){
        console.log(value);
        let cameras = value;
        for (let camera of cameras){
            createDiv(camera.name, camera.price, camera.description);
        }
    })
    .catch(function (err){
        //catch error
        console.error(err);
    })