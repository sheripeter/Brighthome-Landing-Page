
const contactForm = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const formMessage = document.getElementById("formMessage");

// Display an error for a particular field
function showError(input, errorId, message) {
    document.getElementById(errorId).textContent = message;
    input.setAttribute("aria-invalid", "true");
}

// Clear an individual field's error
function clearError(input, errorId) {
    document.getElementById(errorId).textContent = "";
    input.setAttribute("aria-invalid", "false");
}

// Validate the form
function validateForm() {
    let isValid = true;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Name validation
    if (name.length < 2) {
        showError(
            nameInput,
            "nameError",
            "Please enter your name (at least 2 characters)."
        );
        isValid = false;
    } else {
        clearError(nameInput, "nameError");
    }

    // Email validation
    if (email === "" || !emailInput.checkValidity()) {
        showError(
            emailInput,
            "emailError",
            "Please enter a valid email address."
        );
        isValid = false;
    } else {
        clearError(emailInput, "emailError");
    }

    // Message validation
    if (message.length < 10) {
        showError(
            messageInput,
            "messageError",
            "Please enter a message with at least 10 characters."
        );
        isValid = false;
    } else {
        clearError(messageInput, "messageError");
    }

    return isValid;
}

// Handle form submission
contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    formMessage.textContent = "";

    if (validateForm()) {
        formMessage.textContent =
           "Thank you! Your message has been received.";

        contactForm.reset();
    } else {
        // Focus the first invalid field
        const firstInvalid = contactForm.querySelector(
            '[aria-invalid="true"]'
        );

        if (firstInvalid) {
            firstInvalid.focus();
        }
    }
});

// Clear each field's error as the customer types
nameInput.addEventListener("input", function() {
    if (nameInput.value.trim().length >= 2) {
        clearError(nameInput, "nameError");
    }
});

emailInput.addEventListener("input", function() {
    if (emailInput.value.trim() !== "" &&
        emailInput.checkValidity()) {
        clearError(emailInput, "emailError");
    }
});

messageInput.addEventListener("input", function() {
    if (messageInput.value.trim().length >= 10) {
        clearError(messageInput, "messageError");
    }
});
