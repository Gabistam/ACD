// Navigation mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Fermer le menu mobile en cliquant sur un lien
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
    
    // Fermer le menu mobile en cliquant en dehors
    document.addEventListener('click', function(event) {
        if (!mobileMenuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
});

// Smooth scrolling pour les ancres
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Header scroll effect
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

// Donation amount selection
document.addEventListener('DOMContentLoaded', function() {
    const donationButtons = document.querySelectorAll('.donation-amount');
    const customAmountInput = document.getElementById('custom-amount');
    
    if (donationButtons.length > 0) {
        donationButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Retirer la sélection des autres boutons
                donationButtons.forEach(btn => btn.classList.remove('selected'));
                
                // Sélectionner le bouton cliqué
                this.classList.add('selected');
                
                // Vider le champ personnalisé
                if (customAmountInput) {
                    customAmountInput.value = '';
                }
                
                // Mettre à jour le montant sélectionné
                const amount = this.dataset.amount;
                console.log('Montant sélectionné:', amount + '€');
            });
        });
    }
    
    // Gérer le champ de montant personnalisé
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            if (this.value) {
                // Désélectionner tous les boutons prédéfinis
                donationButtons.forEach(btn => btn.classList.remove('selected'));
                console.log('Montant personnalisé:', this.value + '€');
            }
        });
    }
});

// Formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validation simple
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('error');
                    isValid = false;
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Simulation d'envoi
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                
                console.log('Données du formulaire:', data);
                
                // Afficher un message de succès (simulation)
                showNotification('Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.', 'success');
                
                // Réinitialiser le formulaire
                this.reset();
            } else {
                showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
            }
        });
    }
});

// Système de notifications
function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `fixed top-24 right-4 p-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
    
    // Définir les couleurs selon le type
    switch (type) {
        case 'success':
            notification.classList.add('bg-green-500', 'text-white');
            break;
        case 'error':
            notification.classList.add('bg-red-500', 'text-white');
            break;
        default:
            notification.classList.add('bg-blue-500', 'text-white');
    }
    
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <span>${message}</span>
            <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </div>
    `;
    
    // Ajouter au DOM
    document.body.appendChild(notification);
    
    // Animer l'apparition
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Supprimer automatiquement après 5 secondes
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Animation au scroll (intersection observer)
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observer les cartes et sections
    const elementsToAnimate = document.querySelectorAll('.card, section > div > div');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});

// Gestion des erreurs globales
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
});

// Performance logging
window.addEventListener('load', function() {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('Temps de chargement de la page:', loadTime + 'ms');
    }
});

// Accessibilité - navigation au clavier
document.addEventListener('DOMContentLoaded', function() {
    // Gestion de la navigation au clavier dans le menu mobile
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // Focus management pour les modales et overlays
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Fermer le menu mobile si ouvert
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuToggle.focus();
            }
        }
    });
});

// Analytics et tracking (simulation)
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    console.log('Event tracked:', { category, action, label });
}

// Tracking des clics sur les boutons de don
document.addEventListener('DOMContentLoaded', function() {
    const donateButtons = document.querySelectorAll('a[href*="soutenir"], .btn-primary');
    
    donateButtons.forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('engagement', 'click_donate_button', this.textContent.trim());
        });
    });
});

// Cookie consent (simulation)
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si l'utilisateur a déjà accepté les cookies
    if (!localStorage.getItem('cookieConsent')) {
        setTimeout(() => {
            showCookieConsent();
        }, 2000);
    }
});

function showCookieConsent() {
    const cookieBanner = document.createElement('div');
    cookieBanner.className = 'fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50';
    cookieBanner.innerHTML = `
        <div class="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
            <p class="text-sm">
                Nous utilisons des cookies pour améliorer votre expérience sur notre site. 
                <a href="#" class="underline hover:no-underline">En savoir plus</a>
            </p>
            <div class="flex space-x-3">
                <button id="acceptCookies" class="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded text-sm font-semibold transition-colors">
                    Accepter
                </button>
                <button id="declineCookies" class="border border-gray-600 hover:border-gray-500 px-4 py-2 rounded text-sm transition-colors">
                    Refuser
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(cookieBanner);
    
    // Gestion des boutons
    document.getElementById('acceptCookies').addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieBanner.remove();
        trackEvent('privacy', 'cookie_consent', 'accepted');
    });
    
    document.getElementById('declineCookies').addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'declined');
        cookieBanner.remove();
        trackEvent('privacy', 'cookie_consent', 'declined');
    });
}