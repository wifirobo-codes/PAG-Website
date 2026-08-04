/**
 * PAG (Perfect Agro Group) - Contact Page Interactive Logic
 * File: contact.js
 */

document.addEventListener('DOMContentLoaded', () => {
    initFormValidation();
    initFaqAccordion();
});

/**
 * Handles Form Submission, Client Validation & Dynamic Feedback
 */
function initFormValidation() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const feedback = document.getElementById('form-feedback');

    if (!form || !submitBtn || !feedback) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();

        // Basic Validation Check
        if (!name || !email || !subject || !message) {
            showFeedback('Please fill out all required fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showFeedback('Please enter a valid corporate email address.', 'error');
            return;
        }

        // Set Loading State
        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.innerHTML = `
      <span>Transmitting...</span>
      <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
      </svg>
    `;

        // Simulate API Network Request
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.innerHTML = originalBtnContent;

            // Display Success State
            showFeedback('Inquiry sent successfully! An agronomy specialist will contact you shortly.', 'success');
            form.reset();
        }, 1500);
    });

    function showFeedback(text, type) {
        feedback.textContent = text;
        feedback.className = `form-feedback ${type}`;

        // Auto-clear error messages after 5 seconds
        if (type === 'error') {
            setTimeout(() => {
                if (feedback.classList.contains('error')) {
                    feedback.textContent = '';
                    feedback.className = 'form-feedback';
                }
            }, 5000);
        }
    }

    function isValidEmail(emailStr) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailStr);
    }
}

/**
 * FAQ Accordion Collapse/Expand Logic
 */
function initFaqAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach((header) => {
        header.addEventListener('click', () => {
            const currentItem = header.parentElement;
            const body = currentItem.querySelector('.accordion-body');
            const isOpen = currentItem.classList.contains('active');

            // Close all active items
            document.querySelectorAll('.accordion-item').forEach((item) => {
                item.classList.remove('active');
                const itemHeader = item.querySelector('.accordion-header');
                const itemBody = item.querySelector('.accordion-body');

                if (itemHeader) itemHeader.setAttribute('aria-expanded', 'false');
                if (itemBody) itemBody.style.maxHeight = null;
            });

            // If clicked item was not open, open it
            if (!isOpen) {
                currentItem.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });
}