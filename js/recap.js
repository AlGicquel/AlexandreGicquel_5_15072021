console.log(sessionStorage)
document.getElementById('orderId').innerHTML = sessionStorage.orderId;
document.getElementById('totalPrice').innerHTML = sessionStorage.totalPrice;
sessionStorage.clear()