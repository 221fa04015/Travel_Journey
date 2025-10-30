document.addEventListener('DOMContentLoaded', function () {
    // ✅ HEADER + FOOTER
    const headerContent = `
    <header id="nav-bar">
        <nav>
            <img src="./assetes/images/vector-logo.jpg" alt="Company Logo" id="company-logo">
            <marquee><strong>Travel Beyond Borders! Share your adventures and find your next dream destination!</strong></marquee>
            <a href="index.html">Home</a>
            <a href="/">Get Started</a>
            <a href="/signup">Sign In</a>
            <a href="dashboard.html">Account Overview</a>
            <a href="aboutus.html">Our Story</a>
        </nav>
    </header>
    `;

    const footerContent = `
    <footer>
        <div class="foot">
            <h6>&copy; Copyright Reserved..!</h6>
        </div>
        <div class="images" id="logos">
            <img src="./assetes/images/icon-twitter.svg" alt="Twitter Logo">
            <img src="./assetes/images/icon-facebook.svg" alt="Facebook Logo">
            <img src="./assetes/images/icon-instagram.svg" alt="Instagram Logo">
        </div>
    </footer>
    `;

    if (document.getElementById('header')) document.getElementById('header').innerHTML = headerContent;
    if (document.getElementById('footer')) document.getElementById('footer').innerHTML = footerContent;

    // ✅ REGISTER PAGE LOGIC
    const customerForm = document.getElementById('customerForm');
    const agentForm = document.getElementById('agentForm');
    const customerButton = document.getElementById('customerButton');
    const agentButton = document.getElementById('agentButton');
    const addPhoneButton = document.getElementById('addPhone');
    const phoneNumbersContainer = document.getElementById('phoneNumbersContainer');
    const customerFormSubmit = document.getElementById('customerSubmit');
    const agentFormSubmit = document.getElementById('agentSubmit');

    function hideButtons() {
        if (customerButton) customerButton.style.display = 'none';
        if (agentButton) agentButton.style.display = 'none';
    }

    if (customerButton) {
        customerButton.addEventListener('click', function () {
            hideButtons();
            if (customerForm) customerForm.style.display = 'block';
            if (agentForm) agentForm.style.display = 'none';
            clearErrorMessages();
        });
    }

    if (agentButton) {
        agentButton.addEventListener('click', function () {
            hideButtons();
            if (agentForm) agentForm.style.display = 'block';
            if (customerForm) customerForm.style.display = 'none';
            clearErrorMessages();
        });
    }

    if (addPhoneButton) {
        addPhoneButton.addEventListener('click', function () {
            const newPhoneInput = document.createElement('input');
            newPhoneInput.type = 'tel';
            newPhoneInput.className = 'phone';
            newPhoneInput.maxLength = 10;
            phoneNumbersContainer.appendChild(newPhoneInput);
            phoneNumbersContainer.appendChild(document.createElement('br'));
        });
    }

    // ✅ Customer Form Validation
    if (customerFormSubmit) {
        customerFormSubmit.addEventListener('click', function (event) {
            event.preventDefault();
            clearErrorMessages();

            if (validateCustomerForm()) {
                customerForm.submit();
            }
        });
    }

    // ✅ Agent Form Validation
    if (agentFormSubmit) {
        agentFormSubmit.addEventListener('click', function (event) {
            event.preventDefault();
            clearErrorMessages();

            if (validateAgentForm()) {
                agentForm.submit();
            }
        });
    }

    function validateCustomerForm() {
        let isValid = true;
        const username = document.getElementById('username')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const password = document.getElementById('password')?.value.trim();
        const city = document.getElementById('city')?.value.trim();
        const phoneElements = document.querySelectorAll('.phone');
        const phoneNumbers = Array.from(phoneElements).map(input => input.value.trim());

        if (!username || !/^[a-zA-Z\s]+$/.test(username)) {
            displayErrorMessage('error-username', 'Username must contain only alphabets and spaces');
            isValid = false;
        }
        if (!validateEmail(email)) {
            displayErrorMessage('error-email', 'Email must be a valid Gmail address');
            isValid = false;
        }
        if (password.length !== 6) {
            displayErrorMessage('error-password', 'Password must be exactly 6 characters long');
            isValid = false;
        }
        if (!validatePhoneNumbers(phoneNumbers)) {
            displayErrorMessage('error-phone', 'Phone numbers must be 10 digits and unique');
            isValid = false;
        }
        if (!city) {
            displayErrorMessage('error-city', 'City is required');
            isValid = false;
        }

        return isValid;
    }

    function validateAgentForm() {
        let isValid = true;
        const agentName = document.getElementById('agentName')?.value.trim();
        const agentEmail = document.getElementById('agentEmail')?.value.trim();
        const agentPassword = document.getElementById('agentPassword')?.value.trim();
        const agentId = document.getElementById('agentId')?.value.trim();

        if (!agentName || !/^[a-zA-Z\s]+$/.test(agentName)) {
            displayErrorMessage('error-agentName', 'Agent Name must contain only alphabets and spaces');
            isValid = false;
        }
        if (!validateEmail(agentEmail)) {
            displayErrorMessage('error-agentEmail', 'Email must be a valid Gmail address');
            isValid = false;
        }
        if (agentPassword.length !== 6) {
            displayErrorMessage('error-agentPassword', 'Password must be exactly 6 characters long');
            isValid = false;
        }
        if (!agentId) {
            displayErrorMessage('error-agentId', 'Agent ID is required');
            isValid = false;
        }

        return isValid;
    }

    // ✅ Common Utility Functions
    function displayErrorMessage(id, message) {
        const el = document.getElementById(id);
        if (el) {
            el.innerText = message;
            el.style.display = 'block';
            el.style.color = 'red';
        }
    }

    function clearErrorMessages() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.innerText = '';
            el.style.display = 'none';
        });
    }

    function validateEmail(email) {
        return /^[^\s@]+@gmail\.com$/.test(email);
    }

    function validatePhoneNumbers(phoneNumbers) {
        const phoneRegex = /^[0-9]{10}$/;
        const uniquePhones = new Set(phoneNumbers);
        return phoneNumbers.every(p => phoneRegex.test(p)) && uniquePhones.size === phoneNumbers.length;
    }

    // ✅ LOGIN PAGE
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const name = document.getElementById('college').value.trim();
            const email = document.getElementById('mail').value.trim();
            const password = document.getElementById('password').value.trim();

            if (name === "" || !/^[a-zA-Z\s]+$/.test(name)) {
                alert("Please enter a valid name");
            } else if (!validateEmail(email)) {
                alert("Please enter a valid email");
            } else if (password.length < 6) {
                alert("Password must be at least 6 characters long");
            } else {
                alert("Login Successful!");
            }
        });
    }

    // ✅ DASHBOARD PAGE
    const name = sessionStorage.getItem('name');
    const email = sessionStorage.getItem('email');
    const phone = sessionStorage.getItem('phone');
    const city = sessionStorage.getItem('city');

    if (document.getElementById('userName')) document.getElementById('userName').textContent = name || 'Not available';
    if (document.getElementById('userEmail')) document.getElementById('userEmail').textContent = email || 'Not available';
    if (document.getElementById('userPhone')) document.getElementById('userPhone').textContent = phone || 'Not available';
    if (document.getElementById('userCity')) document.getElementById('userCity').textContent = city || 'Not available';
});

// ✅ jQuery Button Navigation
$(document).ready(function() {
    $('#user-btn').on('click', function() {
        window.location.href = '/user_register';
    });
  
    $('#agent-btn').on('click', function() {
        window.location.href = '/agent_register';
    });
});
