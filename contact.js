
function handleSubmit(event) {
    // Prevent the default form submission
    event.preventDefault();

    // Get form fields
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate inputs
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }

    // Simple email validation (basic regex)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // If validation is successful, alert the user
    alert('Form submitted successfully!');

    // Optionally, you can reset the form
    document.querySelector('form').reset();
}

// Attach the handleSubmit function to the form's submit event
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', handleSubmit);
});