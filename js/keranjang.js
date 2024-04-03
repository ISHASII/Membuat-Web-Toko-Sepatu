document,addEventListener('alpine:init', () => {
  Alpine.data('products', () => ({
      items: [
          {id:1, name: 'Converse Chuck Taylor All Star', img:'1.jpg', price: 799000},
          {id:2, name: 'Converse X Martine Ali Chuck 70 De Luxe Wedge', img:'2.jpg', price: 2999000},
          {id:3, name: 'New Balance 1906 Mens Sneakers Shoes', img:'3.jpg', price: 2599000},
          {id:4, name: 'Nike Air Max', img:'4.jpg', price: 2379000},
          {id:5, name: 'New Balance 327', img:'5.jpg', price: 1799000},
          {id:6, name: 'On Cloudmonster Womens', img:'6.jpg', price: 2900000},
          {id:7, name: 'Adidas Rapidmove Trainer', img:'7.jpg', price: 2000000},
          {id:8, name: 'Adidas Rapidmove Trainer', img:'8.jpg', price: 2000000},
          {id:9, name: 'Adidas Rapidmove Trainer', img:'9.jpg', price: 2000000},
          {id:10, name: 'Adidas Running Shous', img:'10.jpg', price: 1500000},
          {id:11, name: 'Adidas Duramo Speed', img:'11.jpg', price: 1800000},
          {id:12, name: 'Adidas Supernova Stride', img:'12.jpg', price: 1000000},
          {id:13, name: 'Adidas Disney Shoes Kids', img:'13.jpg', price: 799000},
          {id:14, name: 'Adidas Elastic Lace Top', img:'14.jpg', price: 750000},
          {id:15, name: 'Adidas Hello Kitty', img:'15.jpg', price: 850000},
          {id:16, name: 'Adidas NMD 360 Hello Kitty', img:'16.jpg', price: 60000},
          {id:17, name: 'Adidas Hello Kitty Superstar', img:'17.jpg', price: 50000},
          {id:18, name: 'Adidas Terex Caption Toey Infant', img:'18.jpg', price: 70000},
      ]
  }));
});

document.addEventListener('DOMContentLoaded', function () {
  const addToCartButtons = document.querySelectorAll(".btn-add-to-cart");
  const buyNowButtons = document.querySelectorAll(".btn-buy-now");
  const shoppingCart = document.querySelector(".shopping-cart");
  const payNowButton = document.querySelector(".btn-pay-now");
  const trashIcon = document.querySelector(".fa-trash-can");
  const cartCount = document.querySelector(".cart-count");

  let totalPrice = 0;
  let totalCartItems = 0;

  // Ambil detail pesanan dari localStorage jika ada
  let cartItems = [];
  const storedCartItems = localStorage.getItem('cartItems');
  if (storedCartItems) {
    cartItems = JSON.parse(storedCartItems);
    // Tampilkan detail pesanan jika ada saat halaman dimuat
    cartItems.forEach(function (item) {
      const newItem = createCartItemElement(item.name, item.price, item.image);
      shoppingCart.appendChild(newItem);
      // Update total price saat halaman dimuat
      totalPrice += item.price;
      // Update total icon pesanan saat halaman dimuat
      totalCartItems++;
    });
    updateTotalPrice();
    updateCartCount();
  }

  // Event listener untuk tombol "+ Keranjang"
  addToCartButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      if (button.dataset.action === "add-to-cart") {
        event.preventDefault(); // Mencegah scroll ke atas
        const productCard = button.closest(".card-body");
        const productName = productCard.querySelector(".card-title").innerText;
        const productPrice = parseFloat(productCard.querySelector(".card-text").innerText.replace(/\D/g, ''));
        const productImage = button.dataset.image;

        // Tambahkan detail produk ke dalam array pesanan jika belum ada
        const existingItem = cartItems.find(item => item.name === productName && item.price === productPrice && item.image === productImage);
        if (!existingItem) {
          cartItems.push({
            name: productName,
            price: productPrice,
            image: productImage
          });

          const newItem = createCartItemElement(productName, productPrice, productImage);
          shoppingCart.appendChild(newItem);

          // Update total price
          totalPrice += productPrice;
          updateTotalPrice();

          // Update total icon pesanan
          totalCartItems++;
          updateCartCount();

          // Simpan detail pesanan ke dalam localStorage
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
      }
    });
  });

  // Event listener untuk tombol "Beli Sekarang"
  buyNowButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      if (button.dataset.action === "buy-now") {
        // Alihkan pengguna ke halaman pembayaran
        window.location.href = "pembayaran.html";
      }
    });
  });

  // Event listener untuk tombol "Bayar Sekarang"
  payNowButton.addEventListener("click", function () {
    // Alihkan pengguna ke halaman pembayaran
    window.location.href = "pembayaran.html";
  });

  // Event listener untuk tombol "Trash"
  trashIcon.addEventListener("click", function () {
    // Kosongkan keranjang
    shoppingCart.innerHTML = "";
    // Reset detail pesanan dan simpanan di localStorage
    cartItems = [];
    localStorage.removeItem('cartItems');
    totalPrice = 0;
    updateTotalPrice();
    totalCartItems = 0;
    updateCartCount();
  });

  // Fungsi untuk membuat elemen item keranjang belanja
  function createCartItemElement(name, price, imageSrc) {
    const newItem = document.createElement("div");
    newItem.classList.add("cart-item");
    newItem.innerHTML = `
      <img src="${imageSrc}" alt="${name}">
      <div class="item-details">
        <h3>${name}</h3>
        <div class="item-price">Rp ${price.toLocaleString()}</div>
        <button class="btn btn-remove-item">Hapus</button>
      </div>
    `;
    // Tambahkan event listener untuk tombol "Hapus"
    newItem.querySelector(".btn-remove-item").addEventListener("click", function () {
      // Hapus item dari keranjang
      const index = cartItems.findIndex(item => item.name === name && item.price === price && item.image === imageSrc);
      if (index !== -1) {
        cartItems.splice(index, 1);
        // Simpan kembali ke localStorage setelah item dihapus
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
      }
      // Hapus elemen dari tampilan
      newItem.remove();
      // Update total price
      totalPrice -= price;
      updateTotalPrice();
      // Update total icon pesanan
      totalCartItems--;
      updateCartCount();
    });

    return newItem;
  }

  // Fungsi untuk memperbarui indikator jumlah produk di keranjang
  function updateCartCount() {
    const cartCountElements = document.querySelectorAll(".cart-count");
    cartCountElements.forEach(function (element) {
      element.textContent = totalCartItems;
    });

    const cartCountNavbar = document.querySelector(".cart-icon .cart-count");
    if (cartCountNavbar) {
      cartCountNavbar.textContent = totalCartItems;
    }
  }

  // Fungsi untuk memperbarui tampilan total harga
  function updateTotalPrice() {
    const totalPriceDisplay = document.querySelector(".total-price");
    const formattedTotalPrice = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(totalPrice);
    totalPriceDisplay.textContent = `Total Price: ${formattedTotalPrice}`;
  }

  // Fungsi untuk menghitung total pembayaran dengan biaya pengiriman
function calculateTotalPayment() {
  const shippingCost = 20000; // Biaya pengiriman tetap
  const totalPayment = totalPrice + shippingCost;
  return totalPayment;
}

// Panggil fungsi untuk menghitung total pembayaran dan perbarui tampilan total pembayaran
function updateTotalPayment() {
  const totalPaymentDisplay = document.querySelector(".total-payment");
  const totalPayment = calculateTotalPayment();
  const formattedTotalPayment = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(totalPayment);
  totalPaymentDisplay.textContent = `Total Payment: ${formattedTotalPayment}`;
}

// Panggil fungsi untuk memperbarui tampilan total pembayaran saat halaman dimuat
updateTotalPayment();

});
