// DOM elements
const wrapper = document.querySelector('.logreg-box');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const loginForm = document.querySelector('.form-box.login form');
const registerForm = document.querySelector('.form-box.register form');

// Switch between login and register forms
registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    wrapper.classList.remove('active');
});

// Login form validation and submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = loginForm.querySelector('input[type="email"]').value.trim();
    const password = loginForm.querySelector('input[type="password"]').value.trim();
    
    // Basic validation
    if (!email || !validateEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }
    
    if (!password) {
        showError('Please enter your password');
        return;
    }
    
    // If validation passes, submit the form to the backend
    console.log('Login attempt with:', { email });
    
    // Here you would typically make an AJAX request to your backend
    // For example:
    /*
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = '/dashboard';
        } else {
            showError(data.message || 'Login failed. Please check your credentials.');
        }
    })
    .catch(error => {
        showError('An error occurred. Please try again later.');
        console.error('Login error:', error);
    });
    */
});

// Registration form validation and submission
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = registerForm.querySelector('input[name="username"]').value.trim();
    const email = registerForm.querySelector('input[type="email"]').value.trim();
    const password = registerForm.querySelector('input[type="password"]').value.trim();
    const confirmPassword = registerForm.querySelector('input[name="confirm-password"]').value.trim();
    const agreeTerms = registerForm.querySelector('input[type="checkbox"]').checked;
    
    // Basic validation
    if (!username || username.length < 3) {
        showError('Username must be at least 3 characters long');
        return;
    }
    
    if (!email || !validateEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }
    
    if (!password || password.length < 8) {
        showError('Password must be at least 8 characters long');
        return;
    }
    
    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }
    
    if (!agreeTerms) {
        showError('You must agree to the terms and conditions');
        return;
    }
    
    // If validation passes, submit the form to the backend
    console.log('Registration attempt with:', { username, email });
    
    // Here you would typically make an AJAX request to your backend
    // Similar to the login process above
});

// Helper functions
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.cssText = 'color: #ff3333; font-size: 14px; margin-top: 10px; text-align: center;';
    
    // Remove any existing error messages
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    
    // Add the new error message
    const activeForm = wrapper.classList.contains('active') ? registerForm : loginForm;
    activeForm.appendChild(errorElement);
    
    // Remove the error message after 3 seconds
    setTimeout(() => {
        errorElement.remove();
    }, 3000);
}

// Add input animation for better UX
document.querySelectorAll('.input-box input').forEach(input => {
    // Check if input already has a value on page load
    if (input.value !== '') {
        input.nextElementSibling.classList.add('active');
    }
    
    // Add focus event
    input.addEventListener('focus', () => {
        input.nextElementSibling.classList.add('active');
    });
    
    // Add blur event
    input.addEventListener('blur', () => {
        if (input.value === '') {
            input.nextElementSibling.classList.remove('active');
        }
    });
});