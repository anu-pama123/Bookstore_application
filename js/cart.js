let cartItemList = [];

function placeorderSwitchVisible() {
    if (document.getElementById('place-order-page')) {

        if (document.getElementById('cart_page-section2').style.display == 'none') {
            document.getElementById('cart_page-section2').style.display = 'block';
            document.getElementById('customer-details-page').style.display = 'none';
        }
        else {
            document.getElementById('cart_page-section2').style.display = 'none';
            document.getElementById('customer-details-page').style.display = 'block';
        }
    }
}

function orderSummerySwitchVisible() {
    if (document.getElementById('cart_page-section3')) {

        if (document.getElementById('cart_page-section3').style.display == 'none') {
            document.getElementById('cart_page-section3').style.display = 'block';
            document.getElementById('order-summery-page').style.display = 'none';
        }
        else {
            document.getElementById('cart_page-section3').style.display = 'none';
            document.getElementById('order-summery-page').style.display = 'block';
        }
    }
}  

window.addEventListener('DOMContentLoaded', (event) => {
    getCartItems();
    getCartItemsInOrderSummery()
});

// --------------method to get cart items-----------------

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
        console.log(res.data.result.length);
        let cartItemsHTML=``;
        cartItemList = res.data.result;
        let itemCountHTML=``;
        itemCountHTML += `<span class="cart-item-count">`+ res.data.result.length +
        
                         ` )</span>`
        for(let i=0; i<res.data.result.length; i++) {
            console.log(res.data.result[0]._id);
            cartItemsHTML +=    `<div class="cart-item-section">`+
                                `<div class="image-and-description">`+
                                    `<div class="cart-image-item">`+
                                        `<img src="../assets/dashboard/img2.png">`+
                                    `</div>` +  
                                    `<div class="cart-item-title">`+ res.data.result[i].product_id.bookName +`
                                        <li style="list-style: none" class="title2">`+ res.data.result[i].product_id.author +`</li>
                                        <li style="list-style: none" class="title4">Rs. `+ res.data.result[i].product_id.price +`</li>
                                        
                                    ` +
                                    `</div>`+ 
                                `</div>`+
                                
                                `<div class="subsection3">`+
                        
                                    `<span class="minus-count" id=`+ i  +` onclick="decreaseCartItem(id)">-</span>`+
                                    `<span class="quantity-section">`+
                                        `<span class="count">`+res.data.result[i].quantityToBuy+`</span>`+
                                    `</span>`+    
                                    `<span class="add-count-section">`+
                                        `<span class="add-count" id=`+ i  +` onclick="increaseCartItem(id)">+</span>`+
                                    `</span>`+
                                    `<span class="remove-section" id=`+ i  +` onclick="removeBookFromCart(id)">Remove</span> `   +
                                ` </div> `+
                       
                                                   
                            `</div>`
        }
        document.getElementById("place-order-section-cart-description").innerHTML = cartItemsHTML;        
        document.getElementById("nav-section-cart-icon").innerHTML = itemCountHTML;
        document.getElementById("place-order-section-cart-count").innerHTML = itemCountHTML;
        document.getElementById("nav-section-cart-icon").innerHTML = itemCountHTML;
        document.getElementById("nav-section-cart-icon").innerHTML = itemCountHTML;           
    })    
}

// --------------method to get cart items in order summery section-----------------

function getCartItemsInOrderSummery() {
    const headerconfig = { 
        headers: {  
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
        }
    }
    let cartItemsHTML=``;
    getService("​/bookstore_user/get_cart_items", headerconfig)
    .then(res=> {
        console.log(res.data.result);
        for(let i=0; i<res.data.result.length; i++) {
            console.log(res.data.result[0]._id);
            cartItemsHTML +=    `<div class="order-summery-cart-item-section">`+
                                `<div class="image-and-description">`+
                                    `<div class="cart-image-item">`+
                                        `<img src="../assets/dashboard/img2.png">`+
                                    `</div>` +  
                                    `<div class="cart-item-title">`+ res.data.result[i].product_id.bookName +`
                                        <li style="list-style: none" class="title2">`+ res.data.result[i].product_id.author +`</li>
                                        <li style="list-style: none" class="title4">Rs. `+ res.data.result[i].product_id.price +`</li>
                                        
                                    ` +
                                    `</div>`+ 
                                `</div>`+                   
                            `</div>`
        }
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
    validateName();
    validatePhone();
    validatePincode();
    validateLocality();
    validateAddress();
    validateTown();
    validateLandmark();
    putService("/bookstore_user/edit_user",data, headerconfig)
    .then(res=> {
        console.log(res.data.result);
    })
}

// ---------------method to remove book from cart list----------------

function removeBookFromCart(i) {
    let selectedBookToRemove = cartItemList[i];
    const headerconfig = { 
        headers: {  
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
        }
    }
    let data = {
        "cartItem_id": selectedBookToRemove._id
    }
    
    deleteService("/bookstore_user/remove_cart_item/"+selectedBookToRemove._id+"", data, headerconfig)
    .then(res=> {
        getCartItems();  
    })
}

// ---------------method to add order from cart list-----------------

function addOrder() {
    let itemListToOrder = [];
    for(let i=0; i<cartItemList.length; i++) {
        tempDict = {
            'product_id': cartItemList[i].product_id._id,
            'product_name': cartItemList[i].product_id.bookName,
            'product_quantity': cartItemList[i].quantityToBuy,
            'product_price': cartItemList[i].product_id.price,
        }
        itemListToOrder.push(tempDict);
    }
    const headerconfig = { 
        headers: {  
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
        }
    }
    let data = {
        "orders": itemListToOrder
    }

    postService("/bookstore_user/add/order", data, headerconfig)
    .then(res=> {
        console.log(res.data.result);
        redirectToPlaceorderPage();
    })
}

// ---------------cart item quantity increasing method-----------------

function increaseCartItem(i) {
    let selectedBookToIncreaseCount = cartItemList[i];
    const headerconfig = { 
        headers: {  
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
        }
    }
    let data = {
        "quantityToBuy": selectedBookToIncreaseCount.quantityToBuy + 1
    }
    
    putService("/bookstore_user/cart_item_quantity/"+selectedBookToIncreaseCount._id +"", data, headerconfig)
    .then(res=> {
        console.log(res);
        getCartItems();
    })
}

// ---------------cart item quantity decreasing method-----------------

function decreaseCartItem(i) {
    let selectedBookToDecreaseCount = cartItemList[i];
    const headerconfig = { 
        headers: {  
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
        }
    }
    let data = {
        "quantityToBuy": selectedBookToDecreaseCount.quantityToBuy - 1
    }
    
    putService("/bookstore_user/cart_item_quantity/"+selectedBookToDecreaseCount._id +"", data, headerconfig)
    .then(res=> {
        console.log(res.data.result);
        getCartItems();
    })
}

// --------------method to redirect to place order page-----------------

function redirectToPlaceorderPage() {
    window.location.replace('../pages/placeorder.html');
}

// --------------method to redirect to dashboard page-----------------

function redirectCartToDashboard() {
    window.location.replace('../pages/dashboard.html');
}



// --------------------------------------validation section------------------------------------

// name validation    

function validateName() {
    const name = document.getElementById('first-name');

    const nameError = document.getElementById('name-error');    

    if(name.value == "") nameError.textContent = "Enter your full name";        
}

// phone number validation

function validatePhone() {
    const phone = document.getElementById('phone-number');
    const phnError = document.getElementById('phone-error');
    let pwdRegex = RegExp('^[0-9]{10}$');
    if (pwdRegex.test(phone.value))
        phnError.textContent = "";
    else phnError.textContent = "Enter your phone number";
}

// pincode validation

function validatePincode() {
    const pincode = document.getElementById('pincode');
    const phnError = document.getElementById('pincode-error');
    let pwdRegex = RegExp('^[0-9]{6}$');
    if (pwdRegex.test(pincode.value))
        phnError.textContent = "";
    else phnError.textContent = "Enter your pincode";
}

// locality validation    

function validateLocality() {
    const city = document.getElementById('city');

    const cityError = document.getElementById('city-error');    

    if(city.value == "") cityError.textContent = "Enter your full name";        
}

// address validation    

function validateAddress() {
    const address = document.getElementById('address');
    const addressError = document.getElementById('address-error');    

    if(address.value == "") addressError.textContent = "Enter your address";        
}

// city/town validation    

function validateTown() {
    const town = document.getElementById('state');
    const townError = document.getElementById('state-error');    

    if(town.value == "") townError.textContent = "Enter your city or town";        
}

// landmark validation    

function validateLandmark() {
    const landmark = document.getElementById('landmark');
    const landmarkError = document.getElementById('landmark-error');    

    if(landmark.value == "") landmarkError.textContent = "Enter your landmark";        
}

