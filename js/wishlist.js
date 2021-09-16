let wishlistItemList = [];
const imageList = ["../assets/dashboard/img1.png"
                    ];

window.addEventListener('DOMContentLoaded', (event) => {
    getWishlistItems();
    getCartItemsInplaceOrder();
});

// method to get wishlist items

function getWishlistItems() {
    const headerconfig = { 
        headers: {  
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
        }
    }
    getService("/bookstore_user/get_wishlist_items", headerconfig)
    .then(res=> {
        console.log(res.data.result);
        console.log(res.data.result.length);
        let wishlistItemsHTML=``;
        wishlistItemList = res.data.result;
        let wishlistItemCountHTML=``;
        wishlistItemCountHTML += `<div class="cart-item-count">`+ res.data.result.length +
        
                         `</div>`
        for(let i=0; i<res.data.result.length; i++) {
            console.log(res.data.result[0]._id);
            wishlistItemsHTML += `<div class="wishlist-item-section">`+
                                    
                                        `<div class="cart-image-item">`+
                                            `<img src="../assets/dashboard/img1.png">`+
                                        `</div>` +  
                                        `<div class="cart-item-title">`+ res.data.result[i].product_id.bookName +`
                                            <li style="list-style: none" class="title2">`+ res.data.result[i].product_id.author +`</li>
                                            <li style="list-style: none" class="title4">`+ res.data.result[i].product_id.price +`</li>` +
                                        `</div>`+ 
                                        `<div class="wishlist-delete-button-container">`+
                                            `<span class="wishlist-delete-button"><i class="fa fa-trash-o" id=`+ i +` onclick="removeBookFromWishlist(id)" aria-hidden="true"></i></span>`+
                                        `</div>`+    
                                                       
                                `</div>`
        }
        document.getElementById("wishlist-item-description").innerHTML = wishlistItemsHTML;       
        // document.getElementById("nav-section-cart-icon").innerHTML = wishlistItemCountHTML;           
    })    
}

// ---------------method to remove book from wishlist------------------

function removeBookFromWishlist(i) {
    let selectedBookToRemove = wishlistItemList[i];
    const headerconfig = { 
        headers: {  
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
        }
    }
    let data = {
        "cartItem_id": selectedBookToRemove._id
    }
    
    deleteService("/bookstore_user/remove_wishlist_item/"+selectedBookToRemove.product_id._id+"", data, headerconfig)
    .then(res=> {
        getWishlistItems();  
    })
}

// method to display cart item count in wishlist page

function getCartItemsInplaceOrder() {
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
    })
    
} 