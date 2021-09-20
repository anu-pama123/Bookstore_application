const imageList = ["../assets/dashboard/img1.png", "../assets/dashboard/img2.png", "../assets/dashboard/img3.png",
                   "../assets/dashboard/img4.png", "../assets/dashboard/img5.png", "../assets/dashboard/img6.png",
                   "../assets/dashboard/img7.png", "../assets/dashboard/img8.png", "../assets/dashboard/img9.png",
                   "../assets/dashboard/img10.png", "../assets/dashboard/img11.png", "../assets/dashboard/img12.png",
                   "../assets/dashboard/img7.png", "../assets/dashboard/img8.png", "../assets/dashboard/img9.png",
                   "../assets/dashboard/img2.png"
                    ];
let bookDetailsList = [];

window.addEventListener('DOMContentLoaded', (event) => {
    displayItems();
});

// ------------------------method to get items-----------------------
  
function displayItems(searchInput='') {
    const headerconfig = {   
        'Content-Type': 'application/json',
    };
    getService("​/bookstore_user/get/book", headerconfig)
    .then(res=> {
        console.log(res.data.result);
        console.log(res.data.result.length);
    let bookCountHTML=``;
    bookCountHTML+=`<span>(`+res.data.result.length +` items)</span>`
    document.getElementById("dashboard-book-count").innerHTML = bookCountHTML;

    let itemsHTML=``;
    bookDetailsList = res.data.result;
    for(let i=0; i<res.data.result.length; i++) {
        if((res.data.result[i].bookName.toLowerCase()).includes(searchInput.toLowerCase())){
            console.log(res.data.result[0]._id);
            let button_outer_section_id = "button-outer-section"+res.data.result[i]._id;
            let add_cart_section_id = "add-cart-section"+res.data.result[i]._id;
            let wishlist_section_id = "wishlist-section"+res.data.result[i]._id;
            itemsHTML +=    `<div class="item-section">`+
                                `<div class="item">`+
                                    `<img src="`+imageList[i]+`">`+
                                `</div>` +  
                                `<div class=item-title>`+ res.data.result[i].bookName +`
                                    <li style="list-style: none" class="title2">`+ res.data.result[i].author +`</li>
                                    <li style="list-style: none" class="title4">`+ res.data.result[i].price +`</li>
                                    <li style="list-style: none" class="title3">
                                    <div class="button-outer" id=`+ button_outer_section_id +`>
                                        <button class="inner1" id=`+ i  +` onclick="addtocartSwitchVisible(id);getCartItemsInDashboard();">ADD TO BAG</button> 
                                        <button class="inner2" id=`+ i +` onclick="wishlistSwitchVisible(id)">WISHLIST</button>        
                                    </div>  
                                    <div class="add-cart" id=`+add_cart_section_id+`>
                                        <button class="cart-button">ADDED TO BAG</button>
                                    </div>
                                    <div class="wishlist" id=`+wishlist_section_id+`>
                                        <button class="wishlist-button">WISHLIST</button>
                                    </div>
                                    </li>
                                ` +
                                `</div>`+                    
                            `</div>`
        }                       
    }
    document.getElementById("item-container").innerHTML = itemsHTML;
    })
    .catch((err) => {
    console.log(err);
    })
}       

// --------------------method to add item to cart---------------------

function addtocartSwitchVisible(i) {
    let selectedBook = bookDetailsList[i];
    const headerconfig = { 
        headers: {  
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
        }
    }
    let data = {
        "product_id": selectedBook._id
    }
    
    postService("/bookstore_user/add_cart_item/"+ selectedBook._id +"", data, headerconfig)
        .then(res=> {
            console.log(res);                           
        })  
        .catch((err) => {
            console.log(err);
        }); 
    if (document.getElementById('button-outer-section'+selectedBook._id)) {
        if (document.getElementById('button-outer-section'+selectedBook._id).style.display == 'none') {
            document.getElementById('button-outer-section'+selectedBook._id).style.display = 'block';
            document.getElementById('add-cart-section'+selectedBook._id).style.display = 'none';
        }
        else {
            document.getElementById('button-outer-section'+selectedBook._id).style.display = 'none';
            document.getElementById('add-cart-section'+selectedBook._id).style.display = 'block';
        }
    }
}

// ----------------method to add item to wishlist-----------------

function wishlistSwitchVisible(i) {
    let selectedBook = bookDetailsList[i];
    const headerconfig = { 
        headers: {  
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
        }
      }
    let data = {
        "product_id": selectedBook._id
    }
    
    postService("/bookstore_user/add_wish_list/"+ selectedBook._id +"", data, headerconfig)
        .then(res=> {
            console.log(res);                           
        })  
        .catch((err) => {
            console.log(err);
        }); 
    
    if (document.getElementById('button-outer-section'+selectedBook._id)) {
        if (document.getElementById('button-outer-section'+selectedBook._id).style.display == 'none') {
            document.getElementById('button-outer-section'+selectedBook._id).style.display = 'block';
            document.getElementById('wishlist-section'+selectedBook._id).style.display = 'none';
        }
        else {
            document.getElementById('button-outer-section'+selectedBook._id).style.display = 'none';
            document.getElementById('wishlist-section'+selectedBook._id).style.display = 'block';
        }
    }
}

// -----------------metod to display number of item in cart---------------

window.addEventListener('DOMContentLoaded', (event) => {
    getCartItemsInDashboard();
});

function getCartItemsInDashboard() {
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
        let itemCountHTML=``;
        itemCountHTML += `<div class="cart-item-count-in-dashboard">`+ res.data.result.length +
        
                         `</div>`                         
        document.getElementById("nav-section-cart-icon").innerHTML = itemCountHTML;
        // displayItems();
    })
    
}    

// -----------------method to search book in dashboard-----------------

function searchBook() {
    let searchInput = document.getElementById('search-book').value;
    displayItems(searchInput);
}

// ---------------------method to redirect dashboard to cart--------------------------

function redirectdashboardToCart() {
    window.location.replace('../pages/cart.html');
}


// ---------------------method to redirect dashboard to wishlist--------------------------

function redirectdashboardToWishlist() {
    window.location.replace('../pages/wishlist.html');
}

// --------------method to logout fundoo application---------------------

function clearAccount() {
    let account = localStorage.clear();
    redirectlogoutSectionToSignup();
}

// ---------method to redirect from logout section to login page----------

function redirectlogoutSectionToSignup() {
    window.location.replace('../pages/signup.html');
}

// ---------method to redirect from placeorder section to dashboard page----------

function redirectplaceorderSectionToDashboard() {
    window.location.replace('../pages/dashboard.html');
}

// ---------------method to get uer name in logout dropdown section---------------

window.addEventListener('DOMContentLoaded', (event) => {
    getUsername();
});

function getUsername() {
    let name = localStorage.getItem('name');
    var nHTML = '';
    nHTML += name;
    document.getElementById("user-name-section").innerHTML = nHTML 
    document.getElementById("username-in-header").innerHTML = nHTML;
}