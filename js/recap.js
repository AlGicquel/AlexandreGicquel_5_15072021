console.log(localStorage)
document.getElementById('orderId').innerHTML = localStorage.orderId;
document.getElementById('totalPrice').innerHTML = localStorage.totalPrice;
localStorage.clear()