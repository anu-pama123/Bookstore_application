const imageList = ["../assets/dashboard/img1.png", "../assets/dashboard/img2.png", "../assets/dashboard/img3.png",
                   "../assets/dashboard/img4.png", "../assets/dashboard/img5.png", "../assets/dashboard/img6.png",
                   "../assets/dashboard/img7.png", "../assets/dashboard/img8.png", "../assets/dashboard/img9.png",
                   "../assets/dashboard/img10.png", "../assets/dashboard/img11.png", "../assets/dashboard/img12.png"]

window.addEventListener('DOMContentLoaded', (event) => {
    displayItems();
  });
  
function displayItems() {
    let itemsHTML=``;
    for(let j=0; j<12; j++) {
        itemsHTML +=    `<div class="item-section">`+
                            `<div class="item">`+
                                `<img src="`+imageList[j]+`">`+
                            `</div>` +  
                            `<div class=item-title>Don't Make Me Think
                                <li style="list-style: none" class="title2">by steve krug</li>
                                <li style="list-style: none" class="title3">
                                <span class="title-subsection1">4.5*</span>
                                <span class=title-subsection2>(20)</span>
                                </li>
                                <li style="list-style: none" class="title4">Rs. 1500</li>
                            ` +
                            `</div>`+                    
                        `</div>`    
    }
    document.getElementById("item-container").innerHTML = itemsHTML;
}       