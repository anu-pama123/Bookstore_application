document.getElementById("header-content").innerHTML = `
<nav class="navbar navbar-light bg-light">
  <div class="container-fluid">
    <form class="d-flex">
      <span class="nav-icon1">
          <img src="../assets/dashboard/education (1).svg">
      </span>
      <span class="nav-icon2">Bookstore</span>
      <span class="search">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
      </span>
      


            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fa fa-user-o" aria-hidden="true"></i></span>
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" href="#">Hello</a></li>
                <li><a class="dropdown-item" href="#">
                  <i class="fa fa-user" aria-hidden="true"></i>
                  <span class="profile-button">profile</span></a>
                </li>
                <li><a class="dropdown-item" href="#">
                  <i class="fa fa-first-order" aria-hidden="true"></i>
                  <span class="profile-button">My Order</span></a>
                </li>
                <li><a class="dropdown-item" href="#">
                  <i class="fa fa-heart-o" aria-hidden="true"></i>
                  <span class="profile-button" onclick="redirectdashboardToWishlist()">My Wishlist</span></a>
                </li>
                <li><a class="dropdown-item" href="#">
                  <button class="logout-button" onclick="clearAccount(), redirectlogoutSectionToSignup()">Logout</button>
                </a></li>
              </ul>
            </div>



      <span class="nav-icon4">
        <img src="../assets/dashboard/cart.png" onclick="redirectdashboardToCart()">
      </span>
      <span class="nav-section-cart-count" id="nav-section-cart-icon"></span>
      
    </form>
  </div>
  </nav>

`