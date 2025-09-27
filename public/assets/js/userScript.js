document.querySelector('.toggle-btn').addEventListener('click', function() {
    const sidebar = document.querySelector('.sidebar');
    console.log('drawer')
    sidebar.classList.toggle('active'); // Toggle the active class
    sidebar.classList.toggle('deActive'); // Toggle the active class
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

// Get the button
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

function openOverlay() {
    document.getElementById('editProfileOverlay').style.display = 'flex';
  }

  function closeOverlay() {
    document.getElementById('editProfileOverlay').style.display = 'none';
  }


  function toggleAccordion(item) {
    const isActive = item.classList.contains('active');
    
    // Close all accordion items
    const items = document.querySelectorAll('.accordion-item');
    items.forEach(i => {
        i.classList.remove('active');
    });
    
    // If it wasn't already active, open the clicked item
    if (!isActive) {
        item.classList.add('active');
    }
}

// hamberger
// Select elements
const toggleBtn = document.querySelector('.toggle-btn');
const sidebar = document.querySelector('.sidebar');
const content = document.querySelector('.main-content');
const header = document.querySelector('.navbar');
const footer = document.querySelector('footer');

// Function to toggle the sidebar and shift content
toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
  header.classList.toggle('content-shift');
  content.classList.toggle('content-shift');
  footer.classList.toggle('content-shift');
});

document.querySelector('.toggle-btn').addEventListener('click', function() {
    const sidebar = document.querySelector('.sidebar');
    console.log('drawer')
    sidebar.classList.toggle('active'); // Toggle the active class
    sidebar.classList.toggle('deActive'); // Toggle the active class
});



