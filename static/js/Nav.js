const createNav = () =>{
    let nav = document.querySelector('.navbar');
    nav.innerHTML= `
    <div class="nav">
    <img src="/static/img/logo.png" class="brand-logo" alt="">
    <div class="nav-items">
         <form  method="post" action="http://localhost:5000/product/search">
           <div class="search">
            <input type="text" name="search_term" class="search-box" placeholder="marque de recherche, vêtements">
            <button class="search-btn">Recherche</button>
            </div>
         </form>
         <a>
          <img src="/static/img/user.png" id="user-img" alt="">
         <div class="login-logout-popup hide">
         <p class="account-info">Log in as, name</p>
         <button class=" btn" id="user-btn">Log out</button>
         <a href="#"><button class=" btn" id="admin-btn" onclick="window.location.href='http://localhost:5000/admin/products'">Admin</button></a>
         </div>
         </a>
         <a>
         <img src="/static/img/cart.png" id="cart-icon" alt="">
         <div class="cart">
           <h2 class="cart-title" id="cart-title">add to whislist</h2>

            <div class="cart-content">
               <div class="cart-box">
                  <img src="..." id="cart-img" alt="">
                     <div class="detail-box">
                        <div class="cart-product-title">product1</div>
                             <div class="cart-price">$25.04</div>
                                 <input type="number" value="1" class="cart-quantity">
                                </div>
                                <i class="fa-solid fa-trash cart-remove"></i>
                        </div> 
                 </div>
                <div class="total">
                     <div class="total-title">total</div>
                      <div class="total-price"></div>
                </div>

            <button class="btn-buy">buy now</button>

            <i class="fa-solid fa-x" id="cart-close"></i>
      </div>
         </a>
</div>
<ul class="links-container">
    <li class="link-item"><a href="http://localhost:3005/" class="link">Acceuil</a></li>
    <li class="link-item"><a href="http://localhost:3005/categories" class="link">Categories</a></li>
    <li class="link-item"><a href="http://localhost:3005/femme" class="link">Femmes</a></li>
    <li class="link-item"><a href="http://localhost:3005/homme" class="link">Hommes</a></li>
    <li class="link-item"><a href="http://localhost:3005/enfant" class="link">Enfants</a></li>
    <li class="link-item"><a href="http://localhost:3005/accessoires" class="link">Accessoires</a></li>
</ul>

    `;
}
createNav();

// nav popup
const userImageButton = document.querySelector('#user-img');
const userPopup = document.querySelector('.login-logout-popup');
const popuptext = document.querySelector('.account-info');
const actionBtn = document.querySelector('#user-btn');

userImageButton.addEventListener('click', () => {
    userPopup.classList.toggle('hide');
})

window.onload = () => {
    let user = JSON.parse(sessionStorage.user || null);
    if (user !=null) {
        //means user is logged in
        popuptext.innerHTML = `log in as, ${user.name}`;
        actionBtn.innerHTML = `log out`;
        actionBtn.addEventListener('click', () => {
            sessionStorage.clear();
            location.href = '/login';
        })
    }
}

//Add to whislist
//#1 open & close
const cartIcon = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const closeCart = document.querySelector('#cart-close');

cartIcon.addEventListener('click', () => {
    cart.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cart.classList.remove ('active');
});

if(document.readyState=="loading"){
    document.addEventListener('DOMContentLoaded', start);
}else{
    start();
}

// ========= START ============
function start() {
    addEvents();
}
function update(){
    addEvents();
    updateTotal();
}

//========= ADD Events============
function addEvents() {
    //remove items form whislist
    let cartRemove_btns = document.querySelectorAll('.cart-remove'); 
    cartRemove_btns.forEach((btn) => {
        btn.addEventListener('click', handle_removeCartItem);
    });
    let cartQuantity_inputs =document.querySelectorAll('.cart-quantity');
    cartQuantity_inputs.forEach(input=>{
        input.addEventListener('change', handle_changeItemQuantity);
    })
    let addCart_btns = document.querySelectorAll('.card-btn');
    addCart_btns.forEach(btn=>{
        btn.addEventListener('click',handle_addCartItem);
    })
}


function handle_addCartItem(){
    let title = this.parentElement.nextSibling.nextSibling.querySelector('.product-short-des').innerHTML;
    let image = this.parentElement.querySelector('.product-thumb').src;
    let price = this.parentElement.nextSibling.nextSibling.querySelector('.price').innerHTML;
   
   let cartBoxElement = CartBoxComponent(title,price,image);
   let newNode =document.createElement('div');
   newNode.innerHTML=cartBoxElement;
   const cartContent =cart.querySelector('.cart-content');
   cartContent.appendChild(newNode);
   update();
}

function updateTotal(){
    let cartBoxes = document.querySelectorAll('.cart-box');
    const totalElement = cart.querySelector('.total-price');
    let total = 0;
    cartBoxes.forEach(cartBox=>{
        let priceElement = cartBox.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace("$",""));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total +=price*quantity;
        total = Math.round(total*100)/100;
    })
    totalElement.innerHTML="$"+total;
}
function handle_changeItemQuantity() {
  
    if(isNaN(this.value) || this.value <1){
       this.value =1;
   }
   this.value =Math.floor(this.value);
   update();
} 

function handle_removeCartItem() {
    this.parentElement.remove();
    update();
} 

// CART COMPONENT:
function CartBoxComponent(title,price,image){
    return `
    <div class="cart-content">
    <div class="cart-box">
       <img src="${image}" id="cart-img" alt="">
          <div class="detail-box">
             <div class="cart-product-title">${title}</div>
                  <div class="cart-price">${price}</div>
                      <input type="number" value="1" class="cart-quantity">
                     </div>
                     <i class="fa-solid fa-trash cart-remove"></i>
             </div> 
      </div>
`;
}
