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
            
            card.innerHTML = `
                <div class="product-image-placeholder">Gambar<br>${product.name}</div>
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">${formatRupiah(product.price)}</div>
                </div>
            `;
            
            productGrid.appendChild(card);
        });
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

// Saat pertama kali halaman dibuka, tampilkan semua produk
renderProducts(products);
