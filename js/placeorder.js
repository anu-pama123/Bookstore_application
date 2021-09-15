function placeorderSwitchVisible() {
    if (document.getElementById('place-order-page')) {

        if (document.getElementById('place-order-page').style.display == 'none') {
            document.getElementById('place-order-page').style.display = 'block';
            document.getElementById('customer-details-page').style.display = 'none';
        }
        else {
            document.getElementById('place-order-page').style.display = 'none';
            document.getElementById('customer-details-page').style.display = 'block';
        }
    }
}

function orderSummerySwitchVisible() {
    if (document.getElementById('customer-details-page')) {

        if (document.getElementById('customer-details-page').style.display == 'none') {
            document.getElementById('customer-details-page').style.display = 'block';
            document.getElementById('order-summery-page').style.display = 'none';
        }
        else {
            document.getElementById('customer-details-page').style.display = 'none';
            document.getElementById('order-summery-page').style.display = 'block';
        }
    }
}  

function orderSuccessfulSwitchVisible() {
    if (document.getElementById('order-summery-page')) {

        if (document.getElementById('order-summery-page').style.display == 'none') {
            document.getElementById('order-summery-page').style.display = 'block';
            document.getElementById('order-placed-section').style.display = 'none';
        }
        else {
            document.getElementById('order-summery-page').style.display = 'none';
            document.getElementById('order-placed-section').style.display = 'block';
        }
    }
}  