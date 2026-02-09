// Enhanced Mobile Navigation Toggle with Smooth Animations
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
        
        // Animate hamburger to X
        navToggle.style.transform = navMenu.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
        navToggle.style.transition = 'transform 0.3s ease';
    });
}

// Enhanced Smooth Scrolling with Easing
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            
            // Custom smooth scroll with easing
            const startPosition = window.pageYOffset;
            const distance = offsetPosition - startPosition;
            const duration = 1200;
            let start = null;
            
            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const percentage = Math.min(progress / duration, 1);
                const easedPercentage = easeInOutCubic(percentage);
                
                window.scrollTo(0, startPosition + (distance * easedPercentage));
                
                if (progress < duration) {
                    window.requestAnimationFrame(step);
                }
            }
            
            window.requestAnimationFrame(step);

            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// Enhanced Plan Selection with WhatsApp Integration
function selectPlan(planType) {
    const planNames = {
        'padrao': 'Plano Padrão - R$ 30,00/mês',
        'flex': 'Plano Flex - R$ 35,00/mês',
        'familia': 'Plano Família - R$ 44,99/mês'
    };

    // Abrir WhatsApp com mensagem personalizada
    const mensagem = `Olá! Vim do site e quero assinar o ${planNames[planType]}. Meu nome é: `;
    const numeroWhatsApp = '5586981203797';
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    
    window.location.href = urlWhatsApp;

    // Update form select
    const planSelect = document.getElementById('plan');
    if (planSelect) {
        planSelect.value = planType;
    }
}

// Função para abrir WhatsApp do teste 24h
function openWhatsAppTeste() {
    const mensagem = `Olá! Quero o 🎟️ PASSE DEGUSTAÇÃO 24H por R$ 5,00! Quero testar antes de assinar.`;
    const numeroWhatsApp = '5586981203797';
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    
    window.location.href = urlWhatsApp;
}

// Função para abrir WhatsApp geral
function openWhatsAppGeral() {
    const mensagem = 'Olá! Vim do site e quero saber mais sobre os planos StreamPlus.';
    const numeroWhatsApp = '5586981203797';
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    
    window.location.href = urlWhatsApp;
}

// Enhanced Form Submission with Loading States
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            if (window.__formHandled) { e.preventDefault(); return; }
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            window.__formHandled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitButton.disabled = true;
            submitButton.style.opacity = '0.7';

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const phoneInput = document.getElementById('phone');
            const planSelect = document.getElementById('plan');

            const clearError = (el) => {
                if (!el) return;
                el.classList.remove('input-error');
                const group = el.parentElement;
                if (!group) return;
                const err = group.querySelector('.error-text');
                if (err) err.remove();
            };
            const showError = (el, msg) => {
                if (!el) return;
                el.classList.add('input-error');
                const group = el.parentElement;
                if (!group) return;
                let err = group.querySelector('.error-text');
                if (!err) {
                    err = document.createElement('div');
                    err.className = 'error-text';
                    group.appendChild(err);
                }
                err.textContent = msg;
            };
            [nameInput, emailInput, phoneInput, planSelect].forEach(el => {
                if (el) el.addEventListener('input', () => clearError(el));
            });

            const nameVal = String(data.name || '').trim();
            const emailVal = String(data.email || '').trim();
            const phoneDigits = String(data.phone || '').replace(/\D/g, '');
            const planVal = String(data.plan || '').trim();

            let valid = true;
            if (nameVal.length < 3) { valid = false; showError(nameInput, 'Informe seu nome completo.'); }
            const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(emailVal);
            if (!emailOk) { valid = false; showError(emailInput, 'Email inválido.'); }
            if (phoneDigits.length < 10 || phoneDigits.length > 15) { valid = false; showError(phoneInput, 'WhatsApp inválido.'); }
            if (!planVal) { valid = false; showError(planSelect, 'Selecione um plano.'); }

            if (!valid) {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
                if (nameVal.length < 3 && nameInput) nameInput.focus();
                else if (!emailOk && emailInput) emailInput.focus();
                else if ((phoneDigits.length < 10 || phoneDigits.length > 15) && phoneInput) phoneInput.focus();
                else if (!planVal && planSelect) planSelect.focus();
                return;
            }

            const planNames = {
                'padrao': 'Plano Padrão - R$ 30,00/mês',
                'flex': 'Plano Flex - R$ 35,00/mês',
                'familia': 'Plano Família - R$ 44,99/mês'
            };
            const mensagemWhatsApp = 'Olá! Quero solicitar minha assinatura VIP.\n\n' +
                'Nome: ' + nameVal + '\n' +
                'Email: ' + emailVal + '\n' +
                'WhatsApp: ' + String(data.phone || '').trim() + '\n' +
                'Plano: ' + (planNames[planVal] || 'Plano não selecionado') + '\n' +
                (data.message ? 'Mensagem: ' + String(data.message).trim() + '\n' : '') +
                'Origem: site StreamPlus';

            const numeroWhatsApp = '5586981203797';
            const urlWhatsApp = 'https://wa.me/' + numeroWhatsApp + '?text=' + encodeURIComponent(mensagemWhatsApp);

            let opened = false;
            try { const w = window.open(urlWhatsApp, '_blank'); opened = !!w; } catch (_) {}
            if (!opened) { window.location.href = urlWhatsApp; opened = true; }

            setTimeout(() => {
                submitButton.innerHTML = '<i class="fas fa-check-circle"></i> Abrimos o WhatsApp!';
                submitButton.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                submitButton.style.opacity = '1';
                submitButton.style.transform = 'scale(1.05)';
                createConfetti();
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    submitButton.style.background = '';
                    submitButton.style.transform = '';
                }, 2500);
            }, 800);
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const countdownEl = document.getElementById('promo-countdown');
    if (!countdownEl) return;
    const key = 'promoCountdownStart';
    let start = parseInt(localStorage.getItem(key) || '0', 10);
    if (!start || isNaN(start)) { start = Date.now(); localStorage.setItem(key, String(start)); }
    const duration = 24 * 60 * 60 * 1000;
    const tick = () => {
        const now = Date.now();
        const remaining = Math.max(0, duration - (now - start));
        const h = String(Math.floor(remaining / 3600000)).padStart(2, '0');
        const m = String(Math.floor((remaining % 3600000) / 60000)).padStart(2, '0');
        const s = String(Math.floor((remaining % 60000) / 1000)).padStart(2, '0');
        countdownEl.textContent = `${h}:${m}:${s}`;
        requestAnimationFrame(tick);
    };
    tick();
});
document.addEventListener('DOMContentLoaded', function() {
    const el = document.getElementById('referral-countdown');
    if (!el) return;
    const key = 'referralCountdownStart';
    let start = parseInt(localStorage.getItem(key) || '0', 10);
    if (!start || isNaN(start)) { start = Date.now(); localStorage.setItem(key, String(start)); }
    const duration = 7 * 24 * 60 * 60 * 1000;
    const tick = () => {
        const now = Date.now();
        const remaining = Math.max(0, duration - (now - start));
        const d = String(Math.floor(remaining / 86400000)).padStart(2, '0');
        const h = String(Math.floor((remaining % 86400000) / 3600000)).padStart(2, '0');
        const m = String(Math.floor((remaining % 3600000) / 60000)).padStart(2, '0');
        const s = String(Math.floor((remaining % 60000) / 1000)).padStart(2, '0');
        el.textContent = `${d}:${h}:${m}:${s}`;
        requestAnimationFrame(tick);
    };
    tick();
});

// Enhanced Confetti Effect
function createConfetti() {
    const colors = ['#7c3aed', '#a78bfa', '#ffffff', '#ffd700', '#9333ea'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -10px;
            left: ${Math.random() * 100}%;
            border-radius: 50%;
            animation: confetti-fall ${Math.random() * 3 + 2}s linear forwards;
            z-index: 9999;
            pointer-events: none;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Add confetti animation to CSS
const confettiStyles = `
    @keyframes confetti-fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

// Inject confetti styles
const confettiStyleSheet = document.createElement('style');
confettiStyleSheet.textContent = confettiStyles;
document.head.appendChild(confettiStyleSheet);

// Form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            // Abrir WhatsApp com os dados do formulário
            const planoSelecionado2 = {
                'padrao': 'Plano Padrão - R$ 30,00/mês',
                'flex': 'Plano Flex - R$ 35,00/mês',
                'familia': 'Plano Família - R$ 44,99/mês'
            }[data.plan] || 'Plano não selecionado';

            const mensagemWhatsApp2 = `Olá! Quero solicitar minha assinatura VIP.\n\n` +
                `Nome: ${data.name}\n` +
                `Email: ${data.email}\n` +
                `WhatsApp: ${data.phone}\n` +
                `Plano: ${planoSelecionado2}\n` +
                (data.message ? `Mensagem: ${data.message}\n` : '') +
                `Origem: site StreamPlus`;

            const numeroWhatsApp2 = '5586981203797';
            const urlWhatsApp2 = `https://wa.me/${numeroWhatsApp2}?text=${encodeURIComponent(mensagemWhatsApp2)}`;
            const w = window.open(urlWhatsApp2, '_blank');
            if (!w) { window.location.href = urlWhatsApp2; }

            setTimeout(() => {
                submitButton.textContent = '✓ Abrimos o WhatsApp!';
                submitButton.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.background = '';
                }, 2500);
            }, 800);
        });
    }
});

// Enhanced Intersection Observer for Advanced Animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Stagger animation for multiple elements
            const elements = entry.target.querySelectorAll('.benefit-card, .plan-card');
            elements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0) scale(1)';
                }, index * 150);
            });
            
            // Animate the main container
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Special animation for hero content
            if (entry.target.classList.contains('hero-content')) {
                const heroElements = entry.target.querySelectorAll('.hero-badge, .hero-title, .hero-description, .feature-item, .hero-cta, .hero-stats');
                heroElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateX(0)';
                    }, index * 200);
                });
            }
        }
    });
}, observerOptions);

// Observe elements with enhanced timing
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.benefits-grid, .pricing-grid, .hero-content, .contact-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(60px) scale(0.95)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        // Special setup for hero content
        if (el.classList.contains('hero-content')) {
            const heroElements = el.querySelectorAll('.hero-badge, .hero-title, .hero-description, .feature-item, .hero-cta, .hero-stats');
            heroElements.forEach(child => {
                child.style.opacity = '0';
                child.style.transform = 'translateX(-50px)';
                child.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            });
        }
        
        observer.observe(el);
    });
});

// Enhanced Header Background with Gradient Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrollPercentage = Math.min(window.scrollY / 200, 1);
    
    if (header) {
        const opacity = Math.min(0.98, 0.95 + (scrollPercentage * 0.03));
        const blur = Math.min(25, 10 + (scrollPercentage * 15));
        
        header.style.background = `rgba(0, 0, 0, ${opacity})`;
        header.style.backdropFilter = `blur(${blur}px)`;
        
        // Add gradient effect when scrolled
        if (window.scrollY > 100) {
            header.style.background = `linear-gradient(135deg, rgba(0, 0, 0, ${opacity}) 0%, rgba(124, 58, 237, 0.1) 100%)`;
        }
    }
});

// Enhanced Counter Animation with Intersection Observer
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            const duration = 2500;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    entry.target.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    entry.target.textContent = target;
                    entry.target.classList.add('counted');
                }
            };
            
            updateCounter();
        }
    });
}, { threshold: 0.5 });

// Observe counter elements
document.addEventListener('DOMContentLoaded', function() {
    const counterElements = document.querySelectorAll('.stat-number');
    counterElements.forEach(el => counterObserver.observe(el));
});

// Enhanced Mobile Navigation Styles
const mobileNavStyles = `
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.98);
        backdrop-filter: blur(20px);
        padding: 1.5rem;
        border-radius: 0 0 24px 24px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        z-index: 999;
        animation: slideDown 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        border: 1px solid rgba(124, 58, 237, 0.3);
    }

    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .nav-menu.active .nav-link {
        padding: 1rem 1.25rem;
        border-radius: 12px;
        margin: 0.5rem 0;
        font-size: 1.1rem;
        transition: all 0.3s ease;
        border: 1px solid transparent;
    }

    .nav-menu.active .nav-link:hover {
        background: rgba(124, 58, 237, 0.15);
        border-color: rgba(124, 58, 237, 0.5);
        transform: translateX(5px);
    }
    
    .nav-menu.active .nav-link::after {
        display: none;
    }
`;

// Inject enhanced mobile navigation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileNavStyles;
document.head.appendChild(styleSheet);

// Add mobile navigation styles
const mobileNavStyles = `
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.98);
        backdrop-filter: blur(10px);
        padding: 1rem;
        border-radius: 0 0 var(--border-radius-lg) var(--border-radius-lg);
        box-shadow: var(--shadow-lg);
        z-index: 999;
    }

    .nav-menu.active .nav-link {
        padding: 0.75rem 1rem;
        border-radius: var(--border-radius-sm);
        margin: 0.25rem 0;
    }

    .nav-menu.active .nav-link:hover {
        background: rgba(124, 58, 237, 0.1);
    }
`;

// Inject mobile navigation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileNavStyles;
document.head.appendChild(styleSheet);

// Enhanced Loading Animation with Fade Effects
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        
        // Animate hero elements after page load
        setTimeout(() => {
            const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description');
            heroElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.animation = 'fadeInUp 0.8s ease forwards';
                }, index * 200);
            });
        }, 300);
    }, 100);
});

// Enhanced Parallax Effect with Multiple Layers
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    
    // Hero parallax
    const hero = document.querySelector('.hero');
    if (hero) {
        const speed = scrolled * 0.3;
        hero.style.transform = `translateY(${speed}px)`;
    }
    
    // Background elements parallax
    const particles = document.querySelector('.particles');
    if (particles) {
        const particleSpeed = scrolled * 0.1;
        particles.style.transform = `translateY(${particleSpeed}px)`;
    }
    
    // Floating elements parallax
    const floatingElements = document.querySelector('.floating-elements');
    if (floatingElements) {
        const floatSpeed = scrolled * 0.05;
        floatingElements.style.transform = `translateY(${floatSpeed}px)`;
    }
});

// Enhanced Typing Effect with Cursor
function typeWriter(element, text, speed = 40) {
    let i = 0;
    element.innerHTML = '';
    
    // Add cursor
    const cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.style.color = 'var(--primary-purple)';
    cursor.style.animation = 'blink 1s infinite';
    element.appendChild(cursor);
    
    function type() {
        if (i < text.length) {
            // Remove cursor temporarily
            if (element.lastChild === cursor) {
                element.removeChild(cursor);
            }
            
            element.innerHTML += text.charAt(i);
            i++;
            
            // Add cursor back
            element.appendChild(cursor);
            setTimeout(type, speed);
        } else {
            // Remove cursor when done
            setTimeout(() => {
                if (element.lastChild === cursor) {
                    element.removeChild(cursor);
                }
            }, 1000);
        }
    }
    
    type();
}

// Initialize enhanced typing effect
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && window.innerWidth > 768) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 35);
        }, 800);
    }
});

// Add cursor blink animation
const cursorStyles = `
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Inject cursor styles
const cursorStyleSheet = document.createElement('style');
cursorStyleSheet.textContent = cursorStyles;
document.head.appendChild(cursorStyleSheet);
