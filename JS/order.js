// -------------------- DATA --------------------
const menuItems = [
    { name: "Classic Beef Burger", price: 850.00, category: "burgers", image: "../IMG/ITEM_IMG/DC_202012_0116_SpicyCrispyChicken_PotatoBun_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { name: "Spicy Chicken Burger", price: 750.00, category: "burgers", image: "../IMG/ITEM_IMG/DC_202012_0383_CrispyChickenSandwich_PotatoBun_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { name: "Big Burger", price: 650.00, category: "burgers", image: "../IMG/ITEM_IMG/DC_202104_0100_DeluxeSpicyCrispyChickenSandwich_PotatoBun_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { name: "Cheese Burger", price: 700.00, category: "burgers", image: "../IMG/ITEM_IMG/DC_202302_0001-999_Hamburger_Alt_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { name: "Veggie Burger", price: 600.00, category: "burgers", image: "../IMG/ITEM_IMG/DC_202302_0592-999_McDouble_Alt_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { name: "French Fries", price: 300.00, category: "sides", image: "../IMG/ITEM_IMG/DC_202002_6050_SmallFrenchFries_Standing_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { name: "Coca Cola", price: 200.00, category: "drinks", image: "../IMG/ITEM_IMG/DC_202112_0652_MediumDietCoke_Glass_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { name: "Orange Drink", price: 450.00, category: "drinks", image: "../IMG/ITEM_IMG/DC_202012_0621_MediumHi-COrange_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { name: "Orange Juice", price: 250.00, category: "drinks", image: "../IMG/ITEM_IMG/DC_202212_1262_MediumFantaOrange_Glass_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { name: "Spicy Chicken Deluxe", price: 750.00, category: "burgers", image: "../IMG/ITEM_IMG/DC_202309_4282_QuarterPounderCheeseDeluxe_Shredded_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { name: "Big Mac Burger", price: 650.00, category: "burgers", image: "../IMG/ITEM_IMG/DC_202302_0005-999_BigMac_1564x1564-1_nutrition-calculator-tile.jpeg" },
    { name: "Ice Cream", price: 300.00, category: "desserts", image: "../IMG/ITEM_IMG/VanilaIceCream.jpeg" }
];

let selectedItems = [];
let currentCategory = 'all';

// -------------------- DATE & TIME --------------------
function updateDateTime() {
    const now = new Date();
    document.getElementById('orderDate').textContent = now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
setInterval(updateDateTime, 1000);

// -------------------- DISPLAY MENU --------------------
function displayMenuItems(items) {
    const menuContainer = document.getElementById('menuItems');
    menuContainer.innerHTML = '';
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'col-md-4 mb-3';
        div.innerHTML = `
            <div class="card menu-item h-100" onclick="addToOrder('${item.name}', ${item.price})">
                <div class="card-body text-center">
                    <img src="${item.image}" alt="${item.name}" class="mb-2">
                    <h6 class="card-title">${item.name}</h6>
                    <p class="fw-bold text-primary">LKR ${item.price.toFixed(2)}</p>
                </div>
            </div>
        `;
        menuContainer.appendChild(div);
    });
}

// -------------------- FILTER --------------------
function filterByCategory(category) {
    currentCategory = category;
    const filteredItems = category === 'all' ? menuItems : menuItems.filter(i => i.category === category);
    displayMenuItems(filteredItems);
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
}

// -------------------- ORDER --------------------
function addToOrder(name, price) {
    selectedItems.push({ name, price });
    updateOrderDisplay();
}

function removeFromOrder(index) {
    selectedItems.splice(index, 1);
    updateOrderDisplay();
}

function updateOrderDisplay() {
    const container = document.getElementById('selectedItems');
    const totalAmount = document.getElementById('totalAmount');
    container.innerHTML = '';
    let total = 0;
    selectedItems.forEach((item, i) => {
        total += item.price;
        container.innerHTML += `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <span>${item.name}</span>
                <div>
                    <span class="me-2">LKR ${item.price.toFixed(2)}</span>
                    <button class="btn btn-sm btn-danger" onclick="removeFromOrder(${i})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    totalAmount.textContent = `LKR ${total.toFixed(2)}`;
}

// -------------------- CHECKOUT --------------------
function showCustomerForm() {
    if (selectedItems.length === 0) {
        Swal.fire('Error', 'Please add items to your order first', 'warning');
        return;
    }

    Swal.fire({
        title: 'Enter Customer Details',
        html: `
            <input type="tel" id="customerPhone" class="swal2-input" placeholder="Enter Phone Number">
            <input type="text" id="customerName" class="swal2-input" placeholder="Enter Customer Name">
            <input type="email" id="customerEmail" class="swal2-input" placeholder="Enter Customer Email">
        `,
        showCancelButton: true,
        confirmButtonText: 'Save & Checkout',
        preConfirm: () => {
            const phone = document.getElementById('customerPhone').value.trim();
            const name = document.getElementById('customerName').value.trim();
            if (!phone || !name) {
                Swal.showValidationMessage('Phone and Name are required');
                return false;
            }
            return { phone, name, email: document.getElementById('customerEmail').value.trim() };
        }
    }).then(result => {
        if (result.isConfirmed) {
            processCheckout(result.value);
        }
    });
}

function processCheckout(customer) {
    Swal.fire({
        icon: 'success',
        title: 'Order Placed!',
        text: `Order for ${customer.name} has been processed.`,
        timer: 2000,
        showConfirmButton: false
    });
    selectedItems = [];
    updateOrderDisplay();
}

// -------------------- SEARCH --------------------
document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = menuItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm) &&
        (currentCategory === 'all' || item.category === currentCategory)
    );
    displayMenuItems(filtered);
});

// -------------------- INIT --------------------
displayMenuItems(menuItems);
updateDateTime();
