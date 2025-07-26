document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    const validUsername = 'admin';
    const validPassword = '1234';

    if (username === validUsername && password === validPassword) {
        Swal.fire({
            icon: 'success',
            title: 'Login successful!',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            window.location.href = 'order.html'; // Redirect after SweetAlert closes
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid username or password',
            confirmButtonText: 'Try Again'
        });
    }
});
