// js/main.js

document.addEventListener("DOMContentLoaded", () => {

    // --- 1. Menú Hamburguesa ---
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mainNav = document.getElementById('main-nav');

    if (hamburgerMenu && mainNav) {
        hamburgerMenu.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // Cambiar icono de hamburguesa a 'X' y viceversa
            if (mainNav.classList.contains('active')) {
                hamburgerMenu.innerHTML = '&times;'; // Icono 'X'
            } else {
                hamburgerMenu.innerHTML = '&#9776;'; // Icono Hamburguesa
            }
        });
    }

    // --- 2. Header "Pegajoso" (Sticky) al hacer scroll ---
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- 3. Slider de la Página de Inicio (index.html) ---
    const slider = document.querySelector('.hero-slider');
    if (slider) {
        const slides = document.querySelectorAll('.slider-slide');
        let currentSlide = 0;
        const slideInterval = 5000; // 5 segundos

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        // Iniciar el slider
        showSlide(currentSlide);
        setInterval(nextSlide, slideInterval);
    }

    // --- 4. Validación del Formulario (contacto.html) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevenir el envío real
            
            let isValid = true;

            // Funciones helper para validación
            const setError = (input, message) => {
                const formGroup = input.parentElement;
                const errorMsg = formGroup.querySelector('.error-msg');
                input.classList.add('invalid');
                errorMsg.textContent = message;
                errorMsg.style.display = 'block';
                isValid = false;
            };

            const setSuccess = (input) => {
                const formGroup = input.parentElement;
                const errorMsg = formGroup.querySelector('.error-msg');
                input.classList.remove('invalid');
                errorMsg.style.display = 'none';
            };

            const validateEmail = (email) => {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(String(email).toLowerCase());
            };

            // Obtener campos
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const company = document.getElementById('company');
            const message = document.getElementById('message');

            // Validar Nombre
            if (name.value.trim() === '') {
                setError(name, 'El nombre es obligatorio.');
            } else {
                setSuccess(name);
            }

            // Validar Email
            if (email.value.trim() === '') {
                setError(email, 'El email es obligatorio.');
            } else if (!validateEmail(email.value.trim())) {
                setError(email, 'El formato del email no es válido.');
            } else {
                setSuccess(email);
            }

            // Validar Mensaje
            if (message.value.trim() === '') {
                setError(message, 'El mensaje no puede estar vacío.');
            } else {
                setSuccess(message);
            }

            // Si todo es válido
            if (isValid) {
                console.log('Formulario válido. Enviando datos...');
                // Aquí iría la lógica de envío (AJAX, Fetch API, etc.)
                alert('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
                contactForm.reset();
            } else {
                console.log('Formulario inválido.');
            }
        });
    }
});
