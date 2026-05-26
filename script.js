/* script.js */

// Hardcoded data JSON sesuai permintaan agar mudah dibuka di lokal (tanpa perlu web server)
const products = [
    { id: 1, name: "Beras Premium 5kg", price: 75000 },
    { id: 2, name: "Minyak Goreng 2L", price: 34000 },
    { id: 3, name: "Gula Pasir 1kg", price: 16000 },
    { id: 4, name: "Telur Ayam 1kg", price: 28000 },
    { id: 5, name: "Mie Instan Goreng (Dus)", price: 110000 },
    { id: 6, name: "Kopi Sachet 1 Renceng", price: 15000 },
    { id: 7, name: "Susu Kental Manis", price: 12500 },
    { id: 8, name: "Teh Celup", price: 8000 },
    { id: 9, name: "Sabun Cuci Piring", price: 14000 },
    { id: 10, name: "Deterjen Bubuk 1kg", price: 22000 }
];

// State Keranjang Belanja
let cart = {}; // Menyimpan format { id_produk: jumlah }
// Nomor WA tujuan (gunakan format 628... tanpa spasi/tanda plus)
const whatsappNumber = "6281234567890"; 

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
                <div class="product-image-placeholder">Gambar<br>${product.name}</div>
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
    } else {
        cartBar.classList.add('hidden');
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
