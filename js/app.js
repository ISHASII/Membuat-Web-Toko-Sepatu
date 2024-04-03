// toogle class active shopping cart
const shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#shopping-cart-button').onclick = (e) => {
    shoppingCart.classList.toggle('active');
    e.preventDefault();
}

// Click Diluar elemet
const sc = document.querySelector('#shopping-cart-button');

document.addEventListener('click', function (e) {
    if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
        shoppingCart.classList.remove('active');
    }
});