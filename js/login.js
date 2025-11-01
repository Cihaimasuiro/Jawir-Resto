document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Clear previous errors
    errorMessage.textContent = '';

    try {
        const response = await fetch(`${API_BASE_URL}/users/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) { // Status 200-299
            // Successful login
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('website_id', data.user.website_id);
            sessionStorage.setItem('username', data.user.username);
            
            alert('Login Sukses!');
            window.location.href = 'index.html'; // Redirect to home page
        } else {
            // Handle API errors (e.g., wrong password)
            errorMessage.textContent = data.message || 'Login gagal. Periksa kembali email dan password Anda.';
        }

    } catch (error) {
        // Handle network errors
        console.error('Login error:', error);
        errorMessage.textContent = 'Terjadi kesalahan jaringan. Coba lagi nanti.';
    }
});