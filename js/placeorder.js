let cartItemList = [];
const imageList = ["../assets/dashboard/img1.png", "../assets/dashboard/img2.png", "../assets/dashboard/img3.png",
                   "../assets/dashboard/img4.png", "../assets/dashboard/img5.png", "../assets/dashboard/img6.png",
                   "../assets/dashboard/img7.png", "../assets/dashboard/img8.png", "../assets/dashboard/img9.png",
                   "../assets/dashboard/img10.png", "../assets/dashboard/img11.png", "../assets/dashboard/img12.png",
                   "../assets/dashboard/img7.png", "../assets/dashboard/img8.png", "../assets/dashboard/img9.png",
                   "../assets/dashboard/img2.png"
                    ];

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

window.addEventListener('DOMContentLoaded', (event) => {
    getCartItems();
});

function getCartItems() {
    const headerconfig = { 
        headers: {  
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
        }
    }
    getService("​/bookstore_user/get_cart_items", headerconfig)
    .then(res=> {
        console.log(res.data.result);
        // console.log(res.data.result[0].product_id);
        let cartItemsHTML=``;
        cartItemList = res.data.result;
        for(let i=0; i<res.data.result.length; i++) {
            console.log(res.data.result[0]._id);
            cartItemsHTML +=    `<div class="cart-item-section">`+
                                `<div class="cart-image-item">`+
                                    `<img src="`+imageList[i]+`">`+
                                `</div>` +  
                                `<div class="cart-item-title">`+ res.data.result[i].product_id.bookName +`
                                    <li style="list-style: none" class="title2">`+ res.data.result[i].product_id.author +`</li>
                                    <li style="list-style: none" class="title4">`+ res.data.result[i].product_id.price +`</li>
                                    
                                ` +
                                `</div>`+                    
                            `</div>`
        }
        document.getElementById("place-order-section-cart-description").innerHTML = cartItemsHTML;    
        document.getElementById("customer-details-section-cart-description").innerHTML = cartItemsHTML; 
        document.getElementById("order-summery-section-cart-description").innerHTML = cartItemsHTML;    
        document.getElementById("order-summery-section-order-description").innerHTML = cartItemsHTML;           
    })    
}

// --------------customer details adding method------------------

function addCustomerDetails() {
    let address = document.getElementById("address");
    let city = document.getElementById("city");
    let state = document.getElementById("state");
    let data = {
        "addressType": "Home" ,
        "fullAddress": address.value,
        "city": city.value,
        "state": state.value
    };
    const headerconfig = { 
        headers: {  
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
        }
    }
    putService("/bookstore_user/edit_user",data, headerconfig)
    .then(res=> {
        console.log(res.data.result);
    })
}

