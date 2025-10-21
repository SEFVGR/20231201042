// Start with first post
let counter = 1;

// Load posts 20 at a time
const quantity = 20;

// Loading state
let isLoading = false;

// When DOM loads, render the first 20 posts
document.addEventListener('DOMContentLoaded', load);

// If scrolled to bottom, load the next 20 posts
window.onscroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isLoading) {
        load();
    }
};

// Load next set of posts
function load() {
    if (isLoading) return;
    
    isLoading = true;
    showLoading(true);

    // Set start and end post numbers, and update counter
    const start = counter;
    const end = start + quantity - 1;
    counter = end + 1;

    // Get new posts and add posts
    fetch(`/posts?start=${start}&end=${end}`)
    .then(response => response.json())
    .then(data => {
        data.posts.forEach(add_post);
        isLoading = false;
        showLoading(false);
    })
    .catch(error => {
        console.error('Error loading posts:', error);
        isLoading = false;
        showLoading(false);
    });
}

// Add a new post with given contents to DOM
function add_post(contents) {
    // Create new post
    const post = document.createElement('div');
    post.className = 'post';
    post.innerHTML = `${contents} <button class="hide">Hide</button>`;

    // Add post to DOM
    document.querySelector('#posts').append(post);
}

// Show/hide loading indicator
function showLoading(show) {
    const loadingElement = document.querySelector('#loading');
    if (loadingElement) {
        loadingElement.style.display = show ? 'block' : 'none';
    }
}

// If hide button is clicked, delete the post
document.addEventListener('click', event => {
    // Find what was clicked on
    const element = event.target;

    // Check if the user clicked on a hide button
    if (element.className === 'hide') {
        element.parentElement.style.animationPlayState = 'running';
        element.parentElement.addEventListener('animationend', () => {
            element.parentElement.remove();
        });
    }
});