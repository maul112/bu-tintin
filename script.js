/* script.js */

// Hardcoded data JSON sesuai permintaan agar mudah dibuka di lokal (tanpa perlu web server)
const products = [
    { id: 1, name: "Soto Ayam", price: 50000, image: "Soto ayam.jpg" },
    { id: 2, name: "Jagung Goreng Campur Kacang", price: 5000, image: "Jagung goreng campur kacang.jpg" }, // Default harga 5rb krn tidak disebut
    { id: 3, name: "Sop", price: 5000, image: "Sop.jpg" },
    { id: 4, name: "Ayam Panggang (1 biji)", price: 5000, image: "Ayam panggang.jpg" },
    { id: 5, name: "Paes Kendui", price: 8000, image: "Paes kendui.jpg" },
    { id: 6, name: "Paes Kaben", price: 6000, image: "Paes kaben.jpg" },
    { id: 7, name: "Kendui", price: 8000, image: "Kendui.jpg" },
    { id: 8, name: "Kopek Goreng", price: 10000, image: "Kopek goreng.jpg" },
    { id: 9, name: "Tumis Wortel Buncis Tempe", price: 10000, image: "Tumis wortel buncis tempe.jpg" },
    { id: 10, name: "Lele Bumbu", price: 35000, image: "Lele bumbu.jpg" },
    { id: 11, name: "Koneng Goreng", price: 10000, image: "Koneng goreng.jpg" },
    { id: 12, name: "Masak Merah Daging (1 biji)", price: 7000, image: "Masak merah daging 1 bij.jpg" },
    { id: 13, name: "Rawon Daging/Tulang (20rb)", price: 20000, image: "Rawon daging atau tulang 20k.jpg" },
    { id: 14, name: "Rawon Daging/Tulang (30rb)", price: 30000, image: "Rawon daging atau tulang 30k.jpg" },
    { id: 15, name: "Rawon Daging/Tulang (50rb)", price: 50000, image: "Rawon daging atau tulang 50k.jpg" },
    { id: 16, name: "Otak-otak Cakalan", price: 10000, image: "Otak-otak cakalan.jpg" },
    { id: 17, name: "Masak Petis Telur/Ayam", price: 5000, image: "Masak petis telur atau ayam.jpg" },
    { id: 18, name: "Bakwan Jagung (1 biji)", price: 1000, image: "Bakwan jagung 1 biji.jpg" },
    { id: 19, name: "Pindang Goreng", price: 10000, image: "Pindang goreng.jpg" },
    { id: 20, name: "Tumis Kangkung Toge", price: 5000, image: "Tumis kangkung toge.jpeg" },
    { id: 21, name: "Sayur Asem", price: 5000, image: "Sayur asem.jpg" },
    { id: 22, name: "Cangkarok", price: 5000, image: "Cangkarok.jpg" },
    { id: 23, name: "Tumis Pare", price: 10000, image: "Tumis pare.jpg" },
    { id: 24, name: "Tumis Wortel Buncis Brokoli", price: 10000, image: "Tumis wortel buncis brokoli.jpg" },
    { id: 25, name: "Krupuk Udang Kwanyar", price: 20000, image: "Krupuk udang Kwanyar sudah goreng.jpg" },
    { id: 26, name: "Lodeh", price: 5000, image: "Lodeh.jpg" },
    { id: 27, name: "Urap-urap", price: 5000, image: "Urap-urap.jpg" },
    { id: 28, name: "Kendui Goreng", price: 10000, image: "Kendui goreng.jpg" },
    { id: 29, name: "Kolek Kacang Ijo", price: 5000, image: "Kolek kacang ijo.jpg" },
    { id: 30, name: "Pisang Rebus (1 biji)", price: 2000, image: "Pisang rebus 1 biji.jpg" },
    { id: 31, name: "Ayam Serundeng (1 biji)", price: 5000, image: "Ayam serundeng 1 biji.jpg" }
];

// State Keranjang Belanja
let cart = {}; // Menyimpan format { id_produk: jumlah }
// Nomor WA tujuan (gunakan format 628... tanpa spasi/tanda plus)
const whatsappNumber = "6281958949997";

// Fungsi untuk format angka ke bentuk Rupiah (contoh: Rp 75.000)
function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(angka);
}

// Mengambil elemen-elemen dari HTML
const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');

// Elemen Modal Keranjang
const cartModal = document.getElementById('cartModal');
const cartItemList = document.getElementById('cartItemList');
const modalTotalPrice = document.getElementById('modalTotalPrice');

// Fungsi untuk menampilkan daftar produk ke layar
function renderProducts(items) {
    // Kosongkan area produk terlebih dahulu
    productGrid.innerHTML = '';
    
    // Jika tidak ada barang yang sesuai
    if (items.length === 0) {
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
        
        // Buat kartu untuk setiap produk
        items.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            
            // Ambil jumlah produk saat ini dari keranjang (jika ada)
            const currentQty = cart[product.id] || 0;
            
            card.innerHTML = `
                <div class="product-image-container">
                    <img src="img/${product.image}" alt="${product.name}" class="product-image">
                </div>
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">${formatRupiah(product.price)}</div>
                    
                    <div class="quantity-control">
                        <button onclick="updateCart(${product.id}, -1)" class="btn-qty btn-minus">-</button>
                        <span id="qty-${product.id}" class="qty-text">${currentQty}</span>
                        <button onclick="updateCart(${product.id}, 1)" class="btn-qty btn-plus">+</button>
                    </div>
                </div>
            `;
            
            productGrid.appendChild(card);
        });
    }
}

// Fungsi untuk menambah atau mengurangi produk di keranjang
function updateCart(productId, change) {
    if (!cart[productId]) {
        cart[productId] = 0;
    }
    
    cart[productId] += change;
    
    // Tidak boleh kurang dari 0
    if (cart[productId] < 0) {
        cart[productId] = 0;
    }
    
    // Update angka pada layar produk
    const qtyElement = document.getElementById(`qty-${productId}`);
    if (qtyElement) {
        qtyElement.textContent = cart[productId];
    }
    
    updateCartUI();
}

// Fungsi untuk mengupdate tampilan bar keranjang di bawah
function updateCartUI() {
    let totalItems = 0;
    let totalPrice = 0;
    
    for (const [id, qty] of Object.entries(cart)) {
        if (qty > 0) {
            totalItems += qty;
            const product = products.find(p => p.id == id);
            totalPrice += product.price * qty;
        }
    }
    
    const cartBar = document.getElementById('cartBar');
    const cartTotalItems = document.getElementById('cartTotalItems');
    const cartTotalPrice = document.getElementById('cartTotalPrice');
    
    // Tampilkan cart bar hanya jika ada barang di keranjang
    if (totalItems > 0) {
        cartBar.classList.remove('hidden');
        cartTotalItems.textContent = `${totalItems} Barang`;
        cartTotalPrice.textContent = formatRupiah(totalPrice);
        
        // Update isi modal jika sedang terbuka
        if (cartModal && !cartModal.classList.contains('hidden')) {
            renderCartItems();
        }
    } else {
        cartBar.classList.add('hidden');
        if (typeof closeCartModal === 'function') {
            closeCartModal();
        }
    }
}

// Memberikan respon saat kolom pencarian diketik
searchInput.addEventListener('input', (e) => {
    // Ambil kata yang diketik, jadikan huruf kecil semua
    const keyword = e.target.value.toLowerCase();
    
    // Saring produk yang namanya mengandung kata yang diketik
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(keyword)
    );
    
    // Tampilkan produk hasil saringan
    renderProducts(filteredProducts);
});

// Fungsi Modal Keranjang
function openCartModal() {
    cartModal.classList.remove('hidden');
    renderCartItems();
}

function closeCartModal() {
    cartModal.classList.add('hidden');
}

// Menutup modal jika klik di luar area putih (modal-content)
cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        closeCartModal();
    }
});

// Fungsi untuk me-render daftar barang di modal
function renderCartItems() {
    cartItemList.innerHTML = '';
    let totalPrice = 0;
    
    for (const [id, qty] of Object.entries(cart)) {
        if (qty > 0) {
            const product = products.find(p => p.id == parseInt(id));
            const subtotal = product.price * qty;
            totalPrice += subtotal;
            
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-name">${product.name}</div>
                    <div class="cart-item-price">${qty} x ${formatRupiah(product.price)}</div>
                </div>
                <div class="cart-item-subtotal">
                    ${formatRupiah(subtotal)}
                </div>
            `;
            cartItemList.appendChild(itemDiv);
        }
    }
    
    modalTotalPrice.textContent = formatRupiah(totalPrice);
}

// Fungsi Kosongkan Keranjang
function clearCart(event) {
    if (event) {
        event.stopPropagation(); // Mencegah modal terbuka saat klik tombol ini
    }
    
    if (confirm('Apakah Anda yakin ingin mengosongkan keranjang belanja?')) {
        cart = {};
        updateCartUI();
        
        // Reset angka di daftar produk menjadi 0
        products.forEach(p => {
            const qtyElement = document.getElementById(`qty-${p.id}`);
            if (qtyElement) {
                qtyElement.textContent = '0';
            }
        });
    }
}

// Event untuk tombol Pesan via WA
document.getElementById('btnPesanWA').addEventListener('click', () => {
    let text = "Halo Bu Tintin, saya mau pesan:\n\n";
    let totalPrice = 0;
    
    for (const [id, qty] of Object.entries(cart)) {
        if (qty > 0) {
            const product = products.find(p => p.id == id);
            const subtotal = product.price * qty;
            totalPrice += subtotal;
            text += `- ${product.name} (${qty}x) = ${formatRupiah(subtotal)}\n`;
        }
    }
    
    text += `\nTotal: ${formatRupiah(totalPrice)}\n\nTerima kasih.`;
    
    // Membuka tab baru ke WhatsApp dengan pesan yang sudah dibuat
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
});

// Saat pertama kali halaman dibuka, tampilkan semua produk
renderProducts(products);
