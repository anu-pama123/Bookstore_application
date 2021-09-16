const imageList = ["../assets/dashboard/img1.png", "../assets/dashboard/img2.png", "../assets/dashboard/img3.png",
                   "../assets/dashboard/img4.png", "../assets/dashboard/img5.png", "../assets/dashboard/img6.png",
                   "../assets/dashboard/img7.png", "../assets/dashboard/img8.png", "../assets/dashboard/img9.png",
                   "../assets/dashboard/img10.png", "../assets/dashboard/img11.png", "../assets/dashboard/img12.png",
                   "../assets/dashboard/img7.png", "../assets/dashboard/img8.png", "../assets/dashboard/img9.png",
                   "../assets/dashboard/img2.png"
                    ]
let bookDetailsList = [];

window.addEventListener('DOMContentLoaded', (event) => {
    displayItems();
});
  
function displayItems() {
    const headerconfig = {   
        'Content-Type': 'application/json',
      };
    getService("​/bookstore_user/get/book", headerconfig)
    .then(res=> {
        console.log(res.data.result);
        console.log(res.data.result.length);
    let itemsHTML=``;
    bookDetailsList = res.data.result;
    for(let i=0; i<res.data.result.length; i++) {
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
                                    <button class="inner1" id=`+ i  +` onclick="addtocartSwitchVisible(id)">ADD TO BAG</button> 
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
    document.getElementById("item-container").innerHTML = itemsHTML;
    })
    .catch((err) => {
    console.log(err);
    })
}       

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
        document.getElementById("dashboard-page-cart-item-count").innerHTML = itemCountHTML;
    })
    
}    


