//  =============== Global Variables ===============
let cartProducts = [];
let categories = ["electronics", "appliances", "mobiles"]


// Retrieve Data From Local Storage If Exist
function onloadDisplayProd() {
    if(localStorage.getItem("cart") !== null) {
        cartProducts = JSON.parse(localStorage.getItem("cart"));
    }
    getApiProduct();
}
onloadDisplayProd();


// Get Products From Api
function getApiProduct() {
    fetch('https://yasminemahmod.github.io/Reda-Store/products.json')
        .then(response => response.json())
        .then(data => {

            // Sale Product
            displaySaleProducts(data);
            
            // Categoried Product
            for(let i =0; i< categories.length; i++) {
                displayProducts(data, categories[i])
            }

            // All Buttons
            const addBtns = Array.from(document.querySelectorAll(".cart.add"));
            saveToLocalStorage(data, addBtns);
            
        });
}



// Sale Product
function displaySaleProducts(data) {
    const sale_product = document.getElementById("hot_deal_products");

    let products = '';
    
    data.forEach(product => {
        if(product.old_price) {

            let isExist = false;

            for(let i=0; i <cartProducts.length; i++) {
                if(cartProducts[i].id == product.id) {
                    isExist = true;
                }
            }
            
            const precent = Math.floor((product.old_price - product.price) / product.price * 100);

            products += `
            <div class="swiper-slide">                
                <div class="deal-box" data-id="${product.id}">
                    <span class="deal">%${precent}</span>
                    <a href="#" class="img"><img src="${product.img}" alt=""></a>
                    <div class="rate">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <p class="product-info">${product.name}</p>
                    <div class="price">
                        <span class="after-disc">$${product.price}</span>
                        <span class="main-price">$${product.old_price}</span>
                    </div>
                    <div class="product-btns">
                        <button class="cart btn ${isExist? 'in-cart' : 'add'}" data-id="${product.id}">
                            <i class="fa-solid fa-cart-shopping"></i> ${isExist? 'Item in cart' : 'Add to cart'}
                        </button>
                        <button class="favorite btn"><i class="fa-regular fa-heart"></i></button>
                    </div>
                </div>
            </div>
            `

        }
    });

    sale_product.innerHTML = products;
}



// Categoried Product
function displayProducts(data, cat) {
    const parent = document.getElementById(`${cat}_products`);

    let products = '';
    
    data.forEach(product => {
        
        if(product.catetory === cat) {
            let isExist = false;

            for(let i=0; i <cartProducts.length; i++) {
                if(cartProducts[i].id == product.id) {
                    isExist = true;
                }
            }

            const precent = product.old_price ? `<span class="deal">%${Math.floor((product.old_price - product.price) / product.price * 100)}</span>` : `<span style="display: inline-block; padding: 5px"></span>`

            const old_price = product.old_price ? `<span class="main-price">$${product.old_price}</span>` : "";

            products += `
            <div class="swiper-slide">                
                <div class="deal-box" style="height: 380px">
                    ${precent}
                    <a href="#" class="img"><img src="${product.img}" alt=""></a>
                    <div class="rate">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <p class="product-info">${product.name}</p>
                    <div class="price">
                        <span class="after-disc">$${product.price}</span>
                        ${old_price}
                    </div>
                    <div class="product-btns">
                        <button class="cart btn ${isExist? 'in-cart' : 'add'}" data-id="${product.id}">
                            <i class="fa-solid fa-cart-shopping"></i> ${isExist? 'Item in cart' : 'Add to cart'}
                        </button>
                        <button class="favorite btn"><i class="fa-regular fa-heart"></i></button>
                    </div>
                </div>
            </div>
        `}
    });

    parent.innerHTML = products;
}




// Save To Local Storage 
function saveToLocalStorage(data, buttons) {

    buttons.forEach(btn => {

        btn.addEventListener('click', (e) => {

            let productId = e.target.getAttribute("data-id");

            let SelectedItem = data.find(item => item.id == productId);

            cartProducts.push({...SelectedItem, quantity: 1});
            
            localStorage.setItem('cart', JSON.stringify(cartProducts));

            e.target.classList.replace('add', 'in-cart');

            e.target.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Item in cart`
        });
    });
}