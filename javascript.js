fetch('https://algicquel.github.io/AlexandreGicquel_5_15072021/api/teddies')
    .then( function (results) {
        // document.getElementById('name').innerHTML = results.json.name.value;
        console.log(results)
    })
    .catch(function (err){
        //catch error
    })