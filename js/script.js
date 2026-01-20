// ===== GLOBAL VARIABLES =====
let currentTheme = 1;

// ===== THEME MANAGEMENT =====
function initTheme() {
    // Create particles for background
    createParticles();
    
    // Create floating shapes
    createFloatingShapes();
    
    // Set initial theme
    applyTheme(currentTheme);
    
    // Add theme switcher event listeners
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const theme = e.currentTarget.dataset.theme;
            switchTheme(parseInt(theme));
        });
    });
}

function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size, position, and animation delay
        const size = Math.random() * 5 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 15;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
}

function createFloatingShapes() {
    const shapesContainer = document.querySelector('.floating-shapes');
    
    // Add multiple gradient layers for depth
    for (let i = 0; i < 3; i++) {
        const shape = document.createElement('div');
        shape.className = 'shape-layer';
        
        const size = 100 + i * 50;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = 15 + i * 5;
        
        shape.style.width = `${size}%`;
        shape.style.height = `${size}%`;
        shape.style.left = `${posX}%`;
        shape.style.top = `${posY}%`;
        shape.style.animationDuration = `${duration}s`;
        shape.style.animationDelay = `${i * 3}s`;
        
        shapesContainer.appendChild(shape);
    }
}

function switchTheme(themeNumber) {
    // Remove active class from all buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    document.querySelector(`.theme-${themeNumber}`).classList.add('active');
    
    // Apply theme with smooth transition
    applyTheme(themeNumber);
    
    // Update current theme
    currentTheme = themeNumber;
}

function applyTheme(themeNumber) {
    const root = document.documentElement;
    
    // First, add transition class
    document.body.classList.add('theme-transition');
    
    // Apply theme variables
    root.style.setProperty('--current-bg', `var(--theme-${themeNumber}-bg)`);
    root.style.setProperty('--current-card', `var(--theme-${themeNumber}-card)`);
    root.style.setProperty('--current-accent', `var(--theme-${themeNumber}-accent)`);
    root.style.setProperty('--current-accent-light', `var(--theme-${themeNumber}-accent-light)`);
    root.style.setProperty('--current-text', `var(--theme-${themeNumber}-text)`);
    root.style.setProperty('--current-shadow', `var(--theme-${themeNumber}-shadow)`);
    
    // Remove transition class after animation completes
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 600);
}

// ===== MOBILE NAVIGATION =====
function initMobileNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');
        
        // Prevent body scroll when mobile menu is open
        if (mobileNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ===== STATS COUNTER ANIMATION =====
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    // Only animate when element is in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.dataset.count);
                animateCounter(stat, target);
                observer.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target) {
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
            
            // Add animation class
            element.classList.add('animated');
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===== GALLERY FUNCTIONALITY =====
function initGallery() {
    // Sample gallery images (replace with actual image URLs)
    const galleryImages = [
        { url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format&fit=crop', title: 'Engine Repair' },
        { url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop', title: 'Luxury Interior' },
        { url: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w-800&auto=format&fit=crop', title: 'Performance Tuning' },
        { url: 'https://images.unsplash.com/photo-1565689221354-d87f85d4aee2?w=800&auto=format&fit=crop', title: 'Electrical Systems' },
        { url: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&auto=format&fit=crop', title: 'Brake Service' },
        { url: 'https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=800&auto=format&fit=crop', title: 'Detailing Service' }
    ];
    
    const galleryGrid = document.getElementById('galleryGrid');
    
    // Add images to gallery
    galleryImages.forEach((image, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.style.setProperty('--item-index', index);
        
        item.innerHTML = `
            <img src="${image.url}" alt="${image.title}" loading="lazy">
            <div class="gallery-overlay">
                <h4>${image.title}</h4>
            </div>
        `;
        
        galleryGrid.appendChild(item);
    });
    
    // Add click animation to gallery items
    galleryGrid.addEventListener('click', (e) => {
        const item = e.target.closest('.gallery-item');
        if (item) {
            item.style.animation = 'clickPulse 0.3s ease';
            setTimeout(() => {
                item.style.animation = '';
            }, 300);
        }
    });
    
    // Navigation buttons functionality
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentGalleryIndex = 0;
    
    prevBtn.addEventListener('click', () => {
        currentGalleryIndex = Math.max(0, currentGalleryIndex - 1);
        updateGalleryNavigation();
    });
    
    nextBtn.addEventListener('click', () => {
        currentGalleryIndex = Math.min(galleryImages.length - 1, currentGalleryIndex + 1);
        updateGalleryNavigation();
    });
    
    function updateGalleryNavigation() {
        // For now, just animate the button clicks
        prevBtn.style.animation = 'buttonClick 0.3s ease';
        nextBtn.style.animation = 'buttonClick 0.3s ease';
        
        setTimeout(() => {
            prevBtn.style.animation = '';
            nextBtn.style.animation = '';
        }, 300);
    }
}
// ===== WHATSAPP BOOKING SYSTEM =====
function initWhatsAppBooking() {
    const bookingForm = document.getElementById('bookingForm');
    const ownerWhatsApp = '2547054553412'; // YOUR NUMBER
    
    if (bookingForm) {
        // Set minimum date to today
        const dateInput = bookingForm.querySelector('input[type="date"]');
        const today = new Date().toISOString().split('T')[0];
        if (dateInput) {
            dateInput.min = today;
        }
        
        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(bookingForm);
            const data = Object.fromEntries(formData);
            
            // Validate required fields
            if (!data.name || !data.phone || !data.service || !data.date || !data.time) {
                showNotification('Please fill all required fields', 'error');
                return;
            }
            
            // Format phone number (remove spaces, +, 0)
            let phone = data.phone.replace(/\s+/g, '').replace('+', '');
            if (phone.startsWith('0')) {
                phone = '254' + phone.substring(1);
            }
            
            // Show loading state
            const submitBtn = bookingForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing WhatsApp...';
            submitBtn.disabled = true;
            
            // Create WhatsApp message
            const message = `📋 *NEW CAR SERVICE BOOKING - AUTOLUX MOTORS* 📋

👤 *Customer Details:*
• Name: ${data.name}
• Phone: ${phone}
• Email: ${data.email || 'Not provided'}

🚗 *Service Requested:*
• Service: ${data.service}
• Preferred Date: ${formatDate(data.date)}
• Preferred Time: ${data.time}
• Car Details: ${data.message || 'Not specified'}

📍 *Location:* Nyeri Town Center

⏰ *Submitted:* ${new Date().toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' })}

_This booking was submitted via autoluxmotors.com_`;
            
            // Encode message for URL
            const encodedMessage = encodeURIComponent(message);
            
            // Create WhatsApp URL
            const whatsappUrl = `https://wa.me/${ownerWhatsApp}?text=${encodedMessage}`;
            
            // Small delay for UX
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Update button to show next action
            submitBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Open WhatsApp to Send';
            submitBtn.style.background = '#25D366';
            
            // Show instructions
            showNotification('Click "Open WhatsApp" to send booking details', 'info');
            
            // On button click again, open WhatsApp
            submitBtn.onclick = function() {
                // Save booking locally (optional)
                saveBookingLocally(data);
                
                // Open WhatsApp
                window.open(whatsappUrl, '_blank');
                
                // Reset form
                setTimeout(() => {
                    bookingForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    submitBtn.onclick = null; // Remove the one-time handler
                    
                    showNotification('Booking sent! We\'ll contact you shortly.');
                }, 1000);
            };
            
            // Also allow direct opening if user clicks notification
            const notificationBtn = document.createElement('button');
            notificationBtn.className = 'whatsapp-notification-btn';
            notificationBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Open WhatsApp Now';
            notificationBtn.onclick = () => {
                saveBookingLocally(data);
                window.open(whatsappUrl, '_blank');
                bookingForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                submitBtn.onclick = null;
            };
            
            // Store for emergency backup
            window.lastBookingData = {
                data: data,
                url: whatsappUrl,
                timestamp: Date.now()
            };
        });
        
        // Add emergency booking button
        addEmergencyBookingButton(ownerWhatsApp);
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-KE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function saveBookingLocally(data) {
    // Save to localStorage for record keeping
    const bookings = JSON.parse(localStorage.getItem('autolux-bookings') || '[]');
    bookings.push({
        ...data,
        timestamp: new Date().toISOString(),
        status: 'pending'
    });
    localStorage.setItem('autolux-bookings', JSON.stringify(bookings.slice(-50))); // Keep last 50
}

function addEmergencyBookingButton(whatsappNumber) {
    // Add emergency booking option
    const emergencyHTML = `
        <div class="emergency-booking">
            <div class="emergency-header">
                <i class="fas fa-bolt"></i>
                <h4>Emergency Service?</h4>
            </div>
            <p>Need immediate assistance?</p>
            <a href="https://wa.me/${whatsappNumber}?text=🚨%20EMERGENCY%20CAR%20SERVICE%20NEEDED%0A%0ALocation:%20%0ACar%20Problem:%20%0A%0APlease%20call%20me%20immediately!" 
               class="emergency-btn" target="_blank">
                <i class="fab fa-whatsapp"></i> WhatsApp Emergency
            </a>
        </div>
    `;
    
    const bookingInfo = document.querySelector('.booking-info');
    if (bookingInfo) {
        bookingInfo.insertAdjacentHTML('beforeend', emergencyHTML);
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = type === 'error' ? 'fas fa-exclamation-circle' : 
                 type === 'info' ? 'fas fa-info-circle' : 
                 'fas fa-check-circle';
    
    notification.innerHTML = `
        <i class="${icon}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}
    


// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    // Back to top button
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
        // Animate elements on scroll
        animateOnScroll();
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Add click animation
        backToTop.style.animation = 'buttonClick 0.3s ease';
        setTimeout(() => {
            backToTop.style.animation = '';
        }, 300);
    });
}

function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .testimonial-card, .info-card');
    
    elements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.9;
        
        if (isVisible) {
            element.style.animationDelay = `${index * 0.1}s`;
            element.classList.add('animate__animated', 'animate__fadeInUp');
        }
    });
}

// ===== BUTTON ANIMATIONS =====
function initButtonAnimations() {
    // Add hover animations to all buttons
    document.querySelectorAll('button, .btn-primary, .btn-secondary, .service-link, .nav-link').forEach(btn => {
        btn.addEventListener('mouseenter', (e) => {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            e.target.style.setProperty('--mouse-x', `${x}px`);
            e.target.style.setProperty('--mouse-y', `${y}px`);
        });
    });
    
    // Add click animations
    document.querySelectorAll('button, a').forEach(element => {
        element.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = e.target.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            e.target.style.position = 'relative';
            e.target.style.overflow = 'hidden';
            e.target.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ===== CURSOR ANIMATION =====
function initCursorAnimation() {
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
        
        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'scale(0.8)';
        });
        
        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'scale(1)';
        });
        
        // Add cursor effects for interactive elements
        const interactiveElements = document.querySelectorAll('button, a, .service-card, .gallery-item');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.background = 'var(--current-accent)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = '';
            });
        });
    }
}

// ===== LOADING ANIMATIONS =====
function initPageLoadAnimations() {
    // Animate hero elements sequentially
    const heroElements = document.querySelectorAll('.title-line, .hero-subtitle, .hero-buttons, .hero-stats');
    
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 300 + 500);
    });
}

// ===== INITIALIZE EVERYTHING =====
// In your DOMContentLoaded event, replace initFormValidation() with:
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initTheme();
    initMobileNavigation();
    initStatsCounter();
    initGallery();
    initWhatsAppBooking(); // CHANGED THIS LINE
    initScrollAnimations();
    initButtonAnimations();
    initCursorAnimation();
    initPageLoadAnimations();
    
    addDynamicStyles();
    
    console.log('AutoLux Motors website loaded successfully!');
});

// ===== DYNAMIC STYLES =====
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Theme transition */
        .theme-transition {
            transition: background 0.6s ease, color 0.6s ease;
        }
        
        /* Ripple animation */
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        /* Button click animation */
        @keyframes buttonClick {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(0.95); }
        }
        
        /* Click pulse animation */
        @keyframes clickPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(0.98); }
        }
        
        /* Notification animations */
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        /* Custom cursor */
        .custom-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid var(--current-accent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: width 0.3s, height 0.3s, background 0.3s;
            mix-blend-mode: difference;
        }
        
        /* Gallery overlay */
        .gallery-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
            padding: 2rem 1rem 1rem;
            transform: translateY(100%);
            transition: transform 0.3s ease;
            z-index: 2;
        }
        
        .gallery-item:hover .gallery-overlay {
            transform: translateY(0);
        }
        
        .gallery-overlay h4 {
            color: white;
            font-size: 1.2rem;
            margin: 0;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
            .gallery-item {
                height: 200px;
            }
            
            .hero-stats {
                text-align: center;
            }
            
            .service-card {
                padding: 1.5rem;
            }
        }
        
        @media (max-width: 480px) {
            .booking-container {
                margin: 0 1rem;
            }
            
            .footer {
                padding: 2rem 1rem;
            }
            
            .whatsapp-float {
                bottom: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                font-size: 1.5rem;
            }
            
            .back-to-top {
                bottom: 80px;
                right: 20px;
                width: 40px;
                height: 40px;
            }
        }
        
        /* Animation classes */
        .animated {
            animation: countUp 0.5s ease forwards;
        }
        
        /* Shape layer animations */
        .shape-layer {
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, var(--current-accent-light), transparent 70%);
            opacity: 0.1;
            animation: floatShape 15s ease-in-out infinite alternate;
        }
        
        @keyframes floatShape {
            0% {
                transform: translate(0, 0) rotate(0deg);
            }
            100% {
                transform: translate(100px, 100px) rotate(180deg);
            }
        }
    `;
    
    document.head.appendChild(style);
}

// ===== TOUCH OPTIMIZATIONS =====
document.addEventListener('touchstart', () => {
    // Add touch-specific optimizations
}, { passive: true });

// Prevent zoom on double-tap
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, { passive: false });

// ===== PERFORMANCE OPTIMIZATIONS =====
// Lazy load images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
});