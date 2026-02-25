// Initialize Lucide Icons
lucide.createIcons();

// Sticky Nav Blur on Scroll
const nav = document.querySelector('.sticky-nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(6, 14, 30, 0.95)';
        nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(6, 14, 30, 0.8)';
        nav.style.boxShadow = 'none';
    }
});

// Accordion Functionality
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const content = header.nextElementSibling;
        const icon = header.querySelector('.acc-icon');

        // Close all other accordions
        document.querySelectorAll('.accordion-item').forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.accordion-content').style.maxHeight = null;
                otherItem.querySelector('.acc-icon').style.transform = 'rotate(0deg)';
                otherItem.querySelector('.acc-icon').style.opacity = '0.5';
            }
        });

        // Toggle current accordion
        item.classList.toggle('active');
        if (item.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + 'px';
            icon.style.transform = 'rotate(180deg)';
            icon.style.opacity = '1';
        } else {
            content.style.maxHeight = null;
            icon.style.transform = 'rotate(0deg)';
            icon.style.opacity = '0.5';
        }
    });
});

// Counter Animation
const counters = document.querySelectorAll('.counter-card');
const speed = 200; // The lower the slower

const animateCounters = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card = entry.target;
            const clientsCounter = card.querySelector('.counter-clients');
            const revCounter = card.querySelector('.counter-rev');

            const targetClients = +card.getAttribute('data-clients');
            const targetRev = +card.getAttribute('data-revenue');

            const updateCount = () => {
                const currentClients = +clientsCounter.innerText;
                const currentRev = +(revCounter.innerText.replace(/,/g, ''));

                const incClients = targetClients / speed;
                const incRev = targetRev / speed;

                if (currentClients < targetClients) {
                    clientsCounter.innerText = Math.ceil(currentClients + incClients);
                    revCounter.innerText = Math.ceil(currentRev + incRev).toLocaleString();
                    setTimeout(updateCount, 10);
                } else {
                    clientsCounter.innerText = targetClients;
                    revCounter.innerText = targetRev.toLocaleString();
                }
            };

            updateCount();
            observer.unobserve(card);
        }
    });
};

const counterObserver = new IntersectionObserver(animateCounters, {
    threshold: 0.5
});

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// Fade Up Animation
const fadeElements = document.querySelectorAll('.fade-up');
const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
    fadeObserver.observe(el);
});

// Smooth Scroll for anchor links (if added in the future)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
