document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('[data-animate]');
    const contactForm = document.getElementById('contact-form');
    const yearEl = document.getElementById('year');

    const initAnimations = () => {
        if (!('IntersectionObserver' in window)) {
            animatedElements.forEach((el) => el.classList.add('in-view'));
            return;
        }

        const observer = new IntersectionObserver(
            (entries, observerInstance) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                        observerInstance.unobserve(entry.target);
                    }
                });
            },
            {
                root: null,
                threshold: 0.2,
                rootMargin: '0px 0px -10% 0px'
            }
        );

        animatedElements.forEach((element) => observer.observe(element));
    };

    const initContactForm = () => {
        if (!contactForm) return;

        const feedback = contactForm.querySelector('.form-feedback');

        const showError = (input, message) => {
            const errorEl = input.parentElement.querySelector('.error-message');
            errorEl.textContent = message;
            input.classList.add('invalid');
        };

        const clearError = (input) => {
            const errorEl = input.parentElement.querySelector('.error-message');
            errorEl.textContent = '';
            input.classList.remove('invalid');
        };

        const validateEmail = (email) => {
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return pattern.test(email);
        };

        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            feedback.textContent = '';
            feedback.className = 'form-feedback';

            const formData = new FormData(contactForm);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const message = formData.get('message').trim();

            let hasErrors = false;

            if (!name) {
                showError(contactForm.name, 'Please enter your name');
                hasErrors = true;
            } else {
                clearError(contactForm.name);
            }

            if (!email) {
                showError(contactForm.email, 'Please enter your email');
                hasErrors = true;
            } else if (!validateEmail(email)) {
                showError(contactForm.email, 'Please enter a valid email address');
                hasErrors = true;
            } else {
                clearError(contactForm.email);
            }

            if (!message) {
                showError(contactForm.message, 'Please add a brief message');
                hasErrors = true;
            } else {
                clearError(contactForm.message);
            }

            if (hasErrors) {
                feedback.textContent = 'Please fix the highlighted fields and try again.';
                feedback.classList.add('error');
                return;
            }

            contactForm.reset();
            feedback.textContent = 'Thank you! Your message has been recorded.';
            feedback.classList.add('success');
        });
    };

    const initFooterYear = () => {
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    };

    initAnimations();
    initContactForm();
    initFooterYear();
});

