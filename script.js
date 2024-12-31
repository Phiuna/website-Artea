//Index HTML
// Responsive Navbar Toggle
document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.createElement("button");
    navToggle.textContent = "☰";
    navToggle.style.backgroundColor = "#f5deb3";
    navToggle.style.border = "none";
    navToggle.style.fontSize = "1.5rem";
    navToggle.style.cursor = "pointer";
    navToggle.style.display = "none";

    const nav = document.querySelector("nav ul");
    document.querySelector("header").prepend(navToggle);

    const toggleMenu = () => {
        nav.classList.toggle("visible");
        nav.style.display = nav.classList.contains("visible") ? "block" : "none";
    };

    navToggle.addEventListener("click", toggleMenu);

    // Handle responsiveness
    const handleResize = () => {
        if (window.innerWidth <= 768) {
            nav.style.display = "none";
            navToggle.style.display = "block";
        } else {
            nav.style.display = "flex";
            navToggle.style.display = "none";
        }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Smooth Scrolling for Anchor Links
    const smoothScroll = () => {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute("href"));
                if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                }
            });
        });
    };
    smoothScroll();

    // Animation on Scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll(".fade-in, .slide-up");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(el => {
            observer.observe(el);
        });
    };
    animateOnScroll();

    // Form Validation
    const formValidation = () => {
        const form = document.querySelector("#fill-up-form form");
        if (!form) return;

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = form.querySelector('input[name="name"]');
            const email = form.querySelector('input[name="email"]');
            const message = form.querySelector('textarea[name="message"]');
            let isValid = true;

            if (!name.value.trim()) {
                isValid = false;
                alert("Name is required");
            }
            if (!email.value.trim() || !/\S+@\S+\.\S+/.test(email.value)) {
                isValid = false;
                alert("A valid email is required");
            }
            if (!message.value.trim()) {
                isValid = false;
                alert("Message cannot be empty");
            }

            if (isValid) {
                alert("Form submitted successfully!");
                form.reset();
            }
        });
    };
    formValidation();


    // Menu HTML Cart System
    let cart = [];

    const popupModal = document.getElementById('popup-modal');
    const popupItemName = document.getElementById('popup-item-name');
    const popupItemPrice = document.getElementById('popup-item-price');
    const closePopup = document.getElementById('close-popup');
    const closePopupBtn = document.getElementById('close-popup-btn');

    function addToCart(itemName, itemPrice) {
        const item = {
            name: itemName,
            price: parseFloat(itemPrice)
        };
        cart.push(item);
        updateCartUI();
        showPopup(itemName, itemPrice);
    }

    function updateCartUI() {
        const cartContainer = document.getElementById('cart-items');
        cartContainer.innerHTML = '';

        cart.forEach((item) => {
            const cartItem = document.createElement('li');
            cartItem.textContent = `${item.name} - ₱${item.price.toFixed(2)}`;
            cartContainer.appendChild(cartItem);
        });

        const total = cart.reduce((sum, item) => sum + item.price, 0);
        document.getElementById('cart-total').textContent = `Total: ₱${total.toFixed(2)}`;
    }

    function showPopup(itemName, itemPrice) {
        popupItemName.textContent = `You added ${itemName} to your cart.`;
        popupItemPrice.textContent = `Price: ₱${itemPrice}`;
        popupModal.style.display = 'block';
    }

    closePopup.addEventListener('click', () => {
        popupModal.style.display = 'none';
    });

    closePopupBtn.addEventListener('click', () => {
        popupModal.style.display = 'none';
    });

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', () => {
            const itemName = button.getAttribute('data-name');
            const itemPrice = button.getAttribute('data-price');
            addToCart(itemName, itemPrice);
        });
    });
    // Assuming cartItems is an array that holds the current items in the cart
let cartItems = [];

// Function to clear the cart
function clearCart() {
    // Clear the cart items array
    cartItems = [];

    // Update the displayed cart items
    const cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = ''; // Clear the displayed items

    // Reset the total price display
    document.getElementById('cart-total').innerText = 'Total: ₱0.00';
}

// Event listener for the Clear Cart button
document.getElementById('clear-cart-btn').addEventListener('click', clearCart);

    document.getElementById('checkout-btn').addEventListener('click', function() {
        if (cartItems.length === 0) {
            alert("Your cart is empty! Please add items before checking out.");
        } else {
            // Redirect to checkout page (assuming checkout.html is your checkout page)
            window.location.href = 'checkout.html';
        }
    });
    
    

   // Function to handle star rating
function setupStarRating() {
    const ratings = document.querySelectorAll('.rating');

    ratings.forEach(rating => {
        rating.addEventListener('click', function(e) {
            if (e.target.classList.contains('star')) {
                const selectedValue = e.target.getAttribute('data-value');
                const productName = rating.getAttribute('data-product');

                // Update the stars based on the selected value
                updateStars(rating, selectedValue);

                // Optionally, save the rating (e.g., send it to a server or save in local storage)
                console.log(`Rated ${productName} with ${selectedValue} stars`);
            }
        });
    });
}

// Function to update star display
function updateStars(ratingElement, value) {
    const stars = ratingElement.querySelectorAll('.star');
    stars.forEach(star => {
        if (star.getAttribute('data-value') <= value) {
            star.textContent = '★'; // Filled star
        } else {
            star.textContent = '☆'; // Empty star
        }
    });
}

// Initialize star ratings on page load
document.addEventListener('DOMContentLoaded', setupStarRating);

    

    // Contact Form Validation
    function validateContactForm(event) {
        let formValid = true;

        const fields = ['full-name', 'phone', 'email', 'address', 'city', 'zip-code', 'message'];
        fields.forEach(id => {
            const value = document.getElementById(id).value;
            if (!value) {
                formValid = false;
                alert(`${id.replace('-', ' ')} is required.`);
            }
        });

        if (!formValid) {
            event.preventDefault();
        }
    }

    document.querySelector('form').addEventListener('submit', validateContactForm);

    window.addEventListener('load', () => {
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(element => {
            element.classList.add('visible');
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Responsive Navbar Toggle
    const navToggle = document.createElement("button");
    navToggle.textContent = "☰";
    navToggle.style.backgroundColor = "#f5deb3";
    navToggle.style.border = "none";
    navToggle.style.fontSize = "1.5rem";
    navToggle.style.cursor = "pointer";
    navToggle.style.display = "none";
    
    const nav = document.querySelector("nav ul");
    document.querySelector("header").prepend(navToggle);

    const toggleMenu = () => {
        nav.classList.toggle("visible");
        nav.style.display = nav.classList.contains("visible") ? "block" : "none";
    };

    navToggle.addEventListener("click", toggleMenu);

    // Handle responsiveness
    const handleResize = () => {
        if (window.innerWidth <= 768) {
            nav.style.display = "none";
            navToggle.style.display = "block";
        } else {
            nav.style.display = "flex";
            navToggle.style.display = "none";
        }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Smooth Scrolling for Anchor Links
    const smoothScroll = () => {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute("href"));
                if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                }
            });
        });
    };
    smoothScroll();

    // Animation on Scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll(".fade-in, .slide-up");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(el => {
            observer.observe(el);
        });
    };
    animateOnScroll();
});
// Example for mobile navigation toggle (if needed)
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('nav');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
