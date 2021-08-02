console.log(localStorage);

let orderId = localStorage.getItem('orderId');

if (orderId === null) {
    document.getElementById('recap').style.display = 'none';
    document.getElementById('oops').style.display = 'block';
} else {
    document.getElementById('orderId').innerHTML = localStorage.orderId;
    document.getElementById('totalPrice').innerHTML = localStorage.totalPrice;
    localStorage.clear()
    document.getElementById('recap').style.display = 'block';
    document.getElementById('oops').style.display = 'none';
}