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
    <span><i class="fa fa-user-o" aria-hidden="true"></i></span>
    <span class="nav-icon4">
      <img src="../assets/dashboard/cart.png">
    </span>
    <span class="nav-section-cart-count" id="nav-section-cart-icon"></span>
    
  </form>
</div>
</nav>

`