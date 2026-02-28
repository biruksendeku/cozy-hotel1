// home.js - Handles cart operations without page refresh

// Main function to add items to cart
window.addToCart = function(foodItem) {
    // Parse the food item safely
    let food;
    try {
        food = typeof foodItem === 'string' ? JSON.parse(foodItem) : foodItem;
    } catch (e) {
        console.error('Error parsing food item:', e);
        showNotification('Error adding item to cart', 'error');
        return;
    }

    // Prepare cart data
    const cartData = {
        foodId: food._id || food.id,
        name: food.name,
        price: food.price,
        quantity: 1,
        imageUrl: food.imageUrl
    };

    // Send POST request
    fetch('/add-to-cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData)
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response failed');
        return response.json();
    })
    .then(data => {
        if (data.success) {
            showNotification(`${food.name} added to cart!`, 'success');
            updateCartCount(data.cartCount);
            
        } else {
            showNotification(data.message || 'Failed to add item', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('Failed to add item to cart', 'error');
    });
};

// Update cart count in header
function updateCartCount(count) {
    const cartLenShow = document.getElementById('cartLenShow');
    if (cartLenShow) {
        cartLenShow.textContent = count;
        
        // Add pulse animation
        cartLenShow.classList.add('update');
        setTimeout(() => {
            cartLenShow.classList.remove('update');
        }, 300);
        
        // Hide when zero
        if (count === 0) {
            cartLenShow.style.display = 'none';
        } else {
            cartLenShow.style.display = 'inline-block';
        }
    }
}

// Show notification
function showNotification(message, type) {
    // Remove existing notification
    const existing = document.querySelector('.cart-notification');
    if (existing) existing.remove();

    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);

    // Auto remove after 2.5 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            if (notification.parentNode) notification.remove();
        }, 300);
    }, 2500);
}

// Load initial cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    fetch('/cart/count')
        .then(res => {
            if (!res.ok) throw new Error('Network response failed');
            return res.json();
        })
        .then(data => {
            if (data && typeof data.count !== 'undefined') {
                updateCartCount(data.count);
            }
        })
        .catch(() => {
            // Silently fail - non-critical
        });
});
