document.getElementById('register-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorMessage = document.getElementById('error-message');

    // Clear previous errors
    errorMessage.textContent = '';

    // --- Point 4: Security/UX Improvement ---
    // Check if passwords match
    if (password !== confirmPassword) {
        errorMessage.textContent = 'Password tidak cocok!';
        return; // Stop the function
    }

    try {
        const response = await fetch(`${API_BASE_URL}/users/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (response.status === 201 || response.status === 200) {
            // Successful registration
            alert('Registrasi berhasil! Silakan login.');
            window.location.href = 'login.html'; // Redirect to login page
        } else {
            // Handle API errors (e.g., email already in use)
            errorMessage.textContent = data.message || 'Registrasi gagal.';
        }

    } catch (error) {
        // Handle network errors
        console.error('Registration error:', error);
        errorMessage.textContent = 'Terjadi kesalahan jaringan. Coba lagi nanti.';
    }
});