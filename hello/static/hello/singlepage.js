// Enhanced Single Page Application JavaScript

// Global variables
let currentPage = 'page1';
let isTransitioning = false;

// Shows one page with smooth transition effects
function showPage(pageId) {
    // Prevent multiple transitions at once
    if (isTransitioning) return;
    
    // Don't transition to the same page
    if (pageId === currentPage) return;
    
    isTransitioning = true;
    
    // Get current and target pages
    const currentPageElement = document.querySelector(`#${currentPage}`);
    const targetPageElement = document.querySelector(`#${pageId}`);
    
    // Hide current page with fade out effect
    if (currentPageElement) {
        currentPageElement.style.opacity = '0';
        currentPageElement.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            currentPageElement.classList.remove('active');
            currentPageElement.style.display = 'none';
            
            // Show target page with fade in effect
            if (targetPageElement) {
                targetPageElement.style.display = 'block';
                targetPageElement.style.opacity = '0';
                targetPageElement.style.transform = 'translateY(20px)';
                
                // Force reflow
                targetPageElement.offsetHeight;
                
                targetPageElement.classList.add('active');
                targetPageElement.style.opacity = '1';
                targetPageElement.style.transform = 'translateY(0)';
                
                // Update current page
                currentPage = pageId;
                
                // Update button states
                updateButtonStates(pageId);
                
                // Reset transition flag
                setTimeout(() => {
                    isTransitioning = false;
                }, 300);
            }
        }, 150);
    }
}

// Update button active states
function updateButtonStates(activePageId) {
    // Remove active class from all buttons
    document.querySelectorAll('.btn-group .btn').forEach(btn => {
        btn.classList.remove('active', 'btn-primary');
        btn.classList.add('btn-outline-primary');
    });
    
    // Add active class to current button
    const activeButton = document.querySelector(`[data-page="${activePageId}"]`);
    if (activeButton) {
        activeButton.classList.remove('btn-outline-primary');
        activeButton.classList.add('active', 'btn-primary');
    }
}

// Initialize page history for browser back/forward buttons
function initializeHistory() {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(event) {
        const page = event.state ? event.state.page : 'page1';
        showPage(page);
    });
    
    // Set initial state
    history.replaceState({ page: currentPage }, '', `#${currentPage}`);
}

// Add loading animation
function showLoading() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.style.display = 'block';
    }
}

function hideLoading() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.style.display = 'none';
    }
}

// Enhanced form handling for page 3
function initializeFormHandling() {
    const sendButton = document.querySelector('.btn-success');
    if (sendButton) {
        sendButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.querySelector('#name').value;
            const email = document.querySelector('#email').value;
            const message = document.querySelector('#message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields!');
                return;
            }
            
            // Simulate form submission
            this.innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span> Sending...';
            this.disabled = true;
            
            setTimeout(() => {
                alert('Message sent successfully! (This is a demo)');
                this.innerHTML = 'Send Message';
                this.disabled = false;
                
                // Clear form
                document.querySelector('#name').value = '';
                document.querySelector('#email').value = '';
                document.querySelector('#message').value = '';
            }, 2000);
        });
    }
}

// Add keyboard navigation
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Use arrow keys to navigate
        if (e.key === 'ArrowLeft') {
            const pages = ['page1', 'page2', 'page3'];
            const currentIndex = pages.indexOf(currentPage);
            if (currentIndex > 0) {
                showPage(pages[currentIndex - 1]);
                history.pushState({ page: pages[currentIndex - 1] }, '', `#${pages[currentIndex - 1]}`);
            }
        } else if (e.key === 'ArrowRight') {
            const pages = ['page1', 'page2', 'page3'];
            const currentIndex = pages.indexOf(currentPage);
            if (currentIndex < pages.length - 1) {
                showPage(pages[currentIndex + 1]);
                history.pushState({ page: pages[currentIndex + 1] }, '', `#${pages[currentIndex + 1]}`);
            }
        }
        
        // Use number keys 1-3 to navigate directly
        if (e.key >= '1' && e.key <= '3') {
            const pageId = `page${e.key}`;
            showPage(pageId);
            history.pushState({ page: pageId }, '', `#${pageId}`);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Get all buttons and sections
    const buttons = document.querySelectorAll('button[data-section]');
    const sections = document.querySelectorAll('div[id^="section"]');
    
    // Function to show a specific section
    function showSection(sectionId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show the selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }
    
    // Add click event listeners to buttons
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });
    
    // Show section1 by default
    showSection('section1');
});