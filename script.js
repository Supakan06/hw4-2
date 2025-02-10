let products = JSON.parse(localStorage.getItem("products")) || [];

// ฟังก์ชันเพิ่มสินค้าใหม่
function addProduct() {
    const name = document.getElementById("productName").value;
    const price = parseFloat(document.getElementById("productPrice").value);
    const stock = parseInt(document.getElementById("productStock").value);
    const category = document.getElementById("productCategory").value;

    if (!name || isNaN(price) || isNaN(stock)) {
        alert("กรุณากรอกข้อมูลให้ครบ");
        return;
    }

    const newProduct = {
        id: Date.now().toString(),
        name,
        price,
        inStock: stock,
        category,
        totalSales: 0,
        minStock: 5
    };

    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
    updateLastUpdated();
}

// ฟังก์ชันเพิ่มสต็อกสินค้า
function updateStock(productId, quantity) {
    products = products.map(product =>
        product.id === productId ? { ...product, inStock: product.inStock + quantity } : product
    );

    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
    updateLastUpdated();
}

// ฟังก์ชันขายสินค้า (เลือกจำนวนได้)
function sellProduct(productId) {
    let amount = parseInt(document.getElementById(`sellAmount-${productId}`).value);
    products = products.map(product => {
        if (product.id === productId && product.inStock >= amount) {
            return { 
                ...product, 
                inStock: product.inStock - amount, 
                totalSales: product.totalSales + amount
            };
        } 
        return product;
    });
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
    updateLastUpdated(); 
}

// ฟังก์ชันแสดงสินค้าขายดี
function generateSalesReport() {
    const bestSellerList = document.getElementById("bestSellers");
    bestSellerList.innerHTML = "";
    const sortedProducts = [...products].sort((a, b) => b.totalSales - a.totalSales);

    sortedProducts.forEach(product => {
        if (product.totalSales > 0) {
            let li = document.createElement("li");
            li.innerHTML = `<span class="best-seller">${product.name}</span> - ขายแล้ว ${product.totalSales} ชิ้น`;
            bestSellerList.appendChild(li); 
        }
    });
}

// ฟังก์ชันค้นหาสินค้า
function searchProduct() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase(); 
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.category.toLowerCase().includes(searchTerm)
    );
    displayFilteredProducts(filteredProducts);
}

// ฟังก์ชันแสดงสินค้าที่ค้นหา
function displayFilteredProducts(filteredProducts) {
    const list = document.getElementById("productList"); 
    list.innerHTML = ""; 
    filteredProducts.forEach(product => { 
        let li = document.createElement("li");
        li.innerHTML = `
            ${product.name} (${product.category}) - ${product.price} บาท 
            <strong class="${product.inStock < product.minStock ? 'low-stock-list' : ''}">[คงเหลือ: ${product.inStock} ชิ้น]</strong>
             <br> //git commit -m  "เพิ่มปุ่มขาย เพิ่มสต็อก เเก้ไข ลบ"
            📦 ขาย: <input type="number" id="sellAmount-${product.id}" min="1" value="1">
            <button tpye="button" class="btn btn-success" onclick="sellProduct('${product.id}')">ขาย</button>
            <button tpye="button" class="btn btn-warning" onclick="updateStock('${product.id}', 1)">+ เพิ่มสต็อก</button>
            <br>
            ✏️ <button type="button" class="btn btn-info" onclick="editProduct('${product.id}')">แก้ไข</button>
            🗑️ <button type="button" class="btn btn-danger" onclick="deleteProduct('${product.id}')">ลบ</button>
        `;
        list.appendChild(li);
    });
    generateSalesReport();
}

// ฟังก์ชันลบสินค้า
function deleteProduct(productId) {
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?")) {
        products = products.filter(product => product.id !== productId);
        localStorage.setItem("products", JSON.stringify(products));
        displayProducts();
    }
}

// ฟังก์ชันแก้ไขสินค้า
let editProductId = null; // เก็บ ID สินค้าที่กำลังแก้ไข
function editProduct() {
// กำหนดค่าให้ฟอร์มแก้ไข
// เก็บ ID ที่กำลังแก้ไข
// แสดงฟอร์มแก้ไข
}

// ฟังก์ชันบันทึกข้อมูลสินค้าที่แก้ไข
function saveEditedProduct() { 
}

// ฟังก์ชันยกเลิกการเเก้ไข
function cancelEdit() {
}

// ฟังก์ชันอัปเดตเวลาที่อัปเดตล่าสุด
function updateLastUpdated() {
}

// ฟังก์ชันล้างข้อมูลคลังสินค้า
function clearAllData() {
}

// ฟังก์ชันแสดงสินค้าที่ใกล้หมดหรือหมด
function checkLowStock() {
}

// ฟังก์ชันแสดงสินค้า
function displayProducts() {
}

//  ใช้ DOM เเสดงสินค้าเมื่อหน้าเว็บโหลดเสร็จ
