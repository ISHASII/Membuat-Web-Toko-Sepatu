// Fungsi untuk menambahkan produk ke keranjang
  function addToCart() {
    // Ambil harga produk
    const price = 700000;

    // Ambil jumlah item yang sudah ada di keranjang
    let itemCount = parseInt(document.getElementById("cart-item-count").innerText);

    // Tambahkan 1 item baru
    itemCount++;

    // Perbarui jumlah item di keranjang
    document.getElementById("cart-item-count").innerText = itemCount;

    // Hitung total harga
    const totalPrice = price * itemCount;

    // Perbarui total harga di keranjang
    document.getElementById("cart-total-price").innerText = totalPrice;
  }

  function selectSize(size) {
    document.getElementById("selected-size").textContent =
      "Ukuran dipilih: " + size;
  }
  function showImage(largeImage) {
    document.getElementById("mainImage").src = largeImage;
  }