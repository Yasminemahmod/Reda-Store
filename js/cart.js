
// Global Variables
const cart_icon = document.getElementById("cart_count");
const cart_count = document.querySelector("#cart .count");

let cartProducts = [];




// Set Cart Setting
function cartSetting() {
    if(localStorage.getItem("cart") !== null) {
        cartProducts = JSON.parse(localStorage.getItem("cart"));
    }
    let count = 0;
    cartProducts.forEach(item => {
        count += item.quantity;
        
        
    });
    cart_icon.innerHTML = count;
    cart_count.innerHTML = count;    
}




// Retrieve Data From Local Storage If Exist
function onloadDisplayProd() {
    if(localStorage.getItem("cart") !== null) {
        cartProducts = JSON.parse(localStorage.getItem("cart"));
    }
    getApiProduct();
    cartSetting();
    getApiProduct();;
}
onloadDisplayProd();




// Get Products From Api
function getApiProduct() {
    fetch('../products.json')
    .then(res => res.json())
    .then(data => {
        let addBtns = Array.from(document.querySelectorAll(".cart.add"));
        let inCartBtns = Array.from(document.querySelectorAll(".cart.in-cart"));
    

        addBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                cart_icon.innerHTML++;
                cart_count.innerHTML++;
                onloadDisplayProd();
            });
        })
        // console.log(addBtns);
        // console.log(cartProducts);


        // display Products In Cart
        function displayProductsInCart() {
            
            let items = '';
            let total = 0;
            cartProducts.forEach(item => {
                total+= item.price * item.quantity;
                document.querySelector(".total").innerHTML = `$${total}`;

                items += `
                <div class="cart-items_item">
                    <div class="img">
                        <img src="${item.img}" alt="">
                    </div>
                    <div class="cart-items_info">
                        <p class="item_name">${item.name}</p>
                        <span class="item_price">$${item.price}</span>
                        <div class="item_count_control">
                            <button data-id="${item.id}" class="decrease btn">-</button>
                            <span class="item_count">${item.quantity}</span>
                            <button data-id="${item.id}" class="increase btn">+</button>
                        </div>
                    </div>
                    <button data-id="${item.id}" class="delete"><i class="fa-solid fa-trash-can"></i></button>
                </div>`
            });

            document.getElementById("cart-items").innerHTML = items;

            // Increase Buttons
            const inBtns = Array.from(document.querySelectorAll(".increase"));
            increaseCartProduct(inBtns);

            // Decrease Buttons
            const deBtns = Array.from(document.querySelectorAll(".decrease"));
            deacreaseCartProduct(deBtns, inCartBtns);

            // Delete Buttons
            const deleteBtns = Array.from(document.querySelectorAll(".delete"));
            deleteCartProduct(deleteBtns, inCartBtns);
            
        }

        displayProductsInCart();
    });
}






// Increase Product Count In Cart
function increaseCartProduct(btns) {

    btns.forEach(btn => {

        btn.addEventListener('click', (e) => {

            let item = cartProducts.find(item => item.id == e.target.getAttribute("data-id"));

            item.quantity++;

            localStorage.setItem('cart', JSON.stringify(cartProducts));

            getApiProduct();

            cart_icon.innerHTML++;
            cart_count.innerHTML++;
        });
    });
}


// Decrease Product Count In Cart
function deacreaseCartProduct(btns, inCartBtns) {

    btns.forEach(btn => {

        btn.addEventListener('click', (e, i) => {

            let item = cartProducts.find(item => item.id == e.target.getAttribute("data-id"));

            if(item.quantity != 1 ) {

                item.quantity--;
    
                localStorage.setItem('cart', JSON.stringify(cartProducts));
    
            } else {
                cartProducts.forEach((prod,i) => {

                    if(prod.id == item.id) {

                        cartProducts.splice(i, 1);

                        localStorage.setItem('cart', JSON.stringify(cartProducts));
                    }
                });
                
                let btn = inCartBtns.find(btn =>  btn.dataset.id == item.id);

                btn.classList.replace('in-cart', 'add');
                btn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Add to cart`;

            }
            cart_icon.innerHTML--;
            cart_count.innerHTML--;

            getApiProduct();



        });
    });
}



// Delete Item From Cart
function deleteCartProduct(btns, inCartBtns) {
    
    btns.forEach(btn => {

        btn.addEventListener('click', (e) => {

            let item = cartProducts.find(item => item.id == e.target.parentElement.getAttribute("data-id"));

            cartProducts.forEach((prod,i) => {

                if(prod.id == item.id) {

                    cartProducts.splice(i, 1);

                    localStorage.setItem('cart', JSON.stringify(cartProducts));
                }
            });
            
            getApiProduct();
            cartSetting();

            let btn = inCartBtns.find(btn =>  btn.dataset.id == e.target.parentElement.dataset.id);
            btn.classList.replace('in-cart', 'add');
            btn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Add to cart`;
            
        });
    });
}