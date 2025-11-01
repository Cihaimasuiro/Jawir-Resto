// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {

    // --- Sidebar Logic ---
    // Make functions globally accessible (if needed) or attach listeners
    window.showSidebar = function() {
        const sidebar = document.querySelector(".sidebar");
        const topbar = document.querySelector(".topbar");
        const logo = document.querySelector(".logo");
        sidebar.style.display = 'flex';
        topbar.style.display = 'none';
        logo.style.justifyContent = 'center';
    }

    window.hideSidebar = function() {
        const sidebar = document.querySelector(".sidebar");
        const topbar = document.querySelector(".topbar");
        const logo = document.querySelector(".logo");
        sidebar.style.display = 'none';
        topbar.style.display = 'flex';
        logo.style.justifyContent = 'flex-start';
    }

    // --- Dropdown Logic ---
    window.toggleDropdown = function(event) {
        event.preventDefault();
        document.getElementById('dropdown-menu').classList.toggle('show');
    }

    // Close dropdown if clicking elsewhere
    window.onclick = function(event) {
        if (!event.target.matches('#username-link')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            for (var i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    // --- Authentication & Session Logic ---
    const token = sessionStorage.getItem('token');
    const websiteId = sessionStorage.getItem('website_id');
    const username = sessionStorage.getItem('username');

    // Check login status and update navbar
    if (token && websiteId && username) {
        document.getElementById('login-link').style.display = 'none';
        document.getElementById('register-link').style.display = 'none';
        document.getElementById('username-dropdown').style.display = 'block';
        
        // Add the caret icon dynamically for better HTML
        const usernameLink = document.getElementById('username-link');
        usernameLink.innerHTML = `${username} <i class="fa fa-caret-down"></i>`;
    } else {
        document.getElementById('login-link').style.display = 'block';
        document.getElementById('register-link').style.display = 'block';
        document.getElementById('username-dropdown').style.display = 'none';
    }

    // Logout logic
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault();
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('website_id');
            sessionStorage.removeItem('username');
            window.location.href = 'index.html'; // Refresh to update UI
        });
    }

    // --- Comments Logic (Modernized) ---

    // Function to load comments
    async function loadComments() {
        // Stop if not logged in
        if (!token || !websiteId) {
            console.warn('User not logged in. Cannot load comments.');
            const commentsContainer = document.getElementById('comments-container');
            commentsContainer.innerHTML = '<p style="text-align: center;">Silakan <a href="login.html">login</a> untuk melihat dan menambah komentar.</p>';
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/website_comments/${websiteId}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const commentsContainer = document.getElementById('comments-container');
            commentsContainer.innerHTML = ''; // Clear existing comments

            if (data.data.length === 0) {
                 commentsContainer.innerHTML = '<p style="text-align: center;">Belum ada komentar. Jadilah yang pertama!</p>';
                 return;
            }

            data.data.forEach(function(comment) {
                var commentDiv = document.createElement('div');
                commentDiv.classList.add('comment-item');

                var usernameSpan = document.createElement('span');
                usernameSpan.classList.add('comment-username');
                usernameSpan.textContent = comment.username || `User (${comment.id})`;

                var p = document.createElement('p');
                p.textContent = comment.comment;

                commentDiv.appendChild(usernameSpan);
                commentDiv.appendChild(p);
                commentsContainer.appendChild(commentDiv);
            });

        } catch (error) {
            console.error('Failed to load comments:', error);
            const commentsContainer = document.getElementById('comments-container');
            commentsContainer.innerHTML = '<p style="text-align: center; color: red;">Gagal memuat komentar.</p>';
        }
    }

    // Function to add a comment
    async function addComment(commentText) {
        const errorElement = document.getElementById('comment-error');
        if (!token || !websiteId) {
            errorElement.textContent = 'Anda harus login untuk menambah komentar!';
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // SECURE: Send the token so the API knows WHO is commenting
                    'Authorization': 'Bearer ' + token 
                },
                body: JSON.stringify({ 
                    websiteId: websiteId, 
                    comment: commentText 
                })
            });

            if (response.status === 201) {
                alert('Komentar sukses ditambahkan!');
                document.getElementById('comment-input').value = ''; // Clear input
                errorElement.textContent = ''; // Clear error
                loadComments(); // Refresh comments list
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Gagal menambahkan komentar');
            }

        } catch (error) {
            console.error('Failed to add comment:', error);
            errorElement.textContent = error.message;
        }
    }

    // Attach event listener to comment form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const comment = document.getElementById('comment-input').value;
            if (comment.trim()) { // Only submit if not empty
                addComment(comment);
            }
        });
    }

    // Initial load of comments
    loadComments();
});