// Sidebar toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.querySelector('.toggle-btn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                sidebar.classList.toggle('active');
            }
        });
    }
});

// Accordion functionality
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', (event) => {
        // Toggle the clicked accordion item
        const content = header.nextElementSibling;
        const isActive = content.style.display === "block";

        // Close all accordion items
        document.querySelectorAll('.accordion-content').forEach(item => {
            item.style.display = "none";
        });

        // If the clicked item was not active, open it
        if (!isActive) {
            content.style.display = "block";
        }

        event.stopPropagation();
    });
});

window.addEventListener('click', ()=>{
    // Close all accordion items
    document.querySelectorAll('.accordion-content').forEach(item => {
        item.style.display = "none";
    });
})

// Scroll to top functionality
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// Show or hide the button based on scroll position
window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

// Scroll to the top when the button is clicked
scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling
    });
});



// Form validation and submission handlers
document.addEventListener('DOMContentLoaded', function() {
    // Handle all form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                return false;
            }
            showLoadingState(this);
        });
    });

    // Button click handlers for user pages
    setupUserButtonHandlers();

    // Button click handlers for agent pages
    setupAgentButtonHandlers();

    // Modal management
    setupModalHandlers();

    // Search and filter functionality
    setupSearchAndFilter();
});

// Form validation function
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            showError(input, 'This field is required');
            isValid = false;
        } else {
            clearError(input);
        }

        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                showError(input, 'Please enter a valid email address');
                isValid = false;
            }
        }

        // Phone validation
        if (input.type === 'tel' && input.value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(input.value.replace(/[\s\-\(\)]/g, ''))) {
                showError(input, 'Please enter a valid phone number');
                isValid = false;
            }
        }
    });

    return isValid;
}

function showError(input, message) {
    clearError(input);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
    input.classList.add('error');
}

function clearError(input) {
    const errorDiv = input.parentNode.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
    input.classList.remove('error');
}

function showLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing...';
    }
}

// User page button handlers
function setupUserButtonHandlers() {
    // Explore buttons in spots page
    document.querySelectorAll('.btn-primary').forEach(btn => {
        if (btn.textContent.includes('Explore')) {
            btn.addEventListener('click', function() {
                const spotCard = this.closest('.spot-card');
                const spotName = spotCard.querySelector('h3').textContent;
                showSpotDetails(spotName);
            });
        }

        if (btn.textContent.includes('Search')) {
            btn.addEventListener('click', function() {
                const searchInput = document.querySelector('input[placeholder*="Search"]');
                if (searchInput && searchInput.value.trim()) {
                    performSearch(searchInput.value.trim());
                }
            });
        }

        if (btn.textContent.includes('Book Now')) {
            btn.addEventListener('click', function() {
                const flightCard = this.closest('.flight-card');
                if (flightCard) {
                    const flightInfo = flightCard.querySelector('.flight-info h4').textContent;
                    bookFlight(flightInfo);
                }
            });
        }

        if (btn.textContent.includes('Contact Agency')) {
            btn.addEventListener('click', function() {
                const agencyCard = this.closest('.agency-card');
                const agencyName = agencyCard.querySelector('h3').textContent;
                contactAgency(agencyName);
            });
        }

        if (btn.textContent.includes('Check Status')) {
            btn.addEventListener('click', function() {
                const flightNumber = document.getElementById('flight-number').value;
                const date = document.getElementById('date').value;
                if (flightNumber && date) {
                    checkFlightStatus(flightNumber, date);
                }
            });
        }

        if (btn.textContent.includes('Save Preferences')) {
            btn.addEventListener('click', function() {
                savePreferences();
            });
        }

        if (btn.textContent.includes('Add New Payment Method')) {
            btn.addEventListener('click', function() {
                showAddPaymentModal();
            });
        }

        if (btn.textContent.includes('View Details')) {
            btn.addEventListener('click', function() {
                const alertCard = this.closest('.alert-card');
                if (alertCard) {
                    const alertTitle = alertCard.querySelector('h3').textContent;
                    showAlertDetails(alertTitle);
                }
            });
        }

        if (btn.textContent.includes('View Package')) {
            btn.addEventListener('click', function() {
                const suggestionCard = this.closest('.suggestion-card');
                const packageName = suggestionCard.querySelector('h3').textContent;
                viewPackage(packageName);
            });
        }

        if (btn.textContent.includes('Update Profile')) {
            btn.addEventListener('click', function() {
                updateProfile();
            });
        }

        if (btn.textContent.includes('Write Review')) {
            btn.addEventListener('click', function() {
                const tripCard = this.closest('.trip-card');
                const tripName = tripCard.querySelector('h3').textContent;
                writeReview(tripName);
            });
        }

        if (btn.textContent.includes('Export Travel History')) {
            btn.addEventListener('click', function() {
                exportHistory();
            });
        }

        if (btn.textContent.includes('Edit Booking')) {
            btn.addEventListener('click', function() {
                const bookingCard = this.closest('.booking-card');
                const bookingId = bookingCard.dataset.bookingId;
                editBooking(bookingId);
            });
        }

        if (btn.textContent.includes('Cancel Booking')) {
            btn.addEventListener('click', function() {
                const bookingCard = this.closest('.booking-card');
                const bookingId = bookingCard.dataset.bookingId;
                if (confirm('Are you sure you want to cancel this booking?')) {
                    cancelBooking(bookingId);
                }
            });
        }

        if (btn.textContent.includes('Add New Booking')) {
            btn.addEventListener('click', function() {
                window.location.href = '/user/book-flight';
            });
        }
    });
}

// Agent page button handlers
function setupAgentButtonHandlers() {
    // Add new buttons
    document.querySelectorAll('.btn-primary').forEach(btn => {
        if (btn.textContent.includes('Add New Client')) {
            btn.addEventListener('click', function() {
                showAddClientModal();
            });
        }

        if (btn.textContent.includes('Add New Service')) {
            btn.addEventListener('click', function() {
                showAddServiceModal();
            });
        }

        if (btn.textContent.includes('Create New Offer')) {
            btn.addEventListener('click', function() {
                showCreateOfferModal();
            });
        }

        if (btn.textContent.includes('Create New Package')) {
            btn.addEventListener('click', function() {
                showCreatePackageModal();
            });
        }

        if (btn.textContent.includes('Export Report')) {
            btn.addEventListener('click', function() {
                exportReport();
            });
        }

        if (btn.textContent.includes('Create Campaign')) {
            btn.addEventListener('click', function() {
                showCreateCampaignModal();
            });
        }

        if (btn.textContent.includes('Open Calculator')) {
            btn.addEventListener('click', function() {
                openPricingCalculator();
            });
        }

        if (btn.textContent.includes('Open Builder')) {
            btn.addEventListener('click', function() {
                openItineraryBuilder();
            });
        }
    });

    // Action buttons (Edit, View, Delete, etc.)
    document.querySelectorAll('.btn-small').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.toLowerCase();
            const row = this.closest('tr') || this.closest('.service-item') || this.closest('.package-card');
            const itemId = row.dataset.id || row.id;

            switch(action) {
                case 'edit':
                    editItem(itemId);
                    break;
                case 'view':
                    viewItem(itemId);
                    break;
                case 'delete':
                    if (confirm('Are you sure you want to delete this item?')) {
                        deleteItem(itemId);
                    }
                    break;
                case 'analytics':
                    showAnalytics(itemId);
                    break;
                case 'duplicate':
                    duplicateItem(itemId);
                    break;
            }
        });
    });

    // Secondary buttons
    document.querySelectorAll('.btn-secondary').forEach(btn => {
        if (btn.textContent.includes('Import Clients')) {
            btn.addEventListener('click', function() {
                importClients();
            });
        }

        if (btn.textContent.includes('Send Newsletter')) {
            btn.addEventListener('click', function() {
                sendNewsletter();
            });
        }

        if (btn.textContent.includes('Bulk Update Pricing')) {
            btn.addEventListener('click', function() {
                bulkUpdatePricing();
            });
        }

        if (btn.textContent.includes('Filter History')) {
            btn.addEventListener('click', function() {
                toggleFilterModal();
            });
        }

        if (btn.textContent.includes('Apply Filters')) {
            btn.addEventListener('click', function() {
                applyFilters();
            });
        }
    });
}

// Modal management
function setupModalHandlers() {
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            closeAllModals();
        }
    });

    // Close buttons
    document.querySelectorAll('.modal-close, .btn-cancel').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });
}

function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.style.display = 'none';
    });
}

// Search and filter functionality
function setupSearchAndFilter() {
    // Real-time search
    const searchInputs = document.querySelectorAll('input[placeholder*="Search"], input[placeholder*="search"]');
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const items = document.querySelectorAll('.spot-card, .agency-card, .client-item, .service-item');

            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(query) ? 'block' : 'none';
            });
        });
    });

    // Filter tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');

            const filter = this.textContent.toLowerCase();
            filterPackages(filter);
        });
    });
}

// Action functions
function showSpotDetails(spotName) {
    alert(`Showing details for ${spotName}`);
    // In a real app, this would navigate to a details page or open a modal
}

function performSearch(query) {
    alert(`Searching for: ${query}`);
    // Implement search logic
}

function bookFlight(flightInfo) {
    alert(`Booking flight: ${flightInfo}`);
    // Implement booking logic
}

function contactAgency(agencyName) {
    alert(`Contacting ${agencyName}`);
    // Implement contact logic
}

function checkFlightStatus(flightNumber, date) {
    // Show loading
    const statusSection = document.querySelector('.flight-status');
    statusSection.style.display = 'block';

    // Simulate API call
    setTimeout(() => {
        document.querySelector('.status-info h3').textContent = `Flight ${flightNumber} Status`;
        // In real app, fetch actual status
    }, 1000);
}

function savePreferences() {
    alert('Preferences saved successfully!');
}

function showAddPaymentModal() {
    const modal = document.querySelector('.payment-form');
    if (modal) {
        modal.style.display = 'block';
    }
}

function showAlertDetails(alertTitle) {
    alert(`Details for: ${alertTitle}`);
}

function viewPackage(packageName) {
    alert(`Viewing package: ${packageName}`);
}

function updateProfile() {
    alert('Profile updated successfully!');
}

function writeReview(tripName) {
    alert(`Writing review for: ${tripName}`);
}

function exportHistory() {
    alert('Exporting travel history...');
    // Implement export logic
}

function editBooking(bookingId) {
    alert(`Editing booking: ${bookingId}`);
}

function cancelBooking(bookingId) {
    alert(`Cancelling booking: ${bookingId}`);
}

function showAddClientModal() {
    alert('Opening add client modal');
}

function showAddServiceModal() {
    alert('Opening add service modal');
}

function showCreateOfferModal() {
    alert('Opening create offer modal');
}

function showCreatePackageModal() {
    alert('Opening create package modal');
}

function exportReport() {
    alert('Exporting report...');
}

function showCreateCampaignModal() {
    alert('Opening create campaign modal');
}

function openPricingCalculator() {
    alert('Opening pricing calculator');
}

function openItineraryBuilder() {
    alert('Opening itinerary builder');
}

function editItem(itemId) {
    alert(`Editing item: ${itemId}`);
}

function viewItem(itemId) {
    alert(`Viewing item: ${itemId}`);
}

function deleteItem(itemId) {
    alert(`Deleting item: ${itemId}`);
}

function showAnalytics(itemId) {
    alert(`Showing analytics for: ${itemId}`);
}

function duplicateItem(itemId) {
    alert(`Duplicating item: ${itemId}`);
}

function importClients() {
    alert('Importing clients...');
}

function sendNewsletter() {
    alert('Sending newsletter...');
}

function bulkUpdatePricing() {
    alert('Bulk updating pricing...');
}

function toggleFilterModal() {
    const filterSection = document.querySelector('.history-filters');
    if (filterSection) {
        filterSection.classList.toggle('active');
    }
}

function applyFilters() {
    alert('Applying filters...');
}

function filterPackages(filter) {
    const packages = document.querySelectorAll('.package-card');
    packages.forEach(pkg => {
        if (filter === 'all' || pkg.classList.contains(filter.toLowerCase())) {
            pkg.style.display = 'block';
        } else {
            pkg.style.display = 'none';
        }
    });
}

// Utility functions
function showSuccessMessage(message) {
    // Create and show success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1000;
    `;

    document.body.appendChild(successDiv);

    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #dc3545;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1000;
    `;

    document.body.appendChild(errorDiv);

    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// Modal functions for profile page
function openChangePasswordModal() {
    document.getElementById('changePasswordModal').style.display = 'block';
}

function closeChangePasswordModal() {
    document.getElementById('changePasswordModal').style.display = 'none';
}

function confirmDeleteAccount() {
    document.getElementById('deleteAccountModal').style.display = 'block';
}

function closeDeleteAccountModal() {
    document.getElementById('deleteAccountModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const changePasswordModal = document.getElementById('changePasswordModal');
    const deleteAccountModal = document.getElementById('deleteAccountModal');
    if (event.target == changePasswordModal) {
        changePasswordModal.style.display = 'none';
    }
    if (event.target == deleteAccountModal) {
        deleteAccountModal.style.display = 'none';
    }
}
