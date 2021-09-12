const imageList = ["../assets/dashboard/img1.png", "../assets/dashboard/img2.png", "../assets/dashboard/img3.png",
                   "../assets/dashboard/img4.png", "../assets/dashboard/img5.png", "../assets/dashboard/img6.png",
                   "../assets/dashboard/img7.png", "../assets/dashboard/img8.png", "../assets/dashboard/img9.png",
                   "../assets/dashboard/img10.png", "../assets/dashboard/img11.png", "../assets/dashboard/img12.png"]
let bookDetailsList = [];

window.addEventListener('DOMContentLoaded', (event) => {
    displayItems();
});
  
function displayItems() {
    getService("​/bookstore_user/get/book", headerconfig)
    .then(res=> {
        console.log('hai');
        console.log(res.data.result);

    let itemsHTML=``;
    bookDetailsList = res.data.result;
    for(let i=0; i<res.data.result.length; i++) {
        console.log('anu')

        itemsHTML +=    `<div class="item-section">`+
                            `<div class="item">`+
                                `<img src="`+imageList[i]+`">`+
                            `</div>` +  
                            `<div class=item-title>`+ res.data.result[i].bookName+`
                                <li style="list-style: none" class="title2">`+ res.data.result[i].author+`</li>
                                <li style="list-style: none" class="title4">`+ res.data.result[i].price+`</li>
                                <li style="list-style: none" class="title3">
                                <span class="title-subsection1">4.5*</span>
                                <span class=title-subsection2>(20)</span>
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