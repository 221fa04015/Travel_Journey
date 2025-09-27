<<<<<<< HEAD
<<<<<<< HEAD
// const headerContent = `

// <header id="nav-bar">

//         <nav>
//             <img src="./assetes/images/vector-logo.jpg" alt="Company Logo" id="company-logo">
//             <marquee><strong>Travel Beyond Borders! Share your adventures and find your next dream destination!</strong></marquee>
//             <a href="index.html">Home</a>
//             <a href="/">Get Started</a>
//             <a href="/signup">Sign In</a>
//             <a href="dashboard.html">Account Overview</a>
//             <a href="aboutus.html">Our Story</a>
//         </nav>
//     </header>
// `;

// const footerContent = `
//     <footer>
//         <div class="foot">
//             <h6>&copy; Copyright Reserved..!</h6>
//         </div>
//         <div class="images" id="logos">
//             <img src="./assetes/images/icon-twitter.svg" alt="Twitter Logo">
//             <img src="./assetes/images/icon-facebook.svg" alt="Facebook Logo">
//             <img src="./assetes/images/icon-instagram.svg" alt="Instagram Logo">
//         </div>
//     </footer>
// `;

// document.getElementById('header').innerHTML = headerContent;
// document.getElementById('footer').innerHTML = footerContent;

////register page
document.addEventListener('DOMContentLoaded', function () {
    // Form and button selection
=======
=======
>>>>>>> cd9229d73a1034001cfcd39cd3223848458f6144
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

document.getElementById('header').innerHTML = headerContent;
document.getElementById('footer').innerHTML = footerContent;

////register page

document.addEventListener('DOMContentLoaded', function () {
    // Form selection logic
<<<<<<< HEAD
>>>>>>> aa36d4b493bc5aecd06e257bc9614cfc2a753e76
=======
>>>>>>> cd9229d73a1034001cfcd39cd3223848458f6144
    const customerForm = document.getElementById('customerForm');
    const agentForm = document.getElementById('agentForm');
    const customerButton = document.getElementById('customerButton');
    const agentButton = document.getElementById('agentButton');
<<<<<<< HEAD
<<<<<<< HEAD
    const addPhoneButton = document.getElementById('addPhone');
    const phoneNumbersContainer = document.getElementById('phoneNumbersContainer');

    // Hide buttons function
    function hideButtons() {
        customerButton.style.display = 'none';
        agentButton.style.display = 'none';
    }

    // Show customer form and hide agent form and buttons
    customerButton.addEventListener('click', function () {
        hideButtons();
        customerForm.style.display = 'block';
        agentForm.style.display = 'none';
        clearErrorMessages();
    });

    // Show agent form and hide customer form and buttons
    agentButton.addEventListener('click', function () {
        hideButtons();
        agentForm.style.display = 'block';
        customerForm.style.display = 'none';
        clearErrorMessages();
    });

    // Add phone number input dynamically
    addPhoneButton.addEventListener('click', function () {
        const newPhoneInput = document.createElement('input');
        newPhoneInput.type = 'tel';
        newPhoneInput.className = 'phone';
        newPhoneInput.name = 'phone';
        newPhoneInput.maxLength = 10; // Ensure only 10 digits are entered
        phoneNumbersContainer.appendChild(newPhoneInput);
        phoneNumbersContainer.appendChild(document.createElement('br'));
    });

    // Customer form validation and submission
    const customerFormSubmit = document.getElementById('customerSubmit');
=======
=======
>>>>>>> cd9229d73a1034001cfcd39cd3223848458f6144
    const phoneNumbersContainer = document.getElementById('phoneNumbersContainer');
    const addPhoneButton = document.getElementById('addPhone');

    // Customer form fields
    const customerFormSubmit = document.getElementById('customerSubmit');
    const agentFormSubmit = document.getElementById('agentSubmit');

    // Show customer form when button is clicked
    customerButton.addEventListener('click', function () {
        customerForm.style.display = 'block';
        agentForm.style.display = 'none';
        clearErrorMessages(); // Clear any previous error messages
    });

    // Show agent form when button is clicked
    agentButton.addEventListener('click', function () {
        agentForm.style.display = 'block';
        customerForm.style.display = 'none';
        clearErrorMessages(); // Clear any previous error messages
    });

    // Customer form validation
<<<<<<< HEAD
>>>>>>> aa36d4b493bc5aecd06e257bc9614cfc2a753e76
=======
>>>>>>> cd9229d73a1034001cfcd39cd3223848458f6144
    if (customerFormSubmit) {
        customerFormSubmit.addEventListener('click', function (event) {
            event.preventDefault();
            clearErrorMessages();
<<<<<<< HEAD
<<<<<<< HEAD
            if (validateCustomerForm()) {
                customerForm.submit(); // Submit the form if valid
            }
        });
    }

    // Agent form validation and submission
    const agentFormSubmit = document.getElementById('agentSubmit');
=======
=======
>>>>>>> cd9229d73a1034001cfcd39cd3223848458f6144

            // Get customer form values
            const name = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const city = document.getElementById('city').value.trim();

            // Validate phone numbers
            const phoneInputs = document.querySelectorAll('.phone');
            let phoneValid = true;
            let phoneNumbers = [];
            let seenNumbers = new Set();

            phoneInputs.forEach((input, index) => {
                const phone = input.value.trim();
                if (phone === "" || !/^\d{10}$/.test(phone)) {
                    displayErrorMessage('phoneError', `Phone number ${index + 1} is invalid. Please enter a valid 10-digit number.`);
                    phoneValid = false;
                } else if (seenNumbers.has(phone)) {
                    displayErrorMessage('phoneError', `Phone number ${phone} is already entered. Please enter unique phone numbers.`);
                    phoneValid = false;
                } else {
                    phoneNumbers.push(phone);
                    seenNumbers.add(phone);
                }
            });

            // Validation logic for other fields
            let valid = true;

            if (name === "" || !/^[a-zA-Z\s]+$/.test(name)) {
                displayErrorMessage('usernameError', "Please enter a valid name (only alphabets and spaces)");
                valid = false;
            }
            if (email === "" || !validateEmail(email)) {
                displayErrorMessage('emailError', "Please enter a valid email");
                valid = false;
            }
            if (password.length < 6) {
                displayErrorMessage('passwordError', "Password must be at least 6 characters long");
                valid = false;
            }
            if (city === "") {
                displayErrorMessage('cityError', "City is required");
                valid = false;
            }

            // If all validations pass
            if (valid && phoneValid) {
                // storeUserData(name, email, password, phoneNumbers, city);
                document.body.innerHTML += "<p>Customer form submitted successfully!</p>";
                // window.location.href = './dashboard.html';
            }
        });

        // Add phone number input dynamically
        addPhoneButton.addEventListener('click', function () {
            const newPhoneInput = document.createElement('input');
            newPhoneInput.type = 'tel';
            newPhoneInput.className = 'phone';
            newPhoneInput.required = true;
            phoneNumbersContainer.appendChild(newPhoneInput);
            phoneNumbersContainer.appendChild(document.createElement('br'));
        });
    }

    // Travel Agent form validation
<<<<<<< HEAD
>>>>>>> aa36d4b493bc5aecd06e257bc9614cfc2a753e76
=======
>>>>>>> cd9229d73a1034001cfcd39cd3223848458f6144
    if (agentFormSubmit) {
        agentFormSubmit.addEventListener('click', function (event) {
            event.preventDefault();
            clearErrorMessages();
<<<<<<< HEAD
<<<<<<< HEAD
            if (validateAgentForm()) {
                agentForm.submit(); // Submit the form if valid
=======
=======
>>>>>>> cd9229d73a1034001cfcd39cd3223848458f6144

            // Get travel agent form values
            const name = document.getElementById('agentName').value.trim();
            const email = document.getElementById('agentEmail').value.trim();
            const password = document.getElementById('agentPassword').value;
            const agentId = document.getElementById('agentId').value.trim();

            let valid = true;

            if (name === "" || !/^[a-zA-Z\s]+$/.test(name)) {
                displayErrorMessage('agentNameError', "Please enter a valid name (only alphabets and spaces)");
                valid = false;
            }
            if (email === "" || !validateEmail(email)) {
                displayErrorMessage('agentEmailError', "Please enter a valid email");
                valid = false;
            }
            if (password.length < 6) {
                displayErrorMessage('agentPasswordError', "Password must be at least 6 characters long");
                valid = false;
            }
            if (agentId === "") {
                displayErrorMessage('agentIdError', "Travel Agent ID is required");
                valid = false;
            }

            // If all validations pass
            if (valid) {
                // storeAgentData(name, email, password, agentId);
                document.body.innerHTML += "<p>Travel agent form submitted successfully!</p>";
                // window.location.href = './dashboard.html';
<<<<<<< HEAD
>>>>>>> aa36d4b493bc5aecd06e257bc9614cfc2a753e76
=======
>>>>>>> cd9229d73a1034001cfcd39cd3223848458f6144
            }
        });
    }

<<<<<<< HEAD
<<<<<<< HEAD
    // Validation for customer form
    function validateCustomerForm() {
        let isValid = true;

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const phoneElements = document.querySelectorAll('.phone');
        const city = document.getElementById('city').value.trim();

        // Name validation: Only alphabets and spaces
        if (username === '' || !/^[a-zA-Z\s]+$/.test(username)) {
            displayErrorMessage('error-username', 'Username must contain only alphabets and spaces');
            isValid = false;
        }

        // Email validation: Must be a Gmail address
        if (!validateEmail(email)) {
            displayErrorMessage('error-email', 'Email must be a valid Gmail address');
            isValid = false;
        }

        // Password validation: Exactly 6 characters
if (password.length !== 6) {
    displayErrorMessage('error-password', 'Password must be exactly 6 characters long');
    isValid = false;
}


        // Phone validation: 10 digits and no duplicate numbers
        const phoneNumbers = Array.from(phoneElements).map(input => input.value.trim());
        if (!validatePhoneNumbers(phoneNumbers)) {
            displayErrorMessage('error-phone', 'Phone numbers must be 10 digits and unique');
            isValid = false;
        }

        if (city === '') {
            displayErrorMessage('error-city', 'City is required');
            isValid = false;
        }

        return isValid;
    }

    // Validation for agent form
    function validateAgentForm() {
        let isValid = true;

        const agentName = document.getElementById('agentName').value.trim();
        const agentEmail = document.getElementById('agentEmail').value.trim();
        const agentPassword = document.getElementById('agentPassword').value.trim();
        const agentId = document.getElementById('agentId').value.trim();

        // Name validation: Only alphabets and spaces
        if (agentName === '' || !/^[a-zA-Z\s]+$/.test(agentName)) {
            displayErrorMessage('error-agentName', 'Agent Name must contain only alphabets and spaces');
            isValid = false;
        }

        // Email validation: Must be a Gmail address
        if (!validateEmail(agentEmail)) {
            displayErrorMessage('error-agentEmail', 'Email must be a valid Gmail address');
            isValid = false;
        }

        // Password validation:  6 characters
        if (agentPassword.length !== 6) {
            displayErrorMessage('error-agentPassword', 'Password must be at least 6 characters long');
            isValid = false;
        }

        if (agentId === '') {
            displayErrorMessage('error-agentId', 'Agent ID is required');
            isValid = false;
        }

        return isValid;
    }

    // Helper function to display error message
    function displayErrorMessage(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.innerText = message;
        errorElement.style.display = 'block';
    }

    // Clear all error messages
    function clearErrorMessages() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach((el) => {
            el.innerText = '';
            el.style.display = 'none';
        });
    }

    // Email validation: Must be Gmail
    function validateEmail(email) {
        const re = /^[^\s@]+@gmail\.com$/; // Restrict to Gmail addresses only
        return re.test(email);
    }

    // Phone validation: 10 digits and unique phone numbers
    function validatePhoneNumbers(phoneNumbers) {
        const phoneRegex = /^[0-9]{10}$/;
        const uniquePhones = new Set(phoneNumbers);
        
        return phoneNumbers.every(phone => phoneRegex.test(phone)) && uniquePhones.size === phoneNumbers.length;
    }







    
   ////// Login Page Logic







   
//    const loginForm = document.getElementById('loginForm');

//    if (loginForm) {
//        loginForm.addEventListener('submit', function (event) {
//            event.preventDefault(); // Prevent the default form submission
   
//            const name = document.getElementById('college').value.trim(); // Get the name input
//            const email = document.getElementById('mail').value.trim();
//            const password = document.getElementById('password').value.trim();
   
//            // Basic validation
//            if (name === "" || !/^[a-zA-Z\s]+$/.test(name)) {
//                alert("Please enter a valid name (only alphabets and spaces)");
//            } else if (email === "" || !validateEmail(email)) {
//                alert("Please enter a valid email");
//            } else if (password.length < 6) {
//                alert("Password must be at least 6 characters long");
//            } else {
//                // Validate credentials against stored data
//                validateCredentials(name, email, password);
//            }
//        });
//    }
   
//    // Email validation function
//    function validateEmail(email) {
//        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//        return re.test(email);
//    }
=======
=======
>>>>>>> cd9229d73a1034001cfcd39cd3223848458f6144
    // Function to validate email format
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Function to display error messages
    function displayErrorMessage(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.innerHTML = message;
        errorElement.style.color = 'red';
    }

    // Function to clear error messages
    function clearErrorMessages() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.innerHTML = '';
        });
    }

    
   ////// Login Page Logic
   const loginForm = document.getElementById('loginForm');

   if (loginForm) {
       loginForm.addEventListener('submit', function (event) {
           event.preventDefault(); // Prevent the default form submission
   
           const name = document.getElementById('college').value.trim(); // Get the name input
           const email = document.getElementById('mail').value.trim();
           const password = document.getElementById('password').value.trim();
   
           // Basic validation
           if (name === "" || !/^[a-zA-Z\s]+$/.test(name)) {
               alert("Please enter a valid name (only alphabets and spaces)");
           } else if (email === "" || !validateEmail(email)) {
               alert("Please enter a valid email");
           } else if (password.length < 6) {
               alert("Password must be at least 6 characters long");
           } else {
               // Validate credentials against stored data
               validateCredentials(name, email, password);
           }
       });
   }
   
   // Email validation function
   function validateEmail(email) {
       const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
       return re.test(email);
   }
<<<<<<< HEAD
>>>>>>> aa36d4b493bc5aecd06e257bc9614cfc2a753e76
=======
>>>>>>> cd9229d73a1034001cfcd39cd3223848458f6144
   
   // Store data temporarily using sessionStorage
//    function storeUserData(name, email, password, phone, city) {
//        sessionStorage.setItem('name', name);
//        sessionStorage.setItem('email', email);
//        sessionStorage.setItem('password', password); // Store the password as well
//        sessionStorage.setItem('phone', phone);
//        sessionStorage.setItem('city', city);
//    }
   
   // Function to validate credentials
//    function validateCredentials(name, email, password) {
//        const storedName = sessionStorage.getItem('name');
//        const storedEmail = sessionStorage.getItem('email');
//        const storedPassword = sessionStorage.getItem('password');
   
//        // Log the retrieved values for debugging
//        console.log('Stored credentials:', { storedName, storedEmail, storedPassword });
//        console.log('Entered credentials:', { name, email, password });
   
//        // Check if the credentials match
//        if (name === storedName && email === storedEmail && password === storedPassword) {
//            alert("Login successful!");
//            // Redirect to dashboard
//            window.location.href = './dashboard.html';
//        } else {
//            alert("Invalid credentials, please try again.");
//        }
//    }

   
   
});

<<<<<<< HEAD
<<<<<<< HEAD
// profile

// Profile.js
document.addEventListener('DOMContentLoaded', () => {
    const editCustomerButton = document.getElementById('editCustomer');
    const editCustomerForm = document.getElementById('editCustomerForm');
    
    const editAgentButton = document.getElementById('editAgent');
    const editAgentForm = document.getElementById('editAgentForm');

    // Toggle customer edit form
    editCustomerButton.addEventListener('click', () => {
        editCustomerForm.style.display = editCustomerForm.style.display === 'none' ? 'block' : 'none';
    });

    // Toggle agent edit form
    editAgentButton.addEventListener('click', () => {
        editAgentForm.style.display = editAgentForm.style.display === 'none' ? 'block' : 'none';
    });

    // Handle customer form submission
    editCustomerForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent default form submission
        
        const formData = new FormData(editCustomerForm);
        const response = await fetch(editCustomerForm.action, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('Customer profile updated successfully!');
            location.reload(); // Reload the page to show updated data
        } else {
            const errorMessage = await response.text();
            alert(`Error updating customer profile: ${errorMessage}`);
        }
    });

    // Handle agent form submission
    editAgentForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent default form submission
        
        const formData = new FormData(editAgentForm);
        const response = await fetch(editAgentForm.action, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('Agent profile updated successfully!');
            location.reload(); // Reload the page to show updated data
        } else {
            const errorMessage = await response.text();
            alert(`Error updating agent profile: ${errorMessage}`);
        }
    });
});
=======
=======
>>>>>>> cd9229d73a1034001cfcd39cd3223848458f6144


  







/////////// Dashboard
document.addEventListener('DOMContentLoaded', function () {
    // Retrieve user data from sessionStorage
    const name = sessionStorage.getItem('name');
    const email = sessionStorage.getItem('email');
    const phone = sessionStorage.getItem('phone');
    const city = sessionStorage.getItem('city');

    // Display the user data
    document.getElementById('userName').textContent = name || 'Not available';
    document.getElementById('userEmail').textContent = email || 'Not available';
    document.getElementById('userPhone').textContent = phone || 'Not available';
    document.getElementById('userCity').textContent = city || 'Not available';

    // Debugging: Log the retrieved data
    console.log('User data retrieved:', { name, email, phone, city });
});


///// experience from

// document.getElementById('experience-form').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent the default form submission

//     const name = document.getElementById('name').value;
//     const destination = document.getElementById('destination').value;
//     const experience = document.getElementById('experience').value;
//     const image = document.getElementById('image').files[0];

//     console.log('Name:', name);
//     console.log('Destination:', destination);
//     console.log('Experience:', experience);
//     if (image) {
//         console.log('Image:', image.name);
//     }

//     // Here you can add code to send the data to your server or API
// });




$(document).ready(function() {
    $('#user-btn').on('click', function() {
      window.location.href = '/user_register';
    });
  
    $('#agent-btn').on('click', function() {
      window.location.href = '/agent_register';
    });
  });
<<<<<<< HEAD
  
>>>>>>> aa36d4b493bc5aecd06e257bc9614cfc2a753e76
=======
  
>>>>>>> cd9229d73a1034001cfcd39cd3223848458f6144
